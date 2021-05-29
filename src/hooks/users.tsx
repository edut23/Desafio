import React, { createContext, useCallback, useState, useContext } from 'react';
import Axios from 'axios';

interface Users {
  Users: []
}


interface UsersContextData {
  Users: Users;
  senha?: string;
  signUsers(loginInfo: string): Promise<void>;
  UsersOut(): void;
}

interface Login {
  Teamid: string;
}

interface UsersLoginData {
  Users: Users;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export const UsersProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<UsersLoginData>(() => {
    const token = localStorage.getItem('@Challenge:token');
    const Users = localStorage.getItem('@Challenge:Users');
    

    if (Users) {
      //Axios.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        Users: JSON.parse(Users),
      };
    }

    return {} as UsersLoginData;
  });

  const signUsers = useCallback(async (Teamid) => {
    console.log("ta ino", Teamid)
    const response = await Axios.get(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/Team?Teamsid=${Teamid}`
    )
    const {Users}  = response.data;
    
    console.log(Users)
    Object.assign(Users)
    
    if (Users !== undefined) {
      localStorage.setItem('@Challenge:Users', JSON.stringify(Users));
    }

    setData({
      Users,
    });
  }, []);

  const UsersOut = useCallback(() => {
    localStorage.removeItem('@Challenge:token');
    localStorage.removeItem('@Challenge:Users');

    setData({} as UsersLoginData);
  }, []);

  return (
    <UsersContext.Provider
      value={{ Users: data.Users, signUsers, UsersOut }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export function useUsers(): UsersContextData {
  const context = useContext(UsersContext);

  return context;
}
