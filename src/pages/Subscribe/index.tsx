import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import Axios from 'axios';
import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team'


import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import chicoLogo from '../../assets/img/chicoLogo3.png';

import {
  PageGame,
  TContainer,
  CircleContent,
  StyledButton,
  PageWrapper,
  FormContainer,
  StyledInput,
} from './styles';

import Header from '../../components/Header';

interface DataFormInfo {
  useremail: string;
  userfullname: string;
  teamcategory: string;
  usernickname: string;
  userpassword: string;
  teamname: string;
}

const Subscribe: React.FC = () => {
  const [change, setChange] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const { user, signIn, signOut } = useAuth();
  const { signTeam } = useTeam();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: DataFormInfo) => {
    setIsLogging(true);
    setIsEnabled(false);
    //signOut();
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        useremail: Yup.string().email('Insira um email válido').required('Email obrigatório'),
        userfullname: Yup.string().required('Nome completo obrigatório'),
        teamcategory: Yup.string().required('Categoria obrigatório'),
        usernickname: Yup.string().required('Nome do usuário obrigatório'),
        userpassword: Yup.string().required('Senha obrigatória'),
        teamname: Yup.string().required('Nome do time obrigatório'),
      });

      console.log("foi1")

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log("foi2")
      console.log(data.useremail,
        data.userfullname,
        data.teamcategory,
        data.usernickname,
        data.userpassword,
        data.teamname)

      await Axios.post(
        `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/signup`,
        {
          useremail: data.useremail,
          userfullname: data.userfullname,
          teamcategory: data.teamcategory,
          usernickname: data.usernickname,
          userpassword: data.userpassword,
          teamname: data.teamname
        }
      ).then(res => console.log(res))

      signTeam(
        await signIn({
        email: data.useremail,
        password: data.userpassword,
      }));

      setIsLogging(false);
      setIsEnabled(true);

      window.location.href = '/regulamento';
    } catch (err) {
      setIsLogging(false);
      setIsEnabled(true);
      console.log('erro');
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

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
          <CircleContent title="Logo do projeto" load={change} logo={chicoLogo}>
            <FormContainer>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <StyledInput
                  name="useremail"
                  icon={FiUser}
                  placeholder="Email"
                  style={{ width: 300 }}
                />
                <StyledInput
                  name="userfullname"
                  icon={FiUser}
                  placeholder="Nome completo"
                  style={{ width: 300 }}
                />
                <StyledInput
                  name="teamcategory"
                  icon={FiUser}
                  placeholder="Categoria"
                  style={{ width: 300 }}
                />
                <StyledInput
                  name="usernickname"
                  icon={FiUser}
                  placeholder="Nome de usuário"
                  style={{ width: 300 }}
                />
                <StyledInput
                  name="userpassword"
                  icon={FiLock}
                  type="Senha"
                  placeholder="senha"
                />
                <StyledInput
                  name="teamname"
                  icon={FiUser}
                  placeholder="Nome do time"
                  style={{ width: 300 }}
                />
                <StyledButton
                  style={{ width: '100%' }}
                  enabled={isEnabled}
                  type="submit"
                >
                  {isLogging ? <ReactLoading /> : 'Cadastar'}
                </StyledButton>

                {/* <Link to="forgot-userpassword">Esqueci minha senha</Link> */}
              </Form>
            </FormContainer>
          </CircleContent>
        </PageWrapper>
      </TContainer>
    </PageGame>
  );
};

export default Subscribe;
