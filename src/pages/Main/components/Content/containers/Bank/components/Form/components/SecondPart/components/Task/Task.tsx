import React from 'react';

import cn from 'classnames';

import { Select } from '@ui/Select';
import { Textarea } from '@ui/Textarea';
import { Typography, TypographyType } from '@ui/Typography';
import { TASK_TYPES, TASK_TYPES_OPTIONS, TASK_TYPES_OPTIONS_TEXT } from 'constants/tasks';
import { TaskType, type Task as TTask } from 'types/bank';

import { Answer } from './components';

import styles from './Task.module.scss';

type Props = {
  number: number;
  task: TTask;
  onChangeTaskType: (typeType: TaskType, numberOfTask: number) => void;
  onChangeDescription: (v: string, numberOfTask: number) => void;
  onAddAnswer: (type: TaskType, numberOfTask: number) => (...args: unknown[]) => void;
  onChangeAnswer: (type: TaskType, numberOfTask: number) => (v: number) => void;
  onChangeAnswerDescription: (
    type: TaskType,
    numberOfTask: number
  ) => (numberOfAnswer: number, v: string) => void;
};

const Task: React.FC<Props> = (props) => {
  const {
    number,
    task,
    onChangeTaskType,
    onChangeDescription,
    onAddAnswer,
    onChangeAnswer,
    onChangeAnswerDescription,
  } = props;

  const [type, setType] = React.useState<TaskType>(TaskType.Unknown);

  const taskTypeValue = task.type === TaskType.Unknown ? '' : TASK_TYPES[task.type];
  const hasTaskType = !!taskTypeValue;

  const handleTaskType = React.useCallback(
    (id: string) => {
      const selectedTask = TASK_TYPES_OPTIONS.find((t) => t.id === id);

      if (selectedTask) {
        onChangeTaskType(selectedTask.value, number);

        setType(selectedTask.value);
      }
    },
    [onChangeTaskType, number]
  );

  const handleDescription = React.useCallback(
    (d: string) => {
      onChangeDescription(d, number);
    },
    [onChangeDescription, number]
  );

  const renderAnswer = React.useCallback(() => {
    switch (type) {
      case TaskType.OneVariant:
        return (
          <Answer.ONE_VARIANT
            value={task.answer?.value ?? null}
            descriptions={task.answer?.descriptions ?? []}
            onAddAnswer={onAddAnswer(type, number)}
            onChange={onChangeAnswer(type, number)}
            onChangeDescription={onChangeAnswerDescription(type, number)}
          />
        );
        break;
      case TaskType.LotOfVariants:
        return null;
        break;

      default:
        return null;
        break;
    }
  }, [
    number,
    onAddAnswer,
    onChangeAnswer,
    onChangeAnswerDescription,
    task.answer?.descriptions,
    task.answer?.value,
    type,
  ]);

  const textareaStyles = cn(styles.textarea, { [styles.disabled]: !hasTaskType });

  return (
    <div className={styles.taskWrapper}>
      <div className={styles.task}>
        <Typography className={styles.number} type={TypographyType.Div}>
          {number}
        </Typography>
        <Select
          className={styles.select}
          value={taskTypeValue}
          onChange={handleTaskType}
          placeholder="Тип задания"
          options={TASK_TYPES_OPTIONS_TEXT}
        />
      </div>
      <div className={styles.contentWrapper}>
        <Textarea
          value={task.description}
          onChange={handleDescription}
          placeholder="Условие"
          disabled={!hasTaskType}
          className={textareaStyles}
        />
        {renderAnswer()}
      </div>
    </div>
  );
};

export default React.memo(Task);
