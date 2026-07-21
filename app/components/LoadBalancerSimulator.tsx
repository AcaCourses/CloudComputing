"use client";

import { useState, useRef } from "react";
import {
  Server,
  ArrowDown,
  Zap,
  ShieldCheck,
  XCircle,
  CheckCircle2,
  RotateCcw,
  Activity,
  AlertTriangle,
} from "lucide-react";

type ServerStatus = "available" | "busy" | "down";

type ServerNode = {
  id: string;
  label: string;
  status: ServerStatus;
  requests: number;
};

type LogEntry = {
  id: number;
  message: string;
  serverId: string | null;
  type: "success" | "redirect" | "error" | "info";
};

const initialServers: ServerNode[] = [
  { id: "a", label: "Servidor A", status: "available", requests: 0 },
  { id: "b", label: "Servidor B", status: "available", requests: 0 },
  { id: "c", label: "Servidor C", status: "available", requests: 0 },
];

const statusConfig: Record<
  ServerStatus,
  { color: string; bg: string; border: string; label: string; icon: typeof CheckCircle2 }
> = {
  available: {
    color: "text-green",
    bg: "bg-green/10",
    border: "border-green/30",
    label: "Disponible",
    icon: CheckCircle2,
  },
  busy: {
    color: "text-yellow",
    bg: "bg-yellow/10",
    border: "border-yellow/30",
    label: "Ocupado",
    icon: Activity,
  },
  down: {
    color: "text-red",
    bg: "bg-red/10",
    border: "border-red/30",
    label: "Fallando",
    icon: XCircle,
  },
};

