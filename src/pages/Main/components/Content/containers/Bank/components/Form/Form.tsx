import React from 'react';

import { Typography, TypographyType } from '@ui';

import { FirstPart, SecondPart } from './components';

import styles from './Form.module.scss';

const Form = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // submit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography type={TypographyType.H3} className={styles.title}>
        Создание банка вопросов
      </Typography>
      <FirstPart />
      <SecondPart />
    </form>
  );
};

export default Form;
