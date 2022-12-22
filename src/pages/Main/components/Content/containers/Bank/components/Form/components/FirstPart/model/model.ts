import { combine, createDomain, forward, guard, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import { EducationInfoBankForm, LevelOfEducation, UGSN } from 'types/bank';

import { REQUIRED_TEXT_ERROR } from './constants';
import { levelModel, ugsnModel, specialityModel, TDModel } from './models';
import { competenceModel } from './models/competence';

const bankFormFirstPartDomain = createDomain('bank form first part domain');

// GATES
const openGate = createGate();

// FORMS
const form = createForm<EducationInfoBankForm>({
  domain: bankFormFirstPartDomain,
  fields: {
    level: {
      init: null,
      rules: [
        {
          name: 'required',
          errorText: REQUIRED_TEXT_ERROR,
          validator: (l) => !!l,
        },
      ],
    },
    ugsn: {
      init: null,
      rules: [
        {
          name: 'required',
          errorText: REQUIRED_TEXT_ERROR,
          validator: (l) => !!l,
        },
      ],
    },
    speciality: {
      init: null,
      rules: [
        {
          name: 'required',
          errorText: REQUIRED_TEXT_ERROR,
          validator: (l) => !!l,
        },
      ],
    },
    TD: {
      init: null,
      rules: [
        {
          name: 'required',
          errorText: REQUIRED_TEXT_ERROR,
          validator: (l) => !!l,
        },
      ],
    },
    competence: {
      init: null,
      rules: [
        {
          name: 'required',
          errorText: REQUIRED_TEXT_ERROR,
          validator: (l) => !!l,
        },
      ],
    },
  },
  validateOn: ['submit'],
});

form.fields.ugsn.$value.reset(levelModel.events.selectLevel);
form.fields.speciality.$value.reset([levelModel.events.selectLevel, ugsnModel.events.selectUGSN]);
form.fields.TD.$value.reset([
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
    filter: (level): level is LevelOfEducation => Boolean(level),
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
    filter: (levelAndUgsn): levelAndUgsn is { level: LevelOfEducation; ugsn: UGSN } =>
      Boolean(levelAndUgsn.level) && Boolean(levelAndUgsn.ugsn),
  }),
  fn: ({ level, ugsn }, specialtyCode) => ({
    ugsnCode: ugsn.code,
    levelId: level.id,
    specialtyCode,
  }),
  target: TDModel.effects.getTDFx,
});

// FORWARDS
// levels
forward({
  from: openGate.open,
  to: [levelModel.effects.getLevelsOfEducationFx, competenceModel.effects.getCompetenceFx],
});

forward({
  from: levelModel.events.selectLevel,
  to: ugsnModel.effects.getUGSNFx,
});

// levels integration
forward({
  from: levelModel.events.updateLevelField,
  to: form.fields.level.$value,
});

forward({ from: form.fields.level.$value.updates, to: levelModel.events.levelFieldUpdated });

// ugsn integration
forward({
  from: ugsnModel.events.updateUGSNField,
  to: form.fields.ugsn.$value,
});

forward({ from: form.fields.ugsn.$value.updates, to: ugsnModel.events.UGSNFieldUpdated });

// speciality integration
forward({
  from: specialityModel.events.updateSpecialityField,
  to: form.fields.speciality.$value,
});

forward({
  from: form.fields.speciality.$value.updates,
  to: specialityModel.events.specialityFieldUpdated,
});

// TD integration
forward({
  from: TDModel.events.updateTDField,
  to: form.fields.TD.$value,
});

forward({
  from: form.fields.TD.$value.updates,
  to: TDModel.events.TDFieldUpdated,
});

// competence integration
forward({
  from: competenceModel.events.updateCompetenceField,
  to: form.fields.competence.$value,
});

forward({
  from: form.fields.competence.$value.updates,
  to: competenceModel.events.competenceFieldUpdated,
});

// clears
forward({
  from: specialityModel.events.clearSpeciality,
  to: TDModel.events.clearTD,
});

forward({
  from: ugsnModel.events.clearUGSN,
  to: [specialityModel.events.clearSpeciality, TDModel.events.clearTD],
});

forward({
  from: levelModel.events.clearLevel,
  to: [ugsnModel.events.clearUGSN, specialityModel.events.clearSpeciality, TDModel.events.clearTD],
});

export const bankFormFirstPartModel = {
  events: {
    select: {
      level: levelModel.events.selectLevel,
      ugsn: ugsnModel.events.selectUGSN,
      speciality: specialityModel.events.selectSpeciality,
      TD: TDModel.events.selectTD,
      competence: competenceModel.events.selectCompetence,
    },
    changeInput: {
      level: levelModel.events.changeLevelInput,
      ugsn: ugsnModel.events.changeUGSNInput,
      speciality: specialityModel.events.changeSpecialityInput,
      TD: TDModel.events.changeTDInput,
      competence: competenceModel.events.changeCompetenceInput,
    },
    clear: {
      level: levelModel.events.clearLevel,
      ugsn: ugsnModel.events.clearUGSN,
      speciality: specialityModel.events.clearSpeciality,
      TD: TDModel.events.clearTD,
      competence: competenceModel.events.clearCompetence,
    },
  },
  stores: {
    options: combine({
      levelOptions: levelModel.stores.levelOptions,
      ugsnOptions: ugsnModel.stores.UGSNOptions,
      specialityOptions: specialityModel.stores.specialityOptions,
      TDOptions: TDModel.stores.TDOptions,
      competenceOptions: competenceModel.stores.competenceOptions,
    }),
    values: combine({
      level: levelModel.stores.levelValue,
      ugsn: ugsnModel.stores.UGSNValue,
      speciality: specialityModel.stores.specialityValue,
      TD: TDModel.stores.TDValue,
      competence: competenceModel.stores.competenceValue,
    }),
    loading: combine({
      level: levelModel.stores.optionsLoading,
      ugsn: ugsnModel.stores.optionsLoading,
      speciality: specialityModel.stores.optionsLoading,
      TD: TDModel.stores.optionsLoading,
      competence: competenceModel.stores.optionsLoading,
    }),
  },
  form,
  gates: {
    openGate,
  },
};
