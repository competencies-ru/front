import { createDomain, sample } from 'effector';

import { createEffectWrapper } from '@utils';
import { specialityApi } from 'api';
import type { Option } from 'types/select';
import type { Speciality } from 'types/speciality';

const specialityDomain = createDomain('speciality domain');

const getSpecialityFx = createEffectWrapper(specialityDomain, { handler: specialityApi.getAll });

// EVENTS
const selectSpeciality = specialityDomain.createEvent<string>();
const changeSpecialityInput = specialityDomain.createEvent<string>();
const updateSpecialityField = specialityDomain.createEvent<Speciality | null>();
const specialityFieldUpdated = specialityDomain.createEvent<Speciality | null>();
const clearSpeciality = specialityDomain.createEvent();

// STORES
const $listOfSpeciality = specialityDomain
  .createStore<Speciality[]>([])
  .on(getSpecialityFx.doneData, (_, specialityList) => specialityList);

const $specialityOptions = specialityDomain
  .createStore<Option[]>([])
  .on(getSpecialityFx.doneData, (_, specialityList) =>
    specialityList.map(({ id, code, title }) => ({
      id,
      value: `${code} – ${title}`,
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
        id: selectedSpeciality.id,
        code: selectedSpeciality.value.split(' – ')[0],
        title: selectedSpeciality.value.split(' – ')[1],
      };
    }

    return null;
  },
  target: updateSpecialityField,
});

sample({
  clock: clearSpeciality,
  fn: () => null,
  target: updateSpecialityField,
});

sample({
  clock: specialityFieldUpdated,
  source: $specialityOptions,
  fn: (specialityList, sp) => {
    const foundSpeciality = specialityList.find((s) => s.id === sp?.code ?? -1);

    if (foundSpeciality) {
      return `${foundSpeciality.id} – ${foundSpeciality.value}`;
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
      .filter((s) => `${s.code} – ${s.title}`.includes(input))
      .map(({ code, title }) => ({
        id: code,
        value: `${code} – ${title}`,
      })),
  target: $specialityOptions,
});

// values
const $specialityValue = specialityDomain
  .createStore<string>('')
  .on(specialityFieldUpdated, (_, speciality) => {
    if (speciality) {
      return `${speciality.code} – ${speciality.title}`;
    }

    return '';
  });

export const specialityModel = {
  events: {
    selectSpeciality: selectSpeciality,
    changeSpecialityInput: changeSpecialityInput,
    updateSpecialityField: updateSpecialityField,
    specialityFieldUpdated: specialityFieldUpdated,
    clearSpeciality: clearSpeciality,
  },
  stores: {
    specialityOptions: $specialityOptions,
    specialityValue: $specialityValue,
    optionsLoading: getSpecialityFx.pending,
  },
  effects: {
    getSpecialityFx: getSpecialityFx,
  },
};
