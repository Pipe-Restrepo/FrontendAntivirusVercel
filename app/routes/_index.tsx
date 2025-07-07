import { useEffect, useRef,useState } from "react";
import { useSearchParams } from "@remix-run/react";
import Header from "~/components/Header";
import Inicio from "~/components/Inicio";
import Oportunity from "~/components/Oportunity";
import { Services } from "~/components/Services";

type Respuesta = { error?: string } | Record<string, unknown> | null;

export default function Index() {
  const [searchParams] = useSearchParams();
  const servicesRef = useRef<HTMLDivElement>(null);
  const opotunitysRef = useRef<HTMLDivElement>(null);
  const [respuesta, setRespuesta] = useState<Respuesta>(null);


useEffect(() => {
  const fetchPing = async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/test/ping`;
      console.log("🌐 Probando URL:", url);

      const res = await fetch(url);

      const contentType = res.headers.get("content-type");
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      if (!contentType?.includes("application/json")) throw new Error("❌ No es una respuesta JSON");

      const data = await res.json();
      setRespuesta(data);
    } catch (err) {
      console.error("❌ Error al llamar al backend:", err);
      setRespuesta({ error: String(err) });
    }
  };

  fetchPing();
}, []);


  // Smooth scroll helper
  const smoothScrollTo = (element: HTMLElement) => {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1 segundo
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  };

  useEffect(() => {
    if (searchParams.has("services") && servicesRef.current) {
      smoothScrollTo(servicesRef.current);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.has("oportunities") && opotunitysRef.current) {
      smoothScrollTo(opotunitysRef.current);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <h2>Ping desde el frontend</h2>
        <pre>{JSON.stringify(respuesta, null, 2)}</pre>
      </div>
      <Header isAuthenticated={false} />
      <Inicio />
      <div ref={opotunitysRef} className="w-full">
        <Oportunity />
      </div>
      <div ref={servicesRef} className="w-full">
        <Services />
      </div>
    </div>
  );
}
