import React, { useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/front.layout";

const Index = (props) => {
    useEffect(() => {
        axios
            .get("/api/product", {
                headers: {
                    Authorization:
                        "Bearer " + props.AuthStore.appState.user.access_token,
                },
            })
            .then((response) => {
                //console.log(response);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <Layout>
            <Link to="/urunler/ekle">Ürün Ekle</Link>
        </Layout>
    );
};

export default inject("AuthStore")(observer(Index));
