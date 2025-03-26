import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Carousel from "~/components/CarouselNews";
import OpportunityCard from "~/components/OpportunityCard";
import Filters from "~/components/Filters";
import { api } from "~/service/api";

// Loader para obtener las oportunidades desde el backend
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const opportunities = await api("/Opportunities", "GET", undefined, {}, request);

    if (!opportunities || !Array.isArray(opportunities)) {
      console.error("Error: La API no devolvió un array válido.", opportunities);
      return json([]);
    }

    const updatedOpportunities = await Promise.all(
      opportunities.map(async (opportunity) => {
        try {
          const institution = await api(`/Institutions/${opportunity.institutionId}`, "GET", undefined, {}, request);
          return { ...opportunity, institution };
        } catch (error) {
          console.error(`Error obteniendo la institución ${opportunity.institutionId}:`, error);
          return { ...opportunity, institution: null };
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

  // Estado para filtros
  const [filters, setFilters] = useState({
    searchName: "",
    searchUbication: "",
    searchDate: "",
    searchType: "",
  });

  // Filtrar oportunidades
  const filteredOpportunities = opportunities.filter((opportunity) => {
    return (
      (filters.searchName === "" || opportunity.name.toLowerCase().includes(filters.searchName.toLowerCase())) &&
      (filters.searchUbication === "" ||
        (opportunity.institution?.ubication || "").toLowerCase().includes(filters.searchUbication.toLowerCase())) &&
      (filters.searchDate === "" || (opportunity.adicionalDates || "").includes(filters.searchDate)) &&
      (filters.searchType === "" || opportunity.type.toLowerCase().includes(filters.searchType.toLowerCase()))
    );
  });

  return (
    <div className="flex flex-col gap-7 items-center justify-center p-px sp translate-y-20">
      <h1 className="text-5xl font-bold p-8">NOVEDADES</h1>
      <div className="relative flex justify-center w-3/4 h-60">
        <Carousel />
      </div>

      {/* Componente de filtros */}
      <Filters onFilterChange={setFilters} />

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
