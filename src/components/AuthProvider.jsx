import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get(`http://localhost:1337/api/users/me?populate=company`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("API response data:", response.data); // Buraya ekleyelim
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
      const response = await api.post(`http://localhost:1337/api/auth/local`, {
        identifier: email,
        password: password,
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

  const updateUser = async (userData) => {
    try {
      const token = localStorage.getItem('token');
      if (!user || !user.id) {
        throw new Error("User ID is missing");
      }
      const { password, ...updateData } = userData; // şifreyi ayrı tut
      const response = await api.put(`http://localhost:1337/api/users/${user.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Kullanıcı bilgisi güncellenemedi", error);
      throw error;
    }
  };

  const updatePassword = async (password) => {
    try {
      const token = localStorage.getItem('token');
      if (!user || !user.id) {
        throw new Error("User ID is missing");
      }
      const response = await api.put(`http://localhost:1337/api/users/${user.id}`, { password }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Şifre güncellenemedi", error);
      throw error;
    }
  };

  const userValues = {
    user,
    login,
    logout,
    updateUser,
    updatePassword
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
