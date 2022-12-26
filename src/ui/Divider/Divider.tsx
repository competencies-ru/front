import React from 'react';

import cn from 'classnames';

import styles from './Divider.module.scss';

type Props = {
  className?: string;
};

const Divider: React.FC<Props> = ({ className }) => {
  const dividerStyles = cn(styles.divider, className);

  return <div className={dividerStyles} />;
};

export default React.memo(Divider);
