import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ListPage } from "./pages/ListPage";
import { ImagesPage } from "./pages/ImagesPage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import "./App.css";

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [dark]);

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <Link to="/list">📋 Список</Link>
          <Link to="/images">🖼️ Зображення</Link>
          <Link to="/login">🔑 Вхід</Link>
          <Link to="/signup">📝 Реєстрація</Link>
          <button onClick={() => setDark(d => !d)} className="theme-toggle">
            {dark ? "☀️ Світла" : "🌙 Темна"}
          </button>
        </nav>
        
        <main className="main" style={{ padding: "0 20px" }}>
          <Routes>
            <Route path="/list" element={<ListPage />} />
            <Route path="/images" element={<ImagesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="*" element={<ListPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;