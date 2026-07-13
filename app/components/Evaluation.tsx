"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Scale,
  MessageSquare,
  FlaskConical,
  FileCheck,
  Award,
  AlertCircle,
  Star,
  Trophy,
  Zap,
  X,
  Info,
  Clock,
  BookOpen,
  FileText,
  CheckCircle2,
  Users,
  Link2,
  CalendarCheck,
} from "lucide-react";
import { useInView, useStaggeredInView } from "../hooks/useInView";
import ParticipacionesPodium from "./ParticipacionesPodium";

const evaluationItems = [
  {
    icon: FlaskConical,
    label: "Google Career Launch Pad",
    value: "50%",
    numValue: 50,
    description: "Completar todas las actividades del programa.",
    color: "text-blue",
    barColor: "bg-blue",
    hasDetails: "launchpad" as string | null,
  },
  {
    icon: FileCheck,
    label: "Exámenes",
    value: "20%",
    numValue: 20,
    description: "2 exámenes parciales.",
    color: "text-red",
    barColor: "bg-red",
    hasDetails: "examen" as string | null,
  },
  {
    icon: MessageSquare,
    label: "Proyecto final",
    value: "30%",
    numValue: 30,
    description: "Exposición por equipos con propuesta cloud. Es requisito para aprobar el curso.",
    color: "text-green",
    barColor: "bg-green",
    hasDetails: "proyecto" as string | null,
  },
];

const cursoRules = [
  { icon: Clock, text: "Solo es posible 1 curso por periodo de examen." },
  { icon: BookOpen, text: "El curso debe tener al menos 6 horas de duración." },
  { icon: CheckCircle2, text: "Equivale a 1 punto sobre la calificación del examen." },
  { icon: Star, text: "Puede ser de cualquier temática (no limitado a cloud)." },
  { icon: FileText, text: "Es necesario entregar constancia con nombre en el SEA." },
];

const eventoRules = [
  { icon: CalendarCheck, text: "Pueden asistir a cualquier evento de TI (ej. Semana de MAC, eventos mostrados en clase, conferencias, hackatones, etc.)." },
  { icon: CheckCircle2, text: "Ninguno es obligatorio." },
  { icon: Link2, text: "Cada asistencia cuenta como 4 participaciones haciendo una publicación en LinkedIn sobre su experiencia." },
  { icon: Users, text: "No hay límite para los eventos asistidos." },
];

const examenRules = [
  { icon: FileCheck, text: "Solo habrá 2 exámenes durante el semestre." },
  { icon: Clock, text: "Si reprueban uno o ambos exámenes, pueden reponerlos en el examen final." },
  { icon: BookOpen, text: "El examen final es la reposición del examen o exámenes reprobados." },
];

const extras = [
  {
    icon: Star,
    text: "Cursos online completados",
    points: "+1 pt c/u",
    max: "1 por examen",
    color: "text-blue",
    bgColor: "bg-blue-light",
    hasDetails: "curso",
  },
  {
    icon: Zap,
    text: "Evento Tech",
    points: "+4 particip.",
    max: "sin límite",
    color: "text-green",
    bgColor: "bg-green-light",
    hasDetails: "evento",
  },
];

const criteria = [
  "No se recibirán entregas fuera del tiempo establecido.",
  "Respeto en el trabajo en equipo y en el día a día. Cualquier falta de respeto hacia miembros de sus equipos u otras personas dentro de la clase resulta en reprobación directa.",
];

