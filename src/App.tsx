import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ListPage } from "./pages/ListPage";
import { ImagesPage } from "./pages/ImagesPage";
import "./App.css";

function App() {
  // Читаємо попередню тему з localStorage (щоб вона зберігалась при оновленні сторінки)
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const theme = dark ? "dark" : "light";
    localStorage.setItem("theme", theme);
    // Встановлюємо атрибут на body, щоб фон сторінки теж мінявся
    document.body.setAttribute("data-theme", theme);
  }, [dark]);

  return (
    <BrowserRouter>
      <div>
        <nav className="navbar">
          <Link to="/list">📋 Список (Статика + Slider)</Link>
          <Link to="/images">🖼️ Зображення (MongoDB)</Link>
          <button onClick={() => setDark(d => !d)} className="theme-toggle">
            {dark ? "☀️ Світла" : "🌙 Темна"}
          </button>
        </nav>
        
        <main className="main" style={{ padding: "0 20px" }}>
          <Routes>
            <Route path="/list" element={<ListPage />} />
            <Route path="/images" element={<ImagesPage />} />
            {/* Перенаправлення за замовчуванням */}
            <Route path="*" element={<ListPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;