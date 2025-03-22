import { useState } from "react";
import { Link, useLocation } from "@remix-run/react";

interface HeaderProps {
  isAuthenticated: boolean;
  user?: {
    role?: string;
  } | null;
}

export default function Header({ isAuthenticated, user }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("ESP");
  const [darkMode, setDarkMode] = useState(false);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleLanguage = () =>
    setCurrentLanguage(currentLanguage === "ESP" ? "ENG" : "ESP");
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <nav className="flex items-center justify-between bg-gradient-to-b from-[#32526E] to-[#4B79A1] dark:bg-[#172a41] p-4 lg:px-20 w-full h-20 fixed top-0 z-50 shadow-lg">
        {/* Logo */}
        <div className="flex items-center space-x-5 pl-4 lg:pl-20 w-full justify-between md:justify-start">
          <Link to="/home" className="text-white logo">
            <img
              src="/assets/images/logo-antivirus.png"
              alt="Antivirus Logo"
              className="h-20 md:h-16"
            />
          </Link>

          {/* Navbar (visible en pantallas medianas y grandes) */}
          <nav className="hidden md:flex space-x-6">
            <Link to="#inicio" className="text-white hover:text-yellow-300">
              Inicio
            </Link>
            <Link to="#servicios" className="text-white hover:text-yellow-300">
              Servicios
            </Link>
            <Link to="#oportunidades" className="text-white hover:text-yellow-300">
              Oportunidades
            </Link>
          </nav>

          {/* Menú hamburguesa para móviles */}
          <button
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={toggleModal}
            aria-label="Abrir menú"
          >
            <img
              src="/assets/images/barra-de-menus.png"
              alt="Menú"
              className="w-8 h-8 object-contain"
            />
          </button>
        </div>

        {/* Botones de Login, Registro y Perfil */}
        <div className="hidden md:flex items-center space-x-4 pr-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link to="/profile" className="text-white hover:text-yellow-300">
                Mi Perfil
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin/profile" className="text-white hover:text-yellow-300">
                  Panel Admin
                </Link>
              )}
              <form method="post" action="/logout">
                <button
                  type="submit"
                  className="px-2 py-1 bg-red-500 text-white text-sm rounded font-medium hover:bg-red-600 transition"
                >
                  Salir
                </button>
              </form>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {!isLoginPage && (
                <Link
                  to="/login"
                  className={`px-3 py-1 bg-white text-[#32526E] rounded-full text-sm font-medium shadow hover:bg-yellow-300 transition ${
                    isLoginPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  style={isLoginPage ? { pointerEvents: "none" } : {}}
                >
                  Ingresa
                </Link>
              )}
              {!isRegisterPage && (
                <Link
                  to="/register"
                  className="px-3 py-1 bg-white text-[#32526E] rounded-full text-sm font-medium shadow hover:bg-yellow-300 transition"
                >
                  Regístrate
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Botón de cambio de idioma */}
        <button onClick={toggleLanguage} className="ml-4 text-white hover:scale-110">
          {currentLanguage}
        </button>

        {/* Botón de Modo Oscuro/Claro */}
        <button onClick={toggleDarkMode} className="ml-4 hover:scale-110">
          <img
            src="/assets/images/modo-oscuro.png"
            alt={darkMode ? "Light Mode" : "Dark Mode"}
            className="w-10 h-10 object-contain"
          />
        </button>
      </nav>

      {/* Barra de búsqueda */}
      <div className="flex justify-center bg-gradient-to-b from-[#32526E] to-[#4B79A1] pt-8 pb-4 mt-20">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Busca tu próxima oportunidad"
              className="w-full h-[50px] pl-12 pr-12 rounded-full bg-white text-gray-700 shadow-md focus:outline-none text-sm"
            />
            <img
              src="/assets/images/lupa-buscador.png"
              alt="Buscar"
              className="absolute left-8 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
            <button className="absolute right-8 top-1/2 transform -translate-y-1/2">
              <img
                src="/assets/images/filtro-buscador.png"
                alt="Filtrar"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
