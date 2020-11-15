import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { utils } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';
import React from 'react';

import { DEFAULT_MAX_WEIGHT } from '../../config';
import {
  DisplayStringMap,
  FrameworkData,
  FrameworkSimilarity,
} from '../../types';
import { getCriteriaSchema } from '../../utils';
import { FormattedCriterionValue, RatingIndicator } from '../atoms';

import { CriteriaSimilarityTableCell } from './CriteriaSimilarityTableCell';

const schema = getCriteriaSchema();

type Props = {
  category: string;
  criterion: string;
  displayStrings: DisplayStringMap;
  frameworkData: FrameworkData;
  rankings: FrameworkSimilarity[];
  showValues: boolean;
  value: unknown;
  weight: number;
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

export function CriteriaSimilarityTableRow({
  category,
  criterion,
  displayStrings,
  frameworkData,
  rankings,
  showValues,
  value,
  weight,
}: Props) {
  const classes = useStyles();

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
          maxRating={DEFAULT_MAX_WEIGHT}
          label={`Weight: ${weight}`}
        />
      </TableCell>
      {showValues && (
        <TableCell
          align="center"
          style={schemaType === 'array' ? { verticalAlign: 'top' } : {}}
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
          frameworkData[framework].criteria[category][criterion];
        const criterionScore = criteria[category][criterion] ?? 0;
        const normalizedScore = weight === 0 ? 0 : criterionScore / weight;

        return (
          <CriteriaSimilarityTableCell
            key={framework}
            category={category}
            criterion={criterion}
            frameworkValue={frameworkValue}
            normalizedScore={normalizedScore}
            schemaType={schemaType}
            showValues={showValues}
          />
        );
      })}
    </TableRow>
  );
}
