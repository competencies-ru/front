import { combine, createDomain, forward, sample } from 'effector';

import { Option } from 'types/select';

import createEffectWrapper from './effectWrapper';

type TypicalType = {
  id: string;
  title: string;
  code?: string;
};

const createOptionStore = <T extends TypicalType, Args = undefined>(
  effectHandler: (args: Args) => Promise<T[]>
) => {
  const domain = createDomain();

  const resetAll = domain.createEvent();
  domain.onCreateStore((store) => store.reset(resetAll));

  const getOptionsFx = createEffectWrapper(domain, { handler: effectHandler });

  const getOptions = domain.createEvent<Parameters<typeof effectHandler>[0]>();
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
      console.log(options, id);
      const selectedOption = options.find((option) => option.id === id);

      return selectedOption ? selectedOption : null;
    },
    target: $selectedOptionFull,
  });

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
