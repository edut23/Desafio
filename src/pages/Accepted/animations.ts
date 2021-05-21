import { keyframes } from 'styled-components';

export const loadFromTransparent = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to{
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const bringFromLeft = keyframes`
  from{
    transform: translateX(-150px);
  }
  to{
    transform: translateX(0px);
  }
`;

export const sendToLeft = keyframes`
from{
    transform: translateX(150px);
  }
  to{
    transform: translateX(0);
  }
`;
