import {
  CriteriaCategories,
  CriterionCategoryId,
  FrameworkData,
  FrameworkSimilarity,
  Weights,
} from '../types';

import { getCriteriaIds, getTotalWeights } from './criteria';

import { similarityFunctions, getFrameworkIds } from './index';

export function getFrameworkRankings(
  formData: CriteriaCategories,
  frameworkData: FrameworkData,
  criteriaWeights: Weights,
): FrameworkSimilarity[] {
  const totalWeights = getTotalWeights(criteriaWeights);

  return getFrameworkIds()
    .map((framework) => {
      const criteriaCategories = Object.keys(formData) as CriterionCategoryId[];

      return criteriaCategories.reduce((categorySimilarities, category) => {
        const criteriaIds = getCriteriaIds(formData, category);

        const categorySimilarity = criteriaIds.reduce(
          (criteriaSimilarities, criterion) => {
            const similarityFunction = similarityFunctions[category][criterion];
            const criterionWeight = criteriaWeights[category][criterion] ?? 0;

            const criterionSimilarity =
              // @ts-ignore
              similarityFunction(
                formData[category][criterion],
                frameworkData[framework].criteria[category][criterion],
              ) * criterionWeight;

            return {
              ...criteriaSimilarities,
              [criterion]: criterionSimilarity,
            };
          },
          {},
        );

        return {
          framework,
          criteria: {
            ...categorySimilarities.criteria,
            [category]: categorySimilarity,
          },
          totalSimilarity:
            (categorySimilarities.totalSimilarity ?? 0) +
            Object.values<number>(categorySimilarity).reduce(
              (acc, value) => acc + value,
              0,
            ),
        };
      }, {} as FrameworkSimilarity);
    })
    .map((ranking) => {
      const totalSimilarity =
        totalWeights === 0 ? 0 : ranking.totalSimilarity / totalWeights;

      return {
        ...ranking,
        totalSimilarity,
      };
    })
    .sort(
      (frameworkA, frameworkB) =>
        frameworkB.totalSimilarity - frameworkA.totalSimilarity,
    );
}
