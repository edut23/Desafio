import { keyframes } from 'styled-components';

export const loadFromDownAndTransparent = keyframes`
  from{
    opacity: 0;
    transform: translateY(150px);
  }
  to{
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const loadFromTransparent = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;
