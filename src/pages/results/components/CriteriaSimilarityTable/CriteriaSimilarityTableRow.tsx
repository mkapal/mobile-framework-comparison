import { TableCell, TableRow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { utils } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';
import React from 'react';

import { DEFAULT_MAX_WEIGHT } from '../../../../config';
import {
  DisplayStringMap,
  FrameworkData,
  FrameworkSimilarity,
} from '../../../../types';
import { getCriteriaSchema } from '../../../../utils';

import { CriteriaSimilarityTableCell } from './CriteriaSimilarityTableCell';
import { FormattedCriterionValue } from './FormattedCriterionValue';
import { Rating } from './Rating';

const schema = getCriteriaSchema();

type Props = {
  category: string;
  criterion: string;
  displayStrings: DisplayStringMap;
  frameworkData: FrameworkData;
  rankings: FrameworkSimilarity[];
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
  value,
  weight,
}: Props) {
  const classes = useStyles();

  const schemaProperties = schema[category].properties![
    criterion
  ] as JSONSchema7;
  const schemaType = utils.getSchemaType(schemaProperties);

  return (
    <TableRow className={classes.row} key={criterion} hover>
      <TableCell className={classes.criterionCell}>
        {displayStrings[criterion]}
      </TableCell>
      <TableCell align="center">
        <Rating
          rating={weight}
          maxRating={DEFAULT_MAX_WEIGHT}
          label={`Weight: ${weight}`}
        />
      </TableCell>
      <TableCell
        align="center"
        style={schemaType === 'array' ? { verticalAlign: 'top' } : {}}
      >
        {!schemaProperties.readOnly && (
          <FormattedCriterionValue
            category={category}
            criterion={criterion}
            value={value}
          />
        )}
      </TableCell>
      {rankings.map(({ framework }) => {
        const frameworkValue =
          frameworkData[framework].criteria[category][criterion];

        return (
          <CriteriaSimilarityTableCell
            key={framework}
            category={category}
            criterion={criterion}
            frameworkValue={frameworkValue}
            schemaType={schemaType}
          />
        );
      })}
    </TableRow>
  );
}
