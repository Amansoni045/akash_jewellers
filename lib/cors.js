export const CORS_HEADER_KEY = "Access-Control-Allow-Origin";

export function corsHeaders() {
  const origin = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
