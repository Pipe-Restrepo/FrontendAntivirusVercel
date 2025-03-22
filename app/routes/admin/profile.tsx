import { useState } from "react";
import { Link } from "@remix-run/react";

export default function AdminProfile() {
  const [opportunities, setOpportunities] = useState([
    { id: 1, title: "Oportunidad A", status: "Activa" },
    { id: 2, title: "Oportunidad B", status: "Pendiente" },
  ]);

  const deleteOpportunity = (id: number) => {
    setOpportunities(opportunities.filter((opp) => opp.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Gestión de Oportunidades</h2>

      <ul className="space-y-2">
        {opportunities.map((opp) => (
          <li key={opp.id} className="flex justify-between items-center p-2 border rounded">
            <span>{opp.title} - {opp.status}</span>
            <button
              onClick={() => deleteOpportunity(opp.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Agregar Nueva Oportunidad
      </button>

      <Link to="/home" className="block text-blue-500 mt-4">
        Volver al inicio
      </Link>
    </div>
  );
}
