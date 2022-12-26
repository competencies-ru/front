import { createDomain, sample } from 'effector';
import { createReEffect } from 'effector-reeffect';

import { bankApi } from 'api';
import type { TrainingDirection } from 'types/bank';
import type { Option } from 'types/select';

const TDDomain = createDomain('TD domain');

const getTDFx = createReEffect({ handler: bankApi.getTrainingDirection });

// EVENTS
const selectTD = TDDomain.createEvent<string>();
const changeTDInput = TDDomain.createEvent<string>();
const updateTDField = TDDomain.createEvent<TrainingDirection | null>();
const TDFieldUpdated = TDDomain.createEvent<TrainingDirection | null>();
const clearTD = TDDomain.createEvent();

// STORES
const $listOfTD = TDDomain.createStore<TrainingDirection[]>([]).on(
  getTDFx.doneData,
  (_, TDList) => TDList
);

const $TDOptions = TDDomain.createStore<Option[]>([]).on(getTDFx.doneData, (_, TDList) =>
  TDList.map(({ code, title }) => ({
    id: code,
    value: `${code}–${title}`,
  }))
);

const $TDInput = TDDomain.createStore<string>('').on(changeTDInput, (_, v) => v);

// SAMPLES
sample({
  clock: selectTD,
  source: $TDOptions,
  fn: (TDList, TDId) => {
    const selectedTD = TDList.find((s) => s.id === TDId);

    if (selectedTD) {
      return {
        code: selectedTD.id,
        title: selectedTD.value,
      };
    }

    return null;
  },
  target: updateTDField,
});

sample({
  clock: clearTD,
  fn: () => null,
  target: updateTDField,
});

sample({
  clock: TDFieldUpdated,
  source: $TDOptions,
  fn: (TDList, sp) => {
    const foundTD = TDList.find((s) => s.id === sp?.code ?? -1);

    if (foundTD) {
      return `${foundTD.id}–${foundTD.value}`;
    }

    return '';
  },
  target: $TDInput,
});

sample({
  clock: $TDInput.updates,
  source: $listOfTD,
  fn: (TDList, input) =>
    TDList.filter((s) => `${s.code}–${s.title}`.includes(input)).map(({ code, title }) => ({
      id: code,
      value: `${code}–${title}`,
    })),
  target: $TDOptions,
});

// values
const $TDValue = TDDomain.createStore<string>('').on(TDFieldUpdated, (_, TD) => TD?.title ?? '');

export const TDModel = {
  events: {
    selectTD: selectTD,
    changeTDInput: changeTDInput,
    updateTDField: updateTDField,
    TDFieldUpdated: TDFieldUpdated,
    clearTD: clearTD,
  },
  stores: {
    TDOptions: $TDOptions,
    TDValue: $TDValue,
    optionsLoading: getTDFx.pending,
  },
  effects: {
    getTDFx: getTDFx,
  },
};
