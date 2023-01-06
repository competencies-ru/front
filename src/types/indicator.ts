import { Competence } from './competence';
import { Level } from './level';
import { Program } from './program';
import { Speciality } from './speciality';
import { Task } from './task';
import { UGSN } from './ugsn';

type Indicator = {
  id: string;
  title: string;
};

export type FormIndicator = Indicator & {
  tasks: Task[];
};

export type CreateIndicatorForm = {
  level: Level | null;
  ugsn: UGSN | null;
  speciality: Speciality | null;
  program: Program | null;
  competence: Competence | null;
  indicatorCode: string;
  indicator: string;
};
