import { createDomain, sample } from 'effector';
import { createReEffect } from 'effector-reeffect';

import { bankApi } from 'api';
import type { Competence } from 'types/bank';
import type { Option } from 'types/select';

const competenceDomain = createDomain('competence domain');

const getCompetenceFx = createReEffect({ handler: bankApi.getCompetence });

// EVENTS
const selectCompetence = competenceDomain.createEvent<string>();
const changeCompetenceInput = competenceDomain.createEvent<string>();
const updateCompetenceField = competenceDomain.createEvent<Competence | null>();
const competenceFieldUpdated = competenceDomain.createEvent<Competence | null>();

// STORES
const $listOfCompetence = competenceDomain
  .createStore<Competence[]>([])
  .on(getCompetenceFx.doneData, (_, competenceList) => competenceList);

const $competenceOptions = competenceDomain
  .createStore<Option[]>([])
  .on(getCompetenceFx.doneData, (_, competenceList) =>
    competenceList.map(({ code, title }) => ({
      id: code,
      value: `${code}–${title}`,
    }))
  );

const $competenceInput = competenceDomain
  .createStore<string>('')
  .on(changeCompetenceInput, (_, v) => v);

// SAMPLES
sample({
  clock: selectCompetence,
  source: $competenceOptions,
  fn: (competenceList, competenceId) => {
    const selectedCompetence = competenceList.find((s) => s.id === competenceId);

    if (selectedCompetence) {
      return {
        code: selectedCompetence.id,
        title: selectedCompetence.value,
      };
    }

    return null;
  },
  target: updateCompetenceField,
});

sample({
  clock: competenceFieldUpdated,
  source: $competenceOptions,
  fn: (competenceList, sp) => {
    const foundCompetence = competenceList.find((s) => s.id === sp?.code ?? -1);

    if (foundCompetence) {
      return `${foundCompetence.id}–${foundCompetence.value}`;
    }

    return '';
  },
  target: $competenceInput,
});

sample({
  clock: $competenceInput.updates,
  source: $listOfCompetence,
  fn: (competenceList, input) =>
    competenceList
      .filter((s) => `${s.code}–${s.title}`.includes(input))
      .map(({ code, title }) => ({
        id: code,
        value: `${code}–${title}`,
      })),
  target: $competenceOptions,
});

// values
const $competenceValue = competenceDomain
  .createStore<string>('')
  .on(competenceFieldUpdated, (_, competence) => competence?.title ?? '');

export const competenceModel = {
  events: {
    selectCompetence: selectCompetence,
    changeCompetenceInput: changeCompetenceInput,
    updateCompetenceField: updateCompetenceField,
    competenceFieldUpdated: competenceFieldUpdated,
  },
  stores: {
    competenceOptions: $competenceOptions,
    competenceValue: $competenceValue,
  },
  effects: {
    getCompetenceFx: getCompetenceFx,
  },
};
