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
const metrics = [
  { label: "Cursos", value: 4, icon: BookOpen, color: "text-blue" },
  { label: "Módulos", value: 10, icon: FileText, color: "text-green" },
  { label: "Videos", value: 104, icon: Video, color: "text-red" },
  { label: "Labs", value: 25, icon: FlaskConical, color: "text-blue" },
  { label: "Quizzes", value: 10, icon: HelpCircle, color: "text-yellow" },
  { label: "Skill Badges", value: 4, icon: BadgeCheck, color: "text-green" },
];

const benefits = [
  { icon: GraduationCap, title: "Formación introductoria", text: "Sin prerrequisitos. Ideal para estudiantes que inician en cloud computing." },
  { icon: Users, title: "Aprendizaje guiado", text: "Cohortes con docentes UNAM como facilitadores del programa." },
  { icon: FlaskConical, title: "Laboratorios hands-on", text: "25+ labs prácticos en entornos reales de Google Cloud." },
  { icon: Award, title: "Credencial compartible", text: "Badge o certificado digital verificable para tu perfil profesional." },
  { icon: Briefcase, title: "Empleabilidad cloud", text: "Habilidades alineadas con roles de infraestructura y desarrollo cloud." },
  { icon: Clock, title: "6 meses de acceso", text: "Acceso sin costo al certificado y contenido completo del programa." },
];

const courses = [
  {
    number: 1,
    title: "Cloud Computing Fundamentals",
    description: "Introducción a conceptos de nube, modelos de servicio (IaaS, PaaS, SaaS) y la infraestructura global de Google Cloud.",
    duration: "~15 horas",
    topics: ["Conceptos de nube", "Modelos de servicio", "Infraestructura global GCP"],
    color: "bg-blue",
    textColor: "text-blue",
    lightBg: "bg-blue-light",
  },
  {
    number: 2,
    title: "Infrastructure in Google Cloud",
    description: "Compute Engine, almacenamiento, bases de datos y despliegue de aplicaciones en la nube de Google.",
    duration: "~18 horas",
    topics: ["Compute Engine", "Cloud Storage", "Cloud SQL & Firestore"],
    color: "bg-red",
    textColor: "text-red",
    lightBg: "bg-red-light",
  },
  {
    number: 3,
    title: "Networking & Security in Google Cloud",
    description: "Redes virtuales, balanceo de carga, firewalls e identidad con IAM en Google Cloud.",
    duration: "~14 horas",
    topics: ["VPC Networks", "Load Balancing", "IAM & Security"],
    color: "bg-yellow",
    textColor: "text-orange",
    lightBg: "bg-yellow-light",
  },
  {
    number: 4,
    title: "Data, ML, and AI in Google Cloud",
    description: "BigQuery, Dataproc, Vertex AI y AutoML para análisis de datos e inteligencia artificial.",
    duration: "~16 horas",
    topics: ["BigQuery", "Vertex AI & AutoML", "Dataproc & Pub/Sub"],
    color: "bg-green",
    textColor: "text-green",
    lightBg: "bg-green-light",
  },
];

const skillBadges = [
  { name: "Create and Manage Cloud Resources", category: "Infrastructure", level: "INTRODUCTORY" },
  { name: "Set Up an App Dev Environment", category: "Application Development", level: "INTRODUCTORY" },
  { name: "Build a Secure Google Cloud Network", category: "Security", level: "INTERMEDIATE" },
  { name: "Prepare Data for ML APIs", category: "Machine Learning", level: "INTERMEDIATE" },
];

const services = [
  { name: "Compute Engine", img: "/assets/Compute Engine.svg", desc: "Máquinas virtuales escalables" },
  { name: "Cloud Storage", img: "/assets/Cloud Storage.svg", desc: "Almacenamiento de objetos" },
  { name: "BigQuery", img: "/assets/BigQuery.svg", desc: "Data warehouse serverless" },
  { name: "Vertex AI", img: "/assets/Vertex AI.svg", desc: "ML & AI platform" },
  { name: "Pub/Sub", img: "/assets/PubSub.svg", desc: "Mensajería asíncrona" },
  { name: "Cloud Functions", img: "/assets/Cloud Functions.svg", desc: "Funciones serverless" },
  { name: "VPC", img: "/assets/Virtual Private Cloud.svg", desc: "Redes virtuales privadas" },
  { name: "IAM", img: "/assets/Identity And Access Management.svg", desc: "Identidad y acceso" },
];

