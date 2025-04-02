import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

type Category = { id: number; name: string };
type Institution = { id: number; name: string };
const url = "http://localhost:5282/api/";

//carga categorias e insituciones
export const loader: LoaderFunction = async ({ request }) => {
  console.log("Ejecutando loader de AddOpportunity...");

  try {
    // Obtener el token desde las cookies del request
    const cookieHeader = request.headers.get("Cookie") || "";
    const cookiesMap = new Map(
      cookieHeader
        .split(";")
        .map((c) => c.trim().split("="))
        .filter((pair) => pair.length === 2) // Filtramos elementos inválidos
        .map(([key, value]) => [key, decodeURIComponent(value)]) // Decodifica valores de cookies
    );
    const token = cookiesMap.get("token");

    if (!token) {
      console.error("No hay token disponible");
      throw new Response("Unauthorized", { status: 401 });
    }

    const [categoriesRes, institutionsRes] = await Promise.all([
      fetch(`${url}Categories`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${url}Institutions`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const categoriesData = await categoriesRes.json();
    const institutionsData = await institutionsRes.json();

    //filtramos solo id y name
    const categories: Category[] = categoriesData.map((c: any) => ({
      id: c.id,
      name: c.name,
    }));

    const institutions: Institution[] = institutionsData.map((i: any) => ({
      id: i.id,
      name: i.name,
    }));

    return json({ categories, institutions });
  } catch (error) {
    console.error(" Error en el loader:", error);
    return json({ categories: [], institutions: [] });
  }
};

// action maneja la peticion de Post en el back de remix y este lo envia al backend

export const action: ActionFunction = async ({ request }) => {
  try {
    const cookieHeader = request.headers.get("Cookie") || "";
    const cookiesMap = new Map(
      cookieHeader
        .split(";")
        .map((c) => c.trim().split("="))
        .filter((pair) => pair.length === 2)
        .map(([key, value]) => [key, decodeURIComponent(value)])
    );
    const token = cookiesMap.get("token");

    if (!token) {
      return json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const newOpportunity = {
      name: formData.get("name"),
      observation: formData.get("observation"),
      type: formData.get("type"),
      description: formData.get("description"),
      requires: formData.get("requires"),
      guide: formData.get("guide"),
      adicional_dates: formData.get("adicional_dates"),
      service_channels: formData.get("service_channels"),
      manager: formData.get("manager"),
      modality: formData.get("modality"),
      category_id: Number(formData.get("categoryId")), // Asegurar que sea número
      institution_id: Number(formData.get("institutionId")), //Asegurar que sea número
    };

    const response = await fetch(`${url}Opportunities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newOpportunity, null, 2),
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      return json(
        { error: "No se pudo crear la oportunidad" },
        { status: 400 }
      );
    }

    return json({ success: "Oportunidad creada correctamente" });
  } catch (error) {
    return json({ error: "Error en el servidor" }, { status: 500 });
  }
};

export default function AddOpportunity() {
  const { categories, institutions } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  // Manejo de respuestas del servidor
  useEffect(() => {
    if (actionData?.error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: actionData.error,
      });
    }

    if (actionData?.success) {
      Swal.fire({
        title: "Éxito",
        text: actionData.success,
        icon: "success",
      });
    }
  }, [actionData]); // Solo se ejecuta cuando actionData cambia

  return (
    <form
      method="post"
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Crear Nueva Oportunidad
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="observation"
            className="block text-gray-700 text-sm font-medium"
          >
            Observación
          </label>
          <input
            id="observation"
            type="text"
            name="observation"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-gray-700 text-sm font-medium"
          >
            Tipo
          </label>
          <input
            id="type"
            type="text"
            name="type"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-medium"
          >
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="requires"
            className="block text-gray-700 text-sm font-medium"
          >
            Requisitos
          </label>
          <input
            id="requires"
            type="text"
            name="requires"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="guide"
            className="block text-gray-700 text-sm font-medium"
          >
            Guía
          </label>
          <input
            id="guide"
            type="text"
            name="guide"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="adicional_dates"
            className="block text-gray-700 text-sm font-medium"
          >
            Fecha
          </label>
          <input
            id="adicional_dates"
            type="text"
            name="adicional_dates"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="service_channels"
            className="block text-gray-700 text-sm font-medium"
          >
            Canales de Servicio
          </label>
          <input
            id="service_channels"
            type="text"
            name="service_channels"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="manager"
            className="block text-gray-700 text-sm font-medium"
          >
            Responsable
          </label>
          <input
            id="manager"
            type="text"
            name="manager"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="modality"
            className="block text-gray-700 text-sm font-medium"
          >
            Modalidad
          </label>
          <input
            id="modality"
            type="text"
            name="modality"
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Selección de Categoría */}
        <div>
          <label
            htmlFor="categoryId"
            className="block text-gray-700 text-sm font-medium"
          >
            Categoría
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Institución */}
        <div>
          <label
            htmlFor="institutionId"
            className="block text-gray-700 text-sm font-medium"
          >
            Institución
          </label>
          <select
            id="institutionId"
            name="institutionId"
            required
            className="w-full p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
          >
            {institutions.map((institution) => (
              <option key={institution.id} value={institution.id}>
                {institution.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-md shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
        Crear Oportunidad
      </button>
    </form>
  );
}
