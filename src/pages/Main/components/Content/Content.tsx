import React from 'react';

import { useSpring, animated } from '@react-spring/web';
import cn from 'classnames';
import { Navigate, Route, Routes, useLocation } from 'react-router';

import { Loader } from '@ui';

import { FullScreenIcon } from './components';

const Bank = React.lazy(() => import('./containers/Bank').then((page) => ({ default: page.Bank })));
const Indicator = React.lazy(() =>
  import('./containers/Indicator').then((page) => ({ default: page.Indicator }))
);
const Level = React.lazy(() =>
  import('./containers/Level').then((page) => ({ default: page.Level }))
);
const UGSN = React.lazy(() => import('./containers/UGSN').then((page) => ({ default: page.UGSN })));
const Speciality = React.lazy(() =>
  import('./containers/Speciality').then((page) => ({ default: page.Speciality }))
);
const Program = React.lazy(() =>
  import('./containers/Program').then((page) => ({ default: page.Program }))
);

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

  const getXValues = React.useCallback(
    () =>
      collapsed
        ? { x: SHIFT, width: getHundredPercentsOfWidthToPixels() }
        : {
            x: 0,
            width: subPixels(getHundredPercentsOfWidthToPixels(), '680px'),
          },
    [collapsed]
  );

  const [springStyles, api] = useSpring(() => ({
    from: getXValues(),
  }));

  const animate = React.useCallback(() => {
    api.start(getXValues());
  }, [api, getXValues]);

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
          <React.Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/level/*" element={<Level />} />
              <Route path="/ugsn/*" element={<UGSN />} />
              <Route path="/speciality/*" element={<Speciality />} />
              <Route path="/program/*" element={<Program />} />
              {/* <Route path="/bank">
                <Route index element={<Bank />} />
                <Route path="new" element={<Bank.New />} />
                <Route path=":id" element={<div>edit</div>} />
              </Route>
              <Route path="/indicator">
                <Route index element={<Indicator />} />
                <Route path="new" element={<Indicator.New />} />
                <Route path=":id" element={<div>edit</div>} />
              </Route> */}

              {/* <Route path="/ugsn">
                <Route index element={<UGSN />} />
                <Route path="new" element={<UGSN.New />} />
                <Route path=":id" element={<div>edit</div>} />
              </Route> */}
              {pathname !== '/' && <Route path="/*" element={<Navigate to="/" />} />}
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </animated.div>
  );
};

export default React.memo(Content);
