import React, { createContext, useCallback, useState, useContext } from 'react';
import Axios from 'axios';

interface User {
  email: string;
  password: string;
  nickname: string;
  fullname: string;
  userid: string;
  imageurl: string;
  teamid: string;
}

interface AuthContextData {
  user: User;
  senha?: string;
  signIn(loginInfo: Login): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface Login {
  email: string;
  password: string;
}

interface UserLoginData {
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<UserLoginData>(() => {
    const token = localStorage.getItem('@Challenge:token');
    const user = localStorage.getItem('@Challenge:user');
    
    if (user) {
      //Axios.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as UserLoginData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    console.log("foi")
    const response = await Axios.post(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/login`,
      {
        "email": email,
        "password": password,
      },
    );
    console.log("foi1")

    const {user}  = response.data;
    
    console.log("foi2")
    console.log(user)
    console.log(data.user)
    Object.assign(user)
    //Object.assign(data.user)
    
    if (user !== undefined) {
      localStorage.setItem('@Challenge:user', JSON.stringify(user));
    }

    console.log("autorizo")

    setData({
      user,
    });
    return user.teamid
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Challenge:token');
    localStorage.removeItem('@Challenge:user');

    setData({} as UserLoginData);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Challenge:user', JSON.stringify(user));

      setData({
        user,
      });
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
