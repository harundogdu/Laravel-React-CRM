import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";
import { array } from "yup/lib/locale";
import { inject, observer } from "mobx-react";
const Login = (props) => {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (
            props.AuthStore.appState &&
            props.AuthStore.appState.user.access_token
        ) {
            return props.history.push("/");
        }
    });

    const handleSubmit = (values) => {
        axios
            .post(`/api/auth/login`, { ...values })
            .then((res) => {
                if (res.data.success) {
                    const userData = {
                        id: res.data.id,
                        name: res.data.name,
                        email: res.data.email,
                        access_token: res.data.access_token,
                    };
                    const appState = {
                        isLoggedIn: true,
                        user: userData,
                    };
                    props.AuthStore.saveToken(appState);
                    //props.history.push('/');
                    window.location.reload();
                } else {
                    alert("Giriş Yapamadınız");
                }
            })
            .catch((error) => {
                if (error.response) {
                    let err = error.response.data;
                    if (err.errors) {
                        setErrors(err.errors);
                    } else {
                        setError(error.response.data.message);
                    }
                    //alert(err.errors)
                } else if (error.request) {
                    let err = error.request;
                    setError(err);
                } else {
                    setError(error.message);
                }
            });
    };
    let errArr = [];
    Object.values(errors).forEach((error) => {
        errArr.push(error);
    });
    return (
        <div
            style={{ width: "100%", height: "100vh" }}
            className="login-register-body"
        >
            <main className="form-signin">
                <form>
                    <img
                        className="mb-4"
                        src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
                        alt=""
                        width="72"
                        height="57"
                    />
                    <h1 className="h3 mb-3 fw-normal">
                        Lütfen giriş bilgilerini giriniz
                    </h1>
                    {errArr.length != 0 &&
                        errArr.map((item, key) => (
                            <div key={key} className="alert alert-warning">
                                {item}
                            </div>
                        ))}
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email("Email adresi hatalıdır.")
                                .required("Email alanı zorunludur."),
                            password: Yup.string().required(
                                "Şifre alanı zorunludur."
                            ),
                        })}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            isValid,
                        }) => (
                            <div>
                                {" "}
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email adresi"
                                        onChange={handleChange("email")}
                                        onBlur={handleBlur("email")}
                                        value={values.email}
                                    />
                                    <label htmlFor="email">
                                        Email adresiniz
                                    </label>
                                    {errors.email && touched.email && (
                                        <div
                                            id="passwordHelpBlock"
                                            className="form-text my-2 text-left text-danger"
                                        >
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Şifre"
                                        onChange={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        value={values.password}
                                    />
                                    <label htmlFor="password">Şifreniz</label>
                                    {errors.password && touched.password && (
                                        <div
                                            id="passwordHelpBlock"
                                            className="form-text my-2 text-left text-danger"
                                        >
                                            {errors.password}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !isValid}
                                    className="w-100 btn btn-lg btn-primary mb-2"
                                    type="submit"
                                >
                                    Giriş Yap
                                </button>
                                <Link
                                    className="login-register-a"
                                    to="/register"
                                >
                                    Kayıt Ol
                                </Link>
                            </div>
                        )}
                    </Formik>
                </form>
            </main>
        </div>
    );
};

export default inject("AuthStore")(observer(Login));
