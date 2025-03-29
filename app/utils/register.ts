import { api } from "~/service/api";

export async function registerUser(name, email, password) {
    const role = "user";

    try {
        const result = await api("/auth/register", "POST", { name, email, password, role });

        if (!result || result.error || result.status !== 200) {
            return { error: result?.message || "No se ha podido crear el usuario" };
        }

        return { data: result };
    } catch (error) {
        return { error: "Error de conexión con el servidor" };
    }
}
