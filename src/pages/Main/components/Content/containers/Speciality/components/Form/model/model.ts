import { createDomain, forward, guard, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import {
  createEffectWrapper,
  createOptionStore,
  history,
  toastEvent,
  validationRules,
} from '@utils';
import { SpecialityRegExp } from '@utils/constants';
import { levelsApi, specialityApi, ugsnApi } from 'api';
import type { Level } from 'types/level';
import type { CreateSpecialityForm } from 'types/speciality';
import { UGSN } from 'types/ugsn';

type CreateSpecialityFormWithLevelAndUGSN = Omit<CreateSpecialityForm, 'level' | 'ugsn'> & {
  level: Level;
  ugsn: UGSN;
};

const levelOptions = createOptionStore<Level>(levelsApi.getAll);
const UGSNOptions = createOptionStore<UGSN, string>(ugsnApi.getAll);

forward({
  from: [levelOptions.events.clear, levelOptions.events.onSelect],
  to: UGSNOptions.events.clear,
});

forward({
  from: levelOptions.events.onSelect,
  to: UGSNOptions.events.getOptions,
});

// GATES
const openGate = createGate<string | null>();

forward({
  from: openGate.close,
  to: [levelOptions.events.resetAll, UGSNOptions.events.resetAll],
});

const specialityFormDomain = createDomain('speciality form domain');
specialityFormDomain.onCreateStore((store) => store.reset(openGate.close));

const createSpecialityFx = createEffectWrapper(specialityFormDomain, {
  handler: specialityApi.create,
});

// FORMS
const form = createForm<CreateSpecialityForm>({
  domain: specialityFormDomain,
  fields: {
    level: {
      init: null,
      rules: [validationRules.required(), validationRules.notNull()],
    },
    ugsn: {
      init: null,
      rules: [validationRules.required(), validationRules.notNull()],
    },
    specialityCode: {
      init: '',
      rules: [
        validationRules.required(),
        {
          name: 'required string',
          validator: (value, { ugsn }: { ugsn: UGSN | null }) =>
            Boolean(value) && !!ugsn && value.startsWith(ugsn.code.slice(0, 2)),
          errorText:
            'Шаблон – xx.yy.yy, xx должен совпадать с первыми двумя цифрами кода УГСН, yy не может быть 00',
        },
        validationRules.regExp(
          SpecialityRegExp,
          'Шаблон – xx.yy.yy, xx должен совпадать с первыми двумя цифрами кода УГСН, yy не может быть 00'
        ),
      ],
    },
    speciality: {
      init: '',
      rules: [validationRules.required()],
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: openGate.open,
  fn: () => undefined,
  target: levelOptions.events.getOptions,
});

sample({
  clock: levelOptions.stores.selectedOptionFull.updates,
  fn: (level) => level,
  target: form.fields.level.onChange,
});

sample({
  clock: UGSNOptions.stores.selectedOptionFull.updates,
  fn: (ugsn) => ugsn,
  target: form.fields.ugsn.onChange,
});

sample({
  clock: guard({
    source: form.formValidated,
    filter: (form): form is CreateSpecialityFormWithLevelAndUGSN => !!form.level && !!form.ugsn,
  }),
  fn: (form) => ({
    ugsnId: form.ugsn.id,
    code: form.specialityCode,
    title: form.speciality,
  }),
  target: createSpecialityFx,
});

sample({
  clock: createSpecialityFx.done,
  source: form.$values,
  fn: (form: CreateSpecialityFormWithLevelAndUGSN) => {
    history.push('/speciality');
    return `${form.level.title === 'Специалитет' ? 'Специальность' : 'Направление'} "${
      form.specialityCode
    } – ${form.speciality}" ${form.level.title === 'Специалитет' ? 'создана' : 'создано'}`;
  },
  target: toastEvent.success,
});

export const specialityFormModel = {
  form,
  gates: {
    openGate,
  },
  levelOptions,
  UGSNOptions,
};
