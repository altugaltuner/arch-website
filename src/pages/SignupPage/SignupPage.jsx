import "./SignupPage.scss";
import { useState } from "react";
import { api } from "../../api";
import eyeShow from "../../assets/icons/EyeShowLogo.png";
import eyeHide from "../../assets/icons/EyeHideLogo.png";
import { useNavigate } from 'react-router-dom';
import backButton from '../../assets/icons/back-button.png';

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyCode: "" // Added company code to formData
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [companyCodeError, setCompanyCodeError] = useState(""); // Added state for company code error

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/login');
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signupUser = async (e) => {
    e.preventDefault();

    const { fullName, phoneNumber, email, password, confirmPassword, companyCode } = formData;

    let hasError = false;

    if (password !== confirmPassword) {
      setConfirmPasswordError("Şifreler eşleşmiyor. Lütfen tekrar deneyin.");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Şifreniz en az 6 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf ve bir rakam içermelidir.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Telefon numarası sadece rakamlardan oluşmalı ve 10 veya 11 haneli olmalıdır.");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (hasError) return;

    try {
      // Check if company code matches an existing companyID
      const companiesResponse = await api.get(`http://localhost:1337/api/companies`);
      const companies = companiesResponse.data.data;

      const matchingCompany = companies.find(company => company.attributes.companyID === companyCode);
      if (!matchingCompany) {
        setCompanyCodeError("Kod uyuşmazlığı");
        return;
      } else {
        setCompanyCodeError("");
      }

      const response = await api.post(
        `http://localhost:1337/api/auth/local/register`,
        {
          username: fullName,
          email: email,
          password: password,
          companyID: matchingCompany.id, // Include the company ID in the registration request
        }
      );

      if (response.data.jwt) {
        localStorage.setItem("token", response.data.jwt);
        alert("Kayıt başarılı. Giriş yapabilirsiniz.");
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response && error.response.data.error.message === "Email or Username are already taken") {
        setEmailError("Bu email alınmıştır.");
      } else {
        alert("Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }
  };

  function handleChange(event) {
    const { name, value } = event.target;

    // Clear the error when the user starts typing
    if (name === "email") {
      setEmailError("");
    }
    if (name === "password") {
      setPasswordError("");
    }
    if (name === "confirmPassword") {
      setConfirmPasswordError("");
    }
    if (name === "phoneNumber") {
      setPhoneError("");
    }
    if (name === "fullName") {
      setNameError("");
    }
    if (name === "companyCode") {
      setCompanyCodeError(""); // Clear company code error when user starts typing
    }

    // Only allow numbers in the phone number input
    if (name === "phoneNumber") {
      const cleanedValue = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [name]: cleanedValue,
      });
    } else if (name === "fullName") {
      const cleanedValue = value.replace(/[0-9]/g, '');
      setFormData({
        ...formData,
        [name]: cleanedValue,
      });
      if (cleanedValue !== value) {
        setNameError("İsim alanında rakam olamaz.");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
          {nameError && <p className="name-error">{nameError}</p>}
          <input
            className="signup-tel-input"
            type="tel"
            placeholder="Telefon Numaranız"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            autoComplete="tel"
          />
          {phoneError && <p className="phone-error">{phoneError}</p>}
          <input
            className="signup-email-input"
            type="email"
            placeholder="Email'iniz"
            name="email"
            onChange={handleChange}
            autoComplete="email"
          />
          {emailError && <p className="email-error">{emailError}</p>}
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
          {passwordError && <p className="password-error">{passwordError}</p>}
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
          {confirmPasswordError && <p className="confirm-password-error">{confirmPasswordError}</p>}
          <input
            type="text"
            className="company-code-input"
            placeholder="Şirket Kodunuz"
            name="companyCode" // Added name for company code input
            onChange={handleChange}
          />
          {companyCodeError && <p className="company-code-error">{companyCodeError}</p>} {/* Display company code error */}
          <div className="buttons-div-for-signup">
            <button className="signup-btn" type="submit">Kaydol</button>
            <button className="back-button-to-login" onClick={handleBackClick}>Hesabın var mı? Giriş Yap</button>
          </div>
        </form>
      </div>
      <img className="back-button-company" src={backButton} alt="back-button" onClick={() => window.history.back()} />
    </main>
  );
}

export default SignupPage;
