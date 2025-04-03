import { useState } from "react";
import casa from "/assets/inicio/casa.svg";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";

export default function Inicio() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="pt-40 p-10">
            <div className="flex pt-10">
                <div className="w-7/12 flex justify-center items-center">
                    <div className="w-5/6">
                        <div>
                            <h1 className="text-[80px] font-bold text-[#1D1856] pb-5 leading-none whitespace-nowrap">¡Tu futuro inicia aquí!</h1>
                        </div>
                        <div>
                            <p className="text-justify text-2xl font-normal">
                                En la Fundación Antivirus para la Deserción creemos que cada persona merece acceso a las mejores oportunidades. Por eso, ofrecemos una plataforma personalizada donde puedes explorar becas, cursos y programas adaptados a tus intereses y necesidades.
                            </p>
                        </div>
                        <div className="flex gap-5 pt-8">
                            {/* Botón para abrir el modal */}
                            <button 
                                className="text-[28px] bg-[#FAA307] text-white py-2 px-3 rounded-md"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Contáctanos
                            </button>
                            <p className="text-[26px] text-[#29282C] pt-3">o</p>
                            <Link
                                to="/ourteam"
                                className="text-[28px] bg-[#FAA307] text-white py-2 px-3 rounded-md inline-block"
                            >
                                Conoce sobre Nosotros
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="w-5/12 pt-5 flex justify-center">
                    <img src={casa} alt="casa" className="w-3/4" />
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                    <div className="bg-gradient-to-b from-[#32526E] to-[#4B79A1] dark:bg-[#172a41] p-6 rounded-lg shadow-lg w-1/3">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-2xl font-bold text-white">Contáctanos</h2>
                            <button onClick={() => setIsModalOpen(false)}><IoMdExit className="text-red-700 h-7 w-7" /></button>
                        </div>
                        <div>
                            <img
                                src="/assets/images/logo-antivirus.png"
                                alt="Antivirus Logo"
                                className="h-24 md:h-20"
                            />
                            <div className="flex flex-wrap justify-center gap-5 mb-5">
                                {/* Facebook */}
                                <a
                                href="https://www.facebook.com/antivirusparaladesercion/?locale=es_LA"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group flex items-center justify-center"
                                >
                                <span className="absolute w-14 h-14 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-125"></span>
                                <img
                                    src="/assets/icons/icono-facebook.png"
                                    alt="Facebook"
                                    className="w-10 h-10 invert brightness-0 group-hover:scale-110 transition-transform relative"
                                />
                                </a>

                                {/* LinkedIn */}
                                <a
                                href="https://www.linkedin.com/company/antivirus-desercion/?originalSubdomain=co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group flex items-center justify-center"
                                >
                                <span className="absolute w-14 h-14 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-125"></span>
                                <img
                                    src="/assets/icons/icono-linkedin.png"
                                    alt="LinkedIn"
                                    className="w-10 h-10 invert brightness-0 group-hover:scale-110 transition-transform relative"
                                />
                                </a>

                                {/* Instagram */}
                                <a
                                href="https://www.instagram.com/somosantivirus"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group flex items-center justify-center"
                                >
                                <span className="absolute w-14 h-14 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-125"></span>
                                <img
                                    src="/assets/icons/icono-instagram.png"
                                    alt="Instagram"
                                    className="w-10 h-10 invert brightness-0 group-hover:scale-110 transition-transform relative"
                                />
                                </a>

                                {/* YouTube */}
                                <a
                                href="https://www.youtube.com/c/AntivirusparalaDeserci%C3%B3n"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group flex items-center justify-center"
                                >
                                <span className="absolute w-14 h-14 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-125"></span>
                                <img
                                    src="/assets/icons/icono-youtube.png"
                                    alt="YouTube"
                                    className="w-10 h-10 invert brightness-0 group-hover:scale-110 transition-transform relative"
                                />
                                </a>

                                {/* WhatsApp */}
                                    <a
                                href="https://wa.me/573217066273"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group flex items-center justify-center"
                                >
                                <span className="absolute w-14 h-14 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity scale-125"></span>
                                <img
                                    src="/assets/icons/icono-whatsapp.png"
                                    alt="WhatsApp"
                                    className="w-10 h-10 invert brightness-0 group-hover:scale-110 transition-transform relative"
                                />
                                </a>

                                </div>

                            {/* Se crea container de derechos de autor */}

                            <div className="text-center text-sm text-white-300 px-4">
                                <p className="text-white">Banco de Oportunidades</p>
                                <p className="text-white">Fundación Antivirus &copy; 2025 Todos los derechos reservados</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
