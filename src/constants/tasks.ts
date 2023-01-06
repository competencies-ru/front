import { Option } from 'types/select';
import { TaskType } from 'types/task';

export const TASK_TYPES = {
  [TaskType.Unknown]: '',
  [TaskType.OneVariant]: 'Тест с одним вариантом ответа',
  [TaskType.LotOfVariants]: 'Тест с несколькими вариантами ответов',
  [TaskType.Matching]: 'Сопоставление',
};

export const TASK_TYPES_OPTIONS: Option<TaskType>[] = Object.keys(TASK_TYPES).map(
  (type: TaskType, index) => ({
    id: index.toString(),
    value: type,
  })
);

export const TASK_TYPES_OPTIONS_TEXT = TASK_TYPES_OPTIONS.map((task) => ({
  id: task.id,
  value: TASK_TYPES[task.value],
})).filter((task) => !!task.value);
