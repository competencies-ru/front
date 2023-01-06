import { FormIndicator } from './indicator';

export type Discipline = {
  id: string;
  title: string;
};

export type FormDiscipline = Discipline & {
  indicator: FormIndicator;
};
