import React from 'react';

import { useStore } from 'effector-react';

import { Header } from '@components';

import { LeftSide, RightSide, Content } from './components';
import { uxModel } from './model';

import styles from './Main.module.scss';

const Main = () => {
  const { fullWidthContent } = useStore(uxModel.$store);

  const handleCollapse = React.useCallback(() => {
    uxModel.changeFullWidthContainer();
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <Header />
      <div className={styles.content}>
        <LeftSide collapsed={fullWidthContent} />
        <Content collapsed={fullWidthContent} onCollapse={handleCollapse} />
        <RightSide collapsed={fullWidthContent} />
      </div>
    </div>
  );
};

export default Main;
