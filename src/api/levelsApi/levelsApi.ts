import { Level } from 'types/level';

import { api } from '../axios';

import { LevelByIdResponse } from './types';

const BASE_LEVELS_URL = '/levels';

const levelsApi = {
  getAll: async () => {
    const res = await api.get<Level[]>(BASE_LEVELS_URL);
    return res.data;
  },
  getById: async (levelId: string) => {
    const res = await api.get<LevelByIdResponse>(`${BASE_LEVELS_URL}/${levelId}`);
    return res.data;
  },
  create: async (title: string) => {
    const res = await api.post<void>(BASE_LEVELS_URL, { title });
    return res.data;
  },

  // TODO useless
  delete: async (id: string) => {
    // TODO FIX
    const res = await api.delete<void>(`${BASE_LEVELS_URL}/${id}`);
    return res.data;
  },
  update: async (title: string) => {
    // TODO FIX
    const res = await api.post<void>(BASE_LEVELS_URL, { title });
    return res.data;
  },
};

export default levelsApi;
