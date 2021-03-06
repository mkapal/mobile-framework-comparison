import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';

import {
  CriteriaData,
  DisplayStringMap,
  FrameworkData,
  FrameworkSimilarity,
  Weights,
} from '../../../../types';
import { formatFrameworkScore } from '../../../../utils';

import { CriteriaSimilarityTableRow } from './CriteriaSimilarityTableRow';

type Props = {
  displayStrings: DisplayStringMap;
  formData: CriteriaData;
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
            <TableCell align="center">Weight</TableCell>
            <TableCell align="center">Entered value</TableCell>
            {rankings.map(({ framework }) => {
              const similarity = rankings.find(
                (ranking) => ranking.framework === framework,
              )?.totalSimilarity;

              return (
                <TableCell align="center" key={framework}>
                  <strong>{displayStrings[framework]}</strong> <br />
                  {similarity && `(${formatFrameworkScore(similarity)})`}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(formData).map((category) => {
            const criteria = Object.keys(formData[category]);

            return (
              <React.Fragment key={category}>
                <TableRow>
                  <TableCell colSpan={3 + frameworks.length}>
                    <strong>{displayStrings[category]}</strong>
                  </TableCell>
                </TableRow>
                {criteria.map((criterion) => {
                  const weight = weights[category][criterion];
                  const value = formData[category][criterion];

                  return (
                    <CriteriaSimilarityTableRow
                      key={criterion}
                      category={category}
                      criterion={criterion}
                      displayStrings={displayStrings}
                      frameworkData={frameworkData}
                      rankings={rankings}
                      value={value}
                      weight={weight}
                    />
                  );
                })}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
