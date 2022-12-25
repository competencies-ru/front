import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';

import { Button, FormItem, Input, Select, Typography, TypographyType } from '@ui';

import { indicatorFormModel } from './model';

import styles from './Form.module.scss';
type SelectKeys = keyof typeof indicatorFormModel.events.select;

const Form = () => {
  useGate(indicatorFormModel.gates.openGate);

  const { levelOptions, ugsnOptions, specialityOptions, TDOptions, competenceOptions } = useStore(
    indicatorFormModel.stores.options
  );

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

  const onLevelInputChange = React.useCallback(
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

  const TDPlaceholder = React.useMemo(
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
            onInputChange={onLevelInputChange('level')}
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
            onInputChange={onLevelInputChange('ugsn')}
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
            onInputChange={onLevelInputChange('speciality')}
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
            onInputChange={onLevelInputChange('TD')}
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
            onInputChange={onLevelInputChange('competence')}
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
