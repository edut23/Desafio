import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team'

import { Link } from 'react-router-dom';
import {
  PageLanding,
  HeaderA,
  Container,
  ButtonsContainer,
  ButtonSubscribe,
  Content,
  ChallengeText,
  CountButton,
  TopText,
} from './styles';
import { LoadingContainer } from '../../components/Alert/styles';
import { useUsers } from '../../hooks/users';
import ReactLoading from 'react-loading';

interface DataFormInfo {
    name: string;
    founder: string;
    currentquestionid: string;
    imageurl: string;
    category: string;
    points: string;
    teamid: string;
  }


const Main: React.FC = () => {

  const [tab, setTab] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const { user } = useAuth();
  const [time, setTime] = useState('');
  const { team } = useTeam();
  const { Users, signUsers } = useUsers();

  
  const Load = (async () => {
    await console.log(user);
    await console.log(team);
  });

  useEffect(() => {
    setTab('home');
    console.log(user);
    console.log(team);
    Load();
    

    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <PageLanding> 
      <HeaderA selectedTab={tab} setTab={() => setTab} />
      <Container>
        <Content>
          <ChallengeText>
             <strong>{team.name}</strong>
          </ChallengeText>
          <TopText>Gerenciar time</TopText>
          <CountButton>
            <ButtonsContainer>
              <Link to="/invite">
                <ButtonSubscribe type="submit">Gerenciar time</ButtonSubscribe>
              </Link>
              <Link to="/payment">
                <ButtonSubscribe enabled>Pagar inscrição</ButtonSubscribe>
              </Link>
            </ButtonsContainer>
          </CountButton>
        </Content>
      </Container>
      {!user && <div>{window.location.href = '/'}</div>}
    </PageLanding>
  );
};

export default Main;




