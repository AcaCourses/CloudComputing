"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  Target,
  Lightbulb,
  Cloud,
  Shield,
  Brain,
  Globe,
  BookOpen,
  Heart,
  Eye,
  Laptop,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layout,
  Monitor,
  Code,
  ChevronDown,
  ChevronUp,
  Layers,
  Rocket,
  Presentation,
} from "lucide-react";

/* ─── Data ──────────────────────────────────────────── */

const ejes = [
  {
    id: 1,
    title: "Género",
    icon: Heart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    accentColor: "bg-pink-600",
    description:
      "Problemáticas relacionadas con la igualdad, la prevención de la violencia y el acceso equitativo a oportunidades.",
    networking: [
      "Plataformas para reportar violencia o acoso de forma segura",
      "Resguardo de datos sensibles",
      "Control de acceso a información confidencial",
    ],
    data: [
      "Análisis de patrones de violencia",
      "Detección de tendencias",
      "Recomendaciones personalizadas de apoyo",
      "Clasificación de casos",
    ],
    problemas: [
      "Desigualdad en acceso a educación, empleo o liderazgo",
      "Dificultad para reportar violencia o acoso de forma segura",
      "Falta de información confiable sobre derechos, apoyo y rutas de atención",
      "Escasa visibilidad de programas de acompañamiento para mujeres y diversidades",
    ],
  },
  {
    id: 2,
    title: "Educación",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    accentColor: "bg-blue-600",
    description:
      "Resolver problemas vinculados con el acceso, seguimiento y mejora del aprendizaje.",
    networking: [
      "Protección de datos escolares",
      "Acceso seguro para estudiantes y docentes",
      "Resguardo de expedientes",
    ],
    data: [
      "Análisis de desempeño",
      "Predicción de riesgo de deserción",
      "Personalización del aprendizaje",
      "Recomendaciones inteligentes",
    ],
    problemas: [
      "Deserción escolar",
      "Falta de recursos educativos digitales",
      "Dificultades para el seguimiento del desempeño académico",
      "Baja comunicación entre estudiantes, docentes y familias",
      "Necesidad de materiales personalizados o de apoyo fuera del aula",
    ],
  },
  {
    id: 3,
    title: "Inclusión y accesibilidad",
    icon: Globe,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    accentColor: "bg-green-600",
    description:
      "Eliminar barreras para que todas las personas puedan usar servicios, plataformas y recursos en igualdad de condiciones.",
    networking: [
      "Acceso seguro a plataformas inclusivas",
      "Protección de datos personales",
      "Autenticación para perfiles sensibles",
    ],
    data: [
      "Traducción automática",
      "Lectura en voz alta",
      "Reconocimiento de imágenes",
      "Subtitulado y asistentes inteligentes",
    ],
    problemas: [
      "Dificultades de acceso para personas con discapacidad visual, auditiva o motriz",
      "Barreras de navegación en sitios web o aplicaciones",
      "Falta de contenidos en lenguaje claro, audio o subtítulos",
      "Escasa adaptación de servicios digitales para personas mayores o con baja alfabetización digital",
      "Problemas de comunicación en contextos multilingües",
    ],
  },
  {
    id: 4,
    title: "Bienestar digital y salud mental",
    icon: Laptop,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    accentColor: "bg-purple-600",
    description:
      "Mejorar la relación de las personas con la tecnología y apoyar su equilibrio emocional.",
    networking: [
      "Protección de datos personales y privados",
      "Entornos seguros de orientación o acompañamiento",
    ],
    data: [
      "Análisis de hábitos digitales",
      "Detección de patrones de uso",
      "Asistentes conversacionales",
      "Recomendaciones de autocuidado",
    ],
    problemas: [
      "Uso excesivo de pantallas",
      "Estrés, ansiedad o fatiga digital",
      "Falta de herramientas para organizar hábitos saludables",
      "Dificultad para detectar señales de sobrecarga emocional",
      "Necesidad de espacios seguros de orientación, apoyo o autocuidado",
    ],
  },
  {
    id: 5,
    title: "Transparencia y acceso a la información",
    icon: Eye,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    accentColor: "bg-amber-600",
    description:
      "Facilitar que las personas encuentren, entiendan y usen información pública o institucional.",
    networking: [
      "Acceso seguro a portales",
      "Autenticación de usuarios",
      "Protección de documentos y registros",
    ],
    data: [
      "Análisis de datos públicos",
      "Buscadores inteligentes",
      "Clasificación de documentos",
      "Asistentes que expliquen información compleja",
    ],
    problemas: [
      "Dificultad para localizar información oficial",
      "Trámites confusos o poco claros",
      "Falta de seguimiento ciudadano a procesos o reportes",
      "Baja claridad sobre presupuestos, servicios o decisiones públicas",
      "Necesidad de centralizar datos abiertos o documentos relevantes",
    ],
  },
];

