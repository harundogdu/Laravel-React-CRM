import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";

const Index = (props) => {
    props.AuthStore.getToken();
    console.log(props.AuthStore.appState);
    const logout = () => {
        props.AuthStore.removeToken();
        props.history.push('/login');
    }
    return (
        <div>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default inject('AuthStore')(observer(Index));
