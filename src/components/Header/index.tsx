import React from 'react';

import { Link } from 'react-router-dom';
import {
  Container,
  Logo,
  LogoContent,
  LogoOptions,
  HomeOption,
  RegulationOption,
} from './styles';

import {UserContainer} from './styles'

import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team';

import chicoLogo from '../../assets/img/chicoLogo3.png';
import { TeamProvider } from '../../hooks/team';
import { usePic } from '../../hooks/pic'

interface HeaderProps {
  selectedTab?: string;
  setTab?(tab: string): React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
  selectedTab = 'home',
  setTab,
  children,
}) => {
  const { user, signOut } = useAuth();
  const { team } = useTeam();
  const { pic } = usePic();
  //const { teamOut } = useTeam();
  // const countDownFromDate = new Date(2020, 9, 10, 9, 0, 0, 0);
  // const countDownToDate = new Date(2020, 9, 11, 21, 0, 0, 0);

  // const handleChangeTab = useCallback((selectedTab: string) => {
  //   setTab(selectedTab);
  //   console.log(selectedTab);
  // }, []);

  return (
    <Container>
      <LogoContent>
        <Logo src={chicoLogo} alt="chicologo"></Logo>
        <LogoOptions>
          {user && team && <div> 
          <UserContainer>
          {pic}
            <div className="user-data-container">
              <h3>Usuário: {user.fullname}</h3>
              <h3>Time: {team.name}</h3>
            </div>
          <Link to = "/"><HomeOption tab={selectedTab} onClick = {signOut}>Desconectar</HomeOption></Link>
          </UserContainer>
          </div>}
          {!user && (
            <>
              <Link
                onClick={() => {
                  setTab && setTab('regulamento');
                }}
                to="/regulamento"
              >
                <RegulationOption tab={selectedTab}>
                  Regulamento
                </RegulationOption>
              </Link>
            </>
          )}
          {children}
        </LogoOptions>
      </LogoContent>
    </Container>
  );
};

export default Header;
