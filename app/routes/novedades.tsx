<<<<<<< HEAD
// import Carousel from "~/components/CarouselNews";

// import OpportunityCard from "~/components/OpportunityCard";

// export default function Novedades() {
//   {
//     /*simulo una lista de oportunidades */
//   }
//   const oportunidades = [
//     {
//       name: "Beca FullStack",
//       observation: "par mayores de 18",
//       type: "Nose",
//       description:
//         "Aprende desarrollo web fullstack con esta increíble beca... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque nihil quod aliquam sed ducimus facilis porro quibusdam nesciunt totam illo molestias magni placeat quisquam consectetur tenetur, qui eaque quae?",
//       requires: "sin experiencia",
//       guide: "enviar solicitud a correo correo@gmail.com",
//       adicional_dates: "ninguno",
//       service_channels: "URL",
//       manager: "Andres",
//       modality: "Remoto",
//     },
//     {
//       name: "Tecnico Sistema",
//       observation: "ninguna",
//       type: "Nose",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque nihil quod aliquam sed ducimus facilis porro quibusdam nesciunt totam illo molestias magni placeat quisquam consectetur tenetur, qui eaque quae?",
//       requires: "mayor de 18 y recidir en medellín",
//       guide: "enviar solicitud a correo correo@gmail.com",
//       adicional_dates: "https://www.udea.edu.co/wps/portal/udea/web/inicio",
//       service_channels: "URL",
//       manager: "Andres",
//       modality: "Remoto",
//     },
//   ];

//   return (
//     <>

//       <div className="flex flex-col gap-7 items-center justify-center p-px sp translate-y-40">

//         <h1 className="text-5xl font-bold p-8">NOVEDADES</h1>
//         <div className="relative flex justify-center  w-3/4 h-60">
//           <Carousel></Carousel>
//         </div>
//         <section className="space-y-3 border-2 border-gray-700 rounded-sm p-4 w-3/4">
//           <input
//             className="w-1/2 h-8 p-3"
//             type="text"
//             placeholder="Busca tu proxima oportunidad"
//           />
//           <div className="flex items-center">
//             <label
//               className="border border-gray-300/50 bg-[#dadee2] "
//               htmlFor="filtrar"
//             >
//               ¡Filtra tu búsqueda!
//             </label>
//             <input
//               className=" border border-[#dadee2]"
//               type="date"
//               id="filtrar"
//             />
//           </div>
//           <div className="flex">
//             <div>
//               <label className="search-label" htmlFor="ubication">
//                 Ubicación
//               </label>
//               <select className="search-select" name="ubication" id="ubication">
//                 <option value="option1">Opción 1</option>
//                 <option value="option2">Opción 2</option>
//                 <option value="option3">Opción 3</option>
//               </select>
//             </div>
//             <div>
//               <label className="search-label" htmlFor="typeOpportunity">
//                 Tipo de oportunidad
//               </label>
//               <select
//                 className="search-select"
//                 name="typeOpportunity"
//                 id="typeOpportunity"
//               >
//                 <option value="option1">Opción 1</option>
//                 <option value="option2">Opción 2</option>
//                 <option value="option3">Opción 3</option>
//               </select>
//             </div>
//             <div>
//               <label className="search-label" htmlFor="sector">
//                 Sector
//               </label>
//               <select className="search-select" name="sector" id="sector">
//                 <option value="option1">Opción 1</option>
//                 <option value="option2">Opción 2</option>
//                 <option value="option3">Opción 3</option>
//               </select>
//             </div>
//           </div>
//           <div className="flex justify-end ">
//             <button
//               className="search-button bg-orange-400 hover:scale-105 hover:shadow-lg"
//               type="button"
//             >
//               Búsqueda
//             </button>
//             <button
//               className="search-button bg-gray-500 hover:scale-105 hover:shadow-lg"
//               type="button"
//             >
//               Limpiar
//             </button>
//           </div>
//         </section>
//         <section className="w-full md:w-3/4 min-h-[256px] flex-grow mb-44 px-4">
//           <div className="grid grid-cols-3 gap-4 w-full ">
//           {oportunidades.map((opportunity, index) => (
//           <OpportunityCard key={index} opportunity={opportunity} />
//         ))}
//           </div>
//         </section>
//       </div>
      
