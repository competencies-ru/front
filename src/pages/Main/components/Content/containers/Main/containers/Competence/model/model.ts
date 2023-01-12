import { combine, createDomain, guard, sample } from 'effector';
import { createGate } from 'effector-react';

import { createEffectWrapper, createOptionStore } from '@utils';
import { ugsnApi, levelsApi, specialityApi, programsApi, competenciesApi } from 'api';
import type { Competence } from 'types/competence';
import type { Level } from 'types/level';
import type { Program } from 'types/program';
import type { Speciality } from 'types/speciality';
import type { UGSN } from 'types/ugsn';

const competenceTableGate = createGate<undefined>();

// options
const levelOptions = createOptionStore<Level>({
  handler: levelsApi.getAll,
  dependsOnGetOptions: competenceTableGate.open,
  dependsOnResetAll: competenceTableGate.close,
});

const UGSNOptions = createOptionStore<UGSN, string>({
  handler: ugsnApi.getAll,
  dependsOnClear: levelOptions,
  dependsOnGetOptions: levelOptions,
  dependsOnResetAll: competenceTableGate.close,
});

const specialityOptions = createOptionStore<Speciality, string>({
  handler: specialityApi.getAll,
  dependsOnClear: [levelOptions, UGSNOptions],
  dependsOnGetOptions: UGSNOptions,
  dependsOnResetAll: competenceTableGate.close,
});

const programOptions = createOptionStore<Program, string>({
  handler: programsApi.getAll,
  dependsOnClear: [levelOptions, UGSNOptions, specialityOptions],
  dependsOnGetOptions: specialityOptions,
  dependsOnResetAll: competenceTableGate.close,
});

const competenceTableDomain = createDomain('competence table domain');
competenceTableDomain.onCreateStore((store) => store.reset(competenceTableGate.close));

const getCompetenciesFx = createEffectWrapper(competenceTableDomain, {
  handler: competenciesApi.getAll,
});

const $competencies = competenceTableDomain
  .createStore<Competence[]>([])
  .on(getCompetenciesFx.doneData, (_, competencies) => competencies)
  .reset([
    programOptions.events.clear,
    programOptions.events.resetAll,
    specialityOptions.events.clear,
    specialityOptions.events.resetAll,
    UGSNOptions.events.clear,
    UGSNOptions.events.resetAll,
    levelOptions.events.clear,
    levelOptions.events.resetAll,
  ]);

sample({
  clock: guard({
    source: combine({
      levelId: levelOptions.stores.selectedOptionId,
      ugsnId: UGSNOptions.stores.selectedOptionId,
      specialityId: specialityOptions.stores.selectedOptionId,
      programId: programOptions.stores.selectedOptionId,
    }),
    filter: ({ levelId }) => Boolean(levelId),
  }),
  fn: ({ levelId, ugsnId, specialityId, programId }) => ({
    levelId: levelId,
    ugsnId: ugsnId || undefined,
    specialtyId: specialityId || undefined,
    programId: programId || undefined,
  }),
  target: getCompetenciesFx,
});

export const competenceTableModel = {
  stores: combine({
    competencies: $competencies,
    loading: getCompetenciesFx.pending,
  }),
  levelOptions,
  UGSNOptions,
  specialityOptions,
  programOptions,
  gates: {
    competenceTableGate,
  },
};
