import styled, { keyframes, css } from 'styled-components';

interface CountDownProps {
  background: boolean;
  from?: boolean;
}

interface ContainerProps {
  expired?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: 'Poppins';

  span {
    color: #fff;
    font-size: 24px;
  }

  ${(props) =>
    props.expired &&
    css`
      display: none;
    `}

  @media (max-width: 700px) {
  }
`;

export const TimerSection = styled.section<CountDownProps>`
  width: 720px;
  height: 180px;

  grid-template-columns: repeat(7, 1fr);
  background: rgba(0, 0, 0, 0.2);

  ${(props) =>
    props.background === false &&
    css`
      background: none;
    `}

  ${(props) =>
    props.from &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;

      height: 80px;
      width: 50%;

      span {
        margin-top: 0px !important;
      }
    `}

  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;

  display: flex;

  span {
    margin-top: 38px;
  }

  @media (max-width: 700px) {
    width: 320px;
    height: 120px;
  }
`;

export const NumberSection = styled.section`
  margin: -10px 12px;

  font-size: 24px;

  border-radius: 8px;
  width: 150px;

  display: grid;
  text-align: center;

  small {
    color: #fff;

    text-shadow: 0 0 10px #fff;
  }

  @media (max-width: 700px) {
    font-size: 14px;
  }
`;

export const Divisor = styled.span``;

export const glow = keyframes`

  from{text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #072C58,
    0 0 40px #1266CB, 0 0 50px #1266CB, 0 0 60px #1266CB, 0 0 70px #072C58;}


  to{
    text-shadow: 0 0 20px #fff, 0 0 30px #072C58, 0 0 40px #072C58,
      0 0 50px #072C58, 0 0 60px #072C58, 0 0 70px #072C58, 0 0 80px #072C58;
  }
`;

export const Number = styled.p`
  font-family: 'Archivo';
  font-size: 38px;

  color: #fff;
  text-align: center;
  -webkit-animation: glow 1s ease-in-out infinite alternate;
  -moz-animation: glow 1s ease-in-out infinite alternate;

  animation: ${glow} 2s infinite alternate;

  transition: text-shadow 0.5s;

  /* border: 1px solid #fff; */
  border-radius: 18px;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