const steps = [
  { step: 1, title: "Convocatoria UNAM", desc: "Inscripción a través de tu facultad" },
  { step: 2, title: "Acceso al programa", desc: "Activación de tu cuenta Google Cloud Skills Boost" },
  { step: 3, title: "Avance por cursos", desc: "Completa los 4 cursos del certificado" },
  { step: 4, title: "Labs y Badges", desc: "Practica en entornos reales y obtén insignias" },
  { step: 5, title: "Credencial", desc: "Certificado compartible en tu perfil profesional" },
];

// ============================================================
// ANIMATED COUNTER
// ============================================================
function AnimatedCounter({ target, inView }: { target: number; inView: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const steps = 30;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (step >= steps) clearInterval(timer);
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFD]">
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
            {["Programa", "Beneficios", "Certificado", "Labs", "Servicios", "Ruta"].map((item) => (
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
            <img src="/assets/logoUnam.png" alt="FES Acatlán UNAM" className="h-7 w-auto" />
          </div>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-green/5 rounded-full blur-3xl" />
        </div>

        <div
          ref={heroAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
            heroAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium text-blue bg-blue-light px-3 py-1 rounded-full">
                  Google Cloud × UNAM
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Google Career{" "}
                <span className="text-blue">Launchpad</span>
                <br />
                <span className="text-2xl sm:text-3xl text-text-secondary font-medium mt-2 block">
                  en la UNAM
                </span>
              </h1>
              <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-lg">
                Fortalece tus habilidades en computación en la nube con el certificado{" "}
                <span className="font-semibold text-foreground">Google Cloud Computing Foundations</span>.
                Acceso sin costo por 6 meses para estudiantes UNAM.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#programa"
                  className="px-6 py-3 bg-blue text-white text-sm font-medium rounded-xl hover:bg-blue-dark transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Explorar programa
                </a>
                <Link
                  href="/#unidades"
                  className="px-6 py-3 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-grey-light transition-all duration-300"
                >
                  Ver plan de estudios
                </Link>
              </div>
            </div>

            {/* Hero illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <img
                  src="/assets/heroCloudIllustration.jpg"
                  alt="Google Career Launchpad"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROGRAM OVERVIEW ============ */}
      <section id="programa" className="py-20 bg-white">
        <div
          ref={overviewAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            overviewAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-8 bg-blue" />
                <span className="text-xs font-medium text-blue uppercase tracking-wider">Visión General</span>
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                ¿Qué es Google Career Launchpad?
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Career Launchpad es una iniciativa de Google Cloud para universidades que ofrece a los estudiantes
                acceso gratuito al certificado <span className="font-semibold text-foreground">Cloud Computing Foundations</span>,
                credenciales digitales compartibles y preparación para carreras en la nube.
              </p>
              <p className="text-text-secondary leading-relaxed">
                El certificado Foundations funciona como puerta de entrada a trayectorias de{" "}
                <span className="font-medium text-foreground">infraestructura cloud</span>,{" "}
                <span className="font-medium text-foreground">ingeniería de datos</span> y{" "}
                <span className="font-medium text-foreground">desarrollo de aplicaciones nativas de nube</span>.
              </p>
            </div>

            {/* Metrics grid */}
            <div className="grid grid-cols-3 gap-3">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className="p-4 bg-[#F8FAFD] rounded-xl border border-border/50 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  style={{
                    opacity: overviewAnim.isInView ? 1 : 0,
                    transform: overviewAnim.isInView ? "translateY(0)" : "translateY(12px)",
                    transition: `all 0.5s ease ${300 + i * 100}ms`,
                  }}
                >
                  <m.icon className={`w-5 h-5 ${m.color} mx-auto mb-2`} />
                  <div className={`text-2xl font-bold ${m.color}`}>
                    <AnimatedCounter target={m.value} inView={overviewAnim.isInView} />
                  </div>
                  <div className="text-[10px] text-text-secondary font-medium uppercase tracking-wide mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ BENEFITS ============ */}
      <section id="beneficios" className="py-20">
        <div
          ref={benefitsAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            benefitsAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-8 bg-green" />
              <span className="text-xs font-medium text-green uppercase tracking-wider">Ventajas</span>
              <div className="h-px w-8 bg-green" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Beneficios para Estudiantes UNAM
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Accede a formación de primer nivel en cloud computing con el respaldo de Google Cloud y tu universidad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className="group p-5 bg-white rounded-xl border border-border/50 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
                style={{
                  opacity: benefitsAnim.isInView ? 1 : 0,
                  transform: benefitsAnim.isInView ? "translateY(0)" : "translateY(16px)",
                  transition: `all 0.5s ease ${i * 100}ms`,
                }}
              >
                <div className="p-3 rounded-xl bg-blue-light/50 w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <b.icon className="w-5 h-5 text-blue" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{b.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============ CERTIFICATE STRUCTURE ============ */}
      <section id="certificado" className="py-20 bg-white">
        <div
          ref={certAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            certAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-8 bg-blue" />
              <span className="text-xs font-medium text-blue uppercase tracking-wider">Estructura</span>
              <div className="h-px w-8 bg-blue" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Certificado Cloud Computing Foundations
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              4 cursos progresivos que te llevan desde conceptos básicos hasta inteligencia artificial en la nube.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, i) => (
              <div
                key={course.number}
                className="group relative p-6 bg-[#F8FAFD] rounded-2xl border border-border/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                style={{
                  opacity: certAnim.isInView ? 1 : 0,
                  transform: certAnim.isInView ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s ease ${i * 150}ms`,
                }}
              >
                {/* Course number badge */}
                <div className={`absolute -top-3 -left-3 w-10 h-10 ${course.color} rounded-xl flex items-center justify-center shadow-md`}>
                  <span className="text-white font-bold text-sm">{course.number}</span>
                </div>

                <div className="ml-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-bold text-foreground">{course.title}</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">{course.description}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-3.5 h-3.5 text-text-secondary" />
                    <span className="text-xs text-text-secondary">{course.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {course.topics.map((topic) => (
                      <span
                        key={topic}
                        className={`text-[10px] font-medium px-2.5 py-1 rounded-full ${course.lightBg} ${course.textColor}`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SKILL BADGES & LABS ============ */}
      <section id="labs" className="py-20">
        <div
          ref={badgesAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            badgesAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-8 bg-green" />
              <span className="text-xs font-medium text-green uppercase tracking-wider">Práctica</span>
              <div className="h-px w-8 bg-green" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Aprendizaje Aplicado
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Skill badges que prueban habilidades concretas en entornos interactivos de Google Cloud.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillBadges.map((badge, i) => (
              <div
                key={badge.name}
                style={{
                  opacity: badgesAnim.isInView ? 1 : 0,
                  transform: badgesAnim.isInView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                  transition: `all 0.5s ease ${i * 120}ms`,
                }}
              >
                <SkillBadgeCard
                  title={badge.name}
                  category={badge.category}
                  level={badge.level}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl bg-white border border-green/20 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-light shrink-0">
              <FlaskConical className="w-6 h-6 text-green" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">25+ laboratorios prácticos</p>
              <p className="text-xs text-text-secondary mt-1">
                Cada lab se realiza en entornos reales de Google Cloud. Completa desafíos, configura servicios
                y valida tu trabajo para obtener las insignias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ GCP SERVICES ============ */}
      <section id="servicios" className="py-20 bg-white">
        <div
          ref={servicesAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            servicesAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-8 bg-blue" />
              <span className="text-xs font-medium text-blue uppercase tracking-wider">Tecnología</span>
              <div className="h-px w-8 bg-blue" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Servicios de Google Cloud que Conocerás
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl mx-auto">
              Herramientas reales de la industria que usarás durante el programa.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {services.map((svc, i) => (
              <div
                key={svc.name}
                className="group relative rounded-xl hover:-translate-y-1 transition-all duration-300"
                style={{
                  opacity: servicesAnim.isInView ? 1 : 0,
                  transform: servicesAnim.isInView ? "translateY(0)" : "translateY(12px)",
                  transition: `all 0.4s ease ${i * 80}ms`,
                }}
              >
                {/* Animated gradient border */}
                <div className="absolute -inset-[1px] rounded-xl bg-border/50 group-hover:bg-[conic-gradient(from_var(--angle),#EA4335,#4285F4,#34A853,#FBBC04,#EA4335)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 [animation:spin-border_3s_linear_infinite]" />

                <div className="relative p-5 rounded-xl border border-border/50 group-hover:border-transparent bg-[#F8FAFD] group-hover:bg-white transition-colors duration-300 text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img src={svc.img} alt={svc.name} className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="text-xs font-bold text-foreground mb-1">{svc.name}</h3>
                  <p className="text-[10px] text-text-secondary">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARTICIPATION ROUTE ============ */}
      <section id="ruta" className="py-20">
        <div
          ref={routeAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            routeAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-8 bg-orange" />
              <span className="text-xs font-medium text-orange uppercase tracking-wider">Proceso</span>
              <div className="h-px w-8 bg-orange" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              Ruta de Participación
            </h2>
          </div>

          {/* Steps timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connecting line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border hidden md:block" />

            <div className="grid md:grid-cols-5 gap-6 md:gap-4">
              {steps.map((s, i) => (
                <div
                  key={s.step}
                  className="relative flex flex-col items-center text-center"
                  style={{
                    opacity: routeAnim.isInView ? 1 : 0,
                    transform: routeAnim.isInView ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.5s ease ${i * 200}ms`,
                  }}
                >
                  {/* Step circle */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-blue flex items-center justify-center shadow-sm mb-3">
                    <span className="text-sm font-bold text-blue">{s.step}</span>
                  </div>
                  <h3 className="text-xs font-bold text-foreground mb-1">{s.title}</h3>
                  <p className="text-[10px] text-text-secondary leading-relaxed">{s.desc}</p>

                  {/* Arrow for mobile */}
                  {i < steps.length - 1 && (
                    <ChevronDown className="w-4 h-4 text-border mt-2 md:hidden" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-20 bg-white">
        <div
          ref={ctaAnim.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
            ctaAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-blue/5 via-[#F8FAFD] to-green/5 border border-border/50 text-center overflow-hidden">
            {/* Background decor */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-green/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <img src="/assets/logoCloud.png" alt="Google Cloud" className="h-8 w-auto" />
                <img src="/assets/logoUnam.png" alt="FES Acatlán UNAM" className="h-10 w-auto" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Impulsa tu perfil profesional con
                <br />
                <span className="text-blue">Google Cloud</span> desde la <span className="text-orange">UNAM</span>
              </h2>
              <p className="text-text-secondary max-w-lg mx-auto mb-8">
                Programa académico con enfoque cloud. Formación base con labs, skill badges
                y ruta de entrada a carreras en la nube.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/"
                  className="px-6 py-3 bg-blue text-white text-sm font-medium rounded-xl hover:bg-blue-dark transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al curso
                </Link>
                <a
                  href="https://cloud.google.com/edu/career-readiness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-border text-foreground text-sm font-medium rounded-xl hover:bg-grey-light transition-all duration-300 flex items-center gap-2"
                >
                  Más información
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 text-center">
            <p className="text-[10px] text-text-secondary">
              Impulsado por Google Cloud para estudiantes UNAM • Programa académico con enfoque cloud
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
