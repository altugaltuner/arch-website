import { useState } from "react";
import "./LoginPage.scss";
import { auth } from "@/config/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthProvider";

import eyeShow from "../../assets/eye-show.svg";
import eyeHide from "../../assets/eye-hide.png";

function LoginPage() {

  const [error, setError] = useState("");

  const { fireStoreUser } = useAuth();
  console.log(fireStoreUser, "FIRESTORE USER");

  const navigate = useNavigate();

  onAuthStateChanged(auth, (currentUser) => {

    console.log(currentUser);
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Şifre gösterim durumu için yeni state

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
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError("Hatalı şifre veya email, lütfen tekrar deneyin!");
    }
  }

  if (fireStoreUser) {
    return (
      <main className="login-main">
        <div className="login-main-div">
          <h1 className="login-h1">Zaten Giriş Yaptınız</h1>
          <form className="login-form" onSubmit={(e) => handleUserLogin(e)}>
            <div className="submits-of-login">
              <button
                className="login-logout"
                onClick={() => {
                  signOut(auth).then(() => {
                    navigate("/login", { replace: true });
                    window.location.reload();  // Sayfayı yenile
                  }).catch((error) => {
                    console.error('Sign out error:', error);
                  });
                }}
              >Logout
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (

    <div className="login-main">
      <div className="login-main-div">
        <h1 className="login-h1">Login page</h1>
        <form className="login-form" onSubmit={(e) => handleUserLogin(e)}>
          {/* Hata mesajını göster Bu kontrol, JavaScript'in mantıksal AND operatörü (&&) ile yapılır. Bu operatör, sol tarafı (error) doğru (truthy) ise sağ tarafı (<p className="error-message">{error}</p>) değerlendirir ve döndürür. Eğer sol taraf yanlışsa (falsy, bu durumda boş bir string), ifade yanlış olarak değerlendirilir ve hiçbir şey render edilmez.*/}
          {error && <p className="error-message">{error}</p>}

          <input className="login-email" placeholder="Please Enter Your E-Mail" onKeyUp={handleChange} name="email" type="email" />

          <div className="password-input-container">

            <input className="login-password"
              onKeyUp={handleChange}
              name="password"
              type={showPassword ? "text" : "password"} // Input tipini dinamik olarak güncelle
            />

            <button type="button" onClick={togglePasswordVisibility} className="toggle-password-visibility">
              {showPassword ? <img className="eye-logo" src={eyeHide} alt="Hide" /> : <img src={eyeShow} alt="Show" className="eye-logo" />} {/* Göz simgesi olarak kullanılabilir bir metin */}
            </button>

          </div>

          <div className="submits-of-login">
            <input className="login-submit" type="submit" value="Login" />

            <button className="login-logout"
              onClick={() => {
                signOut(auth);
                console.log("clicked");
              }}
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;