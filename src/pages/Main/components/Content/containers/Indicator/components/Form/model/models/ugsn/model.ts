import { createDomain, sample } from 'effector';

import { createEffectWrapper } from '@utils';
import { ugsnApi } from 'api';
import type { Option } from 'types/select';
import type { UGSN } from 'types/ugsn';

const ugsnDomain = createDomain('ugsn domain');

const getUGSNFx = createEffectWrapper(ugsnDomain, { handler: ugsnApi.getAll });

// EVENTS
const selectUGSN = ugsnDomain.createEvent<string>();
const changeUGSNInput = ugsnDomain.createEvent<string>();
const updateUGSNField = ugsnDomain.createEvent<UGSN | null>();
const UGSNFieldUpdated = ugsnDomain.createEvent<UGSN | null>();
const clearUGSN = ugsnDomain.createEvent();

// STORES
const $listOfUGSN = ugsnDomain
  .createStore<UGSN[]>([])
  .on(getUGSNFx.doneData, (_, ugsnList) => ugsnList);

const $UGSNOptions = ugsnDomain.createStore<Option[]>([]).on(getUGSNFx.doneData, (_, ugsnList) =>
  ugsnList.map(({ id, code, title }) => ({
    id,
    value: `${code} – ${title}`,
  }))
);

const $UGSNInput = ugsnDomain.createStore<string>('').on(changeUGSNInput, (_, v) => v);

// SAMPLES
sample({
  clock: selectUGSN,
  source: $UGSNOptions,
  fn: (ugsnList, ugsnCode) => {
    const selectedUGSN = ugsnList.find((u) => u.id === ugsnCode);

    if (selectedUGSN) {
      return {
        id: selectedUGSN.id,
        code: selectedUGSN.value.split(' – ')[0],
        title: selectedUGSN.value.split(' – ')[0],
      };
    }

    return null;
  },
  target: updateUGSNField,
});

sample({
  clock: clearUGSN,
  fn: () => null,
  target: updateUGSNField,
});

sample({
  clock: UGSNFieldUpdated,
  source: $UGSNOptions,
  fn: (ugsnList, ug) => {
    const foundUGSN = ugsnList.find((u) => u.id === ug?.code ?? -1);

    if (foundUGSN) {
      return `${foundUGSN.id} – ${foundUGSN.value}`;
    }

    return '';
  },
  target: $UGSNInput,
});

sample({
  clock: $UGSNInput.updates,
  source: $listOfUGSN,
  fn: (ugsn, input) =>
    ugsn
      .filter((u) => `${u.code} – ${u.title}`.includes(input))
      .map(({ code, title }) => ({
        id: code,
        value: `${code} – ${title}`,
      })),
  target: $UGSNOptions,
});

// values
const $UGSNValue = ugsnDomain.createStore<string>('').on(UGSNFieldUpdated, (_, ugsn) => {
  if (ugsn) {
    return `${ugsn.code} – ${ugsn.title}`;
  }

  return '';
});

export const ugsnModel = {
  events: {
    selectUGSN: selectUGSN,
    changeUGSNInput: changeUGSNInput,
    updateUGSNField: updateUGSNField,
    UGSNFieldUpdated: UGSNFieldUpdated,
    clearUGSN: clearUGSN,
  },
  stores: {
    UGSNOptions: $UGSNOptions,
    UGSNValue: $UGSNValue,
    optionsLoading: getUGSNFx.pending,
  },
  effects: {
    getUGSNFx,
  },
};
