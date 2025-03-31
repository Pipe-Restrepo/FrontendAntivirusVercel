import { Link } from "@remix-run/react";

export default function FloatingWompiButton() {
    return (
        <div className="fixed bottom-10 right-4 flex items-center space-x-2 z-50">
            <Link
                to="https://checkout.wompi.co/l/FRfRVa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-400 text-white font-bold flex items-center px-12 py-1 rounded-full shadow-lg hover:bg-yellow-500 transition"
            >
                <img src="/assets/wompi/boton-wompi.png" alt="Wompi" className="h-16 w-16" />
                <span className="ml-2 text-lg">&nbsp;&nbsp;&nbsp;Donar ❤️</span>
            </Link>
        </div>
    );
}
