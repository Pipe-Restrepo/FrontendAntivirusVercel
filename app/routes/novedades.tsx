

import Carousel from "~/components/CarouselNews";
import OpportunityCard from "~/components/OpportunityCard";



export default function Novedades() {
  return (
    <>
      <div className="flex flex-col gap-7 items-center justify-center p-px sp ">
        <h1 className="text-5xl font-bold p-8">NOVEDADES</h1>
        <div className="relative flex justify-center  w-3/4 h-64">
          
          <Carousel></Carousel>
          
        </div>
        <section className="space-y-3 border-2 border-gray-700 rounded-sm p-4 w-3/4">
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
        <section>
          <div>

            <div><OpportunityCard></OpportunityCard> </div>
            
          </div>
        </section>
      </div>
      <div className="" id="opportunityModal">
        <div>
          <span className="">&times;</span> {/*es la x de cerrar*/}
          <h2>Nombre de la oportunidad</h2>
          <p>description detallada de la oportunidad</p>
          <p>ubicacion</p>
          <a href="google.com">link</a>
        </div>
      </div>
    </>
  );
}
