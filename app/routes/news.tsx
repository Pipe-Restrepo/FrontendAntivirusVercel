import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Carousel from "~/components/CarouselNews";
import OpportunityCard from "~/components/OpportunityCard";
import Filters from "~/components/Filters";
import { api } from "~/service/api";
import { PiStudentFill } from "react-icons/pi";
import { LuNotebookPen } from "react-icons/lu";

// Loader para obtener las oportunidades desde el backend
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const opportunities = await api("/Opportunities", "GET", undefined, {}, request);
    
    if (!opportunities || !Array.isArray(opportunities)) {
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
      <div className="flex flex-col mb-4 self-start text-left w-3/4 ml-48">
        <div className="flex items-center space-x-4 mt-12">
          <LuNotebookPen size={48} className="text-[#2C395B]" />
          <h1 className="font-semibold text-3xl text-[#1D1856]">Novedades</h1>
        </div>
        <small className="text-gray-600 mt-2 text-2xl">
          Explora las últimas novedades educativas y mantente al día con información de tendencias para el aprendizaje.
        </small>
      </div>
      <div className="relative flex justify-center w-3/4 h-60">
        <Carousel />
      </div>

      {/* Componente de filtros */}
      <Filters onFilterChange={setFilters} />

      <div className="flex flex-col mb-4">
        <div className="flex items-center space-x-4">
          <PiStudentFill size={48} className="text-[#2C395B]" />
          <h1 className="font-semibold text-3xl text-[#1D1856]">¡Oportunidades Para Estudiar!</h1>
        </div>
        <small className='text-gray-600 mt-2 text-2xl'> Descubre nuevas oportunidades para estudiar y accede a becas, cursos y bootcamps que impulsarán tu futuro académico.</small>
      </div>

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
