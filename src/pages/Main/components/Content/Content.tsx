import React from 'react';

import cn from 'classnames';
import { Route, Routes } from 'react-router';

import { FullScreenIcon } from './components';

import styles from './Content.module.scss';

interface IProps {
  collapsed: boolean;
  onCollapse: () => void;
}

const Content: React.FC<IProps> = ({ collapsed, onCollapse }) => {
  const contentStyles = cn(styles.contentWrapper, { [styles.collapsed]: collapsed });

  return (
    <div className={contentStyles}>
      <div className={styles.content}>
        <FullScreenIcon collapsed={collapsed} onCollapse={onCollapse} />
        <React.Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/constructor/new" element={<div>test</div>} />
          </Routes>
        </React.Suspense>
      </div>
    </div>
  );
};

export default React.memo(Content);
