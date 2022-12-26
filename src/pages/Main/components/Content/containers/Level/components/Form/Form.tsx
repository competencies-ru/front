import React from 'react';

import { useForm } from 'effector-forms';
import { useGate } from 'effector-react';

import { Button, FormItem, Input, Typography, TypographyType } from '@ui';

import { levelFormModel } from './model';

import styles from './Form.module.scss';

const Form = () => {
  useGate(levelFormModel.gates.openGate);

  const { errorText, fields, submit } = useForm(levelFormModel.form);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography type={TypographyType.H3} className={styles.title}>
        Создание уровня
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
          <Button type="submit" className={styles.btn}>
            Создать
          </Button>
        </FormItem>
      </>
    </form>
  );
};

export default React.memo(Form);
