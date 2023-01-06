import { Competence } from './competence';
import { FormDiscipline } from './discipline';
import { Level } from './level';
import { Program } from './program';
import { Speciality } from './speciality';
import { UGSN } from './ugsn';

export type EducationInfoBankForm = {
  level: Level | null;
  ugsn: UGSN | null;
  speciality: Speciality | null;
  program: Program | null;
  competence: Competence | null;
};

export type BankForm = {
  educationInfo: EducationInfoBankForm;
  disciplines: FormDiscipline[];
};
