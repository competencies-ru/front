/* eslint-disable effector/no-watch */
import { createDomain } from 'effector';

import history from '@utils/history';
import { ILogin } from 'types/auth';

const authDomain = createDomain('auth domain');

const login = authDomain.createEvent<ILogin>();
const logout = authDomain.createEvent();

login.watch(() => {
  history.push('/');
});

logout.watch(() => {
  localStorage.clear();

  history.push('/login');
});

export const authModel = {
  login,
  logout,
};
