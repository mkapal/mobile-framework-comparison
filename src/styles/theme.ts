import * as CSS from 'csstype';
import { darken, lighten } from 'polished';

export type Theme = {
  shared: {
    focus: {
      position: CSS.Property.Position;
      outline: CSS.Property.Outline;
      boxShadow: CSS.Property.BoxShadow;
      zIndex: CSS.Property.ZIndex;
    };
  };
  color: {
    text: {
      primary: string;
      secondary: string;
    };
    background: {
      primary: string;
      secondary: string;
    };
    variant: {
      [key in Variant]: {
        light: string;
        main: string;
        dark: string;
        contrastColor: string;
      };
    };
  };
};

export type Variant = 'primary' | 'secondary' | 'success' | 'danger';

const TONAL_OFFSET = 0.1;

export const defaultTheme: Theme = {
  shared: {
    focus: {
      position: 'relative',
      outline: 0,
      boxShadow: '0 0 0 3px rgba(21, 156, 228, 0.4)',
      zIndex: 1,
    },
  },
  color: {
    text: {
      primary: '#111',
      secondary: '#3b3b3b',
    },
    background: {
      primary: '#fafafa',
      secondary: '#fff',
    },
    variant: {
      primary: {
        light: lighten(TONAL_OFFSET, '#3276b1'),
        main: '#3276b1',
        dark: darken(TONAL_OFFSET, '#3276b1'),
        contrastColor: '#fff',
      },
      secondary: {
        light: lighten(TONAL_OFFSET, '#b8b8b8'),
        main: '#b8b8b8',
        dark: darken(TONAL_OFFSET, '#b8b8b8'),
        contrastColor: '#000',
      },
      success: {
        light: lighten(TONAL_OFFSET, '#598059'),
        main: '#598059',
        dark: darken(TONAL_OFFSET, '#598059'),
        contrastColor: '#fff',
      },
      danger: {
        light: lighten(TONAL_OFFSET, '#be3c3c'),
        main: '#be3c3c',
        dark: darken(TONAL_OFFSET, '#be3c3c'),
        contrastColor: '#fff',
      },
    },
  },
};
