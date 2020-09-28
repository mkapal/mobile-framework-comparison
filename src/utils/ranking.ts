import { CriteriaFormData, FrameworkSimilarity, Weights } from '../types';

import {
  criteriaSimilarityFunctions,
  getFrameworkCriteriaData,
} from './criteria';

import { getFrameworkIds } from './index';

export function getFrameworkRankings(
  formData: CriteriaFormData,
  criteriaWeights: Weights,
): FrameworkSimilarity[] {
  const frameworkRankings: FrameworkSimilarity[] = [];

  getFrameworkIds().forEach((framework) => {
    const formCriteriaIds = Object.keys(formData) as (keyof CriteriaFormData)[];

    const frameworkSimilarity = formCriteriaIds.reduce((acc, criterion) => {
      const similarityFunction = criteriaSimilarityFunctions[criterion];
      const criteriaWeight = criteriaWeights[criterion] ?? 0;

      const criterionSimilarity =
        similarityFunction(
          formData[criterion] as never,
          getFrameworkCriteriaData()[framework][criterion] as never,
        ) * criteriaWeight;

      return {
        framework,
        criteria: {
          ...acc.criteria,
          [criterion]: criterionSimilarity,
        },
        totalSimilarity: (acc.totalSimilarity ?? 0) + criterionSimilarity,
      };
    }, {} as FrameworkSimilarity);

    frameworkRankings.push(frameworkSimilarity);
  });

  const totalWeights = Object.values(criteriaWeights).reduce(
    (acc, weight) => acc + weight,
    0,
  );

  const rankingsWithPercentageWeights = frameworkRankings.map((ranking) => ({
    ...ranking,
    totalSimilarity: ranking.totalSimilarity / totalWeights,
  }));

  const sortedRankings = rankingsWithPercentageWeights.sort(
    (frameworkA, frameworkB) =>
      frameworkB.totalSimilarity - frameworkA.totalSimilarity,
  );

  return sortedRankings;
}
