import { useState, useEffect } from "react";
import { Link, useLocation } from "@remix-run/react";
import { MdDashboardCustomize } from "react-icons/md";
import { IoMdExit } from "react-icons/io";
import userProfileImg from 'public/assets/images/perfil-del-usuario.png'
interface HeaderProps {
  isAuthenticated: boolean;
  user?: {
    name?: string;
    rol?: string;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const [storedUser, setStoredUser] = useState<{ name?: string; rol?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!(user || storedUser);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setStoredUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const currentUser = user || storedUser;
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
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
            <Link to="/" className="relative text-white hover:text-yellow-400 group">
              Inicio
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link to={isAuthenticated ? "/news" : "/?oportunities"} className="relative text-white hover:text-yellow-400 group">
              Oportunidades
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link to="/?services" className="relative text-white hover:text-yellow-400 group">
              Servicios
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
            </Link>
            <Link to="/ourteam" className="relative text-white hover:text-yellow-400 group">
              Sobre Nosotros
              <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
            </Link>
          </nav>

          {/* Menú hamburguesa para móviles */}
          <button
            className="md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-white"
            onClick={toggleModal}
            aria-label="Abrir menú"
          >
            <img src="/assets/images/barra-de-menus.png" alt="Menú" className="w-8 h-8 object-contain" />
          </button>
        </div>

        {/* Botones de Login, Registro y Perfil */}
        <div className="hidden md:flex items-center space-x-4 pr-4">
          {!isLoading && (
            storedUser ? (
              <div className="flex items-center space-x-4">
                {currentUser?.rol === "admin" && (
                  <Link
                    // to="/adminPanel" 
                    to="/dashboard"
                    className="text-white text-lg font-semibold px-4 py-2 rounded-lg hover:text-gray-300 transition-all"
                  >
                    <MdDashboardCustomize className="text-white h-10 w-10 hover:text-yellow-400 group" />
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}

                {/* Contenedor del nombre y el botón */}
                <div className="flex flex-col items-center">
                  <Link
                    to="/userProfile"
                    className="relative text-white text-lg font-bold hover:text-yellow-400 group whitespace-nowrap"
                  >
                    {currentUser?.name}
                    <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-yellow-400 transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
                  </Link>

                  <form
                    method="post"
                    action="/logout"
                    onSubmit={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                    className="mt-2"
                  >
                    <button
                      type="submit"
                      className="px-2 py-1 bg-[#D899A2] text-red-700 text-sm rounded-md font-semibold shadow-md hover:bg-[#C0808A] hover:shadow-lg transition-all duration-300 ease-in-out flex items-center gap-2 whitespace-nowrap"
                    >
                      <IoMdExit className="text-red-700 h-5 w-5" />
                      Cerrar Sesión
                    </button>
                  </form>
                </div>

                {/* Icono de usuario a la derecha */}
                <Link
                  to="/userProfile"
                  className="text-white text-lg font-semibold transition-all duration-300"
                >
                  <img
                    src={userProfileImg}
                    alt="Perfil"
                    className={`rounded-full object-contain ml-5 ${currentUser?.rol === "admin" ? "h-48 w-48" : "h-24 w-24"
                      }`}
                  />
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {!isLoginPage && (
                  <Link
                    to="/login"
                    className="relative flex items-center justify-between px-6 py-2 bg-white text-[#32526E] rounded-md font-semibold shadow transition w-[120px]"
                  >
                    Ingresa
                    <img
                      src="/assets/images/flecha_azul.png"
                      alt="Flechas azul"
                      className="w-8 h-8"
                    />
                  </Link>
                )}
                {!isRegisterPage && (
                  <Link
                    to="/register"
                    className="relative flex items-center justify-between px-6 py-2 bg-white text-[#32526E] rounded-md font-semibold shadow transition w-[140px] "
                  >
                    Regístrate
                    <img
                      src="/assets/images/flecha_colores.png"
                      alt="Flechas azul"
                      className="w-8 h-8"
                    />
                  </Link>
                )}
              </div>
            )
          )}
        </div>
      </nav>
    </header>
  );
}
