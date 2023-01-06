import { Speciality } from 'types/speciality';

import { api } from '../axios';

import type { GetSpecialtiesArgs, CreateSpecialityArgs } from './types';

const specialityApi = {
  getAll: async (ugsnId: string) => {
    const res = await api.get<Speciality[]>(`/ugsn/${ugsnId}/specialties`);
    return res.data;
  },
  create: async ({ code, title, ugsnId }: CreateSpecialityArgs) => {
    const res = await api.post<void>(`/ugsn/${ugsnId}/specialties`, { code, title });
    return res.data;
  },

  // TODO useless
  delete: async (id: string) => {
    // TODO
    const res = await api.get<Speciality[]>(`${id}`);
    return res.data;
  },
};

export default specialityApi;
