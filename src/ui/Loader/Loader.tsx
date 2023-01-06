import React from 'react';

import LoaderSVG from './assets/loader.svg';

import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.loader}>
    <LoaderSVG />
  </div>
);

export default React.memo(Loader);
