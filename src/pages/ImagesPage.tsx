import { useState, useEffect } from "react";
import { UploadForm } from "../components/UploadForm";

type GridFSImage = { id: string; name: string };

export function ImagesPage() {
  const [dbImages, setDbImages] = useState<GridFSImage[]>([]);

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
      loadDbImages();
    } catch (err) {
      console.error("Помилка видалення:", err);
    }
  };

  useEffect(() => {
    loadDbImages();
  }, []);

  return (
    <div className="stack">
      <div className="panel">
        <h2>База Даних (MongoDB GridFS)</h2>
        <UploadForm onUpload={loadDbImages} />
        
        <div className="gridfs-gallery" style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {dbImages.map((img) => (
            <div key={img.id} style={{ border: "1px solid var(--border)", padding: "10px", textAlign: "center", borderRadius: "8px" }}>
              <img 
                src={`http://localhost:3000/api/images/${img.id}`} 
                alt={img.name} 
                style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "4px" }} 
              />
              <p style={{ fontSize: "14px", margin: "8px 0" }}>{img.name}</p>
              <button onClick={() => handleDeleteDbImage(img.id)} style={{ background: "red", color: "white", padding: "4px 8px", cursor: "pointer", border: "none", borderRadius: "4px" }}>
                Видалити
              </button>
            </div>
          ))}
          {dbImages.length === 0 && <p>У базі даних немає зображень</p>}
        </div>
      </div>
    </div>
  );
}