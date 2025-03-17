import { parse } from "cookie";

export async function getCookie(request: Request, name: string) {
    const cookies = parse(request.headers.get("Cookie") || "");
    return cookies[name] || null;
}
