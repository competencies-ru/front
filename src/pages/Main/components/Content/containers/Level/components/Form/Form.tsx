import React from 'react';

import { useForm } from 'effector-forms';
import { useGate, useStore } from 'effector-react';
import { useParams } from 'react-router';

import { Button, FormItem, Input, Typography, TypographyType } from '@ui';

import { levelFormModel } from './model';

import styles from './Form.module.scss';

const Form = () => {
  const { id } = useParams<{ id?: string }>();
  useGate(levelFormModel.gates.openGate, id ?? null);

  const { errorText, fields, eachValid, submit } = useForm(levelFormModel.form);
  const currentLevel = useStore(levelFormModel.stores.currentLevel);

  const handleSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      submit();
    },
    [submit]
  );

  const disabled = React.useMemo(
    () => !eachValid || (!!id && currentLevel === fields.level.value),
    [eachValid, id, currentLevel, fields.level.value]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Typography type={TypographyType.H3} className={styles.title}>
        {id ? 'Редактирование уровня' : 'Создание уровня'}
      </Typography>
      <>
        <FormItem>
          <Input
            value={fields.level.value}
            onChange={fields.level.onChange}
            placeholder="Название уровня"
            errorText={errorText('level')}
          />
        </FormItem>
        <FormItem>
          <Button type="submit" className={styles.btn} disabled={disabled}>
            {id ? 'Изменить' : 'Создать'}
          </Button>
        </FormItem>
      </>
    </form>
  );
};

export default React.memo(Form);
