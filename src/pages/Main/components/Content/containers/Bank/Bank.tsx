import React from 'react';

import { Link } from 'react-router-dom';

import { Button, Typography, TypographyType } from '@ui';

import { New } from './components';

import styles from './Bank.module.scss';

class Bank extends React.PureComponent {
  static New = New;

  render() {
    const newBankLink = `${window.location.pathname}/new`;

    return (
      <>
        <Link to={newBankLink}>
          <Button className={styles.btn}>Создать банк вопросов</Button>
        </Link>
        <Typography type={TypographyType.H3} className={styles.title}>
          Банки вопросов
        </Typography>
      </>
    );
  }
}

export default Bank;
