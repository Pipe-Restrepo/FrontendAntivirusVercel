import { useState } from "react";
import { Link } from "@remix-run/react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
  });

  const [opportunities, setOpportunities] = useState([
    "Oportunidad 1 - Desarrollo Web",
    "Oportunidad 2 - Diseño UX/UI",
    "Oportunidad 3 - Administración de Proyectos",
  ]);

  const [newOpportunity, setNewOpportunity] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleAddOpportunity = () => {
    if (newOpportunity.trim() !== "") {
      setOpportunities([...opportunities, newOpportunity]);
      setNewOpportunity("");
    }
  };

  const handleDeleteOpportunity = (index) => {
    setOpportunities(opportunities.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto p-20 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Mi Perfil</h2>
      <div className="space-y-6">
        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700">Nombre:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mt-1 text-gray-700"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-semibold text-gray-700">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
            className="w-full p-3 border rounded-lg mt-1 bg-gray-200 text-gray-500"
          />
        </div>

        <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-lg">
          Guardar Cambios
        </button>
      </div>

      {/* Sección de Oportunidades Guardadas */}
      <div className="mt-8 p-6 bg-gray-100 rounded-lg">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Mis Oportunidades</h3>
        
        <ul className="list-disc pl-6 space-y-2">
          {opportunities.map((opportunity, index) => (
            <li key={index} className="text-gray-700 text-lg flex justify-between items-center">
              {opportunity}
              <button
                onClick={() => handleDeleteOpportunity(index)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        {/* Agregar Oportunidad */}
        <div className="mt-4 flex">
          <input
            type="text"
            value={newOpportunity}
            onChange={(e) => setNewOpportunity(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-700"
            placeholder="Agregar nueva oportunidad..."
          />
          <button
            onClick={handleAddOpportunity}
            className="ml-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg"
          >
            ➕
          </button>
        </div>
      </div>

      <Link to="/" className="block text-center text-blue-500 mt-6 text-lg hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
