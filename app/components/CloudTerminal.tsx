"use client";

import { useState } from "react";
import {
  Globe,
  Terminal,
  Shield,
  Package,
  HardDrive,
  ChevronRight,
  CheckCircle2,
  X,
  MonitorSmartphone,
  Laptop,
  Info,
  Wifi,
  Cloud,
} from "lucide-react";

type Feature = {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  gcpDetail: string;
  awsDetail: string;
};

const features: Feature[] = [
  {
    id: "auth",
    label: "Autenticación integrada",
    icon: Shield,
    description:
      "Al abrir la terminal cloud ya estás autenticado con tu cuenta. No necesitas configurar credenciales ni ejecutar login — el entorno reconoce tu identidad automáticamente.",
    gcpDetail:
      "Cloud Shell de Google hereda las credenciales de tu sesión en la Cloud Console. Las mismas políticas IAM del proyecto aplican automáticamente. Incluye gcloud auth ya configurado.",
    awsDetail:
      "AWS CloudShell hereda las credenciales de tu sesión en la Management Console. Las mismas políticas IAM aplican automáticamente.",
  },
  {
    id: "tools",
    label: "Herramientas preinstaladas",
    icon: Package,
    description:
      "La CLI del proveedor, editores de texto, Git, lenguajes como Python y Node.js, y utilidades de red ya están disponibles. No hay que instalar nada para empezar a trabajar.",
    gcpDetail:
      "Cloud Shell incluye gcloud CLI, Python 3, Node.js, Git, kubectl, Terraform, pip, vim, nano, Docker y más. Todo listo para operar desde el primer momento. Además incluye Cloud Shell Editor (basado en VS Code).",
    awsDetail:
      "CloudShell incluye AWS CLI v2, Python 3, Node.js, pip, git, jq, vim, nano y más. Todo listo para operar desde el primer momento.",
  },
  {
    id: "storage",
    label: "Almacenamiento persistente",
    icon: HardDrive,
    description:
      "Algunos entornos cloud ofrecen un directorio home persistente donde tus scripts, configuraciones y archivos se conservan entre sesiones. Ideal para laboratorios en progreso.",
    gcpDetail:
      "Cloud Shell ofrece 5 GB de almacenamiento persistente en $HOME. Los archivos sobreviven entre sesiones pero se eliminan tras 120 días de inactividad.",
    awsDetail:
      "CloudShell ofrece 1 GB de almacenamiento persistente en $HOME por región. Los archivos sobreviven entre sesiones pero se eliminan tras 120 días de inactividad.",
  },
  {
    id: "portable",
    label: "Acceso desde cualquier dispositivo",
    icon: MonitorSmartphone,
    description:
      "Solo necesitas un navegador. Puedes practicar desde la computadora del laboratorio, tu laptop o incluso una tablet. El entorno es el mismo sin importar el dispositivo.",
    gcpDetail:
      "Cloud Shell se abre directamente desde la Cloud Console (console.cloud.google.com) en cualquier navegador moderno. No requiere configuración local.",
    awsDetail:
      "CloudShell se abre directamente desde la Management Console en cualquier navegador moderno. No requiere configuración local.",
  },
];

type ViewMode = "concept" | "gcp" | "aws";

type ComparisonItem = {
  aspect: string;
  local: string;
  cloud: string;
  winner: "local" | "cloud" | "tie";
};

const comparisons: ComparisonItem[] = [
  {
    aspect: "Instalación",
    local: "Instalar CLI, lenguajes, Git manualmente",
    cloud: "Todo preinstalado y listo",
    winner: "cloud",
  },
  {
    aspect: "Autenticación",
    local: "Configurar credenciales y perfiles",
    cloud: "Automática desde la sesión web",
    winner: "cloud",
  },
  {
    aspect: "Portabilidad",
    local: "Solo en tu computadora",
    cloud: "Desde cualquier navegador",
    winner: "cloud",
  },
  {
    aspect: "Rendimiento",
    local: "Recursos completos de tu máquina",
    cloud: "Recursos limitados del entorno",
    winner: "local",
  },
  {
    aspect: "Personalización",
    local: "Control total del sistema",
    cloud: "Limitado al directorio home",
    winner: "local",
  },
  {
    aspect: "Trabajo sin internet",
    local: "Funciona offline (tareas locales)",
    cloud: "Requiere conexión permanente",
    winner: "local",
  },
];