const entregables = [
  "Nombre de la plataforma o solución",
  "Problema que busca resolver",
  "Eje temático elegido",
  "Especialización a la que se alinea",
  "Público objetivo",
  "Descripción general de cómo funcionaría",
  "Servicios de nube que usarían",
  "Breve justificación de por qué elegirían esos servicios",
  "Posibles herramientas de IA o APIs que podrían integrarse",
  "Beneficio social, educativo o institucional de la solución",
  "Maqueta digital tipo MVP creada con apoyo de IA o herramientas web, que represente visualmente la solución al problema elegido",
];

const serviciosCloud = [
  { name: "Cloud Run / App Engine", desc: "Alojar la aplicación web", icon: Rocket },
  { name: "Cloud Storage", desc: "Guardar imágenes, documentos o archivos", icon: Cloud },
  { name: "Cloud SQL", desc: "Almacenar información estructurada", icon: Layers },
  { name: "Pub/Sub", desc: "Notificaciones o comunicación entre componentes", icon: Sparkles },
  { name: "Text-to-Speech", desc: "Accesibilidad y lectura en voz alta", icon: Monitor },
  { name: "Speech-to-Text", desc: "Convertir voz en texto", icon: Monitor },
  { name: "Translation API", desc: "Contenido multilingüe", icon: Globe },
  { name: "Vision API", desc: "Analizar imágenes o documentos", icon: Eye },
  { name: "IAM / IAP", desc: "Controlar acceso y seguridad", icon: Shield },
  { name: "Cloud Logging / Monitoring", desc: "Observabilidad de la plataforma", icon: Target },
];

const reglasGenerales = [
  "Los equipos serán de máximo 3 integrantes de la misma área.",
  "Los equipos los seleccionan los alumnos.",
  "Solo 2 integrantes exponen.",
  "La exposición dura máximo 5 minutos.",
  "Antes de presentar, deben indicar a cuál camino de especialización se alinea su propuesta.",
  "La solución debe ser teórica y conceptual, no un desarrollo completo.",
  "La página web debe funcionar como una maqueta o emulación tipo MVP de la plataforma propuesta.",
  "Se puede usar IA para generar el prototipo, siempre que el equipo pueda explicar lo que construyó.",
  "La exposición debe demostrar comprensión del problema, la propuesta, la especialización elegida y los servicios cloud seleccionados.",
];

const mvpMustShow = [
  "La problemática que atiende",
  "El público objetivo",
  "La función principal de la plataforma",
  "Un flujo de interacción de usuario",
  "Pantallas clave: inicio, consulta, reporte, seguimiento, resultados o panel",
  "Una apariencia de plataforma funcional (aunque no tenga backend real)",
];

/* ─── Prompt Ejemplo Component ──────────────────────── */

