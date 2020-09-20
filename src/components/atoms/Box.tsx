import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import {
  flexbox,
  FlexboxProps,
  space,
  SpaceProps,
  display,
  DisplayProps,
} from 'styled-system';

type Props = FlexboxProps & SpaceProps & DisplayProps;

export const Box = styled('div', {
  label: 'Box',
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'display',
})<Props>`
  ${space}
  ${flexbox}
  ${display}
`;
