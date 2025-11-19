export const CORS_HEADER_KEY = "Access-Control-Allow-Origin";

export function corsHeaders(req) {
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SERVER_URL,
    process.env.NEXT_PUBLIC_LOCAL_URL,
    process.env.NEXT_PUBLIC_DEPLOYMENT_URL,
  ];

  const origin = req?.headers?.get("origin");
 
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : null;

  return {
    "Access-Control-Allow-Origin": allowedOrigin || "",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
