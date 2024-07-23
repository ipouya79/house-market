import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw new Error("اطلاعات وارد شده نادرست است");
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3001/register", {
        email,
        password,
      });
      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw new Error("ثبت‌نام ناموفق بود");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
