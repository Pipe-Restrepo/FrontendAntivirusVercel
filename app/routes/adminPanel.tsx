import { useState, useEffect } from "react";
import { Link, useNavigate } from "@remix-run/react";

const API_URL = "https://localhost:5282/api";

interface User {
  id: number;
  name: string;
  email: string;
  rol: string;
}

interface Opportunity {
  id: number;
  name: string;
  type: string;
  adicional_dates?: string;
  institutionId?: number;
  institution?: {
    name: string;
    ubication: string;
  };
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ rol: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
  
    if (!storedUser) {
      navigate("/"); // Si no hay usuario, redirige
      return;
    }
  
    const parsedUser = JSON.parse(storedUser);
    setCurrentUser(parsedUser);
  }, [navigate]); // Se ejecuta una sola vez
  
  useEffect(() => {
    if (currentUser === null) return; // Esperar a que se establezca currentUser
  
    if (currentUser.rol !== "admin") {
      navigate("/"); // Si el usuario no es admin, redirige
      return;
    }
  
    let isMounted = true;
  
    const fetchData = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
  
      if (!token) {
        navigate("/");
        return;
      }
  
      try {
        const [usersRes, opportunitiesRes] = await Promise.all([
          fetch(`${API_URL}/Users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/Opportunities`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
  
        if (!usersRes.ok || !opportunitiesRes.ok) throw new Error("Error en la API");
  
        const usersData = await usersRes.json();
        const opportunitiesData = await opportunitiesRes.json();
  
        if (isMounted) {
          setUsers(usersData);
          setOpportunities(opportunitiesData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [currentUser, navigate]); // Se ejecuta cuando currentUser cambia
  
  

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Panel de Administración</h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : (
        <>
          <section className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Usuarios</h3>
            <ul className="space-y-3">
              {users.map((user) => (
                <li key={user.id} className="bg-white p-4 shadow rounded-lg">
                  {user.name} - {user.email} ({user.rol})
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Gestión de Oportunidades</h3>
            <ul className="space-y-3">
              {opportunities.map(({ id, name, type, adicional_dates, institution }) => (
                <li key={id} className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
                  <span>
                    {name} ({type}) - {institution?.name || "Sin institución"} -{" "}
                    {adicional_dates ? new Date(adicional_dates).toLocaleDateString() : "Sin fecha"}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <Link to="/" className="block text-center text-blue-500 mt-6 text-lg hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
