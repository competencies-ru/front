import { combine, createDomain, forward, guard, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import { validationRules } from '@utils';
import { EducationInfoBankForm } from 'types/bank';
import { Level } from 'types/level';
import { UGSN } from 'types/ugsn';

import { levelModel, ugsnModel, specialityModel, programModel } from './models';
import { competenceModel } from './models/competence';

const bankFormFirstPartDomain = createDomain('bank form first part domain');
bankFormFirstPartDomain.onCreateStore((store) => store.reset(openGate.close));

// GATES
const openGate = createGate();

// FORMS
const form = createForm<EducationInfoBankForm>({
  domain: bankFormFirstPartDomain,
  fields: {
    level: {
      init: null,
      rules: [validationRules.required()],
    },
    ugsn: {
      init: null,
      rules: [validationRules.required()],
    },
    speciality: {
      init: null,
      rules: [validationRules.required()],
    },
    program: {
      init: null,
      rules: [validationRules.required()],
    },
    competence: {
      init: null,
      rules: [validationRules.required()],
    },
  },
  validateOn: ['submit', 'change'],
});

form.fields.ugsn.$value.reset(levelModel.events.selectLevel);
form.fields.speciality.$value.reset([levelModel.events.selectLevel, ugsnModel.events.selectUGSN]);
form.fields.program.$value.reset([
  levelModel.events.selectLevel,
  ugsnModel.events.selectUGSN,
  specialityModel.events.selectSpeciality,
]);

// SAMPLES
// ugsn
sample({
  clock: ugsnModel.events.selectUGSN,
  source: guard({
    source: form.fields.level.$value,
    filter: (level): level is Level => Boolean(level),
  }),
  fn: (level, ugsnCode) => ({ ugsnCode, levelId: level.id }),
  target: specialityModel.effects.getSpecialityFx,
});

// speciality
sample({
  clock: specialityModel.events.selectSpeciality,
  source: guard({
    source: {
      level: form.fields.level.$value,
      ugsn: form.fields.ugsn.$value,
    },
    filter: (levelAndUgsn): levelAndUgsn is { level: Level; ugsn: UGSN } =>
      Boolean(levelAndUgsn.level) && Boolean(levelAndUgsn.ugsn),
  }),
  fn: ({ level, ugsn }, specialtyCode) => ({
    ugsnCode: ugsn.code,
    levelId: level.id,
    specialtyCode,
  }),
  target: programModel.effects.getProgramFx,
});

// FORWARDS
// levels
forward({
  from: openGate.open,
  to: [levelModel.effects.getLevelsFx, competenceModel.effects.getCompetenceFx],
});

forward({
  from: levelModel.events.selectLevel,
  to: ugsnModel.effects.getUGSNFx,
});

// levels integration
forward({
  from: levelModel.events.updateLevelField,
  to: form.fields.level.onChange,
});

forward({ from: form.fields.level.$value.updates, to: levelModel.events.levelFieldUpdated });

// ugsn integration
forward({
  from: ugsnModel.events.updateUGSNField,
  to: form.fields.ugsn.onChange,
});

forward({ from: form.fields.ugsn.$value.updates, to: ugsnModel.events.UGSNFieldUpdated });

// speciality integration
forward({
  from: specialityModel.events.updateSpecialityField,
  to: form.fields.speciality.onChange,
});

forward({
  from: form.fields.speciality.$value.updates,
  to: specialityModel.events.specialityFieldUpdated,
});

// program integration
forward({
  from: programModel.events.updateProgramField,
  to: form.fields.program.onChange,
});

forward({
  from: form.fields.program.$value.updates,
  to: programModel.events.programFieldUpdated,
});

// competence integration
forward({
  from: competenceModel.events.updateCompetenceField,
  to: form.fields.competence.onChange,
});

forward({
  from: form.fields.competence.$value.updates,
  to: competenceModel.events.competenceFieldUpdated,
});

// clears
forward({
  from: specialityModel.events.clearSpeciality,
  to: programModel.events.clearProgram,
});

forward({
  from: ugsnModel.events.clearUGSN,
  to: [specialityModel.events.clearSpeciality, programModel.events.clearProgram],
});

forward({
  from: levelModel.events.clearLevel,
  to: [
    ugsnModel.events.clearUGSN,
    specialityModel.events.clearSpeciality,
    programModel.events.clearProgram,
  ],
});

export const bankFormFirstPartModel = {
  events: {
    select: {
      level: levelModel.events.selectLevel,
      ugsn: ugsnModel.events.selectUGSN,
      speciality: specialityModel.events.selectSpeciality,
      program: programModel.events.selectProgram,
      competence: competenceModel.events.selectCompetence,
    },
    changeInput: {
      level: levelModel.events.changeLevelInput,
      ugsn: ugsnModel.events.changeUGSNInput,
      speciality: specialityModel.events.changeSpecialityInput,
      program: programModel.events.changeProgramInput,
      competence: competenceModel.events.changeCompetenceInput,
    },
    clear: {
      level: levelModel.events.clearLevel,
      ugsn: ugsnModel.events.clearUGSN,
      speciality: specialityModel.events.clearSpeciality,
      program: programModel.events.clearProgram,
      competence: competenceModel.events.clearCompetence,
    },
  },
  stores: {
    options: combine({
      levelOptions: levelModel.stores.levelOptions,
      ugsnOptions: ugsnModel.stores.UGSNOptions,
      specialityOptions: specialityModel.stores.specialityOptions,
      programOptions: programModel.stores.programOptions,
      competenceOptions: competenceModel.stores.competenceOptions,
    }),
    values: combine({
      level: levelModel.stores.levelValue,
      ugsn: ugsnModel.stores.UGSNValue,
      speciality: specialityModel.stores.specialityValue,
      program: programModel.stores.programValue,
      competence: competenceModel.stores.competenceValue,
    }),
    loading: combine({
      level: levelModel.stores.optionsLoading,
      ugsn: ugsnModel.stores.optionsLoading,
      speciality: specialityModel.stores.optionsLoading,
      program: programModel.stores.optionsLoading,
      competence: competenceModel.stores.optionsLoading,
    }),
  },
  form,
  gates: {
    openGate,
  },
};
