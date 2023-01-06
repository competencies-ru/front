import React from 'react';

import { useGate, useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { Button, Select, Typography, TypographyType } from '@ui';

import { Table } from '../../../../components';

import { specialityTableModel } from './model';

import styles from './Main.module.scss';

const Main = () => {
  const newSpecialityLink = React.useMemo(() => `${window.location.pathname}/new`, []);

  useGate(specialityTableModel.gates.specialityTableGate);

  const { specialties, loading } = useStore(specialityTableModel.stores);

  // level <Select />
  const levelOptions = useStore(specialityTableModel.levelOptions.stores.userOptions);
  const selectedLevel = useStore(specialityTableModel.levelOptions.stores.selectedOption);
  const levelLoading = useStore(specialityTableModel.levelOptions.stores.loading);

  // UGSN <Select />
  const UGSNOptions = useStore(specialityTableModel.UGSNOptions.stores.userOptions);
  const selectedUGSN = useStore(specialityTableModel.UGSNOptions.stores.selectedOption);
  const UGSNLoading = useStore(specialityTableModel.UGSNOptions.stores.loading);

  const tableItems = React.useMemo(
    () => (!levelLoading && selectedLevel && !UGSNLoading && selectedUGSN ? specialties : []),
    [levelLoading, selectedLevel, UGSNLoading, selectedUGSN, specialties]
  );

  const createTypes = React.useMemo(
    () => (selectedLevel === 'Специалитет' ? 'Специальности' : 'Направления'),
    [selectedLevel]
  );

  return (
    <>
      <Link to={newSpecialityLink}>
        <Button className={styles.btn}>Создать направление/специальность</Button>
      </Link>
      <Typography type={TypographyType.H3} className={styles.title}>
        {createTypes}
      </Typography>
      <Select
        placeholder="Уровень"
        value={selectedLevel}
        options={levelOptions}
        onChange={specialityTableModel.levelOptions.events.onSelect}
        onInputChange={specialityTableModel.levelOptions.events.onInput}
        loading={levelLoading}
        onClear={specialityTableModel.levelOptions.events.clear}
        className={styles.select}
      />
      <Select
        placeholder="УГСН"
        value={selectedUGSN}
        options={UGSNOptions}
        onChange={specialityTableModel.UGSNOptions.events.onSelect}
        onInputChange={specialityTableModel.UGSNOptions.events.onInput}
        loading={UGSNLoading}
        onClear={specialityTableModel.UGSNOptions.events.clear}
        disabled={!selectedLevel}
      />
      <Table
        items={tableItems}
        // type={createType.toLowerCase()}
        loading={loading}
        // onDelete={specialityTableModel.events.deleteSpeciality}
      />
    </>
  );
};

export default React.memo(Main);
