import { LevelOfEducation } from './bank';

export type CreateUGSNForm = {
  level: LevelOfEducation | null;
  ugsnCode: string;
  ugsn: string;
};
