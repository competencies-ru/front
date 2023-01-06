import React from 'react';

import { useGate, useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { Button, Select, Typography, TypographyType } from '@ui';

import { Table } from '../../../../components';

import { UGSNTableModel } from './model';

import styles from './Main.module.scss';

const Main = () => {
  const newUGSNLink = React.useMemo(() => `${window.location.pathname}/new`, []);

  useGate(UGSNTableModel.gates.UGSNTableGate);

  const { UGSNs, loading } = useStore(UGSNTableModel.stores);
  const levelOptions = useStore(UGSNTableModel.levelOptions.stores.userOptions);
  const selectedLevel = useStore(UGSNTableModel.levelOptions.stores.selectedOption);
  const levelLoading = useStore(UGSNTableModel.levelOptions.stores.loading);

  const tableItems = React.useMemo(
    () => (!levelLoading && selectedLevel ? UGSNs : []),
    [UGSNs, levelLoading, selectedLevel]
  );

  return (
    <>
      <Link to={newUGSNLink}>
        <Button className={styles.btn}>Создать УГСН</Button>
      </Link>
      <Typography type={TypographyType.H3} className={styles.title}>
        УГСН
      </Typography>
      <Select
        placeholder="Уровень"
        value={selectedLevel}
        options={levelOptions}
        onChange={UGSNTableModel.levelOptions.events.onSelect}
        onInputChange={UGSNTableModel.levelOptions.events.onInput}
        loading={levelLoading}
        onClear={UGSNTableModel.levelOptions.events.clear}
      />
      <Table
        items={tableItems}
        // type="УГСН"
        loading={loading}
        // onDelete={UGSNTableModel.events.deleteUGSN}
      />
    </>
  );
};

export default React.memo(Main);
