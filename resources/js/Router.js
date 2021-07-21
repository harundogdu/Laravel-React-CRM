import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
/* Sayfalar */
import FrontIndex from "./Views/Index";
import FrontLogin from "./Views/Login";
import FrontRegister from "./Views/Register";
/* Ürünler */
import ProductIndex from "./Views/Product/index";
import ProductCreate from "./Views/Product/create";

const Main = () => (
    <Switch>
        <PrivateRoute exact path="/" component={FrontIndex} />
        <Route path="/login" component={FrontLogin} />
        <Route path="/register" component={FrontRegister} />
        <PrivateRoute exact path="/urunler" component={ProductIndex} />
        <PrivateRoute path="/urunler/ekle" component={ProductCreate} />
    </Switch>
);

export default Main;
