export const UGSNRegExp = new RegExp(/^(0[1-9]{1}|[1-9]{1}[0-9]{1})\.00\.00$/);

export const SpecialityRegExp = new RegExp(
  /^(0[1-9]{1}|[1-9]{1}[0-9]{1})\.(0[1-9]{1}|[1-9]{1}[0-9]{1})\.(0[1-9]{1}|[1-9]{1}[0-9]{1})$/
);

export const ProgramRegExp = new RegExp(
  /^(0[1-9]{1}|[1-9]{1}[0-9]{1})\.(0[1-9]{1}|[1-9]{1}[0-9]{1})\.(0[1-9]{1}|[1-9]{1}[0-9]{1})-(0[1-9]{1}|[1-9]{1}[0-9]{1})$/
);

export const CompetencyRegExp = new RegExp(/^(УК|ОПК|ПК)–([1-9]{1}[0-9]?)$/);
