import { css } from '@emotion/core';
import { darken } from 'polished';

import { styled, Variant } from '../../styles';

type Props = {
  variant?: Variant;
};

export const Button = styled('button')<Props>(
  ({ theme: { color }, variant = 'primary' }) => css`
    margin: 0;
    padding: 10px;
    color: ${color.variant[variant].contrastColor};
    font-size: 0.875rem;
    font-family: inherit;
    line-height: 1.15;
    background: ${color.variant[variant].main};
    border: 0;
    cursor: pointer;
    -webkit-appearance: button;

    :hover {
      background: ${darken(0.1, color.variant[variant].main)};
    }
    :active {
      background: ${darken(0.2, color.variant[variant].main)};
    }
  `,
);
