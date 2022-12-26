import { createDomain } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import type { CreateLevelForm } from 'types/level';

import { REQUIRED_TEXT_ERROR } from './constants';
const levelFormDomain = createDomain('indicator form domain');
levelFormDomain.onCreateStore((store) => store.reset(openGate.close));

// GATES
const openGate = createGate();

// FORMS
const form = createForm<CreateLevelForm>({
  domain: levelFormDomain,
  fields: {
    level: {
      init: '',
      rules: [
        {
          name: 'required',
          errorText: REQUIRED_TEXT_ERROR,
          validator: (l) => !!l,
        },
      ],
    },
  },
  validateOn: ['submit', 'change'],
});

export const levelFormModel = {
  form,
  gates: {
    openGate,
  },
};
