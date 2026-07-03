"use client";

import { useState, useEffect, useRef } from "react";
import {
  Zap,
  Globe,
  Upload,
  MessageSquare,
  ArrowDown,
  ArrowRight,
  Server,
  Code2,
  Eye,
  EyeOff,
} from "lucide-react";

export function ServerlessExplainer() {
  const [showReality, setShowReality] = useState(false);
  const [trafficState, setTrafficState] = useState<"off" | "on">("off");
  const [triggerTab, setTriggerTab] = useState<"request" | "event">("request");
  const [instances, setInstances] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scaling animation
  useEffect(() => {
    if (trafficState === "on") {
      setAnimating(true);
      setInstances(1);
      timeoutRef.current = setTimeout(() => setInstances(3), 1200);
      return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
    } else {
      setInstances(0);
      setAnimating(false);
    }
  }, [trafficState]);

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-purple-500" />
          <h3 className="text-sm font-semibold text-foreground">
            ¿Qué significa realmente serverless?
          </h3>
        </div>
      </div>

      {/* Block 1: Myth vs Reality */}
      <div className="grid sm:grid-cols-2 gap-3">
        {/* Myth */}
        <div className="rounded-lg border border-red-200 bg-red-50/50 p-4 space-y-2">
          <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider">Mito</span>
          <p className="text-xs font-semibold text-foreground">
            &ldquo;Serverless = no existen servidores&rdquo;
          </p>
          <p className="text-[10px] text-text-secondary">
            Suena lógico por el nombre, pero no es así.
          </p>
        </div>

        {/* Reality */}
        <div
          className={`rounded-lg border-2 p-4 space-y-2 cursor-pointer transition-all ${
            showReality
              ? "border-green/40 bg-green/5"
              : "border-green/20 bg-white hover:border-green/30"
          }`}
          onClick={() => setShowReality(!showReality)}
        >
          <span className="text-[9px] font-bold text-green uppercase tracking-wider">Realidad</span>
          <p className="text-xs font-semibold text-foreground">
            &ldquo;Sí existen servidores, pero la plataforma los administra por ti&rdquo;
          </p>
          <p className="text-[10px] text-green font-medium">
            {showReality ? "▾ Ocultar capas" : "▸ Clic para ver las capas"}
          </p>
        </div>
      </div>

      {/* Block 2: Layers (shown after clicking Reality) */}
      {showReality && (
        <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300 max-w-sm mx-auto">
          {/* Layer 1: Your code */}
          <div className="rounded-lg border-2 border-purple-300 bg-purple-50 px-4 py-3 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[11px] font-bold text-purple-700">Tu código</span>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {["función", "lógica", "respuesta"].map((t) => (
                <span key={t} className="text-[9px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-3.5 h-3.5 text-text-secondary/40" />
          </div>

          {/* Layer 2: Managed platform */}
          <div className="rounded-lg border border-cyan/30 bg-cyan/5 px-4 py-3 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan" />
              <span className="text-[11px] font-bold text-cyan">Plataforma administrada</span>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {["aprovisiona", "ejecuta", "escala", "monitorea"].map((t) => (
                <span key={t} className="text-[9px] bg-cyan/10 text-cyan px-2 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-3.5 h-3.5 text-text-secondary/40" />
          </div>

          {/* Layer 3: Infrastructure (faded) */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-center space-y-1 opacity-40">
            <div className="flex items-center justify-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-[11px] font-bold text-gray-500">Infraestructura</span>
              <EyeOff className="w-3 h-3 text-gray-400" />
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {["servidores", "red", "SO", "cómputo"].map((t) => (
                <span key={t} className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[9px] text-text-secondary text-center pt-1 italic">
            La infraestructura existe, pero no la operas directamente.
          </p>
        </div>
      )}

      {/* Block 3: Traffic toggle */}
      <div className="rounded-lg border border-border bg-white p-4 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold text-foreground">¿Qué pasa con y sin tráfico?</p>
          <div className="flex items-center bg-grey-light rounded-lg p-0.5">
            <button
              onClick={() => setTrafficState("off")}
              className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
                trafficState === "off"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              Sin tráfico
            </button>
            <button
              onClick={() => setTrafficState("on")}
              className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
                trafficState === "on"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              Llega solicitud
            </button>
          </div>
        </div>

        {/* State visualization */}
        <div className="flex items-center gap-4 justify-center py-3 min-h-[80px]">
          {trafficState === "off" ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex gap-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="w-10 h-10 rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <span className="text-[9px] text-gray-300">—</span>
                  </div>
                ))}
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-text-secondary">0 instancias</p>
                <p className="text-[9px] text-text-secondary">Sin ejecución. La plataforma escala a cero.</p>
                <p className="text-[9px] text-green font-medium">No pagas por tiempo inactivo.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Incoming request */}
              <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${animating ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}>
                <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-[8px] text-purple-500 font-medium">request</span>
              </div>

              <ArrowRight className={`w-3.5 h-3.5 text-purple-300 transition-opacity duration-700 ${animating ? "opacity-100" : "opacity-0"}`} />

              {/* Active instances */}
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex gap-1.5">
                  {Array.from({ length: instances }).map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-md border-2 border-purple-300 bg-purple-50 flex items-center justify-center transition-all duration-300 animate-in fade-in zoom-in"
                      style={{ animationDelay: `${i * 300}ms` }}
                    >
                      <Zap className="w-4 h-4 text-purple-500" />
                    </div>
                  ))}
                </div>
                <p className="text-xs font-bold text-purple-600">{instances} instancia{instances !== 1 ? "s" : ""}</p>
                <p className="text-[9px] text-text-secondary">La plataforma activa y ejecuta tu función.</p>
              </div>

              <ArrowRight className={`w-3.5 h-3.5 text-green transition-opacity duration-1000 ${instances >= 1 ? "opacity-100" : "opacity-0"}`} />

              {/* Result */}
              <div className={`flex flex-col items-center gap-1 transition-all duration-700 ${instances >= 1 ? "opacity-100" : "opacity-0"}`}>
                <div className="w-9 h-9 rounded-full bg-green/10 border border-green/30 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-green" />
                </div>
                <span className="text-[8px] text-green font-medium">resultado</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Block 4: Request vs Event tabs */}
      <div className="rounded-lg border border-border bg-white p-4 space-y-3">
        <p className="text-[11px] font-bold text-foreground">¿Qué activa la función?</p>

        <div className="flex items-center bg-grey-light rounded-lg p-0.5 w-fit">
          <button
            onClick={() => setTriggerTab("request")}
            className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              triggerTab === "request"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Solicitud HTTP
          </button>
          <button
            onClick={() => setTriggerTab("event")}
            className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              triggerTab === "event"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Evento
          </button>
        </div>

        {triggerTab === "request" ? (
          <div className="space-y-2 animate-in fade-in duration-150">
            <p className="text-[10px] text-text-secondary italic">
              Ejemplo: un usuario envía un formulario
            </p>
            <div className="flex items-center gap-2 justify-center py-2">
              <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-purple-50 border border-purple-200">
                <Globe className="w-4 h-4 text-purple-500" />
                <span className="text-[9px] font-medium text-purple-600">HTTP request</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-text-secondary/40" />
              <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-cyan/10 border border-cyan/20">
                <Code2 className="w-4 h-4 text-cyan" />
                <span className="text-[9px] font-medium text-cyan">Función</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-text-secondary/40" />
              <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-green/10 border border-green/20">
                <Eye className="w-4 h-4 text-green" />
                <span className="text-[9px] font-medium text-green">Respuesta</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 animate-in fade-in duration-150">
            <p className="text-[10px] text-text-secondary italic">
              Ejemplo: se sube un archivo a Cloud Storage
            </p>
            <div className="flex items-center gap-2 justify-center py-2">
              <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-orange/10 border border-orange/20">
                <Upload className="w-4 h-4 text-orange" />
                <span className="text-[9px] font-medium text-orange">Evento</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-text-secondary/40" />
              <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-cyan/10 border border-cyan/20">
                <Code2 className="w-4 h-4 text-cyan" />
                <span className="text-[9px] font-medium text-cyan">Función</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-text-secondary/40" />
              <div className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg bg-green/10 border border-green/20">
                <MessageSquare className="w-4 h-4 text-green" />
                <span className="text-[9px] font-medium text-green">Acción auto.</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Block 5: Scaling visualization */}
      <div className="rounded-lg border border-border bg-gray-50 p-4 space-y-3">
        <p className="text-[11px] font-bold text-foreground">Escalado automático</p>

        <div className="flex items-center justify-between gap-2">
          {[
            { n: 0, label: "Sin uso", color: "border-gray-200 bg-white" },
            { n: 1, label: "1 solicitud", color: "border-purple-200 bg-purple-50" },
            { n: 3, label: "Tráfico alto", color: "border-purple-300 bg-purple-100" },
            { n: 0, label: "Vuelve a 0", color: "border-gray-200 bg-white" },
          ].map((state, i, arr) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex gap-0.5 min-h-[28px] items-end">
                  {state.n === 0 ? (
                    <div className="w-6 h-6 rounded border border-dashed border-gray-300 flex items-center justify-center">
                      <span className="text-[8px] text-gray-300">0</span>
                    </div>
                  ) : (
                    Array.from({ length: state.n }).map((_, j) => (
                      <div key={j} className={`w-5 h-5 rounded border ${state.color} flex items-center justify-center`}>
                        <Zap className="w-2.5 h-2.5 text-purple-400" />
                      </div>
                    ))
                  )}
                </div>
                <span className="text-[8px] text-text-secondary font-medium text-center">{state.label}</span>
              </div>
              {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-text-secondary/30 shrink-0" />}
            </div>
          ))}
        </div>

        <div className="text-[10px] text-text-secondary space-y-0.5 pt-1">
          <p>• Sin uso → puede escalar a cero (no pagas).</p>
          <p>• Más tráfico → crea más instancias automáticamente.</p>
          <p>• No configuras servidores para cada caso.</p>
        </div>
      </div>
    </div>
  );
}
