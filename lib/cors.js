export const CORS_HEADER_KEY = "Access-Control-Allow-Origin";

export function corsHeaders() {
  // FRONTEND domain to allow (set in Vercel as NEXT_PUBLIC_APP_ORIGIN)
  const origin = process.env.NEXT_PUBLIC_APP_ORIGIN || "http://localhost:3000";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

// For app route handlers we return these headers with NextResponse
