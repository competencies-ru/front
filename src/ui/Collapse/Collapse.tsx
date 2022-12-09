import React from 'react';

import cn from 'classnames';

import Arrow from './assets/arrow.svg';

import styles from './Collapse.module.scss';

type Props = {
  children: React.ReactNode;
};

const Collapse: React.FC<Props> = ({ children }) => {
  const [expanded, setExpanded] = React.useState(true);

  const ref = React.useRef<HTMLDivElement | null>(null);

  const collapseStyles = cn(styles.collapseWrapper, { [styles.expanded]: expanded });

  const onCollapse = React.useCallback(() => {
    setExpanded((v) => !v);
  }, []);

  React.useEffect(() => {
    if (ref && ref.current) {
      if (expanded) {
        ref.current.style.height = `${ref.current.scrollHeight}px`;

        setTimeout(() => {
          if (ref && ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.overflow = 'inherit';
          }
        }, 300);
      } else {
        ref.current.style.overflow = 'hidden';
        ref.current.style.height = `${ref.current.scrollHeight}px`;

        setTimeout(() => {
          if (ref && ref.current) {
            ref.current.style.height = '110px';
          }
        }, 0);
      }
    }
  }, [expanded]);

  return (
    <div className={collapseStyles} ref={ref}>
      <button type="button" onClick={onCollapse} className={styles.icon}>
        <Arrow />
      </button>
      {children}
    </div>
  );
};

export default React.memo(Collapse);
