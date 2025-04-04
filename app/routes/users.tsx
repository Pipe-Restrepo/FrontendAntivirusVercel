import { TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Modal, Box, TablePagination } from '@mui/material'
import { useEffect, useState } from 'react';
import { FaUserFriends } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { HiEye } from "react-icons/hi";
import OpportunityCard from "~/components/OpportunityCard";
import Swal from 'sweetalert2';

const API_BASE_URL = "http://localhost:5282/api";

export default function ListUsers() {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [oportunityOpen, setOportunityOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [allOpportunities, setAllOpportunities] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [errors, setErrors] = useState({});

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
            const text = await response.text();
            return text ? JSON.parse(text) : null;
        } catch (error) {
            console.error("Fetch error:", error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetchData(`${API_BASE_URL}/Users`);
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchOpportunitiesData = async () => {
            try {
                const data = await fetchData(`${API_BASE_URL}/Opportunities`);
                setAllOpportunities(data);
            } catch (error) {
                console.error("Error fetching opportunities:", error);
            }
        };

        fetchOpportunitiesData();
    }, []);

    const fetchUserOpportunities = async (userId) => {
        try {
            const userOpportunities = await fetchData(`${API_BASE_URL}/UserOpportunities/user/${userId}`);
            console.log(userOpportunities)
            // Extraer los IDs de oportunidades del usuario
            const userOpportunityIds = new Set(userOpportunities.map((uo) => uo.opportunity_id));
            console.log(userOpportunityIds)
            // Filtrar oportunidades en allOpportunities que coincidan con los IDs obtenidos
            const filteredOpportunities = allOpportunities.filter((opportunity) =>
                userOpportunityIds.has(opportunity.id)
            );

            return filteredOpportunities;
        } catch (error) {
            console.error("Error fetching user opportunities:", error);
            return [];
        }
    };

    const handleOpenOpportunityModal = async (user) => {
        if (!user) return;
        setCurrentUser(user);

        // Obtener y setear las oportunidades del usuario
        const userOpportunities = await fetchUserOpportunities(user.id);
        setOpportunities(userOpportunities);

        setOportunityOpen(true);
    };

    const handleCloseOportunityModal = () => {
        setOportunityOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.rol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const validateEditForm = () => {
        const newErrors = {};
        if (!currentUser.name.trim()) newErrors.name = 'El nombre del usuario es obligatorio.';
        if (!currentUser.email.trim()) newErrors.email = 'El correo del usuario es obligatorio.';
        if (!currentUser.rol.trim()) newErrors.rol = 'El rol del usuario es obligatorio.';

        return newErrors;
    };

    // Función editar Area
    const handleUpdateArea = async () => {
        try {
            // Validar el formulario antes de continuar
            const validationErrors = validateEditForm();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            // Preparar los datos del usuario a actualizar
            const user_data = {
                name: currentUser?.name || "",
                email: currentUser?.email || "",
                rol: currentUser?.rol || "",
            };

            // Realizar la solicitud PUT para actualizar el usuario
            await fetchData(`${API_BASE_URL}/Users/${currentUser?.id}`, {
                method: "PUT",
                body: JSON.stringify(user_data),
            });

            // Actualizar la lista de usuarios en el estado
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === currentUser?.id ? { ...user, ...user_data } : user
                )
            );

            // Cerrar el modal de edición
            handleCloseEditModal();

            // Mostrar notificación de éxito
            Swal.fire({
                toast: true,
                position: "top",
                icon: "success",
                title: "Usuario actualizado correctamente",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
        } catch (error) {
            console.error("Error actualizando el usuario:", error);
            handleCloseEditModal();
            // Extraer mensaje de error si está disponible
            const errorData = error.response?.data || {};
            const errorMessage =
                errorData.name?.[0] ||
                errorData.email?.[0] ||
                errorData.rol?.[0] ||
                "Hubo un problema al actualizar el usuario.";

            // Mostrar alerta con el mensaje de error
            Swal.fire({
                title: "Error",
                text: errorMessage.includes("limit")
                    ? "El texto es demasiado largo. Por favor, reduzca la longitud y vuelva a intentarlo."
                    : errorMessage,
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            const result = await Swal.fire({
                title: "<span style='color: #1D1856'>¿Estás seguro?</span>",
                text: "Esta acción no se puede deshacer.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#D899A2",
                cancelButtonColor: "#1D1856",
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                await fetchData(`${API_BASE_URL}/Users?id=${userId}`, {
                    method: "DELETE",
                });

                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

                Swal.fire({
                    toast: true,
                    position: "top",
                    icon: "success",
                    title: "Usuario eliminado correctamente",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Error eliminando el usuario:", error);

            Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el usuario.",
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        }
    };

    const handleOpenEditModal = (user) => {
        setCurrentUser({
            id: user.id,
            name: user.name,
            email: user.email,
            rol: user.rol
        });
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    return (
        <div className="flex flex-col items-start mt-36 ml-16">
            <div className="flex flex-col mb-4">
                <div className="flex items-center space-x-4">
                    <FaUserFriends size={48} className="text-[#2C395B]" />
                    <h1 className="font-semibold text-3xl text-[#1D1856]">Gestión de Usuarios</h1>
                </div>
                <small className='text-gray-600 mt-2 text-2xl'>Administra y gestiona la información de los usuarios de la aplicación.</small>
            </div>
            <div className='w-[95%] overflow-hidden'>
                <TextField
                    margin="normal"
                    className="buscador"
                    variant="outlined"
                    label={
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <AiOutlineSearch size={25} /> Buscar Usuario
                        </span>
                    }
                    fullWidth
                    onChange={handleSearchChange}
                />
                <TableContainer component={Paper} className='mt-5 rounded-lg shadow-lg border border-gray-300'>
                    <Table>
                        <TableHead>
                            <TableRow className="bg-[#1D1856]">
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Nombre</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Correo</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Rol</TableCell>
                                <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.rol}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-row justify-center">
                                            <button
                                                className="border-2 border-[#1D1856] text-white bg-[#1D1856] h-[30px] w-[30px] rounded-md m-1 cursor-pointer flex justify-center items-center"
                                                onClick={() => handleOpenEditModal(user)}
                                                title='Editar'
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                    <path fill="white" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z" />
                                                </svg>
                                            </button>
                                            <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-transform duration-200">
                                                Editar
                                            </span>
                                            <Modal
                                                open={editModalOpen}
                                                aria-labelledby="edit-modal-title"
                                                aria-describedby="edit-modal-description"
                                                BackdropProps={{
                                                    style: {
                                                        backgroundColor: "rgba(128, 128, 128, 0.2)", // Gris con 50% de opacidad
                                                    },
                                                }}
                                            >
                                                <Box p={2} className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col w-[400px]" id="muestra" bgcolor="background.paper" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>

                                                    <div className="flex flex-row justify-between">
                                                        <h2 id="simple-modal-title" className='font-semibold text-1xl text-[#1D1856] mt-2'>Editar Usuario</h2>
                                                        <button onClick={handleCloseEditModal}><IoMdExit className="text-red-700 h-7 w-7" /></button>
                                                    </div>
                                                    <div className='border-b-2 border-gray-300 my-4'></div>

                                                    <label className='text-[13px] text-[#636363] mt-2 font-bold'>Nombre del Usuario: <span className='text-red-700'>*</span></label>
                                                    <input type="text" name='areaName' className='bg-[#fcfcfc] rounded-md h-[35px] p-[10px] text-[14px] border border-[#f2f2f2]' placeholder='Ingrese el nombre del usuario' autoComplete='off' value={currentUser ? currentUser.name : ''} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} />
                                                    {errors.name && <small className="text-red-700">{errors.name}</small>}

                                                    <label htmlFor="" className='text-[13px] text-[#636363] mt-4 font-bold'>Correo del Usuario: <span className='text-red-700'>*</span></label>
                                                    <input type="email" name='areaName' className='bg-[#fcfcfc] rounded-md h-[35px] p-[10px] text-[14px] border border-[#f2f2f2]' placeholder='Ingrese el correo del usuario' autoComplete='off' value={currentUser ? currentUser.email : ''} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} />
                                                    {errors.email && <small className="text-red-700">{errors.email}</small>}

                                                    <label htmlFor="rol" className="text-[13px] text-[#636363] mt-5 font-bold">
                                                        Rol: <span className="text-red-700">*</span>
                                                    </label>
                                                    <select
                                                        name="rol"
                                                        id="rol"
                                                        className="bg-[#fcfcfc] rounded-md h-[35px] p-[10px] text-[14px] border border-[#f2f2f2] cursor-pointer"
                                                        value={currentUser ? currentUser.rol : ""}
                                                        onChange={(e) => setCurrentUser({ ...currentUser, rol: e.target.value })}
                                                    >
                                                        <option value="" disabled>Seleccione un rol</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="user">Usuario</option>
                                                    </select>
                                                    {errors.rol && <small className="text-red-700">{errors.rol}</small>}

                                                    <button onClick={handleUpdateArea} className='bg-yellow-400 h-[35px] font-bold rounded-md text-white mt-[20px] text-[15px] flex justify-center items-center'>
                                                        Actualizar &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z" /></svg>
                                                    </button>
                                                </Box>
                                            </Modal>
                                            <button className="border-2 border-[#e22727] text-[#e22727] bg-[#ff9e9e] h-[30px] w-[30px] rounded-md m-1 cursor-pointer flex justify-center items-center" onClick={() => handleDeleteUser(user.id)} title='Eliminar'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM7 6v13z" /></svg>
                                            </button>
                                            <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-transform duration-200">
                                                Eliminar
                                            </span>
                                            <div className="flex justify-center items-center ml-1">
                                                <HiEye size={35} className="text-[#0B8F84] cursor-pointer" onClick={() => handleOpenOpportunityModal(user)} title='Ver Oportunidades' />
                                                <span className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 bg-gray-800 text-white text-xs px-2 py-1 rounded transition-transform duration-200">
                                                    Ver Oportunidades
                                                </span>
                                            </div>
                                            <Modal
                                                open={oportunityOpen}
                                                onClose={handleCloseOportunityModal}
                                                aria-labelledby="edit-modal-title"
                                                aria-describedby="edit-modal-description"
                                                BackdropProps={{
                                                    style: { backgroundColor: "rgba(128, 128, 128, 0.2)" },
                                                }}
                                            >
                                                <Box
                                                    p={2}
                                                    className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col 
                                                    w-[95%] max-w-[1800px] max-h-[120vh] overflow-hidden"
                                                    bgcolor="background.paper"
                                                >
                                                    <div className="flex flex-row justify-between">
                                                        <h2 className="font-semibold text-xl text-[#1D1856] mt-2">
                                                            Oportunidades del Usuario
                                                        </h2>
                                                        <button onClick={handleCloseOportunityModal}><IoMdExit className="text-red-700 h-7 w-7" /></button>
                                                    </div>

                                                    <div className="border-b-2 border-gray-300 my-4"></div>

                                                    {opportunities.length > 0 ? (
                                                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 
                                                            overflow-y-auto max-h-[70vh] p-2">
                                                            {opportunities.map((opportunity) => (
                                                                <li key={opportunity.id}
                                                                    className="bg-gray-100 rounded-lg overflow-hidden w-[380px] h-[380px] p-4 shadow-md">
                                                                    {opportunity ? (
                                                                        <OpportunityCard opportunity={opportunity} />
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
                                                </Box>
                                            </Modal>
                                        </div>

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
}