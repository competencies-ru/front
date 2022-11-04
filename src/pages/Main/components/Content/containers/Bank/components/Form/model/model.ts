import { combine, createDomain, forward, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';
import { createReEffect } from 'effector-reeffect';

import { bankApi } from 'api';
import { BankForm, ILevelOfEducation, Speciality, TrainingDirection, UGSN } from 'types/bank';

import { REQUIRED_TEXT_ERROR } from './constants';

const getLevelsOfEducationFx = createReEffect({ handler: bankApi.getLevelsOfEducation });
const getUGSNByLevelFx = createReEffect({ handler: bankApi.getUGSNByLevel });
const getSpecialityByUGSNFx = createReEffect({ handler: bankApi.getSpecialityByUGSN });
const getTrainingDirectionBySpecialityFx = createReEffect({
  handler: bankApi.getTrainingDirectionBySpeciality,
});

const bankFormDomain = createDomain('bank form domain');

// GATES
const openGate = createGate();

// EVENTS
// levels
const selectLevel = bankFormDomain.createEvent<string>();
const changeLevelInput = bankFormDomain.createEvent<string>();

// ugsn
const selectUGSN = bankFormDomain.createEvent<string>();
const changeUGSNInput = bankFormDomain.createEvent<string>();

// speciality
const selectSpeciality = bankFormDomain.createEvent<string>();
const changeSpecialityInput = bankFormDomain.createEvent<string>();

// trainingDirection
const selectTD = bankFormDomain.createEvent<string>();
const changeTDInput = bankFormDomain.createEvent<string>();

// STORES
// levels
const $listOfLevelsEducation = bankFormDomain
  .createStore<ILevelOfEducation[]>([])
  .on(getLevelsOfEducationFx.doneData, (_, levels) => levels);

const $listOfLevelsEducationForUser = bankFormDomain
  .createStore<ILevelOfEducation[]>([])
  .on($listOfLevelsEducation.updates, (_, levels) => levels);

const $levelInput = bankFormDomain.createStore<string>('').on(changeLevelInput, (_, v) => v);

// ugsn
const $listOfUGSN = bankFormDomain
  .createStore<UGSN[]>([])
  .on(getUGSNByLevelFx.doneData, (_, ugsnList) => ugsnList);

const $listOfUGSNForUser = bankFormDomain
  .createStore<UGSN[]>([])
  .on($listOfUGSN.updates, (_, ugsnList) => ugsnList);

const $ugsnInput = bankFormDomain.createStore<string>('').on(changeUGSNInput, (_, v) => v);

// speciality
const $listOfSpeciality = bankFormDomain
  .createStore<Speciality[]>([])
  .on(getSpecialityByUGSNFx.doneData, (_, specialityList) => specialityList);

const $listOfSpecialityForUser = bankFormDomain
  .createStore<Speciality[]>([])
  .on($listOfSpeciality.updates, (_, specialityList) => specialityList);

const $specialityInput = bankFormDomain
  .createStore<string>('')
  .on(changeSpecialityInput, (_, v) => v);

// speciality
const $listOfTD = bankFormDomain
  .createStore<TrainingDirection[]>([])
  .on(getTrainingDirectionBySpecialityFx.doneData, (_, TDList) => TDList);

const $listOfTDForUser = bankFormDomain
  .createStore<TrainingDirection[]>([])
  .on($listOfTD.updates, (_, TDList) => TDList);

const $TDInput = bankFormDomain
  .createStore<string>('')
  .on(changeTDInput, (_, v) => v);

// FORMS
const form = createForm<BankForm>({
  domain: bankFormDomain,
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
    trainingDirection: {
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

form.fields.ugsn.$value.reset(selectLevel);
form.fields.speciality.$value.reset([selectLevel, selectUGSN]);
form.fields.trainingDirection.$value.reset([selectLevel, selectUGSN, selectSpeciality]);

// SAMPLES
// levels
sample({
  clock: selectLevel,
  source: $listOfLevelsEducationForUser,
  fn: (levels, levelId) => levels.find((l) => l.id === levelId) ?? null,
  target: form.fields.level.$value,
});

sample({
  clock: form.fields.level.$value.updates,
  source: $listOfLevelsEducationForUser,
  fn: (levels, lvl) => levels.find((l) => l.id === lvl?.id ?? -1)?.level ?? '',
  target: $levelInput,
});

sample({
  clock: $levelInput.updates,
  source: $listOfLevelsEducation,
  fn: (levels, input) => levels.filter((l) => l.level.includes(input)),
  target: $listOfLevelsEducationForUser,
});

// ugsn
sample({
  clock: selectUGSN,
  source: $listOfUGSNForUser,
  fn: (ugsn, ugsnId) => ugsn.find((u) => u.id === ugsnId) ?? null,
  target: form.fields.ugsn.$value,
});

sample({
  clock: form.fields.ugsn.$value.updates,
  source: $listOfUGSNForUser,
  fn: (ugsn, ug) => {
    const foundUGSN = ugsn.find((u) => u.id === ug?.id ?? -1);

    if (foundUGSN) {
      return `${foundUGSN.code}–${foundUGSN.name}`;
    }

    return '';
  },
  target: $ugsnInput,
});

sample({
  clock: $ugsnInput.updates,
  source: $listOfUGSN,
  fn: (ugsn, input) => ugsn.filter((u) => `${u.code}–${u.name}`.includes(input)),
  target: $listOfUGSNForUser,
});

// speciality
sample({
  clock: selectSpeciality,
  source: $listOfSpecialityForUser,
  fn: (specialityList, specialityId) => specialityList.find((s) => s.id === specialityId) ?? null,
  target: form.fields.speciality.$value,
});

sample({
  clock: form.fields.speciality.$value.updates,
  source: $listOfSpecialityForUser,
  fn: (specialityList, sp) => {
    const foundSpeciality = specialityList.find((s) => s.id === sp?.id ?? -1);

    if (foundSpeciality) {
      return `${foundSpeciality.code}–${foundSpeciality.name}`;
    }

    return '';
  },
  target: $ugsnInput,
});

sample({
  clock: $specialityInput.updates,
  source: $listOfSpeciality,
  fn: (specialityList, input) =>
    specialityList.filter((s) => `${s.code}–${s.name}`.includes(input)),
  target: $listOfSpecialityForUser,
});

// training directions
sample({
  clock: selectTD,
  source: $listOfTDForUser,
  fn: (TDList, TDId) => TDList.find((td) => td.id === TDId) ?? null,
  target: form.fields.trainingDirection.$value,
});

sample({
  clock: form.fields.trainingDirection.$value.updates,
  source: $listOfTDForUser,
  fn: (TDList, td) => {
    const foundTD = TDList.find((t) => t.id === td?.id ?? -1);

    if (foundTD) {
      return `${foundTD.code}–${foundTD.name}`;
    }

    return '';
  },
  target: $TDInput,
});

sample({
  clock: $TDInput.updates,
  source: $listOfTD,
  fn: (TDList, input) =>
    TDList.filter((td) => `${td.code}–${td.name}`.includes(input)),
  target: $listOfTDForUser,
});

// FORWARDS
// levels
forward({
  from: openGate.open,
  to: getLevelsOfEducationFx,
});

forward({
  from: selectLevel,
  to: getUGSNByLevelFx,
});

// ugsn
forward({
  from: selectUGSN,
  to: getSpecialityByUGSNFx,
});

// speciality
forward({
  from: selectSpeciality,
  to: getTrainingDirectionBySpecialityFx,
});

export const bankFormModel = {
  events: {
    select: {
      level: selectLevel,
      ugsn: selectUGSN,
      speciality: selectSpeciality,
      trainingDirection: selectTD,
    },
    changeInput: {
      level: changeLevelInput,
      ugsn: changeUGSNInput,
      speciality: changeSpecialityInput,
      trainingDirection: changeTDInput,
    },
  },
  stores: {
    list: combine({
      level: $listOfLevelsEducationForUser,
      ugsn: $listOfUGSNForUser,
      speciality: $listOfSpecialityForUser,
      trainingDirection: $listOfTDForUser,
    }),
  },
  form,
  gates: {
    openGate,
  },
};
