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

  const loginUser = ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found));
      setUser(found);
      return { success: true };
    }
    return { success: false, message: "Credenciales inválidas" };
  };

  const registerUser = ({ firstName, lastName, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some((u) => u.email === email);
    if (exists) {
      return { success: false, message: "Usuario ya registrado" };
    }
    const newUser = { id: Date.now(), firstName, lastName, email, password };
    const addUsers = [...users, newUser];

    localStorage.setItem("users", JSON.stringify(addUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setUser(newUser);

    return { success: true };
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
