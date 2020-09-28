import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';

type Props = {
  name: string;
  score: number;
};

export function FrameworkRankingCard({ name, score }: Props) {
  return (
    <Paper>
      <Box p={4}>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body1">
          Total score: {(score * 100).toFixed(0)}
        </Typography>
      </Box>
    </Paper>
  );
}
