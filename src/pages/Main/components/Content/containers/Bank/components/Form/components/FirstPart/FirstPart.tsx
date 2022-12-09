import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';

import { Select } from '@ui';
import { Option } from 'types/select';

import { FormItem } from '..';

import { bankFormFirstPartModel } from './model';

import styles from './FirstPart.module.scss';

const Form = () => {
  useGate(bankFormFirstPartModel.gates.openGate);

  const lists = useStore(bankFormFirstPartModel.stores.list);
  const { fields, errorText } = useForm(bankFormFirstPartModel.form);

  const levelsOptions = lists.level.map<Option>(({ id, level }) => ({
    id,
    value: level,
  }));

  const ugsnOptions = lists.ugsn.map<Option>(({ id, code, name }) => ({
    id,
    value: `${code}–${name}`,
  }));

  const specialityOptions = lists.speciality.map<Option>(({ id, code, name }) => ({
    id,
    value: `${code}–${name}`,
  }));

  const TSOptions = lists.trainingDirection.map<Option>(({ id, code, name }) => ({
    id,
    value: `${code}–${name}`,
  }));

  const onSelect = React.useCallback(
    (key: keyof typeof lists) => (id: string) => {
      bankFormFirstPartModel.events.select[key](id);
    },
    []
  );

  const onLevelInputChange = React.useCallback(
    (key: keyof typeof lists) => (input: string) => {
      bankFormFirstPartModel.events.changeInput[key](input);
    },
    []
  );

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
    <>
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
    </>
  );
};

export default React.memo(Form);
