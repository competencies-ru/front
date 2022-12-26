import { combine, createDomain, forward } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';

import { validationRules } from '@utils';
import { UGSNRegExp } from '@utils/constants';
import type { CreateUGSNForm } from 'types/ugsn';

import { levelModel } from './models';

const UGSNFormDomain = createDomain('UGSN form domain');
UGSNFormDomain.onCreateStore((store) => store.reset(openGate.close));

// GATES
const openGate = createGate();

// FORMS
const form = createForm<CreateUGSNForm>({
  domain: UGSNFormDomain,
  fields: {
    level: {
      init: null,
      rules: [validationRules.required()],
    },
    ugsnCode: {
      init: '',
      rules: [
        validationRules.required(),
        validationRules.regExp(UGSNRegExp, 'Шаблон – xx.00.00, xx не может быть 00'),
      ],
    },
    ugsn: {
      init: '',
      rules: [validationRules.required()],
    },
  },
  validateOn: ['submit'],
});

// FORWARDS
// levels
forward({
  from: openGate.open,
  to: [levelModel.effects.getLevelsOfEducationFx],
});

// levels integration
forward({
  from: levelModel.events.updateLevelField,
  to: form.fields.level.onChange,
});

forward({ from: form.fields.level.$value.updates, to: levelModel.events.levelFieldUpdated });

export const indicatorFormModel = {
  events: {
    select: {
      level: levelModel.events.selectLevel,
    },
    changeInput: {
      level: levelModel.events.changeLevelInput,
    },
    clear: {
      level: levelModel.events.clearLevel,
    },
  },
  stores: {
    options: combine({
      levelOptions: levelModel.stores.levelOptions,
    }),
    values: combine({
      level: levelModel.stores.levelValue,
    }),
    loading: combine({
      level: levelModel.stores.optionsLoading,
    }),
  },
  form,
  gates: {
    openGate,
  },
};
