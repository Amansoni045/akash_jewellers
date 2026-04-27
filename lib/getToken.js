export function getToken() {
  if (typeof window === "undefined") return null;

  const localToken = localStorage.getItem("token");
  if (localToken) return localToken;

  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")
    .slice(1)
    .join("=");

  return cookieToken ? decodeURIComponent(cookieToken) : null;
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
}
