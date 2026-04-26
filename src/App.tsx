import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { ListPage } from "./pages/ListPage";
import { ImagesPage } from "./pages/ImagesPage";
import { AuthPage } from "./pages/AuthPage";
import { AccountPage } from "./pages/AccountPage";
import "./App.css";

function AppContent() {
  const { isAuth, logout } = useAuth();
  
  // Логіка теми з попереднього завдання
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [dark]);

  return (
    <div>
      <nav className="navbar">
        <Link to="/">📋 Список</Link>
        
        {/* Показуємо посилання на зображення лише для авторизованих */}
        {isAuth && <Link to="/images">🖼️ Зображення (Protected)</Link>}
        
        <Link to="/auth">{isAuth ? "🧑‍💻 Кабінет" : "🔑 Вхід"}</Link>
        
        <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
          {isAuth && (
            <button onClick={logout} className="theme-toggle" style={{ background: "#e74c3c", color: "white", border: "none", borderRadius: "4px" }}>
              Вийти
            </button>
          )}
          <button onClick={() => setDark(d => !d)} className="theme-toggle">
            {dark ? "☀️ Світла" : "🌙 Темна"}
          </button>
        </div>
      </nav>

      <main className="main" style={{ padding: "0 20px" }}>
        <Routes>
          <Route path="/" element={<ListPage />} />
          
          <Route path="/auth" element={isAuth ? <Navigate to="/account" /> : <AuthPage />} />
          
          <Route path="/account" element={
            <ProtectedRoute><AccountPage /></ProtectedRoute>
          } />
          
          {/* Зробили сторінку зображень захищеною */}
          <Route path="/images" element={
            <ProtectedRoute><ImagesPage /></ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
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