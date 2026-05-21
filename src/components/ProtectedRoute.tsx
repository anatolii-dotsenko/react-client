import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  // ЗМІНЕНО ТИП
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Перевірка доступу...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
