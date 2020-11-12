import { Box, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import range from 'lodash/range';
import React from 'react';

import { DEFAULT_MAX_RATING } from '../../config';

import { Tooltip } from './Tooltip';

type Props = {
  rating: number;
  label: string;
};

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.grey['700'],
  },
  iconEmpty: {
    color: theme.palette.grey['300'],
  },
}));
export function RatingIndicator({ label, rating }: Props) {
  const classes = useStyles();

  return (
    <Tooltip title={label} aria-label={label}>
      <Box display="flex" justifyContent="center">
        {range(DEFAULT_MAX_RATING).map((number) => (
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
