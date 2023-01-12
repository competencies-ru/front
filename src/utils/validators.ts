import { Rule } from 'effector-forms';

export const REQUIRED_TEXT = 'Обязательное поле';

export const rules = {
  required: (): Rule<unknown> => ({
    name: 'required string',
    validator: (value) => Boolean(value),
    errorText: REQUIRED_TEXT,
  }),
  notNull: (): Rule<unknown> => ({
    name: 'not null value',
    validator: (value) => value !== null,
    errorText: REQUIRED_TEXT,
  }),
  regExp: (regExp: RegExp, errorText: string): Rule<string> => ({
    name: 'wrong value (RegExp)',
    validator: (value) => regExp.test(value),
    errorText: errorText,
  }),
  notSame: (currentValue: string): Rule<string> => ({
    name: 'same',
    validator: (value) => currentValue !== value,
    errorText: `Значение не должно совпадать с "${currentValue}"`,
  }),
};
