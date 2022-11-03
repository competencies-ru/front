import React from 'react';

import cn from 'classnames';

import styles from './styles.module.scss';

enum TypographyType {
  Div = 'div',
  Span = 'span',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
}

type Props = {
  children: React.ReactNode;
  type?: TypographyType;
  className?: string;
  id?: string;
};

const Typography: React.FC<Props> = React.memo(
  ({ children, type = TypographyType.H3, className, id }) => {
    const style = cn(styles.typography, className);

    switch (type) {
      case TypographyType.Div:
        return (
          <div id={id} className={style}>
            {children}
          </div>
        );
      case TypographyType.Span:
        return (
          <span id={id} className={style}>
            {children}
          </span>
        );
      case TypographyType.H1:
        return (
          <h1 id={id} className={style}>
            {children}
          </h1>
        );
      case TypographyType.H2:
        return (
          <h2 id={id} className={style}>
            {children}
          </h2>
        );
      case TypographyType.H3:
        return (
          <h3 id={id} className={style}>
            {children}
          </h3>
        );
      case TypographyType.H4:
        return (
          <h4 id={id} className={style}>
            {children}
          </h4>
        );
      case TypographyType.H5:
        return (
          <h5 id={id} className={style}>
            {children}
          </h5>
        );
      case TypographyType.H6:
        return (
          <h6 id={id} className={style}>
            {children}
          </h6>
        );

      default:
        return null;
    }
  }
);

export { Typography, TypographyType };
