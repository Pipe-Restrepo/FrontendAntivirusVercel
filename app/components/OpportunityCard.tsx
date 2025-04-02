import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Opportunity {
  id: string;
  name: string;
  observation: string;
  type: string;
  description: string;
  requires: string;
  guide: string;
  adicional_dates: string;
  service_channels: string;
  manager: string;
  modality: string;
  institution: {
    name: string;
    logo: string;
    ubication: string;
    url_generalidades: string;
    url_oferta_academica: string;
    url_bienestar: string;
    url_admision: string;
  };
}

export default function OpportunityCard({
  opportunity,
}: {
  opportunity: Opportunity;
}) {
  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<number | null>(null); // Guarda el ID en caso de existir
  
  //consulta el Back para saber si la oportunidad ya es favorita y actualiza el estado de isFavorite
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token"); // Obtener el token
    if (!userData || !token) return; // Verificar si existen

    const { id: user_id } = JSON.parse(userData);

    fetch(
      `http://localhost:5282/api/UserOpportunities/exists?user_id=${user_id}&opportunity_id=${opportunity.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (res) => { 
        if (res.status === 404) {
          return null; // Si el backend retorna 404, tomamos valor null
        }
        try {
          return await res.json(); // Intentamos parsear el JSON
        } catch (error) {
          console.error("Error al convertir JSON:", error);
          return null; // Si hay un error, retornamos null
        }
      })
      .then((data) => {
        if (data !== null)
        {
          setIsFavorite(true); 
          setFavoriteId(data.id); // guardamos el ID de la relacion
        }else{
          setIsFavorite(false);
          setFavoriteId(null);
        }
      })
      .catch((error) => console.error("Error al obtener favoritos:", error));
  }, [opportunity.id]);


  //logica para guardar la oportunidad y eliminar
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita propagación del clic
  
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!userData || !token) {
      console.error("Usuario no autenticado");
      return;
    }
  
    const { id: user_id } = JSON.parse(userData); // Extrae ID del usuario
    const url = "http://localhost:5282/api/UserOpportunities";
  
    const requestData = {
      user_id,
      opportunity_id: opportunity.id,
    };
  
    try {
      let response;
      if (isFavorite && favoriteId !== null) {
        // Eliminar si ya es favorito
        response = await fetch(`${url}?id=${favoriteId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          setIsFavorite(false);
          setFavoriteId(null);
        }
      } else {
        // Guardar nueva oportunidad
        response = await fetch(`${url}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.ok) {
          const data = await response.json(); // Obtiene el ID de la nueva relación
          setIsFavorite(true);
          setFavoriteId(data.id); // Asegura que el estado se actualice correctamente obteniendolo del back al crearlo
        }
      }
    } catch (error) {
      console.error("Error al guardar/eliminar la oportunidad:", error);
    }
  };

  
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Tarjeta */}
      <div
        className="bg-white  text-gray-700 shadow-lg border rounded-lg  h-auto max-w-full cursor-pointer hover:scale-105 transition-transform"
        onClick={handleOpenModal}
        /*esto se agrega porque div no es un elemento interactivo asi se que se maneja eventos de teclado*/
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setShowModal(true);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {/*contenedor Foto */}
        <div className="w-full h-44 overflow-hidden">
          <img
            src={opportunity.institution?.logo ?? "Desconocida"}
            alt=""
            className="w-full h-full rounded-t-lg object-fill "
          />
        </div>

        {/*contenedor de informacion */}
        <div className="p-3 ">
          <div className="relative mb-3 flex justify-between items-start">
            <h3 className="text-xl font-bold">
              {opportunity.institution?.name ?? "Desconocida"}
            </h3>
            {/*se agrega el boton favorito */}
            <button
              onClick={(e) => handleToggleFavorite(e)}
              className=" text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-1 font-medium rounded-full text-sm px-2 mb-7 dark:bg-gray-800 dark:text-white"
            >
              <FontAwesomeIcon
                icon={faStar}
                color={isFavorite ? "orange" : "gray"}
              />
            </button>
          </div>
          <h2 className="text-base text-gray-600 mb-3 font-bold">
            {opportunity.name}
          </h2>
          <p className="text-gray-700 line-clamp-2">
            {opportunity.description}
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 max-w-lg"
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-gray-600 py-2">
              {opportunity.name}
            </h2>
            <p className="text-gray-600 py-1">
              <strong>Ubicación: </strong>
              {opportunity.institution?.ubication ?? "Desconocida"}
            </p>
            <p className="text-gray-600 py-1">
              <strong>Observación: </strong>
              {opportunity.observation}
            </p>
            <p className="text-gray-600 py-1">
              <strong>Tipo: </strong>
              {opportunity.type}
            </p>
            <p className="text-gray-600 py-1">
              <strong>Descripción: </strong>
              {opportunity.description}
            </p>
            <p className="text-gray-600 py-1">
              <strong>Requisitos: </strong> {opportunity.requires}
            </p>
            <p className="text-gray-600 py-1">
              <strong>Guia: </strong> {opportunity.guide}
            </p>
            <p className="text-gray-600 py-1">
              <strong>Datos Adicionales: </strong> {opportunity.adicional_dates}
            </p>
            <p className="text-gray-600 py-1">
              <strong>Canales De Servicio: </strong> {opportunity.guide}
            </p>
            <p className="text-gray-600 py-1">
              <strong>Modalidad: </strong> {opportunity.modality}
            </p>
            <p className="text-gray-600 py-1">
              <strong>URL Universidad: </strong>{" "}
              <a
                href={
                  opportunity.institution?.url_generalidades ?? "Desconocida"
                }
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {opportunity.institution?.url_generalidades ?? "Desconocida"}
              </a>{" "}
            </p>{" "}
            {/* rel="noopener noreferrer" evita los problemas de seguridad de target="_blank"
            noopener: Evita que la nueva página tenga acceso a la página original a través de window.opener.
            noreferrer: Además de lo anterior, también evita que se envíe información de referencia al nuevo sitio. */}
            <p className="text-gray-600 py-1">
              <strong>URL Oferta Academica: </strong>{" "}
              <a
                href={
                  opportunity.institution?.url_oferta_academica ?? "Desconocida"
                }
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {opportunity.institution?.url_generalidades ?? "Desconocida"}
              </a>{" "}
            </p>
            <p className="text-gray-600 py-1">
              <strong>URL Bienertar: </strong>{" "}
              <a
                href={opportunity.institution?.url_bienestar ?? "Desconocida"}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {opportunity.institution?.url_generalidades ?? "Desconocida"}
              </a>{" "}
            </p>
            <p className="text-gray-600 py-1">
              <strong>URL Admincion: </strong>{" "}
              <a
                href={opportunity.institution?.url_admision ?? "Desconocida"}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {opportunity.institution?.url_generalidades ?? "Desconocida"}
              </a>{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
