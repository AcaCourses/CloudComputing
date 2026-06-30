"use client";

import { useState } from "react";
import {
  Mouse,
  Terminal,
  FileCode2,
  Cog,
  ChevronRight,
  Clock,
  Repeat,
  AlertTriangle,
  TrendingUp,
  Zap,
} from "lucide-react";

type MaturityLevel = {
  id: string;
  step: number;
  label: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
  example: string;
  gcpExample: string;
  awsExample: string;
  effort: { first: number; tenth: number };
  errorRisk: "alto" | "medio" | "bajo" | "muy bajo";
};

const levels: MaturityLevel[] = [
  {
    id: "console",
    step: 1,
    label: "Manual en consola",
    icon: Mouse,
    color: "text-azure",
    borderColor: "border-azure/30",
    bgColor: "bg-azure/5",
    description:
      "Haces clic en la consola web. Navegas menús, llenas formularios, confirmas. Funciona para una vez, pero no escala. Cada repetición es manual y propensa a errores.",
    example:
      "Crear un bucket: abrir Storage → Create → llenar formulario → confirmar. Para 10 buckets: repetir 10 veces.",
    gcpExample:
      "Cloud Storage → Crear bucket → configurar nombre, ubicación, clase → Crear. Para 10 buckets: 10 formularios manuales en la Cloud Console.",
    awsExample:
      "S3 → Create bucket → configurar nombre, región, permisos → Create. Para 10 buckets: 10 formularios manuales.",
    effort: { first: 3, tenth: 30 },
    errorRisk: "alto",
  },
  {
    id: "cli",
    step: 2,
    label: "Comando por CLI",
    icon: Terminal,
    color: "text-green",
    borderColor: "border-green/30",
    bgColor: "bg-green/5",
    description:
      "Escribes un comando en la terminal. Es más rápido y preciso que la consola. Puedes copiar y adaptar, pero aún ejecutas uno a uno.",
    example:
      "cloud storage create mi-bucket --location=us-east. Para 10 buckets: ejecutar 10 veces cambiando el nombre.",
    gcpExample:
      "gcloud storage buckets create gs://mi-bucket --location=us-east1. Para 10 buckets: 10 comandos similares.",
    awsExample:
      "aws s3 mb s3://mi-bucket --region us-east-1. Para 10 buckets: 10 comandos similares.",
    effort: { first: 1, tenth: 10 },
    errorRisk: "medio",
  },
  {
    id: "script",
    step: 3,
    label: "Script reutilizable",
    icon: FileCode2,
    color: "text-cyan",
    borderColor: "border-cyan/30",
    bgColor: "bg-cyan/5",
    description:
      "Escribes un script (bash, Python) que encadena comandos. Se ejecuta una vez y crea todo. Puedes guardarlo, versionarlo y reutilizarlo. El esfuerzo es fijo sin importar la cantidad.",
    example:
      "for i in {1..10}; do cloud storage create bucket-$i --location=us-east; done. Un script, 10 buckets.",
    gcpExample:
      "for i in $(seq 1 10); do gcloud storage buckets create gs://bucket-lab-$i --location=us-east1; done. O con google-cloud-storage en Python.",
    awsExample:
      "for i in $(seq 1 10); do aws s3 mb s3://bucket-lab-$i --region us-east-1; done. O con boto3 en Python.",
    effort: { first: 5, tenth: 5 },
    errorRisk: "bajo",
  },
  {
    id: "automation",
    step: 4,
    label: "Automatización integrada",
    icon: Cog,
    color: "text-orange",
    borderColor: "border-orange/30",
    bgColor: "bg-orange/5",
    description:
      "Defines la infraestructura como código (IaC) o usas herramientas que ejecutan automáticamente: plantillas, pipelines, triggers. El sistema se auto-mantiene y es auditables.",
    example:
      "Una plantilla declarativa define 10 buckets. Se aplica una vez y el sistema crea todo. Si cambias la plantilla, solo se actualizan las diferencias.",
    gcpExample:
      "Terraform o Deployment Manager define recursos en HCL/YAML. 'terraform apply' o 'gcloud deployment-manager deployments create' aplica el stack completo. Cambios incrementales automáticos.",
    awsExample:
      "AWS CloudFormation o Terraform define recursos en YAML/HCL. 'aws cloudformation deploy' aplica el stack completo. Cambios incrementales automáticos.",
    effort: { first: 8, tenth: 0 },
    errorRisk: "muy bajo",
  },
];

type ViewMode = "concept" | "gcp" | "aws";

