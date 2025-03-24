import { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface FiltersProps {
  onFilterChange: (filters: {
    searchName: string;
    searchUbication: string;
    searchDate: string;
    searchType: string;
  }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [searchName, setSearchName] = useState("");
  const [searchUbication, setSearchUbication] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchType, setSearchType] = useState("");

  // Función para actualizar los filtros y enviarlos al padre
  const handleFilterChange = () => {
    onFilterChange({ searchName, searchUbication, searchDate, searchType });
  };

  return (
    <section className="space-y-3 shadow-lg border rounded-lg p-4 w-4/5">
      {/* Campo de búsqueda por nombre */}
      <div className="relative w-full">
        <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          className="w-full h-10 pl-10 pr-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          type="text"
          placeholder="Busca tu próxima oportunidad"
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            handleFilterChange();
          }}
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
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e.target.value);
              handleFilterChange();
            }}
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
            placeholder="Busca tu ubicación"
            value={searchUbication}
            onChange={(e) => {
              setSearchUbication(e.target.value);
              handleFilterChange();
            }}
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
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              handleFilterChange();
            }}
          />
        </div>
      </div>

      {/* Botón para limpiar filtros */}
      <div className="flex justify-end">
        <button
          className="w-1/6 bg-gray-400 font-black text-white p-2 rounded-lg font-bold hover:bg-yellow-600 mx-2"
          type="button"
          onClick={() => {
            setSearchName("");
            setSearchUbication("");
            setSearchDate("");
            setSearchType("");
            onFilterChange({ searchName: "", searchUbication: "", searchDate: "", searchType: "" });
          }}
        >
          Limpiar
        </button>
      </div>
    </section>
  );
}
