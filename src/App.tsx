import { useState, useEffect } from "react";
import "./App.css";
import { SliderComponent } from "./components/SliderComponent";

// Імпортуємо контейнер та символи інтерфейсів
import { container } from "./container";
import { IApiService } from "./services/IApiService";
import { IListRenderer } from "./services/IListRenderer";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [listType, setListType] = useState("fruits");

  // Дістаємо залежності (сервіси) з контейнера inversify
  const apiService = container.get<IApiService>(IApiService);
  const listRenderer = container.get<IListRenderer>(IListRenderer);

  const loadData = async (type: string) => {
    try {
      // 1. Отримуємо текстові назви списку через сервіс
      const fetchedItems = await apiService.getList(type);
      setItems(fetchedItems);

      // 2. Отримуємо імена файлів зображень через сервіс
      const fetchedFiles = await apiService.getImageFiles(type);
      setImageFiles(fetchedFiles);

      // 3. Формуємо URL першої картинки через сервіс
      if (fetchedFiles.length > 0) {
        setImageUrl(apiService.getImageUrl(type, fetchedFiles[0]));
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

  const handleItemClick = (itemName: string) => {
    const matchingFile = imageFiles.find((file) => file.startsWith(itemName));

    if (matchingFile) {
      // Формуємо URL картинки через сервіс
      setImageUrl(apiService.getImageUrl(listType, matchingFile));
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
            {/* Використовуємо впроваджений сервіс рендерингу (Renderer Service) */}
            {listRenderer.render(items, handleItemClick)}
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