import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';

import { createEffectWrapper, createOptionStore } from '@utils';
import { ugsnApi, levelsApi, specialityApi, programsApi } from 'api';
import { Level } from 'types/level';
import { Program } from 'types/program';
import { Speciality } from 'types/speciality';
import { UGSN } from 'types/ugsn';

const levelOptions = createOptionStore<Level>(levelsApi.getAll);
const UGSNOptions = createOptionStore<UGSN, string>(ugsnApi.getAll);
const specialityOptions = createOptionStore<Speciality, string>(specialityApi.getAll);

const programTableGate = createGate<undefined>();

forward({
  from: programTableGate.close,
  to: [
    levelOptions.events.resetAll,
    UGSNOptions.events.resetAll,
    specialityOptions.events.resetAll,
  ],
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

forward({
  from: [levelOptions.events.clear, levelOptions.events.onSelect],
  to: [UGSNOptions.events.clear, specialityOptions.events.clear],
});

forward({
  from: [UGSNOptions.events.clear, UGSNOptions.events.onSelect],
  to: specialityOptions.events.clear,
});

forward({
  from: programTableGate.open,
  to: levelOptions.events.getOptions,
});

forward({
  from: levelOptions.events.onSelect,
  to: UGSNOptions.events.getOptions,
});

forward({
  from: UGSNOptions.events.onSelect,
  to: specialityOptions.events.getOptions,
});

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
