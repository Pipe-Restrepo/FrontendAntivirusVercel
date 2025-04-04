import { FaUserFriends } from "react-icons/fa";
import { MdMapsHomeWork } from "react-icons/md";
import { GiSpellBook } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { MdDashboardCustomize } from "react-icons/md";
import { Link } from "@remix-run/react";

const data = [
    {
        id: 1,
        name: "Gestión de Usuarios",
        enlace: "/users",
        icono: <FaUserFriends size={80} className="text-[#2C395B]" />,
        color: "#2C395B",
        secondary: "#ADD6FF",
    },
    {
        id: 2,
        name: "Gestión de Instituciones",
        enlace: "/institutions",
        icono: <MdMapsHomeWork size={80} className="text-[#FAA307]" />,
        color: "#FAA307",
        secondary: "#FBE1A5",
    },
    {
        id: 3,
        name: "Gestión de Categorías",
        enlace: "/categories",
        icono: <GiSpellBook size={80} className="text-[#0B8F84]" />,
        color: "#0B8F84",
        secondary: "#CCEDE8",
    },
    {
        id: 4,
        name: "Gestión de Oportunidades",
        enlace: "/oportunities",
        icono: <PiStudentFill size={80} className="text-[#4D3281]" />,
        color: "#4D3281",
        secondary: "#D3C3E3",
    },
];

export default function DashBoard() {
    return (
        <div className="flex flex-col items-start mt-36 ml-16">
            <div className="flex flex-col mb-4">
                <div className="flex items-center space-x-4">
                    <MdDashboardCustomize size={48} className="text-[#2C395B]" />
                    <h1 className="justify-between items-center font-semibold text-3xl" style={{ color: '#1D1856' }}>Gestión Administrativa</h1>
                </div>

                <small className='text-gray-600 mt-2 text-2xl'>Gestiona y administra de manera eficiente la información administrativa y recursos del sistema.</small>
            </div>
            <div className="flex flex-row justify-center items-center flex-wrap mx-auto mb-6">
                {data.map((item) => (
                    <Link
                        key={item.id}
                        to={item.enlace}
                        className="w-80 m-4 h-64 flex flex-col items-center p-5 border border-transparent h-full rounded-lg transition-all duration-200 ease-in-out cursor-pointer shadow-lg"
                        style={{ backgroundColor: item.color }}
                    >
                        <div className="w-48 h-48 flex items-center justify-center rounded-lg" style={{ backgroundColor: item.secondary }}>
                            {item.icono}
                        </div>
                        <span className='text-base font-semibold text-white h-10 text-center flex items-center mt-2 leading-4'>{item.name}</span>
                    </Link>
                ))}

            </div>
        </div>
    );
}