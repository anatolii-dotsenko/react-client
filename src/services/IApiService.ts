export interface IApiService {
  getList(type: string): Promise<string[]>;
  getImageUrl(type: string, filename: string): string;
}

export const IApiService = Symbol("IApiService");
