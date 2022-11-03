/* eslint-disable no-console */
import React from 'react';

import { Animation } from '@components';
import animation from '@lotties/login.json';

import { Form } from './components/Form';

import styles from './Login.module.scss';

const Login = () => {
  return (
    <div className={styles.login}>
      <Animation src={animation} className={styles.animation} />
      <Form />
    </div>
  );
};

export default Login;
