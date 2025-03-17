import { api } from "~/service/api";
import { createCookie } from "@remix-run/node";

export async function loginUser(email: string, password: string) {
    const result = await api("/auth/login", "POST", { email, password });

    // Validacion de Credenciales
    if (result.error) {
        return { error: "Credenciales incorrectas" };
    }

    // Configurar cookie segura
    const authCookie = createCookie("token", {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
    });

    return {
        token: result.token,
        headers: {
        "Set-Cookie": await authCookie.serialize(result.token),
        },
    };
    }
