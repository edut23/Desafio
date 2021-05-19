/* eslint-disable react/jsx-indent */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  PageRegulamento,
  Container,
  Card,
  Content,
  Title,
  SubContent,
  SubContentItem,
  StyledButton
} from './styles';
import Header from '../../components/Header';
import Json from './regulamento.json';
import { ButtonsContainer } from '../Game/styles';
import {useAuth} from '../../hooks/auth'

interface SubItem {
  text: string;
  id: number;
}

const Regulamento: React.FC = () => {
  const [tab, setTab] = useState('');
  const {user} = useAuth();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setTab('regulamento');

    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PageRegulamento>
      <Header selectedTab={tab}>
      <ButtonsContainer style={{ alignContent:"left" }}>
        {user &&
        <Link to="/main" style={{textDecoration:" none"}}>
         <StyledButton style={{ width:"100%"}} onClick={() =>setMenu(true)}>Concordo</StyledButton>
        </Link>}
        {!user &&
        <Link to="/" style={{textDecoration:" none"}}>
         <StyledButton style={{ width:"100%" }} onClick={() =>setMenu(false)}>Participe já</StyledButton>
        </Link>}
        </ButtonsContainer>
        </Header>
      <Container>
        {Json.regulamento.map((item) => {
          return (
            <Card key={item.title}>
              <Title>{item.title}</Title>
              <Content>{item.content}</Content>
              <SubContent>
                {item.subcontents.map(({ id, text }: SubItem) => {
                  return <SubContentItem key={id}>{text}</SubContentItem>;
                })}
              </SubContent>
            </Card>
          );
        })}
      </Container>
    </PageRegulamento>
  );
};

export default Regulamento;
