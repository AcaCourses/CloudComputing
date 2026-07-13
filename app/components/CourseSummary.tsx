"use client";

import {
  Target,
  Layers,
  BookOpen,
  Users,
  Wrench,
  Clock,
} from "lucide-react";
import { useStaggeredInView, useInView } from "../hooks/useInView";

const cards = [
  {
    icon: Target,
    title: "Objetivo General",
    description:
      "Comprender los fundamentos de cloud computing: modelos de servicio, despliegue, infraestructura, seguridad y costos.",
    color: "text-blue-dark",
  },
  {
    icon: Layers,
    title: "Estructura",
    description:
      "5 unidades temáticas con laboratorios prácticos semanales que convergen en un proyecto final integrador.",
    color: "text-blue",
  },
  {
    icon: BookOpen,
    title: "Modalidad",
    description:
      "Teórico-práctico. Sesiones presenciales con trabajo en laboratorio usando Google Skills.",
    color: "text-blue",
  },
  {
    icon: Users,
    title: "Público Objetivo",
    description:
      "Estudiantes de 7° semestre de MAyC, principiantes en cloud computing. No requiere experiencia previa en nube.",
    color: "text-orange",
  },
  {
    icon: Wrench,
    title: "Herramientas",
    description:
      "VS Code, GitHub, Google Skills (créditos gratuitos).",
    color: "text-green",
  },
  {
    icon: Clock,
    title: "Créditos y Horas",
    description:
      "64 horas por semestre. 2 sesiones semanales de 2 horas. Créditos según plan de estudios vigente.",
    color: "text-blue-dark",
  },
];

export default function CourseSummary() {
  const headerAnim = useInView();
  const { ref: gridRef, visibleItems } = useStaggeredInView(cards.length, 120);

  return (
    <section id="curso" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerAnim.ref}
          className={`mb-12 transition-all duration-700 ${
            headerAnim.isInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-blue" />
            <span className="text-xs font-medium text-blue uppercase tracking-wider">
              Resumen del Curso
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Panel de Información General
          </h2>
          <p className="mt-2 text-text-secondary max-w-2xl">
            Visión general de la estructura, modalidad y herramientas del curso.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <div
              key={card.title}
              className={`group p-5 rounded-xl border border-border bg-white hover:shadow-md hover:border-blue/25 hover:-translate-y-0.5 transition-all duration-300 ${
                visibleItems[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visibleItems[index] ? "0ms" : `${index * 120}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-grey-light border border-border/50 group-hover:border-blue/20 group-hover:bg-blue-light/40 transition-all duration-300">
                  <card.icon className={`w-5 h-5 ${card.color} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
