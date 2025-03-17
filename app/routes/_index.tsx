import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Inicio - App Fundación Antivirus" },
    { name: "description", content: "Página de inicio de Antivirus" },
  ];
};

export default function Index() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4"style={{ color: '#32526E' }}>
        Bienvenido a la página oficial de la Fundación Antivirus
      </h1>
    </section>
  );
}