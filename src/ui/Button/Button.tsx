import React from 'react';

import cn from 'classnames';

import { Typography, TypographyType } from '../Typography';

import styles from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const Button: React.FC<Props> = (props) => {
  const { children, type, onClick, disabled, className } = props;

  const btnStyles = cn(styles.btn, className);

  return (
    <button type={type} onClick={onClick} className={btnStyles} disabled={disabled}>
      <Typography type={TypographyType.Div}>{children}</Typography>
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
};

export default React.memo(Button);
