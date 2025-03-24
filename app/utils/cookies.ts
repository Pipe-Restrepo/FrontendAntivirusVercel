import { parse } from "cookie";
import { createCookie } from "@remix-run/node";

export const tokenCookie = createCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
});

export async function getCookie(request: Request, name: string) {
  const cookies = parse(request.headers.get("Cookie") || "");
  return cookies[name] || null;
}