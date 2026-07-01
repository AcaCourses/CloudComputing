"use client";

import { useState } from "react";
import {
  Zap,
  Upload,
  UserPlus,
  Database,
  Mail,
  Bell,
  FileText,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Activity,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type EventScenario = {
  id: string;
  action: string;
  actionIcon: React.ReactNode;
  event: string;
  consumers: { name: string; reaction: string }[];
};

type ClassifyItem = {
  id: string;
  text: string;
  isSignificant: boolean;
  explanation: string;
};

export function EventMapper() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [activeTab, setActiveTab] = useState<"flow" | "classify">("flow");
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [animationStep, setAnimationStep] = useState(0); // 0: idle, 1: action, 2: event, 3: consumers
  const [classifyAnswers, setClassifyAnswers] = useState<Record<string, boolean | null>>({});

  const scenarios: EventScenario[] = [
    {
      id: "upload",
      action: "Un estudiante sube un PDF",
      actionIcon: <Upload className="w-4 h-4" />,
      event: "object.finalize (archivo creado)",
      consumers: [
        { name: "Validador", reaction: "Verifica formato y tamaño" },
        { name: "Notificador", reaction: "Avisa al profesor" },
        { name: "Indexador", reaction: "Registra metadatos en DB" },
      ],
    },
    {
      id: "user",
      action: "Se registra un nuevo usuario",
      actionIcon: <UserPlus className="w-4 h-4" />,
      event: "user.created (cuenta creada)",
      consumers: [
        { name: "Email service", reaction: "Envía bienvenida" },
        { name: "Analytics", reaction: "Registra conversión" },
        { name: "Provisioning", reaction: "Crea recursos iniciales" },
      ],
    },
    {
      id: "db",
      action: "Se actualiza un pedido",
      actionIcon: <Database className="w-4 h-4" />,
      event: "order.updated (estado cambió)",
      consumers: [
        { name: "Inventario", reaction: "Ajusta stock" },
        { name: "Facturación", reaction: "Genera comprobante" },
        { name: "Notificaciones", reaction: "Avisa al cliente" },
      ],
    },
    {
      id: "message",
      action: "Llega un mensaje a una cola",
      actionIcon: <Mail className="w-4 h-4" />,
      event: "message.published (mensaje nuevo)",
      consumers: [
        { name: "Procesador", reaction: "Transforma el contenido" },
        { name: "Logger", reaction: "Registra en bitácora" },
        { name: "Router", reaction: "Reenvía al destino final" },
      ],
    },
  ];

  const classifyItems: ClassifyItem[] = [
    { id: "c1", text: "Se subió una imagen a Cloud Storage", isSignificant: true, explanation: "Sí — genera un evento object.finalize que puede disparar procesamiento." },
    { id: "c2", text: "Un desarrollador revisa código localmente", isSignificant: false, explanation: "No — es una acción local que no genera un evento observable en el sistema cloud." },
    { id: "c3", text: "Se eliminó un registro en Firestore", isSignificant: true, explanation: "Sí — genera un evento document.delete que otros servicios pueden consumir." },
    { id: "c4", text: "Un usuario cambia el estado de una VM", isSignificant: true, explanation: "Sí — genera un evento de audit log que puede activar alertas o automatización." },
    { id: "c5", text: "Alguien escribe una nota en su cuaderno", isSignificant: false, explanation: "No — es una acción fuera del sistema digital, no genera señal observable." },
    { id: "c6", text: "Se publica un mensaje en Pub/Sub", isSignificant: true, explanation: "Sí — es un evento que puede activar funciones, servicios o pipelines." },
  ];

  const selectScenario = (id: string) => {
    setSelectedScenario(id);
    setAnimationStep(0);
    setTimeout(() => setAnimationStep(1), 300);
    setTimeout(() => setAnimationStep(2), 1000);
    setTimeout(() => setAnimationStep(3), 1800);
  };

  const currentScenario = scenarios.find((s) => s.id === selectedScenario);

  const handleClassify = (id: string, answer: boolean) => {
    setClassifyAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-orange" />
            <h3 className="text-sm font-semibold text-foreground">
              Mapa de eventos — Acción → Evento → Reacción
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Elige una acción y observa cómo el evento se propaga y activa múltiples respuestas.
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

      {/* Tab switcher */}
      <div className="flex items-center gap-1 border-b border-border">
        <button
          onClick={() => setActiveTab("flow")}
          className={`px-3 py-2 text-xs font-medium border-b-2 transition-all ${
            activeTab === "flow"
              ? "border-orange text-orange"
              : "border-transparent text-text-secondary hover:text-foreground"
          }`}
        >
          <Zap className="w-3 h-3 inline mr-1" />
          Flujo del evento
        </button>
        <button
          onClick={() => setActiveTab("classify")}
          className={`px-3 py-2 text-xs font-medium border-b-2 transition-all ${
            activeTab === "classify"
              ? "border-azure text-azure"
              : "border-transparent text-text-secondary hover:text-foreground"
          }`}
        >
          <HelpCircle className="w-3 h-3 inline mr-1" />
          Clasifica eventos
        </button>
      </div>

      {activeTab === "flow" ? (
        <div className="space-y-4">
          {/* Scenario selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {scenarios.map((sc) => (
              <button
                key={sc.id}
                onClick={() => selectScenario(sc.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs border transition-all ${
                  selectedScenario === sc.id
                    ? "bg-orange/10 border-orange/30 text-orange"
                    : "border-border text-text-secondary hover:border-orange/20"
                }`}
              >
                {sc.actionIcon}
                <span className="font-medium text-left leading-tight">{sc.action}</span>
              </button>
            ))}
          </div>

          {/* Animation area */}
          {currentScenario && (
            <div className="rounded-lg border border-border bg-gray-900 p-4 space-y-4">
              {/* Step 1: Action */}
              <div className={`flex items-center gap-3 transition-all duration-500 ${
                animationStep >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange/20 border border-orange/30">
                  {currentScenario.actionIcon}
                  <span className="text-[11px] text-orange font-medium">{currentScenario.action}</span>
                </div>
                <span className="text-[9px] text-gray-500 uppercase tracking-wider">acción</span>
              </div>

              {/* Arrow */}
              <div className={`flex items-center gap-2 pl-6 transition-all duration-500 ${
                animationStep >= 2 ? "opacity-100" : "opacity-0"
              }`}>
                <ArrowRight className="w-4 h-4 text-cyan animate-pulse" />
                <span className="text-[9px] text-gray-500">genera</span>
              </div>

              {/* Step 2: Event */}
              <div className={`flex items-center gap-3 transition-all duration-500 ${
                animationStep >= 2 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyan/20 border border-cyan/30">
                  <Zap className="w-4 h-4 text-cyan" />
                  <div>
                    <span className="text-[11px] text-cyan font-medium block">{currentScenario.event}</span>
                    <span className="text-[9px] text-gray-400">
                      {viewMode === "gcp"
                        ? "vía Pub/Sub / Eventarc"
                        : viewMode === "aws"
                        ? "vía EventBridge / SNS"
                        : "registro inmutable del hecho"}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] text-gray-500 uppercase tracking-wider">evento</span>
              </div>

              {/* Arrow fan-out */}
              <div className={`flex items-center gap-2 pl-6 transition-all duration-500 ${
                animationStep >= 3 ? "opacity-100" : "opacity-0"
              }`}>
                <ArrowRight className="w-4 h-4 text-green" />
                <span className="text-[9px] text-gray-500">dispara reacciones</span>
              </div>

              {/* Step 3: Consumers */}
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 transition-all duration-500 ${
                animationStep >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                {currentScenario.consumers.map((c, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-green/10 border border-green/30 p-2.5 space-y-1"
                  >
                    <p className="text-[10px] font-semibold text-green">{c.name}</p>
                    <p className="text-[9px] text-gray-300">{c.reaction}</p>
                  </div>
                ))}
              </div>

              {animationStep >= 3 && (
                <p className="text-[9px] text-gray-500 text-center pt-2">
                  Un solo evento → múltiples reacciones independientes (fan-out)
                </p>
              )}
            </div>
          )}

          {!currentScenario && (
            <div className="rounded-lg border border-border bg-gray-900/50 p-6 text-center">
              <p className="text-xs text-text-secondary">Selecciona una acción para ver cómo se genera y propaga el evento</p>
            </div>
          )}
        </div>
      ) : (
        /* Classify tab */
        <div className="space-y-3">
          <p className="text-xs text-text-secondary">
            ¿Cuáles de estos casos generan un evento significativo en el sistema cloud?
          </p>
          <div className="space-y-2">
            {classifyItems.map((item) => {
              const answer = classifyAnswers[item.id];
              const isCorrect = answer === item.isSignificant;
              const hasAnswered = answer !== null && answer !== undefined;

              return (
                <div
                  key={item.id}
                  className={`rounded-lg border p-3 transition-all ${
                    hasAnswered
                      ? isCorrect
                        ? "border-green/30 bg-green/5"
                        : "border-red-300 bg-red-50"
                      : "border-border bg-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-foreground flex-1">{item.text}</p>
                    {!hasAnswered ? (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => handleClassify(item.id, true)}
                          className="px-2.5 py-1 rounded text-[10px] font-medium border border-green/30 text-green hover:bg-green/10 transition-colors"
                        >
                          Sí, es evento
                        </button>
                        <button
                          onClick={() => handleClassify(item.id, false)}
                          className="px-2.5 py-1 rounded text-[10px] font-medium border border-red-300 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <div className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-green" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {hasAnswered && (
                    <p className="text-[10px] text-text-secondary mt-1.5 pl-0.5">
                      {item.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setClassifyAnswers({})}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-text-secondary border border-border hover:border-azure/20 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reintentar
          </button>
        </div>
      )}

      {/* Info footer */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Evento =</span> registro inmutable de un hecho ocurrido. No es la acción completa, sino la señal que otros componentes pueden observar para reaccionar.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">En Google Cloud:</span> los eventos fluyen por Pub/Sub (mensajería) y Eventarc (enrutamiento de eventos de servicios GCP). Cloud Audit Logs genera eventos de actividad administrativa.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> EventBridge actúa como bus de eventos, SNS para notificaciones fan-out, SQS para colas. CloudTrail genera eventos de auditoría.
          </p>
        )}
      </div>
    </div>
  );
}
