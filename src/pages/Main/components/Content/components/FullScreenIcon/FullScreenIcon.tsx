import React from 'react';

import cn from 'classnames';

import styles from './FullScreenIcon.module.scss';

interface IProps {
  collapsed: boolean;
  onCollapse: () => void;
}

const FullScreenIcon: React.FC<IProps> = ({ collapsed, onCollapse }) => {
  const partStyles = cn(styles.part, { [styles.collapsed]: collapsed });
  const wrapperStyles = cn(styles.wrapper, { [styles.collapsed]: collapsed });

  return (
    <button className={styles.fullScreenIcon} onClick={onCollapse}>
      <div className={wrapperStyles}>
        <div className={partStyles}>
          <div />
          <div />
        </div>
        <div className={partStyles}>
          <div />
          <div />
        </div>
        <div className={partStyles}>
          <div />
          <div />
        </div>
        <div className={partStyles}>
          <div />
          <div />
        </div>
      </div>
    </button>
  );
};

export default React.memo(FullScreenIcon);
