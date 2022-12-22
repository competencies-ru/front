import React from 'react';

import cn from 'classnames';

import { useClickAway } from '@utils/useClickAway';
import { Option } from 'types/select';

import { Typography, TypographyType } from '../Typography';

import Arrow from './assets/arrow.svg';
import Clear from './assets/clear.svg';
import Spinner from './assets/spinner.svg';

import styles from './Select.module.scss';

type Props = {
  value: string;
  options: Option[];
  onChange: (v: string) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  errorText?: string;
  placeholder?: string;
  onInputChange?: (v: string) => void;
  onClear?: () => void;
};

const Select: React.FC<Props> = (props) => {
  const {
    value,
    options,
    onChange,
    disabled,
    loading,
    className,
    errorText,
    placeholder,
    onInputChange,
    onClear,
  } = props;

  const [openedOptions, setOpenedOptions] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  const selectRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onChangeInput = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);

      if (onInputChange) {
        onInputChange(event.target.value);
      }
    },
    [onInputChange]
  );

  const onInputBlur = () => {
    setInputValue(value);
  };

  const handleChange = React.useCallback(
    (id: string) => {
      onChange(id);
    },
    [onChange]
  );

  const handleClickAway = React.useCallback(() => {
    setOpenedOptions(false);
  }, []);

  const handleOpenOptions = React.useCallback(() => {
    if (!disabled && !loading) {
      setOpenedOptions(true);
    }
  }, [disabled, loading]);

  const handleSelectOptions = React.useCallback(
    (id: string | null) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      setOpenedOptions(false);

      if (id) {
        handleChange(id);
      }
    },
    [handleChange]
  );

  useClickAway(selectRef, handleClickAway);

  const selectStyles = cn(styles.selectWrapper, className, {
    [styles.error]: !!errorText,
    [styles.disabled]: !!disabled || !!loading,
  });

  const arrowStyles = cn(styles.arrow, { [styles.rotated]: openedOptions });

  const inputDisabled = !onInputChange || !!disabled || !!loading;

  return (
    <div ref={selectRef} className={selectStyles}>
      <Arrow className={arrowStyles} onClick={handleOpenOptions} />
      <input
        disabled={inputDisabled}
        value={inputValue}
        onChange={onChangeInput}
        className={styles.input}
        placeholder={placeholder}
        onBlur={onInputBlur}
        onClick={handleOpenOptions}
      />
      {value && onClear && (
        <button type="button" className={styles.clear} onClick={onClear}>
          <Clear />
        </button>
      )}
      {loading && <Spinner className={styles.spinner} />}
      {openedOptions && (
        <>
          <div className={styles.fakeOption} />
          <div className={styles.optionsWrapper}>
            {options.length ? (
              options.map(({ id, value }) => (
                <button key={id} className={styles.option} onClick={handleSelectOptions(id)}>
                  <Typography>{value}</Typography>
                </button>
              ))
            ) : (
              <button className={styles.option} onClick={handleSelectOptions(null)}>
                <Typography>Список пустой</Typography>
              </button>
            )}
          </div>
        </>
      )}
      {!!errorText && (
        <Typography type={TypographyType.Div} className={styles.errorText}>
          {errorText}
        </Typography>
      )}
    </div>
  );
};

Select.defaultProps = {
  disabled: false,
};

export default React.memo(Select);
