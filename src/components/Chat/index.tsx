/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiPlay } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useChat } from '../../hooks/chat';

import {
  Container,
  Content,
  ChatTitle,
  ChatHistoryContainer,
  Message,
  MessageContainer,
  FormContent,
} from './styles';
import Input from '../Input';

interface Message {
  message: string;
  userName: string;
}

interface ChatProps {
  wsConnection?: WebSocket;
  callBack?: void;
  sendMessage?(userName: string, teamId: string, message: string): void;
}

const Chat: React.FC<ChatProps> = ({ wsConnection, sendMessage }) => {
  const { user } = useAuth();
  const { messages, addMessage, clearMessages } = useChat();

  const formRef = useRef<FormHandles>(null);
  const lastMessage = useRef<HTMLParagraphElement>(null);
  const notLastMessage = useRef<HTMLParagraphElement>(null);

  const handleSubmit = useCallback(
    (inputRef: HTMLInputElement) => {
      if (
        inputRef.value !== '' &&
        inputRef.value !== undefined &&
        wsConnection !== undefined
      ) {
        if (sendMessage) {
          sendMessage(user.nickname, user.teamid, inputRef.value as string);
          addMessage(inputRef.value as string, user.nickname);
        }
        inputRef.value = '';
      }

      if (lastMessage.current) {
        lastMessage.current.scrollIntoView();
      }
    },
    [addMessage, sendMessage, user.nickname, user.teamid, wsConnection],
  );

  useEffect(() => {
    if (lastMessage.current) {
      lastMessage.current.scrollIntoView();
    }
    return () => {
      clearMessages();
    };
  }, [clearMessages]);

  return (
    <Container>
      <Content>
        <ChatTitle>{`Chat do time ${user.teamid}`}</ChatTitle>
        <ChatHistoryContainer>
          {messages &&
            messages.map((message, index) => {
              return (
                message.message !== '' &&
                user.nickname !== undefined && (
                  <Message
                    isMe={user.nickname === message.userName}
                    ref={
                      index === messages.length - 1
                        ? lastMessage
                        : notLastMessage
                    }
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${user.nickname}-${index}`}
                  >
                    <strong>{`${message.userName}: `}</strong>
                    {message.message}
                  </Message>
                )
              );
            })}
        </ChatHistoryContainer>
        <MessageContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormContent>
              <Input
                name="message"
                placeholder="Digite uma mensagem"
                callback={handleSubmit}
              />
              <FiPlay size={50} />
            </FormContent>
          </Form>
        </MessageContainer>
      </Content>
    </Container>
  );
};

export default Chat;
