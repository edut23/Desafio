/* eslint-disable import/no-extraneous-dependencies */ 
/* eslint-disable no-console */ 
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable react/jsx-indent */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { mask as masker, unMask } from "remask";
import pagarme from 'pagarme'
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import {useAuth} from '../../hooks/auth'
import { cpf } from 'cpf-cnpj-validator'; 

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

import Header from '../Header';

interface DataPay {
    cpf: string;
    name: string;
  }
  
  const PaymentBol: React.FC = () => {
    const [change, setChange] = useState(false);
    const [isLogging, setIsLogging] = useState(false);
    const [isEnabled, setIsEnabled] = useState(true);
    const {user} = useAuth();
  
    const formRef = useRef<FormHandles>(null);
  
    const handleSubmit = useCallback(async (data: DataPay) => {
      setIsLogging(true);
      setIsEnabled(false);
      console.log("foi")
      try {
        formRef.current?.setErrors({});
        console.log("foi2")
  
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório').min(3),
          cpf: Yup.string().required('CPF obrigatório').min(10),
        });
        console.log("foi3")
  
        await schema.validate(data, {
          abortEarly: false,
        });
        console.log("foi4")

        data.cpf= unMask(data.cpf)
  
        setIsLogging(false);
        setIsEnabled(true);
        console.log('foi5');
        await pagarme.client.connect({ api_key: 'ak_test_Y3WjbDGmMDR1BV0hrBBypUuuaygGti' })
          .then((client: { transactions: { create: (arg0: { amount: number; payment_method: string; postback_url: string; customer: { type: string; country: string; name: any; email: any; documents: { type: string; number: any; }[]; }; }) => any; }; }) => client.transactions.create({
            amount: 8000,
            payment_method: 'boleto',
            postback_url: 'http://requestb.in/pkt7pgpk',
            customer: {
              type: 'individual',
              country: 'br',
              name: data.name,
              email: user.email,
              documents: [
                {
                type: 'cpf',
                number: data.cpf,
                },
            ],
            },
        }))
          .then((transaction: { id: object; e: any;}) => {console.log(transaction.id); alert("Boleto gerado com sucesso.")})
          .catch((e: any) => alert("Boleto não gerado, verifique seus dados."));
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

    const [CPF, setCPF] = useState("");

    function validarCPF(CPF: string){
      if(cpf.isValid(CPF) === true){ 
        return {valido:true, texto:""}
      }else{
        return {valido:false, texto:"CPF Incorreto."}
      }
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
              <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <StyledInput
                    name="name"
                    icon={FiUser}
                    placeholder="Nome"
                    style={{ width: 300 }}
                  />
                  <StyledInput
                    name="cpf"
                    icon={FiUser}
                    placeholder="CPF"
                    style={{ width: 300 }}
                    value={masker(CPF,["999.999.999-99"])}
                    onChange={(event) => {
                      setCPF(unMask(event.target.value));
                      console.log( CPF, event.target.value)
                    }}

                    onBlur={(event)=>{
                      const ehValido = validarCPF(CPF);
                      console.log(ehValido)
                    }}
                  />
                  <StyledButton
                    style={{ width: '100%' }}
                    enabled={isEnabled}
                    type="submit"
                  >
                    {isLogging ? <ReactLoading /> : 'Gerar boleto'}
                  </StyledButton>
  
                  {/* <Link to="forgot-password">Esqueci minha senha</Link> */}
                </Form>
              </FormContainer>
    );
  };
  
export default PaymentBol