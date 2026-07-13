"use client";

import { useState, useEffect, useRef } from "react";
import {
  Cloud,
  Server,
  Monitor,
  Zap,
  Database,
  Code,
  Shield,
  ChevronRight,
} from "lucide-react";
import { useInView } from "../hooks/useInView";
import { unitsData } from "@/data/units";
import type { LucideIcon } from "lucide-react";

type UnitDisplay = {
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  color: string;
  borderColor: string;
  tags: string[];
  modules: string[];
};

const unitMeta: Record<number, { description: string; icon: LucideIcon; color: string; borderColor: string; tags: string[] }> = {
  1: { description: "Conceptos base de cloud computing, historia, ventajas, modelos IaaS/PaaS/SaaS y tipos de despliegue.", icon: Cloud, color: "text-azure", borderColor: "border-azure/30", tags: ["fundamentals", "models"] },
  2: { description: "Arquitectura cloud, acceso, consola, herramientas de trabajo y automatización.", icon: Monitor, color: "text-cyan", borderColor: "border-cyan/30", tags: ["architecture", "tools"] },
  3: { description: "Máquinas virtuales, escalamiento, contenedores, orquestación y serverless.", icon: Server, color: "text-success", borderColor: "border-success/30", tags: ["compute", "containers"] },
  4: { description: "Eventos, funciones reactivas, automatización y despliegues básicos.", icon: Zap, color: "text-unam-gold", borderColor: "border-unam-gold/30", tags: ["events", "automation"] },
  5: { description: "Opciones de almacenamiento, datos estructurados/no estructurados y arquitectura.", icon: Database, color: "text-azure", borderColor: "border-azure/30", tags: ["storage", "data"] },
  6: { description: "Almacenamiento de objetos, bases de datos SQL, NoSQL y distribuidas.", icon: Database, color: "text-cyan", borderColor: "border-cyan/30", tags: ["SQL", "NoSQL"] },
  7: { description: "APIs REST, gestión de APIs, mensajería e integración asíncrona.", icon: Code, color: "text-success", borderColor: "border-success/30", tags: ["APIs", "messaging"] },
  8: { description: "Seguridad cloud, responsabilidad compartida, cifrado e IAM.", icon: Shield, color: "text-unam-gold", borderColor: "border-unam-gold/30", tags: ["security", "IAM"] },
};

const defaultMeta = { description: "", icon: Server, color: "text-azure", borderColor: "border-azure/30", tags: [] };

const units: UnitDisplay[] = unitsData.map((u) => {
  const meta = unitMeta[u.number] ?? defaultMeta;
  return {
    number: u.number,
    title: u.title,
    shortTitle: u.shortTitle,
    description: meta.description,
    icon: meta.icon,
    color: meta.color,
    borderColor: meta.borderColor,
    tags: meta.tags,
    modules: u.modules.map((m) => m.title),
  };
});

export default function Units() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const headerAnim = useInView();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const viewportMid = window.innerHeight * 0.6;
      const scrolled = viewportMid - rect.top;
      const pct = Math.min(Math.max(scrolled / totalHeight, 0), 1);
      setLineHeight(pct * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="unidades" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-grey-light/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerAnim.ref}
          className={`mb-12 transition-all duration-700 ${
            headerAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-blue-dark" />
            <span className="text-xs font-medium text-blue-dark uppercase tracking-wider">
              Módulos del Curso
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Unidades Temáticas
          </h2>
          <p className="mt-2 text-text-secondary max-w-2xl">
            {unitsData.length} unidades que cubren el espectro completo de fundamentos cloud.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Vertical line - background track */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-border/40 rounded-full" />
          {/* Vertical line - animated fill */}
          <div
            className="absolute left-6 sm:left-8 top-0 w-0.5 bg-gradient-to-b from-blue via-green to-orange rounded-full transition-[height] duration-200 ease-out"
            style={{ height: `${lineHeight}%` }}
          />

          <div className="space-y-0">
            {units.map((unit) => (
              <TimelineUnit
                key={unit.number}
                unit={unit}
                expanded={expanded === unit.number}
                onToggle={() =>
                  setExpanded(expanded === unit.number ? null : unit.number)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineUnit({
  unit,
  expanded,
  onToggle,
}: {
  unit: UnitDisplay;
  expanded: boolean;
  onToggle: () => void;
}) {
  const anim = useInView({ rootMargin: "0px 0px -150px 0px", threshold: 0.15 });

  return (
    <div
      ref={anim.ref}
      className={`relative pl-16 sm:pl-20 pb-10 transition-all duration-700 delay-100 ${
        anim.isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
      }`}
    >
      {/* Timeline node */}
      <div
        className={`absolute left-3.5 sm:left-5.5 top-5 w-5 h-5 rounded-full border-[3px] transition-all duration-500 delay-200 ${
          anim.isInView ? "scale-100" : "scale-0"
        } ${
          expanded
            ? "bg-blue border-blue scale-125 shadow-md shadow-blue/30"
            : "bg-white border-border hover:border-blue/50"
        }`}
      />

      {/* Card */}
      <div
        className={`rounded-xl border transition-all duration-300 overflow-hidden ${
          expanded
            ? `${unit.borderColor} shadow-md shadow-black/5`
            : "border-border hover:border-blue/20 hover:shadow-sm"
        } bg-white`}
      >
        {/* Unit header */}
        <button
          onClick={onToggle}
          className="w-full p-5 flex items-center gap-4 text-left group"
        >
          {/* Unit number */}
          <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 shrink-0 ${
            expanded ? "bg-blue-light" : "bg-grey-light group-hover:bg-blue-light/50"
          }`}>
            <span className={`text-sm font-bold transition-colors duration-300 ${
              expanded ? "text-blue-dark" : "text-text-secondary"
            }`}>
              {String(unit.number).padStart(2, "0")}
            </span>
          </div>

          {/* Icon */}
          <div className={`p-2 rounded-lg transition-all duration-300 shrink-0 ${
            expanded ? "bg-blue-light/60" : "bg-grey-light group-hover:bg-blue-light/30"
          }`}>
            <unit.icon className={`w-5 h-5 ${unit.color} transition-transform duration-300 ${expanded ? "scale-110" : "group-hover:scale-105"}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
              {unit.title}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5 hidden sm:block">
              {unit.description}
            </p>
          </div>

          {/* Meta */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {unit.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] uppercase tracking-wider text-blue-dark/70 px-2 py-0.5 rounded-full border border-blue/20 bg-blue-light/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Expand icon */}
          <div className={`transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}>
            <ChevronRight className="w-4 h-4 text-text-secondary shrink-0" />
          </div>
        </button>

        {/* Expanded modules with animation */}
        <div
          className={`grid transition-all duration-400 ease-in-out ${
            expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-border/50">
              <div className="pt-4 grid sm:grid-cols-2 gap-2">
                {unit.modules.map((mod, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-grey-light/60 border border-border/30 hover:border-blue/20 hover:bg-blue-light/20 transition-all duration-200 group/mod"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue/40 group-hover/mod:bg-blue group-hover/mod:scale-125 transition-all duration-200 shrink-0" />
                    <span className="text-xs text-text-secondary group-hover/mod:text-foreground transition-colors">{mod}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}