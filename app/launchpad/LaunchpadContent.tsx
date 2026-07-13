"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SkillBadgeCard from "./SkillBadgeCard";
import {
  Cloud,
  GraduationCap,
  BookOpen,
  Award,
  Server,
  Database,
  Shield,
  Brain,
  Play,
  CheckCircle2,
  Users,
  Clock,
  Video,
  FlaskConical,
  BadgeCheck,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Rocket,
  Target,
  Briefcase,
  Globe,
  Lock,
  Cpu,
  HardDrive,
  Network,
  Code,
  BarChart3,
  Zap,
  FileText,
  Star,
  ArrowLeft,
  Layers,
  TrendingUp,
} from "lucide-react";

// ============================================================
// HOOK
// ============================================================
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

// ============================================================
// DATA
// ============================================================
const benefits = [
  { icon: FlaskConical, title: "Laboratorios hands-on", text: "25+ labs en entornos reales de Google Cloud. Configura, despliega y valida.", color: "text-green", bg: "bg-green-light" },
  { icon: GraduationCap, title: "Sin prerrequisitos", text: "Formación introductoria ideal para estudiantes que inician en cloud computing.", color: "text-blue", bg: "bg-blue-light" },
  { icon: Award, title: "Credencial compartible", text: "Badge o certificado digital verificable para tu perfil profesional.", color: "text-red", bg: "bg-red-light" },
  { icon: Briefcase, title: "Empleabilidad cloud", text: "Habilidades alineadas con roles de infraestructura y desarrollo.", color: "text-yellow", bg: "bg-yellow-light" },
];

const courses = [
  {
    number: 1,
    title: "Cloud Computing Fundamentals",
    description: "Conceptos de nube, modelos de servicio (IaaS, PaaS, SaaS) y la infraestructura global de Google Cloud.",
    duration: "~15 horas",
    modules: 3,
    topics: ["Conceptos de nube", "Modelos de servicio", "Infraestructura global GCP"],
    color: "#4285F4",
    bgClass: "from-blue/5 to-blue/10",
  },
  {
    number: 2,
    title: "Infrastructure in Google Cloud",
    description: "Compute Engine, almacenamiento, bases de datos y despliegue de aplicaciones en la nube.",
    duration: "~18 horas",
    modules: 3,
    topics: ["Compute Engine", "Cloud Storage", "Cloud SQL & Firestore"],
    color: "#EA4335",
    bgClass: "from-red/5 to-red/10",
  },
  {
    number: 3,
    title: "Networking & Security",
    description: "Redes virtuales, balanceo de carga, firewalls e identidad con IAM en Google Cloud.",
    duration: "~14 horas",
    modules: 2,
    topics: ["VPC Networks", "Load Balancing", "IAM & Security"],
    color: "#FBBC04",
    bgClass: "from-yellow/5 to-yellow/10",
  },
  {
    number: 4,
    title: "Data, ML, and AI",
    description: "BigQuery, Dataproc, Vertex AI y AutoML para análisis de datos e inteligencia artificial.",
    duration: "~16 horas",
    modules: 2,
    topics: ["BigQuery", "Vertex AI & AutoML", "Dataproc & Pub/Sub"],
    color: "#34A853",
    bgClass: "from-green/5 to-green/10",
  },
];

const skillBadges = [
  { name: "Create and Manage Cloud Resources", category: "Infrastructure", level: "INTRODUCTORY" },
  { name: "Set Up an App Dev Environment", category: "Application Development", level: "INTRODUCTORY" },
  { name: "Build a Secure Google Cloud Network", category: "Security", level: "INTERMEDIATE" },
  { name: "Prepare Data for ML APIs", category: "Machine Learning", level: "INTERMEDIATE" },
];

const completionBadges = [
  {
    name: "Google Cloud Computing Foundations: Cloud Computing Fundamentals",
    image: "/assets/Foundamentals.png",
    href: "https://www.skills.google/paths/36/course_templates/153",
  },
  {
    name: "Google Cloud Computing Foundations: Infrastructure in Google Cloud",
    image: "/assets/Infra.png",
    href: "https://www.skills.google/paths/36/course_templates/154",
  },
  {
    name: "Google Cloud Computing Foundations: Networking and Security in Google Cloud",
    image: "/assets/sEC.png",
    href: "https://www.skills.google/paths/36/course_templates/155",
  },
  {
    name: "Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud",
    image: "/assets/ml.png",
    href: "https://www.skills.google/paths/36/course_templates/156",
  },
];

