import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = new Map(cookieHeader?.split("; ").map((c) => c.split("=")));
  const token = cookies.get("token");
  if (!token) {
    return json({ error: "No autenticado" }, { status: 401 });
  }
  try {
    const response = await fetch("http://localhost:5282/api/Categories", {
      method: "GET",
      headers: { accept: "text/plain", Authorization: `Bearer: ${token}` },
    });
    if (!response.ok) {
      console.log("error al obtener la api");
    }
    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error("error al obtener la api", error);
    return json(["hola", "prueba"]);
  }
};

export default function Novedades() {
  const categorias = useLoaderData();

  return (
    <>
      <h1>pagina de oportunidades</h1>
      <div>
        {categorias.map((categoria) => (
          <div key={categoria.id}>{categoria.name}</div>
        ))}
      </div>
    </>
  );
}
