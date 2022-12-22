import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';

import { Select } from '@ui';

import { FormItem } from '..';

import { bankFormFirstPartModel } from './model';

import styles from './FirstPart.module.scss';

type SelectKeys = keyof typeof bankFormFirstPartModel.events.select;

const Form = () => {
  useGate(bankFormFirstPartModel.gates.openGate);

  const { levelOptions, ugsnOptions, specialityOptions, TDOptions, competenceOptions } = useStore(
    bankFormFirstPartModel.stores.options
  );

  const values = useStore(bankFormFirstPartModel.stores.values);

  const { errorText } = useForm(bankFormFirstPartModel.form);

  const onSelect = React.useCallback(
    (key: SelectKeys) => (id: string) => {
      bankFormFirstPartModel.events.select[key](id);
    },
    []
  );

  const onLevelInputChange = React.useCallback(
    (key: SelectKeys) => (input: string) => {
      bankFormFirstPartModel.events.changeInput[key](input);
    },
    []
  );

  const specialityPlaceholder = React.useMemo(
    () => (values.level === 'Специалитет' ? 'Специальность' : 'Направление'),
    [values.level]
  );

  const TDPlaceholder = React.useMemo(
    () => (values.level === 'Специалитет' ? 'Специализация' : 'Образовательная программа'),
    [values.level]
  );

  return (
    <>
      <FormItem>
        <Select
          value={values.level}
          onInputChange={onLevelInputChange('level')}
          options={levelOptions}
          onChange={onSelect('level')}
          className={styles.select}
          placeholder="Уровень"
          errorText={errorText('level')}
        />
      </FormItem>
      <FormItem>
        <Select
          value={values.ugsn}
          onInputChange={onLevelInputChange('ugsn')}
          options={ugsnOptions}
          onChange={onSelect('ugsn')}
          className={styles.select}
          placeholder="УГСН"
          errorText={errorText('ugsn')}
        />
      </FormItem>
      <FormItem>
        <Select
          value={values.speciality}
          onInputChange={onLevelInputChange('speciality')}
          options={specialityOptions}
          onChange={onSelect('speciality')}
          className={styles.select}
          placeholder={specialityPlaceholder}
          errorText={errorText('speciality')}
        />
      </FormItem>
      <FormItem>
        <Select
          value={values.TD}
          onInputChange={onLevelInputChange('TD')}
          options={TDOptions}
          onChange={onSelect('TD')}
          className={styles.select}
          placeholder={TDPlaceholder}
          errorText={errorText('TD')}
        />
      </FormItem>
      <FormItem>
        <Select
          value={values.competence}
          onInputChange={onLevelInputChange('competence')}
          options={competenceOptions}
          onChange={onSelect('competence')}
          className={styles.select}
          placeholder="Компетенция"
          errorText={errorText('competence')}
        />
      </FormItem>
    </>
  );
};

export default React.memo(Form);
