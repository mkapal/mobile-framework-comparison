import isArray from 'lodash/isArray';
import React from 'react';

import {
  CriteriaCategories,
  DisplayStringMap,
  FrameworkData,
  FrameworkSimilarity,
  Weights,
} from '../../types';

type Props = {
  displayStrings: DisplayStringMap;
  formData: CriteriaCategories;
  frameworkData: FrameworkData;
  rankings: FrameworkSimilarity[];
  weights: Weights;
};

export function CriteriaSimilarityTable({
  displayStrings,
  formData,
  frameworkData,
  rankings,
  weights,
}: Props) {
  const frameworks = Object.keys(frameworkData);

  return (
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <th>Criterion</th>
          <th>Weight</th>
          <th>Submitted value</th>
          {rankings.map(({ framework }) => (
            <th key={framework}>{displayStrings[framework]}</th>
          ))}
        </tr>
        {Object.keys(formData).map((category) => {
          const criteria = Object.keys(formData[category]);

          return (
            <React.Fragment key={category}>
              <tr>
                <td colSpan={5}>
                  <strong>{displayStrings[category]}</strong>
                </td>
              </tr>
              {criteria.map((criterion) => {
                const value = formData[category][criterion];
                const weight = weights[category][criterion] ?? 0;

                return (
                  <tr key={criterion}>
                    <td>{displayStrings[criterion]}</td>
                    <td>{weight}</td>
                    <td>
                      {isArray(value)
                        ? value.join(', ')
                        : (value as string).toString()}
                    </td>
                    {frameworks.map((framework) => {
                      const frameworkValue =
                        frameworkData[framework].criteria[category][criterion];

                      const criterionScore =
                        rankings.find(
                          (ranking) => ranking.framework === framework,
                        )?.criteria[category][criterion] ?? 0;

                      return (
                        <td key={framework}>
                          ({criterionScore.toFixed(2)}){' '}
                          {isArray(frameworkValue)
                            ? frameworkValue.join(', ')
                            : frameworkValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </React.Fragment>
          );
        })}
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          {rankings.map(({ framework, totalSimilarity }) => (
            <td key={framework}>{totalSimilarity.toFixed(2)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}
