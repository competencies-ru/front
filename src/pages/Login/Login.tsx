/* eslint-disable no-console */
import React from 'react';

const Lottie = React.lazy(() =>
  import('react-lottie-player').then((lib) => ({ default: lib.default }))
);

import animation from '@lotties/login.json';

import { Form } from './components';

import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.animation}>
        <Lottie animationData={animation} play loop />
      </div>
      <Form />
    </div>
  );
};

export default Login;
