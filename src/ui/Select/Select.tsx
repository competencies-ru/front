import React from 'react';

import cn from 'classnames';

import { useClickAway } from '@utils/useClickAway';
import { IOption } from 'types/select';

import { Typography, TypographyType } from '../Typography';

import { ReactComponent as Arrow } from './assets/arrow.svg';

import styles from './Select.module.scss';

type Props = {
  value: string;
  options: IOption[];
  onChange: (v: string) => void;
  disabled?: boolean;
  className?: string;
  errorText?: string;
  placeholder?: string;
  onInputChange?: (v: string) => void;
};

const Select: React.FC<Props> = (props) => {
  const { value, options, onChange, disabled, className, errorText, placeholder, onInputChange } =
    props;

  const [openedOptions, setOpenedOptions] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  const selectRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    if (onInputChange) {
      onInputChange(event.target.value);
    }
  };

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

  const handleOpenOptions = () => {
    if (!disabled) {
      setOpenedOptions(true);
    }
  };

  const handleSelectOptions =
    (id: string | null) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      setOpenedOptions(false);

      if (id) {
        handleChange(id);
      }
    };

  useClickAway(selectRef, handleClickAway);

  const selectStyles = cn(styles.selectWrapper, className, {
    [styles.error]: !!errorText,
    [styles.disabled]: !!disabled,
  });

  const arrowStyles = cn(styles.arrow, { [styles.rotated]: openedOptions });

  const inputDisabled = !onInputChange;

  return (
    <div ref={selectRef} className={selectStyles}>
      <Arrow className={arrowStyles} />
      <input
        disabled={inputDisabled}
        value={inputValue}
        onChange={onChangeInput}
        className={styles.input}
        placeholder={placeholder}
        onClick={handleOpenOptions}
        onBlur={onInputBlur}
      />
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
