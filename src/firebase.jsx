// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase Authentication'ı ekleyin

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCQWW4sclgr0ycemCBNVNiI-eUpdBcF9Y",
    authDomain: "flow-b28bf.firebaseapp.com",
    projectId: "flow-b28bf",
    storageBucket: "flow-b28bf.appspot.com",
    messagingSenderId: "494295100690",
    appId: "1:494295100690:web:1990893a3a2c5de6ac57cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication'ı başlatın ve auth nesnesini oluşturun
const auth = getAuth(app);

// auth nesnesini dışa aktarın
export { auth };
