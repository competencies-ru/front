import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Typography, TypographyType } from '@ui';

import { New } from './components';

import styles from './Level.module.scss';

class Level extends React.Component {
  static New = New;

  render() {
    const newLevelLink = `${window.location.pathname}/new`;

    return (
      <>
        <Link to={newLevelLink}>
          <Button className={styles.btn}>Создать уровень</Button>
        </Link>
        <Typography type={TypographyType.H3} className={styles.title}>
          Уровни
        </Typography>
      </>
    );
  }
}

export default Level;
