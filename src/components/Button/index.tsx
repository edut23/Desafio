import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  enabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  enabled = true,
  ...rest
}) => {
  return (
    <Container type="button" enabled={enabled} {...rest}>
      {loading ? 'Carregando...' : children}
    </Container>
  );
};

export default Button;
