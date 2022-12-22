import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';

import { FormDiscipline, TaskType } from 'types/bank';

import {
  generateDefaultAnswerOneVariant,
  generateDefaultDiscipline,
  generateDefaultTask,
  generateEmptyOneVariantAnswerDescription,
} from './service';

type DisciplinesForm = {
  disciplines: FormDiscipline[];
};

type ChangeTaskType = {
  disciplineId: string;
  taskType: TaskType;
  number: number;
};

type ChangeDescription = {
  disciplineId: string;
  description: string;
  number: number;
};

type AddAnswer = {
  disciplineId: string;
  type: TaskType;
  number: number;
};

type ChangeAnswer = {
  disciplineId: string;
  type: TaskType;
  number: number;
  value: number;
};

type ChangeAnswerDescription = {
  disciplineId: string;
  type: TaskType;
  numberOfTask: number;
  numberOfAnswer: number;
  value: string;
};

const bankFormSecondPartDomain = createDomain('bank form second part domain');

const addTask = bankFormSecondPartDomain.createEvent<number>();
const addDisciplineOrIndicator = bankFormSecondPartDomain.createEvent();
const changeTaskType = bankFormSecondPartDomain.createEvent<ChangeTaskType>();
const changeDescription = bankFormSecondPartDomain.createEvent<ChangeDescription>();
const addAnswer = bankFormSecondPartDomain.createEvent<AddAnswer>();
const changeAnswer = bankFormSecondPartDomain.createEvent<ChangeAnswer>();
const changeAnswerDescription = bankFormSecondPartDomain.createEvent<ChangeAnswerDescription>();

const form = createForm<DisciplinesForm>({
  domain: bankFormSecondPartDomain,
  fields: {
    disciplines: {
      init: [generateDefaultDiscipline()],
      rules: [],
    },
  },
});

sample({
  clock: addTask,
  source: form.$values,
  fn: (formValues, numberOfTask) => {
    formValues.disciplines[numberOfTask - 1].indicator.tasks.push(generateDefaultTask());

    return [...formValues.disciplines];
  },
  target: form.fields.disciplines.onChange,
});

sample({
  clock: addDisciplineOrIndicator,
  source: form.$values,
  fn: (formValues) => {
    formValues.disciplines.push(generateDefaultDiscipline());

    return [...formValues.disciplines];
  },
  target: form.fields.disciplines.onChange,
});

sample({
  clock: changeTaskType,
  source: form.$values,
  fn: (formValues, { disciplineId, taskType, number }) => {
    const currentDiscipline = formValues.disciplines.find((d) => d.id === disciplineId);

    if (currentDiscipline) {
      const currentTask = currentDiscipline.indicator.tasks[number - 1];

      currentTask.type = taskType;

      switch (taskType) {
        case TaskType.OneVariant:
          currentTask.answer = generateDefaultAnswerOneVariant();
          break;

        case TaskType.Unknown:
          currentTask.answer = undefined;
          break;

        default:
          break;
      }

      return [...formValues.disciplines];
    }

    return formValues.disciplines;
  },
  target: form.fields.disciplines.onChange,
});

sample({
  clock: changeDescription,
  source: form.$values,
  fn: (formValues, { disciplineId, description, number }) => {
    const currentDiscipline = formValues.disciplines.find((d) => d.id === disciplineId);

    if (currentDiscipline) {
      const currentTask = currentDiscipline.indicator.tasks[number - 1];

      currentTask.description = description;

      return [...formValues.disciplines];
    }

    return formValues.disciplines;
  },
  target: form.fields.disciplines.onChange,
});

sample({
  clock: addAnswer,
  source: form.$values,
  fn: (formValues, { type, number, disciplineId }) => {
    const currentDiscipline = formValues.disciplines.find((d) => d.id === disciplineId);

    if (currentDiscipline) {
      const currentTask = currentDiscipline.indicator.tasks[number - 1];

      if (currentTask.answer) {
        switch (type) {
          case TaskType.OneVariant:
            currentTask.answer.descriptions.push(generateEmptyOneVariantAnswerDescription());
            break;

          case TaskType.Unknown:
            break;

          default:
            break;
        }
      }

      return [...formValues.disciplines];
    }

    return formValues.disciplines;
  },
  target: form.fields.disciplines.onChange,
});

sample({
  clock: changeAnswer,
  source: form.$values,
  fn: (formValues, { type, number, disciplineId, value }) => {
    const currentDiscipline = formValues.disciplines.find((d) => d.id === disciplineId);

    if (currentDiscipline) {
      const currentTask = currentDiscipline.indicator.tasks[number - 1];

      if (currentTask.answer) {
        switch (type) {
          case TaskType.OneVariant: {
            const newCurrentTask = { ...currentTask };
            if (newCurrentTask.answer) {
              newCurrentTask.answer.value = newCurrentTask.answer.value === value ? null : value;
            }
            currentDiscipline.indicator.tasks[number - 1] = { ...newCurrentTask };
            break;
          }

          case TaskType.Unknown:
            break;

          default:
            break;
        }
      }

      return [...formValues.disciplines];
    }

    return formValues.disciplines;
  },
  target: form.fields.disciplines.onChange,
});

sample({
  clock: changeAnswerDescription,
  source: form.$values,
  fn: (formValues, { type, numberOfAnswer, numberOfTask, disciplineId, value }) => {
    const currentDiscipline = formValues.disciplines.find((d) => d.id === disciplineId);
    if (currentDiscipline) {
      const currentTask = currentDiscipline.indicator.tasks[numberOfTask - 1];

      if (currentTask.answer) {
        switch (type) {
          case TaskType.OneVariant: {
            const newCurrentTask = { ...currentTask };
            if (newCurrentTask.answer) {
              const currentDescription = newCurrentTask.answer.descriptions[numberOfAnswer - 1];
              newCurrentTask.answer.descriptions[numberOfAnswer - 1] = {
                ...currentDescription,
                text: value,
              };
            }
            currentDiscipline.indicator.tasks[numberOfTask - 1] = { ...newCurrentTask };
            break;
          }

          case TaskType.Unknown:
            break;

          default:
            break;
        }
      }

      return [...formValues.disciplines];
    }

    return formValues.disciplines;
  },
  target: form.fields.disciplines.onChange,
});

export const bankFormSecondPartModel = {
  events: {
    addTask,
    addDisciplineOrIndicator,
    changeTaskType,
    changeDescription,
    addAnswer,
    changeAnswer,
    changeAnswerDescription,
  },
  form,
};