export function CloudTerminal() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [showComparison, setShowComparison] = useState(false);

  const active = features.find((f) => f.id === activeFeature);

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-cyan" />
            <h3 className="text-sm font-semibold text-foreground">
              Terminal en la nube — Tu entorno desde el navegador
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Explora las características de un entorno de terminal cloud. Haz clic en cada feature.
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

      {/* Browser shell mockup */}
      <div className="rounded-lg border border-border overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-panel border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
          <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1 rounded bg-grey-light text-[10px] text-text-secondary">
            <Globe className="w-3 h-3" />
            <span>
              {viewMode === "aws"
                ? "console.aws.amazon.com/cloudshell"
                : viewMode === "gcp"
                ? "console.cloud.google.com/cloudshell"
                : "console.cloud.provider/terminal"}
            </span>
          </div>
          {viewMode === "aws" && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange/10 text-orange border border-orange/20 font-medium">
              CloudShell
            </span>
          )}
          {viewMode === "gcp" && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-azure/10 text-azure border border-azure/20 font-medium">
              Cloud Shell
            </span>
          )}
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-3 px-3 py-2 bg-gray-900 border-b border-gray-700">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-green-400 font-medium">Conectado</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-gray-400">
            <Shield className="w-3 h-3" />
            <span>Autenticado</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-gray-400">
            <Cloud className="w-3 h-3" />
            <span>{viewMode === "aws" ? "us-east-1" : viewMode === "gcp" ? "mi-proyecto-clase" : "Proyecto activo"}</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-gray-400 ml-auto">
            <Wifi className="w-3 h-3" />
            <span>browser session</span>
          </div>
        </div>

        {/* Terminal content */}
        <div className="bg-gray-900 p-4 font-mono text-xs space-y-1.5">
          <div className="text-gray-500">
            # Entorno listo. Herramientas disponibles:
          </div>
          <div className="flex items-center gap-2">
            <span className={viewMode === "aws" ? "text-orange" : viewMode === "gcp" ? "text-cyan" : "text-cyan"}>$</span>
            <span className="text-gray-200">
              {viewMode === "aws" ? "aws --version" : viewMode === "gcp" ? "gcloud --version" : "cloud --version"}
            </span>
          </div>
          <div className="text-gray-400 pl-4">
            {viewMode === "aws"
              ? "aws-cli/2.17.0 Python/3.11.6 Linux/5.10.0"
              : viewMode === "gcp"
              ? "Google Cloud SDK 480.0.0\ngcloud CLI 2024.06.28"
              : "Cloud CLI 480.0.0"}
          </div>
          <div className="flex items-center gap-2">
            <span className={viewMode === "aws" ? "text-orange" : "text-cyan"}>$</span>
            <span className="text-gray-200">python3 --version</span>
          </div>
          <div className="text-gray-400 pl-4">Python 3.11.6</div>
          <div className="flex items-center gap-2">
            <span className={viewMode === "aws" ? "text-orange" : "text-cyan"}>$</span>
            <span className="text-gray-200">git --version</span>
          </div>
          <div className="text-gray-400 pl-4">git version 2.43.0</div>
          <div className="flex items-center gap-2">
            <span className={viewMode === "aws" ? "text-orange" : "text-cyan"}>$</span>
            <span className="w-2 h-4 bg-gray-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Feature hotspots */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {features.map((feat) => {
          const Icon = feat.icon;
          const isActive = activeFeature === feat.id;
          return (
            <button
              key={feat.id}
              onClick={() => setActiveFeature(isActive ? null : feat.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all duration-200 ${
                isActive
                  ? "border-cyan/30 bg-cyan/5 shadow-sm scale-[1.03]"
                  : "border-border hover:border-cyan/20 hover:bg-panel/60"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isActive ? "text-cyan" : "text-text-secondary"
                }`}
              />
              <span
                className={`text-[10px] font-semibold text-center transition-colors ${
                  isActive ? "text-foreground" : "text-text-secondary"
                }`}
              >
                {feat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feature detail */}
      {active && (
        <div className="rounded-lg border border-cyan/20 bg-cyan/5 p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <active.icon className="w-4 h-4 text-cyan" />
              <h4 className="text-sm font-semibold text-foreground">{active.label}</h4>
            </div>
            <button
              onClick={() => setActiveFeature(null)}
              className="text-text-secondary hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            {viewMode === "concept" ? active.description : viewMode === "gcp" ? active.gcpDetail : active.awsDetail}
          </p>
        </div>
      )}

      {/* Comparison toggle */}
      <div className="border-t border-border pt-3">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center gap-2 text-xs text-text-secondary hover:text-foreground transition-colors"
        >
          <ChevronRight
            className={`w-3.5 h-3.5 transition-transform ${showComparison ? "rotate-90" : ""}`}
          />
          <Laptop className="w-3.5 h-3.5" />
          <span className="font-medium">Terminal local vs. Terminal cloud</span>
        </button>

        {showComparison && (
          <div className="mt-3 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {comparisons.map((c, i) => (
              <div
                key={i}
                className="grid grid-cols-[100px_1fr_1fr] gap-2 text-[10px] items-start"
              >
                <span className="font-semibold text-foreground py-1">{c.aspect}</span>
                <div
                  className={`rounded px-2 py-1 border ${
                    c.winner === "local"
                      ? "border-green/30 bg-green/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <Laptop className="w-2.5 h-2.5 text-text-secondary" />
                    <span className="font-medium text-text-secondary">Local</span>
                    {c.winner === "local" && (
                      <CheckCircle2 className="w-2.5 h-2.5 text-green ml-auto" />
                    )}
                  </div>
                  <span className="text-text-secondary">{c.local}</span>
                </div>
                <div
                  className={`rounded px-2 py-1 border ${
                    c.winner === "cloud"
                      ? "border-cyan/30 bg-cyan/5"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <Cloud className="w-2.5 h-2.5 text-text-secondary" />
                    <span className="font-medium text-text-secondary">Cloud</span>
                    {c.winner === "cloud" && (
                      <CheckCircle2 className="w-2.5 h-2.5 text-cyan ml-auto" />
                    )}
                  </div>
                  <span className="text-text-secondary">{c.cloud}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-[10px] text-text-secondary italic text-center">
        💡 La terminal cloud no reemplaza a la local — la complementa. Ideal para empezar rápido y para laboratorios donde todos necesitan el mismo entorno.
      </p>
    </div>
  );
}
