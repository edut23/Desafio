import React, { createContext, useCallback, useState, useContext } from 'react';
import Axios from 'axios';

interface DataPay {
  paymentmethod: string;
  paymentid: string;
  userid: string;
  status: string;
  teamid: string;
}

interface PayContextData {
  DataPay: DataPay;
  senha?: string;
  pay(loginInfo: Login): Promise<void>;
  signOut(): void;
  updateDataPay(DataPay: DataPay): void;
}

interface Login {
  paymentmethod: string;
  status: string;
  paymentid: string;
  userid: string;
  teamid: string;
}

interface DataPayLoginData {
  DataPay: DataPay;
}

const PayContext = createContext<PayContextData>({} as PayContextData);

export const PayProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<DataPayLoginData>(() => {
    const token = localStorage.getItem('@Challenge:token');
    const DataPay = localStorage.getItem('@Challenge:DataPay');
    
    if (DataPay) {
      //Axios.defaults.headers.Payorization = `Bearer ${token}`;
      return {
        token,
        DataPay: JSON.parse(DataPay),
      };
    }

    return {} as DataPayLoginData;
  });

  const pay = useCallback(async ({ paymentmethod, status, paymentid, userid, teamid }) => {
    console.log("vai")
    const response = await Axios.post(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/payment`,
      {
        "paymentmethod":paymentmethod,
        "status": status,
        "paymentid": paymentid,
        "DataPayid": userid,
        "teamid": teamid
      },
    );
    console.log("vai1")

    const {DataPay}  = response.data;
    
    console.log("vai2")
    console.log(DataPay)
    //console.log(data.DataPay)
    Object.assign(DataPay)
    //Object.assign(data.DataPay)
    
    if (DataPay !== undefined) {
      localStorage.setItem('@Challenge:DataPay', JSON.stringify(DataPay));
    }

    console.log("anotado")

    setData({
      DataPay,
    });
    return DataPay.teamid
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Challenge:token');
    localStorage.removeItem('@Challenge:DataPay');
      

    setData({} as DataPayLoginData);
  }, []);

  const updateDataPay = useCallback(
    (DataPay: DataPay) => {
      localStorage.setItem('@Challenge:DataPay', JSON.stringify(DataPay));

      setData({
        DataPay,
      });
    },
    [setData],
  );

  return (
    <PayContext.Provider
      value={{ DataPay: data.DataPay, pay, signOut, updateDataPay }}
    >
      {children}
    </PayContext.Provider>
  );
};

export function usePay(): PayContextData {
  const context = useContext(PayContext);

  return context;
}
