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
    console.log ("impimientdo oportunities" + opportunities)

    if (!opportunities || !Array.isArray(opportunities)) {
      console.error("Error: La API no devolvió un array válido.", opportunities);
      return json([]);
    }

    const updatedOpportunities = await Promise.all(
      opportunities.map(async (opportunity) => {
        try {
          const institution = await api(`/Institutions/${opportunity.institution_id}`, "GET", undefined, {}, request);
          return { ...opportunity, institution };
        } catch (error) {
          console.error(`Error obteniendo la institución ${opportunity.institution_id}:`, error);
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
    startDate: "",
    endDate: "",
    searchType: "",
  });

  // Filtrar oportunidades
  const filteredOpportunities = opportunities.filter((opportunity) => {
    const opportunityDate = opportunity.adicional_dates ? new Date(opportunity.adicional_dates) : null;
    const start = filters.startDate ? new Date(filters.startDate) : null;
    const end = filters.endDate ? new Date(filters.endDate) : null;
  
    return (
      (filters.searchName === "" || opportunity.name.toLowerCase().includes(filters.searchName.toLowerCase())) &&
      (filters.searchUbication === "" ||
        (opportunity.institution?.ubication || "").toLowerCase().includes(filters.searchUbication.toLowerCase())) &&
      (filters.searchType === "" || opportunity.type.toLowerCase().includes(filters.searchType.toLowerCase())) &&
      (!opportunityDate || 
        (!start || opportunityDate >= start) && 
        (!end || opportunityDate <= end))
    );
  });

  return (
    <div className="flex flex-col gap-7 items-center justify-center p-px sp ">
       <div className="bg-white w-full h-7 "></div> {/* para la cabecera */}
      <h1 className=" p-8">Novedades</h1>
      <div className="relative flex justify-center w-3/4 h-60">
        <Carousel />
      </div>

      {/* Componente de filtros */}
      <Filters onFilterChange={setFilters} />

      {/* Oportunidades filtradas */}
      <section className="w-full md:w-11/12 min-h-[256px] flex-grow mb-4 px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-10 w-full">
          {filteredOpportunities.map((opportunity, index) => (
            <OpportunityCard key={index} opportunity={opportunity} />
          ))}
        </div>
      </section>
    </div>
  );
}
