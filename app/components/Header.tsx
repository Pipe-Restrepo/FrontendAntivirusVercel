import { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import { getCookie } from "~/utils/cookies"; // Importamos getCookie

interface HeaderProps {
  user?: {
    role?: string;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getCookie("authToken"));

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  useEffect(() => {
    const token = getCookie("authToken"); // Obtenemos el token de las cookies
    setIsAuthenticated(!!token); // Si existe el token, está autenticado
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <nav className="flex items-center justify-between bg-gradient-to-b from-[#32526E] to-[#4B79A1] dark:bg-[#172a41] p-4 lg:px-20 w-full h-20 fixed top-0 z-50 shadow-lg sticky">
          <div className="flex items-center space-x-5 pl-4 lg:pl-20 w-full justify-between md:justify-start">
            <Link to="/" className="text-white logo">
              <img
                src="/assets/images/logo-antivirus.png"
                alt="Antivirus Logo"
                className="h-24 md:h-20"
              />
            </Link>

            {/* Navbar */}
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-white hover:text-yellow-300">
                Inicio
              </Link>
              <Link to="/servicios" className="text-white hover:text-yellow-300">
                Servicios
              </Link>
              <Link to="/novedades" className="text-white hover:text-yellow-300">
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
                    className="px-4 py-2 bg-red-500 text-white text-sm rounded-md font-semibold hover:bg-red-600 transition"
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
                    className="px-4 py-2 bg-white text-[#32526E] rounded-md font-semibold shadow hover:bg-yellow-300 transition"
                  >
                    Ingresa
                  </Link>
                )}
                {!isRegisterPage && (
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-white text-[#32526E] rounded-md font-semibold shadow hover:bg-yellow-300 transition"
                  >
                    Regístrate
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
