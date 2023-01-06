import { combine, createDomain, sample } from 'effector';
import { createGate } from 'effector-react';

import { createEffectWrapper, createOptionStore } from '@utils';
import { ugsnApi, levelsApi, specialityApi, programsApi } from 'api';
import { Level } from 'types/level';
import { Program } from 'types/program';
import { Speciality } from 'types/speciality';
import { UGSN } from 'types/ugsn';

const programTableGate = createGate<undefined>();

// options
const levelOptions = createOptionStore<Level>({
  handler: levelsApi.getAll,
  dependsOnGetOptions: programTableGate.open,
  dependsOnResetAll: programTableGate.close,
});

const UGSNOptions = createOptionStore<UGSN, string>({
  handler: ugsnApi.getAll,
  dependsOnClear: levelOptions,
  dependsOnGetOptions: levelOptions,
  dependsOnResetAll: programTableGate.close,
});

const specialityOptions = createOptionStore<Speciality, string>({
  handler: specialityApi.getAll,
  dependsOnClear: [levelOptions, UGSNOptions],
  dependsOnGetOptions: UGSNOptions,
  dependsOnResetAll: programTableGate.close,
});

const programTableDomain = createDomain('program table domain');
programTableDomain.onCreateStore((store) => store.reset(programTableGate.close));

const getProgramsFx = createEffectWrapper(programTableDomain, {
  handler: programsApi.getAll,
});

const $programs = programTableDomain
  .createStore<Program[]>([])
  .on(getProgramsFx.doneData, (_, programs) => programs)
  .reset([
    specialityOptions.events.clear,
    specialityOptions.events.resetAll,
    UGSNOptions.events.clear,
    UGSNOptions.events.resetAll,
    levelOptions.events.clear,
    levelOptions.events.resetAll,
  ]);

sample({
  clock: specialityOptions.events.onSelect,
  fn: (specialityId) => specialityId,
  target: getProgramsFx,
});

export const programsTableModel = {
  stores: combine({
    programs: $programs,
    loading: getProgramsFx.pending,
  }),
  levelOptions,
  UGSNOptions,
  specialityOptions,
  gates: {
    programTableGate,
  },
};
