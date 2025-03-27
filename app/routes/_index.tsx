import { useEffect, useRef } from "react";
import { useSearchParams } from "@remix-run/react";
import Header from "~/components/Header";
import Inicio from "~/components/Inicio";
import Oportunity from "~/components/Oportunity";
import { Services } from "~/components/Services";

export default function Index() {
  const [searchParams] = useSearchParams();
  const servicesRef = useRef<HTMLDivElement>(null);
  const opotunitysRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
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
