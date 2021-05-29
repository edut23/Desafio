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
  BackButton,
  UserContainer,
  P,
  A,
} from './styles';

import Header from '../../components/Header';
import Axios from 'axios';
import { LogoOptions, Logo, LogoContent } from './styles';
import seta from '../../assets/img/seta.png';
import { useUsers } from '../../hooks/users';

interface DataFormInfo {
  useremail: string;
}

interface Load{
  teamid: string;
}

const Invite: React.FC = () => {
  const [change, setChange] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const { user } = useAuth();
  const { team } = useTeam();
  const [membros, setMembros] = useState<any[]>([]);

  const formRef = useRef<FormHandles>(null);
  
  const carrega = useCallback(async () => {
    console.log("ta ino", team.teamid)
    await Axios.get(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/team?teamid=${team.teamid}`
    )
    .then(response => {console.dir(response.data.users, {depth: null}); setMembros(response.data.users)});
  }, []);





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

      window.location.href = '/main';
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
    carrega();
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
      <LogoContent><LogoOptions><Logo onClick={goBack} src={seta} alt="seta"/>
      {user &&<TContainer>
        <PageWrapper>
        <FormContainer>
          <CircleContent>
            <UserContainer>
              <P>Membros do time:</P>
              <br/>
              {membros.map((users, index) => 
            <li key={index} list-style-type= "none">
              <A>Nome: {JSON.stringify(users.fullname).replace(/"/g, '')}</A>
              <A>Apelido: {JSON.stringify(users.nickname).replace(/"/g, '')}</A>
              <A>Email: {JSON.stringify(users.email).replace(/"/g, '')}</A>
              <br/>
            </li>)}
            </UserContainer>
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
      </LogoOptions></LogoContent>
    </PageGame>
  );
};

export default Invite;
