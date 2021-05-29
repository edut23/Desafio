/* eslint-disable import/no-extraneous-dependencies */ 
/* eslint-disable no-console */ 
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable react/jsx-indent */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import PaymentCard from '../../components/PaymentCard';
import PaymentBol from '../../components/PaymentBol';


import {
  PageGame,
  TContainer,
  CircleContent,
  StyledButton,
  PageWrapper,
  BackButton,
  ButtonsContainer,
} from './styles';

import Header from '../../components/Header';
import { Container } from '../../components/ToastContainer/styles';
import { LogoOptions, Logo, LogoContent } from './styles';
import seta from '../../assets/img/seta.png';

interface DataPay {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isCard: boolean;
  isBol: boolean;
  }
  
  const Payment: React.FC = () => {
    const [change, setChange] = useState(false);
    const [isCard, setIsCard] = useState(false);
    const [isBol, setIsBol] = useState(false);
    const [pay, setPay] = useState('')
    const [focused, setFocused] = useState();

    const PayCard = ()=> {
      setPay('login');
      setIsCard(true);
      console.log(pay, isCard);
    }

    const PayBol = ()=> {
      setPay('login');
      setIsBol(true);
      console.log(pay, isBol);
    }

    const goBack = () => {
      if(!isCard && !isBol)
      window.history.back()
      else if(isCard && !isBol){
        setPay('false')
        setIsCard(false)
      }
      else if(!isCard && isBol){
        setPay('false')
        setIsBol(false)
      }
    }

    function changeFocus(e: any){
      setFocused(e.target.id)
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
        <LogoContent><LogoOptions><Logo onClick={goBack} src={seta} alt="seta" onFocus={changeFocus}/>
        <script src="//code.jivosite.com/widget/AIh2Mhazzn" async />
        <TContainer>
          <br/>
          <PageWrapper>
            <CircleContent title="Logo do projeto" >
            {pay !== 'login' ? (
              <ButtonsContainer>
                <StyledButton onClick={PayCard}>
                  Cartão
                </StyledButton>
                <StyledButton onClick={PayBol}>
                  Boleto
                </StyledButton>
              </ButtonsContainer>
          ) : ((isCard && <TContainer><PaymentCard/></TContainer>) || (isBol && <TContainer><PaymentBol/></TContainer>))}
            </CircleContent>
          </PageWrapper>
        </TContainer>
        </LogoOptions></LogoContent>
      </PageGame>
    );
  };
  
export default Payment