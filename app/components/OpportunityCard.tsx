
export default function OpportunityCard() {
    
  
    return (
      <>
        {/* Tarjeta */}
        <div
          className="bg-white text-gray-700 shadow-lg border rounded-lg p-4 w-72 cursor-pointer hover:scale-105 transition-transform" 
        >
          <div className="flex justify-between"><h3 className="text-xl font-bold">Universidad de Antioquia</h3><button className="text-gray-900 bg-white border border-gray-300  hover:bg-gray-100 focus:ring-1  font-medium rounded-full text-sm px-2 mb-7 dark:bg-gray-800 dark:text-white   ">Guardar</button>
          </div>
          <p className="text-sm text-gray-600">Tecnico Sistemas</p>
          <p className="text-gray-700 line-clamp-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem neque nihil quod aliquam sed ducimus facilis porro quibusdam nesciunt totam illo molestias magni placeat quisquam consectetur tenetur, qui eaque quae?</p>
        </div>
    
    </>
  );
}