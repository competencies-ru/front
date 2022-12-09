import { nanoid } from 'nanoid';

import {
  Discipline,
  OneVariantAnswer,
  OneVariantAnswerDescription,
  Task,
  TaskType,
} from 'types/bank';

export const generateDefaultDiscipline = (): Discipline => ({
  id: nanoid(),
  name: '',
  indicator: {
    id: nanoid(),
    name: '',
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
