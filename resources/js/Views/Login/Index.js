import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div style={{ width: "100%", height: "100vh" }} className="login-register-body">
            <main className="form-signin">
                <form>
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Lütfen bilgilerinizi giriniz</h1>
                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" />
                        <label htmlFor="email">Email adresiniz</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                        <label htmlFor="password">Şifreniz</label>
                    </div>
                    <div className="checkbox mb-3">
                        <label><input name="remember_me" type="checkbox" value="remember-me" /> Beni hatırla</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">Giriş Yap</button>
                    <Link className="login-register-a" to="/register">Kayıt Ol</Link>
                    <p className="my-3 text-muted">All rights reserved © <a target="_blank" className="alert-link" href="https://harundogdu.com">Harun Dogdu</a> </p>
                </form>
            </main>
        </div>
    )
}

export default Login;