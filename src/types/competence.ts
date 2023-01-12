import type { Level } from './level';
import type { Program } from './program';
import type { Speciality } from './speciality';
import type { UGSN } from './ugsn';

export enum CompetenceType {
  Universal = 'UNIVERSAL',
  General = 'GENERAL',
  Professional = 'PROFESSIONAL',
}

export const CompetenceTypeTitle = {
  [CompetenceType.Universal]: 'УК',
  [CompetenceType.General]: 'ОПК',
  [CompetenceType.Professional]: 'ПК',
};

export type Competence = {
  id: string;
  category: string;
  code: string;
  title: string;
  type: CompetenceType;
  levelId: string;
  ugsnId?: string;
  specialtyId?: string;
  programId?: string;
};

export type CreateCompetenceForm = {
  category: string;
  code: string;
  title: string;
  type: CompetenceType | null;
  level: Level | null;
  ugsn: UGSN | null;
  speciality: Speciality | null;
  program: Program | null;
};
