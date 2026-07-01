"use client";

import { useState } from "react";
import {
  Server,
  Globe,
  Boxes,
  Zap,
  Container,
  ChevronRight,
  Gauge,
  Wrench,
  CheckCircle2,
  X,
} from "lucide-react";

type ComputeOption = {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgColor: string;
  abstraction: number; // 0-100, left=more control, right=more managed
  description: string;
  idealFor: string[];
  gcpService: string;
  gcpDetail: string;
  awsEquivalent: string;
  awsDetail: string;
};

const options: ComputeOption[] = [
  {
    id: "vm",
    label: "Máquinas virtuales",
    icon: Server,
    color: "text-azure",
    borderColor: "border-azure/30",
    bgColor: "bg-azure/5",
    abstraction: 10,
    description:
      "Control total sobre el sistema operativo, CPU, memoria y disco. Ideal para migraciones, software heredado y configuraciones específicas.",
    idealFor: [
      "Migración de aplicaciones heredadas",
      "Software con dependencias específicas de SO",
      "Cargas con GPU o aceleradores",
      "Control detallado de red y seguridad",
    ],
    gcpService: "Compute Engine",
    gcpDetail:
      "VMs configurables con tipos predefinidos (e2, n2, c2) o personalizados. Soporta Linux, Windows, GPUs y discos persistentes SSD/HDD.",
    awsEquivalent: "EC2",
    awsDetail:
      "Amazon EC2 ofrece instancias virtuales con familias similares (t3, m5, c5). Mismo concepto: servidor virtual configurable.",
  },
  {
    id: "platform",
    label: "Plataforma administrada",
    icon: Globe,
    color: "text-green",
    borderColor: "border-green/30",
    bgColor: "bg-green/5",
    abstraction: 40,
    description:
      "Despliegas tu aplicación y la plataforma se encarga de la infraestructura: escalado, parches, balanceo. Menos control pero menos operación.",
    idealFor: [
      "Aplicaciones web estándar",
      "APIs que necesitan escalar automáticamente",
      "Equipos pequeños sin equipo de operaciones",
      "Prototipos rápidos con despliegue simple",
    ],
    gcpService: "App Engine",
    gcpDetail:
      "PaaS de Google Cloud. Soporta Python, Node.js, Java, Go, PHP, Ruby. Escala a cero y autoescala. Standard (sandbox) y Flexible (contenedores).",
    awsEquivalent: "Elastic Beanstalk",
    awsDetail:
      "AWS Elastic Beanstalk despliega apps automáticamente en EC2 con balanceo y escalado. Concepto similar a App Engine.",
  },
  {
    id: "containers",
    label: "Contenedores gestionados",
    icon: Boxes,
    color: "text-cyan",
    borderColor: "border-cyan/30",
    bgColor: "bg-cyan/5",
    abstraction: 55,
    description:
      "Orquestación de contenedores con Kubernetes. Control sobre la arquitectura de microservicios pero con clúster administrado por el proveedor.",
    idealFor: [
      "Arquitecturas de microservicios",
      "Equipos que ya usan Docker/Kubernetes",
      "Aplicaciones con muchos componentes independientes",
      "Portabilidad entre nubes",
    ],
    gcpService: "GKE (Google Kubernetes Engine)",
    gcpDetail:
      "Kubernetes administrado. Google mantiene el control plane; tú defines pods, servicios y deployments. Autopilot mode reduce aún más la gestión.",
    awsEquivalent: "EKS",
    awsDetail:
      "Amazon EKS es el equivalente: Kubernetes administrado con nodos EC2 o Fargate. Mismo concepto, distinto proveedor.",
  },
  {
    id: "serverless-container",
    label: "Contenedores serverless",
    icon: Container,
    color: "text-purple-500",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/5",
    abstraction: 75,
    description:
      "Ejecutas contenedores sin gestionar clústeres ni nodos. Solo empaquetas tu app en un contenedor y el proveedor la ejecuta bajo demanda.",
    idealFor: [
      "APIs y microservicios sin gestionar infraestructura",
      "Despliegue rápido desde un Dockerfile",
      "Cargas con tráfico variable (escala a cero)",
      "Desarrollo ágil con contenedores",
    ],
    gcpService: "Cloud Run",
    gcpDetail:
      "Ejecuta contenedores stateless sobre demanda. Escala a cero automáticamente. Pago por uso (CPU/memoria por solicitud). Basado en Knative.",
    awsEquivalent: "App Runner / Fargate",
    awsDetail:
      "AWS App Runner ejecuta contenedores sin clúster. Fargate ejecuta contenedores en ECS/EKS sin gestionar nodos. Similar a Cloud Run.",
  },
  {
    id: "functions",
    label: "Funciones por evento",
    icon: Zap,
    color: "text-orange",
    borderColor: "border-orange/30",
    bgColor: "bg-orange/5",
    abstraction: 95,
    description:
      "Código breve que se ejecuta cuando ocurre un evento: subida de archivo, mensaje en cola, solicitud HTTP. Sin servidor, sin contenedor visible.",
    idealFor: [
      "Procesamiento de archivos al subirlos",
      "Webhooks y respuestas a eventos",
      "Tareas breves y aisladas",
      "Automatización reactiva",
    ],
    gcpService: "Cloud Functions",
    gcpDetail:
      "FaaS de Google Cloud. Soporta Node.js, Python, Go, Java, .NET, Ruby, PHP. Se activa por HTTP, Pub/Sub, Cloud Storage, Firestore, etc.",
    awsEquivalent: "Lambda",
    awsDetail:
      "AWS Lambda es el equivalente directo. Funciones disparadas por eventos (S3, SQS, API Gateway, etc.). Misma lógica FaaS.",
  },
];

type Need = {
  id: string;
  label: string;
  matchesOptions: string[];
};

