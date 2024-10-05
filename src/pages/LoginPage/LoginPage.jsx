import { useState } from "react";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";
import AlreadyLoggedIn from "../../components/AlreadyLoggedIn/AlreadyLoggedIn";
import LoginForm from "../../components/LoginForm/LoginForm";
import Cookies from 'js-cookie';

function LoginPage() {
  const [error, setError] = useState("");
  const { user, login } = useAuth();
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
      Cookies.set("isLogin", "true")
      navigate("/homepage");
    } catch (error) {
      setError("Hatalı kullanıcı adı veya şifre, lütfen tekrar deneyin!");
    }
  }

  if (user) {
    return <AlreadyLoggedIn />;
  }

  return (
    <LoginForm
      error={error}
      handleChange={handleChange}
      handleUserLogin={handleUserLogin}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
    />
  );
}

export default LoginPage;