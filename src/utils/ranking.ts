import { CriteriaFormData, FrameworkSimilarity, Weights } from '../types';

import { criteriaSimilarityFunctions, getFrameworkData } from './criteria';

import { getFrameworkIds } from './index';

export function getFrameworkRankings(
  formData: CriteriaFormData,
  criteriaWeights: Weights,
): FrameworkSimilarity[] {
  const frameworkRankings: FrameworkSimilarity[] = [];
  console.log('formData', formData);

  getFrameworkIds().forEach((framework) => {
    const criteriaCategories = Object.keys(
      formData,
    ) as (keyof CriteriaFormData)[];

    const frameworkSimilarity = criteriaCategories.reduce(
      (acc, criterionCategory) => {
        const criteriaIds = Object.keys(
          formData[criterionCategory],
        ) as (keyof CriteriaFormData[typeof criterionCategory])[];

        const categorySimilarity = criteriaIds.reduce((acc2, criterionId) => {
          const similarityFunction =
            criteriaSimilarityFunctions[criterionCategory][criterionId];
          // const criteriaWeight = criteriaWeights[criterionCategory] ?? 0;

          const frameworkData = getFrameworkData();
          const criterionSimilarity =
            // @ts-ignore
            similarityFunction(
              formData[criterionCategory][criterionId] as never,
              // @ts-ignore
              frameworkData[framework].criteria[criterionCategory][
                criterionId
              ] as never,
            ) * 1;

          return {
            ...acc2,
            [criterionId]: criterionSimilarity,
          };
        }, {});

        return {
          framework,
          criteria: {
            ...acc.criteria,
            [criterionCategory]: categorySimilarity,
          },
          totalSimilarity: (acc.totalSimilarity ?? 0) + 1,
        };
      },
      {} as FrameworkSimilarity,
    );

    frameworkRankings.push(frameworkSimilarity);
  });

  // const totalWeights = Object.values(criteriaWeights).reduce(
  //   (acc, weight) => acc + weight,
  //   0,
  // );

  const rankingsWithPercentageWeights = frameworkRankings.map((ranking) => ({
    ...ranking,
    totalSimilarity: ranking.totalSimilarity / 1,
  }));

  const sortedRankings = rankingsWithPercentageWeights.sort(
    (frameworkA, frameworkB) =>
      frameworkB.totalSimilarity - frameworkA.totalSimilarity,
  );

  return sortedRankings;
}
