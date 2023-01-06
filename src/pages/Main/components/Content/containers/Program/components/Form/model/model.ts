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
import { ProgramRegExp } from '@utils/constants';
import { levelsApi, programsApi, specialityApi, ugsnApi } from 'api';
import type { Level } from 'types/level';
import type { CreateProgramForm } from 'types/program';
import { Speciality } from 'types/speciality';
import { UGSN } from 'types/ugsn';

type CreateProgramFormWithLevelUGSNAndSpeciality = Omit<
  CreateProgramForm,
  'level' | 'ugsn' | 'speciality'
> & {
  level: Level;
  ugsn: UGSN;
  speciality: Speciality;
};

const openGate = createGate<string | null>();

const programFormDomain = createDomain('program form domain');
programFormDomain.onCreateStore((store) => store.reset(openGate.close));

const createProgramFx = createEffectWrapper(programFormDomain, {
  handler: programsApi.create,
});

const form = createForm<CreateProgramForm>({
  domain: programFormDomain,
  fields: {
    level: {
      init: null,
      rules: [validationRules.required(), validationRules.notNull()],
    },
    ugsn: {
      init: null,
      rules: [validationRules.required(), validationRules.notNull()],
    },
    speciality: {
      init: null,
      rules: [validationRules.required(), validationRules.notNull()],
    },
    programCode: {
      init: '',
      rules: [
        validationRules.required(),
        {
          name: 'required string',
          validator: (
            value,
            { ugsn, speciality }: { ugsn: UGSN | null; speciality: Speciality | null }
          ) =>
            Boolean(value) &&
            !!ugsn &&
            value.startsWith(ugsn.code.slice(0, 2)) &&
            !!speciality &&
            value.startsWith(speciality.code),
          errorText:
            'Шаблон – xx.xx.xx-yy, xx должен совпадать с кодом специальности/направления, yy не может быть 00',
        },
        validationRules.regExp(
          ProgramRegExp,
          'Шаблон – xx.xx.xx-yy, xx должен совпадать с кодом специальности/направления, yy не может быть 00'
        ),
      ],
    },
    program: {
      init: '',
      rules: [validationRules.required()],
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: guard({
    source: form.formValidated,
    filter: (form): form is CreateProgramFormWithLevelUGSNAndSpeciality =>
      !!form.level && !!form.ugsn && !!form.speciality,
  }),
  fn: (form) => ({
    specialityId: form.speciality.id,
    code: form.programCode,
    title: form.program,
  }),
  target: createProgramFx,
});

sample({
  clock: createProgramFx.done,
  source: form.$values,
  fn: (form: CreateProgramFormWithLevelUGSNAndSpeciality) => {
    history.push('/program');
    return `${
      form.level.title === 'Специалитет' ? 'Специализация' : 'Образовательная программа'
    } "${form.programCode} – ${form.program}" создана`;
  },
  target: toastEvent.success,
});

// options
const levelOptions = createOptionStore<Level, undefined, CreateProgramForm>({
  handler: levelsApi.getAll,
  dependsOnForm: {
    form,
    key: 'level',
  },
  dependsOnGetOptions: sample({ clock: openGate.open, fn: () => undefined }),
  dependsOnResetAll: openGate.close,
});

const UGSNOptions = createOptionStore<UGSN, string, CreateProgramForm>({
  handler: ugsnApi.getAll,
  dependsOnClear: levelOptions,
  dependsOnGetOptions: levelOptions,
  dependsOnForm: {
    form,
    key: 'ugsn',
  },
  dependsOnResetAll: openGate.close,
});

const specialityOptions = createOptionStore<Speciality, string, CreateProgramForm>({
  handler: specialityApi.getAll,
  dependsOnClear: [levelOptions, UGSNOptions],
  dependsOnGetOptions: UGSNOptions,
  dependsOnForm: {
    form,
    key: 'speciality',
  },
  dependsOnResetAll: openGate.close,
});

export const programFormModel = {
  form,
  gates: {
    openGate,
  },
  levelOptions,
  UGSNOptions,
  specialityOptions,
};
