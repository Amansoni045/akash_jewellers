import axios from "axios";

const isLocal =
  typeof window !== "undefined" &&
  window.location.origin.includes("localhost");

const baseURL = isLocal
  ? `${process.env.NEXT_PUBLIC_LOCAL_URL}/api`
  : `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

const api = axios.create({
  baseURL,
});

export default api;