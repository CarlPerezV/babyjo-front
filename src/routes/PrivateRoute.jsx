// src/components/PrivateRoute.jsx (o en context si lo prefieres)
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = ({ children }) => {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    // evita que se vea un parpadeo mientras se valida la sesión
    return <div className="p-6 text-center">Cargando...</div>;
  }

  return user && token ? children : <Navigate to="/login" replace />;
};
