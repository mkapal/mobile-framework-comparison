import { Box, Theme, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

type Props = {
  rating: number;
  label: string;
  maxRating: number;
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

export function Rating({ label, maxRating, rating }: Props) {
  const classes = useStyles();

  return (
    <Tooltip title={label} aria-label={label}>
      <Box display="flex" justifyContent="center" className={classes.root}>
        {Array.from(Array(maxRating).keys()).map((number) => (
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
