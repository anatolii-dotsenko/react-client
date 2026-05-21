import { useEffect, useState } from "react";
import { imageService, type Image } from "../services/imageService";
import { UploadForm } from "../components/UploadForm";
import { SliderComponent } from "../components/SliderComponent";

export const ImagesPage = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async () => {
    try {
      const data = await imageService.getImages();
      setImages(data);
    } catch (error) {
      console.error("Помилка завантаження зображень:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await imageService.deleteImage(id);
      fetchImages(); // Оновлюємо список після видалення
    } catch (error) {
      console.error("Помилка видалення:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1>Персональна Галерея</h1>
      <UploadForm onUploadSuccess={fetchImages} />

      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {images.length === 0 ? (
          <p>Ваша галерея поки що порожня.</p>
        ) : (
          images.map((img) => (
            <div
              key={img.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <img
                src={imageService.getImageUrl(img.id)}
                alt={img.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <p style={{ fontSize: "14px", margin: "10px 0" }}>{img.name}</p>
              <button
                onClick={() => handleDelete(img.id)}
                style={{
                  background: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Видалити
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: "40px" }}>
        <SliderComponent />
      </div>
    </div>
  );
};
