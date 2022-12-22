import { Competence, LevelOfEducation, Speciality, TrainingDirection, UGSN } from 'types/bank';

import { api } from '../axios';

import type { GetSpecialityArgs, GetProgramArgs } from './types';

const bankApi = {
  getLevelsOfEducation: async () => {
    const res = await api.get<LevelOfEducation[]>('/levels');
    return res.data;
  },
  getUGSN: async (levelId: string) => {
    const res = await api.get<UGSN[]>(`/levels/${levelId}/ugsn`);
    return res.data;
  },
  getSpeciality: async ({ levelId, ugsnCode }: GetSpecialityArgs) => {
    const res = await api.get<Speciality[]>(`/levels/${levelId}/ugsn/${ugsnCode}/specialties`);
    return res.data;
  },
  getTrainingDirection: async ({ levelId, ugsnCode, specialtyCode }: GetProgramArgs) => {
    const res = await api.get<TrainingDirection[]>(
      `/level/${levelId}/ugsn/${ugsnCode}/specialty/${specialtyCode}/programs`
    );
    return res.data;
  },
  getCompetence: async () => {
    const res = await api.get<Competence[]>('/competencies');
    return res.data;
  },
};

export default bankApi;
