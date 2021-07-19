import React from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
    return (
        <div style={{ width: "100%", height: "100vh" }} className="login-register-body">
            <main className="form-signin">
                <form>
                    <img className="mb-4" src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                    <h1 className="h3 mb-3 fw-normal">Lütfen giriş yapın</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="name" name="name"  placeholder="Name Surname" />
                        <label htmlFor="name">İsim Soyisim</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" />
                        <label htmlFor="email">Email adresiniz</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                        <label htmlFor="password">Şifreniz</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="repassword" name="repassword" placeholder="Password" />
                        <label htmlFor="repassword">Şifre Tekrar</label>
                    </div>


                    <button className="w-100 btn btn-lg btn-primary mb-2" type="submit">Kayıt Ol</button>
                    <Link className="login-register-a" to="/login">Giriş Yap</Link>
                </form>
            </main>
        </div>
    )
}

export default Register;