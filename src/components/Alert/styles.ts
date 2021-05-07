import styled, { keyframes, css } from 'styled-components';
import { shade } from 'polished';

import Button from '../Button';

interface AlertProps {
  show?: boolean;
}

const loadFromOpacity = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const hideFromOpacity = keyframes`
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
`;

export const Container = styled.div<AlertProps>`
  position: absolute;

  width: 100vw;
  height: 100vh;

  ${(props) =>
    props.show
      ? css`
          animation: ${loadFromOpacity} 0.6s;
        `
      : css`
          animation: ${hideFromOpacity} 0.6s;
        `}

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: 10000;
  background: rgba(0, 0, 0, 0.7);

  font-family: 'Poppins';
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;
`;

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 600px;
  height: 400px;

  padding: 32px;

  border-radius: 6px;
  background: rgba(255, 255, 255, 0.9);
  z-index: 100000;

  box-shadow: inset 0 0 10px #000;
`;

export const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin-bottom: auto;
`;

export const Title = styled.h1`
  font-size: 36px;
  color: #c53030;

  margin-left: 28%;
`;

export const Description = styled.div`
  margin-top: auto;
`;

export const StyledButton = styled(Button)`
  background: #c53030;

  &:hover {
    background: ${shade('0.4', '#c53030')};
  }
`;

export const CloseButton = styled.div`
  margin-left: auto;

  svg {
    color: #c53030;
    transition: color 0.4s;
  }

  &:hover {
    cursor: pointer;
    svg {
      color: ${shade('0.4', '#c53030')};
    }
  }
`;

export const SendingContainer = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`;