//     </>
//   );
// }

import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Carousel from "~/components/CarouselNews";
import OpportunityCard from "~/components/OpportunityCard";
//import {Opportunity} from "~/types/opportunityTable";
import { api } from "~/service/api";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const data = await api("/Opportunities", "GET", undefined, {}, request);
    // bucle oportunidades.institucion
    // const data = await api("/Opportunities", "GET", undefined, {}, request);
    if (!data || !Array.isArray(data)) {
      console.error("Error: La API no devolvió un array válido.", data);
      return json([]); // Devolver un array vacío si la API devuelve algo inesperado
    }

    return json(data);
  } catch (error) {
    console.error("No se pudo conectar al backend:", error);
    return json([]); // Devolver un array vacío si hay un error de conexión
  }
};
 
export default function Novedades() {
  const opportunities = useLoaderData();
  return (
    <>
 
      <div className="flex flex-col gap-7 items-center justify-center p-px sp translate-y-20">
 
        <h1 className="text-5xl font-bold p-8">NOVEDADES</h1>
        <div className="relative flex justify-center  w-3/4 h-60">
          <Carousel></Carousel>
        </div>
        <section className="space-y-3 border-2 border-gray-700 rounded-sm p-4 w-4/5">
          <input
            className="w-1/2 h-8 p-3"
            type="text"
            placeholder="Busca tu proxima oportunidad"
          />
          <div className="flex items-center">
            <label
              className="border border-gray-300/50 bg-[#dadee2] "
              htmlFor="filtrar"
            >
              ¡Filtra tu búsqueda!
            </label>
            <input
              className=" border border-[#dadee2]"
              type="date"
              id="filtrar"
            />
          </div>
          <div className="flex">
            <div>
              <label className="search-label" htmlFor="ubication">
                Ubicación
              </label>
              <select className="search-select" name="ubication" id="ubication">
                <option value="option1">Opción 1</option>
                <option value="option2">Opción 2</option>
                <option value="option3">Opción 3</option>
              </select>
            </div>
            <div>
              <label className="search-label" htmlFor="typeOpportunity">
                Tipo de oportunidad
              </label>
              <select
                className="search-select"
                name="typeOpportunity"
                id="typeOpportunity"
              >
                <option value="option1">Opción 1</option>
                <option value="option2">Opción 2</option>
                <option value="option3">Opción 3</option>
              </select>
            </div>
            <div>
              <label className="search-label" htmlFor="sector">
                Sector
              </label>
              <select className="search-select" name="sector" id="sector">
                <option value="option1">Opción 1</option>
                <option value="option2">Opción 2</option>
                <option value="option3">Opción 3</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end ">
            <button
              className="search-button bg-orange-400 hover:scale-105 hover:shadow-lg"
              type="button"
            >
              Búsqueda
            </button>
            <button
              className="search-button bg-gray-500 hover:scale-105 hover:shadow-lg"
              type="button"
            >
              Limpiar
            </button>
          </div>
        </section>
        <section className="w-full md:w-11/12 min-h-[256px] flex-grow mb-44 px-4">
          <div className="grid grid-cols-4 gap-10 w-full ">
          {opportunities.map((opportunity, index) => (
          <OpportunityCard key={index} opportunity={opportunity} />
        ))}
          </div>
        </section>
      </div>
     
    </>
=======
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Carousel from "~/components/CarouselNews";
import OpportunityCard from "~/components/OpportunityCard";
import { api } from "~/service/api";
import { HiMagnifyingGlass } from "react-icons/hi2";

export const loader: LoaderFunction = async ({ request }) => {
  try {
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

export default function Novedades() {
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
          {/* Icono de lupa */}
          <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          
          {/* Campo de búsqueda */}
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
>>>>>>> 471b3d698ad77644719d5baf3cd60478b9c8bc19
  );
}