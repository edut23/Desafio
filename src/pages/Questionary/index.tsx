import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  FiLogOut,
  FiPlay,
  FiCornerUpRight,
  FiAlertTriangle,
} from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Axios from 'axios';
import { useAuth } from '../../hooks/auth';
import { useChat, Message } from '../../hooks/chat';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  FirstRowContainer,
  LogoutButton,
  PageContent,
  Answer,
  FormContent,
  ReportErrorButton,
  AnswerButton,
  AnswerInput,
  Hint,
  Question,
  QuestionHeader,
  LoadingQuestion,
  HintButton,
  PassButton,
  QuestionContentContainer,
  QuestionContainer,
  QuestionOverlay,
  RankContainer,
  StyledTooltip,
} from './styles';

import Header from '../../components/Header';
import Alert from '../../components/Alert';
import Confirm from '../../components/Confirm';
import QuestionContent from '../../components/QuestionContent';
import Ranking from '../../components/Ranking';
import FinalComponent from '../../components/FinalComponent';

interface Question {
  QuestionId: string;
  QuestionTitle: string;
  QuestionAnswer: string;
  QuestionHints: string;
  QuestionUrl: string;
  QuestionType: string;
  QuestionAnswerCharacterCounter: string;
}

interface NextQuestion {
  nextQuestion: Question;
}

interface AnswerQuestion {
  isCorrect: boolean;
  nextQuestion: Question;
}

interface DataFormInfo {
  answer: string;
}

