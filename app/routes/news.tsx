import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Carousel from "~/components/CarouselNews";
import OpportunityCard from "~/components/OpportunityCard";
import { api } from "~/service/api";
import { HiMagnifyingGlass } from "react-icons/hi2";

// Loader para obtener las oportunidades desde el backend
export const loader: LoaderFunction = async ({ request }) => {
  try {
    // Obtener las oportunidades de la API
    const opportunities = await api("/Opportunities", "GET", undefined, {}, request);

    if (!opportunities || !Array.isArray(opportunities)) {
      console.error("Error: La API no devolvió un array válido.", opportunities);
      return json([]);
    }

    // Obtener los datos de cada institución en paralelo
    const updatedOpportunities = await Promise.all(
      opportunities.map(async (opportunity) => {
        try {
          const institution = await api(`/Institutions/${opportunity.institutionId}`, "GET", undefined, {}, request);
          return { ...opportunity, institution }; // Agrega la institución a la oportunidad
        } catch (error) {
          console.error(`Error obteniendo la institución ${opportunity.institutionId}:`, error);
          return { ...opportunity, institution: null }; // En caso de error, asigna null
        }
      })
    );

    return json(updatedOpportunities);
  } catch (error) {
    console.error("No se pudo conectar al backend:", error);
    return json([]);
  }
};

// Componente principal
export default function News() {
  const opportunities = useLoaderData();
  
  // Estados para filtros
  const [searchName, setSearchName] = useState("");
  const [searchUbication, setSearchUbication] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchType, setSearchType] = useState("");

  // Filtrar oportunidades
  const filteredOpportunities = opportunities.filter(opportunity => {
    return (
      (searchName === "" || opportunity.name.toLowerCase().includes(searchName.toLowerCase())) &&
      (searchUbication === "" || (opportunity.institution?.ubication || "").toLowerCase().includes(searchUbication.toLowerCase())) &&
      (searchDate === "" || (opportunity.adicionalDates || "").includes(searchDate)) &&
      (searchType === "" || opportunity.type.toLowerCase().includes(searchType.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col gap-7 items-center justify-center p-px sp translate-y-20">
      <h1 className="text-5xl font-bold p-8">NOVEDADES</h1>
      <div className="relative flex justify-center w-3/4 h-60">
        <Carousel />
      </div>
      <section className="space-y-3 shadow-lg border rounded-lg p-4 w-4/5">
        {/* Campo de búsqueda por nombre */}
        <div className="relative w-full">
          <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            className="w-full h-10 pl-10 pr-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            placeholder="Busca tu próxima oportunidad"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        {/* Filtros */}
        <div className="w-full flex gap-4">
          {/* Fecha */}
          <div className="flex items-center border border-black rounded-md overflow-hidden w-1/3">
            <span className="bg-gray-200 px-3 py-2 text-black font-semibold text-sm whitespace-nowrap">
              ¡Filtra tu búsqueda!
            </span>
            <input
              className="w-full h-10 px-3 border-l border-black focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-400"
              type="date"
              id="filtrar"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>

          {/* Ubicación */}
          <div className="relative flex items-center border border-black rounded-md overflow-hidden w-1/3">
            <span className="bg-gray-200 px-3 py-2 text-black font-semibold text-sm whitespace-nowrap">
              Ubicación
            </span>
            <HiMagnifyingGlass className="absolute left-28 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              className="w-full h-10 px-12 border-l border-black focus:outline-none focus:ring-2 focus:ring-gray-400"
              type="text"
              id="ubication"
              placeholder="Busca tu ubicación"
              value={searchUbication}
              onChange={(e) => setSearchUbication(e.target.value)}
            />
          </div>

          {/* Tipo de oportunidad */}
          <div className="relative flex items-center border border-black rounded-md overflow-hidden w-1/3">
            <span className="bg-gray-200 px-3 py-2 text-black font-semibold text-sm whitespace-nowrap">
              Tipo de oportunidad
            </span>
            <HiMagnifyingGlass className="absolute left-44 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              className="w-full h-10 px-12 border-l border-black focus:outline-none focus:ring-2 focus:ring-gray-400"
              type="text"
              placeholder="Busca tu oportunidad"
              id="typeOpportunity"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            />
          </div>
        </div>
        {/* Botones */}
        <div className="flex justify-end">
          <button
            className="w-1/6 bg-gray-400 font-black text-white p-2 rounded-lg font-bold hover:bg-yellow-600 mx-2"
            type="button"
            onClick={() => {
              setSearchName("");
              setSearchUbication("");
              setSearchDate("");
              setSearchType("");
            }}
          >
            Limpiar
          </button>
        </div>
      </section>
      {/* Oportunidades filtradas */}
      <section className="w-full md:w-11/12 min-h-[256px] flex-grow mb-44 px-4">
        <div className="grid grid-cols-4 gap-10 w-full">
          {filteredOpportunities.map((opportunity, index) => (
            <OpportunityCard key={index} opportunity={opportunity} />
          ))}
        </div>
      </section>
    </div>
  );
}
