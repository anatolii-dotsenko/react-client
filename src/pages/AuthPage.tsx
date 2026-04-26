import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../components/forms/FormInput";

export function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Змінюємо стан на "авторизований"
    navigate("/account"); // Переходимо в кабінет
  };
  
  return (
    <div className="form-container">
      <h2>Вхід до системи</h2>
      <form onSubmit={handleSubmit} className="form">
        <FormInput label="Email" type="email" name="email" required />
        <FormInput label="Пароль" type="password" name="password" required />
        <button type="submit" className="form-btn">Увійти</button>
      </form>
    </div>
  );
}