const promptEjemplo = `Quiero que construyas un sistema web tipo MVP llamado EcoRuta Escolar, una plataforma digital enfocada en resolver un problema ambiental y social: el uso ineficiente del transporte escolar y familiar, que genera más tráfico, más emisiones contaminantes y más gasto de combustible alrededor de escuelas urbanas.

Objetivo del sistema:
Diseña una plataforma web que ayude a escuelas, familias y administradores a organizar rutas compartidas, registrar hábitos de traslado y visualizar oportunidades para reducir emisiones. El proyecto debe verse como una solución real, aunque sea un prototipo funcional frontend con datos simulados.

Quiero que el sistema esté pensado como una propuesta conceptual alineada con sostenibilidad, transformación digital e impulso del uso de IA.

Requisitos generales:
- Crea una aplicación web moderna, atractiva y clara.
- Usa HTML, CSS y JavaScript si quieres algo simple, o una estructura más completa si consideras que vale la pena.
- Si decides usar framework, mantenlo ligero y fácil de ejecutar.
- El resultado debe parecer una plataforma real, no solo una landing page.
- Debe incluir navegación entre secciones o pantallas.
- Todo el contenido debe estar en español.
- El diseño debe sentirse limpio, tecnológico, ecológico y escolar/institucional.
- Usa colores verdes, azules suaves, blanco y acentos modernos.
- Agrega iconos, tarjetas, paneles, estadísticas y microinteracciones.

Problema que resuelve:
Muchas familias llevan a sus hijos en vehículos separados, incluso cuando viven en zonas cercanas. Esto incrementa tráfico, emisiones de CO2, consumo de combustible y desorden vial en horarios escolares. La plataforma debe proponer una manera digital de coordinar trayectos compartidos y visualizar impacto ambiental positivo.

Público objetivo:
- Escuelas
- Familias
- Coordinadores escolares
- Municipios o autoridades educativas
- Comunidades interesadas en movilidad sostenible

Funcionalidades que quiero en el MVP:
1. Página de inicio con explicación del problema ambiental y propuesta de solución.
2. Dashboard principal con métricas simuladas:
   - emisiones evitadas
   - viajes compartidos realizados
   - familias registradas
   - rutas activas
   - ahorro estimado de combustible
3. Módulo de registro de rutas:
   - origen
   - destino
   - horario
   - número de lugares disponibles
   - tipo de transporte
4. Módulo de coincidencias inteligentes:
   - mostrar familias o usuarios con rutas similares
   - sugerir agrupaciones de viaje con lógica simulada
5. Mapa o sección visual simulada de rutas compartidas.
6. Sección de impacto ambiental:
   - gráficos
   - indicadores
   - comparaciones semanales o mensuales
7. Panel para escuela o administrador:
   - ver rutas registradas
   - ver zonas de mayor tráfico
   - ver estudiantes/familias participantes
8. Sección "IA aplicada" donde se explique cómo la plataforma podría usar inteligencia artificial.
9. Formulario o asistente para recomendar la mejor ruta compartida.
10. Diseño responsive.

Quiero que incluyas una sección conceptual de IA con ejemplos como:
- recomendación inteligente de rutas compartidas
- predicción de horas de mayor congestión
- clasificación de zonas con mayor impacto ambiental
- sugerencias automáticas para reducir emisiones
- generación de alertas para coordinadores escolares

Además, quiero una sección conceptual de nube con arquitectura propuesta usando servicios de Google Cloud, por ejemplo:
- Cloud Run o App Engine para alojar la aplicación
- Cloud SQL para datos estructurados
- Cloud Storage para archivos o reportes
- Maps API o componente visual simulado para rutas
- Vertex AI o APIs de IA para recomendaciones inteligentes
- IAM/IAP para control de acceso
- Logging/Monitoring para observabilidad

Estructura visual esperada:
- Header con logo textual "EcoRuta Escolar"
- Hero section con eslogan potente
- Tarjetas de problema, solución e impacto
- Dashboard con KPIs
- Tablas o cards para rutas
- Gráficas atractivas
- Espacio visual para mapa
- Sección de arquitectura cloud
- Sección de IA
- Footer institucional

Interacciones web que quiero:
- hover en tarjetas
- navegación por tabs o sidebar
- botones con estados activos
- animaciones suaves al cargar
- filtros simulados para rutas
- paneles expandibles
- indicadores dinámicos con datos mock

Importante:
- No quiero solo texto descriptivo; quiero una maqueta funcional navegable.
- Usa datos simulados realistas.
- Organiza bien componentes, estilos y scripts.
- Si generas varios archivos, sepáralos limpiamente.
- Quiero código entendible para poder editarlo después.
- Incluye comentarios mínimos pero útiles.
- Asegúrate de que todo corra localmente sin depender de backend real.
- Si necesitas inventar datos, hazlo de forma coherente con el problema.

Entregables:
- archivos completos del proyecto
- interfaz funcional
- diseño visual convincente
- texto del sistema en español
- breve README con instrucciones para correrlo
- breve explicación de cómo cada módulo se relaciona con el problema ambiental

Antes de empezar:
1. Propón una estructura de archivos.
2. Resume qué pantallas vas a construir.
3. Explica cómo representarás el componente de IA y el de Google Cloud dentro del MVP.
4. Luego genera el proyecto completo.`;

