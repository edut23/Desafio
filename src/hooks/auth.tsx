import React, { createContext, useCallback, useState, useContext } from 'react';
import Axios from 'axios';

interface User {
  UserId: string;
  UserTeamId: string;
  UserName: string;
  UserEmail: string;
  TeamCurrentQuestionId: string;
  TeamName: string;
  UserProfile: string;
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
      Axios.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as UserLoginData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await Axios.post(
      `${process.env.REACT_APP_PROD_API}/login`,
      {
        UserEmail: email,
        UserPassword: password,
      },
    );

    const { user, team } = response.data;

    Object.assign(user, {
      TeamCurrentQuestionId: team.TeamCurrentQuestionId,
      TeamName: team.TeamName,
    });

    if (user !== undefined) {
      localStorage.setItem('@Challenge:user', JSON.stringify(user));
    }

    setData({
      user,
    });
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
