import React, { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Item,
  QuestionPoints,
} from './styles';

interface RankingProps {
  content?: any;
}

interface Ranking {
  TeamCurrentQuestionId?: string;
  TeamId?: string;
  TeamName: string;
  TeamPoints: number;
}

const Ranking: React.FC<RankingProps> = ({ children, content }) => {
  const { user } = useAuth();

  const [list, setList] = useState<Ranking[]>([]);

  useEffect(() => {
    if (content !== false) {
      setList(content);
    }
  }, [content, user]);

  return (
    <Container>
      <Content>
        <Header>
          <Title>Ranking</Title>
        </Header>
        <Body>
          {list.map((item, index) => (
            <Item
              myTeam={user.TeamName === item.TeamName && true}
              key={item.TeamName}
            >
              <QuestionPoints>
                <h3>{`${index + 1}° - ${item.TeamName}`}</h3>
                {item.TeamCurrentQuestionId === '111' && (
                  <strong>Finalizado</strong>
                )}
                {item.TeamCurrentQuestionId !== '111' && (
                  <strong>{`Questão ${item.TeamCurrentQuestionId}`}</strong>
                )}
              </QuestionPoints>
              {user.TeamName === item.TeamName && (
                <p>{`${item.TeamPoints} pts`}</p>
              )}
            </Item>
          ))}
        </Body>
      </Content>
    </Container>
  );
};

export default Ranking;
