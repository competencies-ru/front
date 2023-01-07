import { combine, createDomain, guard, sample, split } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import { createEffectWrapper, history, toastEvent, validateUUID, validationRules } from '@utils';
import { levelsApi } from 'api';
import type { CreateLevelForm } from 'types/level';

const levelFormDomain = createDomain('level form domain');
levelFormDomain.onCreateStore((store) => store.reset(openGate.close));

const getLevelFx = createEffectWrapper(levelFormDomain, { handler: levelsApi.getById });
const createLevelFx = createEffectWrapper(levelFormDomain, { handler: levelsApi.create });
const updateLevelFx = createEffectWrapper(levelFormDomain, { handler: levelsApi.update });

// GATES
const openGate = createGate<string | null>();

// STORES
const $id = levelFormDomain.createStore('');
const $currentLevel = levelFormDomain.createStore('');

// FORMS
const form = createForm<CreateLevelForm>({
  domain: levelFormDomain,
  fields: {
    level: {
      init: '',
      rules: [validationRules.required()],
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: getLevelFx.doneData,
  fn: ({ title }) => title,
  target: [form.fields.level.onChange, $currentLevel],
});

// validate id
sample({
  source: guard({
    source: openGate.open,
    filter: (id): id is string => !!id,
  }),
  fn: (id) => validateUUID(id, () => history.push('/level')),
  target: $id,
});

guard({
  source: $id.updates,
  filter: (id) => !!id,
  target: getLevelFx,
});

// TODO
// split({
//   source: $id,
//   clock: form.formValidated,
//   match: {
//     create: (id) => !id,
//     update: (id) => !!id,
//   },
//   cases: {
//     create: createLevelFx,
//     update: updateLevelFx,
//   },
// });

sample({
  clock: form.formValidated,
  fn: (form) => form.level,
  target: createLevelFx,
});

sample({
  clock: createLevelFx.done,
  source: form.$values,
  fn: (form) => {
    history.push('/level');
    return `Уровень "${form.level}" создан`;
  },
  target: toastEvent.success,
});

const $formWithLevelBeforeUpdate = combine({
  form: form.$values,
  currentLevel: $currentLevel,
});

sample({
  clock: updateLevelFx.done,
  source: $formWithLevelBeforeUpdate,
  fn: ({ form, currentLevel }) => {
    history.push('/level');
    return `Уровень "${currentLevel}" изменен на "${form.level}"`;
  },
  target: toastEvent.success,
});

export const levelFormModel = {
  stores: {
    currentLevel: $currentLevel,
  },
  form,
  gates: {
    openGate,
  },
};
