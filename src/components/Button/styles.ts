import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  enabled?: boolean;
}

export const Container = styled.button<ContainerProps>`
  background: #fb7c1f;
  border-radius: 6px;
  height: 56px;
  border: 0;
  padding: 0 16px;
  width: 100%;

  color: #fff;
  font-weight: 500;

  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.4, '#FB7C1F')};
    cursor: pointer;
  }

  ${(props) =>
    props.enabled === false &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}
`;
