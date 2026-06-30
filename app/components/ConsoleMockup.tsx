"use client";

import { useState } from "react";
import {
  Monitor,
  Search,
  FolderOpen,
  Server,
  HardDrive,
  Database,
  ShieldCheck,
  BarChart3,
  Bell,
  Settings,
  ChevronRight,
  Info,
  X,
  Globe,
} from "lucide-react";

type HotspotZone = {
  id: string;
  label: string;
  icon: React.ElementType;
  position: string;
  description: string;
  gcpEquivalent: string;
  awsEquivalent: string;
};

const zones: HotspotZone[] = [
  {
    id: "sidebar",
    label: "Menú de servicios",
    icon: Settings,
    position: "Lateral izquierdo",
    description:
      "Panel de navegación principal. Agrupa los servicios por categoría: cómputo, almacenamiento, red, bases de datos, seguridad, etc. Es tu mapa para encontrar cualquier servicio.",
    gcpEquivalent:
      "En Google Cloud: menú lateral (hamburger) con categorías desplegables: Compute Engine, Cloud Storage, IAM, BigQuery, etc. También puedes fijar servicios favoritos.",
    awsEquivalent:
      'En AWS: menú "Services" con dropdown de categorías, o barra de búsqueda superior para encontrar servicios por nombre.',
  },
  {
    id: "project",
    label: "Selector de proyecto",
    icon: FolderOpen,
    position: "Barra superior",
    description:
      "Permite cambiar entre proyectos o cuentas. Todo lo que ves en la consola se filtra por el contexto seleccionado aquí. Si no seleccionas el proyecto correcto, verás recursos de otro entorno.",
    gcpEquivalent:
      "En Google Cloud: selector de proyecto en la barra superior. Muestra el proyecto activo y permite cambiar rápidamente entre proyectos.",
    awsEquivalent:
      "En AWS: selector de región (esquina superior derecha) y selector de cuenta (si usas AWS Organizations con switch role).",
  },
  {
    id: "search",
    label: "Búsqueda global",
    icon: Search,
    position: "Barra superior",
    description:
      "Busca cualquier recurso, servicio o configuración por nombre. Es la forma más rápida de navegar cuando ya sabes qué buscas, sin recorrer menús.",
    gcpEquivalent:
      'En Google Cloud: barra de búsqueda superior. Busca servicios, recursos, configuración IAM y hasta documentación. Atajo: "/" para activarla.',
    awsEquivalent:
      'En AWS: barra de búsqueda "Search" en la parte superior. Busca servicios, recursos, documentación y features.',
  },
  {
    id: "resources",
    label: "Panel de recursos",
    icon: Server,
    position: "Área central",
    description:
      "La zona principal donde se listan, crean y configuran recursos. Muestra tablas con VMs, buckets, bases de datos, etc. Desde aquí lanzas formularios de creación.",
    gcpEquivalent:
      "En Google Cloud: el área central de cada servicio (ej: Compute Engine → VM instances, Cloud Storage → Buckets). Varía según el servicio.",
    awsEquivalent:
      "En AWS: el área central de cada servicio (ej: EC2 Dashboard, S3 buckets list). Varía según el servicio seleccionado.",
  },
  {
    id: "monitoring",
    label: "Métricas y monitoreo",
    icon: BarChart3,
    position: "Dashboard / Paneles",
    description:
      "Gráficas de uso, rendimiento y estado de tus recursos. Permite detectar problemas antes de que impacten: CPU alta, almacenamiento lleno, errores frecuentes.",
    gcpEquivalent:
      "En Google Cloud: Cloud Monitoring dashboards, métricas por servicio, y la pestaña Monitoring dentro de cada recurso (ej: VM → Monitoring).",
    awsEquivalent:
      "En AWS: CloudWatch dashboards, métricas por servicio, y la pestaña Monitoring dentro de cada recurso (ej: EC2 → Monitoring).",
  },
  {
    id: "notifications",
    label: "Notificaciones y alertas",
    icon: Bell,
    position: "Barra superior",
    description:
      "Avisos de la plataforma: actualizaciones, alertas de seguridad, cuotas próximas a alcanzarse, errores de facturación. Conviene revisarlas regularmente.",
    gcpEquivalent:
      "En Google Cloud: bell icon en la barra superior + Security Command Center para avisos de seguridad + Pub/Sub para alertas personalizadas.",
    awsEquivalent:
      "En AWS: bell icon en la barra superior + AWS Health Dashboard para avisos de servicio + SNS para alertas personalizadas.",
  },
];