export function AutomationTimeline() {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [repetitions, setRepetitions] = useState(1);

  const active = levels.find((l) => l.id === activeLevel);

  const effortForReps = (level: MaturityLevel) => {
    if (level.id === "automation") {
      return repetitions === 1 ? level.effort.first : level.effort.first;
    }
    return level.effort.first + (repetitions - 1) * (level.effort.tenth / 10);
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-cyan" />
            <h3 className="text-sm font-semibold text-foreground">
              Evolución operativa — De lo manual a lo automatizado
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Haz clic en cada nivel para ver cómo cambia el esfuerzo y el riesgo de error.
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

      {/* Repetition slider */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-panel/50 px-3 py-2">
        <Repeat className="w-3.5 h-3.5 text-text-secondary" />
        <span className="text-[10px] text-text-secondary font-medium whitespace-nowrap">
          Repeticiones:
        </span>
        <input
          type="range"
          min={1}
          max={30}
          value={repetitions}
          onChange={(e) => setRepetitions(Number(e.target.value))}
          className="flex-1 accent-cyan h-1.5"
        />
        <span className="text-xs font-mono font-semibold text-foreground w-6 text-right">
          {repetitions}
        </span>
      </div>

      {/* Timeline steps */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-azure/30 via-green/30 via-cyan/30 to-orange/30 hidden sm:block" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
          {levels.map((level) => {
            const Icon = level.icon;
            const isActive = activeLevel === level.id;
            const effort = effortForReps(level);

            return (
              <button
                key={level.id}
                onClick={() => setActiveLevel(isActive ? null : level.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-200 relative ${
                  isActive
                    ? `${level.borderColor} ${level.bgColor} shadow-sm scale-[1.03]`
                    : "border-border hover:border-azure/20 hover:bg-panel/60"
                }`}
              >
                {/* Step number */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 bg-white z-10 ${
                    isActive ? level.borderColor + " " + level.color : "border-border text-text-secondary"
                  }`}
                >
                  {level.step}
                </div>
                <Icon
                  className={`w-4 h-4 ${isActive ? level.color : "text-text-secondary"}`}
                />
                <span
                  className={`text-[10px] font-semibold text-center leading-tight ${
                    isActive ? "text-foreground" : "text-text-secondary"
                  }`}
                >
                  {level.label}
                </span>

                {/* Effort bar */}
                <div className="w-full space-y-0.5">
                  <div className="flex items-center justify-between text-[8px] text-text-secondary">
                    <span>Esfuerzo</span>
                    <span className="font-mono">{effort.toFixed(0)} min</span>
                  </div>
                  <div className="h-1.5 bg-grey-light rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        level.id === "console"
                          ? "bg-azure"
                          : level.id === "cli"
                          ? "bg-green"
                          : level.id === "script"
                          ? "bg-cyan"
                          : "bg-orange"
                      }`}
                      style={{ width: `${Math.min((effort / 35) * 100, 100)}%` }}
                    />
                  </div>
                </div>
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
          <div className="flex items-center gap-2">
            <active.icon className={`w-4 h-4 ${active.color}`} />
            <h4 className="text-sm font-semibold text-foreground">{active.label}</h4>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                active.errorRisk === "alto"
                  ? "bg-red-100 text-red-600 border border-red-200"
                  : active.errorRisk === "medio"
                  ? "bg-orange/10 text-orange border border-orange/20"
                  : active.errorRisk === "bajo"
                  ? "bg-cyan/10 text-cyan border border-cyan/20"
                  : "bg-green/10 text-green border border-green/20"
              }`}
            >
              Riesgo de error: {active.errorRisk}
            </span>
          </div>

          <p className="text-xs text-text-secondary leading-relaxed">
            {active.description}
          </p>

          <div className="rounded-md border border-border/50 bg-white/50 p-3">
            <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium mb-1">
              {viewMode === "aws" ? "Ejemplo en AWS" : viewMode === "gcp" ? "Ejemplo en Google Cloud" : "Ejemplo"}
            </p>
            <p className="text-xs text-foreground font-mono leading-relaxed whitespace-pre-wrap">
              {viewMode === "aws" ? active.awsExample : viewMode === "gcp" ? active.gcpExample : active.example}
            </p>
          </div>

          {/* Effort comparison */}
          <div className="flex items-center gap-3 text-[10px]">
            <div className="flex items-center gap-1 text-text-secondary">
              <Clock className="w-3 h-3" />
              <span>1 vez: ~{active.effort.first} min</span>
            </div>
            <ChevronRight className="w-3 h-3 text-text-secondary" />
            <div className="flex items-center gap-1 text-text-secondary">
              <Repeat className="w-3 h-3" />
              <span>
                {repetitions}x: ~{effortForReps(active).toFixed(0)} min
              </span>
            </div>
            {active.id === "automation" && repetitions > 1 && (
              <span className="flex items-center gap-1 text-green font-medium ml-auto">
                <Zap className="w-3 h-3" />
                Esfuerzo cero después del setup
              </span>
            )}
          </div>
        </div>
      )}

      {!active && (
        <p className="text-[10px] text-text-secondary italic text-center">
          ↑ Selecciona un nivel y mueve el slider de repeticiones para ver cómo cambia el esfuerzo
        </p>
      )}

      <p className="text-[10px] text-text-secondary italic text-center">
        💡 A medida que subes de nivel, el esfuerzo inicial puede ser mayor, pero el esfuerzo por repetición baja drásticamente.
      </p>
    </div>
  );
}
