import React from 'react';

import { useEvent, useStore } from 'effector-react';

import { Typography, TypographyType } from '@ui/Typography';
import { authModel, userModel } from 'models';

import { ReactComponent as Logo } from './assets/logo.svg';
import { ReactComponent as Logout } from './assets/logout.svg';

import styles from './Header.module.scss';

const Header = () => {
  const { user } = useStore(userModel.$user);
  const { logout } = useEvent(authModel);

  const onLogout = () => {
    logout();
  };

  return (
    <div className={styles.header}>
      <div className={styles.projectInfo}>
        <Logo />
        <Typography type={TypographyType.H1} className={styles.title}>
          TITLE
        </Typography>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.circle} />
        <Typography type={TypographyType.Span} className={styles.userName}>
          {user.name}
        </Typography>
        <button type="button" onClick={onLogout}>
          <Logout />
        </button>
      </div>
    </div>
  );
};

export default Header;