const serviceCategories = [
  {
    category: "Compute & Serverless",
    color: "#4285F4",
    services: [
      { name: "Compute Engine", img: "/assets/Compute Engine.svg", desc: "VMs escalables" },
      { name: "Cloud Functions", img: "/assets/Cloud Functions.svg", desc: "Funciones serverless" },
    ],
  },
  {
    category: "Storage & Data",
    color: "#34A853",
    services: [
      { name: "Cloud Storage", img: "/assets/Cloud Storage.svg", desc: "Objetos & archivos" },
      { name: "BigQuery", img: "/assets/BigQuery.svg", desc: "Data warehouse" },
      { name: "Pub/Sub", img: "/assets/PubSub.svg", desc: "Mensajería" },
    ],
  },
  {
    category: "AI & Machine Learning",
    color: "#FBBC04",
    services: [
      { name: "Vertex AI", img: "/assets/Vertex AI.svg", desc: "ML platform" },
    ],
  },
  {
    category: "Networking & Security",
    color: "#EA4335",
    services: [
      { name: "VPC", img: "/assets/Virtual Private Cloud.svg", desc: "Redes privadas" },
      { name: "IAM", img: "/assets/Identity And Access Management.svg", desc: "Identidad & acceso" },
    ],
  },
];

const steps = [
  { step: 1, title: "Convocatoria", desc: "Inscripción a través de tu facultad en la UNAM", color: "#4285F4" },
  { step: 2, title: "Activación", desc: "Cuenta Google Cloud Skills Boost habilitada", color: "#EA4335" },
  { step: 3, title: "Cursos", desc: "Completa los 4 cursos del certificado", color: "#FBBC04" },
  { step: 4, title: "Labs & Badges", desc: "Practica en entornos reales y obtén insignias", color: "#34A853" },
  { step: 5, title: "Credencial", desc: "Certificado compartible en tu perfil profesional", color: "#4285F4" },
];

