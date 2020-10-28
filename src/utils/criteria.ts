import schema from '../schemas/frameworks.json';
import {
  CriteriaCategories,
  CriteriaData,
  CriterionCategoryId,
  Frameworks,
} from '../types';

import { getFrameworkIds } from './index';

export const DEFAULT_MAX_RATING = 5;

export function getCriteriaSchema(): typeof schema.properties.criteria.properties {
  return schema.properties.criteria.properties;
}

export function getCriteriaCategories(): CriterionCategoryId[] {
  return Object.keys(getCriteriaSchema()) as CriterionCategoryId[];
}

export function getRatedCriteria(categoryId: CriterionCategoryId): string[] {
  const keys = Object.keys(getCriteriaSchema()[categoryId].properties);

  return keys.filter(
    (criteriaId) =>
      // @ts-ignore
      getCriteriaSchema()[categoryId].properties[criteriaId].readOnly,
  );
}

export function getRatedCriteriaInitialValues(): CriteriaData<number> {
  function getInitialValuesForCategory(
    categoryId: CriterionCategoryId,
  ): {
    [a in keyof CriteriaCategories[typeof categoryId]]: number;
  } {
    return getRatedCriteria(categoryId).reduce(
      (acc, criterionId) => ({
        ...acc,
        [criterionId]: 0,
      }),
      {},
    );
  }

  return getCriteriaCategories().reduce(
    (criteriaValues, categoryId) => ({
      ...criteriaValues,
      [categoryId]: getInitialValuesForCategory(categoryId),
    }),
    {} as CriteriaData<number>,
  );
}

export function getInitialWeights(): CriteriaData<number> {
  function getWeightsForCategory(
    categoryId: CriterionCategoryId,
  ): {
    [a in keyof CriteriaCategories[typeof categoryId]]: number;
  } {
    const criteriaIds = Object.keys(getCriteriaSchema()[categoryId].properties);

    return criteriaIds.reduce(
      (weights, criterionId) => ({
        ...weights,
        [criterionId]: 0,
      }),
      {},
    );
  }

  return getCriteriaCategories().reduce(
    (criteriaValues, categoryId) => ({
      ...criteriaValues,
      [categoryId]: getWeightsForCategory(categoryId),
    }),
    {} as CriteriaData<number>,
  );
}

export function getFrameworkData(): {
  [k: string]: Frameworks;
} {
  return getFrameworkIds().reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: require(`../data/${frameworkId}.json`),
    }),
    {},
  );
}
