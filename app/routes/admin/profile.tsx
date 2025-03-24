import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@remix-run/react";

const API_URL = "https://localhost:5282/api"; 

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [opportunities, setOpportunities] = useState([]);

  // Obtener usuarios desde la API
  useEffect(() => {
    axios.get(`${API_URL}/Users`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error al obtener usuarios:", error));

    axios.get(`${API_URL}/Opportunities`)
      .then((response) => setOpportunities(response.data))
      .catch((error) => console.error("Error al obtener Opportunities:", error));
  }, []);

  // Eliminar usuario
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/Users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Eliminar oportunidad
  const handleDeleteOpportunity = async (id) => {
    try {
      await axios.delete(`${API_URL}//${id}`);
      setOpportunities(opportunities.filter((opp) => opp.id !== id));
    } catch (error) {
      console.error("Error al eliminar oportunidad:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Panel de Administración</h2>

      {/* Sección de Gestión de Usuarios */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Usuarios</h3>
        <ul className="space-y-3">
          {users.map(({ id, name, email, role }) => (
            <li key={id} className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
              <span>{name} ({role}) - {email}</span>
              <button onClick={() => handleDeleteUser(id)} className="text-red-500 hover:text-red-700">
                ❌ Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sección de Gestión de Oportunidades */}
      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Oportunidades</h3>
        <ul className="space-y-3">
          {opportunities.map(({ id, title, status }) => (
            <li key={id} className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
              <span>{title} - <span className={`font-bold ${status === "Aprobada" ? "text-green-500" : status === "Pendiente" ? "text-yellow-500" : "text-red-500"}`}>{status}</span></span>
              <button onClick={() => handleDeleteOpportunity(id)} className="text-red-500 hover:text-red-700">
                ❌ Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Link to="/" className="block text-center text-blue-500 mt-6 text-lg hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
