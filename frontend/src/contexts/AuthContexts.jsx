import { createContext, useState, useEffect } from "react";
import { getDashboard } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await getDashboard();
        console.log("AuthContext: User loaded from API:", response.data); // ✅ Debugging
        setUser(response.data.user);
      } catch (error) {
        console.error("AuthContext Error:", error.response?.data || error);
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
