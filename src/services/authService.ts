import { api } from "./api";

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  username: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  storageUsed: number;
  storageLimit: number;
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async signup(data: SignupData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/signup", data);
    localStorage.setItem("authToken", response.data.token);
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", data);
    localStorage.setItem("authToken", response.data.token);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },

  logout() {
    localStorage.removeItem("authToken");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("authToken");
  },
};
