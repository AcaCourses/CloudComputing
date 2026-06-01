"use client";

import { useEffect, useState } from "react";
import {
  Cloud,
  Clock,
  CalendarDays,
  FlaskConical,
  FolderKanban,
  GraduationCap,
} from "lucide-react";

const metrics = [
  { icon: Cloud, label: "Unidades", value: "5", color: "text-azure" },
  { icon: Clock, label: "Horas semestre", value: "64", color: "text-cyan" },
  { icon: CalendarDays, label: "Sesiones/semana", value: "2", color: "text-azure" },
  { icon: FlaskConical, label: "Labs semanales", value: "✓", color: "text-success" },
  { icon: FolderKanban, label: "Proyecto final", value: "Integrador", color: "text-unam-gold" },
  { icon: GraduationCap, label: "Azure for Students", value: "Activo", color: "text-success" },
];

const TITLE_TEXT = "Fundamentos de Computación en la Nube";

function useTypewriter(text: string, speed = 60, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    let timeout: NodeJS.Timeout;

    const startTimeout = setTimeout(() => {
      const type = () => {
        if (i < text.length) {
          i++;
          setDisplayed(text.slice(0, i));
          timeout = setTimeout(type, speed);
        } else {
          setDone(true);
        }
      };
      type();
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useTypewriter(TITLE_TEXT, 55, 500);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-light/50 via-grey-light to-white" />

      {/* Floating blobs - cloud-inspired */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full bg-blue/[0.07] blur-[80px] animate-[float_20s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-red/[0.05] blur-[80px] animate-[float_25s_ease-in-out_infinite_reverse]" />
        <div className="absolute bottom-0 left-1/3 w-[450px] h-[350px] rounded-full bg-green/[0.06] blur-[80px] animate-[float_22s_ease-in-out_2s_infinite]" />
        <div className="absolute top-10 right-1/3 w-[300px] h-[300px] rounded-full bg-yellow/[0.08] blur-[60px] animate-[float_18s_ease-in-out_1s_infinite_reverse]" />
        <div className="absolute bottom-1/4 -right-10 w-[350px] h-[350px] rounded-full bg-blue-dark/[0.05] blur-[90px] animate-[float_24s_ease-in-out_3s_infinite]" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/20 to-white/70" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(66,133,244,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(66,133,244,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Institutional badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-unam-gold/30 bg-unam-gold/5">
              <div className="w-2 h-2 rounded-full bg-unam-gold animate-pulse" />
              <span className="text-xs font-medium text-unam-gold tracking-wide uppercase">
                UNAM · FES Acatlán · 2026-2
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg sm:text-xl font-medium text-azure">
                Temas Selectos de Computación I
              </h2>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight min-h-[2.4em]">
                {displayed}
                <span
                  className={`inline-block w-[3px] h-[1em] ml-1 bg-blue align-middle ${
                    done ? "animate-pulse-soft" : "animate-[blink_0.7s_steps(1)_infinite]"
                  }`}
                />
              </h1>
            </div>

            <div className="space-y-2">
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl">
                Introducción a modelos de servicio y despliegue, infraestructura cloud,
                gestión de costos, seguridad y confiabilidad. Un curso práctico orientado
                a la certificación y al proyecto integrador.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-3 py-1 text-xs rounded-md border border-border bg-panel/50 text-text-secondary">
                7° Semestre
              </span>
              <span className="px-3 py-1 text-xs rounded-md border border-border bg-panel/50 text-text-secondary">
                Lic. Matemáticas Aplicadas y Computación
              </span>
              <span className="px-3 py-1 text-xs rounded-md border border-border bg-panel/50 text-text-secondary">
                Presencial
              </span>
            </div>

            <div className="pt-2">
              <p className="text-sm text-text-secondary">
                <span className="text-foreground font-medium">Docente:</span> Diego Romero Mora
              </p>
            </div>
          </div>

          {/* Right panel - Cloud metrics widget */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-white/90 backdrop-blur-md p-5 shadow-lg shadow-black/5">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Course Status — Active
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-grey-light border border-border/50 hover:border-blue/30 transition-colors"
                  >
                    <metric.icon className={`w-4 h-4 ${metric.color} shrink-0`} />
                    <div className="min-w-0">
                      <p className="text-xs text-text-secondary truncate">{metric.label}</p>
                      <p className="text-sm font-semibold text-foreground">{metric.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Mini progress bar */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex justify-between text-xs text-text-secondary mb-1.5">
                  <span>Progreso del semestre</span>
                  <span className="text-cyan">0%</span>
                </div>
                <div className="h-1.5 bg-grey-light rounded-full overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-blue to-blue-dark rounded-full transition-all duration-1000" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
