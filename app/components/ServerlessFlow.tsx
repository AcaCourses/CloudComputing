"use client";

import { useState } from "react";
import {
  Zap,
  Upload,
  Mail,
  Clock,
  Globe,
  Image,
  Database,
  Bell,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  Code2,
  Server,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type EventType = {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
};

type ActionType = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type ResultType = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

export function ServerlessFlow() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [flowComplete, setFlowComplete] = useState(false);

  const events: EventType[] = [
    { id: "upload", label: "Archivo subido", icon: <Upload className="w-4 h-4" />, description: "Un usuario sube un archivo a Cloud Storage" },
    { id: "http", label: "Request HTTP", icon: <Globe className="w-4 h-4" />, description: "Llega una solicitud HTTP a un endpoint" },
    { id: "schedule", label: "Hora programada", icon: <Clock className="w-4 h-4" />, description: "Se activa un cron (ej: cada hora)" },
    { id: "message", label: "Mensaje en cola", icon: <Mail className="w-4 h-4" />, description: "Llega un mensaje a Pub/Sub" },
  ];

  const actions: ActionType[] = [
    { id: "resize", label: "Redimensionar imagen", icon: <Image className="w-4 h-4" /> },
    { id: "validate", label: "Validar datos", icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: "notify", label: "Enviar notificación", icon: <Bell className="w-4 h-4" /> },
    { id: "store", label: "Guardar en DB", icon: <Database className="w-4 h-4" /> },
  ];

  const results: ResultType[] = [
    { id: "thumbnail", label: "Thumbnail generado", icon: <Image className="w-4 h-4" /> },
    { id: "response", label: "JSON response", icon: <Code2 className="w-4 h-4" /> },
    { id: "alert", label: "Alerta enviada", icon: <Bell className="w-4 h-4" /> },
    { id: "record", label: "Registro creado", icon: <Database className="w-4 h-4" /> },
  ];

  const runFlow = () => {
    if (!selectedEvent || !selectedAction || !selectedResult) return;
    setIsAnimating(true);
    setFlowComplete(false);
    setTimeout(() => {
      setIsAnimating(false);
      setFlowComplete(true);
    }, 2000);
  };

  const reset = () => {
    setSelectedEvent(null);
    setSelectedAction(null);
    setSelectedResult(null);
    setIsAnimating(false);
    setFlowComplete(false);
  };

  const isComplete = selectedEvent && selectedAction && selectedResult;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-orange" />
            <h3 className="text-sm font-semibold text-foreground">
              Simulador serverless — Evento → Función → Resultado
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Construye un flujo serverless eligiendo evento, acción y resultado. Luego ejecútalo.
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

      {/* Flow builder */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Events */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-orange/10 text-orange text-[9px] font-bold flex items-center justify-center">1</span>
            Evento (disparador)
          </p>
          <div className="space-y-1.5">
            {events.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEvent(ev.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-all text-left ${
                  selectedEvent === ev.id
                    ? "bg-orange/10 border-orange/30 text-orange"
                    : "border-border text-text-secondary hover:border-orange/20"
                }`}
              >
                {ev.icon}
                <span className="font-medium">{ev.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-azure/10 text-azure text-[9px] font-bold flex items-center justify-center">2</span>
            Función (lógica)
          </p>
          <div className="space-y-1.5">
            {actions.map((act) => (
              <button
                key={act.id}
                onClick={() => setSelectedAction(act.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-all text-left ${
                  selectedAction === act.id
                    ? "bg-azure/10 border-azure/30 text-azure"
                    : "border-border text-text-secondary hover:border-azure/20"
                }`}
              >
                {act.icon}
                <span className="font-medium">{act.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium flex items-center gap-1">
            <span className="w-4 h-4 rounded-full bg-green/10 text-green text-[9px] font-bold flex items-center justify-center">3</span>
            Resultado (salida)
          </p>
          <div className="space-y-1.5">
            {results.map((res) => (
              <button
                key={res.id}
                onClick={() => setSelectedResult(res.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs border transition-all text-left ${
                  selectedResult === res.id
                    ? "bg-green/10 border-green/30 text-green"
                    : "border-border text-text-secondary hover:border-green/20"
                }`}
              >
                {res.icon}
                <span className="font-medium">{res.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flow visualization */}
      {isComplete && (
        <div className="rounded-lg border border-border bg-gray-900 p-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {/* Event */}
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all ${
              isAnimating || flowComplete ? "bg-orange/20 border-orange/40 text-orange" : "border-gray-700 text-gray-400"
            }`}>
              {events.find((e) => e.id === selectedEvent)?.icon}
              <span className="text-[11px] font-medium">
                {events.find((e) => e.id === selectedEvent)?.label}
              </span>
            </div>

            <ArrowRight className={`w-4 h-4 transition-all ${isAnimating ? "text-orange animate-pulse" : flowComplete ? "text-green" : "text-gray-600"}`} />

            {/* Function */}
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all ${
              isAnimating ? "bg-azure/20 border-azure/40 text-azure animate-pulse" : flowComplete ? "bg-azure/20 border-azure/40 text-azure" : "border-gray-700 text-gray-400"
            }`}>
              <Code2 className="w-4 h-4" />
              <span className="text-[11px] font-medium">
                {viewMode === "gcp"
                  ? "Cloud Run function"
                  : viewMode === "aws"
                  ? "Lambda"
                  : "función()"}
              </span>
            </div>

            <ArrowRight className={`w-4 h-4 transition-all ${flowComplete ? "text-green" : "text-gray-600"}`} />

            {/* Result */}
            <div className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all ${
              flowComplete ? "bg-green/20 border-green/40 text-green" : "border-gray-700 text-gray-400"
            }`}>
              {results.find((r) => r.id === selectedResult)?.icon}
              <span className="text-[11px] font-medium">
                {results.find((r) => r.id === selectedResult)?.label}
              </span>
            </div>
          </div>

          {flowComplete && (
            <div className="mt-3 text-center">
              <p className="text-[10px] text-green font-medium">
                ✓ Ejecución completada — {viewMode === "gcp" ? "Cloud Run function procesó el evento" : viewMode === "aws" ? "Lambda procesó el evento" : "La función procesó el evento y produjo el resultado"}
              </p>
              <p className="text-[9px] text-gray-500 mt-1">
                {viewMode === "gcp"
                  ? "Sin servidores activos antes ni después. Pago por invocación."
                  : viewMode === "aws"
                  ? "Sin servidores. Pago por ms de ejecución."
                  : "Sin servidor permanente. Solo se ejecutó cuando el evento ocurrió."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={runFlow}
          disabled={!isComplete || isAnimating}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            isComplete && !isAnimating
              ? "bg-azure/10 text-azure border border-azure/30 hover:bg-azure/20"
              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          }`}
        >
          <Play className="w-3 h-3" />
          Ejecutar flujo
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-text-secondary border border-border hover:border-azure/20 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Nuevo flujo
        </button>

        {!isComplete && (
          <p className="text-[10px] text-text-secondary ml-auto">
            Selecciona evento, función y resultado para armar el flujo
          </p>
        )}
      </div>

      {/* Serverless vs always-on comparison */}
      <div className="rounded-lg border border-border bg-white/30 p-3">
        <p className="text-[9px] uppercase tracking-wider text-text-secondary font-medium mb-2">
          ¿Cuándo conviene serverless?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
          <div className="rounded-md bg-green/5 border border-green/20 p-2.5 space-y-1">
            <p className="font-semibold text-green">✓ Ideal para serverless</p>
            <ul className="text-text-secondary space-y-0.5">
              <li>• Redimensionar imagen al subirla</li>
              <li>• Responder a un webhook</li>
              <li>• Procesar mensaje de una cola</li>
              <li>• Tarea programada (cron)</li>
            </ul>
          </div>
          <div className="rounded-md bg-orange/5 border border-orange/20 p-2.5 space-y-1">
            <p className="font-semibold text-orange">~ Depende del caso</p>
            <ul className="text-text-secondary space-y-0.5">
              <li>• API con tráfico variable</li>
              <li>• Backend ligero</li>
              <li>• Procesamiento batch corto</li>
              <li>• Prototipo rápido</li>
            </ul>
          </div>
          <div className="rounded-md bg-red-50 border border-red-200 p-2.5 space-y-1">
            <p className="font-semibold text-red-500">✗ No ideal para serverless</p>
            <ul className="text-text-secondary space-y-0.5">
              <li>• App con estado persistente</li>
              <li>• Proceso de larga duración (hrs)</li>
              <li>• Tráfico constante 24/7</li>
              <li>• Requisitos de baja latencia extrema</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Platform info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Modelo serverless:</span> Tú escribes la función → la plataforma la ejecuta cuando ocurre el evento → pagas solo por ejecución. No hay servidores que mantener encendidos.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">Cloud Run functions:</span> Soporta Node.js, Python, Go, Java. Triggers: HTTP, Cloud Storage, Pub/Sub, Firestore, Scheduler. Deploy: <code className="text-cyan font-mono">gcloud functions deploy --gen2 --trigger-http</code>
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">AWS Lambda:</span> Soporta Node.js, Python, Go, Java, .NET. Triggers: API Gateway, S3, SQS, EventBridge, CloudWatch. Deploy: <code className="text-orange font-mono">aws lambda create-function</code>
          </p>
        )}
      </div>
    </div>
  );
}
