import axios from "axios";

const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: base,
  // no cookies because you said "don't use cookies anywhere"
});

export default api;
