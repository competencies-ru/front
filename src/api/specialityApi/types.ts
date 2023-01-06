import { Program } from 'types/program';
import { Speciality } from 'types/speciality';

export type SpecialityByIdResponse = Speciality & {
  program: Program;
};

export type CreateSpecialityArgs = {
  ugsnId: string;
  code: string;
  title: string;
};
