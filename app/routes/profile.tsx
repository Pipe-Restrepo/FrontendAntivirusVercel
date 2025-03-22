import { useState } from "react";
import { Link } from "@remix-run/react";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "123-456-7890",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
      <div className="space-y-4">
        <label className="block">
          Nombre:
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="block w-full p-2 border rounded mt-1"
          />
        </label>

        <label className="block">
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
            className="block w-full p-2 border rounded mt-1 bg-gray-100"
          />
        </label>

        <label className="block">
          Teléfono:
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="block w-full p-2 border rounded mt-1"
          />
        </label>

        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Guardar Cambios
        </button>
      </div>

      <Link to="/home" className="block text-blue-500 mt-4">
        Volver al inicio
      </Link>
    </div>
  );
}
