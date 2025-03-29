import { useEffect, useState } from "react";
import OpportunityCard from "~/components/OpportunityCard";



const API_BASE_URL = "http://localhost:5282/api";

export default function UserProfile() {
  const [opportunities, setOpportunities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const token = localStorage.getItem("token"); // Obtener el token
        const userId = 3;//localStorage.getItem("userId");

        if (!token) throw new Error("No token found");
        if (!userId) throw new Error("No user ID found");

        const response = await fetch(`${API_BASE_URL}/UserOpportunities/user/${userId}`, 
        {
            method : "GET",
            headers : {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error("Error al obtener datos");

        const data = await response.json();
        setOpportunities(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchOpportunities();
  }, []);

    return(
        
        <div>
            <div className="bg-white w-full h-20 "></div> {/*para la cabecera */}
            <h1>Mis oportunidades favoritas</h1>
            <div className="pt-24 translate-y-10 text-7xl">
            
            </div>
            <div className="grid grid-cols-4 gap-10 w-full">
            Mis Oportunidades Guardadas
                {opportunities.length > 0 ? (
                    opportunities.map((opportunity) => (
                        <OpportunityCard key={opportunity.id} opportunity={opportunity.opportunity} />
                    ))
                ) : (
                        <p>No tienes oportunidades guardadas.</p>
                    )}
            
            </div>

        </div>
        
        
    );
}