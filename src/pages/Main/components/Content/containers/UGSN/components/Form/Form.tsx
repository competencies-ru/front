import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';

import { Button, FormItem, Input, Select, Typography, TypographyType } from '@ui';

import { indicatorFormModel as UGSNFormModel } from './model';

import styles from './Form.module.scss';
type SelectKeys = keyof typeof UGSNFormModel.events.select;

const Form = () => {
  useGate(UGSNFormModel.gates.openGate);

  const { levelOptions } = useStore(UGSNFormModel.stores.options);

  const values = useStore(UGSNFormModel.stores.values);
  const loading = useStore(UGSNFormModel.stores.loading);

  const { errorText, fields, submit, eachValid } = useForm(UGSNFormModel.form);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submit();
  };

  const onSelect = React.useCallback(
    (key: SelectKeys) => (id: string) => {
      UGSNFormModel.events.select[key](id);
    },
    []
  );

  const onLevelInputChange = React.useCallback(
    (key: SelectKeys) => (input: string) => {
      UGSNFormModel.events.changeInput[key](input);
    },
    []
  );

  const onClear = React.useCallback(
    (key: SelectKeys) => () => {
      UGSNFormModel.events.clear[key]();
    },
    []
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
          <Input
            value={fields.ugsnCode.value}
            onChange={fields.ugsnCode.onChange}
            placeholder="Код УГСН"
            errorText={errorText('ugsnCode')}
          />
        </FormItem>
        <FormItem>
          <Input
            value={fields.ugsn.value}
            onChange={fields.ugsn.onChange}
            placeholder="Название УГСН"
            errorText={errorText('ugsn')}
          />
        </FormItem>
        <FormItem>
          <Button type="submit" className={styles.btn} disabled={!eachValid}>
            Создать
          </Button>
        </FormItem>
      </>
    </form>
  );
};

export default React.memo(Form);
