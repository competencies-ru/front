import { combine, createDomain } from 'effector';

import { Role, IUser } from 'types/user';

const userDomain = createDomain('user domain');

const $user = userDomain.createStore<IUser>({
  name: 'Прокопенко Николай',
  role: Role.Teacher,
});

export const userModel = {
  $user: combine({ user: $user }),
};
