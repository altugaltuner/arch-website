import "./SignupPage.scss";
import { useState } from "react";
import { auth, db } from "@/config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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

  const [showPassword, setShowPassword] = useState(false); // Şifre gösterim durumu için yeni state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signupUser = async (e) => {
    e.preventDefault();

    const { fullName, phoneNumber, email, password, confirmPassword } =
      formData;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\S]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be minimum 6 characters, at least one uppercase letter, one lowercase letter and one number"
      );
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        phoneNumber: phoneNumber,
      });
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDocRef, {
        fullName: auth.currentUser.displayName,
        phoneNumber: auth.currentUser.phoneNumber,
        email: auth.currentUser.email,
        cart: null,
        role: "user",
      });
    } catch (error) {
      console.error(error);
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
          <h1>Signup Page</h1>
          <form className="login-form" onSubmit={(e) => signupUser(e)}>
            <input
              type="text"
              placeholder="Full Name"
              name="fullName"
              onKeyUp={handleChange}
            />
            <input
              type="tel"
              placeholder="Phone number"
              name="phoneNumber"
              onKeyUp={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onKeyUp={handleChange}
            />
            <div className="password-section-signup">
              <input
                type={showPassword ? "text" : "password"} // Input tipini dinamik olarak güncelle
                placeholder="Password"
                name="password"
                onKeyUp={handleChange}
              />
              <button type="button" onClick={togglePasswordVisibility} className="toggle-password-visibility">
                {showPassword ? <img className="eye-logo" src={eyeHide} alt="Hide" /> : <img src={eyeShow} alt="Show" className="eye-logo" />}
              </button>
            </div>
            <div className="password-section-signup">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                onKeyUp={handleChange}
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
