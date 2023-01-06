/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/cognitive-complexity */
import { createDomain, Event, forward, sample, Store } from 'effector';
import { Form, AnyFormValues } from 'effector-forms';

import { Option } from 'types/select';

import createEffectWrapper from './effectWrapper';

type TypicalType = {
  id: string;
  title: string;
  code?: string;
};

type Result<T extends TypicalType, Args = undefined> = {
  stores: {
    userOptions: Store<Option[]>;
    selectedOption: Store<string>;
    selectedOptionId: Store<string>;
    loading: Store<boolean>;
    options: Store<T[]>;
    selectedOptionFull: Store<T | null>;
  };
  events: {
    getOptions: Event<Args>;
    onInput: Event<string>;
    onSelect: Event<string>;
    clear: Event<void>;
    resetAll: Event<void>;
  };
};

type DependencyOnClear = {
  stores: unknown;
  events: {
    getOptions: unknown;
    onInput: unknown;
    onSelect: Event<string>;
    clear: Event<void>;
    resetAll: Event<void>;
  };
};

type DependencyOnGetOptions<Args = undefined> = {
  stores: unknown;
  events: {
    getOptions: unknown;
    onInput: unknown;
    onSelect: Event<Args>;
    clear: unknown;
    resetAll: unknown;
  };
};

type DependencyOnForm<V extends AnyFormValues> = {
  form: Form<V>;
  key: keyof V;
};

type Args<T extends TypicalType, A = undefined, V extends AnyFormValues = any> = {
  handler: (args: A) => Promise<T[]>;
  dependsOnClear?: DependencyOnClear | DependencyOnClear[];
  dependsOnGetOptions?: DependencyOnGetOptions<A> | Event<A>;
  dependsOnForm?: DependencyOnForm<V>;
  dependsOnResetAll?: Event<any>;
};

const createOptionStore = <T extends TypicalType, A = undefined, V extends AnyFormValues = any>({
  handler,
  dependsOnClear,
  dependsOnGetOptions,
  dependsOnForm,
  dependsOnResetAll,
}: Args<T, A, V>): Result<T, A> => {
  const domain = createDomain();

  const resetAll = domain.createEvent();
  domain.onCreateStore((store) => store.reset(resetAll));

  const getOptionsFx = createEffectWrapper(domain, { handler });

  const getOptions = domain.createEvent<Parameters<typeof handler>[0]>();
  const onInput = domain.createEvent<string>();
  const onSelect = domain.createEvent<string>();
  const clear = domain.createEvent();

  const $options = domain.createStore<T[]>([]).on(getOptionsFx.doneData, (_, options) => options);
  const $userOptions = domain.createStore<Option[]>([]).on(getOptionsFx.doneData, (_, options) =>
    options.map(({ code, id, title }) => ({
      id: id,
      value: code ? `${code} – ${title}` : title,
    }))
  );
  const $selectedOption = domain.createStore<string>('').reset(clear);
  const $selectedOptionFull = domain.createStore<T | null>(null).reset(clear);
  const $selectedOptionId = domain
    .createStore<string>('')
    .on(onSelect, (_, id) => id)
    .reset(clear);
  const $input = domain
    .createStore('')
    .on([onInput, $selectedOption.updates], (_, input) => input)
    .reset(clear);

  forward({ from: getOptions, to: getOptionsFx });

  sample({
    clock: $input.updates,
    source: $options,
    fn: (options, input) =>
      options
        .filter((s) => {
          const str = s.code ? `${s.code} – ${s.title}` : s.title;

          return str.includes(input);
        })
        .map(({ code, id, title }) => ({
          id: id,
          value: code ? `${code} – ${title}` : title,
        })),
    target: $userOptions,
  });

  sample({
    clock: onSelect,
    source: $userOptions,
    fn: (userOptions, selectedId) => {
      const foundOption = userOptions.find(({ id }) => id === selectedId);

      return foundOption?.value ?? '';
    },
    target: $selectedOption,
  });

  sample({
    clock: clear,
    source: $options,
    fn: (options) =>
      options.map(({ code, id, title }) => ({
        id: id,
        value: code ? `${code} – ${title}` : title,
      })),
    target: $userOptions,
  });

  sample({
    clock: onSelect,
    source: $options,
    fn: (options, id) => {
      const selectedOption = options.find((option) => option.id === id);

      return selectedOption ? selectedOption : null;
    },
    target: $selectedOptionFull,
  });

  if (dependsOnClear) {
    if (Array.isArray(dependsOnClear)) {
      dependsOnClear.forEach((dependency) => {
        forward({
          from: [dependency.events.clear, dependency.events.onSelect],
          to: clear,
        });
      });
    } else {
      forward({
        from: [dependsOnClear.events.clear, dependsOnClear.events.onSelect],
        to: clear,
      });
    }
  }

  if (dependsOnGetOptions) {
    forward({
      from:
        'events' in dependsOnGetOptions ? dependsOnGetOptions.events.onSelect : dependsOnGetOptions,
      to: getOptions,
    });
  }

  if (dependsOnForm) {
    const { form, key } = dependsOnForm;

    forward({
      from: $selectedOptionFull.updates,
      to: form.fields[key].onChange,
    });
  }

  if (dependsOnResetAll) {
    forward({
      from: dependsOnResetAll,
      to: resetAll,
    });
  }

  return {
    stores: {
      userOptions: $userOptions,
      selectedOption: $selectedOption,
      selectedOptionId: $selectedOptionId,
      loading: getOptionsFx.pending,
      options: $options,
      selectedOptionFull: $selectedOptionFull,
    },
    events: {
      getOptions,
      onInput,
      onSelect,
      clear,
      resetAll,
    },
  };
};

export default createOptionStore;
