import React, { useRef, useState, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FiPrinter } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import chicoLogo from '../../assets/img/chicoLogo3.png';

import {
  Container,
  EndGameMessageContainer,
  OrangeContainer,
  StyledParticles,
} from './styles';

const EndGame: React.FC = () => {
  const [print, setPrint] = useState(false);

  const { user } = useAuth();

  const certificateRef = useRef(null);

  const printer = useReactToPrint({
    content: () => certificateRef.current,
  });
  const handlePrint = useCallback(() => {
    setPrint(true);
    printer && printer();
  }, [printer]);

  return (
    <>
      <StyledParticles />
      <Container>
        <h1>
          Certificado de <strong>participação</strong>
        </h1>
        <FiPrinter onClick={handlePrint} size={40} color="#0c0c0c" />
        <EndGameMessageContainer ref={certificateRef}>
          <OrangeContainer print={print}>
            <img src={chicoLogo} alt="" />
            <h2>
              Parabéns <strong>{user.nickname}</strong>
            </h2>
            <span>
              <p style={{ whiteSpace: 'pre-line' }}>
                Agradecemos a todos do time <strong>{user.teamid}</strong> por
                terem participado deste desafio em 2020. Parabéns por todo seu
                esforço, dedicação e superação.{'\n'}
                {'\n'} Colégio Objetivo, Outubro 2020
              </p>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio style={{ opacity: 0 }} controls autoPlay>
                <source
                  type="audio/mpeg"
                  src="https://challengeobjetivo.s3-sa-east-1.amazonaws.com/musica/medio/desafioConcluido.mp3"
                />
              </audio>
            </span>
          </OrangeContainer>
        </EndGameMessageContainer>
      </Container>
    </>
  );
};

export default EndGame;
