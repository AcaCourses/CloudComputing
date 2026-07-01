"use client";

import { useState } from "react";
import {
  Layers,
  FolderOpen,
  Archive,
  Database,
  Clock,
  Share2,
  ArrowDown,
  ArrowRight,
  Shield,
  Cloud,
  HardDrive,
  RotateCcw,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type StorageLayer = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  activeBg: string;
  description: string;
  dataTypes: string;
  why: string;
  gcpNote: string;
  awsNote: string;
};

type LifecycleStage = {
  label: string;
  description: string;
  icon: React.ReactNode;
};

export function StorageArchitecture() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [showDataPath, setShowDataPath] = useState(false);

  const layers: StorageLayer[] = [
    {
      id: "frecuente",
      label: "Uso frecuente",
      icon: <FolderOpen className="w-4 h-4" />,
      color: "text-azure",
      activeBg: "bg-azure/10 border-azure/30",
      description: "Datos que se consultan y modifican constantemente. Necesitan acceso rápido y disponibilidad alta.",
      dataTypes: "Material de clase activo, documentos de trabajo, archivos en edición, configuraciones.",
      why: "Se accede múltiples veces al día. Requiere baja latencia y alta disponibilidad. Es la capa más cara pero la más ágil.",
      gcpNote: "Cloud Storage (Standard), Persistent Disks, Filestore para acceso compartido tipo NFS.",
      awsNote: "S3 Standard, EBS (discos de instancia), EFS para sistemas de archivos compartidos.",
    },
    {
      id: "compartido",
      label: "Contenido compartido",
      icon: <Share2 className="w-4 h-4" />,
      color: "text-cyan",
      activeBg: "bg-cyan/10 border-cyan/30",
      description: "Recursos que múltiples personas o servicios necesitan consultar. Acceso controlado por permisos.",
      dataTypes: "Lecturas del curso, plantillas, recursos multimedia del grupo, assets de aplicación.",
      why: "Se distribuye a muchos consumidores. Importa el control de acceso y la disponibilidad por URL o endpoint.",
      gcpNote: "Cloud Storage con IAM, buckets públicos o por dominio, integración con CDN (Cloud CDN).",
      awsNote: "S3 con políticas de bucket, CloudFront como CDN, presigned URLs para acceso temporal.",
    },
    {
      id: "aplicacion",
      label: "Datos de aplicación",
      icon: <Database className="w-4 h-4" />,
      color: "text-green",
      activeBg: "bg-green/10 border-green/30",
      description: "Información que una aplicación genera, consulta o actualiza programáticamente. Necesita integración con servicios de cómputo.",
      dataTypes: "Logs, registros de usuarios, datos transaccionales, uploads de usuarios, caché.",
      why: "Se accede por APIs, no manualmente. Requiere escalabilidad, consistencia y acceso programático rápido.",
      gcpNote: "Cloud Storage + Cloud SQL + Firestore + Memorystore según patrón de acceso.",
      awsNote: "S3 + RDS + DynamoDB + ElastiCache según tipo de carga y consistencia requerida.",
    },
    {
      id: "respaldo",
      label: "Respaldo y recuperación",
      icon: <Shield className="w-4 h-4" />,
      color: "text-orange",
      activeBg: "bg-orange/10 border-orange/30",
      description: "Copias de seguridad que protegen contra pérdida. Se consultan solo cuando algo falla o se necesita restaurar.",
      dataTypes: "Snapshots de VMs, copias de bases de datos, respaldos de proyectos, estados anteriores.",
      why: "Acceso infrecuente pero crítico. El costo es menor, pero la capacidad de recuperación debe ser confiable.",
      gcpNote: "Cloud Storage (Nearline/Coldline), snapshots de discos, backups automáticos de Cloud SQL.",
      awsNote: "S3 Glacier Instant Retrieval, AWS Backup, EBS Snapshots, RDS automated backups.",
    },
    {
      id: "historico",
      label: "Archivo histórico",
      icon: <Archive className="w-4 h-4" />,
      color: "text-purple-500",
      activeBg: "bg-purple-50 border-purple-200",
      description: "Datos que deben conservarse por tiempo prolongado pero casi nunca se consultan. Regulaciones, auditoría, investigación pasada.",
      dataTypes: "Archivos de investigación completada, registros legales, datos de ciclos anteriores, auditoría.",
      why: "Retención a largo plazo con costo mínimo. El tiempo de recuperación puede ser de horas — el dato casi nunca se lee.",
      gcpNote: "Cloud Storage (Archive class) — costo de almacenamiento mínimo, cargo por recuperación.",
      awsNote: "S3 Glacier Deep Archive — el más económico, recuperación en 12-48 horas.",
    },
  ];

  const lifecycleStages: LifecycleStage[] = [
    { label: "Archivo activo", description: "Se crea o sube, se usa constantemente", icon: <FolderOpen className="w-3.5 h-3.5" /> },
    { label: "Se comparte", description: "Otros acceden por permisos o URL", icon: <Share2 className="w-3.5 h-3.5" /> },
    { label: "Se respalda", description: "Se crea copia de protección", icon: <Shield className="w-3.5 h-3.5" /> },
    { label: "Se archiva", description: "Pasa a capa económica de retención", icon: <Archive className="w-3.5 h-3.5" /> },
    { label: "Se recupera", description: "Disponible si se necesita restaurar", icon: <RotateCcw className="w-3.5 h-3.5" /> },
  ];

  const activeLayer = layers.find((l) => l.id === selectedLayer);

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Capas de almacenamiento
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Haz clic en cada capa para explorar qué datos guarda, por qué está separada y cómo se implementa.
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

      {/* Layer stack */}
      <div className="space-y-1.5">
        {layers.map((layer, i) => (
          <div key={layer.id}>
            <button
              onClick={() => setSelectedLayer(selectedLayer === layer.id ? null : layer.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                selectedLayer === layer.id
                  ? layer.activeBg
                  : "border-border hover:border-azure/20"
              }`}
            >
              <div className={`shrink-0 ${selectedLayer === layer.id ? layer.color : "text-text-secondary"}`}>
                {layer.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${selectedLayer === layer.id ? layer.color : "text-foreground"}`}>
                  {layer.label}
                </p>
                <p className="text-[9px] text-text-secondary truncate">{layer.description}</p>
              </div>
              <div className="shrink-0">
                <div className={`w-2 h-2 rounded-full transition-all ${
                  selectedLayer === layer.id ? "bg-azure scale-125" : "bg-gray-300"
                }`} />
              </div>
            </button>

            {/* Expanded detail */}
            {selectedLayer === layer.id && activeLayer && (
              <div className="ml-4 mt-2 mb-2 rounded-lg border border-border bg-white/60 p-3.5 space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-text-secondary font-medium">Datos típicos</p>
                  <p className="text-[10px] text-foreground mt-0.5">{activeLayer.dataTypes}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-text-secondary font-medium">¿Por qué en esta capa?</p>
                  <p className="text-[10px] text-foreground mt-0.5">{activeLayer.why}</p>
                </div>
                {viewMode !== "concept" && (
                  <div className={`rounded-md border px-3 py-2 ${
                    viewMode === "gcp" ? "border-azure/20 bg-azure/5" : "border-orange/20 bg-orange/5"
                  }`}>
                    <p className={`text-[9px] font-semibold ${viewMode === "gcp" ? "text-azure" : "text-orange"}`}>
                      {viewMode === "gcp" ? "GCP" : "AWS"}
                    </p>
                    <p className="text-[9px] text-text-secondary mt-0.5">
                      {viewMode === "gcp" ? activeLayer.gcpNote : activeLayer.awsNote}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Arrow between layers */}
            {i < layers.length - 1 && (
              <div className="flex justify-center py-0.5">
                <ArrowDown className="w-3 h-3 text-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Data lifecycle path */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => setShowDataPath(!showDataPath)}
          className="flex items-center gap-2 text-xs font-medium text-azure hover:text-azure/80 transition-colors"
        >
          <Clock className="w-3.5 h-3.5" />
          {showDataPath ? "Ocultar ruta del dato" : "Ver ruta del dato a través de las capas"}
        </button>

        {showDataPath && (
          <div className="mt-3 flex items-center gap-1 overflow-x-auto pb-2">
            {lifecycleStages.map((stage, i) => (
              <div key={i} className="flex items-center gap-1 shrink-0">
                <div className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border border-border bg-white min-w-[95px]">
                  <div className="text-azure">{stage.icon}</div>
                  <p className="text-[9px] font-semibold text-foreground">{stage.label}</p>
                  <p className="text-[8px] text-text-secondary text-center">{stage.description}</p>
                </div>
                {i < lifecycleStages.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-azure/40 shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Principle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-red-200 bg-red-50/50 p-3 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-red-500" />
            <p className="text-[10px] font-semibold text-foreground">Sin arquitectura</p>
          </div>
          <p className="text-[9px] text-text-secondary">
            Todo en un solo lugar. Archivos activos mezclados con respaldos. Sin reglas de acceso ni ciclo de vida. Difícil de escalar y costoso.
          </p>
        </div>
        <div className="rounded-lg border border-green/20 bg-green/5 p-3 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5 text-green" />
            <p className="text-[10px] font-semibold text-foreground">Con arquitectura por capas</p>
          </div>
          <p className="text-[9px] text-text-secondary">
            Cada dato en su capa según uso y frecuencia. Costos optimizados. Acceso controlado. Respaldo automático. Fácil de mantener y crecer.
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Arquitectura de almacenamiento =</span> decidir dónde vive cada dato según quién lo usa, con qué frecuencia y por cuánto tiempo. No es un solo depósito — es un diseño por capas que optimiza costo, velocidad y protección.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">En GCP:</span> Cloud Storage con lifecycle rules mueve datos entre clases automáticamente. Object Lifecycle Management permite transicionar de Standard → Nearline → Coldline → Archive según antigüedad o acceso.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> S3 Lifecycle Policies automatizan transiciones entre clases (Standard → IA → Glacier). S3 Intelligent-Tiering mueve objetos automáticamente según patrones de acceso reales.
          </p>
        )}
      </div>
    </div>
  );
}
