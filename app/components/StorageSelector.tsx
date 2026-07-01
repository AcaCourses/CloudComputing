"use client";

import { useState } from "react";
import {
  HardDrive,
  FileText,
  Image,
  Database,
  Archive,
  Share2,
  ArrowRight,
  Cloud,
  Upload,
  Users,
  Shield,
  RotateCcw,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type StorageNeed = {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  why: string;
  gcpNote: string;
  awsNote: string;
  characteristics: string[];
};

type LifecycleStep = {
  label: string;
  description: string;
  icon: React.ReactNode;
};

export function StorageSelector() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
  const [showLifecycle, setShowLifecycle] = useState(false);

  const needs: StorageNeed[] = [
    {
      id: "documentos",
      label: "Documentos",
      icon: <FileText className="w-4 h-4" />,
      description: "Archivos de texto, presentaciones, hojas de cálculo que necesitan acceso compartido y edición colaborativa.",
      why: "Necesitas acceso desde cualquier dispositivo, compartir con otros y no depender de un solo equipo. El almacenamiento cloud permite editar, versionar y recuperar documentos sin preocuparte por respaldos manuales.",
      gcpNote: "Google Drive + Cloud Storage para archivos de equipo. Versionado automático y control de acceso por usuario.",
      awsNote: "Amazon S3 + WorkDocs para documentos compartidos. Versionado de objetos y políticas de acceso IAM.",
      characteristics: ["Acceso desde múltiples dispositivos", "Colaboración en tiempo real", "Versionado automático", "Control de permisos"],
    },
    {
      id: "imagenes",
      label: "Imágenes",
      icon: <Image className="w-4 h-4" />,
      description: "Fotos, capturas, evidencias visuales que ocupan espacio y se consultan frecuentemente.",
      why: "Las imágenes son archivos pesados que se generan en grandes cantidades. Almacenarlas en la nube permite acceder sin saturar el dispositivo local, compartir por URL y procesarlas (thumbnails, análisis) de forma automática.",
      gcpNote: "Cloud Storage (Standard) para imágenes de acceso frecuente. Integración con Vision AI para análisis automático.",
      awsNote: "Amazon S3 Standard para imágenes activas. Integración con Rekognition para análisis de contenido visual.",
      characteristics: ["Alta capacidad sin límite fijo", "Acceso por URL directa", "Procesamiento automático posible", "Sin saturar dispositivo local"],
    },
    {
      id: "respaldos",
      label: "Respaldos",
      icon: <Archive className="w-4 h-4" />,
      description: "Copias de seguridad de proyectos, tareas o configuraciones que necesitas preservar pero no consultas diariamente.",
      why: "Los respaldos protegen contra pérdida de datos. En la nube, puedes almacenarlos en clases económicas diseñadas para datos que rara vez se consultan pero deben estar disponibles si los necesitas.",
      gcpNote: "Cloud Storage (Nearline/Coldline/Archive) según frecuencia de acceso. Menor costo para datos poco consultados.",
      awsNote: "S3 Glacier / Glacier Deep Archive para respaldos a largo plazo. Costo mínimo con tiempos de recuperación variables.",
      characteristics: ["Protección contra pérdida de datos", "Costo reducido para acceso infrecuente", "Recuperación cuando sea necesario", "Retención a largo plazo"],
    },
    {
      id: "aplicacion",
      label: "Archivos de aplicación",
      icon: <Database className="w-4 h-4" />,
      description: "Datos que una aplicación genera, consulta o actualiza constantemente — logs, configuraciones, assets dinámicos.",
      why: "Las aplicaciones necesitan almacenamiento rápido, confiable y escalable. No es lo mismo que guardar archivos personales: aquí importa la velocidad, la disponibilidad y la integración con el sistema que consume los datos.",
      gcpNote: "Cloud Storage + Persistent Disks + Filestore según el patrón de acceso de la aplicación.",
      awsNote: "S3 + EBS + EFS según el tipo de workload y patrón de lectura/escritura de la aplicación.",
      characteristics: ["Alta disponibilidad requerida", "Acceso programático (APIs)", "Escalabilidad automática", "Integración con servicios de cómputo"],
    },
    {
      id: "compartido",
      label: "Material compartido",
      icon: <Share2 className="w-4 h-4" />,
      description: "Archivos del curso, lecturas, plantillas y recursos que todo el grupo necesita consultar.",
      why: "Compartir material desde la nube evita enviar archivos pesados por correo, permite actualizaciones en tiempo real y garantiza que todos acceden a la versión más reciente sin confusiones de versiones.",
      gcpNote: "Cloud Storage con acceso público o por dominio. Ideal combinado con IAM para control de quién accede.",
      awsNote: "S3 con políticas de bucket para acceso compartido. CloudFront como CDN para distribución rápida.",
      characteristics: ["Un solo enlace para todos", "Siempre la versión actual", "Sin límites de destinatarios", "Actualizable sin reenviar"],
    },
  ];

  const lifecycleSteps: LifecycleStep[] = [
    { label: "Local", description: "El archivo existe solo en tu dispositivo", icon: <HardDrive className="w-4 h-4" /> },
    { label: "Nube", description: "Se sube a almacenamiento remoto", icon: <Upload className="w-4 h-4" /> },
    { label: "Compartido", description: "Otros pueden acceder por URL o permisos", icon: <Users className="w-4 h-4" /> },
    { label: "Respaldado", description: "Copia protegida contra pérdida", icon: <Shield className="w-4 h-4" /> },
    { label: "Recuperado", description: "Disponible incluso si el original se pierde", icon: <RotateCcw className="w-4 h-4" /> },
  ];

  const activeNeed = needs.find((n) => n.id === selectedNeed);

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cloud className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              ¿Qué necesitas guardar?
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Selecciona un tipo de dato para ver por qué el almacenamiento cloud tiene sentido para ese caso.
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

      {/* Need selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {needs.map((n) => (
          <button
            key={n.id}
            onClick={() => setSelectedNeed(n.id)}
            className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border transition-all text-center ${
              selectedNeed === n.id
                ? "bg-azure/10 border-azure/30"
                : "border-border hover:border-azure/20"
            }`}
          >
            <div className={`${selectedNeed === n.id ? "text-azure" : "text-text-secondary"}`}>
              {n.icon}
            </div>
            <p className={`text-[10px] font-semibold ${selectedNeed === n.id ? "text-azure" : "text-foreground"}`}>
              {n.label}
            </p>
          </button>
        ))}
      </div>

      {/* Selected need detail */}
      {activeNeed && (
        <div className="rounded-lg border border-azure/20 bg-azure/5 p-4 space-y-3 animate-in fade-in duration-300">
          <div className="flex items-center gap-2">
            <div className="text-azure">{activeNeed.icon}</div>
            <h4 className="text-xs font-semibold text-foreground">{activeNeed.label}</h4>
          </div>
          <p className="text-[11px] text-text-secondary">{activeNeed.description}</p>
          <div className="rounded-md bg-white/60 border border-border p-3">
            <p className="text-[10px] font-medium text-foreground mb-1">¿Por qué en la nube?</p>
            <p className="text-[10px] text-text-secondary">{activeNeed.why}</p>
          </div>

          {/* Provider note */}
          {viewMode !== "concept" && (
            <div className={`rounded-md border px-3 py-2 ${
              viewMode === "gcp" ? "border-azure/20 bg-azure/5" : "border-orange/20 bg-orange/5"
            }`}>
              <p className={`text-[10px] font-medium ${viewMode === "gcp" ? "text-azure" : "text-orange"}`}>
                {viewMode === "gcp" ? "En Google Cloud:" : "En AWS:"}
              </p>
              <p className="text-[10px] text-text-secondary mt-0.5">
                {viewMode === "gcp" ? activeNeed.gcpNote : activeNeed.awsNote}
              </p>
            </div>
          )}

          {/* Characteristics */}
          <div className="flex flex-wrap gap-1.5">
            {activeNeed.characteristics.map((c, i) => (
              <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-full bg-azure/10 text-[9px] font-medium text-azure">
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lifecycle toggle */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => setShowLifecycle(!showLifecycle)}
          className="flex items-center gap-2 text-xs font-medium text-azure hover:text-azure/80 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {showLifecycle ? "Ocultar ciclo de vida" : "Ver ciclo de vida del archivo"}
        </button>

        {showLifecycle && (
          <div className="mt-3 flex items-center gap-1 overflow-x-auto pb-2">
            {lifecycleSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-1 shrink-0">
                <div className="flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border border-border bg-white min-w-[90px]">
                  <div className="text-azure">{step.icon}</div>
                  <p className="text-[9px] font-semibold text-foreground">{step.label}</p>
                  <p className="text-[8px] text-text-secondary text-center">{step.description}</p>
                </div>
                {i < lifecycleSteps.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-azure/40 shrink-0" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Almacenar en la nube</span> no es solo &ldquo;subir archivos&rdquo; — implica decidir quién accede, con qué frecuencia, si necesita respaldo y cómo se recupera. El tipo de dato determina la estrategia.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">En GCP:</span> Cloud Storage es el servicio principal de objetos. Se complementa con Persistent Disks (VMs), Filestore (NFS) y clases de almacenamiento (Standard, Nearline, Coldline, Archive) según frecuencia de acceso.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> Amazon S3 es el servicio base de almacenamiento de objetos. Clases como S3 Standard, Intelligent-Tiering, Glacier y EBS/EFS complementan según el caso de uso.
          </p>
        )}
      </div>
    </div>
  );
}