export function LoadBalancerSimulator() {
  const [servers, setServers] = useState<ServerNode[]>(initialServers);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeServer, setActiveServer] = useState<string | null>(null);
  const [redirectFrom, setRedirectFrom] = useState<string | null>(null);
  const [algorithm, setAlgorithm] = useState<"round-robin" | "least-connections">(
    "round-robin"
  );

  // Use refs for mutable counters to avoid stale closures
  const logIdRef = useRef(0);
  const rrIndexRef = useRef(0);

  function addLog(
    message: string,
    serverId: string | null,
    type: LogEntry["type"]
  ) {
    logIdRef.current += 1;
    const entry: LogEntry = { id: logIdRef.current, message, serverId, type };
    setLogs((prev) => [entry, ...prev].slice(0, 15));
  }

  function toggleServerStatus(serverId: string) {
    setServers((prev) =>
      prev.map((s) => {
        if (s.id !== serverId) return s;
        const cycle: ServerStatus[] = ["available", "busy", "down"];
        const next = cycle[(cycle.indexOf(s.status) + 1) % cycle.length];
        return { ...s, status: next };
      })
    );
  }

  function sendRequest() {
    const currentServers = servers;
    const healthy = currentServers.filter((s) => s.status !== "down");
    const available = currentServers.filter((s) => s.status === "available");
    const down = currentServers.filter((s) => s.status === "down");

    // ── All servers down ──
    if (healthy.length === 0) {
      addLog(
        "🚫 TODOS los servidores están caídos — no se puede atender la petición. El usuario vería un error 503 (Service Unavailable).",
        null,
        "error"
      );
      return;
    }

    // ── Pick server by algorithm ──
    let chosen: ServerNode;

    if (algorithm === "round-robin") {
      const idx = rrIndexRef.current % healthy.length;
      chosen = healthy[idx];
      rrIndexRef.current += 1;
    } else {
      chosen = healthy.reduce((min, s) =>
        s.requests < min.requests ? s : min
      , healthy[0]);
    }

    // ── Handle redirect if chosen is busy ──
    if (chosen.status === "busy") {
      if (available.length > 0) {
        // Redirect to least-loaded available
        const target = available.reduce((min, s) =>
          s.requests < min.requests ? s : min
        , available[0]);

        // Visual: flash the busy server in yellow, then the target in blue
        setRedirectFrom(chosen.id);
        setActiveServer(target.id);
        setTimeout(() => {
          setRedirectFrom(null);
          setActiveServer(null);
        }, 2000);

        addLog(
          `🔀 Petición #${logIdRef.current + 1}: el LB eligió ${chosen.label} (round-robin), pero está OCUPADO → redirigida a ${target.label}`,
          target.id,
          "redirect"
        );

        setServers((prev) =>
          prev.map((s) =>
            s.id === target.id ? { ...s, requests: s.requests + 1 } : s
          )
        );
        return;
      }

      // All healthy are busy — no free ones
      setActiveServer(chosen.id);
      setTimeout(() => setActiveServer(null), 2000);

      addLog(
        `⏳ Petición #${logIdRef.current + 1}: TODOS los servidores sanos están ocupados — petición encolada en ${chosen.label}. Tiempos de respuesta serán más lentos.`,
        chosen.id,
        "info"
      );

      setServers((prev) =>
        prev.map((s) =>
          s.id === chosen.id ? { ...s, requests: s.requests + 1 } : s
        )
      );
      return;
    }

    // ── Normal: chosen is available ──
    setActiveServer(chosen.id);
    setTimeout(() => setActiveServer(null), 1800);

    // Extra context if some servers are down
    const downNote =
      down.length > 0
        ? ` (${down.map((d) => d.label).join(", ")} ${down.length === 1 ? "está" : "están"} caído${down.length === 1 ? "" : "s"} — health check los excluyó)`
        : "";

    addLog(
      `✅ Petición #${logIdRef.current + 1}: enviada a ${chosen.label}${downNote}`,
      chosen.id,
      "success"
    );

    setServers((prev) =>
      prev.map((s) =>
        s.id === chosen.id ? { ...s, requests: s.requests + 1 } : s
      )
    );
  }

  function reset() {
    setServers(initialServers);
    setLogs([]);
    logIdRef.current = 0;
    rrIndexRef.current = 0;
    setActiveServer(null);
    setRedirectFrom(null);
  }

  const totalRequests = servers.reduce((sum, s) => sum + s.requests, 0);
  const healthyCount = servers.filter((s) => s.status !== "down").length;
  const allBusy =
    healthyCount > 0 &&
    servers.filter((s) => s.status !== "down").every((s) => s.status === "busy");

  return (
    <div className="rounded-2xl border border-border bg-panel/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-azure/5 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-azure" />
          <h3 className="text-lg font-bold text-foreground">
            Simulador de Load Balancer
          </h3>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Haz clic en &quot;Enviar petición&quot; y observa cómo el balanceador
          reparte el tráfico. Cambia el estado de los servidores haciendo clic en
          ellos.
        </p>
      </div>

      <div className="p-6">
        {/* Load Balancer box */}
        <div className="text-center mb-6">
          <div className="inline-flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 border-azure/40 bg-azure/5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-azure" />
              <span className="font-bold text-foreground">Load Balancer</span>
            </div>
            <span className="text-xs text-text-secondary">
              Recibe todas las peticiones y decide a qué servidor enviarlas
            </span>
          </div>

          {/* Animated arrows to each server */}
          <div className="flex justify-center gap-12 sm:gap-20 my-3">
            {servers.map((s) => {
              const isTarget = activeServer === s.id;
              const isRedirectSource = redirectFrom === s.id;
              return (
                <div key={s.id} className="flex flex-col items-center">
                  <ArrowDown
                    className={`w-5 h-5 transition-all duration-300 ${
                      isTarget
                        ? "text-azure scale-125 animate-bounce"
                        : isRedirectSource
                          ? "text-yellow scale-110"
                          : "text-text-secondary/30"
                    }`}
                  />
                  {isTarget && (
                    <span className="text-[10px] font-bold text-azure animate-pulse">
                      ← aquí
                    </span>
                  )}
                  {isRedirectSource && (
                    <span className="text-[10px] font-bold text-yellow animate-pulse">
                      ocupado
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Status banner */}
        {healthyCount === 0 && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red/10 border border-red/30 text-sm text-red">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Todos los servidores están caídos.</strong> El load
              balancer no puede enviar tráfico a ningún backend. Los usuarios
              verían un error 503.
            </span>
          </div>
        )}
        {allBusy && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-yellow/10 border border-yellow/30 text-sm text-text-secondary">
            <Activity className="w-4 h-4 shrink-0 text-yellow" />
            <span>
              <strong className="text-foreground">
                Todos los servidores sanos están ocupados.
              </strong>{" "}
              Las peticiones se encolan pero los tiempos de respuesta subirán.
              En producción, el autoscaler agregaría más instancias.
            </span>
          </div>
        )}

        {/* Servers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {servers.map((server) => {
            const cfg = statusConfig[server.status];
            const StatusIcon = cfg.icon;
            const isTarget = activeServer === server.id;
            const isRedirectSource = redirectFrom === server.id;

            return (
              <button
                key={server.id}
                onClick={() => toggleServerStatus(server.id)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left cursor-pointer ${cfg.border} ${cfg.bg} ${
                  isTarget
                    ? "scale-105 shadow-lg ring-2 ring-azure/50"
                    : isRedirectSource
                      ? "scale-105 shadow-lg ring-2 ring-yellow/50"
                      : "hover:scale-[1.02]"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Server className={`w-5 h-5 ${cfg.color}`} />
                  <span className="font-semibold text-foreground text-sm">
                    {server.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <StatusIcon className={`w-3.5 h-3.5 ${cfg.color}`} />
                  <span className={`text-xs font-medium ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
                <div className="text-xs text-text-secondary">
                  Peticiones atendidas:{" "}
                  <span className="font-bold text-foreground">
                    {server.requests}
                  </span>
                </div>
                {isTarget && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-azure animate-ping" />
                )}
                {isRedirectSource && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow animate-ping" />
                )}
                <span className="absolute top-2 right-2 text-[10px] text-text-secondary opacity-60">
                  clic para cambiar
                </span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={sendRequest}
            className="px-5 py-2.5 bg-azure text-white rounded-lg text-sm font-semibold hover:bg-azure/90 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Enviar petición
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-panel transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
          <div className="ml-auto flex items-center gap-2">
            <label className="text-xs text-text-secondary">Algoritmo:</label>
            <select
              value={algorithm}
              onChange={(e) =>
                setAlgorithm(
                  e.target.value as "round-robin" | "least-connections"
                )
              }
              className="text-xs border border-border rounded-lg px-2 py-1.5 bg-background text-foreground"
            >
              <option value="round-robin">Round Robin</option>
              <option value="least-connections">Menos cargado</option>
            </select>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-background border border-border text-center">
            <div className="text-2xl font-bold text-foreground">
              {totalRequests}
            </div>
            <div className="text-xs text-text-secondary">Peticiones totales</div>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border text-center">
            <div
              className={`text-2xl font-bold ${
                healthyCount === 3
                  ? "text-green"
                  : healthyCount > 0
                    ? "text-yellow"
                    : "text-red"
              }`}
            >
              {healthyCount}/3
            </div>
            <div className="text-xs text-text-secondary">Servidores sanos</div>
          </div>
          <div className="p-3 rounded-lg bg-background border border-border text-center">
            <div className="text-2xl font-bold text-azure">
              {algorithm === "round-robin" ? "RR" : "LC"}
            </div>
            <div className="text-xs text-text-secondary">Algoritmo activo</div>
          </div>
        </div>

        {/* Log */}
        {logs.length > 0 && (
          <div className="rounded-xl border border-border bg-background overflow-hidden">
            <div className="px-4 py-2 bg-panel border-b border-border flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                Registro de peticiones
              </span>
              <span className="text-[10px] text-text-secondary">
                más reciente arriba
              </span>
            </div>
            <div className="max-h-56 overflow-y-auto divide-y divide-border">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className={`px-4 py-2.5 text-sm flex items-start gap-2 ${
                    log.type === "error"
                      ? "bg-red/5"
                      : log.type === "redirect"
                        ? "bg-yellow/5"
                        : log.type === "info"
                          ? "bg-azure/5"
                          : ""
                  }`}
                >
                  <span
                    className={`font-mono text-xs mt-0.5 shrink-0 ${
                      log.type === "error"
                        ? "text-red"
                        : log.type === "redirect"
                          ? "text-yellow"
                          : log.type === "info"
                            ? "text-azure"
                            : "text-green"
                    }`}
                  >
                    #{log.id}
                  </span>
                  <span
                    className={`${
                      log.type === "error" ? "text-red" : "text-text-secondary"
                    }`}
                  >
                    {log.message}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
