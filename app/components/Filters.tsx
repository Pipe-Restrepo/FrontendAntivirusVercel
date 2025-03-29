import { useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

interface FiltersProps {
  onFilterChange: (filters: {
    searchName: string;
    searchUbication: string;
    startDate: string;
    endDate: string;
    searchType: string;
  }) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [searchName, setSearchName] = useState("");
  const [searchUbication, setSearchUbication] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchType, setSearchType] = useState("");

  useEffect(() => {
    onFilterChange({ searchName, searchUbication, startDate, endDate, searchType });
  }, [searchName, searchUbication, startDate, endDate, searchType]);

  const clearFilters = () => {
    setSearchName("");
    setSearchUbication("");
    setStartDate("");
    setEndDate("");
    setSearchType("");
  };

  return (
    <section className="space-y-3 shadow-md border rounded-lg p-4 w-3/4">
      {/* Campo de búsqueda por nombre */}
      <div className="relative w-full mt-3">
        <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          className="w-full h-9 pl-10 pr-3 border border-black rounded-md text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
          type="text"
          placeholder="Busca tu próxima oportunidad"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      {/* Filtros */}
      <div className="w-full flex gap-3">
        {/* Fecha (rango de fechas) */}
        <div className="flex items-center border border-black rounded-md overflow-hidden w-full">
          <span className="bg-gray-200 px-3 py-2 text-black font-semibold text-sm whitespace-nowrap">¡Filtra tu búsqueda!</span>
          <input
            className="w-[70%] h-8 px-3 border-l border-black text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span className="px-2">-</span>
          <input
            className="w-full h-9 px-3 border-l border-black text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full flex gap-3">
        {/* Ubicación */}
        <div className="relative flex items-center border border-black rounded-md overflow-hidden w-1/2">
          <span className="bg-gray-200 px-3 py-2 text-black font-semibold text-sm">Ubicación</span>
          <HiMagnifyingGlass className="absolute left-28 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            className="w-full h-9 px-12 border-l border-black text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            placeholder="Busca tu ubicación"
            value={searchUbication}
            onChange={(e) => setSearchUbication(e.target.value)}
          />
        </div>

        {/* Tipo de oportunidad */}
        <div className="relative flex items-center border border-black rounded-md overflow-hidden w-1/2">
          <span className="bg-gray-200 px-3 py-2 text-black font-semibold text-sm">Tipo</span>
          <HiMagnifyingGlass className="absolute left-16 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            className="w-full h-9 px-12 border-l border-black text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
            type="text"
            placeholder="Busca tu oportunidad"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          />
        </div>
      </div>

      {/* Botón "Limpiar Filtros" */}
      <div className="w-full flex justify-end">
        <button
          className="w-1/6 bg-gray-400 text-white p-2 rounded-md text-sm font-bold hover:bg-yellow-600"
          onClick={clearFilters}
        >
          Limpiar
        </button>
      </div>
    </section>
  );
}