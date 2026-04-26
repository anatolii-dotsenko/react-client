import { useState, useEffect } from "react";
import { container } from "../container";
import { IApiService } from "../services/IApiService";
import { IListRenderer } from "../services/IListRenderer";
import { SliderComponent } from "../components/SliderComponent";

export function ListPage() {
  const [items, setItems] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [listType, setListType] = useState("fruits");

  const apiService = container.get<IApiService>(IApiService);
  const listRenderer = container.get<IListRenderer>(IListRenderer);

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

  useEffect(() => {
    loadData("fruits");
  }, []);

  const handleItemClick = (itemName: string) => {
    const matchingFile = imageFiles.find((file) => file.startsWith(itemName));
    if (matchingFile) {
      setImageUrl(apiService.getImageUrl(listType, matchingFile));
    }
  };

  return (
    <div className="stack">
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
    </div>
  );
}