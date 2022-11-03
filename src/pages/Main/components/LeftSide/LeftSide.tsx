import React from 'react';

import cn from 'classnames';
import { useStore } from 'effector-react';

import { userModel } from 'models';
import { Role } from 'types/user';

import { MainButton, Menu } from './components';

import styles from './LeftSide.module.scss';

interface IProps {
  collapsed: boolean;
}

const LeftSide: React.FC<IProps> = ({ collapsed }) => {
  const { user } = useStore(userModel.$user);

  const leftSideWrapperStyles = cn(styles.leftSideWrapper, {
    [styles.teacher]: user.role === Role.Teacher,
    [styles.collapsed]: collapsed,
  });

  return (
    <div className={leftSideWrapperStyles}>
      <MainButton />
      <Menu />
    </div>
  );
};

export default LeftSide;
