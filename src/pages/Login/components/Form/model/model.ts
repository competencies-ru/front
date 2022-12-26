import { createDomain, forward } from 'effector';
import { createForm } from 'effector-forms';

import { authModel } from 'models';
import { ILogin } from 'types/auth';

const loginFormDomain = createDomain('login form domain');

const form = createForm<ILogin>({
  domain: loginFormDomain,
  fields: {
    email: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: (value: string) => !!value,
          errorText: 'Пустое поле',
        },
        {
          name: 'mask of email',
          validator: (value: string) => /\S+@\S+\.\S+/.test(value),
          errorText: 'Невалидный email',
        },
      ],
    },
    password: {
      init: '',
      rules: [
        {
          name: 'required',
          validator: (value: string) => Boolean(value),
          errorText: 'Пустое поле',
        },
      ],
    },
  },
  validateOn: ['submit'],
});

forward({
  from: form.formValidated,
  to: authModel.login,
});

export { form };
