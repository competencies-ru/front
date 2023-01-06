import React from 'react';

import { useGate, useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { Button, Select, Typography, TypographyType } from '@ui';

import { Table } from '../../components';

import { programsTableModel } from './model';

import styles from './Program.module.scss';

const Program = () => {
  const newSpecialityLink = React.useMemo(() => `${window.location.pathname}/new`, []);

  useGate(programsTableModel.gates.programTableGate);

  const { programs, loading } = useStore(programsTableModel.stores);

  // level <Select />
  const levelOptions = useStore(programsTableModel.levelOptions.stores.userOptions);
  const selectedLevel = useStore(programsTableModel.levelOptions.stores.selectedOption);
  const levelLoading = useStore(programsTableModel.levelOptions.stores.loading);

  // UGSN <Select />
  const UGSNOptions = useStore(programsTableModel.UGSNOptions.stores.userOptions);
  const selectedUGSN = useStore(programsTableModel.UGSNOptions.stores.selectedOption);
  const UGSNLoading = useStore(programsTableModel.UGSNOptions.stores.loading);

  // speciality <Select />
  const specialityOptions = useStore(programsTableModel.specialityOptions.stores.userOptions);
  const selectedSpeciality = useStore(programsTableModel.specialityOptions.stores.selectedOption);
  const specialityLoading = useStore(programsTableModel.specialityOptions.stores.loading);

  const tableItems = React.useMemo(
    () =>
      !levelLoading &&
      selectedLevel &&
      !UGSNLoading &&
      selectedUGSN &&
      !specialityLoading &&
      selectedUGSN
        ? programs
        : [],
    [levelLoading, selectedLevel, UGSNLoading, selectedUGSN, specialityLoading, programs]
  );

  const createTypes = React.useMemo(
    () => (selectedLevel === 'Специалитет' ? 'Специализации' : 'Образовательные программы'),
    [selectedLevel]
  );

  return (
    <>
      <Link to={newSpecialityLink}>
        <Button className={styles.btn}>Создать образовательную программу/специализацию</Button>
      </Link>
      <Typography type={TypographyType.H3} className={styles.title}>
        {createTypes}
      </Typography>
      <Select
        placeholder="Уровень"
        value={selectedLevel}
        options={levelOptions}
        onChange={programsTableModel.levelOptions.events.onSelect}
        onInputChange={programsTableModel.levelOptions.events.onInput}
        loading={levelLoading}
        onClear={programsTableModel.levelOptions.events.clear}
        className={styles.select}
      />
      <Select
        placeholder="УГСН"
        value={selectedUGSN}
        options={UGSNOptions}
        onChange={programsTableModel.UGSNOptions.events.onSelect}
        onInputChange={programsTableModel.UGSNOptions.events.onInput}
        loading={UGSNLoading}
        onClear={programsTableModel.UGSNOptions.events.clear}
        disabled={!selectedLevel}
        className={styles.select}
      />
      <Select
        placeholder={selectedLevel === 'Специалитет' ? 'Специальность' : 'Направление'}
        value={selectedSpeciality}
        options={specialityOptions}
        onChange={programsTableModel.specialityOptions.events.onSelect}
        onInputChange={programsTableModel.specialityOptions.events.onInput}
        loading={specialityLoading}
        onClear={programsTableModel.specialityOptions.events.clear}
        disabled={!selectedUGSN}
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

export default React.memo(Program);
