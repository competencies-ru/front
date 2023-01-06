import { Competence } from 'types/competence';
import { Discipline } from 'types/discipline';

import { api } from '../axios';

const bankApi = {
  getCompetence: async () => {
    const res = await api.get<Competence[]>('/competencies');
    return res.data;
  },
  getDisciplines: async () => {
    const res = await api.get<Discipline[]>('/competencies');
    return res.data;
  },
};

export default bankApi;
