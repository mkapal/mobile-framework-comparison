import { CriteriaFormData, Weights } from '../types';

import {
  criteriaSimilarityFunctions,
  getFrameworkCriteriaData,
} from './criteria';

type FrameworkSimilarity = {
  framework: string;
  criteria: {
    [k in keyof CriteriaFormData]: number;
  };
  totalSimilarity: number;
};

export function getFrameworkIds(): string[] {
  return ['react-native', 'cordova', 'pwa'];
}

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
          // @ts-ignore
          formData[criterion],
          getFrameworkCriteriaData()[framework][criterion],
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

  const sortedRankings = frameworkRankings.sort(
    (frameworkA, frameworkB) =>
      frameworkB.totalSimilarity - frameworkA.totalSimilarity,
  );

  const totalWeights = Object.values(criteriaWeights).reduce(
    (acc, weight) => acc + weight,
    0,
  );

  const test = sortedRankings.map((ranking) => ({
    ...ranking,
    totalSimilarity: ranking.totalSimilarity / totalWeights,
  }));

  return test;
}