// ============================================================
// ANIMATED COUNTER
// ============================================================
function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const totalSteps = 30;
    const interval = duration / totalSteps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / totalSteps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (step >= totalSteps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span>{value}</span>;
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function LaunchpadContent() {
  const heroAnim = useInView(0.1);
  const overviewAnim = useInView();
  const benefitsAnim = useInView();
  const certAnim = useInView();
  const badgesAnim = useInView();
  const servicesAnim = useInView();
  const routeAnim = useInView();
  const ctaAnim = useInView();
  const [scrolled, setScrolled] = useState(false);
  const [activeCourseIdx, setActiveCourseIdx] = useState(-1);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cycling animation for certificate cards — stay lit, pause when all on, then reset
  useEffect(() => {
    if (!certAnim.isInView) return;
    const total = courses.length;
    // total + 1 steps: 0..total (lighting up), then stays at total for pause
    const timer = setInterval(() => {
      setActiveCourseIdx((prev) => {
        if (prev < total) return prev + 1;
        return 0;
      });
    }, activeCourseIdx === courses.length ? 4000 : 1000);
    return () => clearInterval(timer);
  }, [certAnim.isInView, activeCourseIdx]);

  return (
    <div className="min-h-screen bg-white">
      {/* ============ NAVBAR ============ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-border/50" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-medium">Volver al curso</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {["Programa", "Certificado", "Labs", "Servicios", "Ruta"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs font-medium text-text-secondary hover:text-blue transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <img src="/assets/logoCloud.png" alt="Google Cloud" className="h-6 w-auto" />
            <div className="w-px h-5 bg-border/50" />
            <img src="/assets/logoUnam.png" alt="FES Acatlán UNAM" className="h-7 w-auto" />
          </div>
        </div>
      </nav>

      {/* ============ HERO — MINIMAL ANIMATED ============ */}
      <section className="pt-28 pb-20 bg-white min-h-[80vh] flex items-center relative overflow-hidden">
        {/* Manchitas difuminadas de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[15%] left-[10%] w-72 h-72 bg-blue/[0.04] rounded-full blur-3xl" />
          <div className="absolute top-[60%] right-[8%] w-64 h-64 bg-green/[0.04] rounded-full blur-3xl" />
          <div className="absolute top-[30%] right-[25%] w-48 h-48 bg-yellow/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[30%] w-56 h-56 bg-red/[0.03] rounded-full blur-3xl" />
        </div>

        <div
          ref={heroAnim.ref}
          className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center text-center relative z-10"
        >
          {/* Logos — entran desde abajo con desfase breve */}
          <div className="flex items-center gap-8 mb-8">
            <img
              src="/assets/Google_Cloud_logo.png"
              alt="Google Cloud"
              className="h-10 sm:h-12 w-auto"
              style={{
                opacity: heroAnim.isInView ? 1 : 0,
                transform: heroAnim.isInView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
              }}
            />
            <div
              className="w-px h-7 bg-border/30"
              style={{
                opacity: heroAnim.isInView ? 1 : 0,
                transition: "opacity 0.4s ease 0.5s",
              }}
            />
            <img
              src="/assets/logoUnam.png"
              alt="FES Acatlán UNAM"
              className="h-9 sm:h-11 w-auto"
              style={{
                opacity: heroAnim.isInView ? 1 : 0,
                transform: heroAnim.isInView ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
              }}
            />
          </div>

          {/* Separador mínimo */}
          <div
            className="w-12 h-px bg-border/40 mb-8"
            style={{
              opacity: heroAnim.isInView ? 1 : 0,
              transition: "opacity 0.4s ease 0.7s",
            }}
          />

          {/* Typewriter title */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
            style={{
              opacity: heroAnim.isInView ? 1 : 0,
              transition: "opacity 0.3s ease 0.9s",
            }}
          >
            <span className="inline-block hero-typewriter pl-1">
              <span className="bg-gradient-to-r from-blue via-blue-dark to-blue bg-clip-text text-transparent">Google Career Launchpad</span>
              <span className="text-text-secondary font-bold"> en M@C FES Acatlán</span>
            </span>
          </h1>

          {/* Descripción */}
          <p
            className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl"
            style={{
              opacity: heroAnim.isInView ? 1 : 0,
              transform: heroAnim.isInView ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s ease 2.2s",
            }}
          >
            Certifícate en <span className="font-semibold text-foreground">Cloud Computing Foundations</span> con
            acceso sin costo a labs, skill badges y credenciales compartibles para estudiantes UNAM.
          </p>

          {/* Botones — primario limpio + secundario ghost */}
          <div
            className="mt-8 flex flex-wrap justify-center gap-3"
            style={{
              opacity: heroAnim.isInView ? 0.85 : 0,
              transform: heroAnim.isInView ? "translateY(0)" : "translateY(6px)",
              transition: "all 0.6s ease 2.7s",
            }}
          >
            <a
              href="#certificado"
              className="px-6 py-2.5 text-sm font-medium rounded-xl bg-blue/90 text-white hover:bg-blue transition-all duration-300"
            >
              Explorar certificado
            </a>
            <Link
              href="/#unidades"
              className="px-6 py-2.5 text-sm font-medium rounded-xl border border-border/30 text-text-secondary hover:text-foreground hover:border-border/60 transition-all duration-300"
            >
              Plan de estudios
            </Link>
          </div>
        </div>
      </section>

      {/* ============ PROGRAM OVERVIEW — 60/40 DASHBOARD ============ */}
      <section id="programa" className="py-20 bg-white border-b border-border/30">
        <div
          ref={overviewAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            overviewAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14 items-center">
            {/* Text — 60% */}
            <div>
              <span className="text-xs font-medium text-blue bg-blue-light px-3 py-1 rounded-full">
                Ruta de entrada a carreras cloud
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
                ¿Qué es Google Career Launchpad?
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed text-base">
                Una iniciativa de Google Cloud para universidades que ofrece acceso gratuito al certificado{" "}
                <span className="font-semibold text-foreground">Cloud Computing Foundations</span>,
                credenciales digitales compartibles y preparación para carreras en la nube.
              </p>
              <p className="mt-3 text-text-secondary leading-relaxed text-base">
                Puerta de entrada a trayectorias de{" "}
                <span className="font-medium text-foreground">infraestructura cloud</span>,{" "}
                <span className="font-medium text-foreground">ingeniería de datos</span> y{" "}
                <span className="font-medium text-foreground">aplicaciones nativas de nube</span>.
              </p>

              {/* Beneficios rápidos */}
              <div className="mt-8 grid grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <div
                    key={b.title}
                    className="flex items-start gap-3 p-3 rounded-lg"
                    style={{
                      opacity: overviewAnim.isInView ? 1 : 0,
                      transition: `opacity 0.5s ease ${400 + i * 100}ms`,
                    }}
                  >
                    <div className={`p-2 rounded-lg ${b.bg} shrink-0`}>
                      <b.icon className={`w-4 h-4 ${b.color}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-foreground">{b.title}</p>
                      <p className="text-[10px] text-text-secondary leading-relaxed mt-0.5">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Dashboard card — 40% */}
            <div
              className="relative p-6 rounded-2xl bg-[#F8FAFD] border border-border/50 shadow-sm"
              style={{
                opacity: overviewAnim.isInView ? 1 : 0,
                transform: overviewAnim.isInView ? "translateX(0)" : "translateX(20px)",
                transition: "all 0.7s ease 300ms",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
                  <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">Dashboard del programa</span>
                </div>
                <Layers className="w-4 h-4 text-text-secondary" />
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { v: 4, l: "Cursos", c: "text-blue" },
                  { v: 10, l: "Módulos", c: "text-green" },
                  { v: 104, l: "Videos", c: "text-red" },
                ].map((m) => (
                  <div key={m.l} className="p-3 rounded-xl bg-white border border-border/40 text-center">
                    <div className={`text-xl font-extrabold ${m.c}`}>
                      <AnimatedCounter target={m.v} inView={overviewAnim.isInView} />
                    </div>
                    <div className="text-[9px] text-text-secondary font-medium uppercase mt-0.5">{m.l}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { v: 25, l: "Labs", c: "text-blue" },
                  { v: 10, l: "Quizzes", c: "text-yellow" },
                  { v: 4, l: "Badges", c: "text-green" },
                ].map((m) => (
                  <div key={m.l} className="p-3 rounded-xl bg-white border border-border/40 text-center">
                    <div className={`text-xl font-extrabold ${m.c}`}>
                      <AnimatedCounter target={m.v} inView={overviewAnim.isInView} />
                    </div>
                    <div className="text-[9px] text-text-secondary font-medium uppercase mt-0.5">{m.l}</div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="p-3 rounded-xl bg-white border border-border/40">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-medium text-foreground">Progresión estimada</span>
                  <span className="text-[10px] text-text-secondary">~63 hrs totales</span>
                </div>
                <div className="h-2 rounded-full bg-grey-light overflow-hidden flex">
                  <div className="h-full bg-blue" style={{ width: "25%" }} />
                  <div className="h-full bg-red" style={{ width: "25%" }} />
                  <div className="h-full bg-yellow" style={{ width: "25%" }} />
                  <div className="h-full bg-green" style={{ width: "25%" }} />
                </div>
                <div className="flex justify-between mt-1.5">
                  {["C1", "C2", "C3", "C4"].map((c, i) => (
                    <span key={c} className="text-[8px] text-text-secondary font-medium">{c}</span>
                  ))}
                </div>
              </div>

              {/* UNAM badge */}
              <div className="mt-4 flex items-center gap-2 p-2.5 rounded-lg bg-blue/[0.04] border border-blue/10">
                <GraduationCap className="w-4 h-4 text-blue shrink-0" />
                <p className="text-[10px] text-text-secondary">
                  Programa exclusivo para estudiantes <span className="font-semibold text-foreground">UNAM</span> con docentes como facilitadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CERTIFICATE — STAR SECTION ============ */}
      <section id="certificado" className="py-24 bg-[#F8FAFD] relative overflow-hidden">
        {/* Decorative side accents */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue via-red via-yellow to-green opacity-30" />

        <div
          ref={certAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            certAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Large editorial title */}
          <div className="max-w-3xl mb-14">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-10 bg-blue rounded-full" />
              <span className="text-xs font-semibold text-blue uppercase tracking-wider">Pieza central del programa</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
              {["Certificado", "Cloud", "Computing"].map((word, i) => (
                <span
                  key={word}
                  className="inline-block mr-[0.3em] transition-all duration-500"
                  style={{
                    opacity: certAnim.isInView ? 1 : 0.15,
                    transform: certAnim.isInView ? "translateY(0)" : "translateY(8px)",
                    transition: `all 0.5s ease ${300 + i * 200}ms`,
                  }}
                >
                  {word}
                </span>
              ))}
              <br />
              <span
                className="text-text-secondary font-bold inline-block transition-all duration-500"
                style={{
                  opacity: certAnim.isInView ? 1 : 0.15,
                  transform: certAnim.isInView ? "translateY(0)" : "translateY(8px)",
                  transition: "all 0.5s ease 900ms",
                }}
              >
                Foundations
              </span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary max-w-2xl">
              4 cursos progresivos que cubren desde fundamentos hasta inteligencia artificial. Cada uno con su color, su nivel y sus labs.
            </p>
          </div>

          {/* Asymmetric layout: 2 large + 2 small */}
          <div className="grid lg:grid-cols-2 gap-5">
            {courses.map((course, i) => {
              const isLarge = i < 2;
              const isLit = i < activeCourseIdx;
              return (
                <div
                  key={course.number}
                  className={`group relative rounded-2xl border bg-white overflow-hidden transition-all duration-700 ${
                    isLarge ? "p-7" : "p-5"
                  } ${isLit ? "border-border/50 shadow-lg scale-100 grayscale-0 opacity-100" : "border-border/20 shadow-none scale-[0.97] grayscale opacity-40"}`}
                >
                  {/* Top color bar */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: course.color }} />

                  {/* Course number + title */}
                  <div className="flex items-start gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{ backgroundColor: course.color }}
                    >
                      <span className="text-white font-bold text-lg">{course.number}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`${isLarge ? "text-lg" : "text-base"} font-bold text-foreground leading-snug`}>
                        {course.title}
                      </h3>
                      <p className={`mt-2 text-text-secondary leading-relaxed ${isLarge ? "text-sm" : "text-xs"}`}>
                        {course.description}
                      </p>
                    </div>
                  </div>

                  {/* Meta chips */}
                  <div className={`flex items-center flex-wrap gap-2 ${isLarge ? "mt-5" : "mt-4"}`}>
                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-grey-light text-text-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {course.duration}
                    </span>
                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-grey-light text-text-secondary flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {course.modules} módulos
                    </span>
                  </div>

                  {/* Topic chips with course color */}
                  <div className={`flex flex-wrap gap-1.5 ${isLarge ? "mt-4" : "mt-3"}`}>
                    {course.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] font-medium px-2.5 py-1 rounded-full border"
                        style={{
                          borderColor: `${course.color}30`,
                          color: course.color,
                          backgroundColor: `${course.color}08`,
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total summary bar */}
          <div className="mt-8 p-4 rounded-xl bg-white border border-border/50 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1">
                {["#4285F4", "#EA4335", "#FBBC04", "#34A853"].map((c) => (
                  <div key={c} className="w-4 h-4 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-sm font-bold text-foreground">4 cursos · 10 módulos · ~63 horas</span>
            </div>
            <span className="text-xs text-text-secondary flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              De fundamentos a AI/ML
            </span>
          </div>
        </div>
      </section>

      {/* ============ SKILL BADGES & LABS — NARRATIVE ============ */}
      <section id="labs" className="py-24 bg-white">
        <div
          ref={badgesAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            badgesAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div
            className="mb-10 sm:mb-12"
            style={{
              opacity: badgesAnim.isInView ? 1 : 0,
              transform: badgesAnim.isInView ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease 200ms",
            }}
          >
            <p className="max-w-4xl mx-auto text-center text-base sm:text-lg text-foreground leading-relaxed font-medium">
              Estás a un paso de egresar: demuestra lo que sabes con credenciales reales de Google Cloud.
Completa los Skill Badges y gana Completion Badges del Career Launchpad para destacar en tu CV, validar tus habilidades prácticas y llegar mejor preparado a entrevistas técnicas.
            </p>
          </div>

          {/* Asymmetric header */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-10 bg-green rounded-full" />
                <span className="text-xs font-semibold text-green uppercase tracking-wider">Aprendizaje Aplicado</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
                Skill Badges &<br />
                <span className="text-green">Labs Prácticos</span>
              </h2>
              <p className="mt-4 text-base text-text-secondary max-w-lg">
                Cada badge se obtiene completando labs progresivos en entornos reales de Google Cloud.
                No son simulaciones: configuras servicios reales.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-light border border-green/20">
              <FlaskConical className="w-4 h-4 text-green" />
              <span className="text-xs font-bold text-green">25+ labs hands-on</span>
            </div>
          </div>

          {/* Badge cards — staggered layout */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {skillBadges.map((badge, i) => (
              <div
                key={badge.name}
                style={{
                  opacity: badgesAnim.isInView ? 1 : 0,
                  transform: badgesAnim.isInView ? `translateY(0)` : `translateY(${20 + i * 5}px)`,
                  transition: `all 0.5s ease ${i * 120}ms`,
                }}
              >
                <SkillBadgeCard
                  title={badge.name}
                  category={badge.category}
                  level={badge.level}
                  index={i}
                />
              </div>
            ))}
          </div>

          <div
            className="mt-12"
            style={{
              opacity: badgesAnim.isInView ? 1 : 0,
              transform: badgesAnim.isInView ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease 350ms",
            }}
          >
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1 w-10 bg-blue rounded-full" />
                  <span className="text-xs font-semibold text-blue uppercase tracking-wider">Credenciales Foundations</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
                  Completion <span className="text-blue">Badges</span>
                </h2>
                <p className="mt-4 text-base text-text-secondary max-w-lg">
                  Cada badge se obtiene completando labs progresivos en entornos reales de Google Cloud.
                  No son simulaciones: configuras servicios reales.
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-light border border-blue/20">
                <BadgeCheck className="w-4 h-4 text-blue" />
                <span className="text-xs font-bold text-blue">4 completion badges</span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {completionBadges.map((badge) => (
                <img
                  key={badge.name}
                  src={badge.image}
                  alt={badge.name}
                  className="w-full h-auto object-contain"
                />
              ))}
            </div>
          </div>
        </div>


      </section>

      {/* ============ GCP SERVICES — CATEGORIZED ============ */}
      <section id="servicios" className="py-24 bg-[#F8FAFD] border-y border-border/30">
        <div
          ref={servicesAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            servicesAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="max-w-2xl mb-14">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-10 bg-blue rounded-full" />
              <span className="text-xs font-semibold text-blue uppercase tracking-wider">Ecosistema</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Servicios de Google Cloud
            </h2>
            <p className="mt-3 text-text-secondary text-base">
              Herramientas agrupadas por categoría que conocerás durante el programa.
            </p>
          </div>

          {/* Categorized service grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((cat, ci) => (
              <div
                key={cat.category}
                className="space-y-3"
              >
                {/* Category header */}
                <div
                  className="flex items-center gap-2 pb-2 border-b-2"
                  style={{
                    borderColor: cat.color,
                    opacity: servicesAnim.isInView ? 1 : 0,
                    transform: servicesAnim.isInView ? "translateY(0)" : "translateY(12px)",
                    transition: `all 0.4s ease ${ci * 150}ms`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: cat.color }}>
                    {cat.category}
                  </span>
                </div>

                {/* Services in category */}
                {cat.services.map((svc, si) => (
                  <div
                    key={svc.name}
                    className="group relative rounded-xl hover:-translate-y-0.5 transition-[transform,box-shadow] duration-300"
                    style={{
                      opacity: servicesAnim.isInView ? 1 : 0,
                      transform: servicesAnim.isInView ? "translateY(0)" : "translateY(30px)",
                      transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${ci * 200 + (si + 1) * 150}ms, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${ci * 200 + (si + 1) * 150}ms`,
                    }}
                  >
                    <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_var(--angle),#EA4335,#4285F4,#34A853,#FBBC04,#EA4335)] [animation:spin-border_3s_linear_infinite]" />
                    <div className="relative flex items-center gap-3 p-3.5 rounded-xl bg-white border border-border/50 group-hover:border-transparent transition-colors duration-300">
                      <div className="w-9 h-9 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <img src={svc.img} alt={svc.name} className="w-7 h-7 object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-foreground truncate">{svc.name}</h3>
                        <p className="text-[10px] text-text-secondary">{svc.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARTICIPATION ROUTE — BOLD TIMELINE ============ */}
      <section id="ruta" className="py-24 bg-white">
        <div
          ref={routeAnim.ref}
          className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            routeAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-1 w-10 bg-orange rounded-full" />
              <span className="text-xs font-semibold text-orange uppercase tracking-wider">Proceso</span>
              <div className="h-1 w-10 bg-orange rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              Tu Ruta en 5 Pasos
            </h2>
          </div>

          {/* Bold vertical timeline for mobile, horizontal for desktop */}
          <div className="relative">
            {/* Desktop connecting bar */}
            <div className="hidden md:block absolute top-[30px] left-[10%] right-[10%] h-1.5 rounded-full bg-grey-light overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue via-red via-yellow to-green transition-all duration-1000"
                style={{ width: routeAnim.isInView ? "100%" : "0%" }}
              />
            </div>

            <div className="grid md:grid-cols-5 gap-8 md:gap-4">
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className="relative flex flex-col items-center text-center"
                  style={{
                    opacity: routeAnim.isInView ? 1 : 0,
                    transform: routeAnim.isInView ? "translateY(0)" : "translateY(24px)",
                    transition: `all 0.5s ease ${i * 200}ms`,
                  }}
                >
                  {/* Step number — larger, colored */}
                  <div
                    className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg mb-4 text-white font-extrabold text-lg"
                    style={{ backgroundColor: s.color }}
                  >
                    {s.step}
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed max-w-[140px]">{s.desc}</p>

                  {/* Mobile arrow */}
                  {i < steps.length - 1 && (
                    <ChevronDown className="w-5 h-5 text-border mt-3 md:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-20 bg-[#F8FAFD]">
        <div
          ref={ctaAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            ctaAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative p-10 sm:p-16 rounded-3xl bg-white border border-border/50 shadow-lg overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-blue/[0.03] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-green/[0.03] rounded-full blur-3xl" />
            {/* Top Google color bar */}
            <div className="absolute top-0 left-0 right-0 h-1 flex">
              <div className="flex-1 bg-blue" />
              <div className="flex-1 bg-red" />
              <div className="flex-1 bg-yellow" />
              <div className="flex-1 bg-green" />
            </div>

            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <img src="/assets/Google_Cloud_logo.png" alt="Google Cloud" className="h-8 w-auto" />
                <div className="w-px h-6 bg-border" />
                <img src="/assets/logoUnam.png" alt="FES Acatlán UNAM" className="h-10 w-auto" />
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 leading-tight">
                Impulsa tu perfil profesional
                <br />
                <span className="text-blue">desde la UNAM</span>
              </h2>
              <p className="text-text-secondary text-base max-w-lg mx-auto mb-8">
                Certificación cloud, skill badges, labs prácticos y orientación profesional.
                Todo sin costo para estudiantes UNAM.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/"
                  className="px-7 py-3.5 bg-blue text-white text-sm font-semibold rounded-xl hover:bg-blue-dark transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al curso
                </Link>
                <a
                  href="https://cloud.google.com/edu/career-readiness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-grey-light transition-all duration-300 flex items-center gap-2"
                >
                  Más información
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[10px] text-text-secondary">
              Google Cloud × FES Acatlán UNAM · Semestre 2026-2 · Programa académico con enfoque cloud
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
