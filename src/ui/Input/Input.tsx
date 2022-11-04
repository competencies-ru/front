import React from 'react';

import cn from 'classnames';

import { Typography, TypographyType } from '../Typography';

import { ReactComponent as EyeClose } from './assets/EyeClose.svg';
import { ReactComponent as EyeOpen } from './assets/EyeOpen.svg';

import styles from './Input.module.scss';

type Props = {
  value: string;
  onChange: (v: string) => void;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  className?: string;
  errorText?: string;
  placeholder?: string;
};

const Input: React.FC<Props> = (props) => {
  const { value, onChange, name, type, disabled, className, errorText, placeholder } = props;

  const [ownType, setOwnType] = React.useState<typeof type>(type);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const openPassword = React.useCallback(() => {
    setOwnType('text');
  }, []);

  const closePassword = React.useCallback(() => {
    setOwnType('password');
  }, []);

  const inputStyles = cn(styles.input, className, {
    [styles.error]: !!errorText,
    [styles.password]: type === 'password',
  });

  return (
    <div className={styles.inputWrapper}>
      <input
        name={name}
        type={ownType}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className={inputStyles}
      />
      {ownType === 'password' && (
        <button onClick={openPassword} className={styles.eye}>
          <EyeOpen />
        </button>
      )}
      {ownType === 'text' && type === 'password' && (
        <button onClick={closePassword} className={styles.eye}>
          <EyeClose />
        </button>
      )}
      {!!errorText && (
        <Typography type={TypographyType.Div} className={styles.errorText}>
          {errorText}
        </Typography>
      )}
    </div>
  );
};

Input.defaultProps = {
  disabled: false,
  type: 'text',
};

export default React.memo(Input);
