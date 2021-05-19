import React from 'react';
import { Switch } from 'react-router-dom';

// Components
import Game from '../pages/Game';
import Regulamento from '../pages/Regulamento';
//import Questionary from '../pages/Questionary';
import Fake from '../pages/Fake';
import EndGame from '../pages/EndGame';
import Landing from '../pages/Landing';
import Subscribe from '../pages/Subscribe';
import Payment from '../pages/Payment';
import Main from '../pages/Main';
import PaymentBol from '../components/PaymentBol'

import Route from './Route';


const routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/main" component={Main}/>
      <Route path="/gamestart" component={Game} />
      <Route path="/regulamento" component={Regulamento} />
      {/*<Route path="/questionary" component={Questionary} isPrivate />*/}
      <Route path="/fake/:user/:pass" component={Fake} />
      <Route path="/endgame" component={EndGame} isPrivate />
      <Route path="/payment" component={Payment} />
      <Route path="/paymentbol" component={PaymentBol} />
    </Switch>
  );
};

export default routes;
