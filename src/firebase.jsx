import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCCQWW4sclgr0ycemCBNVNiI-eUpdBcF9Y",
    authDomain: "flow-b28bf.firebaseapp.com",
    projectId: "flow-b28bf",
    storageBucket: "flow-b28bf.appspot.com",
    messagingSenderId: "494295100690",
    appId: "1:494295100690:web:1990893a3a2c5de6ac57cb"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
