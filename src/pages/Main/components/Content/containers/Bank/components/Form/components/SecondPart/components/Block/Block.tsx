import React from 'react';

import { Divider } from '@ui/Divider';
import { Select } from '@ui/Select';
import { Typography, TypographyType } from '@ui/Typography';

import { Paper } from '../../..';

import styles from './Block.module.scss';

type Props = {
  number: number;
  children: React.ReactNode;
  onAddTask: (number: number) => () => void;
  onRemoveBlock: (number: number) => void;
};

const Block: React.FC<Props> = (props) => {
  const { number, children, onAddTask, onRemoveBlock } = props;

  onRemoveBlock(3);

  const hasTasks = React.useMemo(
    () =>
      (!Array.isArray(children) && !!children) || (Array.isArray(children) && !!children.length),
    [children]
  );

  return (
    <Paper>
      <div className={styles.headerWrapper}>
        <Typography type={TypographyType.Div} className={styles.number}>
          {number}
        </Typography>
        <Select
          value={''}
          onInputChange={() => undefined}
          options={[]}
          onChange={() => undefined}
          placeholder="Дисциплина"
          className={styles.select}
          errorText={''}
        />
        <Select
          value={''}
          onInputChange={() => undefined}
          options={[]}
          onChange={() => undefined}
          placeholder="Индикатор"
          className={styles.select}
          errorText={''}
        />
      </div>
      <Divider className={styles.divider} />
      {hasTasks && (
        <>
          {children}
          <Divider className={styles.divider} />
        </>
      )}
      <button type="button" onClick={onAddTask(number)} className={styles.addTask}>
        <Typography type={TypographyType.Div}>Добавить задание</Typography>
      </button>
    </Paper>
  );
};

export default React.memo(Block);
