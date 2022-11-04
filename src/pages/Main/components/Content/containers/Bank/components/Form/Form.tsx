import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';

import { Select, Typography, TypographyType } from '@ui';
import { IOption } from 'types/select';

import { FormItem, Paper } from './components';
import { bankFormModel } from './model';

import styles from './Form.module.scss';

const Form = () => {
  useGate(bankFormModel.gates.openGate);

  const lists = useStore(bankFormModel.stores.list);
  const { fields, errorText, submit } = useForm(bankFormModel.form);

  const levelsOptions = lists.level.map<IOption>(({ id, level }) => ({
    id,
    value: level,
  }));

  const ugsnOptions = lists.ugsn.map<IOption>(({ id, code, name }) => ({
    id,
    value: `${code}–${name}`,
  }));

  const specialityOptions = lists.speciality.map<IOption>(({ id, code, name }) => ({
    id,
    value: `${code}–${name}`,
  }));

  const TSOptions = lists.trainingDirection.map<IOption>(({ id, code, name }) => ({
    id,
    value: `${code}–${name}`,
  }));

  const onSelect = React.useCallback(
    (key: keyof typeof lists) => (id: string) => {
      bankFormModel.events.select[key](id);
    },
    []
  );

  const onLevelInputChange = React.useCallback(
    (key: keyof typeof lists) => (input: string) => {
      bankFormModel.events.changeInput[key](input);
    },
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submit();
  };

  const ugsnValue = fields.ugsn.value
    ? `${fields.ugsn.value?.code ?? ''}–${fields.ugsn.value?.name ?? ''}`
    : '';

  const specialityValue = fields.speciality.value
    ? `${fields.speciality.value?.code ?? ''}–${fields.speciality.value?.name ?? ''}`
    : '';

  const TDValue = fields.trainingDirection.value
    ? `${fields.trainingDirection.value?.code ?? ''}–${fields.trainingDirection.value?.name ?? ''}`
    : '';

  return (
    <form onSubmit={handleSubmit}>
      <Typography type={TypographyType.H3} className={styles.title}>
        Создание банка вопросов
      </Typography>
      <FormItem>
        <Select
          value={fields.level.value?.level ?? ''}
          onInputChange={onLevelInputChange('level')}
          options={levelsOptions}
          onChange={onSelect('level')}
          className={styles.select}
          placeholder="Уровень"
          errorText={errorText('level')}
        />
      </FormItem>
      <FormItem>
        <Select
          value={ugsnValue}
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
          value={specialityValue}
          onInputChange={onLevelInputChange('speciality')}
          options={specialityOptions}
          onChange={onSelect('speciality')}
          className={styles.select}
          placeholder="Специальность"
          errorText={errorText('speciality')}
        />
      </FormItem>
      <FormItem>
        <Select
          value={TDValue}
          onInputChange={onLevelInputChange('trainingDirection')}
          options={TSOptions}
          onChange={onSelect('trainingDirection')}
          className={styles.select}
          placeholder="Направление"
          errorText={errorText('trainingDirection')}
        />
      </FormItem>
      <Paper>
        <div>test</div>
      </Paper>
    </form>
  );
};

export default Form;
