import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


interface Opportunity {
  institutionId: string;
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
  institution:{
    name : string;
    logo: string;
  }
}


export default function OpportunityCard({opportunity} : {opportunity : Opportunity}) {

  const [showModal, setShowModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalTop, setModalTop] = useState (0); //para almacenar la posicion del modal

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleOpenModal = () => {
    setModalTop(window.scrollY + window.innerHeight/2); // centrar el modal en la vista actual
    //document.body.style.overflow = "hidden"; //
    setShowModal (true);
  }
      
    return (
      <>
        {/* Tarjeta */}
        <div
          className="bg-white text-gray-700 shadow-lg border rounded-lg  h-auto max-w-full cursor-pointer hover:scale-105 transition-transform"
          onClick={handleOpenModal}
          /*esto se agrega porque div no es un elemento interactivo asi se que se maneja eventos de teclado*/
          onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " "){
                setShowModal(true);
              }
            }
           }
           role="button"
           tabIndex={0}
        >  

        {/*contenedor Foto */}
        <div className="w-full h-44 overflow-hidden">
          <img src={opportunity.institution?.logo ?? "Desconocida"} alt="" 
          className="w-full h-full rounded-t-lg object-fill "/>
        </div>

        {/*contenedor de informacion */}
        <div className="p-3 ">        
          <div className="relative mb-3 flex justify-between items-start"><h3 className="text-xl font-bold">{opportunity.institution?.name ?? "Desconocida"}</h3>
          {/*se agrega el boton favorito */}
          <button 
          onClick={(e) => {
            e.stopPropagation(); // Evita que el clic se propague al contenedor padre div
            handleToggleFavorite();
            }
          }  
          className=" text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-1 font-medium rounded-full text-sm px-2 mb-7 dark:bg-gray-800 dark:text-white">
          <FontAwesomeIcon icon={faStar} color={isFavorite ? 'orange' : 'gray'} />
          </button>
          </div>
          <h2 className="text-base text-gray-600 mb-3 font-bold">{opportunity.name}</h2>
          <p className="text-gray-700 line-clamp-2">{opportunity.description}</p>
        </div>

        </div>

           {/* Modal */}
           {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 max-w-lg" 
          style={{ position: 'absolute', top: `${modalTop}px`, left: '50%', transform: 'translate(-50%, -50%)' }}>
            <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={() => setShowModal(false)}>✖</button>
            <h2 className="text-2xl font-bold text-gray-600 py-2">{opportunity.name}</h2>
            <p className="text-gray-600 py-1"><strong>Observación: </strong>{opportunity.observation}</p>
            <p className="text-gray-600 py-1"><strong>Tipo: </strong>{opportunity.type}</p>
            <p className="text-gray-600 py-1"><strong>Descripción: </strong>{opportunity.description}</p>
            <p className="text-gray-600 py-1"><strong>Requisitos: </strong> {opportunity.requires}</p>
            <p className="text-gray-600 py-1"><strong>Guia: </strong> {opportunity.guide}</p>
            <p className="text-gray-600 py-1"><strong>Datos Adicionales: </strong> {opportunity.adicional_dates}</p>
            <p className="text-gray-600 py-1"><strong>Modalidad: </strong> {opportunity.modality}</p>
          </div>
        </div>
      )}

            
    
    </>
  );
}