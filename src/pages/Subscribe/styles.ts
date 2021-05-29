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
  width: 90vw;
  height: 67.9vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 2px;

  animation: ${loadFromTransparent} 1.4s;
`;

export const PageWrapper = styled.div`
  display: flex;
`;

export const CircleContent = styled(Card)<Test>`
  width: 280px;
  height: 300px;

  display: flex;
  justify-content: center;
  position: relative;

  margin-left: 21em;

  ${(props) =>
    props.load
      ? css`
          animation: ${bringFromLeft} 1s;
        `
      : css`
          animation: ${bringFromLeft} 1s;
        `}
`;

export const CircleContent1 = styled(Card)<Test>`
  width: 300px;
  height: 340px;

  display: flex;
  justify-content: center;
  position: absolute;

  margin-left: 0em;

  ${(props) =>
    props.load
      ? css`
          animation: ${bringFromLeft} 1s;
        `
      : css`
          animation: ${bringFromLeft} 1s;
        `}
`;

export const CircleConten2 = styled(Card)<Test>`
  width: 300px;
  height: 340px;

  display: flex;
  justify-content: center;
  position: relative;

  margin-left: 0em;

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
  background: rgba(255, 255, 255, 0.7);
  border:solid 1px;
  border-radius:20px;

  width: 40%;
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
  position: absolute;

  opacity: 1;
`;

export const LogoContent = styled.div`
  width: 10%;
  height: 370px;


  align-items: left;
  justify-content: left;
  position: relative;
`;

export const LogoOptions = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: auto;
`;

export const NewContainer = styled.div`
  width: 100vw;
  height: 87.9vh;
  

  display: flex;
  flex-direction: row;
  justify-content: center;

  padding: 18px;

  animation: ${loadFromTransparent} 1.4s;
`;

export const LContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  align-itens: center;
  align: center;
  justify-content: left;

  margin-left: 22em;
  margin-top: 2em;
`;
