import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface MessageProps {
  isMe?: boolean;
  last?: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  color: #000;
  font-family: 'Poppins';
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */

  width: 100%;
  height: 100%;

  /* border: solid 2px red; */
`;

export const ChatTitle = styled.p`
  text-align: center;
`;

export const ChatHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;

  border: solid 2px aquamarine;
  border-radius: 12px;
  background: #fafafa;

  width: 100%;
  height: 90%;

  padding: 5px;

  margin-bottom: 4px;
  overflow: auto;
  scroll-behavior: auto;
`;

export const Message = styled.p<MessageProps>`
  ${(props) =>
    props.isMe &&
    css`
      margin-left: auto;
    `};

  ${(props) =>
    props.last &&
    css`
      color: aquamarine;
    `};
`;

export const MessageContainer = styled.div`
  margin-top: auto;
`;

export const FormContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: #05a746;

    transition: color 0.4s;

    &:hover {
      color: ${shade(0.4, '#05a746')} !important;
      cursor: pointer;
    }
  }
`;
