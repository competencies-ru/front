import { Level } from './level';
import { UGSN } from './ugsn';

export type Speciality = {
  id: string;
  code: string;
  title: string;
};

export type CreateSpecialityForm = {
  level: Level | null;
  ugsn: UGSN | null;
  specialityCode: string;
  speciality: string;
};
