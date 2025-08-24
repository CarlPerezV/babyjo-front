import { Navigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { login, register } from "../services/auth.service.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginUser = async (email, password) => {
    try {
      const data = await login(email, password);
      setUser(data.user);

      // guardamos solo el token en sessionStorage
      sessionStorage.setItem("token", data.token);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.message || "Error en el inicio de sesión. Intenta nuevamente.",
      };
    }
  };

  const registerUser = async ({ firstName, lastName, email, password }) => {
    try {
      const newUser = await register({
        firstName,
        lastName,
        email,
        password,
      });
      setUser(newUser.user);
      sessionStorage.setItem("token", newUser.token);
      return newUser;
    } catch (error) {
      throw new Error(error.message || "Error al registrar usuario");
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
