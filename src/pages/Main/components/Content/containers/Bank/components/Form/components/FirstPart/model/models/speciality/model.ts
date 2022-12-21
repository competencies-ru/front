import { createDomain, sample } from 'effector';
import { createReEffect } from 'effector-reeffect';

import { bankApi } from 'api';
import type { Speciality } from 'types/bank';
import type { Option } from 'types/select';

const specialityDomain = createDomain('speciality domain');

const getSpecialityFx = createReEffect({ handler: bankApi.getSpeciality });

// EVENTS
const selectSpeciality = specialityDomain.createEvent<string>();
const changeSpecialityInput = specialityDomain.createEvent<string>();
const updateSpecialityField = specialityDomain.createEvent<Speciality | null>();
const specialityFieldUpdated = specialityDomain.createEvent<Speciality | null>();

// STORES
const $listOfSpeciality = specialityDomain
  .createStore<Speciality[]>([])
  .on(getSpecialityFx.doneData, (_, specialityList) => specialityList);

const $specialityOptions = specialityDomain
  .createStore<Option[]>([])
  .on(getSpecialityFx.doneData, (_, specialityList) =>
    specialityList.map(({ code, title }) => ({
      id: code,
      value: `${code}–${title}`,
    }))
  );

const $specialityInput = specialityDomain
  .createStore<string>('')
  .on(changeSpecialityInput, (_, v) => v);

// SAMPLES
sample({
  clock: selectSpeciality,
  source: $specialityOptions,
  fn: (specialityList, specialityId) => {
    const selectedSpeciality = specialityList.find((s) => s.id === specialityId);

    if (selectedSpeciality) {
      return {
        code: selectedSpeciality.id,
        title: selectedSpeciality.value,
      };
    }

    return null;
  },
  target: updateSpecialityField,
});

sample({
  clock: specialityFieldUpdated,
  source: $specialityOptions,
  fn: (specialityList, sp) => {
    const foundSpeciality = specialityList.find((s) => s.id === sp?.code ?? -1);

    if (foundSpeciality) {
      return `${foundSpeciality.id}–${foundSpeciality.value}`;
    }

    return '';
  },
  target: $specialityInput,
});

sample({
  clock: $specialityInput.updates,
  source: $listOfSpeciality,
  fn: (specialityList, input) =>
    specialityList
      .filter((s) => `${s.code}–${s.title}`.includes(input))
      .map(({ code, title }) => ({
        id: code,
        value: `${code}–${title}`,
      })),
  target: $specialityOptions,
});

// values
const $specialityValue = specialityDomain
  .createStore<string>('')
  .on(specialityFieldUpdated, (_, speciality) => speciality?.title ?? '');

export const specialityModel = {
  events: {
    selectSpeciality: selectSpeciality,
    changeSpecialityInput: changeSpecialityInput,
    updateSpecialityField: updateSpecialityField,
    specialityFieldUpdated: specialityFieldUpdated,
  },
  stores: {
    specialityOptions: $specialityOptions,
    specialityValue: $specialityValue,
  },
  effects: {
    getSpecialityFx: getSpecialityFx,
  },
};
