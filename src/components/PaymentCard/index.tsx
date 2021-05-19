/* eslint-disable import/no-extraneous-dependencies */ 
/* eslint-disable no-console */ 
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable react/jsx-indent */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import { mask as masker, unMask } from "remask";
import Cards, { Focused } from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';
import pagarme from 'pagarme'
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
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

import Header from '../../components/Header';

interface DataPay {
    cpf: string;
    cardNumber: string;
    cardName: string;
    exp: string;
    cvv: string;
    focused: Focused;
    CPF: string;
  }
  
  const PaymentCard: React.FC = () => {
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
          cpf: Yup.string().required('CPF obrigatório').min(10),
          cardNumber: Yup.number().required('Número do cartão obrigatório').min(13),
          cardName: Yup.string().required('Nome obrigatório').min(3),
          exp: Yup.string().required('Data de validade obrigatória').min(4),
          cvv: Yup.number().required('CVV obrigatório').min(3),
        });
        console.log("foi3")
  
        await schema.validate(data, {
          abortEarly: false,
        });
        console.log("foi4")

        data.cpf = unMask(data.cpf);
        data.exp = unMask(data.exp);
  
        setIsLogging(false);
        setIsEnabled(true);
        console.log('foi5', data.cpf, data.exp);
        await pagarme.client.connect({ api_key: 'ak_test_Y3WjbDGmMDR1BV0hrBBypUuuaygGti' })
          .then((client: { transactions: { create: (arg0: { amount: number; cpf: string; card_number: string; card_cvv: string; card_expiration_date: string; card_holder_name: string; customer: { external_id: string; name: string; type: string; country: string; email: string; documents: { type: string; number: string; }[]; phone_numbers: string[]; birthday: string; }; billing: { name: string; address: { country: string; state: string; city: string; neighborhood: string; street: string; street_number: string; zipcode: string; }; }; items: { id: string; title: string; unit_price: number; quantity: number; tangible: boolean; }[]; }) => object; }; }) => client.transactions.create({
            amount: 8000,
            cpf: data.cpf,
            card_number: data.cardNumber,
            card_cvv: data.cvv,
            card_expiration_date: data.exp,  
            card_holder_name: data.cardName,
            customer: {
              external_id: "#3311",
              name: data.cardName,
              type: "individual",
              country: "br",
              email: "email@gmail.com",
              documents: [
                {
                  type: "cpf",
                  number: data.cpf,
                }
              ],
              phone_numbers: ["+5511999998888", "+5511888889999"],
              birthday: "1965-01-01"
            },
            billing: {
              name: data.cardName,
              address: {
                country: "br",
                state: "sp",
                city: "Cotia",
                neighborhood: "Rio Cotia",
                street: "Rua Matrix",
                street_number: "9999",
                zipcode: "06714360"
              }
            },
            items: [
              {
                id: "desaf-sim",
                title: "Desafio",
                unit_price: 8000,
                quantity: 1,
                tangible: true
              }
            ]
          }
          )
          )
          .then((transaction: { id: object; e: any;}) => {console.log(transaction.id); alert("Pagamento realizado com sucesso.")})
          .catch((e: any) => alert("Pagamento não realizado, verifique seus dados."));
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

    const [card_number, setNumb] = useState("");
    const [Nome_card, setNome_card] = useState("");
    const [Exp, setData] = useState("");
    const [CVV, setCVV] = useState("");
    const [CPF, setCPF] = useState("")
    const [focused, setFocused] = useState();

    function validarCPF(CPF: string){
      if(cpf.isValid(CPF) === true){ 
        return {valido:true, texto:""}
      }else{
        return {valido:false, texto:"CPF Incorreto."}
      }
    }

    function retCard(card_number: string){
      if(card_number !== undefined){
        if(card_number.length > 15){
          setNumb(card_number.slice(0, -1))
          console.log(card_number)
        }
      }
    }

    function retCVV(CVV: string){
      if(CVV !== undefined){
        if(CVV.length > 2){
          setCVV(CVV.slice(0, -1))
          console.log(CVV)
        }
      }
    }

    function retData(Exp: string){
      if(Exp !== undefined){
        if(Exp.length > 3){
          setData(Exp.slice(0, -1))
          console.log(Exp)
        }
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
      <TContainer>
              <FormContainer>
                <Form ref={formRef} onSubmit={handleSubmit}>
                <Cards
                number={card_number}
                name={Nome_card}
                expiry={Exp}
                cvc={CVV}
                focused={focused}
                />
                <br/>
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
                  <StyledInput
                    name="cardNumber"
                    icon={FiUser}
                    placeholder="Número do cartão"
                    style={{ width: 300 }}
                    value={masker(card_number, ["9999999999999999"])}
                    onChange={(event) => {
                      retCard(card_number);
                      setNumb(event.target.value);
                      console.log(card_number)
                    }}
                    onFocus={changeFocus}
                  />
                  <StyledInput
                    name="cardName"
                    icon={FiUser}
                    placeholder="Nome"
                    style={{ width: 300 }}
                    value={Nome_card}
                    onChange={(event) => {
                    setNome_card(event.target.value);
                    console.log(Nome_card)
                    }}
                    onFocus={changeFocus}
                  />
                  <StyledInput
                    name="exp"
                    icon={FiUser}
                    placeholder="Data de validade"
                    style={{ width: 300 }}
                    value={masker(Exp,["99/99"])}
                    onChange={(event) => {
                      setData(unMask(event.target.value));
                      retData(Exp);
                      console.log( Exp, event.target.value);
                    }}
                    onFocus={changeFocus}
                  />
                  <StyledInput
                    name="cvv"
                    icon={FiLock}
                    placeholder="CVV"
                    value={masker(CVV,["999"])}
                    onChange={(event) => {
                      setCVV(event.target.value);
                      retCVV(CVV);
                      console.log(card_number, Nome_card, CVV, Exp)
                    }}
                    onFocus={changeFocus} 
                  />
                  <StyledButton
                    style={{ width: '100%' }}
                    enabled={isEnabled}
                    type="submit"
                  >
                    {isLogging ? <ReactLoading /> : 'Pagar'}
                  </StyledButton>
                  <br/>
  
                  {/* <Link to="forgot-password">Esqueci minha senha</Link> */}
                </Form>
              </FormContainer>
      </TContainer>
    );
  };
  
export default PaymentCard