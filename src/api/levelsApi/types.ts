import { UGSNByIdResponse } from 'api/ugsnApi/types';
import { Level } from 'types/level';

export type LevelByIdResponse = Level & {
  ugsn: UGSNByIdResponse;
};
