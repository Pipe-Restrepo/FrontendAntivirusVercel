import { Link } from "@remix-run/react";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-b from-[#32526E] to-[#4B79A1] dark:bg-[#172a41] text-white py-10 flex flex-col items-center w-full"
    >
      {/* Se crea Logo antivirus */}

      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-20 mb-10">
        <img src="/assets/images/logo-antivirus.png" alt="Antivirus Logo" className="h-24" />
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold">Contáctanos para más información</p>
          <p className="text-sm text-gray-100">Únete y siguenos en nuestras redes sociales</p>
        </div>
      </div>

      {/* Se crean botones de Redes sociales de antivirus */}

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
        <p>Banco de Oportunidades</p>
        <p>Fundación Antivirus &copy; 2025 Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;