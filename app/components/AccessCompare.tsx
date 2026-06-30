"use client";

import { useState } from "react";
import {
  Monitor,
  Terminal,
  Code2,
  ChevronRight,
  Zap,
  Users,
  Target,
  CheckCircle2,
} from "lucide-react";

type AccessMethod = {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgColor: string;
  user: string;
  purpose: string;
  advantages: string[];
  conceptExample: string;
  gcpName: string;
  gcpExample: string;
  awsName: string;
  awsExample: string;
};

const methods: AccessMethod[] = [
  {
    id: "console",
    label: "Consola web",
    icon: Monitor,
    color: "text-azure",
    borderColor: "border-azure/30",
    bgColor: "bg-azure/5",
    user: "Administradores, estudiantes, cualquier usuario explorando servicios",
    purpose:
      "Interfaz gráfica para crear, ver y administrar recursos de forma visual. Ideal para explorar, prototipar y entender la estructura de servicios.",
    advantages: [
      "No requiere conocimientos de programación",
      "Vista panorámica de todos los recursos",
      "Formularios guiados para crear servicios",
      "Ideal para aprender y explorar",
    ],
    conceptExample:
      'Crear un bucket de almacenamiento: abrir la sección de Storage → clic en "Crear" → llenar nombre y región → confirmar.',
    gcpName: "Cloud Console",
    gcpExample:
      "Entras a console.cloud.google.com → Cloud Storage → Crear bucket → defines nombre, ubicación y clase → Crear.",
    awsName: "AWS Management Console",
    awsExample:
      "Entras a console.aws.amazon.com → S3 → Create bucket → defines nombre, región y permisos → Create.",
  },
  {
    id: "cli",
    label: "Línea de comandos",
    icon: Terminal,
    color: "text-green",
    borderColor: "border-green/30",
    bgColor: "bg-green/5",
    user: "DevOps, administradores de sistemas, desarrolladores avanzados",
    purpose:
      "Ejecutar acciones cloud desde la terminal con comandos concisos. Permite scriptear tareas repetitivas, combinar con pipelines y versionar configuraciones.",
    advantages: [
      "Acciones rápidas y repetibles",
      "Fácil de integrar en scripts y CI/CD",
      "Preciso: cada comando hace exactamente una cosa",
      "Se puede versionar en Git",
    ],
    conceptExample:
      "Crear un bucket: ejecutar un comando como create-bucket --name mi-bucket --location us-east en la terminal.",
    gcpName: "gcloud CLI",
    gcpExample:
      "gcloud storage buckets create gs://mi-bucket-clase --location=us-east1\n\nUna línea. El bucket se crea al instante. Puedes ponerlo en un script .sh para repetirlo.",
    awsName: "AWS CLI",
    awsExample:
      "aws s3 mb s3://mi-bucket-clase --region us-east-1\n\nUna línea. El bucket se crea al instante. Puedes ponerlo en un script .sh para repetirlo.",
  },
  {
    id: "api",
    label: "APIs / SDKs",
    icon: Code2,
    color: "text-orange",
    borderColor: "border-orange/30",
    bgColor: "bg-orange/5",
    user: "Desarrolladores, sistemas automatizados, aplicaciones que consumen servicios cloud",
    purpose:
      "Integración programática: tus aplicaciones hablan directamente con la plataforma cloud mediante solicitudes HTTP estructuradas o librerías de lenguaje (SDKs).",
    advantages: [
      "Automatización completa desde código",
      "Integración con apps, bots, pipelines",
      "Disponible en múltiples lenguajes (Python, Node, Java...)",
      "Base de la infraestructura como código",
    ],
    conceptExample:
      'Crear un bucket desde Python: llamar al método create_bucket() del SDK, pasando nombre y configuración como parámetros del objeto.',
    gcpName: "Google Cloud Client Libraries",
    gcpExample:
      'from google.cloud import storage\nclient = storage.Client()\nbucket = client.create_bucket("mi-bucket-clase")\n\nDesde Python con google-cloud-storage. La misma acción, ahora dentro de tu aplicación.',
    awsName: "AWS SDKs / REST APIs",
    awsExample:
      'import boto3\ns3 = boto3.client("s3")\ns3.create_bucket(Bucket="mi-bucket-clase")\n\nDesde Python con boto3. La misma acción, ahora dentro de tu aplicación.',
  },
];

type ViewMode = "concept" | "gcp" | "aws";

export function AccessCompare() {
  const [activeMethod, setActiveMethod] = useState<string>("console");
  const [viewMode, setViewMode] = useState<ViewMode>("concept");

  const active = methods.find((m) => m.id === activeMethod)!;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Una acción, tres interfaces
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            La misma tarea —crear un bucket de almacenamiento— varía según la interfaz. Explora cada una.
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

      {/* Method selector tabs */}
      <div className="flex gap-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const isActive = activeMethod === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setActiveMethod(method.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border transition-all duration-200 ${
                isActive
                  ? `${method.borderColor} ${method.bgColor} shadow-sm`
                  : "border-border hover:border-azure/20 hover:bg-panel/60"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${isActive ? method.color : "text-text-secondary"}`}
              />
              <span
                className={`text-xs font-semibold ${
                  isActive ? "text-foreground" : "text-text-secondary"
                }`}
              >
                {method.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detail card */}
      <div
        className={`rounded-lg border ${active.borderColor} ${active.bgColor} p-4 space-y-4 animate-in fade-in duration-200`}
      >
        {viewMode === "concept" ? (
          <>
            {/* Who uses it */}
            <div className="flex items-start gap-2">
              <Users className="w-3.5 h-3.5 text-text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium mb-0.5">
                  ¿Quién la usa?
                </p>
                <p className="text-xs text-foreground">{active.user}</p>
              </div>
            </div>

            {/* Purpose */}
            <div className="flex items-start gap-2">
              <Target className="w-3.5 h-3.5 text-text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium mb-0.5">
                  ¿Para qué sirve?
                </p>
                <p className="text-xs text-foreground leading-relaxed">{active.purpose}</p>
              </div>
            </div>

            {/* Advantages */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium mb-1.5">
                Ventajas
              </p>
              <ul className="space-y-1">
                {active.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-foreground">
                    <CheckCircle2 className={`w-3 h-3 ${active.color} shrink-0 mt-0.5`} />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Example */}
            <div className="rounded-md border border-border/50 bg-white/50 p-3">
              <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium mb-1">
                Ejemplo: crear un bucket
              </p>
              <p className="text-xs text-foreground leading-relaxed">
                {active.conceptExample}
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Provider view */}
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold ${viewMode === "gcp" ? "text-azure" : "text-orange"}`}>
                {viewMode === "gcp" ? active.gcpName : active.awsName}
              </span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                viewMode === "gcp"
                  ? "bg-azure/10 text-azure border border-azure/20"
                  : "bg-orange/10 text-orange border border-orange/20"
              }`}>
                {active.id === "console"
                  ? "Console"
                  : active.id === "cli"
                  ? "CLI"
                  : "SDK/API"}
              </span>
            </div>

            <div className={`rounded-md border bg-white/60 p-3 ${
              viewMode === "gcp" ? "border-azure/20" : "border-orange/20"
            }`}>
              <pre className="text-xs text-foreground whitespace-pre-wrap font-mono leading-relaxed">
                {viewMode === "gcp" ? active.gcpExample : active.awsExample}
              </pre>
            </div>
          </>
        )}
      </div>

      <p className="text-[10px] text-text-secondary italic text-center">
        Toda acción que haces en la consola tiene su equivalente en CLI y API. Son tres puertas al mismo destino.
      </p>
    </div>
  );
}
