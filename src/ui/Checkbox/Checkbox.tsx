import React from 'react';

import cn from 'classnames';

import styles from './Checkbox.module.scss';

type Props = {
  checked: boolean;
  className?: string;
  onChange: (v: boolean) => void;
};

const Checkbox: React.FC<Props> = (props) => {
  const { checked, className, onChange } = props;

  const checkboxStyles = cn(styles.checkbox, className);

  const handleChange = React.useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <div className={styles.checkboxWrapper}>
      <button type="button" className={checkboxStyles} onClick={handleChange}>
        {checked && <div />}
      </button>
    </div>
  );
};

export default React.memo(Checkbox);
