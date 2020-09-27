import schema from '../schemas/frameworks.json';
import { CriteriaFormData } from '../types';
import { Weights } from '../types/criteria';

type FrameworkSimilarity = {
  frameworkId: string;
  criteria: {
    [k in keyof CriteriaFormData]: number;
  };
  totalSimilarity: number;
};

const criteriaSimilarity: {
  [k in keyof CriteriaFormData]: (
    criterionValue: CriteriaFormData[k],
    frameworkValue: CriteriaFormData[k],
  ) => number;
} = {
  distribution: jaccardSimilarity,
  test: jaccardSimilarity,
  performance: (_, frameworkValue) =>
    normalizeRatedCriterion(frameworkValue, 3),
  platforms: jaccardSimilarity,
};

function normalizeRatedCriterion(value: number, max: number): number {
  return value / max;
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

export function getFrameworkIds(): string[] {
  return ['react-native', 'cordova', 'pwa'];
}

export function getFrameworkRankings(
  formData: CriteriaFormData,
  criteriaWeights: Weights,
): FrameworkSimilarity[] {
  const frameworkRankings: FrameworkSimilarity[] = [];
  const criteriaCategories = Object.keys(schema.properties.criteria.properties);

  getFrameworkIds().forEach((framework) => {
    const frameworkDataRaw = require(`../data/${framework}.json`);

    const frameworkData: CriteriaFormData = {
      ...criteriaCategories.reduce(
        (acc, stepId) => ({
          ...acc,
          ...frameworkDataRaw.criteria[stepId],
        }),
        {} as CriteriaFormData,
      ),
    };

    const formCriteriaIds = Object.keys(formData) as (keyof CriteriaFormData)[];

    const frameworkSimilarity = formCriteriaIds.reduce((acc, criterionId) => {
      const similarityFunction = criteriaSimilarity[criterionId];
      const criteriaWeight = criteriaWeights[criterionId] ?? 0;

      const criterionSimilarity =
        similarityFunction(
          // @ts-ignore
          formData[criterionId],
          frameworkData[criterionId],
        ) * criteriaWeight;

      return {
        frameworkId: framework,
        criteria: {
          ...acc.criteria,
          [criterionId]: criterionSimilarity,
        },
        totalSimilarity: (acc.totalSimilarity ?? 0) + criterionSimilarity,
      };
    }, {} as FrameworkSimilarity);

    frameworkRankings.push(frameworkSimilarity);
  });

  const sortedRankings = frameworkRankings.sort(
    (frameworkA, frameworkB) =>
      frameworkB.totalSimilarity - frameworkA.totalSimilarity,
  );

  return sortedRankings;
}
