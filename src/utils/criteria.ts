import schema from '../schemas/frameworks.json';
import {
  CriteriaCategories,
  CriterionCategoryId,
  CriterionId,
  FrameworkCriteriaData,
  FrameworkData,
  Weights,
} from '../types';

import { getFrameworkIds } from './config';

export function getCriteriaSchema(): typeof schema.properties.criteria.properties {
  return schema.properties.criteria.properties;
}

export function getCriteriaCategories(): CriterionCategoryId[] {
  return Object.keys(getCriteriaSchema()) as CriterionCategoryId[];
}

export function getCriteriaIds<Category extends CriterionCategoryId>(
  criteria: CriteriaCategories,
  category: Category,
): CriterionId<Category>[] {
  return Object.keys(criteria[category]) as CriterionId<Category>[];
}

export function getTotalWeights(criteriaWeights: Weights): number {
  return Object.values(criteriaWeights).reduce(
    (acc, categoryWeights) =>
      acc + Object.values(categoryWeights).reduce((acc2, w) => acc2 + w),
    0,
  );
}

export function getFrameworkData(): FrameworkData {
  return getFrameworkIds().reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: require(`../data/${frameworkId}.json`),
    }),
    {},
  );
}

export function getFrameworkCriteriaData(): FrameworkCriteriaData {
  return Object.keys(getFrameworkData()).reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: getFrameworkData()[frameworkId].criteria,
    }),
    {},
  );
}
