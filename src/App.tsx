import { useState, useEffect } from "react";
import "./App.css";
import { SliderComponent } from "./components/SliderComponent";
import { UploadForm } from "./components/UploadForm"; // Імпорт нової форми

import { container } from "./container";
import { IApiService } from "./services/IApiService";
import { IListRenderer } from "./services/IListRenderer";

// Тип для GridFS картинок
type GridFSImage = { id: string; name: string };

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [listType, setListType] = useState("fruits");

  // Стейт для зображень із бази даних (GridFS)
  const [dbImages, setDbImages] = useState<GridFSImage[]>([]);

  const apiService = container.get<IApiService>(IApiService);
  const listRenderer = container.get<IListRenderer>(IListRenderer);

  // Стара логіка...
  const loadData = async (type: string) => {
    try {
      const fetchedItems = await apiService.getList(type);
      setItems(fetchedItems);
      const fetchedFiles = await apiService.getImageFiles(type);
      setImageFiles(fetchedFiles);
      if (fetchedFiles.length > 0) {
        setImageUrl(apiService.getImageUrl(type, fetchedFiles[0]));
      } else {
        setImageUrl("");
      }
    } catch (err) {
      console.error("Помилка:", err);
    }
  };

  // Нова логіка для GridFS
  const loadDbImages = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/images");
      const data = await res.json();
      setDbImages(data || []);
    } catch (err) {
      console.error("Помилка завантаження списку з БД:", err);
    }
  };

  const handleDeleteDbImage = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/images/${id}`, { method: "DELETE" });
      loadDbImages(); // Оновлюємо список
    } catch (err) {
      console.error("Помилка видалення:", err);
    }
  };

  useEffect(() => {
    loadData("fruits");
    loadDbImages(); // Завантажуємо зображення з БД при старті
  }, []);

  const handleItemClick = (itemName: string) => {
    const matchingFile = imageFiles.find((file) => file.startsWith(itemName));
    if (matchingFile) {
      setImageUrl(apiService.getImageUrl(listType, matchingFile));
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Клієнт-сервер демо</h1>
      </header>
      <main className="main">
        <div className="stack">
          {/* Старий контент */}
          <div className="panel">
            <h2>Список ({listType === "fruits" ? "Фрукти" : "Тварини"})</h2>
            <div className="controls">
              <button onClick={() => { setListType("fruits"); loadData("fruits"); }}>Фрукти</button>
              <button onClick={() => { setListType("animals"); loadData("animals"); }}>Тварини</button>
            </div>
            {listRenderer.render(items, handleItemClick)}
          </div>
          
          <div className="panel">
            <h2>Статичне Зображення</h2>
            {imageUrl ? <img src={imageUrl} alt="Фото з сервера" /> : <p>Не знайдено</p>}
          </div>

          <SliderComponent />

          {/* Новий контент для GridFS */}
          <div className="panel">
            <h2>База Даних (MongoDB GridFS)</h2>
            <UploadForm onUpload={loadDbImages} />
            
            <div className="gridfs-gallery" style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {dbImages.map((img) => (
                <div key={img.id} style={{ border: "1px solid #ccc", padding: "5px", textAlign: "center" }}>
                  <img 
                    src={`http://localhost:3000/api/images/${img.id}`} 
                    alt={img.name} 
                    style={{ width: "100px", height: "100px", objectFit: "cover" }} 
                  />
                  <p style={{ fontSize: "12px", margin: "5px 0" }}>{img.name}</p>
                  <button onClick={() => handleDeleteDbImage(img.id)} style={{ background: "red", color: "white", padding: "2px 5px", fontSize: "12px" }}>Видалити</button>
                </div>
              ))}
              {dbImages.length === 0 && <p>У базі даних немає зображень</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;