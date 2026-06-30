"use client";

import { useState } from "react";
import {
  Terminal,
  ChevronRight,
  Eye,
  EyeOff,
  Play,
  Info,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

type CommandStep = {
  id: string;
  command: string;
  output: string;
  explanation: string;
  parts: { text: string; meaning: string }[];
};

type ViewMode = "concept" | "gcp" | "aws";

const conceptCommands: CommandStep[] = [
  {
    id: "config",
    command: "cloud config set project mi-proyecto-clase",
    output: "Updated property [core/project].",
    explanation:
      "Establece el contexto de trabajo. Todos los comandos siguientes operarán dentro de este proyecto. Es como abrir una carpeta antes de trabajar con los archivos.",
    parts: [
      { text: "cloud", meaning: "Herramienta CLI del proveedor" },
      { text: "config set", meaning: "Subcomando para configurar propiedades" },
      { text: "project", meaning: "La propiedad que estamos estableciendo" },
      { text: "mi-proyecto-clase", meaning: "El valor: nombre del proyecto" },
    ],
  },
  {
    id: "list",
    command: "cloud storage list",
    output:
      "NAME                    LOCATION    CLASS\narchivos-clase          us-east     standard\nbackups-semanales        us-west     nearline\nlogs-desarrollo         eu-west     standard",
    explanation:
      "Lista todos los recursos de almacenamiento del proyecto activo. La salida es una tabla con nombre, ubicación y clase. Ideal para verificar qué existe antes de crear algo nuevo.",
    parts: [
      { text: "cloud", meaning: "Herramienta CLI" },
      { text: "storage", meaning: "Categoría de servicio (almacenamiento)" },
      { text: "list", meaning: "Acción: listar recursos existentes" },
    ],
  },
  {
    id: "create",
    command: 'cloud storage create mi-nuevo-bucket --location=us-east --class=standard',
    output: "Creating bucket... done.\nBucket [mi-nuevo-bucket] created in [us-east].",
    explanation:
      "Crea un nuevo recurso de almacenamiento con un solo comando. Los flags (--location, --class) definen la configuración. En consola esto requeriría navegar menús y llenar formularios.",
    parts: [
      { text: "cloud", meaning: "Herramienta CLI" },
      { text: "storage create", meaning: "Acción: crear recurso de almacenamiento" },
      { text: "mi-nuevo-bucket", meaning: "Nombre del recurso a crear" },
      { text: "--location=us-east", meaning: "Flag: región de ubicación" },
      { text: "--class=standard", meaning: "Flag: clase de almacenamiento" },
    ],
  },
  {
    id: "verify",
    command: "cloud storage list --format=table",
    output:
      "NAME                    LOCATION    CLASS\narchivos-clase          us-east     standard\nbackups-semanales        us-west     nearline\nlogs-desarrollo         eu-west     standard\nmi-nuevo-bucket         us-east     standard",
    explanation:
      "Verifica que el recurso se creó correctamente. Ahora aparece en la lista. Este patrón de crear → verificar es una buena práctica en CLI.",
    parts: [
      { text: "cloud storage list", meaning: "Listar recursos de almacenamiento" },
      { text: "--format=table", meaning: "Flag: mostrar resultado como tabla legible" },
    ],
  },
];

const gcpCommands: CommandStep[] = [
  {
    id: "config",
    command: "gcloud config set project mi-proyecto-clase",
    output: "Updated property [core/project].",
    explanation:
      "Establece el proyecto activo. Todos los comandos gcloud siguientes operarán dentro de este proyecto. Es como seleccionar el proyecto en la Cloud Console.",
    parts: [
      { text: "gcloud", meaning: "Google Cloud CLI" },
      { text: "config set", meaning: "Subcomando para configurar propiedades" },
      { text: "project", meaning: "La propiedad que estamos estableciendo" },
      { text: "mi-proyecto-clase", meaning: "El ID del proyecto" },
    ],
  },
  {
    id: "list",
    command: "gcloud storage ls",
    output:
      "gs://archivos-clase/\ngs://backups-semanales/\ngs://logs-desarrollo/",
    explanation:
      "Lista todos los buckets de Cloud Storage del proyecto activo. La salida muestra las URIs gs:// de cada bucket.",
    parts: [
      { text: "gcloud", meaning: "Google Cloud CLI" },
      { text: "storage", meaning: "Servicio Cloud Storage" },
      { text: "ls", meaning: "Acción: listar recursos existentes" },
    ],
  },
  {
    id: "create",
    command: "gcloud storage buckets create gs://mi-nuevo-bucket --location=us-east1",
    output: "Creating gs://mi-nuevo-bucket/...\nBucket [mi-nuevo-bucket] created.",
    explanation:
      "Crea un nuevo bucket de Cloud Storage con un solo comando. El flag --location define la región. En la Cloud Console esto requeriría navegar menús y llenar formularios.",
    parts: [
      { text: "gcloud", meaning: "Google Cloud CLI" },
      { text: "storage buckets create", meaning: "Acción: crear bucket" },
      { text: "gs://mi-nuevo-bucket", meaning: "URI del bucket a crear" },
      { text: "--location=us-east1", meaning: "Flag: región de ubicación" },
    ],
  },
  {
    id: "verify",
    command: "gcloud storage ls",
    output:
      "gs://archivos-clase/\ngs://backups-semanales/\ngs://logs-desarrollo/\ngs://mi-nuevo-bucket/",
    explanation:
      "Verifica que el bucket se creó correctamente. Ahora aparece en la lista. Este patrón de crear → verificar es una buena práctica en CLI.",
    parts: [
      { text: "gcloud storage ls", meaning: "Listar todos los buckets de Cloud Storage" },
    ],
  },
];

const awsCommands: CommandStep[] = [
  {
    id: "config",
    command: "aws configure set region us-east-1",
    output: "",
    explanation:
      "Configura la región por defecto. En AWS CLI, el 'contexto' se maneja con región y perfil, no con proyecto. Los comandos siguientes operarán en us-east-1.",
    parts: [
      { text: "aws", meaning: "AWS CLI" },
      { text: "configure set", meaning: "Subcomando para configurar propiedades" },
      { text: "region", meaning: "La propiedad a establecer" },
      { text: "us-east-1", meaning: "Región de AWS (N. Virginia)" },
    ],
  },
  {
    id: "list",
    command: "aws s3 ls",
    output:
      "2026-06-15 10:23:41 archivos-clase\n2026-06-10 08:15:22 backups-semanales\n2026-06-01 14:30:00 logs-desarrollo",
    explanation:
      "Lista todos los buckets S3 de la cuenta. La salida muestra fecha de creación y nombre. Equivalente exacto al comando conceptual de listar almacenamiento.",
    parts: [
      { text: "aws", meaning: "AWS CLI" },
      { text: "s3", meaning: "Servicio S3 (almacenamiento de objetos)" },
      { text: "ls", meaning: "Acción: listar (como en Linux)" },
    ],
  },
  {
    id: "create",
    command: "aws s3 mb s3://mi-nuevo-bucket --region us-east-1",
    output: "make_bucket: mi-nuevo-bucket",
    explanation:
      "Crea un bucket S3. 'mb' significa make bucket. El prefijo s3:// es obligatorio. La región se define con --region.",
    parts: [
      { text: "aws s3", meaning: "CLI + servicio S3" },
      { text: "mb", meaning: "make bucket (crear bucket)" },
      { text: "s3://mi-nuevo-bucket", meaning: "URI del bucket a crear" },
      { text: "--region us-east-1", meaning: "Flag: región del bucket" },
    ],
  },
  {
    id: "verify",
    command: "aws s3 ls",
    output:
      "2026-06-15 10:23:41 archivos-clase\n2026-06-10 08:15:22 backups-semanales\n2026-06-01 14:30:00 logs-desarrollo\n2026-06-29 16:45:10 mi-nuevo-bucket",
    explanation:
      "Verificamos que el bucket aparece. Mismo patrón: crear → listar → confirmar. El nuevo bucket ya está en la lista.",
    parts: [
      { text: "aws s3 ls", meaning: "Listar todos los buckets S3" },
    ],
  },
];

export function TerminalSimulator() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [executedSteps, setExecutedSteps] = useState<Set<string>>(new Set());
  const [expandedParts, setExpandedParts] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const commands = viewMode === "gcp" ? gcpCommands : viewMode === "aws" ? awsCommands : conceptCommands;

  const executeStep = (id: string) => {
    setExecutedSteps((prev) => new Set(prev).add(id));
  };

  const toggleParts = (id: string) => {
    setExpandedParts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyCommand = (id: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-4 h-4 text-green" />
            <h3 className="text-sm font-semibold text-foreground">
              Terminal pedagógica — Flujo paso a paso
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Ejecuta cada comando en orden y observa el resultado. Usa &quot;Explicar&quot; para
            descomponer cada parte.
          </p>
        </div>
        <div className="flex items-center bg-grey-light rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => {
              setViewMode("concept");
              setExecutedSteps(new Set());
              setExpandedParts(new Set());
            }}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "concept"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Concepto
          </button>
          <button
            onClick={() => {
              setViewMode("gcp");
              setExecutedSteps(new Set());
              setExpandedParts(new Set());
            }}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "gcp"
                ? "bg-white text-azure shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            gcloud
          </button>
          <button
            onClick={() => {
              setViewMode("aws");
              setExecutedSteps(new Set());
              setExpandedParts(new Set());
            }}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "aws"
                ? "bg-white text-orange shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            AWS CLI
          </button>
        </div>
      </div>

      {/* Terminal window */}
      <div
        className={`rounded-lg border overflow-hidden ${
          viewMode === "aws" ? "border-orange/20" : "border-border"
        }`}
      >
        {/* Title bar */}
        <div
          className={`flex items-center gap-2 px-3 py-2 ${
            viewMode === "aws" ? "bg-gray-900" : viewMode === "gcp" ? "bg-gray-800" : "bg-gray-800"
          }`}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
          </div>
          <span className="text-[10px] text-gray-400 font-mono ml-2">
            {viewMode === "aws" ? "aws-cli — bash" : viewMode === "gcp" ? "gcloud — bash" : "cloud-cli — bash"}
          </span>
          {viewMode === "aws" && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange/20 text-orange font-medium ml-auto">
              AWS CLI
            </span>
          )}
          {viewMode === "gcp" && (
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-400/20 text-blue-400 font-medium ml-auto">
              gcloud CLI
            </span>
          )}
        </div>

        {/* Terminal body */}
        <div className="bg-gray-900 p-4 space-y-4 font-mono text-xs">
          {commands.map((step, idx) => {
            const isExecuted = executedSteps.has(step.id);
            const canExecute =
              idx === 0 || executedSteps.has(commands[idx - 1].id);
            const isPartsExpanded = expandedParts.has(step.id);

            return (
              <div key={step.id} className="space-y-1">
                {/* Command line */}
                <div className="flex items-center gap-2">
                  <span
                    className={
                      viewMode === "aws" ? "text-orange" : viewMode === "gcp" ? "text-blue-400" : "text-green-400"
                    }
                  >
                    $
                  </span>
                  <span
                    className={`flex-1 ${
                      canExecute ? "text-gray-200" : "text-gray-600"
                    }`}
                  >
                    {step.command}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => copyCommand(step.id, step.command)}
                      className="p-1 text-gray-500 hover:text-gray-300 transition-colors"
                      title="Copiar comando"
                    >
                      {copiedId === step.id ? (
                        <Check className="w-3 h-3 text-green-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                    {!isExecuted && canExecute && (
                      <button
                        onClick={() => executeStep(step.id)}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-medium transition-all ${
                          viewMode === "aws"
                            ? "bg-orange/20 text-orange hover:bg-orange/30"
                            : viewMode === "gcp"
                            ? "bg-blue-400/20 text-blue-400 hover:bg-blue-400/30"
                            : "bg-green-400/20 text-green-400 hover:bg-green-400/30"
                        }`}
                      >
                        <Play className="w-2.5 h-2.5" />
                        Run
                      </button>
                    )}
                    {isExecuted && (
                      <CheckCircle2
                        className={`w-3.5 h-3.5 ${
                          viewMode === "aws" ? "text-orange" : viewMode === "gcp" ? "text-blue-400" : "text-green-400"
                        }`}
                      />
                    )}
                  </div>
                </div>

                {/* Output */}
                {isExecuted && step.output && (
                  <pre className="text-gray-400 pl-4 whitespace-pre-wrap animate-in fade-in duration-300">
                    {step.output}
                  </pre>
                )}

                {/* Explain button + explanation */}
                {isExecuted && (
                  <div className="pl-4 space-y-1.5 animate-in fade-in duration-300">
                    <button
                      onClick={() => toggleParts(step.id)}
                      className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {isPartsExpanded ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                      {isPartsExpanded
                        ? "Ocultar explicación"
                        : "Explicar comando"}
                    </button>

                    {isPartsExpanded && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                        {/* Parts breakdown */}
                        <div className="flex flex-wrap gap-1.5">
                          {step.parts.map((part, pi) => (
                            <span
                              key={pi}
                              className="group relative"
                            >
                              <span
                                className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                                  viewMode === "aws"
                                    ? "border-orange/30 bg-orange/10 text-orange"
                                    : "border-green-400/30 bg-green-400/10 text-green-400"
                                }`}
                              >
                                {part.text}
                              </span>
                              <span className="block text-[9px] text-gray-500 mt-0.5 pl-0.5">
                                {part.meaning}
                              </span>
                            </span>
                          ))}
                        </div>
                        {/* Full explanation */}
                        <div className="flex items-start gap-1.5 rounded bg-gray-800/80 p-2 text-[10px] text-gray-400 leading-relaxed">
                          <Info className="w-3 h-3 shrink-0 mt-0.5 text-gray-500" />
                          {step.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Cursor blink */}
          <div className="flex items-center gap-2">
            <span
              className={
                viewMode === "aws" ? "text-orange" : "text-green-400"
              }
            >
              $
            </span>
            <span className="w-2 h-4 bg-gray-400 animate-pulse" />
          </div>
        </div>
      </div>

      <p className="text-[10px] text-text-secondary italic text-center">
        💡 Misma tarea, cuatro pasos: configurar contexto → listar → crear → verificar. Este patrón se repite en cualquier CLI cloud.
      </p>
    </div>
  );
}
