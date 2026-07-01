"use client";

import { useState } from "react";
import {
  Zap,
  Upload,
  Mail,
  Database,
  Globe,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  FileText,
  Bell,
  Image,
  Shield,
  RefreshCw,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type TriggerDef = {
  id: string;
  label: string;
  icon: React.ReactNode;
  event: string;
  gcpSource: string;
  awsSource: string;
};

type FunctionCard = {
  triggerId: string;
  task: string;
  result: string;
  icon: React.ReactNode;
};

export function EventFunctionSimulator() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0); // 0:idle 1:event 2:activator 3:function 4:result

  const triggers: TriggerDef[] = [
    {
      id: "storage",
      label: "Archivo subido",
      icon: <Upload className="w-4 h-4" />,
      event: "object.finalize",
      gcpSource: "Cloud Storage → Eventarc",
      awsSource: "S3 → Lambda trigger",
    },
    {
      id: "pubsub",
      label: "Mensaje publicado",
      icon: <Mail className="w-4 h-4" />,
      event: "message.publish",
      gcpSource: "Pub/Sub → push subscription",
      awsSource: "SQS/SNS → Lambda",
    },
    {
      id: "firestore",
      label: "Dato modificado en DB",
      icon: <Database className="w-4 h-4" />,
      event: "document.update",
      gcpSource: "Firestore → Eventarc",
      awsSource: "DynamoDB Streams → Lambda",
    },
    {
      id: "http",
      label: "Solicitud HTTP",
      icon: <Globe className="w-4 h-4" />,
      event: "HTTP request",
      gcpSource: "Cloud Run function (HTTP trigger)",
      awsSource: "API Gateway → Lambda",
    },
  ];

  const functionCards: FunctionCard[] = [
    { triggerId: "storage", task: "Validar formato y renombrar archivo", result: "Archivo validado ✓ y renombrado", icon: <FileText className="w-3.5 h-3.5" /> },
    { triggerId: "pubsub", task: "Procesar mensaje y enviar notificación", result: "Notificación enviada al destinatario", icon: <Bell className="w-3.5 h-3.5" /> },
    { triggerId: "firestore", task: "Detectar cambio y sincronizar cache", result: "Cache actualizado con nuevo valor", icon: <RefreshCw className="w-3.5 h-3.5" /> },
    { triggerId: "http", task: "Recibir request y generar thumbnail", result: "Imagen redimensionada y almacenada", icon: <Image className="w-3.5 h-3.5" /> },
  ];

  const activeTrigger = triggers.find((t) => t.id === selectedTrigger);
  const activeFunction = functionCards.find((f) => f.triggerId === selectedTrigger);

  const runSimulation = () => {
    if (!selectedTrigger) return;
    setIsAnimating(true);
    setStep(0);
    setTimeout(() => setStep(1), 300);
    setTimeout(() => setStep(2), 900);
    setTimeout(() => setStep(3), 1500);
    setTimeout(() => setStep(4), 2200);
    setTimeout(() => setIsAnimating(false), 2800);
  };

  const reset = () => {
    setSelectedTrigger(null);
    setStep(0);
    setIsAnimating(false);
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-cyan" />
            <h3 className="text-sm font-semibold text-foreground">
              Simulador de trigger y función
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Elige un disparador y observa cómo el evento activa una función que ejecuta una tarea específica.
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

      {/* Trigger selector */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
          Elige un disparador (trigger)
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {triggers.map((t) => (
            <button
              key={t.id}
              onClick={() => { setSelectedTrigger(t.id); setStep(0); }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs border transition-all ${
                selectedTrigger === t.id
                  ? "bg-cyan/10 border-cyan/30 text-cyan"
                  : "border-border text-text-secondary hover:border-cyan/20"
              }`}
            >
              {t.icon}
              <span className="font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Flow visualization */}
      {activeTrigger && (
        <div className="rounded-lg border border-border bg-gray-900 p-4 space-y-3">
          {/* Pipeline */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Event */}
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-500 ${
              step >= 1 ? "bg-orange/20 border-orange/40 text-orange" : "border-gray-700 text-gray-500"
            }`}>
              {activeTrigger.icon}
              <div>
                <p className="text-[10px] font-medium">Evento</p>
                <p className="text-[8px] opacity-70">{activeTrigger.event}</p>
              </div>
            </div>

            <ArrowRight className={`w-4 h-4 shrink-0 transition-all ${step >= 2 ? "text-cyan" : "text-gray-700"}`} />

            {/* Activator */}
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-500 ${
              step >= 2 ? "bg-cyan/20 border-cyan/40 text-cyan" : "border-gray-700 text-gray-500"
            }`}>
              <Shield className="w-4 h-4" />
              <div>
                <p className="text-[10px] font-medium">Activador</p>
                <p className="text-[8px] opacity-70">
                  {viewMode === "gcp"
                    ? activeTrigger.gcpSource
                    : viewMode === "aws"
                    ? activeTrigger.awsSource
                    : "Enruta al handler"}
                </p>
              </div>
            </div>

            <ArrowRight className={`w-4 h-4 shrink-0 transition-all ${step >= 3 ? "text-azure" : "text-gray-700"}`} />

            {/* Function */}
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-500 ${
              step >= 3 ? "bg-azure/20 border-azure/40 text-azure animate-pulse" : "border-gray-700 text-gray-500"
            }`}>
              {activeFunction?.icon}
              <div>
                <p className="text-[10px] font-medium">
                  {viewMode === "gcp" ? "Cloud Run function" : viewMode === "aws" ? "Lambda" : "Función"}
                </p>
                <p className="text-[8px] opacity-70">{activeFunction?.task}</p>
              </div>
            </div>

            <ArrowRight className={`w-4 h-4 shrink-0 transition-all ${step >= 4 ? "text-green" : "text-gray-700"}`} />

            {/* Result */}
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-500 ${
              step >= 4 ? "bg-green/20 border-green/40 text-green" : "border-gray-700 text-gray-500"
            }`}>
              <CheckCircle2 className="w-4 h-4" />
              <div>
                <p className="text-[10px] font-medium">Resultado</p>
                <p className="text-[8px] opacity-70">{activeFunction?.result}</p>
              </div>
            </div>
          </div>

          {step >= 4 && (
            <p className="text-[9px] text-green text-center">
              ✓ Función ejecutada — sin servidor permanente. Solo se activó por el evento.
            </p>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={runSimulation}
          disabled={!selectedTrigger || isAnimating}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            selectedTrigger && !isAnimating
              ? "bg-cyan/10 text-cyan border border-cyan/30 hover:bg-cyan/20"
              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          }`}
        >
          <Play className="w-3 h-3" />
          Disparar evento
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-text-secondary border border-border hover:border-azure/20 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Function cards grid */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
          Funciones event-driven: diseño intencionalmente pequeño
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {functionCards.map((fc) => {
            const trigger = triggers.find((t) => t.id === fc.triggerId);
            return (
              <div key={fc.triggerId} className="rounded-lg border border-border bg-white/30 p-3 space-y-1.5">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="px-1.5 py-0.5 rounded bg-orange/10 text-orange font-medium">
                    {trigger?.event}
                  </span>
                  <ArrowRight className="w-3 h-3 text-text-secondary" />
                  <span className="px-1.5 py-0.5 rounded bg-azure/10 text-azure font-medium">
                    función
                  </span>
                </div>
                <p className="text-[11px] text-foreground font-medium">{fc.task}</p>
                <p className="text-[9px] text-text-secondary">→ {fc.result}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Patrón:</span> Evento (algo pasó) → Activador (detecta y enruta) → Función (ejecuta lógica pequeña) → Resultado. La función no vive permanentemente — solo existe mientras procesa.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">En GCP:</span> Eventarc enruta eventos de Storage, Firestore, Pub/Sub y Audit Logs hacia Cloud Run functions. Formato CloudEvents. Deploy: <code className="text-cyan font-mono">gcloud functions deploy --gen2 --trigger-event-filters="type=google.cloud.storage.object.v1.finalized"</code>
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> Triggers conectan S3, DynamoDB Streams, SQS, API Gateway a Lambda. Configuración en event source mapping o en la consola. Deploy: <code className="text-orange font-mono">aws lambda create-event-source-mapping</code>
          </p>
        )}
      </div>
    </div>
  );
}
