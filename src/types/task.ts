export enum TaskType {
  Unknown = 'UNKNOWN',
  OneVariant = 'ONE_VARIANT',
  LotOfVariants = 'LOT_OF_VARIANTS',
  Matching = 'MATCHING',
}

export type OneVariantAnswerDescription = {
  id: string;
  text: string;
};

export type OneVariantAnswer = {
  value: number | null;
  descriptions: OneVariantAnswerDescription[];
};

export type Answer = OneVariantAnswer;

export type Task<T extends TaskType = TaskType, A extends Answer = Answer> = {
  id: string;
  type: T;
  description: string;
  answer?: A;
};
