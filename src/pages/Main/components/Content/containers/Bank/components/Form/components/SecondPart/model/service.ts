import { nanoid } from 'nanoid';

import {
  FormDiscipline,
  OneVariantAnswer,
  OneVariantAnswerDescription,
  Task,
  TaskType,
} from 'types/bank';

export const generateDefaultDiscipline = (): FormDiscipline => ({
  id: nanoid(),
  title: '',
  indicator: {
    id: nanoid(),
    title: '',
    tasks: [],
  },
});

export const generateDefaultTask = (): Task => ({
  id: nanoid(),
  type: TaskType.Unknown,
  description: '',
});

export const generateDefaultAnswerOneVariant = (): OneVariantAnswer => ({
  value: null,
  descriptions: [
    {
      id: nanoid(),
      text: '',
    },
  ],
});

export const generateEmptyOneVariantAnswerDescription = (): OneVariantAnswerDescription => ({
  id: nanoid(),
  text: '',
});
