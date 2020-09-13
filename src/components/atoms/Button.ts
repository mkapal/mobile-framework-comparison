import { css } from '@emotion/core';

import { styled } from '../../styles/styled';

type Props = {};

export const Button = styled.button<Props>(
  ({ theme: { color } }) => css`
    margin: 0;
    padding: 10px;
    color: ${color.primary.contrastColor};
    font-size: 0.875rem;
    font-family: inherit;
    line-height: 1.15;
    background: ${color.primary.main};
    border: 0;
    -webkit-appearance: button;

    :hover {
      background: ${color.primary.light};
    }
  `,
);