function PromptEjemploInline() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-8 space-y-6">
      {/* Prompt toggle */}
      <div className="rounded-xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50/40 via-white to-purple-50/20 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-3 p-5 text-left hover:bg-cyan-50/30 transition-colors"
        >
          <div className="p-2.5 rounded-lg bg-cyan-100 shrink-0">
            <Code className="w-5 h-5 text-cyan-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-foreground">Ver Prompt Ejemplo</h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Ejemplo completo de cómo redactar un prompt para que una IA construya tu MVP.
            </p>
          </div>
          <div className="shrink-0 p-1.5 rounded-lg bg-cyan-100/60">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-cyan-700" />
            ) : (
              <ChevronDown className="w-5 h-5 text-cyan-700" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="border-t-2 border-cyan-100 p-5 sm:p-6 space-y-5">
            {/* Note */}
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-cyan-50 border border-cyan-100">
              <Lightbulb className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Este prompt es un ejemplo.</strong> Adapta el nombre, eje temático, problema y módulos a tu propuesta. Lo importante es ser específico y claro.
              </p>
            </div>

            {/* Prompt code block */}
            <div className="relative">
              <div className="absolute top-3 right-3 z-10">
                <button
                  onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(promptEjemplo); }}
                  className="px-3 py-1.5 rounded-md bg-white border border-border text-xs font-medium text-text-secondary hover:text-foreground hover:border-cyan-300 transition-colors shadow-sm"
                >
                  Copiar prompt
                </button>
              </div>
              <div className="rounded-lg border border-border bg-gray-900 p-5 overflow-auto max-h-[400px]">
                <pre className="text-xs text-gray-200 whitespace-pre-wrap font-mono leading-relaxed">
                  {promptEjemplo}
                </pre>
              </div>
            </div>

            {/* Tips */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-lg bg-white border border-border">
                <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1.5">Sé específico</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Indica colores, secciones, funcionalidades y estructura esperada.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-border">
                <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1.5">Pide estructura primero</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Solicita que la IA proponga la arquitectura antes de generar código.
                </p>
              </div>
              <div className="p-3.5 rounded-lg bg-white border border-border">
                <div className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1.5">Itera y mejora</div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  No esperes perfección al primer intento. Pide ajustes en mensajes siguientes.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Artifact link */}
      <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-r from-purple-50/60 to-cyan-50/40 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-lg bg-purple-100">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Artefacto generado por Claude</h3>
            <p className="text-xs text-text-secondary">Resultado real del prompt anterior — MVP funcional de EcoRuta Escolar</p>
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-5 leading-relaxed">
          Observa cómo una instrucción bien estructurada produce una maqueta completa y navegable.
        </p>
        <a
          href="https://claude.ai/public/artifacts/8f6cdf14-400a-40d9-b895-a3656ccf4e9c"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700 transition-colors shadow-sm"
        >
          <Layout className="w-4 h-4" />
          Ver artefacto: EcoRuta Escolar ↗
        </a>
      </div>
    </div>
  );
}

/* ─── Component ─────────────────────────────────────── */

