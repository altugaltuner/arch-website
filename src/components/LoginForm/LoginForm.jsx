import React from 'react';
import eyeShow from "../../assets/icons/EyeShowLogo.png";
import eyeHide from "../../assets/icons/EyeHideLogo.png";
import { Link } from 'react-router-dom';

function LoginForm({ error, handleChange, handleUserLogin, showPassword, togglePasswordVisibility }) {
    return (
        <div className="login-main">
            <div className="login-main-div">
                <h1 className="login-h1">Giriş Yapın</h1>
                <form className="login-form" onSubmit={(e) => handleUserLogin(e)}>
                    {error && <p className="error-message">{error}</p>}
                    <input className="login-email" placeholder="E-Mail'iniz" onKeyUp={handleChange} name="email" type="email" />
                    <div className="password-input-container">
                        <input
                            className="login-password"
                            onKeyUp={handleChange}
                            name="password"
                            type={showPassword ? "text" : "password"}
                        />
                        <button type="button" onClick={togglePasswordVisibility} className="toggle-password-visibility">
                            {showPassword ? <img className="eye-logo" src={eyeHide} alt="Hide" /> : <img src={eyeShow} alt="Show" className="eye-logo" />}
                        </button>
                    </div>
                    <div className="submits-of-login">
                        <input className="login-submit" type="submit" value="Giriş Yap" />
                        <Link to="/signup" className="login-signup">Hesabınız yok mu? Kaydolun</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
