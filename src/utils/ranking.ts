import {
  CriteriaCategories,
  CriterionCategoryId,
  FrameworkSimilarity,
  Weights,
} from '../types';

import { getFrameworkData } from './criteria';

import { criteriaSimilarityFunctions, getFrameworkIds } from './index';

export function getFrameworkRankings(
  formData: CriteriaCategories,
  criteriaWeights: Weights,
): FrameworkSimilarity[] {
  const frameworkRankings: FrameworkSimilarity[] = [];

  getFrameworkIds().forEach((framework) => {
    const criteriaCategories = Object.keys(
      formData,
    ) as (keyof CriteriaCategories)[];

    const frameworkSimilarity = criteriaCategories.reduce((acc, category) => {
      const criteriaIds: (keyof CriteriaCategories[CriterionCategoryId])[] = Object.keys(
        formData[category],
      ) as (keyof CriteriaCategories[typeof category])[];

      const categorySimilarity = criteriaIds.reduce(
        (criteriaSimilarities, criterionId) => {
          const similarityFunction =
            criteriaSimilarityFunctions[category][criterionId];
          const criteriaWeight = criteriaWeights[category]?.[criterionId] ?? 0;

          const frameworkData = getFrameworkData();

          const criterionSimilarity =
            // @ts-ignore
            similarityFunction(
              formData[category][criterionId] as never,
              frameworkData[framework].criteria[category][criterionId] as never,
            ) * criteriaWeight;

          return {
            ...criteriaSimilarities,
            [criterionId]: criterionSimilarity,
          };
        },
        {},
      );

      return {
        framework,
        criteria: {
          ...acc.criteria,
          [category]: categorySimilarity,
        },
        totalSimilarity:
          (acc.totalSimilarity ?? 0) +
          Object.values<number>(categorySimilarity).reduce(
            (acc, value) => acc + value,
            0,
          ),
      };
    }, {} as FrameworkSimilarity);

    frameworkRankings.push(frameworkSimilarity);
  });

  const totalWeights = Object.values(criteriaWeights).reduce(
    (acc, categoryWeights) =>
      // @ts-ignore
      acc + Object.values(categoryWeights).reduce((acc2, w) => acc2 + w),
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
