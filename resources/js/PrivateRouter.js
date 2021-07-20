import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import AuthStore from "./Store/AuthStore";
AuthStore.getToken();
const isLoggedIn = AuthStore.appState != null && AuthStore.appState.isLoggedIn;

const PrivateRouter = ({ component: Component, path, ...rest }) => (
    <Route
        path={path}
        {...rest}
        render={(props) =>
            isLoggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {
                            prevLocation: path,
                            error: "Önce Giriş Yapmalısın",
                        },
                    }}
                />
            )
        }
    />
);

export default withRouter(PrivateRouter);
