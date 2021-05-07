import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

interface ReqParams {
  user: string;
  pass: string;
}

const Fake: React.FC = () => {
  const { signIn } = useAuth();
  const { user, pass } = useParams() as ReqParams;

  useEffect(() => {
    signIn({ email: user, password: pass });
    console.log(user, pass);
  }, [pass, signIn, user]);

  return <div></div>;
};

export default Fake;
