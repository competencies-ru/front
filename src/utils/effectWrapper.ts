import { AxiosError } from 'axios';
import { Domain } from 'effector';
import { toast } from 'react-toastify';

import { Error, ErrorSlug } from 'types/error';

const UNAUTHORIZED_CODE = 401;

const DEFAULT_ERROR_TEXT = 'Упс! Что-то пошло не так';
const INVALID_PARAMETERS = 'Данные заполнены неверно';

const ERROR_TEXT: { [key in ErrorSlug]: string } = {
  [ErrorSlug.LevelNotFound]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.UgsnNotFound]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.SpecialtyNotFound]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.ProgramNotFound]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.InvalidJson]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.BadRequest]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.UnexpectedError]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.EmptyBearerToken]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.UnableToVerifyJwt]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.UnauthorizedUser]: DEFAULT_ERROR_TEXT,
  [ErrorSlug.InvalidLevelParameters]: INVALID_PARAMETERS,
  [ErrorSlug.InvalidUgsnParameters]: INVALID_PARAMETERS,
  [ErrorSlug.InvalidSpecialtiesParameters]: INVALID_PARAMETERS,
  [ErrorSlug.InvalidProgramParameters]: INVALID_PARAMETERS,
};

const errorHandler = (error: AxiosError<Error>) => {
  if (error.response?.status !== UNAUTHORIZED_CODE) {
    const slug = error.response?.data.slug;
    const errorText = slug ? ERROR_TEXT[slug] : DEFAULT_ERROR_TEXT;

    toast.error(errorText);
  }
};

const createEffectWrapper = <Payload, Done>(
  domain: Domain,
  args: {
    handler: (params: Payload) => Promise<Done> | Done;
  }
) => {
  const effectFx = domain.createEffect<Payload, Done, AxiosError<Error>>(args);

  effectFx.failData.watch(errorHandler);

  return effectFx;
};

export default createEffectWrapper;
