import { Competence, CompetenceType } from 'types/competence';

type CompetenceCreate = Omit<
  Competence,
  'levelId' | 'ugsnId' | 'specialtyId' | 'programId' | 'type' | 'id'
>;

type CompetenceCreateUniversal = CompetenceCreate & {
  levelId: string;
  type: CompetenceType.Universal;
};

type CompetenceCreateGeneralUGSN = CompetenceCreate & {
  ugsnId: string;
  type: CompetenceType.General;
};

type CompetenceCreateGeneralSpecialty = CompetenceCreate & {
  specialtyId: string;
  type: CompetenceType.General;
};

type CompetenceCreateProfessional = CompetenceCreate & {
  programId: string;
  type: CompetenceType.Professional;
};

export type CreateCompetenceArgs =
  | CompetenceCreateUniversal
  | CompetenceCreateGeneralUGSN
  | CompetenceCreateGeneralSpecialty
  | CompetenceCreateProfessional;

export type GetCompetenciesArgs = {
  levelId: string;
  ugsnId?: string;
  specialtyId?: string;
  programId?: string;
};
