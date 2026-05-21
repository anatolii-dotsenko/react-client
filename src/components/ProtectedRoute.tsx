import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Якщо ще перевіряємо токен, нічого не рендеримо (щоб не було "блимання" сторінки логіну)
  if (isLoading) {
    return <div>Перевірка доступу...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
