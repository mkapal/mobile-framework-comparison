import { TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { FormattedCriterionValue, SimilarityIndicator } from '../atoms';

type Props = {
  category: string;
  criterion: string;
  frameworkValue: unknown;
  normalizedScore: number;
  schemaType: string;
  showValues: boolean;
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

export function CriteriaSimilarityTableCell({
  category,
  criterion,
  frameworkValue,
  normalizedScore,
  schemaType,
  showValues,
}: Props) {
  const classes = useStyles();

  return (
    <TableCell
      className={classes.frameworkCell}
      align="center"
      style={
        showValues && schemaType === 'array' ? { verticalAlign: 'top' } : {}
      }
    >
      {showValues ? (
        <FormattedCriterionValue
          category={category}
          criterion={criterion}
          value={frameworkValue}
        />
      ) : (
        <SimilarityIndicator similarity={normalizedScore} />
      )}
    </TableCell>
  );
}
