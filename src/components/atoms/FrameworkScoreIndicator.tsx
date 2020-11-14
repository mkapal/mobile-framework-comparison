import { Box, Typography } from '@material-ui/core';
import { blue, green, orange, red, yellow } from '@material-ui/core/colors';
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Styles } from '@material-ui/core/styles/withStyles';
import React from 'react';

interface FrameworkScoreIndicatorProps {
  score: number;
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

    if (score >= num) {
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
      flex: (props: FrameworkScoreIndicatorProps) => props.score / 100,
      backgroundColor: (props: FrameworkScoreIndicatorProps) =>
        getScoreColor(props.score),
    },
    scoreValue: {
      marginLeft: theme.spacing(2),
    },
  });

function LinearProgressRaw(
  props: WithStyles<typeof styles> & FrameworkScoreIndicatorProps,
) {
  const { classes, score } = props;

  return (
    <Box display="flex" flex={1} alignItems="center">
      <div className={classes.progressBar} />
      <Typography variant="body1" className={classes.scoreValue}>
        {score.toFixed(1)}
      </Typography>
    </Box>
  );
}

export const FrameworkScoreIndicator = withStyles(styles)(LinearProgressRaw);
