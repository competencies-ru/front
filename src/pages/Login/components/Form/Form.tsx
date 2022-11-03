import React from 'react';

import { useForm } from 'effector-forms';

import { Typography, TypographyType, Input, Button } from '@ui';

import { form } from './model';

import styles from './Form.module.scss';

const Form = () => {
  const { fields, submit, errorText } = useForm(form);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submit();
  };

  const {
    email: { value: email, onChange: emailChange },
    password: { value: password, onChange: passwordChange },
  } = fields;

  const emailErrorText = errorText('email');
  const passwordErrorText = errorText('password');

  return (
    <div className={styles.wrapper}>
      <Typography type={TypographyType.H1} className={styles.title}>
        Название проекта
      </Typography>
      <form onSubmit={onSubmit}>
        <Input
          value={email}
          onChange={emailChange}
          errorText={emailErrorText}
          placeholder="Email"
          name="email"
        />
        <Input
          value={password}
          onChange={passwordChange}
          errorText={passwordErrorText}
          placeholder="Пароль"
          type="password"
        />
        <Button type="submit" className={styles.btn}>
          Войти
        </Button>
      </form>
    </div>
  );
};

export default Form;
