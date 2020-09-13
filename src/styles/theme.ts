export type Theme = {
  color: {
    text: {
      primary: string;
      secondary: string;
    };
    background: {
      primary: string;
      secondary: string;
    };
    primary: {
      light: string;
      main: string;
      dark: string;
      contrastColor: string;
    };
    secondary: {
      light: string;
      main: string;
      dark: string;
      contrastColor: string;
    };
    success: {
      light: string;
      main: string;
      dark: string;
      contrastColor: string;
    };
    danger: {
      light: string;
      main: string;
      dark: string;
      contrastColor: string;
    };
  };
};

export const defaultTheme: Theme = {
  color: {
    text: {
      primary: '#111',
      secondary: '#3b3b3b',
    },
    background: {
      primary: '#fafafa',
      secondary: '#fff',
    },
    primary: {
      light: '#4c91cb',
      main: '#3276b1',
      dark: '#2e5d85',
      contrastColor: '#fff',
    },
    secondary: {
      light: '#cacaca',
      main: '#b8b8b8',
      dark: '#a4a4a4',
      contrastColor: '#000',
    },
    success: {
      light: '#759675',
      main: '#598059',
      dark: '#3d5d3d',
      contrastColor: '#fff',
    },
    danger: {
      light: '#d05555',
      main: '#be3c3c',
      dark: '#9d3030',
      contrastColor: '#fff',
    },
  },
};
