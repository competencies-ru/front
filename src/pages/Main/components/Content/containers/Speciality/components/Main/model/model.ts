import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';

import { createEffectWrapper, createOptionStore, toastEvent } from '@utils';
import { ugsnApi, levelsApi, specialityApi } from 'api';
import { Level } from 'types/level';
import { Speciality } from 'types/speciality';
import { UGSN } from 'types/ugsn';

const specialityTableGate = createGate<undefined>();

// options
const levelOptions = createOptionStore<Level>({
  handler: levelsApi.getAll,
  dependsOnGetOptions: specialityTableGate.open,
  dependsOnResetAll: specialityTableGate.close,
});

const UGSNOptions = createOptionStore<UGSN, string>({
  handler: ugsnApi.getAll,
  dependsOnClear: levelOptions,
  dependsOnGetOptions: levelOptions,
  dependsOnResetAll: specialityTableGate.close,
});

const specialityTableDomain = createDomain('speciality table domain');
specialityTableDomain.onCreateStore((store) => store.reset(specialityTableGate.close));

const getSpecialtiesFx = createEffectWrapper(specialityTableDomain, {
  handler: specialityApi.getAll,
});
const deleteSpecialityFx = createEffectWrapper(specialityTableDomain, {
  handler: specialityApi.delete,
});

const deleteSpeciality = specialityTableDomain.createEvent<string>();

const $specialties = specialityTableDomain
  .createStore<Speciality[]>([])
  .on(getSpecialtiesFx.doneData, (_, specialties) => specialties)
  .reset([
    UGSNOptions.events.clear,
    UGSNOptions.events.resetAll,
    levelOptions.events.clear,
    levelOptions.events.resetAll,
  ]);

const $deletingId = specialityTableDomain
  .createStore<string>('')
  .on(deleteSpeciality, (_, id) => id);

sample({
  clock: UGSNOptions.events.onSelect,
  fn: (ugsnId) => ugsnId,
  target: getSpecialtiesFx,
});

forward({
  from: deleteSpeciality,
  to: deleteSpecialityFx,
});

sample({
  clock: deleteSpecialityFx.done,
  source: combine({
    specialties: $specialties,
    id: $deletingId,
  }),
  fn: ({ specialties, id }) => {
    const deletingSpeciality = specialties.find((speciality) => speciality.id === id);

    return deletingSpeciality?.title ?? '';
  },
  target: toastEvent.success,
});

export const specialityTableModel = {
  stores: combine({
    specialties: $specialties,
    loading: getSpecialtiesFx.pending,
  }),
  events: {
    deleteSpeciality,
  },
  levelOptions,
  UGSNOptions,
  gates: {
    specialityTableGate,
  },
};
