import "./SignupPage.scss";
import { useState } from "react";
import { api } from "../../api";
import eyeShow from "../../assets/eye-show.svg";
import eyeHide from "../../assets/eye-hide.png";

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

    const { fullName, phoneNumber, email, password, confirmPassword } =
      formData;
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
    <div className="test">
      <main className="signup-page">
        <div className="signup-main-div">
          <h1>Hesap oluştur</h1>
          <form className="login-form" onSubmit={(e) => signupUser(e)}>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              onChange={handleChange}
              autoComplete="name"
            />
            <input
              type="tel"
              placeholder="Phone number"
              name="phoneNumber"
              onChange={handleChange}
              autoComplete="tel"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              autoComplete="email"
            />
            <div className="password-section-signup">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
                  <img src={eyeShow} alt="Show" className="eye-logo" />
                )}
              </button>
            </div>
            <div className="password-section-signup">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <input className="signup-btn" type="submit" value="Sign Up" />
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;
