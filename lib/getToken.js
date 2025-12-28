export function getToken() {
  if (typeof window === "undefined") return null;

  const cookieToken = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];

  return cookieToken || localStorage.getItem("token");
}
