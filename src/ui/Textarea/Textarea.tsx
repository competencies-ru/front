import React from 'react';

import cn from 'classnames';

import styles from './Textarea.module.scss';

type Props = {
  value: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onChange: (v: string) => void;
};

const Textarea: React.FC<Props> = (props) => {
  const { value, placeholder, className, disabled, onChange } = props;

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const textareaStyles = cn(styles.textarea, className);

  return (
    <textarea
      className={textareaStyles}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default React.memo(Textarea);
