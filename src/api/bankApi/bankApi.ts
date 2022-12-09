import { LevelOfEducation, Speciality, TrainingDirection, UGSN } from 'types/bank';

import { api } from '../axios';

const bankApi = {
  getLevelsOfEducation: async () => {
    const res = await api.get<LevelOfEducation[]>('/level-educations');
    return res.data;
  },
  getUGSNByLevel: async (levelId: string) => {
    const res = await api.get<UGSN[]>(`/ugsn/${levelId}`);
    return res.data;
  },
  getSpecialityByUGSN: async (ugsnId: string) => {
    const res = await api.get<Speciality[]>(`/speciality/${ugsnId}`);
    return res.data;
  },
  getTrainingDirectionBySpeciality: async (specialityId: string) => {
    const res = await api.get<TrainingDirection[]>(`/training-direction/${specialityId}`);
    return res.data;
  },
};

export default bankApi;
