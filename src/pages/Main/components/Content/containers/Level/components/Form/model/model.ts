import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import { validationRules } from '@utils';
import type { CreateLevelForm } from 'types/level';

const levelFormDomain = createDomain('level form domain');
levelFormDomain.onCreateStore((store) => store.reset(openGate.close));

// GATES
const openGate = createGate();

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

export const levelFormModel = {
  form,
  gates: {
    openGate,
  },
};
