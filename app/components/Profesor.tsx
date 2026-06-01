"use client";

import { useRef, useState, useEffect } from "react";
import { User, ExternalLink } from "lucide-react";

export default function Profesor() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="profesor" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-blue" />
            <span className="text-xs font-medium text-blue uppercase tracking-wider">
              Docente
            </span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center gap-3">
              <User className="w-6 h-6 text-blue" />
              Sobre el Profesor
            </h2>
            <a
              href="https://aca-courses-porta-folio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-blue hover:text-blue-dark transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir en nueva pestaña
            </a>
          </div>

          <div className="rounded-xl border border-border bg-white shadow-sm overflow-hidden">
            <iframe
              src="https://aca-courses-porta-folio.vercel.app/"
              className="w-full h-[600px] sm:h-[700px] lg:h-[800px] border-0"
              title="Portafolio del Profesor"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
