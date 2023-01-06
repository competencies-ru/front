import { Level } from './level';

export type UGSN = {
  id: string;
  code: string;
  title: string;
};

export type CreateUGSNForm = {
  level: Level | null;
  ugsnCode: string;
  ugsn: string;
};
