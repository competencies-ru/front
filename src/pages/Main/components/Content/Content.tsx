import React from 'react';

import cn from 'classnames';
import { Navigate, Route, Routes, useLocation } from 'react-router';

import { FullScreenIcon } from './components';
import { Bank } from './containers';

import styles from './Content.module.scss';

interface IProps {
  collapsed: boolean;
  onCollapse: () => void;
}

const Content: React.FC<IProps> = ({ collapsed, onCollapse }) => {
  const { pathname } = useLocation();

  const contentStyles = cn(styles.contentWrapper, { [styles.collapsed]: collapsed });

  return (
    <div className={contentStyles}>
      <div className={styles.content}>
        <FullScreenIcon collapsed={collapsed} onCollapse={onCollapse} />
        <React.Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/bank">
              <Route index element={<Bank />} />
              <Route path="new" element={<Bank.New />} />
              <Route path=":id" element={<div>edit</div>} />
            </Route>
            {pathname !== '/' && <Route path="/*" element={<Navigate to="/" />} />}
          </Routes>
        </React.Suspense>
      </div>
    </div>
  );
};

export default React.memo(Content);
