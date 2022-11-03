import React from 'react';

import cn from 'classnames';

import { Typography, TypographyType } from '@ui';

import { DropdownWrapper } from '../DropdownWrapper';

import styles from './YearDropdown.module.scss';

interface IProps {
  value: number;
  onChange: (year: number) => void;
}

const YearDropdown: React.FC<IProps> = ({ value, onChange }) => {
  const years = React.useMemo(
    () => new Array(8).fill(0).map((_, index) => value - 1 + index),
    [value]
  );

  const onClick = (v: number) => () => {
    onChange(v);
  };

  return (
    <DropdownWrapper value={value} onChange={onClick}>
      <div className={styles.content}>
        {years.map((year) => {
          const yearStyles = cn(styles.year, { [styles.selectedYear]: value === year });

          return (
            <button key={year} className={yearStyles} onClick={onClick(year)}>
              <Typography type={TypographyType.Div}>{year}</Typography>
            </button>
          );
        })}
      </div>
    </DropdownWrapper>
  );
};

export default React.memo(YearDropdown);
