import React from 'react';

import cn from 'classnames';

import { MiniCalendar } from './components';

import styles from './RightSide.module.scss';

interface IProps {
  collapsed: boolean;
}

const RightSide: React.FC<IProps> = ({ collapsed }) => {
  const rightSideStyles = cn(styles.rightSide, { [styles.collapsed]: collapsed });

  return (
    <div className={rightSideStyles}>
      <MiniCalendar />
    </div>
  );
};

export default RightSide;
