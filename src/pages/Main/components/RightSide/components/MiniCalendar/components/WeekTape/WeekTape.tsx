import React from 'react';

import { Typography, TypographyType } from '@ui/Typography';

import styles from './WeekTape.module.scss';

const WeekTape = () => {
  const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  return (
    <div className={styles.week}>
      {daysOfWeek.map((day) => (
        <Typography type={TypographyType.Span} key={day} className={styles.day}>
          {day}
        </Typography>
      ))}
    </div>
  );
};

export default React.memo(WeekTape);
