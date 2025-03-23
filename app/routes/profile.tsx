import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@remix-run/react";

const API_URL = "https://localhost:5282/api"; 

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [userOpportunities, setUserOpportunities] = useState([]);

  // Obtener el perfil del usuario
  useEffect(() => {
    const userId = 1; 

    // Obtener datos del usuario
    axios.get(`${API_URL}/Users/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error al obtener datos del usuario:", error));

    // Obtener las oportunidades asociadas al usuario
    axios.get(`${API_URL}/UserOpportunities/${userId}`)
      .then((response) => setUserOpportunities(response.data))
      .catch((error) => console.error("Error al obtener las oportunidades del usuario:", error));
  }, []);

  // Eliminar oportunidad del usuario
  const handleDeleteOpportunity = async (opportunityId) => {
    const userId = 1; // Reemplaza con el ID del usuario autenticado
    try {
      await axios.delete(`${API_URL}/UserOpportunities/${userId}/${opportunityId}`);
      setUserOpportunities(userOpportunities.filter((opp) => opp.id !== opportunityId));
    } catch (error) {
      console.error("Error al eliminar oportunidad:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Mi Perfil</h2>

      {/* Información del Usuario */}
      {user && (
        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Información del Usuario</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Nombre:</span>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Correo Electrónico:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Rol:</span>
              <span>{user.role}</span>
            </div>
          </div>
        </div>
      )}

      {/* Oportunidades guardadas por el usuario */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Oportunidades Guardadas</h3>
        <ul className="space-y-3">
          {userOpportunities.length > 0 ? (
            userOpportunities.map(({ opportunity }) => (
              <li key={opportunity.id} className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
                <div>
                  <span className="font-semibold">{opportunity.name}</span>
                  <p className="text-sm text-gray-600">{opportunity.description}</p>
                </div>
                <button
                  onClick={() => handleDeleteOpportunity(opportunity.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ❌ Eliminar
                </button>
              </li>
            ))
          ) : (
            <p>No has guardado ninguna oportunidad.</p>
          )}
        </ul>
      </div>

      <Link to="/" className="block text-center text-blue-500 mt-6 text-lg hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
