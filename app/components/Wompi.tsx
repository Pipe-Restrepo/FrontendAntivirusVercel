import { Link } from "@remix-run/react";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function FloatingWompiButton() {
    const [expanded, setExpanded] = useState(true);
    const [rotation, setRotation] = useState(0);

    const toggleExpand = () => {
        setRotation(expanded ? rotation + 360 : rotation - 360); // Cambia la dirección de giro
        setExpanded(!expanded);
    };

    return (
        <div className="fixed bottom-10 right-4 flex items-center space-x-2 z-50">
            {/* Botón para expandir/contraer */}
            <button
                onClick={toggleExpand}
                className="bg-yellow-400 text-white rounded-full p-2 shadow-lg hover:bg-yellow-500 transition"
            >
                {expanded ? <AiOutlineRight size={24} /> : <AiOutlineLeft size={24} />}
            </button>

            {/* Enlace Wompi */}
            <Link
                to="https://checkout.wompi.co/l/FRfRVa"
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-yellow-400 text-white font-bold flex items-center rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 overflow-hidden"
                style={{
                    width: expanded ? "180px" : "64px", // Ancho dinámico
                    height: "64px", // Altura fija
                    padding: expanded ? "0 12px" : "0", // Espaciado dinámico
                }}
            >
                {/* Imagen con rotación (NO cambia de tamaño) */}
                <img
                    src="/assets/wompi/boton-wompi.png"
                    alt="Wompi"
                    style={{
                        transform: `rotate(${rotation}deg)`,
                        transition: "transform 0.5s linear",
                        width: "64px",
                        height: "64px",
                    }}
                    className="absolute left-0"
                />

                {/* Texto "Donar ❤️" (Solo visible cuando está expandido) */}
                <span
                    className="ml-16 text-lg transition-opacity duration-300 whitespace-nowrap"
                    style={{
                        opacity: expanded ? 1 : 0,
                        width: expanded ? "auto" : "0px",
                    }}
                >
                    Donar ❤️
                </span>
            </Link>
        </div>
    );
}

