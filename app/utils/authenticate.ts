// utils/authenticate.ts
import { getCookie } from "./cookies";

export async function isAuthenticated(request: Request) {
    const token = await getCookie(request, "token");
    return !!token;
}
