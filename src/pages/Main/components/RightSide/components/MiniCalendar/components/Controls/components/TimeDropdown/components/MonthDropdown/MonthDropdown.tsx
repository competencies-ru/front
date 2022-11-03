import React from 'react';

import cn from 'classnames';

import { Typography, TypographyType } from '@ui';

import { DropdownWrapper } from '../DropdownWrapper';
import { MONTHS } from '../constants';

import styles from './MonthDropdown.module.scss';

interface IProps {
  value: number;
  onChange: (year: number) => void;
}

const MonthDropdown: React.FC<IProps> = ({ value, onChange }) => {
  const onClick = (v: number) => () => {
    onChange(v);
  };

  return (
    <DropdownWrapper value={value} onChange={onClick}>
      <div className={styles.content}>
        {MONTHS.map((month, index) => {
          const monthStyles = cn(styles.month, { [styles.selectedMonth]: value === index });

          return (
            <button key={month} className={monthStyles} onClick={onClick(index)}>
              <Typography type={TypographyType.Div}>{month}</Typography>
            </button>
          );
        })}
      </div>
    </DropdownWrapper>
  );
};

export default React.memo(MonthDropdown);
