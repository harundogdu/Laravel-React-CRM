import React, { useState, useEffect } from "react";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const Layout = (props) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    props.AuthStore.getToken();
    const history = useHistory();

    const logout = () => {
        axios
            .post(
                "/api/logout",
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " +
                            props.AuthStore.appState.user.access_token,
                    },
                }
            )
            .then((res) => console.log(res))
            .catch((e) => console.log(e));

        props.AuthStore.removeToken();
        history.push("/login");
    };

    useEffect(() => {
        const token =
            props.AuthStore.appState != null
                ? props.AuthStore.appState.user.access_token
                : null;
        axios
            .post(
                `/api/authenticate`,
                {},
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((response) => {
                if (!response.data.isLoggedIn) {
                    history.push("/login");
                }
                setUser(response.data.user);
                setIsLoggedIn(response.data.isLoggedIn);
            })
            .catch((e) => {
                history.push("/login");
            });
    }, []);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">HDCreative Stok Takip</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Yönetim Paneli</Nav.Link>
                            <Nav.Link href="/hesaplar">Hesaplar</Nav.Link>
                            <Nav.Link href="/kategoriler">Kategoriler</Nav.Link>
                            <Nav.Link href="/urunler">Ürünler</Nav.Link>
                        </Nav>
                        <Nav className="mr-auto">
                            <NavDropdown
                                title={user.name}
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Profil Düzenle
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Şifre Değiştir
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>
                                    Çıkış Yap
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>{props.children}</div>
        </>
    );
};

export default inject("AuthStore")(observer(Layout));
