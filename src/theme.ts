import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    subtitle1: {
      fontSize: 32,
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        subtitle1: 'h1',
      },
    },
  },
});
