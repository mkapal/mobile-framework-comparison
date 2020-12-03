import { TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { FormattedCriterionValue } from './FormattedCriterionValue';

type Props = {
  category: string;
  criterion: string;
  frameworkValue: unknown;
  schemaType: string;
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
  schemaType,
}: Props) {
  const classes = useStyles();

  return (
    <TableCell
      className={classes.frameworkCell}
      align="center"
      style={schemaType === 'array' ? { verticalAlign: 'top' } : {}}
    >
      <FormattedCriterionValue
        category={category}
        criterion={criterion}
        value={frameworkValue}
      />
    </TableCell>
  );
}
