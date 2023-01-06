import { Program } from 'types/program';

import { api } from '../axios';

import type { CreateProgramArgs } from './types';

const programsApi = {
  getAll: async (specialityId: string) => {
    const res = await api.get<Program[]>(`/specialty/${specialityId}/programs`);
    return res.data;
  },
  create: async ({ specialityId, code, title }: CreateProgramArgs) => {
    const res = await api.post<void>(`/specialty/${specialityId}/programs`, { code, title });
    return res.data;
  },
};

export default programsApi;
