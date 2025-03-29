import { useState , useEffect} from "react";
import { Link, useLocation } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";


interface HeaderProps {
  user?: {
    name?: string;
    role?: string;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const [storedUser, setStoredUser] = useState<{ name?: string; role?: string } | null>(null);
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
  }, []);

  const currentUser = user || storedUser;

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
              <Link to="/?services" className="text-white hover:text-yellow-300">
                Servicios
              </Link>
              <Link to={isAuthenticated ? "/news" : "/?oportunities"}  className="text-white hover:text-yellow-300">
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
                <Link
                  to="/userProfile"
                  className="flex items-center gap-2 text-white text-lg font-semibold px-4 py-2 rounded-lg 
             hover:text-gray-300 transition-all duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
                  <span className="whitespace-nowrap">{currentUser?.name}</span>
                </Link>


                {user?.role === "admin" && (
                  <Link
                    to="/admin/profile"
                    className="text-white hover:text-gray-300 transition duration-300"
                  >
                    Panel Admin
                  </Link>
                )}

                <form method="post" action="/logout" onSubmit={(e) => { e.preventDefault(); localStorage.removeItem("user"); window.location.href = "/"; }}>
                  <button
                    type="submit"
                    className="px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-base rounded-lg font-bold shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
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
            )}
          </div>
        </nav>
      </header>
    </>
  );
}
