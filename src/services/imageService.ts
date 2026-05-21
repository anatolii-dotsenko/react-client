import { api } from "./api";

export interface Image {
  id: string;
  name: string;
  size?: number;
}

export const imageService = {
  async uploadImage(file: File): Promise<any> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await api.post("/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async getImages(): Promise<Image[]> {
    const response = await api.get<Image[]>("/images");
    return response.data;
  },

  async deleteImage(id: string): Promise<void> {
    await api.delete(`/images/${id}`);
  },

  getImageUrl(id: string): string {
    return `${api.defaults.baseURL}/images/${id}`;
  },
};