const Questionary: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addMessage, clearMessages } = useChat();
  const { push } = useHistory();

  const [caracterCounter, setCaracterCounter] = useState(999);
  const [rememberAnswer, setRememberAnswer] = useState('');
  const [verifyPing, setVerifyPing] = useState('pong');

  const [passing, setIsPassing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [answering, setIsAnswering] = useState(false);
  const [reportError, setReportError] = useState(false);

  const [wsResponse, setWsResponse] = useState('');

  const ENDPOINT_WS =
    user.UserProfile === 'Fundamental'
      ? (process.env.REACT_APP_FUND_WS as string)
      : (process.env.REACT_APP_PROD_WS as string);

  const ENDPOINT =
    user.UserProfile === 'Fundamental'
      ? (process.env.REACT_APP_FUND_API as string)
      : (process.env.REACT_APP_PROD_API as string);

  const { addToast } = useToast();
  const [question, setQuestion] = useState<Question>({
    QuestionId: '',
    QuestionAnswer: '',
    QuestionTitle: '',
    QuestionHints: '',
    QuestionAnswerCharacterCounter: '',
    QuestionUrl: '',
    QuestionType: '',
  });

  const formRef = useRef<FormHandles>(null);
  const sWs = useRef<WebSocket>();

  const getRanking = useCallback(() => {
    sWs.current?.send(
      JSON.stringify({
        action: 'onMessage',
        type: 'ranking',
      }),
    );
  }, [sWs]);

  const sendId = useCallback(() => {
    sWs.current?.send(
      JSON.stringify({
        action: 'onMessage',
        type: 'updateconnectionid',
        userId: user.UserId,
        teamId: user.UserTeamId,
      }),
    );
  }, [user.UserId, user.UserTeamId]);

  const reOpenConnection = useCallback(() => {
    console.log('reabriu a conexao');
    sWs.current = new WebSocket(ENDPOINT_WS);
    sWs.current.onopen = (event) => {
      sendId();
    };
  }, [ENDPOINT_WS, sendId]);

  const validatePong = useCallback(() => {
    console.log('terminou a função ping');
  }, []);

  const ping = useCallback(async () => {
    await sWs.current?.send(
      JSON.stringify({
        action: 'onMessage',
        type: 'ping',
      }),
    );
  }, []);

  // const sendMessage = useCallback(
  //   (userName: string, teamId: string, message: string) => {
  //     if (userName !== '' && teamId !== '' && message !== '') {
  //       sWs.current?.send(
  //         JSON.stringify({
  //           action: 'onMessage',
  //           type: 'chat',
  //           teamId,
  //           userName,
  //           message,
  //         }),
  //       );
  //     }
  //   },
  //   [sWs],
  // );

  const getCurrentQuestionByTeamId = useCallback(async () => {
    Axios.get<Question>(
      `${ENDPOINT}/getcurrentquestionbyteamid?UserId=${user.UserId}&TeamId=${user.UserTeamId}`,
    ).then((response) => {
      if (response.data.QuestionType === 'end') {
        push('/endgame');
      }

      setQuestion(response.data);

      setCaracterCounter(
        parseInt(response.data.QuestionAnswerCharacterCounter, 10),
      );
    });
  }, [ENDPOINT, push, user.UserId, user.UserTeamId]);

  useEffect(() => {
    sWs.current = new WebSocket(ENDPOINT_WS);
    sWs.current.onopen = (event) => {
      sendId();
      setInterval(() => {
        if (sWs !== undefined) {
          ping();
        }
      }, 30000);

      if (sWs.current !== undefined) {
        getRanking();
        if (sWs !== undefined) {
          sWs.current.onerror = (err) => {
            // sWs.current?.close();
            // reOpenConnection();
            console.log('deu merda');
            window.location.reload();
          };
        }
        sWs.current.onmessage = (e) => {
          try {
            if (e.data.includes('pong')) {
              setVerifyPing(e.data);
            }

            if (e.data.includes('TeamPoints')) {
              setWsResponse(e.data);
            }
            if (e.data === 'updatecurrentquestion') {
              getRanking();
              getCurrentQuestionByTeamId();
              addToast({
                title: 'Boa!',
                description: 'Sua equipe acertou a resposta',
                type: 'success',
              });
            }
            if (e.data.includes('message')) {
              const recievedMessage: Message = JSON.parse(e.data);
              addMessage(recievedMessage.message, recievedMessage.userName);
            }
            if (e.data.includes('refreshranking')) {
              console.log('refresh foi chamado');
            }
            if (e.data === 'updatecurrentquestionpassed') {
              getRanking();
              getCurrentQuestionByTeamId();
              addToast({
                title: 'Alerta',
                description: 'Sua equipe pulou a questão',
                type: 'info',
              });
            }
          } catch {
            window.location.reload();
            console.log('err');
          }
        };
      }
    };

    getCurrentQuestionByTeamId();

    return () => {
      sWs.current?.close();
    };
  }, [
    ENDPOINT_WS,
    addMessage,
    addToast,
    clearMessages,
    getCurrentQuestionByTeamId,
    getRanking,
    ping,
    reOpenConnection,
    sWs,
    sendId,
    user,
    user.TeamCurrentQuestionId,
    user.UserId,
    user.UserTeamId,
    validatePong,
    verifyPing,
  ]);

  const handleShowHint = useCallback(() => {
    addToast({
      title: 'Dica',
      description: question.QuestionHints,
      type: 'success',
    });
  }, [addToast, question.QuestionHints]);

  const handlePassQuestion = useCallback(() => {
    setConfirm(!confirm);
    Axios.get<NextQuestion>(
      `${ENDPOINT}/passquestion?QuestionId=${question.QuestionId}&TeamId=${user.UserTeamId}&UserId=${user.UserId}`,
    ).then((response) => {
      try {
        setCaracterCounter(999);
        setRememberAnswer('');
        if (response.data.nextQuestion.QuestionId) {
          setIsPassing(false);
          setConfirm(!confirm);
          setQuestion(response.data.nextQuestion);
          sWs.current?.send(
            JSON.stringify({
              action: 'onMessage',
              type: 'updatecurrentquestionpassed',
              userId: user.UserId,
              teamId: user.UserTeamId,
            }),
          );
          sWs.current?.send(
            JSON.stringify({
              action: 'onMessage',
              type: 'refreshranking',
            }),
          );
        }
      } catch {
        window.location.reload();
      }
    });
  }, [ENDPOINT, confirm, question.QuestionId, user.UserId, user.UserTeamId]);

  const handleAnswer = useCallback(
    async (data: DataFormInfo) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          answer: Yup.string().required(
            'Escreva algo na resposta ou pule a pergunta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsAnswering(true);

        Axios.post<AnswerQuestion>(`${ENDPOINT}/answerquestion`, {
          UserId: user.UserId,
          TeamId: user.UserTeamId,
          QuestionId: question.QuestionId,
          QuestionAnswer: data.answer,
        }).then((response) => {
          if (response.data.isCorrect) {
            setCaracterCounter(999);
            setRememberAnswer('');

            formRef.current?.clearField('answer');
            setQuestion(response.data.nextQuestion);

            sWs.current?.send(
              JSON.stringify({
                action: 'onMessage',
                type: 'updatecurrentquestion',
                userId: user.UserId,
                teamId: user.UserTeamId,
              }),
            );
            sWs.current?.send(
              JSON.stringify({
                action: 'onMessage',
                type: 'refreshranking',
              }),
            );
          } else {
            addToast({
              title: 'Erro',
              description: 'Resposta incorreta',
              type: 'error',
            });
          }
          setIsAnswering(false);
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [ENDPOINT, addToast, question.QuestionId, user.UserId, user.UserTeamId],
  );

  const handleReportError = useCallback(() => {
    setReportError(!reportError);
  }, [reportError]);

  const handleConfirm = useCallback(() => {
    setConfirm(!confirm);
  }, [confirm]);

  const handleYesButton = useCallback(() => {
    setIsPassing(!passing);
    handlePassQuestion();
  }, [handlePassQuestion, passing]);

  const handleCaracterChange = useCallback(
    (e) => {
      setRememberAnswer(e.target.value);
      const counter: String = e.target.value;
      const questionCounter = parseInt(
        question.QuestionAnswerCharacterCounter,
        10,
      );
      setCaracterCounter(questionCounter - counter.length);
    },
    [question.QuestionAnswerCharacterCounter],
  );

  return (
    <PageContent>
      {reportError && (
        <Alert
          QuestionId={question.QuestionId}
          title="Reportar erro"
          buttonTitle="Enviar"
          placeholder="Digite o que está acontecendo aqui"
          show={reportError}
          errFunc={handleReportError}
        />
      )}
      {confirm && (
        <Confirm
          title="Deseja mesmo pular a questão?"
          closeFunc={handleConfirm}
          show={confirm}
          pass={handleYesButton}
        />
      )}
      <Header>
        <LogoutButton onClick={signOut}>
          <FiLogOut size={20} />
          Sair
        </LogoutButton>
      </Header>
      <Container>
        {question.QuestionType !== 'final' && (
          <FirstRowContainer>
            <QuestionContainer>
              <QuestionOverlay>
                <Question>
                  <QuestionHeader normal={question.QuestionType === 'normal'}>
                    {question.QuestionHints !== ' ' && !passing && (
                      <HintButton onClick={handleShowHint}>
                        <StyledTooltip
                          type="hint"
                          title={question.QuestionHints}
                        >
                          <FaLightbulb size={40} />
                        </StyledTooltip>
                      </HintButton>
                    )}
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {`${question.QuestionId}- `}
                      {question.QuestionTitle.replaceAll('<br/>', '\n')}
                    </p>
                    {question.QuestionTitle !== '' && !passing ? (
                      <>
                        <PassButton onClick={handleConfirm}>
                          <StyledTooltip title="Atenção: Ao pular a questão não tem mais como voltar !">
                            <FiCornerUpRight size={40} />
                            <h5>Pular</h5>
                          </StyledTooltip>
                        </PassButton>
                      </>
                    ) : (
                        <PassButton>
                          <LoadingQuestion
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              marginTop: '2%',
                            }}
                          >
                            <ReactLoading
                              type="spin"
                              color="#d1d1d1"
                              width={40}
                            />
                          </LoadingQuestion>
                        </PassButton>
                      )}
                  </QuestionHeader>
                  {question.QuestionType !== 'normal' && (
                    <QuestionContentContainer>
                      <QuestionContent
                        type={question.QuestionType}
                        url={question.QuestionUrl}
                      />
                    </QuestionContentContainer>
                  )}
                </Question>
                {!answering && !passing ? (
                  <>
                    <Answer>
                      <Form
                        style={{ width: '100%' }}
                        ref={formRef}
                        onSubmit={handleAnswer}
                      >
                        <FormContent>
                          <ReportErrorButton onClick={handleReportError}>
                            <FiAlertTriangle size={40} />
                            Reportar um erro
                          </ReportErrorButton>
                          <AnswerInput
                            onChange={(e) => handleCaracterChange(e)}
                            name="answer"
                            placeholder="Digite a resposta aqui"
                            defaultValue={rememberAnswer}
                          />
                          <AnswerButton type="submit">
                            <FiPlay size={20} />
                          </AnswerButton>
                        </FormContent>
                      </Form>
                      <Hint>
                        {caracterCounter > 1 &&
                          question.QuestionTitle !== '' &&
                          caracterCounter < 999 && (
                            <>
                              Faltam <strong>{caracterCounter}</strong>{' '}
                              caracteres em sua resposta
                            </>
                          )}

                        {caracterCounter === 1 && caracterCounter < 999 && (
                          <>
                            Falta <strong>{caracterCounter}</strong> caractere
                            em sua resposta
                          </>
                        )}

                        {caracterCounter === 0 && caracterCounter < 999 && (
                          <>
                            Falta <strong>{caracterCounter}</strong> caractere
                            em sua resposta
                          </>
                        )}

                        {caracterCounter < 0 && caracterCounter < 999 && (
                          <strong>Sua resposta excedeu os caracteres</strong>
                        )}
                      </Hint>
                    </Answer>
                  </>
                ) : (
                    <ReactLoading color="#000" type="balls" />
                  )}
              </QuestionOverlay>
            </QuestionContainer>
            <RankContainer>
              <Ranking
                content={
                  wsResponse !== '' &&
                  wsResponse !== 'pong' &&
                  JSON.parse(wsResponse)
                }
              >
                <br />
              </Ranking>
            </RankContainer>
          </FirstRowContainer>
        )}
        {question.QuestionType === 'final' && (
          <>
            <FinalComponent text={question.QuestionTitle}>
              <Ranking
                content={
                  wsResponse !== '' &&
                  wsResponse !== 'pong' &&
                  JSON.parse(wsResponse)
                }
              >
                <br />
              </Ranking>
            </FinalComponent>
          </>
        )}

        {/* <SecondRowContainer enabled={false}>
          <VideoCards>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
          </VideoCards>
          <ChatContainer>
            <Chat sendMessage={sendMessage} wsConnection={sWs.current} />
          </ChatContainer>
        </SecondRowContainer> */}
      </Container>
    </PageContent>
  );
};

export default Questionary;
