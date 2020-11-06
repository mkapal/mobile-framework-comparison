import { getFrameworkIds } from '../config';
import schema from '../schemas/frameworks.json';
import {
  CriteriaCategories,
  CriterionCategoryId,
  CriterionId,
  FrameworkCriteriaData,
  FrameworkData,
  Weights,
} from '../types';

export const getCriteriaSchema = (): typeof schema.properties.criteria.properties =>
  schema.properties.criteria.properties;

export const getCriteriaCategories = (): CriterionCategoryId[] =>
  Object.keys(getCriteriaSchema()) as CriterionCategoryId[];

export const getCriteriaIds = <Category extends CriterionCategoryId>(
  criteria: CriteriaCategories,
  category: Category,
): CriterionId<Category>[] =>
  Object.keys(criteria[category]) as CriterionId<Category>[];

export const getTotalWeights = (criteriaWeights: Weights): number =>
  Object.values(criteriaWeights).reduce(
    (acc, categoryWeights) =>
      acc + Object.values(categoryWeights).reduce((acc2, w) => acc2 + w),
    0,
  );

export const getFrameworkData = (): FrameworkData =>
  getFrameworkIds().reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: require(`../data/${frameworkId}.json`),
    }),
    {},
  );

export const getFrameworkCriteriaData = (): FrameworkCriteriaData =>
  Object.keys(getFrameworkData()).reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: getFrameworkData()[frameworkId].criteria,
    }),
    {},
  );
