import { Frameworks } from './frameworks';

export type CriteriaCategories = Frameworks['criteria'];

export type CriterionCategoryId = keyof CriteriaCategories;

export type CriterionId<
  Category extends CriterionCategoryId
> = keyof CriteriaCategories[Category];

export type CriteriaData<T> = {
  [Category in CriterionCategoryId]: {
    [Criterion in CriterionId<Category>]: T;
  };
};

export type FrameworkSimilarity = {
  framework: string;
  criteria: CriteriaData<number>;
  totalSimilarity: number;
};

export type FrameworkData = {
  [k: string]: Frameworks;
};

export type SimilarityFunctions = {
  [Category in CriterionCategoryId]: {
    [Criterion in CriterionId<Category>]: (
      criterionValue: CriteriaCategories[Category][Criterion],
      frameworkValue: CriteriaCategories[Category][Criterion],
    ) => number;
  };
};

export type Weights = CriteriaData<number>;
