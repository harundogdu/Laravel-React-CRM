import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute  from './PrivateRoute';
/* Sayfalar */
import FrontIndex from './Views/Index';
import FrontLogin from './Views/Login';
import FrontRegister from './Views/Register';

const Main = () => (
    <Switch>
        <PrivateRoute exact path="/" component={FrontIndex} />
        <Route path="/login" component={FrontLogin} />
        <Route path="/register" component={FrontRegister} />
    </Switch>
)

export default Main;