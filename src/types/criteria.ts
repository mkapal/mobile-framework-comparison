import { Frameworks } from './frameworks';

export type CriteriaCategories = Frameworks['criteria'];

export type CriterionCategoryId = keyof CriteriaCategories;

export type CriteriaFormData = CriteriaCategories;

export type CriteriaData<T> = {
  [id in CriterionCategoryId]: {
    [a in keyof CriteriaCategories[id]]: T;
  };
};

export type FrameworkSimilarity = {
  framework: string;
  criteria: CriteriaData<number>;
  totalSimilarity: number;
};

export type Weights = CriteriaData<number>;
