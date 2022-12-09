import React from 'react';

import cn from 'classnames';
import { nanoid } from 'nanoid';

import { Typography, TypographyType } from '../Typography';

import EyeClose from './assets/EyeClose.svg';
import EyeOpen from './assets/EyeOpen.svg';

import styles from './Input.module.scss';

type Props = {
  value: string;
  onChange: (v: string) => void;
  id?: string;
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  className?: string;
  errorText?: string;
  placeholder?: string;
  autocomplete?: string;
};

const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    value,
    onChange,
    id,
    name,
    type,
    disabled,
    className,
    errorText,
    placeholder,
    autocomplete,
  } = props;

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
        autoComplete={autocomplete}
        ref={ref}
        id={id ?? nanoid()}
      />
      {ownType === 'password' && (
        <button onClick={openPassword} className={styles.eye} type="button">
          <EyeOpen />
        </button>
      )}
      {ownType === 'text' && type === 'password' && (
        <button onClick={closePassword} className={styles.eye} type="button">
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
});

Input.defaultProps = {
  disabled: false,
  type: 'text',
};

export default React.memo(Input);
