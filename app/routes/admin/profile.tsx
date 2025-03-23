import { useState } from "react";
import { Link } from "@remix-run/react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: "Juan Pérez", email: "juan.perez@example.com", role: "Usuario" },
    { id: 2, name: "María Gómez", email: "maria.gomez@example.com", role: "Moderador" },
    { id: 3, name: "Carlos Ramírez", email: "carlos.ramirez@example.com", role: "Administrador" },
  ]);

  const [opportunities, setOpportunities] = useState([
    { id: 1, title: "Desarrollo Web", status: "Aprobada" },
    { id: 2, title: "Diseño UX/UI", status: "Pendiente" },
    { id: 3, title: "Administración de Proyectos", status: "Rechazada" },
  ]);

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleDeleteOpportunity = (id) => {
    setOpportunities(opportunities.filter(opp => opp.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Panel de Administración</h2>

      {/* Sección de Gestión de Usuarios */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Usuarios</h3>
        <ul className="space-y-3">
          {users.map(user => (
            <li key={user.id} className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
              <span>{user.name} ({user.role}) - {user.email}</span>
              <button onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-700">❌ Eliminar</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sección de Gestión de Oportunidades */}
      <div className="bg-gray-100 p-6 rounded-lg mt-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Oportunidades</h3>
        <ul className="space-y-3">
          {opportunities.map(opp => (
            <li key={opp.id} className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
              <span>{opp.title} - <span className={`font-bold ${opp.status === "Aprobada" ? "text-green-500" : opp.status === "Pendiente" ? "text-yellow-500" : "text-red-500"}`}>{opp.status}</span></span>
              <button onClick={() => handleDeleteOpportunity(opp.id)} className="text-red-500 hover:text-red-700">❌ Eliminar</button>
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
