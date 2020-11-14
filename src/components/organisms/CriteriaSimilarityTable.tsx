import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { utils } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';
import React from 'react';

import {
  CriteriaCategories,
  DisplayStringMap,
  FrameworkData,
  FrameworkSimilarity,
  Weights,
} from '../../types';
import { getCriteriaSchema } from '../../utils';
import {
  FormattedCriterionValue,
  RatingIndicator,
  SimilarityIndicator,
} from '../atoms';

type Props = {
  displayStrings: DisplayStringMap;
  formData: CriteriaCategories;
  frameworkData: FrameworkData;
  rankings: FrameworkSimilarity[];
  weights: Weights;
  showValues?: boolean;
};

const useStyles = makeStyles({
  row: {
    height: 40,
  },
  criterionCell: {
    width: '32%',
  },
  frameworkCell: {
    width: '10%',
    minWidth: 120,
  },
});

const schema = getCriteriaSchema();

export function CriteriaSimilarityTable({
  displayStrings,
  formData,
  frameworkData,
  rankings,
  showValues,
  weights,
}: Props) {
  const classes = useStyles();
  const frameworks = Object.keys(frameworkData);

  return (
    <TableContainer component={Paper}>
      <Table style={{ width: '100%' }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Criterion</TableCell>
            <TableCell align="center">Relevance</TableCell>
            {showValues && <TableCell align="center">Entered value</TableCell>}
            {rankings.map(({ framework }) => (
              <TableCell align="center" key={framework}>
                {displayStrings[framework]}
              </TableCell>
            ))}
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

                  const schemaType = utils.getSchemaType(
                    schema[category].properties![criterion] as JSONSchema7,
                  );

                  return (
                    <TableRow className={classes.row} key={criterion} hover>
                      <TableCell className={classes.criterionCell}>
                        {displayStrings[criterion]}
                      </TableCell>
                      <TableCell align="center">
                        <RatingIndicator
                          rating={weight}
                          label={`Relevance: ${weight}`}
                        />
                      </TableCell>
                      {showValues && (
                        <TableCell
                          align="center"
                          style={
                            schemaType === 'array'
                              ? { verticalAlign: 'top' }
                              : {}
                          }
                        >
                          <FormattedCriterionValue
                            category={category}
                            criterion={criterion}
                            value={value}
                          />
                        </TableCell>
                      )}
                      {rankings.map(({ criteria, framework }) => {
                        const frameworkValue =
                          frameworkData[framework].criteria[category][
                            criterion
                          ];

                        const criterionScore =
                          criteria[category][criterion] ?? 0;

                        const normalizedWeight =
                          weight === 0 ? 0 : criterionScore / weight;

                        return (
                          <TableCell
                            key={framework}
                            className={classes.frameworkCell}
                            align="center"
                            style={
                              showValues && schemaType === 'array'
                                ? { verticalAlign: 'top' }
                                : {}
                            }
                          >
                            {showValues ? (
                              <FormattedCriterionValue
                                category={category}
                                criterion={criterion}
                                value={frameworkValue}
                              />
                            ) : (
                              <SimilarityIndicator weight={normalizedWeight} />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
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
