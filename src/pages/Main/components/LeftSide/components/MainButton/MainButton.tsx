import React from 'react';

import { useStore } from 'effector-react';

import { userModel } from 'models';

import StyledMainButton from './StyledMainButton/StyledMainButton';

const MainButton: React.FC = () => {
  const { user } = useStore(userModel.$user);

  const Component = StyledMainButton[user.role];

  return <Component />;
};

export default React.memo(MainButton);
