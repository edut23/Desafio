/* eslint-disable import/no-extraneous-dependencies */ 
/* eslint-disable no-console */ 
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable react/jsx-indent */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { mask as masker, unMask } from "remask";
import Cards from 'react-credit-cards'
import pagarme from 'pagarme'
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import PaymentCard from '../../components/PaymentCard';
import PaymentBol from '../../components/PaymentBol';

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
  BackButton,
  StyledInput,
  ButtonsContainer,
} from './styles';

import Header from '../../components/Header';
import { Container } from '../../components/ToastContainer/styles';

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
        <TContainer>
        <ButtonsContainer><BackButton onClick={goBack}>Voltar</BackButton></ButtonsContainer>
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
          ) : ((isCard && <PaymentCard/>) || (isBol && <PaymentBol/>))}
            </CircleContent>
          </PageWrapper>
        </TContainer>
      </PageGame>
    );
  };
  
export default Payment