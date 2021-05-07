import styled, { css } from 'styled-components';
import Particles from './particles';

interface CertificateProps {
  print?: boolean;
}

export const Container = styled.div`
  font-family: 'Pricedown';

  margin: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    font-size: 100px;
    color: #fff;

    strong {
      color: rgb(251, 124, 31);
    }
  }

  svg {
    position: absolute;
    right: 18%;
    top: 18%;
    transition: transform 0.4s;

    &:hover {
      transform: scaleY(1.1) scaleX(1.1);
      cursor: pointer;
    }
  }

  @media (max-width: 1100px) {
    h1 {
      font-size: 64px;
    }
  }
`;

export const EndGameMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgb(251, 124, 31);

  border-radius: 6px;

  width: 70%;
  height: 70%;
  padding: 16px;

  margin-top: 2%;

  p {
    strong {
      color: rgb(251, 124, 31);
      font-weight: bold;
    }
  }

  h2 {
    font-size: 64px;
    color: #666666;
    strong {
      color: #0055ff;
    }
    margin-bottom: 4%;
  }

  span {
    display: flex;
    flex-direction: column;

    align-items: center;

    width: 70%;
    height: 50%;

    text-align: center;
    letter-spacing: 2px;

    margin-top: 1%;
    margin-bottom: 4%;

    p {
      font-size: 42px;
      color: #666666;

      strong {
        color: #0055ff;
      }
    }
  }

  @media (max-width: 1100px) {
    h2 {
      font-size: 48px;
    }
  }

  @media (max-width: 1200px) {
    height: 80%;
  }
`;

export const OrangeContainer = styled.div<CertificateProps>`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 1);
  border-radius: 6px;

  h2 {
    text-align: center;
  }

  img {
    width: 30%;
    margin-top: 4%;
    margin-bottom: 2%;
  }
  @media (max-width: 1500px) {
    span {
      p {
        font-size: 32px;
      }
    }
  }

  @media (max-height: 900px) {
    span {
      p {
        font-size: 36px;
      }
    }
    img {
      width: 24%;
      margin-top: 8%;
    }
  }

  @media (max-width: 1030px) {
    img {
      ${(props) =>
    props.print
      ? css`
              margin-top: -16%;
              width: 60%;
            `
      : css`
              margin-top: 2%;
              width: 24%;
            `}
    }
  }
`;

export const StyledParticles = styled(Particles)`
  height: 100%;
  width: 100%;
`;
