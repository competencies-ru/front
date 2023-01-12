import React from 'react';

import { useGate, useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { Button, Select, Typography, TypographyType } from '@ui';

import { Table } from '../../components';

import { competenceTableModel } from './model';

import styles from './Competence.module.scss';

const Competence = () => {
  const newSpecialityLink = React.useMemo(() => `${window.location.pathname}/new`, []);

  useGate(competenceTableModel.gates.competenceTableGate);

  const { competencies, loading } = useStore(competenceTableModel.stores);

  // level <Select />
  const levelOptions = useStore(competenceTableModel.levelOptions.stores.userOptions);
  const selectedLevel = useStore(competenceTableModel.levelOptions.stores.selectedOption);
  const levelLoading = useStore(competenceTableModel.levelOptions.stores.loading);

  // UGSN <Select />
  const UGSNOptions = useStore(competenceTableModel.UGSNOptions.stores.userOptions);
  const selectedUGSN = useStore(competenceTableModel.UGSNOptions.stores.selectedOption);
  const UGSNLoading = useStore(competenceTableModel.UGSNOptions.stores.loading);

  // speciality <Select />
  const specialityOptions = useStore(competenceTableModel.specialityOptions.stores.userOptions);
  const selectedSpeciality = useStore(competenceTableModel.specialityOptions.stores.selectedOption);
  const specialityLoading = useStore(competenceTableModel.specialityOptions.stores.loading);

  // program <Select />
  const programOptions = useStore(competenceTableModel.programOptions.stores.userOptions);
  const selectedProgram = useStore(competenceTableModel.programOptions.stores.selectedOption);
  const programLoading = useStore(competenceTableModel.programOptions.stores.loading);

  const tableItems = React.useMemo(
    () =>
      !levelLoading && selectedLevel && !UGSNLoading && !specialityLoading && !programLoading
        ? competencies
        : [],
    [levelLoading, selectedLevel, UGSNLoading, specialityLoading, programLoading, competencies]
  );

  return (
    <>
      <Link to={newSpecialityLink}>
        <Button className={styles.btn}>Создать компетенцию</Button>
      </Link>
      <Typography type={TypographyType.H3} className={styles.title}>
        Компетенции
      </Typography>
      <Select
        placeholder="Уровень"
        value={selectedLevel}
        options={levelOptions}
        onChange={competenceTableModel.levelOptions.events.onSelect}
        onInputChange={competenceTableModel.levelOptions.events.onInput}
        loading={levelLoading}
        onClear={competenceTableModel.levelOptions.events.clear}
        className={styles.select}
      />
      <Select
        placeholder="УГСН"
        value={selectedUGSN}
        options={UGSNOptions}
        onChange={competenceTableModel.UGSNOptions.events.onSelect}
        onInputChange={competenceTableModel.UGSNOptions.events.onInput}
        loading={UGSNLoading}
        onClear={competenceTableModel.UGSNOptions.events.clear}
        disabled={!selectedLevel}
        className={styles.select}
      />
      <Select
        placeholder={selectedLevel === 'Специалитет' ? 'Специальность' : 'Направление'}
        value={selectedSpeciality}
        options={specialityOptions}
        onChange={competenceTableModel.specialityOptions.events.onSelect}
        onInputChange={competenceTableModel.specialityOptions.events.onInput}
        loading={specialityLoading}
        onClear={competenceTableModel.specialityOptions.events.clear}
        disabled={!selectedUGSN}
        className={styles.select}
      />
      <Select
        placeholder={
          selectedLevel === 'Специалитет' ? 'Специализация' : 'Образовательная программа'
        }
        value={selectedProgram}
        options={programOptions}
        onChange={competenceTableModel.programOptions.events.onSelect}
        onInputChange={competenceTableModel.programOptions.events.onInput}
        loading={programLoading}
        onClear={competenceTableModel.programOptions.events.clear}
        disabled={!selectedSpeciality}
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

export default React.memo(Competence);
