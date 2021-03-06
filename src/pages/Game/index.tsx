import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  PageGame,
  TContainer,
  CircleContent,
  Content,
  StyledButton,
  PageWrapper,
  FormContainer,
  ButtonsContainer,
  StyledInput,
  BackButton,
  LContainer
} from './styles';

import Header from '../../components/Header';
import seta from '../../assets/img/seta.png';
import CountDown from '../../components/PageCountdown';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { useTeam } from '../../hooks/team'
import { Logo, LogoContent, LogoOptions } from '../../components/Header/styles';

interface DataFormInfo {
  teamName: string;
  password: string;
  teamid: string;
}

const Game: React.FC = () => {
  const [card, setCard] = useState('');
  const [change, setChange] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [showDown, setShowDown] = useState(0);
  const countDownFromDate = useMemo(() => {
    return new Date(2020, 9, 10, 9, 0, 0, 0);
  }, []);

  const { addToast } = useToast();
  const { user, signIn, signOut } = useAuth();
  const { team, signTeam } = useTeam();
  const [loading, setLoading] = useState(false);
  

  const formRef = useRef<FormHandles>(null);
  const timeOutRef = useRef(0);

  const loadLoginCard = useCallback(() => {
    const actualDate = new Date();
    const day = actualDate.getDate();
    const hour = actualDate.getHours();

    if (day >= 1 && hour >= 1) {
      setCard('login');
      setChange(!change);
    } else {
      addToast({
        title: 'Alerta',
        description: 'Aguarde, o evento ainda não começou',
        type: 'info',
      });
    }
  }, [addToast, change]);

  const handleSubmit = useCallback(
    async (data: DataFormInfo) => {
      setIsLogging(true);
      setIsEnabled(false);
      
      
      try {
        await signOut();
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          teamName: Yup.string().required('Nome do usuário obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        
        setLoading(true);


        await signTeam(
        await signIn({
          email: data.teamName,
          password: data.password,
        }));

        console.log("deu...")

        const teamid = user

        
        console.log(teamid)

        

        console.log("bão")

        setIsLogging(false);
        setIsEnabled(true);

        //window.location.href = '/main';
      } catch (err) {
        setIsLogging(false);
        setIsEnabled(true);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as crendeciais.',
        });
      }
    },
    [addToast, signIn],
  );

  const debounceStartGame = useCallback(() => {
    clearTimeout(timeOutRef?.current);
    setShowDown(showDown + 1);

    if (showDown === 0) {
      setCard('login');
      setChange(!change);
    }

    timeOutRef.current = window.setTimeout(() => {
      setShowDown(0);
      loadLoginCard();
    }, 500);
  }, [change, loadLoginCard, showDown]);

  const goBack = () => {
    window.history.back()
  }

  const logo = () => {
    window.location.href = '/main'
  }

  useEffect(() => {
    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PageGame>
      <Header/>
      {loading && <LContainer><ReactLoading type= "spin" color= "orange" height={1000} width={500}/></LContainer>}
      <script src="//code.jivosite.com/widget/AIh2Mhazzn" async />
      {!loading && <LogoContent><LogoOptions><Logo onClick={goBack} src={seta} alt="seta" style={{width: 40, height: 40, marginRight:'5em', marginTop:'-1em'} } />
        <TContainer>
          {!user &&<PageWrapper>
              <CircleContent>
                <FormContainer>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <StyledInput
                      name="teamName"
                      icon={FiUser}
                      placeholder="email"
                      style={{ width: 300 }}
                    />
                    <StyledInput
                      name="password"
                      icon={FiLock}
                      type="password"
                      placeholder="senha"
                    />
                    <StyledButton
                      style={{ width: '100%' }}
                      enabled={isEnabled}
                      type="submit"
                    >
                      {isLogging ? <ReactLoading /> : 'Entrar'}
                    </StyledButton>
                    {/* <Link to="forgot-password">Esqueci minha senha</Link> */}
                  </Form>
                </FormContainer>
              </CircleContent>
        </PageWrapper>}
      </TContainer>
      </LogoOptions></LogoContent>}
      {user && team && logo()}
    </PageGame>
  );
};

export default Game;
