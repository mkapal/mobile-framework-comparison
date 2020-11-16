import { Box, Typography } from '@material-ui/core';
import { green, orange, red, yellow } from '@material-ui/core/colors';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Styles } from '@material-ui/core/styles/withStyles';
import React from 'react';

import { formatFrameworkScore } from '../../../../utils';

interface FrameworkScoreIndicatorProps {
  similarity: number;
}

const getScoreColor = (score: number): string => {
  const colors: {
    [a: number]: string;
  } = {
    0: red['400'],
    25: orange['400'],
    50: yellow['600'],
    75: green['400'],
  };

  return Object.keys(colors).reduce((acc, percentage) => {
    const num = Number(percentage);

    if (score >= num / 100) {
      return colors[num];
    }

    return acc;
  }, red['400']);
};

const styles: Styles<Theme, FrameworkScoreIndicatorProps> = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
    },
    progressBar: {
      height: 8,
      borderRadius: 5,
      flex: (props: FrameworkScoreIndicatorProps) => props.similarity,
      backgroundColor: (props: FrameworkScoreIndicatorProps) =>
        getScoreColor(props.similarity),
    },
    scoreValue: {
      marginLeft: theme.spacing(2),
    },
  });

function FrameworkScoreIndicatorRaw(
  props: WithStyles<typeof styles> & FrameworkScoreIndicatorProps,
) {
  const { classes, similarity } = props;

  return (
    <Box display="flex" flex={1} alignItems="center">
      <div className={classes.progressBar} />
      <Typography variant="body1" className={classes.scoreValue}>
        {formatFrameworkScore(similarity)}
      </Typography>
    </Box>
  );
}

export const FrameworkScoreBar = withStyles(styles)(FrameworkScoreIndicatorRaw);
