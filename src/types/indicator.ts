import type { Competence, LevelOfEducation, Speciality, TrainingDirection, UGSN } from './bank';

export type CreateIndicatorForm = {
  level: LevelOfEducation | null;
  ugsn: UGSN | null;
  speciality: Speciality | null;
  TD: TrainingDirection | null;
  competence: Competence | null;
  indicatorCode: string;
  indicator: string;
};
