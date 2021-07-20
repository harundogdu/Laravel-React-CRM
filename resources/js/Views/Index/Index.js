import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";

const Index = (props) => {
    props.AuthStore.getToken();
    console.log(props.AuthStore.appState);
    return (
        <div>
            <Link to="/login"> Login </Link>
            <Link to="/register"> Register </Link>
        </div>
    );
};

export default inject('AuthStore')(observer(Index));
