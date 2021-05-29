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
  usernickname: string;
  userpassword: string;
  teamid: string;
}

const Accept: React.FC = () => {
  const [change, setChange] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const { user, signIn, signOut } = useAuth();
  const { team, signTeam } = useTeam();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: DataFormInfo) => {
    setIsLogging(true);
    setIsEnabled(false);
    signOut();
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        useremail: Yup.string().email('Insira um email válido').required('Email obrigatório'),
        userfullname: Yup.string().required('Nome completo obrigatório'),
        usernickname: Yup.string().required('Nome do usuário obrigatório'),
        userpassword: Yup.string().required('Senha obrigatória'),
      });

      console.log("foi1")

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log("foi2")
      console.log(data.useremail,
        data.userfullname,
        data.usernickname,
        data.userpassword,
        user.teamid)

      await Axios.post(
        `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/invite/accepted`,
        {
          userfullname: data.userfullname,
          useremail: data.useremail,
          userpassword: data.userpassword,
          usernickname: data.usernickname,
          teamid: user.teamid
        }
      ).then(res => console.log(res))

      await signTeam(
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
        <FormContainer>
          <CircleContent>
            <br/>
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
                  name="usernickname"
                  icon={FiUser}
                  placeholder="Nome de usuário"
                  style={{ width: 300 }}
                />
                <StyledInput
                  name="userpassword"
                  icon={FiLock}
                  type="Senha"
                  placeholder="Senha"
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
            
          </CircleContent>
          </FormContainer>
        </PageWrapper>
      </TContainer>
    </PageGame>
  );
};

export default Accept;
