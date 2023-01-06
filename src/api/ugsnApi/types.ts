import { SpecialityByIdResponse } from 'api/specialityApi/types';
import { UGSN } from 'types/ugsn';

export type UGSNByIdResponse = UGSN & {
  speciality: SpecialityByIdResponse;
};

export type CreateUGSN = {
  code: string;
  title: string;
  levelId: string;
};
