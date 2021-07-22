import { inject, observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/front.layout";

const Index = (props) => {
    props.AuthStore.getToken();
    return (
        <Layout></Layout>
    );
};

export default inject("AuthStore")(observer(Index));
