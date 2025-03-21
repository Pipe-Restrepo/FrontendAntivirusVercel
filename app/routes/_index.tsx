import type { MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Inicio from "~/components/Inicio";
import Oportunity from "~/components/Oportunity";
import { Services } from "~/components/Services";

export const meta: MetaFunction = () => {
  return [
    { title: "Inicio - App Fundación Antivirus" },
    { name: "description", content: "Página de inicio de Antivirus" },
  ];
};

export default function Index() {
  return (
    <div>
      <Header/>
      <Inicio/>
      <Oportunity/>
      <Services/>
    </div>
  );
}