export default function Evaluation() {
  const router = useRouter();
  const headerAnim = useInView();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [showCursoModal, setShowCursoModal] = useState(false);
  const [showEventoModal, setShowEventoModal] = useState(false);
  const [showExamenModal, setShowExamenModal] = useState(false);
  const [showLaunchpadRulesModal, setShowLaunchpadRulesModal] = useState(false);
  const { ref: extrasRef, visibleItems: extrasVisible } = useStaggeredInView(extras.length, 200);

  // Animated progress fill & counting
  const distRef = useRef<HTMLDivElement>(null);
  const [distInView, setDistInView] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>(evaluationItems.map(() => 0));

  useEffect(() => {
    const el = distRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDistInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!distInView) return;
    const duration = 2200;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValues(evaluationItems.map((item) => Math.round(item.numValue * eased)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [distInView]);

  return (
    <>
    <section id="evaluacion" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerAnim.ref}
          className={`mb-12 transition-all duration-700 ${
            headerAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-green" />
            <span className="text-xs font-medium text-green uppercase tracking-wider">
              Criterios
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Evaluación del Curso
          </h2>
          <p className="mt-2 text-text-secondary max-w-2xl">
            Distribución de calificaciones y políticas de entrega.
          </p>
        </div>

        <div className="space-y-6">
          {/* Main evaluation breakdown - full width */}
          <div ref={distRef} className="rounded-xl border border-border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Scale className="w-4 h-4 text-blue" />
              <h3 className="text-sm font-semibold text-foreground">
                Distribución de Calificación
              </h3>
            </div>

            {/* Animated progress bar */}
            <div className="flex h-3 rounded-full overflow-hidden mb-6 shadow-inner bg-grey-light/50">
              {evaluationItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`${item.barColor} transition-all duration-500 cursor-pointer relative ${
                    hoveredBar === i ? "opacity-100 scale-y-150" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    width: distInView ? `${item.numValue}%` : "0%",
                    transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 200}ms, opacity 0.3s, transform 0.3s`,
                  }}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                />
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {evaluationItems.map((item, i) => (
                <div
                  key={item.label}
                  onClick={
                    item.hasDetails === "examen" ? () => setShowExamenModal(true)
                    : item.hasDetails === "proyecto" ? () => router.push("/proyecto")
                    : undefined
                  }
                  className={`flex flex-col gap-3 p-4 rounded-lg border transition-all duration-300 ${
                    item.hasDetails === "examen" || item.hasDetails === "proyecto"
                      ? "cursor-pointer"
                      : "cursor-default"
                  } ${
                    hoveredBar === i
                      ? "border-blue/30 bg-blue-light/30 shadow-sm scale-[1.02]"
                      : "border-border/50 hover:bg-grey-light/60"
                  }`}
                  style={{
                    opacity: distInView ? 1 : 0,
                    transform: distInView ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.5s ease ${400 + i * 150}ms, transform 0.5s ease ${400 + i * 150}ms, border-color 0.3s, background-color 0.3s, box-shadow 0.3s`,
                  }}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                      hoveredBar === i ? `${item.barColor}/10` : "bg-grey-light"
                    }`}>
                      <item.icon className={`w-4 h-4 ${item.color} transition-transform duration-300 ${
                        hoveredBar === i ? "scale-110" : ""
                      }`} />
                    </div>
                    <span className={`text-2xl font-bold transition-all duration-300 ${
                      hoveredBar === i ? item.color : "text-foreground"
                    }`}>
                      {animatedValues[i]}%
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  {item.hasDetails === "launchpad" ? (
                    <div className="flex items-center gap-2 mt-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push("/launchpad");
                        }}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-blue px-2.5 py-1 rounded-md bg-blue-light/40 hover:bg-blue-light/70 transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                        Ver programa
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowLaunchpadRulesModal(true);
                        }}
                        className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-dark px-2.5 py-1 rounded-md border border-blue/25 hover:bg-blue-light/40 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Ver reglas
                      </button>
                    </div>
                  ) : item.hasDetails ? (
                    <div className={`flex items-center gap-1 mt-auto ${item.hasDetails === "launchpad" ? "text-blue" : item.hasDetails === "proyecto" ? "text-green" : "text-red"}`}>
                      <Info className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-medium">
                        {item.hasDetails === "launchpad" ? "Ver programa" : item.hasDetails === "proyecto" ? "Ver lineamientos" : "Ver reglas"}
                      </span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row: two panels side by side */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Extra points */}
            <div ref={extrasRef} className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Award className="w-4 h-4 text-orange" />
                <h3 className="text-sm font-semibold text-foreground">
                  Puntos Extra
                </h3>
              </div>
              <div className="space-y-3">
                {extras.map((item, i) => (
                  <div
                    key={i}
                    onClick={
                      item.hasDetails === "curso" ? () => setShowCursoModal(true)
                      : item.hasDetails === "evento" ? () => setShowEventoModal(true)
                      : undefined
                    }
                    className={`group relative flex items-center gap-4 p-4 rounded-xl border border-border hover:border-blue/25 hover:shadow-md transition-all duration-500 ${
                      item.hasDetails ? "cursor-pointer" : "cursor-default"
                    } ${
                      extrasVisible[i]
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-8"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${item.bgColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight">
                        {item.text}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs font-bold text-green bg-green-light/60 px-2 py-0.5 rounded-full">
                          {item.points}
                        </span>
                        <span className="text-[10px] text-text-secondary uppercase tracking-wide">
                          {item.max}
                        </span>
                      </div>
                    </div>
                    {item.hasDetails ? (
                      <div className="flex items-center gap-1 text-blue">
                        <Info className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-medium whitespace-nowrap">Ver detalles</span>
                      </div>
                    ) : (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-blue">
                        <Zap className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-4 h-4 text-red" />
                <h3 className="text-sm font-semibold text-foreground">
                  Consideraciones Generales
                </h3>
              </div>
              <div className="space-y-2">
                {criteria.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-red-light/30 transition-colors duration-200 group/rule"
                  >
                    <div className="w-5 h-5 rounded-full bg-red-light flex items-center justify-center shrink-0 mt-0.5 group-hover/rule:bg-red/20 transition-colors">
                      <span className="text-[10px] font-bold text-red">{i + 1}</span>
                    </div>
                    <span className="text-xs text-text-secondary group-hover/rule:text-foreground transition-colors leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Participaciones - Podium section */}
          <ParticipacionesPodium />
        </div>
      </div>
    </section>

    {/* Modal: Reglas Google Career Launch Pad */}
    {showLaunchpadRulesModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => setShowLaunchpadRulesModal(false)}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in-up" />
        <div
          className="relative bg-white rounded-2xl border border-border shadow-2xl max-w-4xl w-full p-6 md:p-7 max-h-[90vh] overflow-y-auto animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowLaunchpadRulesModal(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-grey-light transition-colors"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>

          <div className="flex items-center gap-3 mb-5 pr-8">
            <div className="p-3 rounded-xl bg-blue-light">
              <FlaskConical className="w-6 h-6 text-blue" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-foreground">
                Google Career Launch Pad - Reglas
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Criterios para el 50% de Launch Pad y puntos extra
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-blue/20 bg-blue-light/20 p-4 md:p-5">
              <h4 className="text-sm font-semibold text-blue-dark mb-3">
                1) Requisito principal - 30% de la calificacion
              </h4>
              <p className="text-sm text-foreground mb-4">
                Terminar y obtener credencial en ambos modulos Foundations. Es obligatorio completar los 2 para ser acreedores al 30%.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://www.skills.google/paths/36/course_templates/153"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-border bg-white p-3 hover:border-blue/35 hover:shadow-sm transition-all"
                >
                  <div className="aspect-[16/10] relative rounded-lg overflow-hidden ">
                    <Image
                      src="/assets/Foundamentals.png"
                      alt="Google Cloud Computing Foundations: Cloud Computing Fundamentals"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-foreground group-hover:text-blue transition-colors">
                    Cloud Computing Fundamentals
                  </p>
                </a>

                <a
                  href="https://www.skills.google/paths/36/course_templates/154"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-border bg-white p-3 hover:border-blue/35 hover:shadow-sm transition-all"
                >
                  <div className="aspect-[16/10] relative rounded-lg overflow-hidden ">
                    <Image
                      src="/assets/Infra.png"
                      alt="Google Cloud Computing Foundations: Infrastructure in Google Cloud"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium text-foreground group-hover:text-blue transition-colors">
                    Infrastructure in Google Cloud
                  </p>
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-green/20 bg-green-light/30 p-4 md:p-5">
              <h4 className="text-sm font-semibold text-green-dark mb-3">
                2) Skill Badges - 20%
              </h4>
              <p className="text-sm text-foreground mb-3">
                Cada uno corresponde al 10% por badge.
              </p>
              <div className="space-y-2">
                <a
                  href="https://www.skills.google/paths/36/course_templates/648"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-blue hover:text-blue-dark hover:underline"
                >
                  1. Implementing Cloud Load Balancing for Compute Engine
                </a>
                <a
                  href="https://www.skills.google/paths/36/course_templates/637"
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm text-blue hover:text-blue-dark hover:underline"
                >
                  2. Set Up an App Dev Environment on Google Cloud
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-orange/20 bg-orange/5 p-4 md:p-5">
              <h4 className="text-sm font-semibold text-orange mb-3">
                3) Modulos opcionales con puntos extra
              </h4>
              <p className="text-sm text-foreground mb-3">
                Los opcionales dan puntos extra solo si se completan en pareja.
              </p>

              <div className="space-y-4">
                <div className="rounded-lg border border-border/60 bg-white p-3">
                  <p className="text-xs font-semibold text-foreground mb-2">Pareja opcional A (+0.6 pts)</p>
                  <a
                    href="https://www.skills.google/paths/36/course_templates/155"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-blue hover:text-blue-dark hover:underline"
                  >
                    Google Cloud Computing Foundations: Networking and Security in Google Cloud
                  </a>
                  <a
                    href="https://www.skills.google/paths/36/course_templates/654"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-blue hover:text-blue-dark hover:underline mt-1"
                  >
                    Build a Secure Google Cloud Network
                  </a>
                  <p className="text-xs text-text-secondary mt-2">Deben completarse juntos para sumar +0.6 sobre la calificacion final.</p>
                </div>

                <div className="rounded-lg border border-border/60 bg-white p-3">
                  <p className="text-xs font-semibold text-foreground mb-2">Pareja opcional B (+0.6 pts)</p>
                  <a
                    href="https://www.skills.google/paths/36/course_templates/156"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-blue hover:text-blue-dark hover:underline"
                  >
                    Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud
                  </a>
                  <a
                    href="https://www.skills.google/paths/36/course_templates/631"
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm text-blue hover:text-blue-dark hover:underline mt-1"
                  >
                    Prepare Data for ML APIs on Google Cloud
                  </a>
                  <p className="text-xs text-text-secondary mt-2">Deben completarse juntos para sumar +0.6 sobre la calificacion final.</p>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold text-foreground">
                Total maximo de extra: +1.2 puntos sobre la calificacion final.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border/50 flex justify-end">
            <button
              onClick={() => setShowLaunchpadRulesModal(false)}
              className="px-4 py-2 rounded-lg bg-blue text-white text-xs font-medium hover:bg-blue-dark transition-colors shadow-sm"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Modal: Reglas de exámenes */}
    {showExamenModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => setShowExamenModal(false)}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in-up" />
        <div
          className="relative bg-white rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowExamenModal(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-grey-light transition-colors"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-xl bg-red-light">
              <FileCheck className="w-6 h-6 text-red" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Exámenes — Reglas
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                20% de la calificación final
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {examenRules.map((rule, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-grey-light/60 border border-border/50"
              >
                <div className="p-1.5 rounded-lg bg-red-light/60 shrink-0 mt-0.5">
                  <rule.icon className="w-4 h-4 text-red" />
                </div>
                <span className="text-sm text-foreground leading-relaxed">
                  {rule.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border/50 flex justify-end">
            <button
              onClick={() => setShowExamenModal(false)}
              className="px-4 py-2 rounded-lg bg-red text-white text-xs font-medium hover:bg-red-dark transition-colors shadow-sm"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Modal: Reglas de eventos tech */}
    {showEventoModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => setShowEventoModal(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in-up" />

        {/* Modal */}
        <div
          className="relative bg-white rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setShowEventoModal(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-grey-light transition-colors"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-xl bg-green-light">
              <Zap className="w-6 h-6 text-green" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Evento Tech — Reglas
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Participaciones por asistencia a eventos
              </p>
            </div>
          </div>

          {/* Rules */}
          <div className="space-y-3">
            {eventoRules.map((rule, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-grey-light/60 border border-border/50"
              >
                <div className="p-1.5 rounded-lg bg-green-light/60 shrink-0 mt-0.5">
                  <rule.icon className="w-4 h-4 text-green-dark" />
                </div>
                <span className="text-sm text-foreground leading-relaxed">
                  {rule.text}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-border/50 flex justify-end">
            <button
              onClick={() => setShowEventoModal(false)}
              className="px-4 py-2 rounded-lg bg-green text-white text-xs font-medium hover:bg-green-dark transition-colors shadow-sm"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Modal: Reglas de cursos online */}
    {showCursoModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={() => setShowCursoModal(false)}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in-up" />

        {/* Modal */}
        <div
          className="relative bg-white rounded-2xl border border-border shadow-2xl max-w-md w-full p-6 animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setShowCursoModal(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-grey-light transition-colors"
          >
            <X className="w-4 h-4 text-text-secondary" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 rounded-xl bg-blue-light">
              <Star className="w-6 h-6 text-blue" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                Cursos Online — Reglas
              </h3>
              <p className="text-xs text-text-secondary mt-0.5">
                Puntos extra por cursos completados
              </p>
            </div>
          </div>

          {/* Rules */}
          <div className="space-y-3">
            {cursoRules.map((rule, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-grey-light/60 border border-border/50"
              >
                <div className="p-1.5 rounded-lg bg-blue-light/60 shrink-0 mt-0.5">
                  <rule.icon className="w-4 h-4 text-blue-dark" />
                </div>
                <span className="text-sm text-foreground leading-relaxed">
                  {rule.text}
                </span>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-border/50 flex justify-end">
            <button
              onClick={() => setShowCursoModal(false)}
              className="px-4 py-2 rounded-lg bg-blue text-white text-xs font-medium hover:bg-blue-dark transition-colors shadow-sm"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
