import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OpportunityCard from "~/components/OpportunityCard";
import Swal from 'sweetalert2'; 

const API_BASE_URL = "http://localhost:5282/api";

export default function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [adminId, setAdminId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<string>("user");
  const [allOpportunities, setAllOpportunities] = useState<any[]>([]);
  const navigate = useNavigate();

  // Helper function to fetch data
  const fetchData = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const fetchUsers = async () => {
    if (!adminId) return;
    try {
      const data = await fetchData(`${API_BASE_URL}/Users`);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchOpportunitiesData = async () => {
    try {
      const data = await fetchData(`${API_BASE_URL}/Opportunities`);
      setAllOpportunities(data);
    } catch (error) {
      console.error("Error fetching opportunities:", error);
    }
  };

  const fetchUserOpportunitiesData = async (userId: string) => {
    try {
      const data = await fetchData(`${API_BASE_URL}/UserOpportunities/user/${userId}`);
      setOpportunities(data);
    } catch (error) {
      console.error("Error fetching user opportunities:", error);
    }
  };

  const updateUserRoleData = async () => {
    if (!selectedUser) return;
    try {
      await fetchData(`${API_BASE_URL}/Users/${selectedUser.id}/rol`, {
        method: "PATCH",
        body: JSON.stringify({ rol: newRole }),
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, rol: newRole } : user
        )
      );
      Swal.fire({
        icon: 'success',
        title: 'Rol actualizado',
        text: 'El rol del usuario se ha actualizado correctamente.',
      });
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el rol del usuario.',
      });
    }
  };

  const deleteUserData = async (userId: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_BASE_URL}/Users?id=${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            Swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado.',
              'success'
            );
          } else if (response.status === 404) {
            Swal.fire(
              'Error',
              'El usuario no fue encontrado.',
              'error'
            );
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire(
            'Error',
            'No se pudo eliminar el usuario.',
            'error'
          );
        }
      }
    });
  };

  const deleteOpportunityData = async (opportunityId: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetchData(`${API_BASE_URL}/Opportunities?id=${opportunityId}`, {
            method: "DELETE",
          });
          setAllOpportunities((prev) => prev.filter((opp) => opp.id !== opportunityId));
          Swal.fire(
            'Eliminado',
            'La oportunidad ha sido eliminada.',
            'success'
          );
        } catch (error) {
          console.error("Error deleting opportunity:", error);
          Swal.fire(
            'Error',
            'No se pudo eliminar la oportunidad.',
            'error'
          );
        }
      }
    });
  };

  const handleDeleteClick = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (selectedOpportunity) {
      deleteOpportunityData(selectedOpportunity.id);
    }
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  const handleUserSelection = (user: any) => {
    setSelectedUser(user);
    setOpportunities([]);
    fetchUserOpportunitiesData(user.id);
    setNewRole(user.rol);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setAdminId(parsedUser.id?.toString() || null);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchOpportunitiesData();
  }, [adminId]);

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Panel de Administración</h1>

      <div className="flex justify-center gap-4 mb-6">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/createOpportunity")}
        >
          Crear Nueva Oportunidad
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigate("/categoryInstitutionAdmin")}
        >
          Administrar Categorías e Instituciones
        </button>
      </div>

      <div className="w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Oportunidades Activas</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {allOpportunities.length > 0 ? (
            allOpportunities.map((opportunity) => (
              <li key={opportunity.id} className="bg-gray-100 rounded-lg overflow-hidden p-4">
                <OpportunityCard opportunity={opportunity} />
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 mt-2 rounded"
                  onClick={() => handleDeleteClick(opportunity)}
                >
                  Eliminar
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No hay oportunidades activas.</p>
          )}
        </ul>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              ¿Estás seguro de eliminar la oportunidad?
            </h3>
            <div className="flex justify-around">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Sí, eliminar
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Usuarios Registrados</h2>
        <ul className="space-y-2">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-800">
                  {user.name} ({user.email}) - <strong>Rol: {user.rol}</strong>
                </span>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => handleUserSelection(user)}
                  >
                    Ver Oportunidades
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => deleteUserData(user.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No hay usuarios registrados.</p>
          )}
        </ul>
      </div>

      {selectedUser && (
        <div className="w-full bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Oportunidades de {selectedUser.name}</h3>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 mt-2 rounded"
              onClick={() => setSelectedUser(null)}
            >
              Cerrar
            </button>
          </div>

          <div className="mb-4">
            <label htmlFor="role-select" className="block text-gray-700 font-semibold">
              Cambiar Rol
            </label>
            <select
              id="role-select"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              onClick={updateUserRoleData}
            >
              Actualizar Rol
            </button>
          </div>
          {opportunities.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {opportunities.map((opportunity) => (
                <li key={opportunity.id} className="bg-gray-100 rounded-lg overflow-hidden p-4">
                  {opportunity.opportunity ? (
                    <OpportunityCard opportunity={opportunity.opportunity} />
                  ) : (
                    <p className="text-red-500 text-center p-4">
                      Error cargando la oportunidad
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center p-10">
              Este usuario no tiene oportunidades guardadas.
            </p>
          )}
        </div>
      )}
    </div>
  );
}