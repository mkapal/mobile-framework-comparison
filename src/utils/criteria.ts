import schema from '../schemas/frameworks.json';
import {
  CriteriaCategories,
  CriteriaData,
  CriterionCategoryId,
  CriterionId,
  FrameworkCriteriaData,
  FrameworkData,
  Weights,
} from '../types';

import { getFrameworkIds } from './index';

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

export function getRatedCriteriaForCategory(
  categoryId: CriterionCategoryId,
): string[] {
  const keys = Object.keys(getCriteriaSchema()[categoryId].properties);

  return keys.filter(
    (criteriaId) =>
      // @ts-ignore
      getCriteriaSchema()[categoryId].properties[criteriaId].readOnly,
  );
}

export function getRatedCriteria(): string[] {
  return getCriteriaCategories().reduce(
    (acc, category) => [...acc, ...getRatedCriteriaForCategory(category)],
    [] as string[],
  );
}

export function getRatedCriteriaInitialValues(): CriteriaData<number> {
  function getInitialValuesForCategory(
    categoryId: CriterionCategoryId,
  ): {
    [a in keyof CriteriaCategories[typeof categoryId]]: number;
  } {
    return getRatedCriteriaForCategory(categoryId).reduce(
      (acc, criterionId) => ({
        ...acc,
        [(criterionId as unknown) as string]: 0,
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
