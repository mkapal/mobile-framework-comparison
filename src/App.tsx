import { css, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Layout } from './components';
import { defaultTheme, Theme } from './styles/theme';

import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Global<Theme>
        styles={({ color }) => css`
          body {
            background: ${color.background};
          }
        `}
      />
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
