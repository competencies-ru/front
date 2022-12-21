import { combine, createDomain, forward, guard, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import {
  EducationInfoBankForm,
  LevelOfEducation,
  Speciality,
  TrainingDirection,
  UGSN,
} from 'types/bank';

import { REQUIRED_TEXT_ERROR } from './constants';
import { levelModel, ugsnModel, specialityModel, TDModel } from './models';

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
  to: levelModel.effects.getLevelsOfEducationFx,
});

forward({
  from: levelModel.events.selectLevel,
  to: ugsnModel.effects.getUGSNFx,
});

// levels integration
guard({
  clock: levelModel.events.updateLevelField,
  filter: (level): level is LevelOfEducation => Boolean(level),
  target: form.fields.level.$value,
});

forward({ from: form.fields.level.$value.updates, to: levelModel.events.levelFieldUpdated });

// ugsn integration
guard({
  clock: ugsnModel.events.updateUGSNField,
  filter: (ugsn): ugsn is UGSN => Boolean(ugsn),
  target: form.fields.ugsn.$value,
});

forward({ from: form.fields.ugsn.$value.updates, to: ugsnModel.events.UGSNFieldUpdated });

// speciality integration
guard({
  clock: specialityModel.events.updateSpecialityField,
  filter: (speciality): speciality is Speciality => Boolean(speciality),
  target: form.fields.speciality.$value,
});

forward({
  from: form.fields.speciality.$value.updates,
  to: specialityModel.events.specialityFieldUpdated,
});

// TD integration
guard({
  clock: TDModel.events.updateTDField,
  filter: (TD): TD is TrainingDirection => Boolean(TD),
  target: form.fields.TD.$value,
});

forward({
  from: form.fields.TD.$value.updates,
  to: TDModel.events.TDFieldUpdated,
});

export const bankFormFirstPartModel = {
  events: {
    select: {
      level: levelModel.events.selectLevel,
      ugsn: ugsnModel.events.selectUGSN,
      speciality: specialityModel.events.selectSpeciality,
      TD: TDModel.events.selectTD,
    },
    changeInput: {
      level: levelModel.events.changeLevelInput,
      ugsn: ugsnModel.events.changeUGSNInput,
      speciality: specialityModel.events.changeSpecialityInput,
      TD: TDModel.events.changeTDInput,
    },
  },
  stores: {
    options: combine({
      levelOptions: levelModel.stores.levelOptions,
      ugsnOptions: ugsnModel.stores.UGSNOptions,
      specialityOptions: specialityModel.stores.specialityOptions,
      TDOptions: TDModel.stores.TDOptions,
    }),
    values: combine({
      level: levelModel.stores.levelValue,
      ugsn: ugsnModel.stores.UGSNValue,
      speciality: specialityModel.stores.specialityValue,
      TD: TDModel.stores.TDValue,
    }),
  },
  form,
  gates: {
    openGate,
  },
};
