import { useEffect, useRef } from "react";
import { useSearchParams } from "@remix-run/react";
import Header from "~/components/Header";
import Inicio from "~/components/Inicio";
import Oportunity from "~/components/Oportunity";
import { Services } from "~/components/Services";

export default function Index() {
  const [searchParams] = useSearchParams();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.has("servicios") && servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <Inicio />
      <Oportunity />
      <div ref={servicesRef}>
      </div>
      <Services />
    </div>
  );
}
