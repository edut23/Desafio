import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team';
import { useInvite } from '../../hooks/invite';


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
  ButtonsContainer,
  BackButton
} from './styles';

import Header from '../../components/Header';
import Axios from 'axios';

interface DataFormInfo {
  useremail: string;
}

const Invite: React.FC = () => {
  const [change, setChange] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const { user } = useAuth();
  const { team } = useTeam();
  const { Invite } = useInvite();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: DataFormInfo) => {
    setIsLogging(true);
    setIsEnabled(false);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        useremail: Yup.string().email('Insira um email válido').required('Email obrigatório'),
      });

      console.log("foi1")

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log("foi2")
      console.log(data.useremail, team.teamid, team.name, user.fullname)

      await Axios.post(
        `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/invite`,
        {
            "teamid": team.teamid,
            "teamname": team.name,
            "teamfoundername": user.fullname,
            "invitemail": data.useremail
        },
      );
      console.log("vai1")

      setIsLogging(false);
      setIsEnabled(true);

      //window.location.href = '/main';
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
      {user &&<TContainer>
        <PageWrapper>
        <BackButton onClick={goBack}>Voltar</BackButton>
        <FormContainer>
          <CircleContent title="Logo do projeto" load={change} logo={chicoLogo}>
            <br/>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <StyledInput
                  name="useremail"
                  icon={FiUser}
                  placeholder="Email"
                  style={{ width: 300 }}
                />
                <StyledButton
                  style={{ width: '100%' }}
                  enabled={isEnabled}
                  type="submit"
                >
                  {isLogging ? <ReactLoading /> : 'Convidar'}
                </StyledButton>

                {/* <Link to="forgot-userpassword">Esqueci minha senha</Link> */}
              </Form>
            
          </CircleContent>
          </FormContainer>
        </PageWrapper>
      </TContainer>}
      {!user && team && <TContainer>{window.location.href = '/'}</TContainer>}
    </PageGame>
  );
};

export default Invite;
