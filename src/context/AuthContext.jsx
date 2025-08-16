import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Cargar usuario de localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const loginUser = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const found = users.find((u) => u.email === email);
      if (!found) {
        return { success: false, message: "Usuario no encontrado" };
      }

      if (found.password !== password) {
        return { success: false, message: "Contraseña incorrecta" };
      }

      localStorage.setItem("currentUser", JSON.stringify(found));
      setUser(found);
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
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some((u) => u.email === email);
    if (exists) {
      throw new Error("Usuario ya registrado");
    }
    const newUser = { id: Date.now(), firstName, lastName, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);

    return newUser;
  };

  const logout = () => {
    setUser(null);
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
