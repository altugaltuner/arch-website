// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArjpVGlnyQgSJLDURKYyOdSU0e1AynomA",
  authDomain: "food-app-55bb4.firebaseapp.com",
  projectId: "food-app-55bb4",
  storageBucket: "food-app-55bb4.appspot.com",
  messagingSenderId: "866164230244",
  appId: "1:866164230244:web:a3cd7877de72dd9ee73771",
  measurementId: "G-014TE3BHSC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
