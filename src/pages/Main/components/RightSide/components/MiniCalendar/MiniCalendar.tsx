import React from 'react';

import cn from 'classnames';
import dayjs from 'dayjs';
import { useStore } from 'effector-react';

import { Controls, WeekTape } from './components';
import { calendarModel } from './model';

import styles from './MiniCalendar.module.scss';

const MiniCalendar = () => {
  const { currentDay, currentMonth, currentYear, monthCalendar } = useStore(
    calendarModel.$calendar
  );

  const dayClick = (day: Date) => () => {
    calendarModel.input.setDay(day);
  };

  return (
    <>
      <Controls
        month={currentMonth}
        year={currentYear}
        changeMonth={calendarModel.input.setMonth}
        changeYear={calendarModel.input.setYear}
      />
      <div className={styles.weekTapeWrapper}>
        <WeekTape />
      </div>
      <div className={styles.miniCalendar}>
        {monthCalendar.map((day) => {
          const dayStyles = cn({
            [styles.currentMonth]:
              day.getMonth() === dayjs(`${currentYear}.${currentMonth + 1}.1`).month(),
            [styles.currentDay]: day.getDate() === currentDay && day.getMonth() === currentMonth,
          });

          return (
            <button key={Number(day)} className={dayStyles} onClick={dayClick(day)}>
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default MiniCalendar;
