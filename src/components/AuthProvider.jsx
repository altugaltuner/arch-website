import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/index"; // Doğru yolu kullanın

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get(`/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post(`/auth/local`, {
        identifier: email,
        password,
      });

      if (response.data.jwt) {
        localStorage.setItem('token', response.data.jwt);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const userValues = {
    user,
    login,
    logout,
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
