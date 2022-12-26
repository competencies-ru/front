import React from 'react';

import { useSpring, animated } from '@react-spring/web';
import cn from 'classnames';
import { useStore } from 'effector-react';

import { userModel } from 'models';
import { Role } from 'types/user';

import { MainButton, Menu } from './components';

import styles from './LeftSide.module.scss';

interface IProps {
  collapsed: boolean;
}

const SHIFT = -285;

const LeftSide: React.FC<IProps> = ({ collapsed }) => {
  const { user } = useStore(userModel.$user);

  const [springStyles, api] = useSpring(() => ({
    from: {
      x: collapsed ? SHIFT : 0,
    },
  }));

  React.useEffect(() => {
    if (collapsed) {
      api.start({ x: SHIFT });
    } else {
      api.start({ x: 0 });
    }
  }, [api, collapsed]);

  const leftSideWrapperStyles = cn(styles.leftSideWrapper, {
    [styles.teacher]: user.role === Role.Teacher,
  });

  return (
    <animated.div style={springStyles}>
      <div className={leftSideWrapperStyles}>
        <MainButton />
        <Menu />
      </div>
    </animated.div>
  );
};

export default LeftSide;
