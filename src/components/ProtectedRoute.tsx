import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  
  // Якщо не авторизований — перекидаємо на сторінку входу
  return isAuth ? <>{children}</> : <Navigate to="/auth" replace />;
}