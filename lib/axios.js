import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://akash-jewellers.vercel.app/api",
});

export default api;
