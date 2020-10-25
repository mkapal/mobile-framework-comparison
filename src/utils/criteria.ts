import {
  ArraySchemaField,
  BooleanField,
} from '../components/criteriaForm/fields';
import schema from '../schemas/frameworks.json';
import { CriteriaCategory, CriterionId, Frameworks } from '../types';

import { getFrameworkIds } from './index';

export const DEFAULT_MAX_RATING = 5;

const criteriaProperties = schema.properties.criteria.properties;

export const formFieldMap = {
  array: ArraySchemaField,
  boolean: BooleanField,
};

export function getCriteriaCategories(): CriterionId[] {
  return Object.keys(criteriaProperties) as CriterionId[];
}

export function getRatedCriteria(
  categoryId: keyof typeof schema.properties.criteria.properties,
): string[] {
  const keys = Object.keys(
    schema.properties.criteria.properties[categoryId].properties,
  );

  return keys.filter(
    (criteriaId) =>
      // @ts-ignore
      schema.properties.criteria.properties[categoryId].properties[criteriaId]
        .readOnly,
  );
}

// export const criteriaSimilarityFunctions: {
//   [k in CriterionId]: {
//     [a in keyof CriteriaCategory[k]]: (
//       criterionValue: CriteriaCategory[k][a],
//       frameworkValue: CriteriaCategory[k][a],
//     ) => number;
//   };
// } = {
//   infrastructure: {
//     distribution: jaccardSimilarity,
//     platforms: jaccardSimilarity,
//     freeLicense: (criterionValue: boolean, frameworkValue: boolean): number =>
//       Math.abs(1 - Number(criterionValue) - Number(frameworkValue)),
//   },
//   development: {
//     performance: normalizedRating,
//   },
// };

export function normalizedRating(
  criterionValue: number,
  frameworkValue: number,
): number {
  return frameworkValue / DEFAULT_MAX_RATING;
}

export function jaccardSimilarity(a: unknown[], b: unknown[]): number {
  if (a.length === 0 && b.length === 0) {
    return 1;
  }

  const intersection = a.filter((item) => b.includes(item));
  const bNotInA = b.filter((item) => !a.includes(item));

  const symmetricDifference = intersection.length + bNotInA.length;

  if (symmetricDifference === 0) {
    return 0;
  }

  return intersection.length / symmetricDifference;
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

export function getFrameworkCriteriaData(): {
  [k: string]: CriteriaCategory;
} {
  return getFrameworkIds().reduce(
    (acc, frameworkId) => ({
      ...acc,
      [frameworkId]: getCriteriaCategories().reduce(
        (acc, criterionId) => ({
          ...acc,
          ...getFrameworkData()[frameworkId].criteria[criterionId],
        }),
        {} as CriteriaCategory,
      ),
    }),
    {},
  );
}
