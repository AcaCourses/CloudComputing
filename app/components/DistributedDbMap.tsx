"use client";

import { useState } from "react";
import {
  Globe,
  Database,
  RefreshCw,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Scale,
  Server,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type Region = {
  id: string;
  name: string;
  location: string;
  color: string;
};

type ScenarioOption = {
  id: string;
  label: string;
  description: string;
  needsGlobal: boolean;
  explanation: string;
};

export function DistributedDbMap() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [syncActive, setSyncActive] = useState(false);
  const [modifiedRegion, setModifiedRegion] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  const regions: Region[] = [
    { id: "us", name: "América", location: "us-central1", color: "text-azure" },
    { id: "eu", name: "Europa", location: "europe-west1", color: "text-green" },
    { id: "asia", name: "Asia", location: "asia-east1", color: "text-orange" },
  ];

  const scenarios: ScenarioOption[] = [
    {
      id: "escolar",
      label: "Sistema escolar de una universidad",
      description: "Usuarios en una sola ciudad, carga moderada, horarios definidos.",
      needsGlobal: false,
      explanation: "No necesita distribución global. Una base SQL administrada en una sola región es suficiente para carga local y predecible.",
    },
    {
      id: "ecommerce",
      label: "Tienda en línea nacional",
      description: "Miles de usuarios en el mismo país, transacciones frecuentes.",
      needsGlobal: false,
      explanation: "Una base SQL administrada con réplicas de lectura puede manejar esta carga. No requiere distribución multi-región.",
    },
    {
      id: "finanzas",
      label: "App financiera internacional",
      description: "Transacciones desde múltiples continentes, consistencia crítica, cero tolerancia a pérdida de datos.",
      needsGlobal: true,
      explanation: "Requiere consistencia transaccional global y baja latencia multi-región. Caso ideal para Cloud Spanner o Aurora DSQL.",
    },
    {
      id: "gaming",
      label: "Plataforma de gaming global",
      description: "Millones de jugadores en todos los continentes, estados de juego en tiempo real.",
      needsGlobal: true,
      explanation: "Necesita escrituras y lecturas consistentes desde cualquier región sin conflictos. La distribución global es esencial.",
    },
  ];

  const activeScenario = scenarios.find((s) => s.id === selectedScenario);

  const simulateSync = (regionId: string) => {
    setModifiedRegion(regionId);
    setSyncActive(true);
    setTimeout(() => setSyncActive(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Base de datos distribuida y global
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Modifica un dato en una región y observa cómo se sincroniza en las demás.
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

      {/* Region map */}
      <div className="rounded-lg border border-border bg-gray-900 p-4">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {regions.map((region, i) => (
            <div key={region.id} className="flex items-center gap-4">
              <button
                onClick={() => simulateSync(region.id)}
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg border transition-all min-w-[110px] ${
                  modifiedRegion === region.id && syncActive
                    ? "border-cyan/50 bg-cyan/10 scale-105"
                    : modifiedRegion === region.id
                    ? "border-green/40 bg-green/10"
                    : syncActive && modifiedRegion !== region.id
                    ? "border-azure/30 bg-azure/5 animate-pulse"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                <MapPin className={`w-4 h-4 ${
                  modifiedRegion === region.id && syncActive ? "text-cyan" :
                  syncActive ? "text-azure" : region.color
                }`} />
                <div className="text-center">
                  <p className="text-[10px] font-semibold text-white">{region.name}</p>
                  <p className="text-[8px] text-gray-400">{region.location}</p>
                </div>
                {modifiedRegion === region.id && (
                  <span className="text-[7px] font-medium text-cyan bg-cyan/20 px-1.5 py-0.5 rounded">
                    ORIGEN
                  </span>
                )}
                {syncActive && modifiedRegion !== region.id && (
                  <span className="text-[7px] font-medium text-azure bg-azure/20 px-1.5 py-0.5 rounded">
                    SINCRONIZANDO
                  </span>
                )}
                {!syncActive && modifiedRegion && (
                  <span className="text-[7px] font-medium text-green bg-green/20 px-1.5 py-0.5 rounded">
                    CONSISTENTE
                  </span>
                )}
              </button>
              {i < regions.length - 1 && (
                <RefreshCw className={`w-3.5 h-3.5 shrink-0 transition-all ${
                  syncActive ? "text-azure animate-spin" : "text-gray-600"
                }`} />
              )}
            </div>
          ))}
        </div>
        {modifiedRegion && !syncActive && (
          <p className="text-center text-[9px] text-green mt-3">
            ✓ Dato modificado en {regions.find((r) => r.id === modifiedRegion)?.name} — sincronizado en todas las regiones
          </p>
        )}
        {!modifiedRegion && (
          <p className="text-center text-[9px] text-gray-500 mt-3">
            Haz clic en una región para simular una escritura
          </p>
        )}
      </div>

      {/* Characteristics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { icon: <Globe className="w-3.5 h-3.5" />, label: "Multi-región", desc: "Datos en varias ubicaciones" },
          { icon: <Shield className="w-3.5 h-3.5" />, label: "Consistente", desc: "Todos ven los mismos datos" },
          { icon: <Scale className="w-3.5 h-3.5" />, label: "Escalable", desc: "Crece horizontalmente" },
          { icon: <Zap className="w-3.5 h-3.5" />, label: "Baja latencia", desc: "Lee desde la región más cercana" },
        ].map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg border border-border text-center">
            <div className="text-azure">{c.icon}</div>
            <p className="text-[9px] font-semibold text-foreground">{c.label}</p>
            <p className="text-[8px] text-text-secondary">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Scenario selector */}
      <div className="border-t border-border pt-4 space-y-3">
        <p className="text-[10px] font-semibold text-foreground">¿Necesitas una base global?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedScenario(s.id)}
              className={`flex items-start gap-2.5 px-3 py-2.5 rounded-lg border text-left transition-all ${
                selectedScenario === s.id
                  ? "border-azure/30 bg-azure/5"
                  : "border-border hover:border-azure/20"
              }`}
            >
              <Server className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                selectedScenario === s.id ? "text-azure" : "text-text-secondary"
              }`} />
              <div>
                <p className={`text-[10px] font-semibold ${selectedScenario === s.id ? "text-azure" : "text-foreground"}`}>
                  {s.label}
                </p>
                <p className="text-[8px] text-text-secondary mt-0.5">{s.description}</p>
              </div>
            </button>
          ))}
        </div>

        {activeScenario && (
          <div className={`rounded-md border px-3 py-2.5 animate-in fade-in duration-200 ${
            activeScenario.needsGlobal
              ? "border-azure/20 bg-azure/5"
              : "border-green/20 bg-green/5"
          }`}>
            <div className="flex items-center gap-1.5 mb-1">
              {activeScenario.needsGlobal ? (
                <Globe className="w-3.5 h-3.5 text-azure" />
              ) : (
                <Database className="w-3.5 h-3.5 text-green" />
              )}
              <p className={`text-[10px] font-semibold ${activeScenario.needsGlobal ? "text-azure" : "text-green"}`}>
                {activeScenario.needsGlobal ? "Sí — necesita distribución global" : "No — basta con SQL administrado regional"}
              </p>
            </div>
            <p className="text-[9px] text-text-secondary">{activeScenario.explanation}</p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Base distribuida global =</span> datos replicados y sincronizados en múltiples regiones con consistencia transaccional. Útil para apps críticas con usuarios en varios continentes. No toda app lo necesita — es una decisión de arquitectura.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">Cloud Spanner:</span> Base relacional distribuida globalmente con consistencia fuerte (TrueTime). Semántica SQL completa, escalado horizontal, replicación multi-región sincronizada. Ideal para finanzas, gaming y e-commerce global.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> Aurora Global Database permite réplicas cross-region con baja latencia. Aurora DSQL apunta a distribución global con SQL. DynamoDB Global Tables ofrece replicación multi-región para NoSQL.
          </p>
        )}
      </div>
    </div>
  );
}
