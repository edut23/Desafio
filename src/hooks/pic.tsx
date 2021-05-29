import React, { createContext, useCallback, useState, useContext } from 'react';

interface Pic {
  pic: string;
}


interface PicContextData {
  pic: Pic;
  senha?: string;
  signPic(loginInfo: void): Promise<void>;
  PicOut(): void;
}

interface Login {
  picid: string;
}

interface PicLoginData {
  pic: Pic;
}

const PicContext = createContext<PicContextData>({} as PicContextData);

export const PicProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<PicLoginData>(() => {


    return {} as PicLoginData;
  })
  const signPic = useCallback(async (pic) => {
    setData({
      pic,
    });
  }, []);

  const PicOut = useCallback(() => {
    setData({} as PicLoginData);
  }, []);

  return (
    <PicContext.Provider
      value={{ pic: data.pic, signPic, PicOut }}
    >
      {children}
    </PicContext.Provider>
  );
};

export function usePic(): PicContextData {
  const context = useContext(PicContext);

  return context;
}