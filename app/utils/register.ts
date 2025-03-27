import { api } from "~/service/api";

export async function registerUser(name: string, email: string, password: string) {
    const role = 'user'
    const result = await api("/auth/register", "POST", { name, email, password, role });

    // Validacion de creacion de usuario
    if (result.error) {
        return { error: "No se ha podido crear el usuario" };
    }

    return {
        data: result,
    };
}
