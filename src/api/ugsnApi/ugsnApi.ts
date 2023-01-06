import { UGSN } from 'types/ugsn';

import { api } from '../axios';

import type { CreateUGSN } from './types';

const ugsnApi = {
  getAll: async (levelId: string) => {
    const res = await api.get<UGSN[]>(`/levels/${levelId}/ugsn`);
    return res.data;
  },
  create: async ({ levelId, code, title }: CreateUGSN) => {
    const res = await api.post<void>(`/levels/${levelId}/ugsn`, { code, title });
    return res.data;
  },

  // TODO useless
  update: async ({ levelId, code, title }: CreateUGSN) => {
    const res = await api.patch<UGSN[]>(`/levels/${levelId}/ugsn`, { code, title });
    return res.data;
  },
  delete: async (id: string) => {
    // TODO
    const res = await api.delete<UGSN[]>(`/levels/${id}/ugsn`);
    return res.data;
  },
};

export default ugsnApi;
