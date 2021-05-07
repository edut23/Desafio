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

import { useAuth } from '../../hooks/auth';

import objLogo from '../../assets/img/logotry.png';

interface HeaderProps {
  selectedTab?: string;
  setTab?(tab: string): React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
  selectedTab = 'home',
  setTab,
  children,
}) => {
  const { user } = useAuth();
  // const countDownFromDate = new Date(2020, 9, 10, 9, 0, 0, 0);
  // const countDownToDate = new Date(2020, 9, 11, 21, 0, 0, 0);

  // const handleChangeTab = useCallback((selectedTab: string) => {
  //   setTab(selectedTab);
  //   console.log(selectedTab);
  // }, []);

  return (
    <Container>
      <LogoContent>
        <Logo src={objLogo} alt="objlogo"></Logo>
        {/* <StyledCountDown
          background={false}
          to={countDownToDate.getTime()}
          from={countDownFromDate.getTime()}
        /> */}
        <LogoOptions>
          {user && <HomeOption tab={selectedTab}>{user.UserName}</HomeOption>}
          {!user && (
            <>
              <Link
                onClick={() => {
                  setTab && setTab('home');
                }}
                to="/"
              >
                <HomeOption tab={selectedTab}>Home</HomeOption>
              </Link>
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
