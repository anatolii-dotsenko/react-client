import React from "react";

export function UploadForm({ onUpload }: { onUpload: () => void }) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    await fetch("http://localhost:3000/api/images", {
      method: "POST", 
      body: form,
    });
    
    // Очистити інпут після завантаження
    e.currentTarget.reset();
    onUpload();
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input type="file" name="image" accept="image/*" required />
      <button type="submit">Завантажити у GridFS</button>
    </form>
  );
}