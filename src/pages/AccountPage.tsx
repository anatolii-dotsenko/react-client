import { useAuth } from "../context/AuthContext";

export function AccountPage() {
  const { logout } = useAuth();

  return (
    <div className="panel" style={{ textAlign: "center", padding: "40px" }}>
      <h2>🧑‍💻 Особистий кабінет</h2>
      <p>Вітаємо! Ви успішно авторизувалися в системі.</p>
      <br />
      <button onClick={logout} className="form-btn" style={{ background: "#333" }}>
        Вийти з акаунта
      </button>
    </div>
  );
}