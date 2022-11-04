import React from 'react'

import styles from './Paper.module.scss';

interface IProps {
  children: React.ReactNode;
}

const Paper: React.FC<IProps> = ({ children }) => {
  return <div className={styles.paper}>{children}</div>
}

export default Paper;
