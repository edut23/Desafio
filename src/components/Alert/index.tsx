import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiXCircle } from 'react-icons/fi';
import ReactLoading from 'react-loading';
import Axios from 'axios';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import {
  Container,
  Content,
  AlertContainer,
  AlertHeader,
  Title,
  CloseButton,
  Description,
  SendingContainer,
  LoadingContainer,
  StyledButton,
} from './styles';

import Textarea from '../Textarea';

interface AlertProps {
  title?: string;
  placeholder?: string;
  buttonTitle?: string;
  errFunc?(): void;
  show?: boolean;
  QuestionId?: string;
  type?: string;
}

interface DataFormInfo {
  error: string;
}

const Alert: React.FC<AlertProps> = ({
  errFunc,
  show = true,
  placeholder = 'Placeholder padrão',
  title = 'Título padrão',
  buttonTitle = 'Botão padrão',
  QuestionId,
  type = 'alert',
}) => {
  const formRef = useRef<FormHandles>(null);
  const [sending, setIsSending] = useState(false);
  const { user } = useAuth();
  const { addToast } = useToast();

  const ENDPOINT =
    user.teamid  === 'Fundamental'
      ? (process.env.REACT_APP_FUND_API as string)
      : (process.env.REACT_APP_PROD_API as string);

  const handleSubmit = useCallback(
    (data: DataFormInfo) => {
      if (data.error !== '') {
        setIsSending(true);
        Axios.post(`${ENDPOINT}/reporterrorquestion`, {
          UserId: user.userid,
          TeamId: user.teamid,
          QuestionId,
          ReportErrorQuestion: data.error,
        }).then((response) => {
          console.log(response.data);

          setIsSending(false);
          addToast({
            title: 'Feito!',
            description: 'Erro reportado com sucesso',
            type: 'success',
          });
          errFunc && errFunc();
        });
      } else {
        alert('Preencha o campo com alguma informação');
      }
    },
    [ENDPOINT, QuestionId, addToast, errFunc, user.userid, user.teamid],
  );

  return (
    <Container show={show}>
      <Content>
        <AlertContainer>
          {sending ? (
            <SendingContainer>
              <LoadingContainer>
                <ReactLoading color="#c53030" type="cubes" />
              </LoadingContainer>
              <CloseButton onClick={errFunc}>
                <FiXCircle size={40} />
              </CloseButton>
            </SendingContainer>
          ) : (
              <>
                <AlertHeader>
                  <Title>
                    <p>{title}</p>
                  </Title>
                  <CloseButton onClick={errFunc}>
                    <FiXCircle size={40} />
                  </CloseButton>
                </AlertHeader>

                <Description>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    {type !== 'confirm' && (
                      <Textarea placeholder={placeholder} name="error"></Textarea>
                    )}
                    <StyledButton type="submit">{buttonTitle}</StyledButton>
                  </Form>
                </Description>
              </>
            )}
        </AlertContainer>
      </Content>
    </Container>
  );
};

export default Alert;
