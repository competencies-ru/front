import type { Competence } from 'types/competence';

import { api } from '../axios';

import type { CreateCompetenceArgs, GetCompetenciesArgs } from './types';

const BASE_LEVELS_URL = '/competencies';

const competenciesApi = {
  create: async (args: CreateCompetenceArgs) => {
    const res = await api.post<void>(BASE_LEVELS_URL, args);
    return res.data;
  },
  getAll: async (args: GetCompetenciesArgs) => {
    const res = await api.get<Competence[]>(BASE_LEVELS_URL, { params: args });
    return res.data;
  },
};

export default competenciesApi;