const needs: Need[] = [
  { id: "os-control", label: "Control total del sistema operativo", matchesOptions: ["vm"] },
  { id: "web-app", label: "Aplicación web administrada", matchesOptions: ["platform"] },
  { id: "microservices", label: "Microservicios con Kubernetes", matchesOptions: ["containers"] },
  { id: "container-no-cluster", label: "Contenedor sin gestionar clúster", matchesOptions: ["serverless-container"] },
  { id: "event-trigger", label: "Función disparada por evento", matchesOptions: ["functions"] },
  { id: "gpu", label: "GPU o aceleradores", matchesOptions: ["vm"] },
  { id: "scale-zero", label: "Escalar a cero automáticamente", matchesOptions: ["serverless-container", "functions"] },
  { id: "legacy", label: "Migración de software heredado", matchesOptions: ["vm"] },
];

type ViewMode = "concept" | "gcp" | "aws";

export function ComputeOptions() {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [selectedNeeds, setSelectedNeeds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>("concept");

  const active = options.find((o) => o.id === activeOption);

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Calculate which options match selected needs
  const matchedOptions = new Set<string>();
  selectedNeeds.forEach((needId) => {
    const need = needs.find((n) => n.id === needId);
    if (need) need.matchesOptions.forEach((o) => matchedOptions.add(o));
  });

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              ¿Dónde debería correr mi aplicación?
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Selecciona tus necesidades abajo y observa qué opción se ilumina. También puedes hacer clic en cada opción directamente.
          </p>
        </div>
        <div className="flex items-center bg-grey-light rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => setViewMode("concept")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "concept"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Concepto
          </button>
          <button
            onClick={() => setViewMode("gcp")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "gcp"
                ? "bg-white text-azure shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            GCP
          </button>
          <button
            onClick={() => setViewMode("aws")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "aws"
                ? "bg-white text-orange shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            AWS
          </button>
        </div>
      </div>

      {/* Abstraction bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[9px] text-text-secondary font-medium uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Wrench className="w-3 h-3" />
            Más control / más gestión
          </span>
          <span className="flex items-center gap-1">
            Más servicio administrado
            <Zap className="w-3 h-3" />
          </span>
        </div>
        <div className="relative h-2 bg-gradient-to-r from-azure/20 via-cyan/20 to-orange/20 rounded-full">
          {options.map((opt) => (
            <div
              key={opt.id}
              className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all ${
                activeOption === opt.id || matchedOptions.has(opt.id)
                  ? `${opt.borderColor} ${opt.bgColor} scale-125`
                  : "border-border bg-white"
              }`}
              style={{ left: `${opt.abstraction}%` }}
              title={opt.label}
            />
          ))}
        </div>
      </div>

      {/* Option cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = activeOption === opt.id;
          const isMatched = matchedOptions.has(opt.id) && selectedNeeds.size > 0;
          return (
            <button
              key={opt.id}
              onClick={() => setActiveOption(isActive ? null : opt.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all duration-200 ${
                isActive
                  ? `${opt.borderColor} ${opt.bgColor} shadow-sm scale-[1.03]`
                  : isMatched
                  ? `${opt.borderColor} ${opt.bgColor} ring-2 ring-green/30`
                  : "border-border hover:border-azure/20 hover:bg-panel/60"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive || isMatched ? opt.color : "text-text-secondary"
                }`}
              />
              <span
                className={`text-[10px] font-semibold text-center leading-tight transition-colors ${
                  isActive || isMatched ? "text-foreground" : "text-text-secondary"
                }`}
              >
                {viewMode === "gcp"
                  ? opt.gcpService
                  : viewMode === "aws"
                  ? opt.awsEquivalent
                  : opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Needs selector */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
          ¿Qué necesitas? (selecciona una o más)
        </p>
        <div className="flex flex-wrap gap-1.5">
          {needs.map((need) => {
            const isSelected = selectedNeeds.has(need.id);
            return (
              <button
                key={need.id}
                onClick={() => toggleNeed(need.id)}
                className={`px-2.5 py-1.5 rounded-md text-[10px] font-medium border transition-all ${
                  isSelected
                    ? "border-azure/40 bg-azure/10 text-azure"
                    : "border-border text-text-secondary hover:border-azure/20"
                }`}
              >
                {need.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      {active && (
        <div
          className={`rounded-lg border ${active.borderColor} ${active.bgColor} p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <active.icon className={`w-4 h-4 ${active.color}`} />
              <h4 className="text-sm font-semibold text-foreground">
                {viewMode === "gcp"
                  ? active.gcpService
                  : viewMode === "aws"
                  ? active.awsEquivalent
                  : active.label}
              </h4>
              {viewMode !== "concept" && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                    viewMode === "gcp"
                      ? "bg-azure/10 text-azure border border-azure/20"
                      : "bg-orange/10 text-orange border border-orange/20"
                  }`}
                >
                  {viewMode === "gcp" ? "Google Cloud" : "AWS"}
                </span>
              )}
            </div>
            <button
              onClick={() => setActiveOption(null)}
              className="text-text-secondary hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            {viewMode === "concept"
              ? active.description
              : viewMode === "gcp"
              ? active.gcpDetail
              : active.awsDetail}
          </p>

          {viewMode === "concept" && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium mb-1.5">
                Ideal para
              </p>
              <ul className="space-y-1">
                {active.idealFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-foreground">
                    <CheckCircle2 className={`w-3 h-3 ${active.color} shrink-0 mt-0.5`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!active && selectedNeeds.size === 0 && (
        <p className="text-[10px] text-text-secondary text-center italic py-1">
          ↑ Haz clic en una opción o selecciona necesidades para ver recomendaciones
        </p>
      )}
    </div>
  );
}
