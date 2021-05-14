/* eslint-disable import/no-extraneous-dependencies */ 
/* eslint-disable no-console */ 
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable react/jsx-indent */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { mask as masker, unMask } from "remask";
import Cards from 'react-credit-cards'
import { TextField, Button, Typography} from "@material-ui/core";
import pagarme from 'pagarme'
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';

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

interface DataPay {
    cardNumber: string;
    cardName: string;
    exp: string;
    cvv: string;
  }
  
  const Payment: React.FC = () => {
    const [change, setChange] = useState(false);
    const [isLogging, setIsLogging] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
  
    const formRef = useRef<FormHandles>(null);
  
    const handleSubmit = useCallback(async (data: DataPay) => {
      setIsLogging(true);
      setIsEnabled(false);
      console.log("foi")
      try {
        formRef.current?.setErrors({});
        console.log("foi2")
  
        const schema = Yup.object().shape({
          cardNumber: Yup.string().required('Número do cartão obrigatório'),
          cardName: Yup.string().required('Nome obrigatório'),
          exp: Yup.string().required('Data de validade obrigatória'),
          cvv: Yup.string().required('CVV obrigatório'),
        });
        console.log("foi3")
  
        await schema.validate(data, {
          abortEarly: false,
        });
        console.log("foi4")
  
        setIsLogging(false);
        setIsEnabled(true);
        console.log('foi5');
        pagarme.client.connect({ api_key: 'ak_test_Y3WjbDGmMDR1BV0hrBBypUuuaygGti' })
          .then((client: { transactions: { create: (arg0: { amount: number; card_number: string; card_cvv: string; card_expiration_date: string; card_holder_name: string; customer: { external_id: string; name: string; type: string; country: string; email: string; documents: { type: string; number: string; }[]; phone_numbers: string[]; birthday: string; }; billing: { name: string; address: { country: string; state: string; city: string; neighborhood: string; street: string; street_number: string; zipcode: string; }; }; items: { id: string; title: string; unit_price: number; quantity: number; tangible: boolean; }[]; }) => object; }; }) => client.transactions.create({
            "amount": 8000,
            "card_number": data.cardNumber,
            "card_cvv": data.cvv,
            "card_expiration_date": data.exp,  
            "card_holder_name": data.cardName,
            "customer": {
              "external_id": "#3311",
              "name": data.cardName,
              "type": "individual",
              "country": "br",
              "email": "email",
              "documents": [
                {
                  "type": "cpf",
                  "number": "43139920067"
                }
              ],
              "phone_numbers": ["+5511999998888", "+5511888889999"],
              "birthday": "1965-01-01"
            },
            "billing": {
              "name": data.cardName,
              "address": {
                "country": "br",
                "state": "sp",
                "city": "Cotia",
                "neighborhood": "Rio Cotia",
                "street": "Rua Matrix",
                "street_number": "9999",
                "zipcode": "06714360"
              }
            },
            "items": [
              {
                "id": "desaf-sim",
                "title": "Desafio",
                "unit_price": 8000,
                "quantity": 1,
                "tangible": true
              }
            ]
            
          }))
          .then((transaction: { id: object; }) => console.log(transaction.id))
          .catch((e: any) => alert("Pagamento não realizado, verifique seus dados."));
        //window.location.href = '/regulamento';
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
                    name="cardNumber"
                    icon={FiUser}
                    placeholder="Número do cartão"
                    style={{ width: 300 }}
                  />
                  <StyledInput
                    name="cardName"
                    icon={FiUser}
                    placeholder="Nome"
                    style={{ width: 300 }}
                  />
                  <StyledInput
                    name="exp"
                    icon={FiUser}
                    placeholder="Data de validade"
                    style={{ width: 300 }}
                  />
                  <StyledInput
                    name="cvv"
                    icon={FiLock}
                    type="password"
                    placeholder="CVV"
                  />
                  <StyledButton
                    style={{ width: '100%' }}
                    enabled={isEnabled}
                    type="submit"
                  >
                    {isLogging ? <ReactLoading /> : 'Cadastar'}
                  </StyledButton>
  
                  {/* <Link to="forgot-password">Esqueci minha senha</Link> */}
                </Form>
              </FormContainer>
            </CircleContent>
          </PageWrapper>
        </TContainer>
      </PageGame>
    );
  };
  
export default Payment