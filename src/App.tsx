import React from 'react';
import { Typography, CssBaseline, Container, Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box pt={5}>
        <Container maxWidth="md">
          <CssBaseline />
          <Typography variant="h3" align="center" gutterBottom>
            Mobile Framework Comparison
          </Typography>
          <Typography align="center">Hello there</Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
