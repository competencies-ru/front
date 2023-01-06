import React from 'react';

import { useForm } from 'effector-forms';

import { Typography, TypographyType, Collapse } from '@ui';
import { TaskType } from 'types/task';

import { Block, Task } from './components';
import { bankFormSecondPartModel } from './model';

import styles from './SecondPart.module.scss';

const SecondPart = () => {
  const { fields } = useForm(bankFormSecondPartModel.form);

  const onAddTask = React.useCallback(
    (number: number) => () => {
      bankFormSecondPartModel.events.addTask(number);
    },
    []
  );

  const onAddDisciplineOrIndicator = React.useCallback(() => {
    bankFormSecondPartModel.events.addDisciplineOrIndicator();
  }, []);

  const onChangeTaskType = React.useCallback(
    (disciplineId: string) => (taskType: TaskType, numberOfTask: number) => {
      bankFormSecondPartModel.events.changeTaskType({
        disciplineId,
        taskType,
        number: numberOfTask,
      });
    },
    []
  );

  const onChangeDescription = React.useCallback(
    (disciplineId: string) => (description: string, numberOfTask: number) => {
      bankFormSecondPartModel.events.changeDescription({
        disciplineId,
        description,
        number: numberOfTask,
      });
    },
    []
  );

  const onAddAnswer = React.useCallback(
    (disciplineId: string) => (type: TaskType, numberOfTask: number) => () => {
      bankFormSecondPartModel.events.addAnswer({ disciplineId, type, number: numberOfTask });
    },
    []
  );

  const onChangeAnswer = React.useCallback(
    (disciplineId: string) => (type: TaskType, numberOfTask: number) => (v: number) => {
      bankFormSecondPartModel.events.changeAnswer({
        disciplineId,
        type,
        number: numberOfTask,
        value: v,
      });
    },
    []
  );

  const onChangeAnswerDescription = React.useCallback(
    (disciplineId: string) =>
      (type: TaskType, numberOfTask: number) =>
      (numberOfAnswer: number, v: string) => {
        bankFormSecondPartModel.events.changeAnswerDescription({
          disciplineId,
          type,
          numberOfTask,
          numberOfAnswer,
          value: v,
        });
      },
    []
  );

  const onRemoveBlock = React.useCallback(() => undefined, []);

  return (
    <div className={styles.blocksWrapper}>
      {fields.disciplines.value.map((discipline, index) => (
        <Collapse key={discipline.id}>
          <Block number={index + 1} onAddTask={onAddTask} onRemoveBlock={onRemoveBlock}>
            {discipline.indicator.tasks.map((task, index) => (
              <Task
                key={task.id}
                number={index + 1}
                task={task}
                onChangeTaskType={onChangeTaskType(discipline.id)}
                onChangeDescription={onChangeDescription(discipline.id)}
                onAddAnswer={onAddAnswer(discipline.id)}
                onChangeAnswer={onChangeAnswer(discipline.id)}
                onChangeAnswerDescription={onChangeAnswerDescription(discipline.id)}
              />
            ))}
          </Block>
        </Collapse>
      ))}
      <button
        type="button"
        onClick={onAddDisciplineOrIndicator}
        className={styles.addDisciplineOrIndicator}
      >
        <Typography type={TypographyType.Div}>Добавить дисциплину/индикатор</Typography>
      </button>
    </div>
  );
};

export default React.memo(SecondPart);
