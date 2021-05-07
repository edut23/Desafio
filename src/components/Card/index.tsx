import React, { HTMLAttributes } from 'react';

import { Container, HeaderContainer } from './styles';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  // logo?: HTMLImageElement;
  logo?: string;
  title?: string;
};

const Card: React.FC<CardProps> = ({
  logo,
  title = 'logo do Projeto',
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <HeaderContainer>
        <img src={logo} alt="" />
        {/* <Title>{title}</Title> */}
      </HeaderContainer>
      {children}
    </Container>
  );
};

export default Card;
