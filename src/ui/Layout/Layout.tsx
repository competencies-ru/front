import React from 'react';

import styles from './Layout.module.scss';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default React.memo(Layout);
