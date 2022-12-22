import React from 'react';

import { useSpring, animated } from '@react-spring/web';
import cn from 'classnames';

import { MiniCalendar } from './components';

import styles from './RightSide.module.scss';

interface IProps {
  collapsed: boolean;
}

const SHIFT = 385;

const RightSide: React.FC<IProps> = ({ collapsed }) => {
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

  const rightSideStyles = cn(styles.rightSide);

  return (
    <animated.div style={springStyles}>
      <div className={rightSideStyles}>
        <MiniCalendar />
      </div>
    </animated.div>
  );
};

export default RightSide;
