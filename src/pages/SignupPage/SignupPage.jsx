import "./SignupPage.scss";
import { useState } from "react";
import { api } from "../../api";
import eyeShow from "../../assets/icons/EyeShowLogo.png";
import eyeHide from "../../assets/icons/EyeHideLogo.png";

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signupUser = async (e) => {
    e.preventDefault();

    const { fullName, phoneNumber, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor. Lütfen tekrar deneyin.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Şifreniz en az 6 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf ve bir rakam içermelidir."
      );
      return;
    }

    try {
      const response = await api.post(
        `http://localhost:1337/api/auth/local/register`,
        {
          username: fullName,
          email: email,
          password: password,
        }
      );

      if (response.data.jwt) {
        localStorage.setItem("token", response.data.jwt);
        alert("Kayıt başarılı. Giriş yapabilirsiniz.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <main className="signup-page">
      <div className="signup-main-div">
        <h1 className="signup-header">Çalışan Hesabı Oluştur</h1>
        <form className="login-form" onSubmit={(e) => signupUser(e)}>
          <input
            className="signup-full-name-input"
            type="text"
            placeholder="Adınız Soyadınız"
            name="fullName"
            onChange={handleChange}
            autoComplete="name"
          />
          <input
            className="signup-tel-input"
            type="tel"
            placeholder="Telefon Numaranız"
            name="phoneNumber"
            onChange={handleChange}
            autoComplete="tel"
          />
          <input
            className="signup-email-input"
            type="email"
            placeholder="Email'iniz"
            name="email"
            onChange={handleChange}
            autoComplete="email"
          />
          <div className="password-section-signup">
            <input
              className="signup-password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Şifreniz"
              name="password"
              onChange={handleChange}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-visibility"
            >
              {showPassword ? (
                <img className="eye-logo" src={eyeHide} alt="Hide" />
              ) : (
                <img className="eye-logo" src={eyeShow} alt="Show" />
              )}
            </button>
          </div>
          <div className="password-section-signup">
            <input
              className="signup-password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Şifrenizi Tekrar Girin"
              name="confirmPassword"
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>
          <input type="text" className="company-code-input" placeholder="Şirket Kodunuz" />
          <input className="signup-btn" type="submit" value="Sign Up" />
        </form>
      </div>
    </main>
  );
}

export default SignupPage;
