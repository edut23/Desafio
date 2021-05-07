import React from 'react';

import { Container } from './styles';

interface TooltipProps {
  title?: string;
  className?: string;
  customStyle?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  className = '',
  title,
  ...rest
}) => {
  return (
    <Container className={className}>
      {children}
      <span {...rest}>{title}</span>
    </Container>
  );
};

export default Tooltip;
