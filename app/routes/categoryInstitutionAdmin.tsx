import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const API_BASE_URL = "http://localhost:5282/api";

// Componente para modales reutilizables
const Modal = ({ title, children, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            {children}
            <div className="flex justify-end gap-2">
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Cancelar
                </button>
            </div>
        </div>
    </div>
);

export default function CategoryInstitutionAdmin() {
    const [categories, setCategories] = useState<any[]>([]);
    const [institutions, setInstitutions] = useState<any[]>([]);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });
    const [newInstitution, setNewInstitution] = useState({
        name: "",
        ubication: "",
        url_generalidades: "",
        url_oferta_academica: "",
        url_bienestar: "",
        url_admision: "",
        logo: "",
    });
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [showInstitutionForm, setShowInstitutionForm] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any | null>(null);
    const [editingInstitution, setEditingInstitution] = useState<any | null>(null);
    const [loading, setLoading] = useState(false); // Estado para mostrar carga

    // Helper function to fetch data
    const fetchData = async (url: string, options: RequestInit = {}) => {
        setLoading(true); // Iniciar carga
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
            if (!response.ok) {
                if(response.status === 204){
                    return; //No Content, successful DELETE for example.
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return await response.json();
            }
            return; //For cases like successful DELETE without json.
        } catch (error) {
            console.error("Fetch error:", error);
            Swal.fire({ icon: 'error', title: 'Error', text: 'Error al comunicarse con el servidor.' });
            throw error;
        } finally {
            setLoading(false); // Finalizar carga
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await fetchData(`${API_BASE_URL}/Categories`);
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const createCategoryData = async () => {
        if (!newCategory.name.trim() || !newCategory.description.trim()) {
            return Swal.fire({ icon: 'error', title: 'Error', text: 'Todos los campos son obligatorios.' });
        }

        try {
            const createdCategory = await fetchData(`${API_BASE_URL}/Categories`, {
                method: "POST",
                body: JSON.stringify(newCategory),
            });
            setCategories([...categories, createdCategory]);
            setNewCategory({ name: "", description: "" });
            setShowCategoryForm(false);
            Swal.fire('Creado', 'La categoría ha sido creada.', 'success');
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    const updateCategoryData = async () => {
        if (!editingCategory) return;
        try {
            const updatedCategory = await fetchData(
                `${API_BASE_URL}/Categories/${editingCategory.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(editingCategory),
                }
            );
            setCategories(
                categories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
            );
            setEditingCategory(null);
            Swal.fire('Actualizado', 'La categoría ha sido actualizada.', 'success');
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    const deleteCategoryData = async (categoryId: string) => {
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
                    await fetchData(`${API_BASE_URL}/Categories?id=${categoryId}`, {
                        method: "DELETE",
                    });
                    setCategories((prevCategories) =>
                        prevCategories.filter((cat) => cat.id !== categoryId)
                    );
                    Swal.fire('Eliminado', 'La categoría ha sido eliminada.', 'success');
                } catch (error) {
                    console.error("Error deleting category:", error);
                    Swal.fire('Error', 'No se pudo eliminar la categoría.', 'error');
                }
            }
        });
    };

    const fetchInstitutionsData = async () => {
        try {
            const data = await fetchData(`${API_BASE_URL}/Institutions`);
            setInstitutions(data);
        } catch (error) {
            console.error("Error fetching institutions:", error);
        }
    };

    const createInstitutionData = async () => {
        if (Object.values(newInstitution).some((field) => !field.trim())) {
            return Swal.fire({ icon: 'error', title: 'Error', text: 'Todos los campos son obligatorios.' });
        }

        try {
            const createdInstitution = await fetchData(`${API_BASE_URL}/Institutions`, {
                method: "POST",
                body: JSON.stringify(newInstitution),
            });
            setInstitutions([...institutions, createdInstitution]);
            setNewInstitution({
                name: "",
                ubication: "",
                url_generalidades: "",
                url_oferta_academica: "",
                url_bienestar: "",
                url_admision: "",
                logo: "",
            });
            setShowInstitutionForm(false);
            Swal.fire('Creado', 'La institución ha sido creada.', 'success');
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    const updateInstitutionData = async () => {
        if (!editingInstitution) return;
        try {
            const updatedInstitution = await fetchData(
                `${API_BASE_URL}/Institutions/${editingInstitution.id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(editingInstitution),
                }
            );
            setInstitutions(
                institutions.map((inst) =>
                    inst.id === updatedInstitution.id ? updatedInstitution : inst
                )
            );
            setEditingInstitution(null);
            Swal.fire('Actualizado', 'La institución ha sido actualizada.', 'success');
        } catch (error) {
            Swal.fire({ icon: 'error', title: 'Error', text: error.message });
        }
    };

    const deleteInstitutionData = async (institutionId: string) => {
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
                    await fetchData(`${API_BASE_URL}/Institutions?id=${institutionId}`, {
                        method: "DELETE",
                    });
                    setInstitutions((prevInstitutions) =>
                        prevInstitutions.filter((inst) => inst.id !== institutionId)
                    );
                    Swal.fire('Eliminado', 'La institución ha sido eliminada.', 'success');
                } catch (error) {
                    console.error("Error deleting institution:", error);
                    Swal.fire('Error', 'No se pudo eliminar la institución.', 'error');
                }
            }
        });
    };

    useEffect(() => {
        fetchCategories();
        fetchInstitutionsData();
    }, []);

    return (
        <div className="flex flex-col gap-8 p-8 mt-8">
            {loading && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div></div>}
            {/* Categorías */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Categorías</h2>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => setShowCategoryForm(true)}
                    >
                        Crear Categoría
                    </button>
                </div>
                <ul className="space-y-2">
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <li key={category.id} className="flex justify-between items-center py-2 border-b mt-4">
                                <span className="text-gray-800">
                                    {category.name} - {category.description}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                        onClick={() => setEditingCategory({ ...category })}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => deleteCategoryData(category.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 mt-4">No hay categorías disponibles.</p>
                    )}
                </ul>
                {showCategoryForm && (
                    <Modal title="Crear Categoría" onClose={() => setShowCategoryForm(false)}>
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            placeholder="Nombre de la categoría"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <textarea
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                            placeholder="Descripción"
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            onClick={createCategoryData}
                        >
                            Crear
                        </button>
                    </Modal>
                )}
                {editingCategory && (
                    <Modal title="Editar Categoría" onClose={() => setEditingCategory(null)}>
                        <input
                            type="text"
                            value={editingCategory.name}
                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                            placeholder="Nombre de la categoría"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <textarea
                            value={editingCategory.description}
                            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                            placeholder="Descripción"
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            onClick={updateCategoryData}
                        >
                            Guardar
                        </button>
                    </Modal>
                )}
            </div>

            {/* Instituciones */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Instituciones</h2>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => setShowInstitutionForm(true)}
                    >
                        Crear Institución
                    </button>
                </div>
                <ul className="space-y-2">
                    {institutions.length > 0 ? (
                        institutions.map((institution) => (
                            <li key={institution.id} className="flex justify-between items-center py-2 border-b">
                                <span className="text-gray-800">{institution.name}</span>
                                <div className="flex gap-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                        onClick={() => setEditingInstitution({ ...institution })}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        onClick={() => deleteInstitutionData(institution.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No hay instituciones disponibles.</p>
                    )}
                </ul>
                {showInstitutionForm && (
                    <Modal title="Crear Institución" onClose={() => setShowInstitutionForm(false)}>
                        <input
                            type="text"
                            value={newInstitution.name}
                            onChange={(e) => setNewInstitution({ ...newInstitution, name: e.target.value })}
                            placeholder="Nombre de la institución"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="text"
                            value={newInstitution.ubication}
                            onChange={(e) => setNewInstitution({ ...newInstitution, ubication: e.target.value })}
                            placeholder="Ubicación"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={newInstitution.url_generalidades}
                            onChange={(e) => setNewInstitution({ ...newInstitution, url_generalidades: e.target.value })}
                            placeholder="URL Generalidades"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={newInstitution.url_oferta_academica}
                            onChange={(e) => setNewInstitution({ ...newInstitution, url_oferta_academica: e.target.value })}
                            placeholder="URL Oferta Académica"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={newInstitution.url_bienestar}
                            onChange={(e) => setNewInstitution({ ...newInstitution, url_bienestar: e.target.value })}
                            placeholder="URL Bienestar"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={newInstitution.url_admision}
                            onChange={(e) => setNewInstitution({ ...newInstitution, url_admision: e.target.value })}
                            placeholder="URL Admisión"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={newInstitution.logo}
                            onChange={(e) => setNewInstitution({ ...newInstitution, logo: e.target.value })}
                            placeholder="URL del Logo"
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            onClick={createInstitutionData}
                        >
                            Crear
                        </button>
                    </Modal>
                )}
                {editingInstitution && (
                    <Modal title="Editar Institución" onClose={() => setEditingInstitution(null)}>
                        <input
                            type="text"
                            value={editingInstitution.name}
                            onChange={(e) => setEditingInstitution({ ...editingInstitution, name: e.target.value })}
                            placeholder="Nombre de la institución"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="text"
                            value={editingInstitution.ubication}
                            onChange={(e) => setEditingInstitution({ ...editingInstitution, ubication: e.target.value })}
                            placeholder="Ubicación"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={editingInstitution.url_generalidades}
                            onChange={(e) => setEditingInstitution({ ...editingInstitution, url_generalidades: e.target.value })}
                            placeholder="URL Generalidades"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={editingInstitution.url_oferta_academica}
                            onChange={(e) => setEditingInstitution({ ...editingInstitution, url_oferta_academica: e.target.value })}
                            placeholder="URL Oferta Académica"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={editingInstitution.url_bienestar}
                            onChange={(e) => setEditingInstitution({ ...editingInstitution, url_bienestar: e.target.value })}
                            placeholder="URL Bienestar"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={editingInstitution.url_admision}
                            onChange={(e) => setEditingInstitution({ ...editingInstitution, url_admision: e.target.value })}
                            placeholder="URL Admisión"
                            className="w-full p-2 border rounded mb-2"
                        />
                        <input
                            type="url"
                            value={editingInstitution.logo}
                            onChange={(e) => setEditingInstitution({ ...editingInstitution, logo: e.target.value })}
                            placeholder="URL del Logo"
                            className="w-full p-2 border rounded mb-4"
                        />
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                            onClick={updateInstitutionData}
                        >
                            Guardar
                        </button>
                    </Modal>
                )}
            </div>
        </div>
    );
}