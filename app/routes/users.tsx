import { TextField } from '@mui/material'
import { useState } from 'react';
import { FaUserFriends } from "react-icons/fa";

export default function ListUsers() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    }

    const handleCloseModal = () => {
        setModalOpen(false);
    }



    return (
        <div className="flex flex-col items-start mt-36 ml-16">
            <div className="flex flex-col mb-4">
                <div className="flex items-center space-x-4">
                    <FaUserFriends size={48} className="text-[#2C395B]" />
                    <h1 className="font-semibold text-3xl text-[#1D1856]">Gestión de Usuarios</h1>
                </div>
                <small className='text-gray-600 mt-2 text-2xl'>Administra y gestiona la información de los usuarios de la aplicación.</small>
            </div>
            <TextField
                margin="normal"
                className="buscador"
                variant="outlined"
                label="Buscar Usuario"
                fullWidth
                //onChange={handleSearchChange}
            />
        </div>
    );
}