import { TextField, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Modal, Box, TablePagination } from '@mui/material'
import { useEffect, useState } from 'react';
import { GiSpellBook } from "react-icons/gi";
import { IoMdExit } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import Swal from 'sweetalert2';

const API_BASE_URL = "http://localhost:5282/api";

export default function ListUsers() {
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    const [errors, setErrors] = useState ({});
    const [form, setForm] = useState({
        name: "",
        description: ""
    });

    const resetForm = () => {
        setForm({
            name: "",
            description: ""
        });
    };

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
        const fetchCategories = async () => {
            try {
                const data = await fetchData(`${API_BASE_URL}/Categories`);
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
    
        fetchCategories();
    }, []);

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

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'El nombre de la categoría es obligatoria.';
        if (!form.description.trim()) newErrors.description = 'La descripción de la categoría es obligatoria.';

        return newErrors;
    };

    const validateEditForm = () => {
        const newErrors = {};
        if (!currentCategory.name.trim()) newErrors.name = 'El nombre de la categoría es obligatoria.';
        if (!currentCategory.description.trim()) newErrors.description = 'La descripción de la categoría es obligatoria.';

        return newErrors;
    };

    const handleCreateCategory = async () => {
        try {
            // Validar el formulario antes de continuar
            const validationErrors = validateForm();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
    
            // Realizar la solicitud POST para crear la institución
            const newCategory = await fetchData(`${API_BASE_URL}/Categories`, {
                method: "POST",
                body: JSON.stringify(form),
            });
    
            // Actualizar la lista de instituciones en el estado agregando la nueva
            setCategories((prevCategories) => [...prevCategories, newCategory]);
    
            // Cerrar el modal de edición
            handleCloseModal();
            resetForm();
    
            // Mostrar notificación de éxito
            Swal.fire({
                toast: true,
                position: "top",
                icon: "success",
                title: "Categoría creada correctamente",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
        } catch (error) {
            console.error("Error creando la categoría:", error);
            handleCloseModal();
    
            // Extraer mensaje de error si está disponible
            const errorData = error.response?.data || {};
            const errorMessage =
                errorData.name?.[0] ||
                errorData.email?.[0] ||
                errorData.rol?.[0] ||
                "Hubo un problema al crear la categoría.";
    
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

    // Función editar Area
    const handleUpdateCategory = async () => {
        try {
            // Validar el formulario antes de continuar
            const validationErrors = validateEditForm();
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
            console.log(currentCategory)
            // Realizar la solicitud PUT para actualizar la institución
            await fetchData(`${API_BASE_URL}/Categories/${currentCategory?.id}`, {
                method: "PUT",
                body: JSON.stringify(currentCategory),
            });
    
            // Actualizar la lista de categorías en el estado
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === currentCategory?.id ? { ...category, ...currentCategory } : category
                )
            );
    
            // Cerrar el modal de edición
            handleCloseEditModal();
    
            // Mostrar notificación de éxito
            Swal.fire({
                toast: true,
                position: "top",
                icon: "success",
                title: "Categoría actualizada correctamente",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
        } catch (error) {
            console.error("Error actualizando la categoría:", error);
            handleCloseEditModal();
    
            // Extraer mensaje de error si está disponible
            const errorData = error.response?.data || {};
            const errorMessage = errorData.name?.[0] || "Hubo un problema al actualizar la categoría.";
    
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

    const handleDeleteCategory = async (categoryId: number) => {
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
                await fetchData(`${API_BASE_URL}/Categories?id=${categoryId}`, {
                    method: "DELETE",
                });
    
                // Actualizar el estado eliminando la categoría
                setCategories((prevCategories) =>
                    prevCategories.filter((category) => category.id !== categoryId)
                );
    
                Swal.fire({
                    toast: true,
                    position: "top",
                    icon: "success",
                    title: "Categoría eliminada correctamente",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            }
        } catch (error) {
            console.error("Error eliminando la categoría:", error);
    
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar la categoría.",
                icon: "error",
                confirmButtonText: "Cerrar",
            });
        }
    };

    const handleOpenEditModal = (category) => {
        setCurrentCategory({
            id: category.id,
            name: category.name,
            description: category.description,
          
        });
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="flex flex-col items-start mt-36 ml-16">
            <div className="flex flex-col mb-4">
                <div className="flex items-center space-x-4">
                    <GiSpellBook size={48} className="text-[#2C395B]" />
                    <h1 className="font-semibold text-3xl text-[#1D1856]">Gestión de Categorías</h1>
                </div>
                <small className='text-gray-600 mt-2 text-2xl'>Administra y gestiona la información de las categorías de la aplicación.</small>
            </div>
            <div className='w-[95%] overflow-hidden'>
            <Modal
                open={modalOpen}

                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Box p={2} className="bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col w-[400px]" id="muestra" bgcolor="background.paper" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <div className="flex flex-row justify-between">
                        <h2 id="simple-modal-title" className='font-semibold text-1xl text-[#1D1856] mt-2'>Crear Categoría</h2>
                        <button onClick={handleCloseModal}><IoMdExit className="text-red-700 h-7 w-7" /></button>
                    </div>
                    <div className='border-b-2 border-gray-300 my-4'></div>

                    <label htmlFor="" className='text-[13px] text-[#636363] mt-2 font-bold mt-2'>Nombre de la Categoría: <span className="text-red-700">*</span></label>
                    <input type="text" name='areaName' className='bg-[#fcfcfc] rounded-md h-[35px] p-[10px] text-[14px] border border-[#f2f2f2]' placeholder='Ingrese el nombre de la categoría' autoComplete='off' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
                    {errors.name && <small className="text-red-700">{errors.name}</small>}

                    <label htmlFor="" className='text-[13px] text-[#636363] mt-4 font-bold mt-2'>Descripción de la Categoría: <span className="text-red-700">*</span></label>
                    <input type="text" name='areaName' className='bg-[#fcfcfc] rounded-md h-[35px] p-[10px] text-[14px] border border-[#f2f2f2]' placeholder='Ingrese la descripción de la categoría' autoComplete='off' value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}/>
                    {errors.description && <small className="text-red-700">{errors.description}</small>}

                    <button onClick={handleCreateCategory} className='bg-yellow-400 h-[35px] font-bold rounded-md text-white mt-[20px] text-[15px] flex justify-center items-center'>
                        Guardar &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z" /></svg>
                    </button>
                </Box>
            </Modal>
            <TextField
                margin="normal"
                className="buscador"
                variant="outlined"
                label={
                    <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <AiOutlineSearch size={25} /> Buscar Categoría
                    </span>
                }
                fullWidth
                onChange={handleSearchChange}
            />
            <div className='flex justify-end'>
                <button className="bg-[#0B8F84] p-[10px] mt-2 w-[200px] h-[50px] rounded-md text-[18px] font-bold flex flex-row items-center text-white" onClick={handleOpenModal}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z" /></g></svg> &nbsp; Nuevo registro</button>
            </div>
            <TableContainer component={Paper} className='mt-5 rounded-lg shadow-lg border border-gray-300'>
                <Table>
                    <TableHead>
                        <TableRow className="bg-[#1D1856]">
                            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "white", width: "55%" }}>Descripción</TableCell>
                            <TableCell sx={{ fontWeight: "bold", color: "white", textAlign: "center" }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
                            <TableRow key={category.id}>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>
                                    <div className="flex flex-row justify-center">
                                        <button 
                                            className="border-2 border-[#1D1856] text-white bg-[#1D1856] h-[30px] w-[30px] rounded-md m-1 cursor-pointer flex justify-center items-center"
                                            onClick={() => handleOpenEditModal(category)}
                                            >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="white" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4q0 .375-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z" />
                                            </svg>
                                        </button>
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
                                                    <h2 id="simple-modal-title" className='font-semibold text-1xl text-[#1D1856] mt-2'>Editar Categoría</h2>
                                                    <button onClick={handleCloseEditModal}><IoMdExit className="text-red-700 h-7 w-7" /></button>
                                                </div>
                                                <div className='border-b-2 border-gray-300 my-4'></div>

                                                <label htmlFor="" className='text-[13px] text-[#636363] mt-2 font-bold mt-2'>Nombre de la Categoría: <span className="text-red-700">*</span></label>
                                                <input type="text" name='areaName' className='bg-[#fcfcfc] rounded-md h-[35px] p-[10px] text-[14px] border border-[#f2f2f2]' placeholder='Ingrese el nombre de la categoría' autoComplete='off' value={currentCategory ? currentCategory.name: ''} onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}/>
                                                {errors.name && <small className="text-red-700">{errors.name}</small>}

                                                <label htmlFor="" className='text-[13px] text-[#636363] mt-4 font-bold mt-2'>Descripción de la Categoría: <span className="text-red-700">*</span></label>
                                                <input type="text" name='areaName' className='bg-[#fcfcfc] rounded-md h-[35px] p-[10px] text-[14px] border border-[#f2f2f2]' placeholder='Ingrese la descripción de la categoría' autoComplete='off' value={currentCategory ? currentCategory.description: ''} onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}/>
                                                {errors.description && <small className="text-red-700">{errors.description}</small>}

                                                <button onClick={handleUpdateCategory} className='bg-yellow-400 h-[35px] font-bold rounded-md text-white mt-[20px] text-[15px] flex justify-center items-center'>
                                                    Actualizar &nbsp; <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11.175q.4 0 .763.15t.637.425l2.85 2.85q.275.275.425.638t.15.762V19q0 .825-.587 1.413T19 21zM19 7.85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-5-8h7q.425 0 .713-.288T15 9V7q0-.425-.288-.712T14 6H7q-.425 0-.712.288T6 7v2q0 .425.288.713T7 10M5 7.85V19V5z" /></svg>
                                                </button>
                                            </Box>
                                        </Modal>
                                        <button className="border-2 border-[#e22727] text-[#e22727] bg-[#ff9e9e] h-[30px] w-[30px] rounded-md m-1 cursor-pointer flex justify-center items-center" onClick={() => handleDeleteCategory(category.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM7 6v13z" /></svg>
                                        </button>
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
                count={filteredCategories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </div>
        </div>
    );
}