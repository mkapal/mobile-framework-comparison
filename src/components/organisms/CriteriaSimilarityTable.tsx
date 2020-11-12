import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
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
    <TableContainer component={Paper}>
      <Table style={{ width: '100%' }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Criterion</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Submitted value</TableCell>
            {rankings.map(({ framework }) => (
              <TableCell key={framework}>{displayStrings[framework]}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(formData).map((category) => {
            const criteria = Object.keys(formData[category]);

            return (
              <React.Fragment key={category}>
                <TableRow>
                  <TableCell colSpan={5}>
                    <strong>{displayStrings[category]}</strong>
                  </TableCell>
                </TableRow>
                {criteria.map((criterion) => {
                  const value = formData[category][criterion];
                  const weight = weights[category][criterion] ?? 0;

                  return (
                    <TableRow key={criterion}>
                      <TableCell>{displayStrings[criterion]}</TableCell>
                      <TableCell>{weight}</TableCell>
                      <TableCell>
                        {isArray(value)
                          ? value.join(', ')
                          : (value as string).toString()}
                      </TableCell>
                      {frameworks.map((framework) => {
                        const frameworkValue =
                          frameworkData[framework].criteria[category][
                            criterion
                          ];

                        const criterionScore =
                          rankings.find(
                            (ranking) => ranking.framework === framework,
                          )?.criteria[category][criterion] ?? 0;

                        return (
                          <TableCell key={framework}>
                            ({criterionScore.toFixed(2)}){' '}
                            {isArray(frameworkValue)
                              ? frameworkValue.join(', ')
                              : frameworkValue}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </React.Fragment>
            );
          })}
          <TableRow>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            {rankings.map(({ framework, totalSimilarity }) => (
              <TableCell key={framework}>
                {totalSimilarity.toFixed(2)}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
