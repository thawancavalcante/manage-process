const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

export default api;
