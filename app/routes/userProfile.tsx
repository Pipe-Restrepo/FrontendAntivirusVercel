import { useEffect, useState } from "react";
import OpportunityCard from "~/components/OpportunityCard";
import { FaStar } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5282/api";

export default function UserProfile() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Leer el userId desde localStorage con un pequeño retraso
    setTimeout(() => {
      const storedUser = localStorage.getItem("user");
      console.log("UserData desde userProfile:", storedUser);

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        setUserId(parsedUser.id?.toString() || null); // Aquí asignamos el userId
      }
    }, 200);
  }, []);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        if (!userId) return; // No ejecutar si no hay userId

        const token = localStorage.getItem("token"); // Obtener el token
        //const userId = localStorage.getItem("userId");
        console.log("userID en userProfile:" + userId);

        if (!token) throw new Error("No token found");

        const response = await fetch(
          `${API_BASE_URL}/UserOpportunities/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchOpportunities();
  }, [userId]); // Se ejecutará cuando userId tenga un valor

  return (
    <div className="flex flex-col gap-7 items-center justify-center p-10 sp">
      <div className="bg-white w-full h-7 "></div> {/*para la cabecera */}
      <div className="flex flex-col self-start text-left w-3/4 mt-10 ml-10">
        <div className="flex items-center space-x-4">
          <FaStar size={48} className="text-[#2C395B]" />
          <h1 className="font-semibold text-3xl text-[#1D1856]">Mis Favoritos</h1>
        </div>
        <small className='text-gray-600 mt-2 text-2xl'>Encuentra y accede rápidamente a las oportunidades educativas que has guardado como favoritas.</small>
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-10 w-full p-2 mb-4">
        {opportunities.length > 0 ? (
          opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity.opportunity}
            />
          ))
        ) : (
          <p className="col-span-full text-3xl text-center p-10">No tienes oportunidades guardadas.</p>
        )}
      </div>

    </div>
  );
}
