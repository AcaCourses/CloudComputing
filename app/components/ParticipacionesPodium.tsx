"use client";

import { useState, useEffect, useRef } from "react";
import { Trophy, Medal, Target, Users, Sparkles, ChevronUp, ChevronDown, AlertCircle } from "lucide-react";

const podiumPositions = [
  { position: 1, height: 100, color: "bg-yellow", label: "🥇" },
  { position: 2, height: 85, color: "bg-grey", label: "🥈" },
  { position: 3, height: 70, color: "bg-orange", label: "🥉" },
  { position: 4, height: 58, color: "bg-blue", label: "4°" },
  { position: 5, height: 50, color: "bg-blue", label: "5°" },
  { position: 6, height: 43, color: "bg-green", label: "6°" },
  { position: 7, height: 37, color: "bg-green", label: "7°" },
  { position: 8, height: 32, color: "bg-green", label: "8°" },
  { position: 9, height: 28, color: "bg-green", label: "9°" },
  { position: 10, height: 25, color: "bg-green", label: "10°" },
];

const rules = [
  { icon: Trophy, title: "Exentar examen", text: "Las 10 personas con más participaciones antes de cada examen pueden exentar ese examen.", highlight: true },
  { icon: AlertCircle, title: "Solo 1 exención", text: "Solo se puede exentar un examen. Si ya exentaste uno, no podrás exentar otro.", highlight: true },
  { icon: Target, title: "Conteo por periodo", text: "Las participaciones se reinician después de cada examen. Es un conteo independiente por periodo." },
  { icon: Users, title: "Individuales", text: "Las participaciones son individuales, no en equipo." },
  { icon: Medal, title: "Desempate", text: "En caso de empate en el lugar 10, el criterio de desempate son cursos completados o eventos de TI a los que se haya asistido." },
];

export default function ParticipacionesPodium() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredPos, setHoveredPos] = useState<number | null>(null);
  const [openRules, setOpenRules] = useState<Set<number>>(new Set([0]));

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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="rounded-xl border border-border bg-white p-6 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-orange" />
        <h3 className="text-sm font-semibold text-foreground">
          Participaciones — Exenta tu Examen
        </h3>
      </div>

      {/* Podium visualization - full width */}
      <div className="relative mb-8">
        {/* Goal line */}
        <div className="flex items-center gap-2 mb-3">
          <div className="h-px flex-1 border-t-2 border-dashed border-orange/60" />
          <span className="text-[10px] font-bold text-orange bg-yellow-light px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
            <Target className="w-3 h-3" />
            META: Top 10 = Exentas
          </span>
          <div className="h-px flex-1 border-t-2 border-dashed border-orange/60" />
        </div>

        {/* Podium bars */}
        <div className="flex items-end justify-center gap-2 sm:gap-3 h-52 bg-grey-light/30 rounded-xl p-4 pt-6 border border-border/30">
          {podiumPositions.map((pos, i) => {
            const isTop3 = pos.position <= 3;
            return (
              <div
                key={pos.position}
                className="flex flex-col items-center gap-1.5 flex-1 h-full justify-end"
                onMouseEnter={() => setHoveredPos(pos.position)}
                onMouseLeave={() => setHoveredPos(null)}
              >
                {/* Position label */}
                <div
                  className={`text-center transition-all duration-500 ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${800 + i * 80}ms` }}
                >
                  {isTop3 ? (
                    <span className="text-sm">{pos.label}</span>
                  ) : (
                    <span className={`text-[9px] font-semibold transition-colors ${
                      hoveredPos === pos.position ? "text-foreground" : "text-text-secondary"
                    }`}>
                      {pos.label}
                    </span>
                  )}
                </div>

                {/* Bar */}
                <div
                  className={`w-full rounded-t-lg cursor-pointer relative overflow-hidden transition-shadow duration-300 ${pos.color} ${
                    hoveredPos === pos.position ? "shadow-lg ring-2 ring-foreground/10" : "shadow-sm"
                  }`}
                  style={{
                    height: inView ? `${pos.height}%` : "0%",
                    transition: `height 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms, box-shadow 0.3s`,
                  }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/30 rounded-t-lg" />

                  {/* Hover tooltip */}
                  {hoveredPos === pos.position && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-white text-[9px] px-2 py-0.5 rounded whitespace-nowrap z-20 shadow-md">
                      {isTop3 ? "🏆 Exenta" : "✓ Exenta"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated motivational indicator */}
        <div
          className={`mt-4 flex items-center justify-center gap-2 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "2s" }}
        >
          <ChevronUp className="w-4 h-4 text-blue animate-bounce" />
          <span className="text-xs text-text-secondary font-medium">
            ¡Participa y sube en el ranking!
          </span>
          <ChevronUp className="w-4 h-4 text-blue animate-bounce" />
        </div>
      </div>

      {/* Rules - grid with dropdowns */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
        {rules.map((rule, i) => {
          const isOpen = openRules.has(i);
          return (
            <div
              key={i}
              className={`rounded-xl border transition-all duration-300 cursor-pointer ${
                rule.highlight
                  ? "border-orange/30 bg-yellow-light/40"
                  : "border-border/50 bg-grey-light/30"
              } ${isOpen ? "shadow-sm" : "hover:shadow-sm"}`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.5s ease ${1200 + i * 100}ms, transform 0.5s ease ${1200 + i * 100}ms, box-shadow 0.3s`,
              }}
              onClick={() => {
                setOpenRules((prev) => {
                  const next = new Set(prev);
                  if (next.has(i)) {
                    next.delete(i);
                  } else {
                    next.add(i);
                  }
                  return next;
                });
              }}
            >
              {/* Header */}
              <div className="flex items-center gap-2.5 p-3">
                <div className={`p-1.5 rounded-lg shrink-0 ${
                  rule.highlight ? "bg-yellow-light" : "bg-grey-light"
                }`}>
                  <rule.icon className={`w-4 h-4 ${
                    rule.highlight ? "text-orange" : "text-text-secondary"
                  }`} />
                </div>
                <span className={`text-xs font-semibold flex-1 text-foreground`}>
                  {rule.title}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-text-secondary transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`} />
              </div>

              {/* Dropdown content */}
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? "200px" : "0px" }}
              >
                <div className="px-3 pb-3 pt-0">
                  <p className="text-xs text-text-secondary leading-relaxed border-t border-border/30 pt-2">
                    {rule.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Leyenda para no exentos */}
      <div className="mt-5 p-4 rounded-xl bg-blue-light/30 border border-blue/20">
        <p className="text-xs text-text-secondary leading-relaxed">
          <span className="font-semibold text-foreground">Para los no exentos:</span> sus participaciones contarán para el examen, ayudándoles a obtener una mejor calificación. A lo más se pueden sumar el equivalente a <span className="font-bold text-blue">1.5 puntos por examen</span>. El conteo se hará previo a las clases de examen.
        </p>
      </div>
    </div>
  );
}
