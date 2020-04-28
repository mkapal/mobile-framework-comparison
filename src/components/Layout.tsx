import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Box, Container, CssBaseline, Typography } from '@material-ui/core';

import { Home, Questions } from '../pages';

export function Layout() {
  return (
    <Box pt={5}>
      <Container maxWidth="md">
        <CssBaseline />
        <Typography variant="h3" align="center" gutterBottom>
          Mobile Framework Comparison
        </Typography>
        <Typography align="center">Hello there</Typography>
        <Box mt={5}>
          <Switch>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Box>
  );
}
