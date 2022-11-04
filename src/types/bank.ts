export interface ILevelOfEducation  {
  id: string;
  level: string;
}

export type UGSN = {
  id: string;
  name: string;
  code: string;
}

export type Speciality = {
  id: string;
  name: string;
  code: string;
}

export type TrainingDirection = {
  id: string;
  name: string;
  code: string;
}

export type BankForm = {
  level: ILevelOfEducation | null;
  ugsn: UGSN | null;
  speciality: Speciality | null;
  trainingDirection: TrainingDirection | null;
}
