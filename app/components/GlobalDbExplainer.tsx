"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Globe,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Send,
} from "lucide-react";

type ConsistencyMode = "strong" | "eventual";
type SyncPhase = "idle" | "sent" | "propagating" | "done";

const useCases = [
  { id: "school", label: "Sistema escolar local", needsGlobal: false, reason: "Usuarios locales, carga moderada. Una base regional es suficiente." },
  { id: "store", label: "Tienda nacional", needsGlobal: false, reason: "Un solo país. SQL administrado con réplicas de lectura probablemente basta." },
  { id: "finance", label: "App financiera internacional", needsGlobal: true, reason: "Múltiples continentes + transacciones críticas + consistencia = caso ideal." },
  { id: "gaming", label: "Plataforma global de gaming", needsGlobal: true, reason: "Usuarios en todo el mundo, estado compartido, baja latencia requerida." },
];

export function GlobalDbExplainer() {
  const [activeView, setActiveView] = useState<"local" | "global">("local");
  const [consistencyMode, setConsistencyMode] = useState<ConsistencyMode>("strong");
  const [showTrueTime, setShowTrueTime] = useState(false);
  const [selectedCases, setSelectedCases] = useState<Set<string>>(new Set());
  const [showCaseResults, setShowCaseResults] = useState(false);

  // Transaction sync state
  const [syncPhase, setSyncPhase] = useState<SyncPhase>("idle");
  const [originRegion, setOriginRegion] = useState<string | null>(null);
  const [regionBalances, setRegionBalances] = useState({
    europe: { from: 5000, to: 3200 },
    america: { from: 5000, to: 3200 },
    asia: { from: 5000, to: 3200 },
  });
  const [regionSynced, setRegionSynced] = useState({
    europe: false,
    america: false,
    asia: false,
  });
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Consistency timeline state
  const [timelinePhase, setTimelinePhase] = useState(0);
  const [timelineRunning, setTimelineRunning] = useState(false);
  const timelineRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const regions = [
    { id: "europe", label: "Europa", emoji: "🌍", person: "Carlos" },
    { id: "america", label: "América", emoji: "🌎", person: "María" },
    { id: "asia", label: "Asia", emoji: "🌏", person: "Yuki" },
  ];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    timelineRef.current.forEach(clearTimeout);
    timelineRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const triggerTransaction = (regionId: string) => {
    clearTimers();
    setOriginRegion(regionId);
    setSyncPhase("sent");
    setRegionSynced({ europe: false, america: false, asia: false });

    // Debit from origin immediately
    const newBalances = {
      europe: { from: 5000, to: 3200 },
      america: { from: 5000, to: 3200 },
      asia: { from: 5000, to: 3200 },
    };
    newBalances[regionId as keyof typeof newBalances] = { from: 4200, to: 4000 };
    setRegionBalances(newBalances);
    setRegionSynced((prev) => ({ ...prev, [regionId]: true }));

    if (consistencyMode === "strong") {
      // Strong: all regions update together after coordination
      const t = setTimeout(() => {
        setSyncPhase("done");
        setRegionBalances({
          europe: { from: 4200, to: 4000 },
          america: { from: 4200, to: 4000 },
          asia: { from: 4200, to: 4000 },
        });
        setRegionSynced({ europe: true, america: true, asia: true });
      }, 1200);
      timersRef.current.push(t);
    } else {
      // Eventual: regions update one by one with delays
      setSyncPhase("propagating");
      const otherRegions = regions.filter((r) => r.id !== regionId).map((r) => r.id);
      otherRegions.forEach((rId, i) => {
        const t = setTimeout(() => {
          setRegionBalances((prev) => ({
            ...prev,
            [rId]: { from: 4200, to: 4000 },
          }));
          setRegionSynced((prev) => ({ ...prev, [rId]: true }));
          if (i === otherRegions.length - 1) {
            setSyncPhase("done");
          }
        }, 1500 + i * 1800);
        timersRef.current.push(t);
      });
    }
  };

  const resetTransaction = () => {
    clearTimers();
    setSyncPhase("idle");
    setOriginRegion(null);
    setRegionBalances({
      europe: { from: 5000, to: 3200 },
      america: { from: 5000, to: 3200 },
      asia: { from: 5000, to: 3200 },
    });
    setRegionSynced({ europe: false, america: false, asia: false });
  };

  const runTimeline = () => {
    clearTimers();
    setTimelinePhase(0);
    setTimelineRunning(true);

    const totalSteps = consistencyMode === "strong" ? 4 : 6;
    for (let step = 1; step <= totalSteps; step++) {
      const t = setTimeout(() => {
        setTimelinePhase(step);
        if (step === totalSteps) setTimelineRunning(false);
      }, step * 900);
      timelineRef.current.push(t);
    }
  };

  const resetTimeline = () => {
    clearTimers();
    setTimelinePhase(0);
    setTimelineRunning(false);
  };

  const toggleCase = (id: string) => {
    setSelectedCases((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setShowCaseResults(false);
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Globe className="w-4 h-4 text-azure" />
          <h3 className="text-sm font-semibold text-foreground">
            Una sola base, varias regiones
          </h3>
        </div>
        <p className="text-xs text-text-secondary italic">
          ¿Cómo puede una base de datos estar en varios lugares y seguir actuando como si fuera una sola?
        </p>
      </div>

      {/* Block 1: Local vs Global */}
      <div className="grid sm:grid-cols-2 gap-3">
        <button
          onClick={() => { setActiveView("local"); resetTransaction(); resetTimeline(); }}
          className={`rounded-lg border-2 p-4 text-left transition-all ${
            activeView === "local"
              ? "border-azure/40 bg-azure/5"
              : "border-border bg-white hover:border-azure/20"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/Cloud SQL.svg" alt="SQL" className="w-5 h-5" />
            <span className="text-[11px] font-bold text-foreground">Base tradicional</span>
          </div>
          <ul className="space-y-0.5 text-[10px] text-text-secondary">
            <li>• Un solo lugar</li>
            <li>• Una sola ubicación principal</li>
            <li>• Útil para sistemas locales o pequeños</li>
          </ul>
        </button>

        <button
          onClick={() => { setActiveView("global"); resetTransaction(); resetTimeline(); }}
          className={`rounded-lg border-2 p-4 text-left transition-all ${
            activeView === "global"
              ? "border-purple-300 bg-purple-50/50"
              : "border-border bg-white hover:border-purple-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/Cloud Spanner.svg" alt="Spanner" className="w-5 h-5" />
            <span className="text-[11px] font-bold text-foreground">Base distribuida global</span>
          </div>
          <ul className="space-y-0.5 text-[10px] text-text-secondary">
            <li>• Múltiples regiones sincronizadas</li>
            <li>• Datos coordinados globalmente</li>
            <li>• Útil para sistemas críticos o internacionales</li>
          </ul>
        </button>
      </div>

      {/* Block 2: Transaction sync — banking scenario */}
      {activeView === "global" && (
        <div className="rounded-lg border border-border bg-white p-4 space-y-4 animate-in fade-in duration-200">
          <div>
            <p className="text-[11px] font-bold text-foreground mb-1">
              Transacción bancaria global
            </p>
            <p className="text-[10px] text-text-secondary">
              Carlos (Europa) transfiere <span className="font-semibold text-purple-600">$800</span> a María (América).
              La base registra el saldo en las 3 regiones.
              <br />
              <span className="italic">Haz clic en una región para iniciar la transferencia desde ahí.</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap py-2">
            {regions.map((region) => {
              const bal = regionBalances[region.id as keyof typeof regionBalances];
              const synced = regionSynced[region.id as keyof typeof regionSynced];
              const isOrigin = originRegion === region.id;

              return (
                <button
                  key={region.id}
                  onClick={() => { if (syncPhase === "idle") triggerTransaction(region.id); }}
                  disabled={syncPhase !== "idle"}
                  className={`relative flex flex-col items-center gap-1 px-4 py-3 rounded-lg border-2 transition-all min-w-[110px] ${
                    isOrigin
                      ? "border-purple-300 bg-purple-50"
                      : synced
                      ? "border-green/30 bg-green/5"
                      : syncPhase !== "idle" && !synced
                      ? "border-orange/30 bg-orange/5"
                      : "border-border hover:border-purple-200 cursor-pointer"
                  }`}
                >
                  <span className="text-lg">{region.emoji}</span>
                  <span className="text-[9px] font-medium text-text-secondary">{region.label}</span>
                  <div className="mt-1 space-y-0.5 text-center">
                    <div className="text-[9px] text-text-secondary">
                      Carlos: <span className={`font-mono font-bold ${bal.from < 5000 ? "text-red-500" : "text-foreground"}`}>${bal.from.toLocaleString()}</span>
                    </div>
                    <div className="text-[9px] text-text-secondary">
                      María: <span className={`font-mono font-bold ${bal.to > 3200 ? "text-green" : "text-foreground"}`}>${bal.to.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Status badge */}
                  {isOrigin && syncPhase !== "idle" && (
                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-purple-500">
                      <Send className="w-2 h-2 text-white" />
                    </span>
                  )}
                  {!isOrigin && synced && syncPhase !== "idle" && (
                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-green">
                      <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                    </span>
                  )}
                  {!isOrigin && !synced && syncPhase !== "idle" && (
                    <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center w-4 h-4 rounded-full bg-orange animate-pulse">
                      <Clock className="w-2.5 h-2.5 text-white" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress message */}
          {syncPhase === "sent" && consistencyMode === "strong" && (
            <p className="text-[10px] text-center text-purple-600 font-medium animate-pulse">
              🔒 Coordinando con todas las regiones antes de confirmar...
            </p>
          )}
          {syncPhase === "propagating" && consistencyMode === "eventual" && (
            <p className="text-[10px] text-center text-orange font-medium animate-pulse">
              ⏳ Propagando… algunas regiones aún ven el saldo anterior
            </p>
          )}
          {syncPhase === "done" && (
            <div className="text-center space-y-1">
              <p className="text-[10px] text-green font-medium">
                ✓ Transferencia completa — todas las regiones reflejan el nuevo saldo.
              </p>
              {consistencyMode === "eventual" && (
                <p className="text-[9px] text-orange/80">
                  ⚠️ Durante la propagación, María podría haber gastado un dinero que &quot;aún no le llegó&quot; en otra región.
                </p>
              )}
            </div>
          )}

          {syncPhase !== "idle" && (
            <div className="text-center">
              <button onClick={resetTransaction} className="text-[9px] text-text-secondary hover:text-foreground underline">
                Reiniciar
              </button>
            </div>
          )}
        </div>
      )}

      {/* Block 3: Consistency — visual timeline */}
      {activeView === "global" && (
        <div className="rounded-lg border border-border bg-white p-4 space-y-4">
          <p className="text-[11px] font-bold text-foreground">Consistencia: eventual vs fuerte</p>

          <div className="flex items-center bg-grey-light rounded-lg p-0.5 w-fit">
            <button
              onClick={() => { setConsistencyMode("eventual"); resetTransaction(); resetTimeline(); }}
              className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
                consistencyMode === "eventual"
                  ? "bg-white text-orange shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              Eventual
            </button>
            <button
              onClick={() => { setConsistencyMode("strong"); resetTransaction(); resetTimeline(); }}
              className={`px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
                consistencyMode === "strong"
                  ? "bg-white text-purple-600 shadow-sm"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              Fuerte (Spanner)
            </button>
          </div>

          {/* Visual timeline */}
          <div className="rounded-md border border-border bg-gray-50 p-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-semibold text-text-secondary uppercase tracking-wide">
                {consistencyMode === "strong" ? "Línea de tiempo — Consistencia fuerte" : "Línea de tiempo — Consistencia eventual"}
              </span>
              {!timelineRunning && (
                <button
                  onClick={runTimeline}
                  className="px-2.5 py-1 rounded bg-purple-100 text-purple-700 text-[9px] font-semibold hover:bg-purple-200 transition-colors"
                >
                  ▶ Simular
                </button>
              )}
              {timelineRunning && (
                <span className="text-[9px] text-purple-500 font-medium animate-pulse">Simulando...</span>
              )}
            </div>

            {consistencyMode === "strong" ? (
              /* STRONG consistency timeline */
              <div className="space-y-2">
                {/* Row: regions header */}
                <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-1 text-center">
                  <span className="text-[8px] text-text-secondary font-medium text-left">Paso</span>
                  <span className="text-[9px] font-medium">🌍 Europa</span>
                  <span className="text-[9px] font-medium">🌎 América</span>
                  <span className="text-[9px] font-medium">🌏 Asia</span>
                </div>

                {/* Step 1: Request */}
                <div className={`grid grid-cols-[80px_1fr_1fr_1fr] gap-1 items-center rounded p-1.5 transition-all duration-300 ${timelinePhase >= 1 ? "bg-purple-50 border border-purple-200" : "bg-white border border-transparent"}`}>
                  <span className="text-[8px] text-text-secondary">t=0 Solicitud</span>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 1 ? "bg-purple-200 text-purple-800" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 1 ? "LOCK 🔒" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 1 ? "bg-purple-200 text-purple-800" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 1 ? "LOCK 🔒" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 1 ? "bg-purple-200 text-purple-800" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 1 ? "LOCK 🔒" : "—"}
                  </div>
                </div>

                {/* Step 2: Coordinate */}
                <div className={`grid grid-cols-[80px_1fr_1fr_1fr] gap-1 items-center rounded p-1.5 transition-all duration-300 ${timelinePhase >= 2 ? "bg-purple-50 border border-purple-200" : "bg-white border border-transparent"}`}>
                  <span className="text-[8px] text-text-secondary">t=1 Coordinar</span>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 2 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 2 ? "OK ✓" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 2 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 2 ? "OK ✓" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 2 ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 2 ? "OK ✓" : "—"}
                  </div>
                </div>

                {/* Step 3: Commit */}
                <div className={`grid grid-cols-[80px_1fr_1fr_1fr] gap-1 items-center rounded p-1.5 transition-all duration-300 ${timelinePhase >= 3 ? "bg-green/5 border border-green/30" : "bg-white border border-transparent"}`}>
                  <span className="text-[8px] text-text-secondary">t=2 Confirmar</span>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 3 ? "bg-green/20 text-green" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 3 ? "$4,200 ✓" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 3 ? "bg-green/20 text-green" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 3 ? "$4,200 ✓" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 3 ? "bg-green/20 text-green" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 3 ? "$4,200 ✓" : "—"}
                  </div>
                </div>

                {/* Step 4: Result */}
                <div className={`grid grid-cols-[80px_1fr_1fr_1fr] gap-1 items-center rounded p-1.5 transition-all duration-300 ${timelinePhase >= 4 ? "bg-green/5 border border-green/30" : "bg-white border border-transparent"}`}>
                  <span className="text-[8px] text-green font-semibold">Resultado</span>
                  <div className="col-span-3">
                    {timelinePhase >= 4 && (
                      <p className="text-[9px] text-green font-medium text-center">
                        ✓ Todas las regiones ven el mismo saldo al mismo tiempo. Nadie vio datos incorrectos.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* EVENTUAL consistency timeline */
              <div className="space-y-2">
                {/* Row: regions header */}
                <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-1 text-center">
                  <span className="text-[8px] text-text-secondary font-medium text-left">Paso</span>
                  <span className="text-[9px] font-medium">🌍 Europa</span>
                  <span className="text-[9px] font-medium">🌎 América</span>
                  <span className="text-[9px] font-medium">🌏 Asia</span>
                </div>

                {/* Step 1: Write at origin */}
                <div className={`grid grid-cols-[80px_1fr_1fr_1fr] gap-1 items-center rounded p-1.5 transition-all duration-300 ${timelinePhase >= 1 ? "bg-purple-50 border border-purple-200" : "bg-white border border-transparent"}`}>
                  <span className="text-[8px] text-text-secondary">t=0 Escribir</span>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono transition-all ${timelinePhase >= 1 ? "bg-purple-200 text-purple-800" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 1 ? "$4,200 ✓" : "—"}
                  </div>
                  <div className="h-5 rounded flex items-center justify-center text-[8px] font-mono bg-gray-100 text-gray-400">
                    {timelinePhase >= 1 ? "$5,000 ✗" : "—"}
                  </div>
                  <div className="h-5 rounded flex items-center justify-center text-[8px] font-mono bg-gray-100 text-gray-400">
                    {timelinePhase >= 1 ? "$5,000 ✗" : "—"}
                  </div>
                </div>

                {/* Step 2: Still inconsistent */}
                <div className={`grid grid-cols-[80px_1fr_1fr_1fr] gap-1 items-center rounded p-1.5 transition-all duration-300 ${timelinePhase >= 2 ? "bg-orange/5 border border-orange/30" : "bg-white border border-transparent"}`}>
                  <span className="text-[8px] text-text-secondary">t=1</span>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono ${timelinePhase >= 2 ? "bg-green/20 text-green" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 2 ? "$4,200 ✓" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono ${timelinePhase >= 2 ? "bg-orange/20 text-orange" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 2 ? "$5,000 ✗" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono ${timelinePhase >= 2 ? "bg-orange/20 text-orange" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 2 ? "$5,000 ✗" : "—"}
                  </div>
                </div>

                {/* Step 3: One catches up */}
                <div className={`grid grid-cols-[80px_1fr_1fr_1fr] gap-1 items-center rounded p-1.5 transition-all duration-300 ${timelinePhase >= 3 ? "bg-orange/5 border border-orange/20" : "bg-white border border-transparent"}`}>
                  <span className="text-[8px] text-text-secondary">t=3</span>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono ${timelinePhase >= 3 ? "bg-green/20 text-green" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 3 ? "$4,200 ✓" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono ${timelinePhase >= 3 ? "bg-green/20 text-green" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 3 ? "$4,200 ✓" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono ${timelinePhase >= 3 ? "bg-orange/20 text-orange" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 3 ? "$5,000 ✗" : "—"}
                  </div>
                </div>

                {/* Step 4: danger zone */}
                {timelinePhase >= 4 && (
                  <div className="rounded p-2 bg-red-50 border border-red-200 animate-in fade-in duration-200">
                    <p className="text-[9px] text-red-700 font-medium">
                      ⚠️ Problema: Asia aún muestra $5,000. Si alguien consulta el saldo de Carlos desde Asia, verá un valor incorrecto y podría autorizar un gasto duplicado.
                    </p>
                  </div>
                )}

                {/* Step 5: finally syncs */}
                <div className={`grid grid-cols-[80px_1fr_1fr_1fr] gap-1 items-center rounded p-1.5 transition-all duration-300 ${timelinePhase >= 5 ? "bg-green/5 border border-green/30" : "bg-white border border-transparent"}`}>
                  <span className="text-[8px] text-text-secondary">t=5</span>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono ${timelinePhase >= 5 ? "bg-green/20 text-green" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 5 ? "$4,200 ✓" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono ${timelinePhase >= 5 ? "bg-green/20 text-green" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 5 ? "$4,200 ✓" : "—"}
                  </div>
                  <div className={`h-5 rounded flex items-center justify-center text-[8px] font-mono ${timelinePhase >= 5 ? "bg-green/20 text-green" : "bg-gray-100 text-gray-400"}`}>
                    {timelinePhase >= 5 ? "$4,200 ✓" : "—"}
                  </div>
                </div>

                {/* Step 6: Result */}
                {timelinePhase >= 6 && (
                  <div className="rounded p-2 bg-orange/5 border border-orange/30 animate-in fade-in duration-200">
                    <p className="text-[9px] text-orange font-medium">
                      Llegó, pero tarde. Entre t=0 y t=5, las regiones vieron datos distintos. En una app financiera, eso es inaceptable.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Reset timeline */}
            {timelinePhase > 0 && !timelineRunning && (
              <div className="text-center pt-1">
                <button onClick={resetTimeline} className="text-[9px] text-text-secondary hover:text-foreground underline">
                  Reiniciar línea de tiempo
                </button>
              </div>
            )}
          </div>

          {/* Summary cards */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className={`rounded-md border p-3 space-y-1.5 ${
              consistencyMode === "eventual" ? "border-orange/30 bg-orange/5" : "border-border"
            }`}>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange" />
                <span className="text-[10px] font-bold text-foreground">Eventual</span>
              </div>
              <p className="text-[9px] text-text-secondary">La escritura se confirma localmente y luego se propaga.</p>
              <p className="text-[9px] text-text-secondary font-medium text-orange">Ventana de inconsistencia: segundos a minutos.</p>
            </div>

            <div className={`rounded-md border p-3 space-y-1.5 ${
              consistencyMode === "strong" ? "border-purple-300 bg-purple-50" : "border-border"
            }`}>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500" />
                <span className="text-[10px] font-bold text-foreground">Fuerte (Spanner)</span>
              </div>
              <p className="text-[9px] text-text-secondary">Todas las regiones se coordinan ANTES de confirmar.</p>
              <p className="text-[9px] text-text-secondary font-medium text-purple-600">Ventana de inconsistencia: cero.</p>
            </div>
          </div>
        </div>
      )}

      {/* Block 4: TrueTime (collapsible) */}
      {activeView === "global" && (
        <div className="rounded-lg border border-border bg-white overflow-hidden">
          <button
            onClick={() => setShowTrueTime(!showTrueTime)}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
          >
            {showTrueTime ? (
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-text-secondary" />
            )}
            <span className="text-[10px] font-semibold text-foreground">
              ¿Cómo logra Spanner esa coordinación? (TrueTime)
            </span>
          </button>

          {showTrueTime && (
            <div className="px-4 pb-3 space-y-2 animate-in fade-in duration-200">
              <p className="text-[10px] text-text-secondary leading-relaxed">
                El problema de coordinar regiones es saber <span className="font-semibold">en qué orden</span> sucedieron las cosas.
                Si Europa y Asia escriben &quot;al mismo tiempo&quot;, ¿quién fue primero?
              </p>
              <p className="text-[10px] text-text-secondary leading-relaxed">
                <span className="font-semibold">TrueTime</span> es un reloj global de Google con precisión de microsegundos.
                Cada transacción recibe una marca de tiempo confiable, así el sistema sabe el orden exacto sin importar la distancia.
              </p>
              <p className="text-[10px] text-text-secondary leading-relaxed">
                Resultado: consistencia fuerte sin sacrificar distribución global.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Block 5: Scaling */}
      {activeView === "global" && (
        <div className="rounded-lg border border-border bg-gray-50 p-4 space-y-3">
          <p className="text-[11px] font-bold text-foreground">Escalado horizontal</p>
          <div className="flex items-center justify-between gap-2">
            {[
              { users: "10", nodes: 1 },
              { users: "1,000", nodes: 2 },
              { users: "100,000", nodes: 4 },
            ].map((state, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: state.nodes }).map((_, j) => (
                      <div key={j} className="w-5 h-5 rounded border border-purple-200 bg-purple-50 flex items-center justify-center">
                        <Globe className="w-2.5 h-2.5 text-purple-400" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[8px] text-text-secondary font-medium">{state.users} usuarios</span>
                </div>
                {i < arr.length - 1 && <ArrowRight className="w-3 h-3 text-text-secondary/30 shrink-0" />}
              </div>
            ))}
          </div>
          <p className="text-[9px] text-text-secondary">
            La base puede crecer horizontalmente agregando nodos. No depende de una sola máquina central.
          </p>
        </div>
      )}

      {/* Block 6: Decision - do you need it? */}
      <div className="rounded-lg border border-border bg-white p-4 space-y-3">
        <p className="text-[11px] font-bold text-foreground">¿Lo necesitas o no?</p>
        <p className="text-[10px] text-text-secondary">
          Selecciona los casos que crees que requieren una base global:
        </p>

        <div className="grid sm:grid-cols-2 gap-2">
          {useCases.map((uc) => (
            <button
              key={uc.id}
              onClick={() => toggleCase(uc.id)}
              className={`text-left px-3 py-2.5 rounded-md border transition-all text-[10px] ${
                selectedCases.has(uc.id)
                  ? "border-purple-300 bg-purple-50 font-medium text-foreground"
                  : "border-border hover:border-purple-200 text-text-secondary"
              }`}
            >
              {uc.label}
            </button>
          ))}
        </div>

        {selectedCases.size > 0 && !showCaseResults && (
          <div className="text-center">
            <button
              onClick={() => setShowCaseResults(true)}
              className="px-4 py-1.5 rounded-md bg-purple-100 text-purple-700 text-[10px] font-semibold hover:bg-purple-200 transition-colors"
            >
              Verificar
            </button>
          </div>
        )}

        {showCaseResults && (
          <div className="space-y-2 animate-in fade-in duration-200">
            {useCases.map((uc) => {
              if (!selectedCases.has(uc.id)) return null;
              const correct = uc.needsGlobal;
              return (
                <div
                  key={uc.id}
                  className={`flex items-start gap-2 px-3 py-2 rounded-md text-[9px] ${
                    correct
                      ? "bg-green/5 border border-green/20"
                      : "bg-orange/5 border border-orange/20"
                  }`}
                >
                  {correct ? (
                    <CheckCircle2 className="w-3 h-3 text-green shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 text-orange shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-medium text-foreground">{uc.label}: </span>
                    <span className="text-text-secondary">{uc.reason}</span>
                  </div>
                </div>
              );
            })}
            {useCases.filter((uc) => uc.needsGlobal && !selectedCases.has(uc.id)).length > 0 && (
              <p className="text-[9px] text-text-secondary italic">
                Hay casos que sí necesitan base global y no seleccionaste.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="rounded-lg bg-purple-50 border border-purple-200/60 px-4 py-3">
        <p className="text-[10px] text-purple-900 leading-relaxed">
          <span className="font-semibold">Idea clave:</span> una base global no vive en un solo lugar.
          Un cambio debe verse de forma consistente en todas las regiones.
          Aquí la decisión no es de moda, sino de necesidad arquitectónica.
        </p>
      </div>
    </div>
  );
}
