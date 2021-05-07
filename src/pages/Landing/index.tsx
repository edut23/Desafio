import React, { useState, useEffect, useCallback } from 'react';
import ReactLoading from 'react-loading';
// import { Link } from 'react-router-dom';
import Axios from 'axios';

import { Link } from 'react-router-dom';
import {
  PageLanding,
  HeaderA,
  Container,
  CountDownContainer,
  ButtonsContainer,
  ButtonSubscribe,
  Content,
  ChallengeText,
  CountButton,
  TopText,
} from './styles';

import Countdown from '../../components/PageCountdown';

interface ResponseLoginFake {
  email: string;
  senha: string;
}

const Landing: React.FC = () => {
  const countDownDate = new Date('October 8, 2021').getTime();

  const [tab, setTab] = useState('');
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    setTab('home');

    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleTest = useCallback(async () => {
    setIsLogging(true);
    const response = await Axios.get<ResponseLoginFake>(
      'https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/loginfake',
    );

    window.location.href = `https://suspicious-lichterman-3943dc.netlify.app/fake/${response.data.email}/${response.data.senha}`;
  }, []);

  return (
    <PageLanding>
      <HeaderA selectedTab={tab} setTab={() => setTab} />
      <Container>
        <Content>
          <ChallengeText>
            Challenge do Colégio <strong>Objetivo</strong>
          </ChallengeText>
          <TopText>As inscrições terminam em:</TopText>

          <CountButton>
            <CountDownContainer>
              <Countdown background={false} to={countDownDate} />
            </CountDownContainer>
            <ButtonsContainer>
              <Link to="/subscribe">
                <ButtonSubscribe enabled>Inscrever-se</ButtonSubscribe>
              </Link>
              <Link to="/gamestart">
                <ButtonSubscribe enabled>
                  Jogar
                </ButtonSubscribe>
              </Link>
            </ButtonsContainer>
          </CountButton>
        </Content>
      </Container>
    </PageLanding>
  );
};

export default Landing;
