import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import Axios from 'axios';
import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team';
import { usePic } from '../../hooks/pic'


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
  ButtonsContainer,
  StyledInput,
  BackButton,
  NewContainer,
  CircleContent1,
  CircleConten2,
} from './styles';

import Header from '../../components/Header';
import seta from '../../assets/img/seta.png';
import { LogoOptions, Logo, LogoContent } from './styles';
import ImageUpload from '../../components/Image';
import { LContainer } from '../Game/styles';

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
  const { team, signTeam } = useTeam();
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState<any>();
  const { signPic} = usePic();

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

      await signTeam(
        await signIn({
        email: data.useremail,
        password: data.userpassword,
      }));

      await signPic(picture)

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
      <Header />
      {loading && <LContainer><ReactLoading type= "spin" color= "orange" height={1000} width={500}/></LContainer>}
      {<script src="//code.jivosite.com/widget/AIh2Mhazzn" async />}
      {!loading && <LogoContent><LogoOptions><Logo onClick={goBack} src={seta} alt="seta"/>
      <TContainer>
        {!user &&
        <PageWrapper>
          <CircleContent>
              <Form ref={formRef} onSubmit={handleSubmit}>
              <CircleContent>
                <NewContainer>
                <FormContainer>
                <CircleContent1>
                <h3>Dados do usuário</h3>
                <br/>
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
                </CircleContent1>
                </FormContainer>
                <FormContainer>
                <CircleConten2>
                <h3>Dados do time</h3>
                <br/>
                <StyledInput
                  name="teamname"
                  icon={FiUser}
                  placeholder="Nome do time"
                  style={{ width: 300 }}
                />
                <StyledInput
                  name="teamcategory"
                  icon={FiUser}
                  placeholder="Categoria"
                  style={{ width: 300 }}
                  list="Nivel"
                />
                <ImageUpload {...picture}/>
                </CircleConten2>
                </FormContainer>
                </NewContainer>
                <StyledButton
                  style={{ width: '100%', height: '150%' }}
                  enabled={isEnabled}
                  type="submit"
                >
                  {isLogging ? <ReactLoading /> : 'Cadastar'}
                </StyledButton>
                <br/>
                <datalist id="Nivel">
                  <option value="Fundamental">Fundamental</option>
                  <option value="Médio">Médio</option>
                </datalist>

                {/* <Link to="forgot-userpassword">Esqueci minha senha</Link> */}
                </CircleContent>
              </Form>
          </CircleContent>
        </PageWrapper>
      }
      </TContainer></LogoOptions></LogoContent>}
      {user && team && logo()}
    </PageGame>
  );
};

export default Subscribe;
