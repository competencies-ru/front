import { createDomain, guard, sample } from 'effector';
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

// GATES
const openGate = createGate<string | null>();

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

// options
const levelOptions = createOptionStore<Level>({
  handler: levelsApi.getAll,
  dependsOnForm: {
    form,
    key: 'level',
  },
  dependsOnGetOptions: sample({ clock: openGate.open, fn: () => undefined }),
  dependsOnResetAll: openGate.close,
});

export const UGSNFormModel = {
  form,
  gates: {
    openGate,
  },
  levelOptions,
};
