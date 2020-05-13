import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';

export function Home() {
  return (
    <Grid container justify="center">
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/questions"
      >
        Go to questions
      </Button>
    </Grid>
  );
}
