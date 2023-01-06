import { combine, createDomain, forward, guard, sample, split } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import {
  createEffectWrapper,
  createOptionStore,
  history,
  toastEvent,
  validationRules,
} from '@utils';
import { UGSNRegExp } from '@utils/constants';
import { levelsApi, ugsnApi } from 'api';
import type { Level } from 'types/level';
import type { CreateUGSNForm } from 'types/ugsn';

type CreateUGSNFormWithLevel = Omit<CreateUGSNForm, 'level'> & { level: Level };

const levelOptions = createOptionStore<Level>(levelsApi.getAll);

// GATES
const openGate = createGate<string | null>();

forward({ from: openGate.close, to: levelOptions.events.resetAll });

const UGSNFormDomain = createDomain('ugsn form domain');
UGSNFormDomain.onCreateStore((store) => store.reset(openGate.close));

const createUGSNFx = createEffectWrapper(UGSNFormDomain, { handler: ugsnApi.create });

// FORMS
const form = createForm<CreateUGSNForm>({
  domain: UGSNFormDomain,
  fields: {
    level: {
      init: null,
      rules: [validationRules.required(), validationRules.notNull()],
    },
    ugsn: {
      init: '',
      rules: [validationRules.required()],
    },
    ugsnCode: {
      init: '',
      rules: [
        validationRules.required(),
        validationRules.regExp(UGSNRegExp, 'Шаблон – xx.00.00, xx не может быть 00'),
      ],
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: levelOptions.events.onSelect,
  source: levelOptions.stores.options,
  fn: (options, id) => {
    const selectedOption = options.find((option) => option.id === id);

    return selectedOption ? selectedOption : null;
  },
  target: form.fields.level.onChange,
});

sample({
  clock: levelOptions.events.clear,
  fn: () => null,
  target: form.fields.level.onChange,
});

sample({
  clock: openGate.open,
  fn: () => undefined,
  target: levelOptions.events.getOptions,
});

sample({
  clock: guard({
    source: form.formValidated,
    filter: (form): form is CreateUGSNFormWithLevel => !!form.level,
  }),
  fn: (form) => ({
    levelId: form.level.id,
    code: form.ugsnCode,
    title: form.ugsn,
  }),
  target: createUGSNFx,
});

sample({
  clock: createUGSNFx.done,
  source: form.$values,
  fn: (form) => {
    history.push('/ugsn');
    return `УГСН "${form.ugsnCode} – ${form.ugsn}" создан`;
  },
  target: toastEvent.success,
});

export const UGSNFormModel = {
  form,
  gates: {
    openGate,
  },
  levelOptions,
};
