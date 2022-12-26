export type LevelOfEducation = {
  id: string;
  title: string;
};

export type UGSN = {
  code: string;
  title: string;
};

export type Speciality = {
  code: string;
  title: string;
};

export type TrainingDirection = {
  code: string;
  title: string;
};

export type Competence = {
  code: string;
  title: string;
};

export type EducationInfoBankForm = {
  level: LevelOfEducation | null;
  ugsn: UGSN | null;
  speciality: Speciality | null;
  TD: TrainingDirection | null;
  competence: Competence | null;
};

export enum TaskType {
  Unknown = 'UNKNOWN',
  OneVariant = 'ONE_VARIANT',
  LotOfVariants = 'LOT_OF_VARIANTS',
  Matching = 'MATCHING',
}

export type OneVariantAnswerDescription = {
  id: string;
  text: string;
};

export type OneVariantAnswer = {
  value: number | null;
  descriptions: OneVariantAnswerDescription[];
};

export type Answer = OneVariantAnswer;

export type Task<T extends TaskType = TaskType, A extends Answer = Answer> = {
  id: string;
  type: T;
  description: string;
  answer?: A;
};

type Indicator = {
  id: string;
  title: string;
};

export type FormIndicator = Indicator & {
  tasks: Task[];
};

export type Discipline = {
  id: string;
  title: string;
};

export type FormDiscipline = Discipline & {
  indicator: FormIndicator;
};

export type BankForm = {
  educationInfo: EducationInfoBankForm;
  disciplines: FormDiscipline[];
};
