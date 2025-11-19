import axios from "axios";

const base = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: base,
});

export default api;
