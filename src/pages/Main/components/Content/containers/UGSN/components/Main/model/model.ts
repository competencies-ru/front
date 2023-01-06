import { combine, createDomain, forward, sample } from 'effector';
import { createGate } from 'effector-react';

import { createEffectWrapper, createOptionStore, toastEvent } from '@utils';
import { ugsnApi, levelsApi } from 'api';
import { Level } from 'types/level';
import { UGSN } from 'types/ugsn';

const levelOptions = createOptionStore<Level>(levelsApi.getAll);

const UGSNTableGate = createGate<undefined>();

forward({ from: UGSNTableGate.close, to: levelOptions.events.resetAll });

const UGSNTableDomain = createDomain('ugsn table domain');
UGSNTableDomain.onCreateStore((store) => store.reset(UGSNTableGate.close));

const getUGSNsFx = createEffectWrapper(UGSNTableDomain, { handler: ugsnApi.getAll });
const deleteUGSNsFx = createEffectWrapper(UGSNTableDomain, { handler: ugsnApi.delete });

const deleteUGSN = UGSNTableDomain.createEvent<string>();

const $UGSNs = UGSNTableDomain.createStore<UGSN[]>([])
  .on(getUGSNsFx.doneData, (_, UGSNList) => UGSNList)
  .reset([levelOptions.events.clear, levelOptions.events.resetAll]);

const $deletingId = UGSNTableDomain.createStore<string>('').on(deleteUGSN, (_, id) => id);

forward({
  from: UGSNTableGate.open,
  to: levelOptions.events.getOptions,
});

forward({
  from: levelOptions.events.onSelect,
  to: getUGSNsFx,
});

forward({
  from: deleteUGSN,
  to: deleteUGSNsFx,
});

const $UGSNsWithDeletingId = combine({
  UGSNs: $UGSNs,
  id: $deletingId,
});

sample({
  clock: deleteUGSNsFx.done,
  source: $UGSNsWithDeletingId,
  fn: ({ UGSNs, id }) => {
    const deletingUGSN = UGSNs.find((UGSN) => UGSN.id === id);

    return deletingUGSN?.title ?? '';
  },
  target: toastEvent.success,
});

export const UGSNTableModel = {
  stores: combine({
    UGSNs: $UGSNs,
    loading: getUGSNsFx.pending,
  }),
  events: {
    deleteUGSN,
  },
  levelOptions,
  gates: {
    UGSNTableGate,
  },
};
