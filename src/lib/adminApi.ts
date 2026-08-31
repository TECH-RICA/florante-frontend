import axios from "axios";
import { ADMIN_LOGIN, isAdminPath } from "./adminPaths";

const TOKEN_KEY = "florante_admin_token";

export const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:8000/api"}/admin`,
  headers: { "Content-Type": "application/json" },
});

adminApi.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && isAdminPath(window.location.pathname)) {
      clearAdminToken();
      if (window.location.pathname !== ADMIN_LOGIN) {
        window.location.href = ADMIN_LOGIN;
      }
    }
    return Promise.reject(err);
  }
);

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAdminAuthed(): boolean {
  return !!getAdminToken();
}
