import React, {useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MyGlobalContext } from './pages/Context'

import GlobalStyle from './styles/global';
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('admin')
  const [password, setPassword] = useState<string>('1234')
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <MyGlobalContext.Provider value= { {email, password, setEmail, setPassword} }>
        <AppProvider>
          <Routes />
        </AppProvider>
        </MyGlobalContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
