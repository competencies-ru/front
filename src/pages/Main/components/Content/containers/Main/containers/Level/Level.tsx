import React from 'react';

import { useGate, useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { Button, Typography, TypographyType } from '@ui';

import { Table } from '../../components';

import { levelTableModel } from './model';

import styles from './Level.module.scss';

const Level = () => {
  const newLevelLink = React.useMemo(() => `${window.location.pathname}/new`, []);

  useGate(levelTableModel.gates.levelTableGate);

  const { levels, loading } = useStore(levelTableModel.stores);

  return (
    <>
      <Link to={newLevelLink}>
        <Button className={styles.btn}>Создать уровень</Button>
      </Link>
      <Typography type={TypographyType.H3} className={styles.title}>
        Уровни
      </Typography>
      <Table
        items={levels}
        // type="уровень"
        loading={loading}
        // onDelete={levelTableModel.events.deleteLevel}
      />
    </>
  );
};

export default React.memo(Level);
