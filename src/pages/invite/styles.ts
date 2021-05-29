import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { loadFromTransparent, bringFromLeft } from './animations';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';

interface Test {
  load?: boolean;
}

interface StyledButtonProps {
  countdownOver?: boolean;
}

export const PageGame = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const TContainer = styled.div`
  width: 100vw;
  height: 87.9vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 18px;

  animation: ${loadFromTransparent} 1.4s;
`;

export const PageWrapper = styled.div`
  display: flex;
`;

export const CircleContent = styled(Card)<Test>`
  width: 500px;
  height: 500px;

  display: flex;
  justify-content: center;
  position: relative;

  margin-left: 16em;

  ${(props) =>
    props.load
      ? css`
          animation: ${bringFromLeft} 1s;
        `
      : css`
          animation: ${bringFromLeft} 1s;
        `}
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  margin-top: 12%;

  text-align: center;

  a {
    font-family: 'Poppins';
    text-decoration: none;
    color: #fff;

    transition: color 0.3s;

    &:hover {
      color: ${shade(0.4, '#fff')};
    }
  }
`;

export const Content = styled.p`
  width: 440px;

  text-align: center;
  margin-top: 2em;

  font-family: 'Poppins';
  font-size: 18px;

  color: #fff;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  a {
    text-decoration: none;
  }

  @media (max-width: 700px) {
    padding: 0 32px;
  }
`;

export const BackButton = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 4%; */
  width: 7%;

  background: #fb7c1f;
  color: #fff;

  &:hover {
    background: ${shade(0.4, '#fb7c1f')};
  }

  font-family: 'Poppins';
  font-size: 18px;

  

  ${(props) =>
    props.countdownOver &&
    css`
      width: 100%;
    `}
`;

export const StyledButton = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 4%; */
  width: 40%;

  background: #fb7c1f;
  color: #fff;

  font-family: 'Poppins';
  font-size: 24px;

  &:hover {
    background: ${shade(0.4, '#fb7c1f')};
  }

  ${(props) =>
    props.countdownOver &&
    css`
      width: 100%;
    `}
`;

export const StyledInput = styled(Input)`
  /* width: 300px; */
`;

export const Logo = styled.img`
  height: 40px;

  opacity: 1;
`;

export const LogoContent = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: left;
  justify-content: left;
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

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  background: rgba(255, 255, 255, 0.7);
  border:solid 1px;
  border-radius:20px;
  list-style-type: none;
  

  width: 100%;
  margin-top: 12%;
  

  text-align: left;

  a {
    font-family: 'Poppins';
    text-decoration: none;
    color: #fff;

    transition: color 0.3s;

    &:hover {
      color: ${shade(0.4, '#fff')};
    }
  }
`;

export const li = styled.div`
  list-style-type: none;
`;

export const P = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 9em;

  font-size: 24px;
`;

export const A = styled.div`
  margin-left: 5px;

  font-size: 18px;
`;