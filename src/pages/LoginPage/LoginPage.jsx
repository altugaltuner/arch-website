import { useState } from "react";
import "./LoginPage.scss";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";
import eyeShow from "../../assets/eye-show.svg";
import eyeHide from "../../assets/eye-hide.png";

function LoginPage() {
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  console.log(user, "USER");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleUserLogin(e) {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Hatalı kullanıcı adı veya şifre, lütfen tekrar deneyin!");
    }
  }

  if (user) {
    return (
      <main className="login-main">
        <div className="login-main-div">
          <h1 className="login-h1">Zaten Giriş Yaptınız</h1>
          <button
            className="login-logout"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.reload();
            }}
          >
            Çıkış Yap
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="login-main">
      <div className="login-main-div">
        <h1 className="login-h1">Giriş Yapın</h1>
        <form className="login-form" onSubmit={(e) => handleUserLogin(e)}>
          {error && <p className="error-message">{error}</p>}

          <input className="login-email" placeholder="E-Mail'iniz" onKeyUp={handleChange} name="email" type="email" />

          <div className="password-input-container">
            <input className="login-password"
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
