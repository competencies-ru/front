import { combine, createDomain, guard, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import {
  createEffectWrapper,
  createOptionStore,
  history,
  toastEvent,
  validationRules,
} from '@utils';
import { CompetencyRegExp } from '@utils/constants';
import { REQUIRED_TEXT } from '@utils/validators';
import { competenciesApi, levelsApi, programsApi, specialityApi, ugsnApi } from 'api';
import { CompetenceType, CompetenceTypeTitle, CreateCompetenceForm } from 'types/competence';
import type { Level } from 'types/level';
import { Program } from 'types/program';
import { Speciality } from 'types/speciality';
import { UGSN } from 'types/ugsn';

type AdditionallyFields =
  | {
      type: CompetenceType.Universal;
      level: Level;
      ugsn: null;
      speciality: null;
      program: null;
    }
  | {
      type: CompetenceType.General;
      level: Level;
      ugsn: UGSN;
      speciality: null;
      program: null;
    }
  | {
      type: CompetenceType.General;
      level: Level;
      ugsn: UGSN;
      speciality: Speciality;
      program: null;
    }
  | {
      type: CompetenceType.Professional;
      level: Level;
      ugsn: UGSN;
      speciality: Speciality;
      program: Program;
    };

type CreateCompetenceFormForResponse = Omit<CreateCompetenceForm, 'type' | 'level'> &
  AdditionallyFields;

const openGate = createGate<string | null>();

const competenceFormDomain = createDomain('competence form domain');
competenceFormDomain.onCreateStore((store) => store.reset(openGate.close));

const createCompetenceFx = createEffectWrapper(competenceFormDomain, {
  handler: competenciesApi.create,
});

const form = createForm<CreateCompetenceForm>({
  domain: competenceFormDomain,
  fields: {
    level: {
      init: null,
      rules: [validationRules.required(), validationRules.notNull()],
    },
    ugsn: {
      init: null,
    },
    speciality: {
      init: null,
    },
    program: {
      init: null,
    },
    code: {
      init: '',
      rules: [
        validationRules.required(),
        {
          name: 'required string',
          validator: (value, { type }: { type: CompetenceType | null }) => {
            if (!type) {
              return {
                isValid: false,
                errorText: REQUIRED_TEXT,
              };
            }

            return true;
          },
        },
        validationRules.regExp(
          CompetencyRegExp,
          'Шаблон – x–y, x – тип компетенции, y не может быть 0 и больше 99'
        ),
      ],
    },
    title: {
      init: '',
      rules: [validationRules.required()],
    },
    category: {
      init: '',
      rules: [validationRules.required()],
    },
    type: {
      init: null,
      rules: [validationRules.required(), validationRules.notNull()],
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: guard({
    source: form.formValidated,
    filter: (form): form is CreateCompetenceFormForResponse => !!form.level && !!form.type,
  }),
  fn: (form) => {
    const code = form.code.replace('–', '-');

    if (form.program) {
      return {
        category: form.category,
        code,
        title: form.title,
        programId: form.program.id,
        type: form.type,
      };
    }

    if (form.speciality) {
      return {
        category: form.category,
        code,
        title: form.title,
        specialtyId: form.speciality.id,
        type: form.type,
      };
    }

    if (form.ugsn) {
      return {
        category: form.category,
        code,
        title: form.title,
        ugsnId: form.ugsn.id,
        type: form.type,
      };
    }

    return {
      category: form.category,
      code,
      title: form.title,
      levelId: form.level.id,
      type: form.type,
    };
  },
  target: createCompetenceFx,
});

sample({
  clock: createCompetenceFx.done,
  source: form.$values,
  fn: (form: CreateCompetenceFormForResponse) => {
    history.push('/competencies');
    return `Компетенция "${form.code} – ${form.title}" создана`;
  },
  target: toastEvent.success,
});

// options
const levelOptions = createOptionStore<Level, undefined, CreateCompetenceForm>({
  handler: levelsApi.getAll,
  dependsOnForm: {
    form,
    key: 'level',
  },
  dependsOnGetOptions: sample({ clock: openGate.open, fn: () => undefined }),
  dependsOnResetAll: openGate.close,
});

const UGSNOptions = createOptionStore<UGSN, string, CreateCompetenceForm>({
  handler: ugsnApi.getAll,
  dependsOnClear: levelOptions,
  dependsOnGetOptions: levelOptions,
  dependsOnForm: {
    form,
    key: 'ugsn',
  },
  dependsOnResetAll: openGate.close,
});

const specialityOptions = createOptionStore<Speciality, string, CreateCompetenceForm>({
  handler: specialityApi.getAll,
  dependsOnClear: [levelOptions, UGSNOptions],
  dependsOnGetOptions: UGSNOptions,
  dependsOnForm: {
    form,
    key: 'speciality',
  },
  dependsOnResetAll: openGate.close,
});

const programsOptions = createOptionStore<Program, string, CreateCompetenceForm>({
  handler: programsApi.getAll,
  dependsOnClear: [levelOptions, UGSNOptions, specialityOptions],
  dependsOnGetOptions: specialityOptions,
  dependsOnForm: {
    form,
    key: 'program',
  },
  dependsOnResetAll: openGate.close,
});

sample({
  clock: combine({
    level: form.fields.level.$value,
    ugsn: form.fields.ugsn.$value,
    program: form.fields.program.$value,
  }),
  fn: ({ level, ugsn, program }) => {
    if (program) {
      return CompetenceType.Professional;
    }

    if (ugsn) {
      return CompetenceType.General;
    }

    if (level) {
      return CompetenceType.Universal;
    }

    return null;
  },
  target: form.fields.type.onChange,
});

sample({
  clock: [programsOptions.events.clear, programsOptions.events.resetAll],
  source: form.fields.type.$value,
  fn: (type) => {
    if (type) {
      return type === CompetenceType.Professional ? null : type;
    }

    return null;
  },
  target: form.fields.type.onChange,
});

sample({
  clock: [UGSNOptions.events.clear, UGSNOptions.events.resetAll],
  source: form.fields.type.$value,
  fn: (type) => {
    if (type) {
      return type === CompetenceType.Professional || type === CompetenceType.General ? null : type;
    }

    return null;
  },
  target: form.fields.type.onChange,
});

sample({
  clock: form.fields.type.onChange,
  source: form.fields.code.$value,
  fn: (code, type) => {
    if (type) {
      if (code) {
        const text = code.split('–')[1];

        if (text) {
          return `${CompetenceTypeTitle[type]}–${text}`;
        }
      }

      return `${CompetenceTypeTitle[type]}–`;
    }

    return '';
  },
  target: form.fields.code.onChange,
});

sample({
  clock: [levelOptions.events.clear, levelOptions.events.resetAll],
  fn: () => null,
  target: form.fields.type.onChange,
});

sample({
  clock: guard({
    clock: form.fields.code.$value.updates,
    source: combine({
      type: form.fields.type.$value,
      code: form.fields.code.$value,
    }),
    filter: (
      source
    ): source is {
      type: CompetenceType;
      code: string;
    } => {
      const { type, code } = source;

      if (type) {
        const prefix = `${CompetenceTypeTitle[type]}–`;

        return !code.startsWith(prefix);
      }

      return false;
    },
  }),
  fn: ({ type }) => {
    return `${CompetenceTypeTitle[type]}–`;
  },
  target: form.fields.code.onChange,
});

export const programFormModel = {
  form,
  gates: {
    openGate,
  },
  levelOptions,
  UGSNOptions,
  specialityOptions,
  programsOptions,
};
