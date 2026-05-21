import { useState } from "react";
import { imageService } from "../services/imageService";

interface Props {
  onUploadSuccess: () => void;
}

export const UploadForm = ({ onUploadSuccess }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    try {
      await imageService.uploadImage(file);
      setFile(null); // Очищуємо форму
      onUploadSuccess(); // Кажемо батьківському компоненту оновити список
    } catch (error: any) {
      alert(error.response?.data?.error || "Помилка завантаження");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      style={{ display: "flex", gap: "10px", alignItems: "center" }}
    >
      <input
        type="file"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        accept="image/*"
      />
      <button
        type="submit"
        disabled={!file || isUploading}
        style={{ cursor: "pointer" }}
      >
        {isUploading ? "Завантажується..." : "Завантажити"}
      </button>
    </form>
  );
};
