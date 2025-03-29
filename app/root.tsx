import { json } from "@remix-run/node";
import {
  useLoaderData,
  Outlet,
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { tokenCookie } from "./utils/cookies";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { useEffect, useState } from "react";

import "./tailwind.css";

// This will be expanded later with actual user data
interface UserSession {
  isAuthenticated: boolean;
  user?: {
    name?: string;
    email?: string;
  } | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const token = (await tokenCookie.parse(cookieHeader)) || null;
  
  // For now, just return authentication status
  // Later this will include actual user data from backend
  return json<UserSession>({ 
    isAuthenticated: !!token,
    user: token ? { name: "Usuario" } : null // Placeholder until backend integration
  });
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
  },
];

export default function App() {
  const { isAuthenticated, user } = useLoaderData<typeof loader>();

  // Estado para almacenar el usuario desde localStorage
  const [storedUser, setStoredUser] = useState<UserSession["user"] | null>(null);

  // Cargar usuario desde localStorage cuando el componente se monta
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setStoredUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <html lang="es" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full flex flex-col">
        <Header isAuthenticated={isAuthenticated} user={storedUser || user} />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}