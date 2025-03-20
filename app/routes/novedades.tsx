import Carousel from "~/components/CarouselNews";

import OpportunityCard from "~/components/OpportunityCard";

export default function Novedades() {
  {
    /*simulo una lista de oportunidades */
  }
  const oportunidades = [
    {
      name: "Beca FullStack",
      observation: "par mayores de 18",
      type: "Nose",
      description:
        "Aprende desarrollo web fullstack con esta increíble beca... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque nihil quod aliquam sed ducimus facilis porro quibusdam nesciunt totam illo molestias magni placeat quisquam consectetur tenetur, qui eaque quae?",
      requires: "sin experiencia",
      guide: "enviar solicitud a correo correo@gmail.com",
      adicional_dates: "ninguno",
      service_channels: "URL",
      manager: "Andres",
      modality: "Remoto",
    },
    {
      name: "Tecnico Sistema",
      observation: "ninguna",
      type: "Nose",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque nihil quod aliquam sed ducimus facilis porro quibusdam nesciunt totam illo molestias magni placeat quisquam consectetur tenetur, qui eaque quae?",
      requires: "mayor de 18 y recidir en medellín",
      guide: "enviar solicitud a correo correo@gmail.com",
      adicional_dates: "https://www.udea.edu.co/wps/portal/udea/web/inicio",
      service_channels: "URL",
      manager: "Andres",
      modality: "Remoto",
    },
  ];

  return (
    <>

      <div className="flex flex-col gap-7 items-center justify-center p-px sp translate-y-40">

        <h1 className="text-5xl font-bold p-8">NOVEDADES</h1>
        <div className="relative flex justify-center  w-3/4 h-60">
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
        <section className="w-3/4 h-64">
          <div className="grid grid-cols-3 gap-4 w-full ">
          {oportunidades.map((opportunity, index) => (
          <OpportunityCard key={index} opportunity={opportunity} />
        ))}
          </div>
        </section>
      </div>
      
    </>
  );
}
