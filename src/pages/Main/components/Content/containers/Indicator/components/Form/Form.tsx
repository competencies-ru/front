import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';

import { Button, FormItem, Input, Select, Typography, TypographyType } from '@ui';

import { indicatorFormModel } from './model';

import styles from './Form.module.scss';
type SelectKeys = keyof typeof indicatorFormModel.events.select;

const Form = () => {
  useGate(indicatorFormModel.gates.openGate);

  const { levelOptions, ugsnOptions, specialityOptions, programOptions, competenceOptions } =
    useStore(indicatorFormModel.stores.options);

  const values = useStore(indicatorFormModel.stores.values);
  const loading = useStore(indicatorFormModel.stores.loading);

  const { errorText, fields, submit } = useForm(indicatorFormModel.form);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submit();
  };

  const onSelect = React.useCallback(
    (key: SelectKeys) => (id: string) => {
      indicatorFormModel.events.select[key](id);
    },
    []
  );

  const onSelectInputChange = React.useCallback(
    (key: SelectKeys) => (input: string) => {
      indicatorFormModel.events.changeInput[key](input);
    },
    []
  );

  const onClear = React.useCallback(
    (key: SelectKeys) => () => {
      indicatorFormModel.events.clear[key]();
    },
    []
  );

  const specialityPlaceholder = React.useMemo(
    () => (values.level === 'Специалитет' ? 'Специальность' : 'Направление'),
    [values.level]
  );

  const programPlaceholder = React.useMemo(
    () => (values.level === 'Специалитет' ? 'Специализация' : 'Образовательная программа'),
    [values.level]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Typography type={TypographyType.H3} className={styles.title}>
        Создание индикатора
      </Typography>
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
            value={values.program}
            onInputChange={onSelectInputChange('program')}
            options={programOptions}
            onChange={onSelect('program')}
            className={styles.select}
            placeholder={programPlaceholder}
            errorText={errorText('program')}
            onClear={onClear('program')}
            disabled={!values.speciality}
            loading={loading.program}
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
        <FormItem>
          <Input
            value={fields.indicatorCode.value}
            onChange={fields.indicatorCode.onChange}
            placeholder="Код индикатора"
            errorText={errorText('indicatorCode')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.indicator.value}
            onChange={fields.indicator.onChange}
            placeholder="Название индикатора"
            errorText={errorText('indicator')}
          />
        </FormItem>
        <FormItem>
          <Button type="submit" className={styles.btn}>
            Создать
          </Button>
        </FormItem>
      </>
    </form>
  );
};

export default React.memo(Form);
