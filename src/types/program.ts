import { Level } from './level';
import { Speciality } from './speciality';
import { UGSN } from './ugsn';

export type Program = {
  id: string;
  code: string;
  title: string;
};

export type CreateProgramForm = {
  level: Level | null;
  ugsn: UGSN | null;
  speciality: Speciality | null;
  programCode: string;
  program: string;
};
