import styled, { css } from 'styled-components';
import { shade } from 'polished';

import CountDown from '../PageCountdown';

interface HeaderProps {
  tab?: string;
}

export const Container = styled.header`
  background: rgba(0, 0, 0, 0.4);

  width: 100%;

  border-radius: 0 0 10px 10px;
  box-sizing: border-box;

  padding: 0 128px;

  display: flex;
`;

export const StyledCountDown = styled(CountDown)``;

export const LogoContent = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoOptions = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: auto;

  a {
    text-decoration: none;
  }

  p {
    margin-right: 48px;
    color: #fff;

    transition: color 0.4s;

    font-family: 'Poppins';
    font-size: 18px;

    &:hover {
      cursor: pointer;
      color: ${shade(0.4, '#bdbdbd')};
    }
  }
`;

export const HomeOption = styled.p<HeaderProps>`
  ${(props) =>
    props.tab === 'home' &&
    css`
      border-bottom: 1px solid #fff;
    `}
`;

export const RegulationOption = styled.p<HeaderProps>`
  ${(props) =>
    props.tab === 'regulamento' &&
    css`
      border-bottom: 1px solid #fff;
    `}
`;

export const Logo = styled.img`
  height: 40px;

  opacity: 1;
`;
