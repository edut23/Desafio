import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { FiLock, FiUnlock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import { Link, Redirect } from 'react-router-dom';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import chicoLogo from '../../assets/img/chicoLogo3.png';

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
} from './styles';

import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';


interface DataFormInfo {
  userName: string;
  teamName: string;
  email: string;
  password: string;
}

const Subscribe: React.FC = () => {
  const [change, setChange] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [trava, setTrava] = useState(0);
  const [libera, setLibera] = useState(false);
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);


  const handleSubmit = useCallback(
    async (data: DataFormInfo) => {
      setIsLogging(true);
      setIsEnabled(false);
      try {
        formRef.current?.setErrors({});
        console.log("foi")

        const schema = Yup.object().shape({
          userName: Yup.string().required('Nome do time obrigatório'),
          teamName: Yup.string().required('Nome do usuário obrigatório'),
          email: Yup.string().email('Insira um email válido').required('Email obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });
        console.log("foi2")

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsLogging(false);
        setIsEnabled(true);
        console.log("foi3")

        window.location.href = '/regulamento';
      }
       catch (err) {
        setIsLogging(false);
        setIsEnabled(true);
        console.log("erro")
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
      }
    },
    [],
  );


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
      <Header />
      <script src="//code.jivosite.com/widget/AIh2Mhazzn" async />
      <TContainer>
        <PageWrapper>
              <CircleContent
                title="Logo do projeto"
                load={change}
                logo={chicoLogo}
              >
                <FormContainer>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <StyledInput
                      name="teamName"
                      icon={FiUser}
                      placeholder="Nome do time"
                      style={{ width: 300 }}
                    />
                    <StyledInput
                      name="userName"
                      icon={FiUser}
                      placeholder="Nome do usuário"
                      style={{ width: 300 }}
                    />
                    <StyledInput
                      name="email"
                      icon={FiUser}
                      placeholder="Email"
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
                      {isLogging ? <ReactLoading /> : 'Cadastar'}
                    </StyledButton>
                    
                    {/* <Link to="forgot-password">Esqueci minha senha</Link> */}
                  </Form>
                </FormContainer>
              </CircleContent>
        </PageWrapper>
      </TContainer>
    </PageGame>
  );
};

export default Subscribe;
