import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';

import { createEffectWrapper, toastEvent } from '@utils';
import { levelsApi } from 'api';
import { Level } from 'types/level';

const levelTableGate = createGate();

const levelTableDomain = createDomain('level table domain');
levelTableDomain.onCreateStore((store) => store.reset(levelTableGate.close));

const getLevelsFx = createEffectWrapper(levelTableDomain, { handler: levelsApi.getAll });
const deleteLevelFx = createEffectWrapper(levelTableDomain, { handler: levelsApi.delete });

const deleteLevel = levelTableDomain.createEvent<string>();

const $levels = levelTableDomain
  .createStore<Level[]>([])
  .on(getLevelsFx.doneData, (_, levels) => levels);

const $deletingId = levelTableDomain.createStore<string>('').on(deleteLevel, (_, id) => id);

forward({
  from: levelTableGate.open,
  to: getLevelsFx,
});

forward({
  from: deleteLevel,
  to: deleteLevelFx,
});

const $levelsWithDeletingId = combine({
  levels: $levels,
  id: $deletingId,
});

sample({
  clock: deleteLevelFx.done,
  source: $levelsWithDeletingId,
  fn: ({ levels, id }) => {
    const deletingLevel = levels.find((level) => level.id === id);

    return deletingLevel?.title ?? '';
  },
  target: toastEvent.success,
});

export const levelTableModel = {
  stores: combine({
    levels: $levels,
    loading: getLevelsFx.pending,
  }),
  events: {
    deleteLevel,
  },
  gates: {
    levelTableGate,
  },
};
