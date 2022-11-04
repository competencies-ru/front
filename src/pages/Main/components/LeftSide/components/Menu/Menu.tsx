import React from 'react';

import cn from 'classnames';
import { useStore } from 'effector-react';
import { Link, useLocation } from 'react-router-dom';

import { Typography, TypographyType } from '@ui/Typography';
import { userModel } from 'models';

import { MENU_ITEMS } from './constants';

import styles from './Menu.module.scss';

const Menu = () => {
  const { pathname } = useLocation();

  const { user } = useStore(userModel.$user);

  const reversedMenu = React.useMemo(() => [...MENU_ITEMS[user.role]].reverse(), [user.role]);

  const activeIndexReversed = reversedMenu.findIndex(({ path }) => pathname.startsWith(path));

  const activeIndex = activeIndexReversed >= 0 ? reversedMenu.length - 1 - activeIndexReversed : 0;

  return (
    <div className={styles.menuWrapper}>
      {MENU_ITEMS[user.role].map(({ name, path, Icon }, index) => {
        const isActive = activeIndex === index;
        const linkStyles = cn(styles.link, { [styles.active]: isActive });

        return (
          <Link to={path} key={name} className={linkStyles}>
            {isActive && <div className={styles.activeBlock} />}
            <div className={styles.linkContent}>
              <div className={styles.iconWrapper}>
                <Icon />
              </div>
              <Typography type={TypographyType.Span} className={styles.title}>
                {name}
              </Typography>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default React.memo(Menu);
