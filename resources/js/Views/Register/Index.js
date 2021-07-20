import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { array } from "yup/lib/locale";
import { inject, observer } from "mobx-react";
const Register = (props) => {
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
            .post("/api/auth/register", { ...values })
            .then((response) => {
                if (response.data.success) {
                    const userData = {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                        access_token: response.data.access_token,
                    };
                    const appState = {
                        isLoggedIn: true,
                        user: userData,
                    };
                    /* console.log(response); */
                    props.AuthStore.saveToken(appState);
                    props.history.push("/");
                } else {
                    alert("Giriş Yapmadınız!");
                }
            })
            .catch((error) => {
                if (error.response) {
                    let err = error.response.data;
                    setErrors(err.errors);
                } else if (error.request) {
                    alert(error);
                } else {
                    alert(error.message);
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
                        Lütfen bilgilerinizi giriniz
                    </h1>
                    {errArr.length != 0 &&
                        errArr.map((item, key) => (
                            <div key={key} className="alert alert-warning">
                                {item}
                            </div>
                        ))}
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            password_confirmation: "",
                        }}
                        onSubmit={handleSubmit}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email("Email adresi hatalıdır.")
                                .required("Email alanı zorunludur."),
                            name: Yup.string().required(
                                "İsim Soyisim alanı zorunludur."
                            ),
                            password: Yup.string().required(
                                "Şifre alanı zorunludur."
                            ),
                            password_confirmation: Yup.string().oneOf(
                                [Yup.ref("password"), null],
                                "Şifreler Eşleşmiyor!"
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
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="İsim Soyisim"
                                        onChange={handleChange("name")}
                                        onBlur={handleBlur("name")}
                                        value={values.name}
                                    />
                                    <label htmlFor="name">İsim Soyisim</label>
                                    {errors.name && touched.name && (
                                        <div
                                            id="passwordHelpBlock"
                                            className="form-text my-2 text-left text-danger"
                                        >
                                            {errors.name}
                                        </div>
                                    )}
                                </div>

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

                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Şifre Tekrar"
                                        onChange={handleChange(
                                            "password_confirmation"
                                        )}
                                        onBlur={handleBlur(
                                            "password_confirmation"
                                        )}
                                        value={values.password_confirmation}
                                    />
                                    <label htmlFor="password_confirmation">
                                        Şifre Tekrar
                                    </label>
                                    {errors.password_confirmation &&
                                        touched.password_confirmation && (
                                            <div
                                                id="passwordHelpBlock"
                                                className="form-text my-2 text-left text-danger"
                                            >
                                                {errors.password_confirmation}
                                            </div>
                                        )}
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !isValid}
                                    className="w-100 btn btn-lg btn-primary mb-2"
                                    type="submit"
                                >
                                    Kayıt Ol
                                </button>
                                <Link className="login-register-a" to="/login">
                                    Giriş Yap
                                </Link>
                            </div>
                        )}
                    </Formik>
                </form>
            </main>
        </div>
    );
};

export default inject("AuthStore")(observer(Register));
