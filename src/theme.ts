import { createMuiTheme } from '@material-ui/core';
import { blue, grey } from '@material-ui/core/colors';
import shadows from '@material-ui/core/styles/shadows';

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
    // @ts-ignore
    MuiToggleButton: {
      root: {
        color: grey['700'],
        '&$selected': {
          color: 'black',
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: grey.A700,
        color: 'white',
        boxShadow: shadows[1],
        fontSize: 13,
      },
    },
  },
});
