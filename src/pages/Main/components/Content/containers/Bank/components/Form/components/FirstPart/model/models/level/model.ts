import { createDomain, sample } from 'effector';

import { createEffectWrapper } from '@utils';
import { levelsApi } from 'api';
import type { Level } from 'types/level';
import type { Option } from 'types/select';

const levelDomain = createDomain('level domain');

const getLevelsFx = createEffectWrapper(levelDomain, { handler: levelsApi.getAll });

// EVENTS
const selectLevel = levelDomain.createEvent<string>();
const changeLevelInput = levelDomain.createEvent<string>();
const updateLevelField = levelDomain.createEvent<Level | null>();
const levelFieldUpdated = levelDomain.createEvent<Level | null>();
const clearLevel = levelDomain.createEvent();

// STORES
const $listOfLevelsEducation = levelDomain
  .createStore<Level[]>([])
  .on(getLevelsFx.doneData, (_, levels) => levels);

const $levelsOfEducationOptions = levelDomain
  .createStore<Option[]>([])
  .on(getLevelsFx.doneData, (_, levels) =>
    levels.map(({ id, title }) => ({
      id,
      value: title,
    }))
  );

const $levelInput = levelDomain.createStore<string>('').on(changeLevelInput, (_, v) => v);

// SAMPLES
sample({
  clock: selectLevel,
  source: $levelsOfEducationOptions,
  fn: (levels, levelId) => {
    const selectedLevelOption = levels.find((l) => l.id === levelId);

    if (selectedLevelOption) {
      return {
        id: selectedLevelOption.id,
        title: selectedLevelOption.value,
      };
    }

    return null;
  },
  target: updateLevelField,
});

sample({
  clock: clearLevel,
  fn: () => null,
  target: updateLevelField,
});

sample({
  clock: levelFieldUpdated,
  source: $levelsOfEducationOptions,
  fn: (levels, lvl) => levels.find((l) => l.id === lvl?.id ?? -1)?.value ?? '',
  target: $levelInput,
});

sample({
  clock: $levelInput.updates,
  source: $listOfLevelsEducation,
  fn: (levels, input) =>
    levels.filter((l) => l.title.includes(input)).map(({ id, title }) => ({ id, value: title })),
  target: $levelsOfEducationOptions,
});

// values
const $levelValue = levelDomain
  .createStore<string>('')
  .on(levelFieldUpdated, (_, level) => level?.title ?? '');

export const levelModel = {
  events: {
    selectLevel,
    changeLevelInput,
    updateLevelField,
    levelFieldUpdated,
    clearLevel,
  },
  stores: {
    levelOptions: $levelsOfEducationOptions,
    levelValue: $levelValue,
    optionsLoading: getLevelsFx.pending,
  },
  effects: {
    getLevelsFx,
  },
};
