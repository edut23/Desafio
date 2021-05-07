import styled from 'styled-components';
import { loadFromLeft } from './animations';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100vw;
  height: 80vh;
  padding: 32px;

  animation: ${loadFromLeft} 0.8s;
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border: solid 1px gray;
  height: 100%;
  width: 100%;

  border-radius: 6px;

  background: rgba(251, 124, 31, 0.9);

  padding: 8px;
`;

export const MessageContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  font-family: 'Poppins';

  p {
    font-size: 18px;
    color: #fff;

    background: rgba(251, 124, 31);
    border-radius: 6px;

    padding: 8px;
  }

  padding: 12px;
  background: #fff;
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

export const RankContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  font-family: 'Poppins';
  color: #fff;

  > p {
    font-size: 32px;
  }

  background: rgba(251, 124, 31, 0.9);
  border-radius: 6px;
  box-shadow: 0 0 10px #000;

  width: 25%;
  height: 100%;

  margin-left: 3%;

  padding: 8px;
`;