type ViewMode = "concept" | "gcp" | "aws";

export function ConsoleMockup() {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [guidedStep, setGuidedStep] = useState<number | null>(null);

  const active = zones.find((z) => z.id === activeZone);

  const guidedTasks = [
    { target: "search", instruction: "Busca el servicio de almacenamiento" },
    { target: "sidebar", instruction: "Navega por el menú de servicios" },
    { target: "project", instruction: "Verifica en qué cuenta/proyecto estás" },
    { target: "resources", instruction: "Encuentra el panel de recursos" },
  ];

  const startGuided = () => {
    setGuidedStep(0);
    setActiveZone(null);
  };

  const handleZoneClick = (id: string) => {
    setActiveZone(activeZone === id ? null : id);
    if (guidedStep !== null && guidedTasks[guidedStep]?.target === id) {
      if (guidedStep < guidedTasks.length - 1) {
        setGuidedStep(guidedStep + 1);
      } else {
        setGuidedStep(null);
      }
    }
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Monitor className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Anatomía de una consola cloud
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Haz clic en cada zona para entender su función.{" "}
            <button
              onClick={startGuided}
              className="text-azure hover:underline font-medium"
            >
              Modo guiado →
            </button>
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

      {/* Guided mode banner */}
      {guidedStep !== null && (
        <div className="flex items-center gap-2 rounded-lg border border-azure/30 bg-azure/5 px-3 py-2 text-xs animate-in fade-in duration-200">
          <Info className="w-3.5 h-3.5 text-azure shrink-0" />
          <span className="text-azure font-medium flex-1">
            Paso {guidedStep + 1}/{guidedTasks.length}:{" "}
            {guidedTasks[guidedStep].instruction}
          </span>
          <button
            onClick={() => setGuidedStep(null)}
            className="text-text-secondary hover:text-foreground"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Console mockup */}
      <div className="rounded-lg border border-border overflow-hidden bg-white">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-panel border-b border-border">
          <Globe className="w-3.5 h-3.5 text-azure" />
          <span className="text-[10px] font-semibold text-foreground">
            {viewMode === "aws" ? "AWS Management Console" : viewMode === "gcp" ? "Google Cloud Console" : "Cloud Console"}
          </span>
          <div className="flex-1" />

          {/* Search hotspot */}
          <button
            onClick={() => handleZoneClick("search")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] transition-all ${
              activeZone === "search"
                ? "border-azure/40 bg-azure/10 text-azure shadow-sm"
                : guidedStep !== null && guidedTasks[guidedStep]?.target === "search"
                ? "border-azure/40 bg-azure/10 text-azure animate-pulse"
                : "border-border text-text-secondary hover:border-azure/20"
            }`}
          >
            <Search className="w-3 h-3" />
            <span>Buscar servicios...</span>
          </button>

          {/* Project selector hotspot */}
          <button
            onClick={() => handleZoneClick("project")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-medium transition-all ${
              activeZone === "project"
                ? "border-azure/40 bg-azure/10 text-azure shadow-sm"
                : guidedStep !== null && guidedTasks[guidedStep]?.target === "project"
                ? "border-azure/40 bg-azure/10 text-azure animate-pulse"
                : "border-border text-text-secondary hover:border-azure/20"
            }`}
          >
            <FolderOpen className="w-3 h-3" />
            {viewMode === "aws" ? "us-east-1" : viewMode === "gcp" ? "Mi Proyecto GCP" : "Mi Proyecto"}
          </button>

          {/* Notifications hotspot */}
          <button
            onClick={() => handleZoneClick("notifications")}
            className={`p-1 rounded-md border transition-all ${
              activeZone === "notifications"
                ? "border-azure/40 bg-azure/10 text-azure shadow-sm"
                : "border-transparent text-text-secondary hover:text-foreground"
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex min-h-[180px]">
          {/* Sidebar hotspot */}
          <div className="w-36 border-r border-border bg-panel/50 p-2 space-y-1">
            <button
              onClick={() => handleZoneClick("sidebar")}
              className={`w-full text-left rounded-md p-1.5 transition-all ${
                activeZone === "sidebar"
                  ? "bg-azure/10 ring-1 ring-azure/30"
                  : guidedStep !== null && guidedTasks[guidedStep]?.target === "sidebar"
                  ? "bg-azure/10 ring-1 ring-azure/30 animate-pulse"
                  : ""
              }`}
            >
              <p className="text-[9px] uppercase tracking-wider text-text-secondary font-medium mb-1">
                Servicios
              </p>
              {[
                { icon: Server, label: viewMode === "aws" ? "EC2" : viewMode === "gcp" ? "Compute Engine" : "Cómputo" },
                { icon: HardDrive, label: viewMode === "aws" ? "S3" : viewMode === "gcp" ? "Cloud Storage" : "Storage" },
                { icon: Database, label: viewMode === "aws" ? "RDS" : viewMode === "gcp" ? "Cloud SQL" : "Bases de datos" },
                { icon: ShieldCheck, label: viewMode === "aws" ? "IAM" : viewMode === "gcp" ? "IAM" : "Seguridad" },
                { icon: BarChart3, label: viewMode === "aws" ? "CloudWatch" : viewMode === "gcp" ? "Monitoring" : "Monitoreo" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-1.5 py-1 text-[10px] text-text-secondary hover:text-foreground cursor-default"
                >
                  <item.icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </div>
              ))}
            </button>
          </div>

          {/* Main panel hotspot */}
          <div className="flex-1 p-3">
            <button
              onClick={() => handleZoneClick("resources")}
              className={`w-full text-left rounded-lg p-3 border transition-all ${
                activeZone === "resources"
                  ? "border-azure/30 bg-azure/5 shadow-sm"
                  : guidedStep !== null && guidedTasks[guidedStep]?.target === "resources"
                  ? "border-azure/30 bg-azure/5 animate-pulse"
                  : "border-border/50 hover:border-azure/20"
              }`}
            >
              <p className="text-[10px] font-semibold text-foreground mb-2">
                {viewMode === "aws" ? "S3 Buckets" : viewMode === "gcp" ? "Cloud Storage Buckets" : "Recursos de almacenamiento"}
              </p>
              <div className="space-y-1.5">
                {[
                  { name: viewMode === "aws" ? "prod-assets-bucket" : viewMode === "gcp" ? "prod-assets-bucket" : "archivos-produccion", status: "Activo" },
                  { name: viewMode === "aws" ? "dev-logs-bucket" : viewMode === "gcp" ? "dev-logs-bucket" : "logs-desarrollo", status: "Activo" },
                  { name: viewMode === "aws" ? "backup-weekly" : viewMode === "gcp" ? "backup-weekly" : "respaldos-semanales", status: "Pausado" },
                ].map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center gap-2 text-[10px] text-text-secondary"
                  >
                    <HardDrive className="w-3 h-3" />
                    <span className="font-mono">{r.name}</span>
                    <span
                      className={`ml-auto px-1.5 py-0.5 rounded text-[9px] font-medium ${
                        r.status === "Activo"
                          ? "bg-green/10 text-green"
                          : "bg-grey-light text-text-secondary"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </button>

            {/* Monitoring sub-area */}
            <button
              onClick={() => handleZoneClick("monitoring")}
              className={`w-full text-left rounded-lg p-3 mt-2 border transition-all ${
                activeZone === "monitoring"
                  ? "border-azure/30 bg-azure/5 shadow-sm"
                  : "border-border/50 hover:border-azure/20"
              }`}
            >
              <p className="text-[10px] font-semibold text-foreground mb-1.5">
                {viewMode === "aws" ? "CloudWatch Metrics" : viewMode === "gcp" ? "Cloud Monitoring" : "Métricas"}
              </p>
              <div className="flex items-end gap-1 h-8">
                {[40, 55, 35, 70, 50, 65, 45, 60, 80, 55, 40, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-azure/30 rounded-t-sm transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {active && (
        <div className="rounded-lg border border-azure/20 bg-azure/5 p-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <active.icon className="w-4 h-4 text-azure" />
              <h4 className="text-sm font-semibold text-foreground">{active.label}</h4>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-azure/10 text-azure font-medium">
                {active.position}
              </span>
            </div>
            <button
              onClick={() => setActiveZone(null)}
              className="text-text-secondary hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            {viewMode === "concept" ? active.description : viewMode === "gcp" ? active.gcpEquivalent : active.awsEquivalent}
          </p>
        </div>
      )}

      {!active && guidedStep === null && (
        <p className="text-[10px] text-text-secondary italic text-center">
          ↑ Haz clic en cualquier zona de la consola para entender su función
        </p>
      )}
    </div>
  );
}
