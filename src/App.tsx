import { useState, useEffect } from "react";
import "./App.css";
import { SliderComponent } from "./components/SliderComponent";

const API = "http://localhost:3000";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<string[]>([]); // Зберігаємо масив файлів з розширеннями
  const [imageUrl, setImageUrl] = useState("");
  const [listType, setListType] = useState("fruits");

  const loadData = async (type: string) => {
    try {
      // 1. Отримуємо текстові назви списку
      const resList = await fetch(`${API}/api/list/${type}`);
      const dataList = await resList.json();
      setItems(dataList.items || []);

      // 2. Отримуємо імена файлів зображень
      const resImg = await fetch(`${API}/api/list/${type}/images`);
      const dataImg = await resImg.json();
      const files = dataImg.images || [];
      setImageFiles(files); // Зберігаємо файли в стейт

      // 3. За замовчуванням показуємо першу картинку
      if (files.length > 0) {
        setImageUrl(`${API}/images/${type}/${files[0]}`);
      } else {
        setImageUrl("");
      }
    } catch (err) {
      console.error("Помилка:", err);
      setItems([]);
      setImageFiles([]);
    }
  };

  useEffect(() => {
    loadData("fruits");
  }, []);

  // Функція обробки кліку по елементу списку
  const handleItemClick = (itemName: string) => {
    // Шукаємо файл, який починається з назви елемента (наприклад, "Манго" знайде "Манго.webp")
    const matchingFile = imageFiles.find((file) => file.startsWith(itemName));

    if (matchingFile) {
      setImageUrl(`${API}/images/${listType}/${matchingFile}`);
    } else {
      console.warn(`Картинку для ${itemName} не знайдено`);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Клієнт-сервер демо</h1>
      </header>
      <main className="main">
        <div className="stack">
          <div className="panel">
            <h2>Список ({listType === "fruits" ? "Фрукти" : "Тварини"})</h2>
            <div className="controls">
              <button onClick={() => { setListType("fruits"); loadData("fruits"); }}>
                Фрукти
              </button>
              <button onClick={() => { setListType("animals"); loadData("animals"); }}>
                Тварини
              </button>
            </div>
            {/* Оновлений список із обробником кліку */}
            <ul className="clickable-list">
              {Array.isArray(items) && items.map((item, i) => (
                <li 
                  key={i} 
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel">
            <h2>Зображення</h2>
            {imageUrl ? (
              <img src={imageUrl} alt="Фото з сервера" />
            ) : (
              <p>Зображення не знайдено</p>
            )}
          </div>
          <SliderComponent />
        </div>
      </main>
    </div>
  );
}

export default App;