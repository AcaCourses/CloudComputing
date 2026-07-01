"use client";

import { useState } from "react";
import {
  Workflow,
  Upload,
  Database,
  Clock,
  Bell,
  FileCheck,
  RefreshCw,
  Mail,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  User,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type EventOption = { id: string; label: string; icon: React.ReactNode };
type ConditionOption = { id: string; label: string };
type ActionOption = { id: string; label: string; icon: React.ReactNode };
type ResultOption = { id: string; label: string; icon: React.ReactNode };

export function AutomationBuilder() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showBefore, setShowBefore] = useState(true);

  const events: EventOption[] = [
    { id: "file-upload", label: "Archivo subido", icon: <Upload className="w-3.5 h-3.5" /> },
    { id: "data-change", label: "Dato modificado", icon: <Database className="w-3.5 h-3.5" /> },
    { id: "schedule", label: "Hora programada", icon: <Clock className="w-3.5 h-3.5" /> },
    { id: "user-action", label: "Acción de usuario", icon: <User className="w-3.5 h-3.5" /> },
  ];

  const conditions: ConditionOption[] = [
    { id: "always", label: "Siempre" },
    { id: "if-valid", label: "Si es válido" },
    { id: "if-new", label: "Si es nuevo" },
    { id: "if-changed", label: "Si cambió" },
  ];

  const actions: ActionOption[] = [
    { id: "validate", label: "Validar contenido", icon: <FileCheck className="w-3.5 h-3.5" /> },
    { id: "notify", label: "Enviar notificación", icon: <Bell className="w-3.5 h-3.5" /> },
    { id: "transform", label: "Transformar datos", icon: <RefreshCw className="w-3.5 h-3.5" /> },
    { id: "email", label: "Enviar email", icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  const results: ResultOption[] = [
    { id: "processed", label: "Procesado exitosamente", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: "notified", label: "Personas notificadas", icon: <Bell className="w-3.5 h-3.5" /> },
    { id: "stored", label: "Almacenado en destino", icon: <Database className="w-3.5 h-3.5" /> },
    { id: "logged", label: "Registrado en bitácora", icon: <FileCheck className="w-3.5 h-3.5" /> },
  ];

  const isComplete = selectedEvent && selectedCondition && selectedAction && selectedResult;

  const runAutomation = () => {
    if (!isComplete) return;
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 2000);
  };

  const reset = () => {
    setSelectedEvent(null);
    setSelectedCondition(null);
    setSelectedAction(null);
    setSelectedResult(null);
    setIsRunning(false);
  };

  const getEventLabel = () => events.find((e) => e.id === selectedEvent)?.label ?? "";
  const getConditionLabel = () => conditions.find((c) => c.id === selectedCondition)?.label ?? "";
  const getActionLabel = () => actions.find((a) => a.id === selectedAction)?.label ?? "";
  const getResultLabel = () => results.find((r) => r.id === selectedResult)?.label ?? "";

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Workflow className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Constructor de automatización
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Arma una regla: &ldquo;Si pasa esto → entonces haz esto&rdquo;. Visualiza el flujo completo.
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

      {/* Builder grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Event */}
        <div className="space-y-1.5">
          <p className="text-[9px] uppercase tracking-wider text-orange font-semibold">
            Si ocurre...
          </p>
          <div className="space-y-1">
            {events.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEvent(ev.id)}
                className={`w-full flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] border transition-all text-left ${
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

        {/* Condition */}
        <div className="space-y-1.5">
          <p className="text-[9px] uppercase tracking-wider text-cyan font-semibold">
            Condición
          </p>
          <div className="space-y-1">
            {conditions.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCondition(c.id)}
                className={`w-full flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] border transition-all text-left ${
                  selectedCondition === c.id
                    ? "bg-cyan/10 border-cyan/30 text-cyan"
                    : "border-border text-text-secondary hover:border-cyan/20"
                }`}
              >
                <span className="font-medium">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="space-y-1.5">
          <p className="text-[9px] uppercase tracking-wider text-azure font-semibold">
            Entonces...
          </p>
          <div className="space-y-1">
            {actions.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedAction(a.id)}
                className={`w-full flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] border transition-all text-left ${
                  selectedAction === a.id
                    ? "bg-azure/10 border-azure/30 text-azure"
                    : "border-border text-text-secondary hover:border-azure/20"
                }`}
              >
                {a.icon}
                <span className="font-medium">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="space-y-1.5">
          <p className="text-[9px] uppercase tracking-wider text-green font-semibold">
            Resultado
          </p>
          <div className="space-y-1">
            {results.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedResult(r.id)}
                className={`w-full flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[11px] border transition-all text-left ${
                  selectedResult === r.id
                    ? "bg-green/10 border-green/30 text-green"
                    : "border-border text-text-secondary hover:border-green/20"
                }`}
              >
                {r.icon}
                <span className="font-medium">{r.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rule summary */}
      {isComplete && (
        <div className={`rounded-lg border p-3 transition-all ${
          isRunning ? "border-green/40 bg-green/5" : "border-border bg-gray-900"
        }`}>
          <p className="text-[9px] uppercase tracking-wider text-gray-400 mb-2">
            {viewMode === "gcp"
              ? "Automatización en Google Cloud"
              : viewMode === "aws"
              ? "Automatización en AWS"
              : "Tu regla de automatización"}
          </p>
          <div className="flex items-center gap-2 flex-wrap text-[11px]">
            <span className="px-2 py-1 rounded bg-orange/20 text-orange font-medium">
              {getEventLabel()}
            </span>
            <ArrowRight className="w-3 h-3 text-gray-500" />
            <span className="px-2 py-1 rounded bg-cyan/20 text-cyan font-medium">
              {getConditionLabel()}
            </span>
            <ArrowRight className="w-3 h-3 text-gray-500" />
            <span className="px-2 py-1 rounded bg-azure/20 text-azure font-medium">
              {getActionLabel()}
            </span>
            <ArrowRight className="w-3 h-3 text-gray-500" />
            <span className="px-2 py-1 rounded bg-green/20 text-green font-medium">
              {getResultLabel()}
            </span>
          </div>
          {isRunning && (
            <p className="text-[10px] text-green mt-2 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Automatización ejecutada sin intervención manual
            </p>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={runAutomation}
          disabled={!isComplete || isRunning}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            isComplete && !isRunning
              ? "bg-azure/10 text-azure border border-azure/30 hover:bg-azure/20"
              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          }`}
        >
          <Play className="w-3 h-3" />
          Ejecutar automatización
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-text-secondary border border-border hover:border-azure/20 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Nueva regla
        </button>
      </div>

      {/* Before / After comparison */}
      <div className="rounded-lg border border-border bg-white/30 p-3 space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-[9px] uppercase tracking-wider text-text-secondary font-medium">
            Antes vs Después
          </p>
          <div className="flex items-center bg-grey-light rounded p-0.5 ml-auto">
            <button
              onClick={() => setShowBefore(true)}
              className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${
                showBefore ? "bg-white text-red-500 shadow-sm" : "text-text-secondary"
              }`}
            >
              Manual
            </button>
            <button
              onClick={() => setShowBefore(false)}
              className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${
                !showBefore ? "bg-white text-green shadow-sm" : "text-text-secondary"
              }`}
            >
              Automatizado
            </button>
          </div>
        </div>

        {showBefore ? (
          <div className="space-y-1 text-[10px] text-text-secondary">
            <div className="flex items-center gap-2">
              <span className="w-4 text-center text-red-400">1.</span>
              <span>Persona revisa si ocurrió el evento</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-center text-red-400">2.</span>
              <span>Persona valida manualmente</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-center text-red-400">3.</span>
              <span>Persona ejecuta la acción</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 text-center text-red-400">4.</span>
              <span>Persona confirma el resultado</span>
            </div>
            <p className="text-[9px] text-red-400 pt-1">
              ⚠ Lento, propenso a errores, requiere atención constante
            </p>
          </div>
        ) : (
          <div className="space-y-1 text-[10px] text-text-secondary">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-green" />
              <span>Evento detectado automáticamente</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-green" />
              <span>Condición evaluada al instante</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-green" />
              <span>Acción ejecutada por la función</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-green" />
              <span>Resultado confirmado y registrado</span>
            </div>
            <p className="text-[9px] text-green pt-1">
              ✓ Instantáneo, consistente, sin intervención humana
            </p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Automatización =</span> Si ocurre X y se cumple Y, entonces haz Z automáticamente. Reduce tareas repetitivas, mejora consistencia y elimina la dependencia de intervención manual.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">En GCP:</span> Cloud Run functions + Eventarc para automatización event-driven. Cloud Scheduler para cron. Workflows para orquestar pasos. Cloud Tasks para tareas diferidas.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> Lambda + EventBridge para automatización event-driven. EventBridge Scheduler para cron. Step Functions para orquestar flujos. SQS para tareas diferidas.
          </p>
        )}
      </div>
    </div>
  );
}
