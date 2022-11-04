import React from 'react';

import styles from './FormItem.module.scss';

interface IProps {
  children: React.ReactNode;
}

const FormItem: React.FC<IProps> = ({ children }) => {
  return <div className={styles.formItem}>{children}</div>
}

export default React.memo(FormItem)
