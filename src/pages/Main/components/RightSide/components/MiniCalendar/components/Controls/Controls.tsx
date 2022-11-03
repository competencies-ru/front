import React from 'react';

import { ReactComponent as Left } from './assets/left.svg';
import { ReactComponent as Right } from './assets/right.svg';
import { TimeDropdown } from './components';

import styles from './Controls.module.scss';

interface IProps {
  month: number;
  year: number;
  changeMonth: (m: number) => void;
  changeYear: (y: number) => void;
}

const Controls: React.FC<IProps> = (props) => {
  const { month, year, changeMonth, changeYear } = props;

  const handleChangeMonth = (m: number) => () => {
    changeMonth(m);
  };

  return (
    <div className={styles.header}>
      <div className={styles.dropdowns}>
        <TimeDropdown.Month value={month} onChange={changeMonth} />
        <TimeDropdown.Year value={year} onChange={changeYear} />
      </div>
      <div className={styles.buttons}>
        <button onClick={handleChangeMonth(month - 1)}>
          <Left />
        </button>
        <button onClick={handleChangeMonth(month + 1)}>
          <Right />
        </button>
      </div>
    </div>
  );
};

export default React.memo(Controls);
