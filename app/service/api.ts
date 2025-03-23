// utils/api.ts
import { env } from "process";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5282/api";
import { getCookie } from "~/utils/cookies";

export async function api(
    endpoint: string,
    method: string = "GET",
    body?: object,
    headers: HeadersInit = {},
    request?: Request
    ) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = request ? await getCookie(request, "jwt") : null;

    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        };

    try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data?.message || "Error en la solicitud");
    }

    return data;
    } catch (error: any) {
    return { error: error.message };
    }
}