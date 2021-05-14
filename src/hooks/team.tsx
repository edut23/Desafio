import React, { createContext, useCallback, useState, useContext } from 'react';
import Axios from 'axios';

interface Team {
  name: string;
  founder: string;
  currentquestionid: string;
  imageurl: string;
  category: string;
  points: string;
  teamid: string;
}


interface TeamContextData {
  team: Team;
  senha?: string;
  signTeam(loginInfo: void): Promise<void>;
  teamOut(): void;
}

interface Login {
  teamid: string;
}

interface TeamLoginData {
  team: Team;
}

const TeamContext = createContext<TeamContextData>({} as TeamContextData);

export const TeamProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<TeamLoginData>(() => {
    const token = localStorage.getItem('@Challenge:token');
    const team = localStorage.getItem('@Challenge:team');
    

    if (team) {
      //Axios.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        team: JSON.parse(team),
      };
    }

    return {} as TeamLoginData;
  });

  const signTeam = useCallback(async (teamid) => {
    console.log("ta ino", teamid)
    const response = await Axios.get(
      `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/team?teamid=${teamid}`
    )
    const {team}  = response.data;
    
    console.log(team)
    Object.assign(team)
    
    if (team !== undefined) {
      localStorage.setItem('@Challenge:team', JSON.stringify(team));
    }

    setData({
      team,
    });
  }, []);

  const teamOut = useCallback(() => {
    localStorage.removeItem('@Challenge:token');
    localStorage.removeItem('@Challenge:team');

    setData({} as TeamLoginData);
  }, []);

  return (
    <TeamContext.Provider
      value={{ team: data.team, signTeam, teamOut }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export function useTeam(): TeamContextData {
  const context = useContext(TeamContext);

  return context;
}
