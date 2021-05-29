import styled, { css } from 'styled-components';
import { shade } from 'polished';

import CountDown from '../PageCountdown';

interface HeaderProps {
  tab?: string;
}

interface UserContainerProps {
  bg: string;
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
  height: 80px;

  opacity: 1;
`;

export const UserContainer = styled.div`
  margin-left: 1.2%;
  width: 350px;
  height: 64px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .user-data-container {
    color: #e9eaed;
    height: 90%;
    width: 80%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h3 {
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      font-size: 14px;
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;

  flex-shrink: 0;
  margin-right: 10px;

  .main-profile-img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    transition: 0.4s;
    border: solid 2px #dbdbdb;

    &:hover {
      transform: scale(1.09);
      cursor: pointer;
    }
  }

  .child-profile-img {
    position: absolute;
    width: 28px;
    height: 28px;
    background: #000;
    border-radius: 50%;

    bottom: -8px;
    right: -6px;
    transition: 0.4s;

    &:hover {
      transform: scale(1.09);
      cursor: pointer;
    }
  }
`;
