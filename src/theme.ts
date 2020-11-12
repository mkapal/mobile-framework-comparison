import { createMuiTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 32,
    },
    h1: {
      fontSize: 40,
    },
    h2: {
      fontSize: 32,
    },
  },
  palette: {
    primary: {
      main: blue['800'],
    },
    secondary: {
      main: blue['600'],
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        subtitle1: 'h1',
      },
    },
  },
  overrides: {
    MuiStepper: {
      root: {
        background: 'none',
        border: 'none',
      },
    },
  },
});
