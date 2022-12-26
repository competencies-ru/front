import React from 'react';

import { useSpring, animated } from '@react-spring/web';
import cn from 'classnames';

import Arrow from './assets/arrow.svg';

import styles from './Collapse.module.scss';

type Props = {
  children: React.ReactNode;
};

export const getScrollHeight = (
  ref: React.MutableRefObject<HTMLDivElement | null>
): `${number}px` => (ref && ref.current ? `${ref.current.scrollHeight}px` : '0px');

const SHIFT = '110px';

const Collapse: React.FC<Props> = ({ children }) => {
  const [expanded, setExpanded] = React.useState(true);

  const ref = React.useRef<HTMLDivElement | null>(null);
  const childrenRef = React.useRef<HTMLDivElement | null>(null);

  const collapseStyles = cn(styles.collapseWrapper, { [styles.expanded]: expanded });

  const onCollapse = React.useCallback(() => {
    setExpanded((v) => !v);
  }, []);

  const [springStyles, api] = useSpring(() => ({
    from: {
      height: expanded ? getScrollHeight(ref) : SHIFT,
    },
  }));

  const animate = React.useCallback(
    (ref: React.MutableRefObject<HTMLDivElement | null>) => {
      if (expanded) {
        api.start({ height: getScrollHeight(ref) });
      } else {
        api.start({ height: SHIFT });
      }
    },
    [api, expanded]
  );

  React.useEffect(() => animate(ref), [animate, expanded]);

  React.useEffect(() => {
    if (childrenRef && childrenRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        animate(childrenRef);
      });

      resizeObserver.observe(childrenRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [animate]);

  return (
    <animated.div style={springStyles}>
      <div className={collapseStyles} ref={ref}>
        <button type="button" onClick={onCollapse} className={styles.icon}>
          <Arrow />
        </button>
        <div ref={childrenRef}>{children}</div>
      </div>
    </animated.div>
  );
};

export default React.memo(Collapse);
