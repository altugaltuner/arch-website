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
          const response = await api.get('https://bold-animal-facf707bd9.strapiapp.com/api/users/me?populate[company][populate]=companyLogo&populate=profilePic&populate[projects]=*&populate[access]=*', {
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
      const response = await api.post(`https://bold-animal-facf707bd9.strapiapp.com/api/auth/local`, {
        identifier: email,
        password: password,
      });

      if (response.data.jwt) {
        localStorage.setItem('token', response.data.jwt);
        setUser(response.data.user);
      }
    } catch (error) {
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
      const { password, ...updateData } = userData;
      const response = await api.put(`https://bold-animal-facf707bd9.strapiapp.com/api/users/${user.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updatePassword = async (password) => {
    try {
      const token = localStorage.getItem('token');
      if (!user || !user.id) {
        throw new Error("User ID is missing");
      }
      const response = await api.put(`https://bold-animal-facf707bd9.strapiapp.com/api/users/${user.id}`, { password }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateProfilePhoto = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!user || !user.id) {
        throw new Error("User ID is missing");
      }
      const uploadResponse = await api.post(`https://bold-animal-facf707bd9.strapiapp.com/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (uploadResponse.data && uploadResponse.data[0]) {
        const profilePicId = uploadResponse.data[0].id;
        const userResponse = await api.put(`https://bold-animal-facf707bd9.strapiapp.com/api/users/${user.id}`, {
          profilePic: profilePicId
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(userResponse.data);
        return userResponse.data;
      } else {
        throw new Error("Fotoğraf yükleme başarısız");
      }
    } catch (error) {
      throw error;
    }
  };

  const userValues = {
    user,
    login,
    logout,
    updateUser,
    updatePassword,
    updateProfilePhoto,
    loading
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
