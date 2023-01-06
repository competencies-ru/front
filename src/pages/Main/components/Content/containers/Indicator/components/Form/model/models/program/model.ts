import { createDomain, sample } from 'effector';

import { createEffectWrapper } from '@utils';
import { programsApi } from 'api';
import type { Program } from 'types/program';
import type { Option } from 'types/select';

const programDomain = createDomain('Program domain');

const getProgramFx = createEffectWrapper(programDomain, { handler: programsApi.getAll });

// EVENTS
const selectProgram = programDomain.createEvent<string>();
const changeProgramInput = programDomain.createEvent<string>();
const updateProgramField = programDomain.createEvent<Program | null>();
const programFieldUpdated = programDomain.createEvent<Program | null>();
const clearProgram = programDomain.createEvent();

// STORES
const $listOfProgram = programDomain
  .createStore<Program[]>([])
  .on(getProgramFx.doneData, (_, programList) => programList);

const $programOptions = programDomain
  .createStore<Option[]>([])
  .on(getProgramFx.doneData, (_, programList) =>
    programList.map(({ id, code, title }) => ({
      id,
      value: `${code} – ${title}`,
    }))
  );

const $programInput = programDomain.createStore<string>('').on(changeProgramInput, (_, v) => v);

// SAMPLES
sample({
  clock: selectProgram,
  source: $programOptions,
  fn: (programList, programId) => {
    const selectedProgram = programList.find((s) => s.id === programId);

    if (selectedProgram) {
      return {
        id: selectedProgram.id,
        code: selectedProgram.value.split(' – ')[0],
        title: selectedProgram.value.split(' – ')[1],
      };
    }

    return null;
  },
  target: updateProgramField,
});

sample({
  clock: clearProgram,
  fn: () => null,
  target: updateProgramField,
});

sample({
  clock: programFieldUpdated,
  source: $programOptions,
  fn: (programList, sp) => {
    const foundProgram = programList.find((s) => s.id === sp?.code ?? -1);

    if (foundProgram) {
      return `${foundProgram.id} – ${foundProgram.value}`;
    }

    return '';
  },
  target: $programInput,
});

sample({
  clock: $programInput.updates,
  source: $listOfProgram,
  fn: (programList, input) =>
    programList
      .filter((s) => `${s.code} – ${s.title}`.includes(input))
      .map(({ code, title }) => ({
        id: code,
        value: `${code} – ${title}`,
      })),
  target: $programOptions,
});

// values
const $programValue = programDomain
  .createStore<string>('')
  .on(programFieldUpdated, (_, program) => {
    if (program) {
      return `${program.code} – ${program.title}`;
    }

    return '';
  });

export const programModel = {
  events: {
    selectProgram: selectProgram,
    changeProgramInput: changeProgramInput,
    updateProgramField: updateProgramField,
    programFieldUpdated: programFieldUpdated,
    clearProgram: clearProgram,
  },
  stores: {
    programOptions: $programOptions,
    programValue: $programValue,
    optionsLoading: getProgramFx.pending,
  },
  effects: {
    getProgramFx: getProgramFx,
  },
};
