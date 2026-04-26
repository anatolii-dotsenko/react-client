import { injectable } from "inversify";
import type { IApiService } from "./IApiService";

@injectable()
export class ApiService implements IApiService {
  private base = "http://localhost:3000";

  async getList(type: string): Promise<string[]> {
    const res = await fetch(`${this.base}/api/list/${type}`);
    const data = await res.json();
    return data.items || [];
  }

  async getImageFiles(type: string): Promise<string[]> {
    const res = await fetch(`${this.base}/api/list/${type}/images`);
    const data = await res.json();
    return data.images || [];
  }

  getImageUrl(type: string, filename: string): string {
    return `${this.base}/images/${type}/${filename}`;
  }
}