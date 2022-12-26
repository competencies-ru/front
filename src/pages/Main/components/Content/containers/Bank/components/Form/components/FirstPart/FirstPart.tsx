import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';

import { Select, FormItem } from '@ui';

import { bankFormFirstPartModel } from './model';

import styles from './FirstPart.module.scss';

type SelectKeys = keyof typeof bankFormFirstPartModel.events.select;

const Form = () => {
  useGate(bankFormFirstPartModel.gates.openGate);

  const { levelOptions, ugsnOptions, specialityOptions, TDOptions, competenceOptions } = useStore(
    bankFormFirstPartModel.stores.options
  );

  const values = useStore(bankFormFirstPartModel.stores.values);
  const loading = useStore(bankFormFirstPartModel.stores.loading);

  const { errorText } = useForm(bankFormFirstPartModel.form);

  const onSelect = React.useCallback(
    (key: SelectKeys) => (id: string) => {
      bankFormFirstPartModel.events.select[key](id);
    },
    []
  );

  const onSelectInputChange = React.useCallback(
    (key: SelectKeys) => (input: string) => {
      bankFormFirstPartModel.events.changeInput[key](input);
    },
    []
  );

  const onClear = React.useCallback(
    (key: SelectKeys) => () => {
      bankFormFirstPartModel.events.clear[key]();
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
          onInputChange={onSelectInputChange('level')}
          options={levelOptions}
          onChange={onSelect('level')}
          className={styles.select}
          placeholder="Уровень"
          errorText={errorText('level')}
          onClear={onClear('level')}
          loading={loading.level}
        />
      </FormItem>
      <FormItem>
        <Select
          value={values.ugsn}
          onInputChange={onSelectInputChange('ugsn')}
          options={ugsnOptions}
          onChange={onSelect('ugsn')}
          className={styles.select}
          placeholder="УГСН"
          errorText={errorText('ugsn')}
          onClear={onClear('ugsn')}
          disabled={!values.level}
          loading={loading.ugsn}
        />
      </FormItem>
      <FormItem>
        <Select
          value={values.speciality}
          onInputChange={onSelectInputChange('speciality')}
          options={specialityOptions}
          onChange={onSelect('speciality')}
          className={styles.select}
          placeholder={specialityPlaceholder}
          errorText={errorText('speciality')}
          onClear={onClear('speciality')}
          disabled={!values.ugsn}
          loading={loading.speciality}
        />
      </FormItem>
      <FormItem>
        <Select
          value={values.TD}
          onInputChange={onSelectInputChange('TD')}
          options={TDOptions}
          onChange={onSelect('TD')}
          className={styles.select}
          placeholder={TDPlaceholder}
          errorText={errorText('TD')}
          onClear={onClear('TD')}
          disabled={!values.speciality}
          loading={loading.TD}
        />
      </FormItem>
      <FormItem>
        <Select
          value={values.competence}
          onInputChange={onSelectInputChange('competence')}
          options={competenceOptions}
          onChange={onSelect('competence')}
          className={styles.select}
          placeholder="Компетенция"
          errorText={errorText('competence')}
          onClear={onClear('competence')}
          loading={loading.competence}
        />
      </FormItem>
    </>
  );
};

export default React.memo(Form);
