import { keyframes } from 'styled-components';

export const glow = keyframes`
  from{text-shadow: 0 0 10px rgba(255,255,255,0.8); }
  to{text-shadow: 0 0 20px rgba(76, 114, 161,0.9);}
`;

export const loadFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const loadLogo = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

export const buttonBounce = keyframes`
  from{
    width: 160px;
    height: 20px;
  }
  to{
    width: 240px;
    height: 56px;
  }
`;

export const smallButtonBounce = keyframes`
  from{
    width: 100px;
    height: 20px;
    font-size: 12px;
  }
  to{
    width: 120px;
    height: 56px;
    font-size: 15px;
  }
`;
