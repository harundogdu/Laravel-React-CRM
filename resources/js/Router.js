import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRouter  from './PrivateRouter';
/* Sayfalar */
import FrontIndex from './Views/Index';
import FrontLogin from './Views/Login';
import FrontRegister from './Views/Register';

const Main = () => (
    <Switch>
        <PrivateRouter exact path="/" component={FrontIndex} />
        <Route path="/login" component={FrontLogin} />
        <Route path="/register" component={FrontRegister} />
    </Switch>
)

export default Main;