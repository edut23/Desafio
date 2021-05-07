import styled from 'styled-components';
import { shade } from 'polished';

import Vimeo from '@u-wave/react-vimeo';

interface ImageContainerProps {
  imageUrl?: string;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 12px;

  width: 100%;
  height: 100%;

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    text-decoration: none;
    color: #13b5bf;

    transition: color 0.4s;

    svg {
      margin-right: 8px;
    }

    &:hover {
      cursor: pointer;
      color: ${shade(0.4, '#13b5bf')} !important;
    }
  }
`;

export const StyledVimeo = styled(Vimeo)``;

export const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  width: 80%;
  height: 80%;

  border-radius: 12px;

  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  transition: transform 0.8s;

  &:hover {
    cursor: pointer;
    transform: scaleY(1.04) scaleX(1.04);
  }
`;

export const StyledImage = styled.img`
  width: 300px;
  height: 300px;
`;
