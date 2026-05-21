import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { ImagesPage } from "./pages/ImagesPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { AccountPage } from "./pages/AccountPage";

function AppContent() {
  // Використовуємо isAuthenticated та isLoading з нового AuthContext
  const { isAuthenticated, logout, isLoading } = useAuth();

  // Логіка теми з попереднього завдання
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [dark]);

  // Показуємо лоадер, поки перевіряється токен авторизації
  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Завантаження...
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        {/* Головне посилання тепер веде на галерею */}
        <Link to="/images">🖼️ Галерея</Link>

        {/* Навігація в залежності від статусу авторизації */}
        {isAuthenticated ? (
          <Link to="/account">🧑‍💻 Кабінет</Link>
        ) : (
          <>
            <Link to="/login">🔑 Вхід</Link>
            <Link to="/signup">📝 Реєстрація</Link>
          </>
        )}

        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          {isAuthenticated && (
            <button
              onClick={logout}
              className="theme-toggle"
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Вийти
            </button>
          )}
          <button
            onClick={() => setDark((d) => !d)}
            className="theme-toggle"
            style={{ cursor: "pointer" }}
          >
            {dark ? "☀️ Світла" : "🌙 Темна"}
          </button>
        </div>
      </nav>

      <main className="main" style={{ padding: "0 20px" }}>
        <Routes>
          {/* Публічні маршрути */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/images" /> : <LoginPage />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/images" /> : <SignUpPage />
            }
          />

          {/* Захищені маршрути */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/images"
            element={
              <ProtectedRoute>
                <ImagesPage />
              </ProtectedRoute>
            }
          />

          {/* Редиректи */}
          <Route path="/" element={<Navigate to="/images" />} />
          <Route path="*" element={<Navigate to="/images" />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
