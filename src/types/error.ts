export enum ErrorSlug {
  LevelNotFound = 'level-not-found',
  UgsnNotFound = 'ugsn-not-found',
  SpecialtyNotFound = 'specialty-not-found',
  ProgramNotFound = 'program-not-found',
  InvalidJson = 'invalid-json',
  BadRequest = 'bad-request',
  UnexpectedError = 'unexpected-error',
  EmptyBearerToken = 'empty-bearer-token',
  UnableToVerifyJwt = 'unable-to-verify-jwt',
  UnauthorizedUser = 'unauthorized-user',
  InvalidLevelParameters = 'invalid-level-parameters',
  InvalidUgsnParameters = 'invalid-ugsn-parameters',
  InvalidSpecialtiesParameters = 'invalid-specialties-parameters',
  InvalidProgramParameters = 'invalid-program-parameters',
}

export type Error = {
  slug: ErrorSlug;
  details: string;
};
