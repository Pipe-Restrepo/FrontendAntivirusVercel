import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


export default function OpportunityCard() {

  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
      
    return (
      <>
        {/* Tarjeta */}
        <div
          className="bg-white text-gray-700 shadow-lg border rounded-lg p-4 h-auto max-w-full cursor-pointer hover:scale-105 transition-transform pt-6" 
        >          
          <div className="flex justify-between mb-3"><h3 className="text-xl font-bold">Universidad de Antioquia</h3>
          <button onClick={handleToggleFavorite} className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-1 font-medium rounded-full text-sm px-2 mb-7 dark:bg-gray-800 dark:text-white">
          <FontAwesomeIcon icon={faStar} color={isFavorite ? 'orange' : 'gray'} />
          </button>
          </div>
          <h2 className="text-base text-gray-600 mb-3 font-bold">Tecnico Sistemas</h2>
          <p className="text-gray-700 line-clamp-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque nihil quod aliquam sed ducimus facilis porro quibusdam nesciunt totam illo molestias magni placeat quisquam consectetur tenetur, qui eaque quae?</p>
        </div>


            
    
    </>
  );
}