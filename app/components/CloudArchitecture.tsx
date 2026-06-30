"use client";

import { useState } from "react";
import {
  Server,
  HardDrive,
  Network,
  ShieldCheck,
  Database,
  ChevronRight,
  Layers,
} from "lucide-react";

type Layer = {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
  gcpServices: { name: string; desc: string }[];
  awsServices: { name: string; desc: string }[];
};

const layers: Layer[] = [
  {
    id: "compute",
    label: "Cómputo",
    icon: Server,
    color: "text-azure",
    borderColor: "border-azure/30",
    bgColor: "bg-azure/5",
    description:
      "Recursos que ejecutan código: máquinas virtuales, contenedores y funciones serverless. Es el 'cerebro' de tu arquitectura.",
    gcpServices: [
      { name: "Compute Engine", desc: "Máquinas virtuales con control total del SO" },
      { name: "Cloud Functions", desc: "Funciones que se ejecutan por evento, sin servidor" },
      { name: "GKE", desc: "Orquestación de contenedores con Kubernetes administrado" },
      { name: "Cloud Run", desc: "Contenedores sin gestionar servidores" },
    ],
    awsServices: [
      { name: "EC2", desc: "Máquinas virtuales con control total del SO" },
      { name: "Lambda", desc: "Funciones que se ejecutan por evento, sin servidor" },
      { name: "ECS / EKS", desc: "Orquestación de contenedores Docker / Kubernetes" },
      { name: "Fargate", desc: "Contenedores sin gestionar servidores" },
    ],
  },
  {
    id: "storage",
    label: "Almacenamiento",
    icon: HardDrive,
    color: "text-green",
    borderColor: "border-green/30",
    bgColor: "bg-green/5",
    description:
      "Donde persisten tus datos: objetos (archivos), bloques (discos) y sistemas de archivos compartidos.",
    gcpServices: [
      { name: "Cloud Storage", desc: "Almacenamiento de objetos (archivos, imágenes, backups)" },
      { name: "Persistent Disk", desc: "Discos de bloque adjuntos a VMs de Compute Engine" },
      { name: "Filestore", desc: "Sistema de archivos compartido tipo NFS" },
      { name: "Archive Storage", desc: "Archivado de datos a largo plazo, bajo costo" },
    ],
    awsServices: [
      { name: "S3", desc: "Almacenamiento de objetos (archivos, imágenes, backups)" },
      { name: "EBS", desc: "Discos de bloque adjuntos a instancias EC2" },
      { name: "EFS", desc: "Sistema de archivos compartido tipo NFS" },
      { name: "S3 Glacier", desc: "Archivado de datos a largo plazo, bajo costo" },
    ],
  },
  {
    id: "network",
    label: "Red",
    icon: Network,
    color: "text-cyan",
    borderColor: "border-cyan/30",
    bgColor: "bg-cyan/5",
    description:
      "La conectividad: redes virtuales privadas, balanceadores de carga, DNS y protección perimetral.",
    gcpServices: [
      { name: "VPC", desc: "Red virtual privada aislada en la nube" },
      { name: "Cloud Load Balancing", desc: "Balanceador de carga (HTTP(S), TCP/UDP)" },
      { name: "Cloud DNS", desc: "Servicio DNS y registro de dominios" },
      { name: "Cloud CDN", desc: "CDN para entregar contenido con baja latencia" },
    ],
    awsServices: [
      { name: "VPC", desc: "Red virtual privada aislada en la nube" },
      { name: "ELB", desc: "Balanceador de carga (ALB, NLB, CLB)" },
      { name: "Route 53", desc: "Servicio DNS y registro de dominios" },
      { name: "CloudFront", desc: "CDN para entregar contenido con baja latencia" },
    ],
  },
  {
    id: "identity",
    label: "Identidad y seguridad",
    icon: ShieldCheck,
    color: "text-orange",
    borderColor: "border-orange/30",
    bgColor: "bg-orange/5",
    description:
      "Controla quién accede a qué: usuarios, roles, políticas y organización.",
    gcpServices: [
      { name: "IAM", desc: "Usuarios, cuentas de servicio, roles y políticas de acceso" },
      { name: "Organization Policy", desc: "Gobierno y restricciones a nivel organización" },
      { name: "Cloud KMS", desc: "Gestión de claves de cifrado" },
      { name: "Cloud Audit Logs", desc: "Auditoría de todas las acciones en el proyecto" },
    ],
    awsServices: [
      { name: "IAM", desc: "Usuarios, grupos, roles y políticas de acceso" },
      { name: "Organizations", desc: "Gestión centralizada de múltiples cuentas" },
      { name: "KMS", desc: "Gestión de claves de cifrado" },
      { name: "CloudTrail", desc: "Auditoría de todas las acciones en la cuenta" },
    ],
  },
  {
    id: "database",
    label: "Bases de datos",
    icon: Database,
    color: "text-purple-500",
    borderColor: "border-purple-500/30",
    bgColor: "bg-purple-500/5",
    description:
      "Motores de bases de datos administrados: relacionales, NoSQL, caché en memoria.",
    gcpServices: [
      { name: "Cloud SQL", desc: "Bases de datos relacionales (MySQL, PostgreSQL, SQL Server)" },
      { name: "Firestore", desc: "Base de datos NoSQL de documentos, serverless" },
      { name: "Memorystore", desc: "Caché en memoria (Redis, Memcached)" },
      { name: "AlloyDB", desc: "BD relacional compatible con PostgreSQL, alto rendimiento" },
    ],
    awsServices: [
      { name: "RDS", desc: "Bases de datos relacionales (MySQL, PostgreSQL, etc.)" },
      { name: "DynamoDB", desc: "Base de datos NoSQL clave-valor, serverless" },
      { name: "ElastiCache", desc: "Caché en memoria (Redis, Memcached)" },
      { name: "Aurora", desc: "BD relacional compatible con MySQL/PostgreSQL, alto rendimiento" },
    ],
  },
];