export default function ProyectoPage() {
  const [openEje, setOpenEje] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* ═══ HERO ═══ */}
      <div className="relative overflow-hidden bg-gradient-to-br from-azure/8 via-background to-green/8 border-b border-border">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='%23000' stroke-width='.5'/%3E%3C/svg%3E\")" }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/#evaluacion"
            className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-azure transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Volver a Evaluación
          </Link>

          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-azure/10 border border-azure/20 text-xs font-medium text-azure mb-6">
              <Presentation className="w-3.5 h-3.5" />
              20% de la calificación final
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Proyecto Final
              <span className="block text-azure mt-1">Exposición por Equipos</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Propón una solución digital basada en la nube, vinculada con un eje temático social
              y uno de los dos caminos de especialización de Google Cloud.
            </p>

            {/* Quick nav buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#reglas" className="px-4 py-2 rounded-lg border border-border bg-white text-sm font-medium text-foreground hover:border-azure/40 hover:shadow-sm transition-all">
                Lineamientos
              </a>
              <a href="#ejes" className="px-4 py-2 rounded-lg border border-border bg-white text-sm font-medium text-foreground hover:border-green/40 hover:shadow-sm transition-all">
                Ejes temáticos
              </a>
              <a href="#mvp" className="px-4 py-2 rounded-lg bg-azure text-white text-sm font-medium hover:bg-azure/90 shadow-sm transition-all">
                Ver MVP
              </a>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center p-4 rounded-xl bg-white border border-border shadow-sm">
              <Users className="w-6 h-6 text-azure mx-auto mb-1.5" />
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider">Máx. integrantes</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white border border-border shadow-sm">
              <Target className="w-6 h-6 text-green mx-auto mb-1.5" />
              <p className="text-2xl font-bold text-foreground">2</p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider">Exponen</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-white border border-border shadow-sm">
              <Clock className="w-6 h-6 text-orange mx-auto mb-1.5" />
              <p className="text-2xl font-bold text-foreground">5<span className="text-sm font-normal ml-0.5">min</span></p>
              <p className="text-[10px] text-text-secondary uppercase tracking-wider">Máx. por equipo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* ═══ CAMINOS DE ESPECIALIZACIÓN ═══ */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Caminos de Especialización</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Antes de presentar, cada equipo debe indicar a cuál camino se alinea su propuesta y explicar por qué.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Networking & Security */}
            <div className="relative group rounded-2xl border-2 border-azure/20 bg-gradient-to-br from-azure/5 to-transparent p-6 hover:border-azure/40 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-4 right-4 text-[10px] font-bold text-azure bg-azure/10 px-2 py-1 rounded-full uppercase tracking-wider">
                Camino 1
              </div>
              <div className="p-3 rounded-xl bg-azure/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-azure" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Networking & Security in Google Cloud
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Redes, seguridad, control de acceso, protección de datos, cifrado y cumplimiento normativo en la nube.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["VPC", "Firewalls", "IAM", "IAP", "Cloud Armor", "SSL/TLS"].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-azure/10 text-azure font-medium">{t}</span>
                ))}
              </div>
            </div>

            {/* Data, ML & AI */}
            <div className="relative group rounded-2xl border-2 border-green/20 bg-gradient-to-br from-green/5 to-transparent p-6 hover:border-green/40 hover:shadow-lg transition-all duration-300">
              <div className="absolute top-4 right-4 text-[10px] font-bold text-green bg-green/10 px-2 py-1 rounded-full uppercase tracking-wider">
                Camino 2
              </div>
              <div className="p-3 rounded-xl bg-green/10 w-fit mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-green" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Data, ML, and AI in Google Cloud
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Análisis de datos, aprendizaje automático, APIs de inteligencia artificial, procesamiento de lenguaje natural y visión.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["BigQuery", "Vertex AI", "Vision API", "NLP", "Translation", "TTS"].map((t) => (
                  <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-green/10 text-green font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ REGLAS GENERALES ═══ */}
        <section id="reglas">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-orange/10">
              <AlertTriangle className="w-5 h-5 text-orange" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Reglas Generales</h2>
              <p className="text-xs text-text-secondary">Lineamientos obligatorios para todos los equipos</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {reglasGenerales.map((regla, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-white hover:border-orange/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-orange/10 flex items-center justify-center shrink-0 group-hover:bg-orange/20 transition-colors">
                  <span className="text-xs font-bold text-orange">{i + 1}</span>
                </div>
                <span className="text-sm text-foreground leading-relaxed">{regla}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ EJES TEMÁTICOS ═══ */}
        <section id="ejes">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20 text-xs font-medium text-warning mb-3">
              <Lightbulb className="w-3.5 h-3.5" />
              5 ejes disponibles
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Ejes Temáticos</h2>
            <p className="mt-2 text-sm text-text-secondary max-w-lg mx-auto">
              Cada equipo debe vincular su propuesta con uno de los siguientes ejes. Haz clic para explorar cada uno.
            </p>
          </div>

          <div className="space-y-3">
            {ejes.map((eje) => {
              const isOpen = openEje === eje.id;
              return (
                <div
                  key={eje.id}
                  className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                    isOpen ? `${eje.borderColor} shadow-md` : "border-border hover:border-gray-300"
                  }`}
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => setOpenEje(isOpen ? null : eje.id)}
                    className={`w-full flex items-center gap-4 p-4 sm:p-5 text-left transition-colors ${
                      isOpen ? eje.bgColor : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${eje.bgColor} shrink-0`}>
                      <eje.icon className={`w-5 h-5 ${eje.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-foreground">
                        {eje.id}. {eje.title}
                      </h3>
                      <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{eje.description}</p>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-text-secondary shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-text-secondary shrink-0" />
                    )}
                  </button>

                  {/* Accordion content */}
                  {isOpen && (
                    <div className="p-4 sm:p-5 border-t border-border/50 bg-white space-y-5">
                      {/* Specialization relationship */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-azure/5 border border-azure/10">
                          <div className="flex items-center gap-1.5 mb-3">
                            <Shield className="w-4 h-4 text-azure" />
                            <span className="text-[10px] font-bold text-azure uppercase tracking-wider">
                              Networking & Security
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {eje.networking.map((item, i) => (
                              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-azure shrink-0 mt-1.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-green/5 border border-green/10">
                          <div className="flex items-center gap-1.5 mb-3">
                            <Brain className="w-4 h-4 text-green" />
                            <span className="text-[10px] font-bold text-green uppercase tracking-wider">
                              Data, ML & AI
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {eje.data.map((item, i) => (
                              <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green shrink-0 mt-1.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Problems */}
                      <div>
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-3">
                          Problemas que puede atender
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {eje.problemas.map((prob, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-100"
                            >
                              <CheckCircle2 className={`w-3.5 h-3.5 ${eje.color} shrink-0 mt-0.5`} />
                              <span className="text-xs text-text-secondary leading-relaxed">{prob}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ MVP BLOCK ═══ */}
        <section id="mvp">
          <div className="rounded-2xl border-2 border-azure/30 bg-gradient-to-br from-azure/5 via-white to-cyan/5 overflow-hidden shadow-sm">
            {/* MVP Header */}
            <div className="p-6 sm:p-8 border-b border-azure/10">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-azure/10 shrink-0">
                  <Layout className="w-7 h-7 text-azure" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    Maqueta Digital tipo MVP
                  </h2>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-2xl">
                    Cada equipo deberá presentar una maqueta digital tipo MVP de su solución, es decir,
                    una <strong className="text-foreground">versión mínima de la plataforma</strong> que muestre de forma visual
                    cómo funcionaría y cómo ayudaría a resolver el problema elegido.
                  </p>
                </div>
              </div>
            </div>

            {/* MVP Definition */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* What is a MVP */}
              <div className="p-5 rounded-xl bg-azure/5 border border-azure/15">
                <h3 className="text-sm font-bold text-azure mb-2 flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  ¿Qué es un MVP?
                </h3>
                <p className="text-sm text-foreground leading-relaxed">
                  Un MVP (Minimum Viable Product) es una versión mínima del producto con un conjunto pequeño
                  de funciones esenciales que permite <strong>comunicar valor</strong> y mostrar cómo
                  resolvería el problema principal. No tiene que ser un producto terminado, pero sí debe
                  comunicar claramente valor, propósito y flujo de uso.
                </p>
              </div>

              {/* Browser mockup */}
              <div>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">
                  Tu equipo debe mostrar cómo se vería la solución funcionando
                </p>
                <div className="rounded-xl border border-border overflow-hidden shadow-sm">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border-b border-border">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="bg-white rounded-md border border-border px-3 py-1 text-[10px] text-text-secondary font-mono">
                        https://mi-plataforma.ejemplo.com
                      </div>
                    </div>
                  </div>
                  {/* Mock content */}
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-12 gap-4">
                      {/* Sidebar */}
                      <div className="col-span-3 space-y-2">
                        <div className="h-8 rounded bg-azure/20" />
                        <div className="h-4 rounded bg-gray-100 w-3/4" />
                        <div className="h-4 rounded bg-gray-100" />
                        <div className="h-4 rounded bg-gray-100 w-5/6" />
                        <div className="h-4 rounded bg-azure/10 border border-azure/20" />
                        <div className="h-4 rounded bg-gray-100 w-2/3" />
                      </div>
                      {/* Main */}
                      <div className="col-span-9 space-y-3">
                        <div className="h-6 rounded bg-gray-200 w-1/3" />
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-20 rounded-lg bg-azure/10 border border-azure/20" />
                          <div className="h-20 rounded-lg bg-green/10 border border-green/20" />
                          <div className="h-20 rounded-lg bg-orange/10 border border-orange/20" />
                        </div>
                        <div className="h-32 rounded-lg bg-gray-50 border border-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* What MVP must show */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green" />
                  Qué debe mostrar tu MVP
                </h3>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {mvpMustShow.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg border border-border bg-white hover:border-azure/30 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-azure/10 flex items-center justify-center shrink-0">
                        <span className="text-[10px] font-bold text-azure">{i + 1}</span>
                      </div>
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ BLOQUE IA ═══ */}
        <section>
          <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/50 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-purple-100 shrink-0">
                <Sparkles className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Uso de IA — Permitido y Promovido
                </h2>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed max-w-2xl">
                  Google Cloud ofrece APIs de IA para tareas como texto, voz, traducción e imágenes. 
                  Es coherente que pienses soluciones apoyadas en capacidades inteligentes y que 
                  construyas tu prototipo con herramientas generativas.
                </p>
              </div>
            </div>

            {/* Infinite logo carousel */}
            <div className="relative mb-8 overflow-hidden rounded-xl bg-white/60 border border-purple-100 py-6">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none" />
              <div className="flex animate-carousel">
                {[...Array(2)].map((_, setIdx) => (
                  <div key={setIdx} className="flex shrink-0 items-center gap-12 px-6">
                    {[
                      { name: "Claude", logo: "/assets/claudeLogo.png" },
                      { name: "Antigravity", logo: "/assets/antigravityLogo.png" },
                      { name: "Cursor", logo: "/assets/cursorLogo.png" },
                      { name: "GitHub Copilot", logo: "/assets/copilotLogo.png" },
                    ].map((tool) => (
                      <div
                        key={`${setIdx}-${tool.name}`}
                        className="flex flex-col items-center gap-2 shrink-0 w-24 group"
                      >
                        {tool.logo ? (
                          <div className="w-14 h-14 rounded-xl bg-white border border-purple-100 shadow-sm flex items-center justify-center p-2 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={tool.logo} alt={tool.name} className="w-10 h-10 object-contain" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-purple-50 border border-purple-100 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                            <span className="text-base font-bold text-purple-500">{tool.name.charAt(0)}</span>
                          </div>
                        )}
                        <span className="text-[10px] font-medium text-text-secondary whitespace-nowrap">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-purple-700 flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Tu equipo puede:
                </h3>
                <ul className="space-y-2">
                  {[
                    "Pedir a una IA que genere la estructura de la web",
                    "Solicitar pantallas tipo plataforma",
                    "Construir un MVP con HTML, CSS y JS",
                    "Editar y personalizar lo generado",
                    "Explicar qué partes del prototipo representan funciones reales",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                <p className="text-sm text-foreground leading-relaxed">
                  Preferentemente <strong>HTML, CSS y JavaScript</strong>, aunque no está prohibido usar 
                  otras herramientas si el resultado permite simular bien la solución.
                </p>
              </div>
            </div>

            {/* ─── Prompt Ejemplo (inline) ─── */}
            <PromptEjemploInline />
          </div>
        </section>

        {/* ═══ ENTREGABLES ═══ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-green/10">
              <CheckCircle2 className="w-5 h-5 text-green" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Qué debe incluir cada propuesta</h2>
              <p className="text-xs text-text-secondary">Elementos que deben estar presentes en la exposición</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-2.5">
            {entregables.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3.5 rounded-xl border bg-white hover:shadow-sm transition-all ${
                  i === entregables.length - 1
                    ? "border-azure/30 bg-azure/5 sm:col-span-2"
                    : "border-border"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  i === entregables.length - 1 ? "bg-azure/20" : "bg-green/10"
                }`}>
                  <span className={`text-[10px] font-bold ${
                    i === entregables.length - 1 ? "text-azure" : "text-green"
                  }`}>{i + 1}</span>
                </div>
                <span className={`text-sm leading-relaxed ${
                  i === entregables.length - 1 ? "text-foreground font-medium" : "text-foreground"
                }`}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SERVICIOS CLOUD ═══ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-azure/10">
              <Cloud className="w-5 h-5 text-azure" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Servicios Cloud Sugeridos</h2>
              <p className="text-xs text-text-secondary">Pueden mencionarse de forma conceptual en la propuesta</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {serviciosCloud.map((srv, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-white hover:border-azure/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="p-2 rounded-lg bg-azure/10 shrink-0 group-hover:scale-110 transition-transform">
                  <srv.icon className="w-4 h-4 text-azure" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground">{srv.name}</span>
                  <p className="text-xs text-text-secondary mt-0.5">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FOOTER CTA ═══ */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-text-secondary mb-4">
            ¿Listo para comenzar? Reúne a tu equipo, elige un eje y un camino de especialización.
          </p>
          <Link
            href="/#evaluacion"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-azure text-white text-sm font-medium hover:bg-azure/90 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Evaluación
          </Link>
        </div>
      </div>
    </main>
  );
}
