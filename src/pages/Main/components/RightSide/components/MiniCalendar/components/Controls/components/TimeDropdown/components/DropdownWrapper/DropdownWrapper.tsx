import React from 'react';

import cn from 'classnames';

import { Typography, TypographyType } from '@ui/Typography';
import { useClickAway } from '@utils';

import Left from '../../../../assets/left.svg';
import Right from '../../../../assets/right.svg';
import DropdownArrow from '../../assets/dropdownArrow.svg';
// import { ReactComponent as Left } from '../../../../assets/left.svg';
// import { ReactComponent as Right } from '../../../../assets/right.svg';
// import { ReactComponent as DropdownArrow } from '../../assets/dropdownArrow.svg';
import { MONTHS } from '../constants';

import styles from './DropdownWrapper.module.scss';

interface IProps {
  value: number;
  children: React.ReactNode;
  onChange: (year: number) => () => void;
}

const YearDropdown: React.FC<IProps> = ({ value, children, onChange }) => {
  const [openedDropdown, setOpenedDropdown] = React.useState(false);

  const ref = React.useRef<HTMLDivElement | null>(null);

  const onClickAway = React.useCallback(() => {
    setOpenedDropdown(false);
  }, []);

  useClickAway(ref, onClickAway);

  const handleDropdown = () => {
    setOpenedDropdown((v) => !v);
  };

  const dropdownArrowStyles = cn(styles.arrow, { [styles.rotated]: openedDropdown });

  const innerValue = value > 12 ? value : MONTHS[value];

  return (
    <div ref={ref}>
      <button className={styles.mainPart} onClick={handleDropdown}>
        <Typography type={TypographyType.Div} className={styles.value}>
          {innerValue}
        </Typography>
        <DropdownArrow className={dropdownArrowStyles} />
        {openedDropdown && <div className={styles.underline} />}
      </button>
      {openedDropdown && (
        <div>
          <div className={styles.contentWrapper}>
            <div className={styles.currentButtons}>
              <button onClick={onChange(value - 1)}>
                <Left />
              </button>
              <Typography type={TypographyType.Div} className={styles.innerValue}>
                {innerValue}
              </Typography>
              <button onClick={onChange(value + 1)}>
                <Right />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearDropdown;
