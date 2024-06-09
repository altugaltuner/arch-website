import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const userValues = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={userValues}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context.user === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
