import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Typography, TypographyType } from '@ui';

import { New } from './components';

import styles from './UGSN.module.scss';

class UGSN extends React.Component {
  static New = New;

  render() {
    const newUGSNLink = `${window.location.pathname}/new`;

    return (
      <>
        <Link to={newUGSNLink}>
          <Button className={styles.btn}>Создать УГСН</Button>
        </Link>
        <Typography type={TypographyType.H3} className={styles.title}>
          УГСН
        </Typography>
      </>
    );
  }
}

export default UGSN;
