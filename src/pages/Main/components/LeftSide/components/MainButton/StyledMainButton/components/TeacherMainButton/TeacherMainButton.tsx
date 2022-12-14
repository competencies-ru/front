import React from 'react';

import { Link } from 'react-router-dom';

import { Typography, TypographyType } from '@ui/Typography';

import Arrow from '../../assets/arrow.svg';
// import { ReactComponent as Arrow } from '../../assets/arrow.svg';

import styles from '../../StyledMainButton.module.scss';

const TeacherMainButton = () => {
  return (
    <Link to="/someUrl" className={styles.mainButtonWrapper}>
      <Typography type={TypographyType.Span} className={styles.text}>
        Проверить
        <br />
        тесты
      </Typography>
      <div className={styles.arrowWrapper}>
        <Arrow />
      </div>
    </Link>
  );
};

export default TeacherMainButton;