type ViewMode = "concept" | "gcp" | "aws";

export function CloudArchitecture() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("concept");

  const active = layers.find((l) => l.id === activeLayer);

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Arquitectura cloud — Capas de servicio
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Haz clic en cada capa para explorar su función y los servicios correspondientes.
          </p>
        </div>
        {/* Mode toggle */}
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

      {/* Layer blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {layers.map((layer) => {
          const Icon = layer.icon;
          const isActive = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(isActive ? null : layer.id)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                isActive
                  ? `${layer.borderColor} ${layer.bgColor} shadow-sm scale-[1.03]`
                  : "border-border hover:border-azure/20 hover:bg-panel/60"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-colors ${isActive ? layer.color : "text-text-secondary"}`}
              />
              <span
                className={`text-[10px] font-semibold text-center transition-colors ${
                  isActive ? "text-foreground" : "text-text-secondary"
                }`}
              >
                {layer.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail panel */}
      {active && (
        <div
          className={`rounded-lg border ${active.borderColor} ${active.bgColor} p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200`}
        >
          <div className="flex items-center gap-2">
            <active.icon className={`w-4 h-4 ${active.color}`} />
            <h4 className="text-sm font-semibold text-foreground">{active.label}</h4>
          </div>

          {viewMode === "concept" ? (
            <p className="text-xs text-text-secondary leading-relaxed">
              {active.description}
            </p>
          ) : (
            <div className="space-y-1.5">
              {(viewMode === "gcp" ? active.gcpServices : active.awsServices).map((svc) => (
                <div
                  key={svc.name}
                  className="flex items-start gap-2 text-xs"
                >
                  <ChevronRight className={`w-3 h-3 ${viewMode === "gcp" ? "text-azure" : "text-orange"} shrink-0 mt-0.5`} />
                  <span>
                    <span className={`font-semibold ${viewMode === "gcp" ? "text-azure" : "text-orange"}`}>{svc.name}</span>
                    <span className="text-text-secondary"> — {svc.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {!active && (
        <p className="text-[10px] text-text-secondary text-center py-2 italic">
          ↑ Selecciona una capa para ver los detalles
        </p>
      )}
    </div>
  );
}
