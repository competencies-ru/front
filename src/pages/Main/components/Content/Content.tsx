import React from 'react';

import { useSpring, animated } from '@react-spring/web';
import cn from 'classnames';
import { Navigate, Route, Routes, useLocation } from 'react-router';

import { FullScreenIcon } from './components';
import { Bank } from './containers';

import styles from './Content.module.scss';

interface IProps {
  collapsed: boolean;
  onCollapse: () => void;
}

export const getHundredPercentsOfWidthToPixels = (): `${number}px` =>
  `${window.innerWidth - 2 * 25}px`;
export const getHundredPercentsOfHeightToPixels = (): `${number}px` =>
  `${window.innerHeight - 2 * 25}px`;
export const subPixels = (a: `${number}px`, b: `${number}px`): string =>
  `${+a.split('px')[0] - +b.split('px')[0]}px`;

const SHIFT = -290;

const Content: React.FC<IProps> = ({ collapsed, onCollapse }) => {
  const { pathname } = useLocation();

  const [springStyles, api] = useSpring(() => ({
    from: {
      x: 0,
      width: subPixels(getHundredPercentsOfWidthToPixels(), '680px'),
    },
  }));

  const animate = React.useCallback(() => {
    if (collapsed) {
      api.start({ x: SHIFT, width: getHundredPercentsOfWidthToPixels() });
    } else {
      api.start({ x: 0, width: subPixels(getHundredPercentsOfWidthToPixels(), '680px') });
    }
  }, [api, collapsed]);

  React.useEffect(() => {
    animate();
    window.addEventListener('resize', animate);
    return () => {
      window.removeEventListener('resize', animate);
    };
  }, [animate, collapsed]);

  const contentStyles = cn(styles.contentWrapper);

  return (
    <animated.div style={springStyles}>
      <div className={contentStyles}>
        <div className={styles.content}>
          <FullScreenIcon collapsed={collapsed} onCollapse={onCollapse} />
          <React.Suspense fallback={<div>Loading</div>}>
            <Routes>
              <Route path="/bank">
                <Route index element={<Bank />} />
                <Route path="new" element={<Bank.New />} />
                <Route path=":id" element={<div>edit</div>} />
              </Route>
              {pathname !== '/' && <Route path="/*" element={<Navigate to="/" />} />}
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </animated.div>
  );
};

export default React.memo(Content);
