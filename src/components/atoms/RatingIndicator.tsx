import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import range from 'lodash/range';
import React from 'react';

import { DEFAULT_MAX_RATING } from '../../config';

import { Tooltip } from './Tooltip';

type Props = {
  rating: number;
  label: string;
  maxRating?: number;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    cursor: 'help',
  },
  icon: {
    color: theme.palette.grey['700'],
  },
  iconEmpty: {
    color: theme.palette.grey['300'],
  },
}));

export function RatingIndicator({
  label,
  rating,
  maxRating = DEFAULT_MAX_RATING,
}: Props) {
  const classes = useStyles();

  return (
    <Tooltip title={label} aria-label={label}>
      <Box display="flex" justifyContent="center" className={classes.root}>
        {range(maxRating).map((number) => (
          <div
            className={classes[number < rating ? 'icon' : 'iconEmpty']}
            key={number}
          >
            ●
          </div>
        ))}
      </Box>
    </Tooltip>
  );
}
