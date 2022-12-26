import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Typography, TypographyType } from '@ui';

import { New } from './components';

import styles from './Indicator.module.scss';

class Indicator extends React.Component {
  static New = New;

  render() {
    const newIndicatorLink = `${window.location.pathname}/new`;

    return (
      <>
        <Link to={newIndicatorLink}>
          <Button className={styles.btn}>Создать индикатор</Button>
        </Link>
        <Typography type={TypographyType.H3} className={styles.title}>
          Индикаторы
        </Typography>
      </>
    );
  }
}

export default Indicator;
