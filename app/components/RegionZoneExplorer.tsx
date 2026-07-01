"use client";

import { useState } from "react";
import {
  Globe,
  MapPin,
  Server,
  ChevronRight,
  CheckCircle2,
  X,
  Cpu,
  MemoryStick,
  Zap,
  Shield,
  Info,
} from "lucide-react";

type Zone = {
  id: string;
  label: string;
};

type Region = {
  id: string;
  label: string;
  location: string;
  zones: Zone[];
  latencyHint: string;
  awsEquivalent: string;
};

const regions: Region[] = [
  {
    id: "us-central1",
    label: "us-central1",
    location: "Iowa, EE.UU.",
    zones: [
      { id: "us-central1-a", label: "us-central1-a" },
      { id: "us-central1-b", label: "us-central1-b" },
      { id: "us-central1-c", label: "us-central1-c" },
      { id: "us-central1-f", label: "us-central1-f" },
    ],
    latencyHint: "Buena para América del Norte y Latinoamérica norte",
    awsEquivalent: "us-east-1 / us-east-2",
  },
  {
    id: "us-east1",
    label: "us-east1",
    location: "Carolina del Sur, EE.UU.",
    zones: [
      { id: "us-east1-b", label: "us-east1-b" },
      { id: "us-east1-c", label: "us-east1-c" },
      { id: "us-east1-d", label: "us-east1-d" },
    ],
    latencyHint: "Cercana a costa este de EE.UU. y Europa",
    awsEquivalent: "us-east-1",
  },
  {
    id: "southamerica-east1",
    label: "southamerica-east1",
    location: "São Paulo, Brasil",
    zones: [
      { id: "southamerica-east1-a", label: "southamerica-east1-a" },
      { id: "southamerica-east1-b", label: "southamerica-east1-b" },
      { id: "southamerica-east1-c", label: "southamerica-east1-c" },
    ],
    latencyHint: "Ideal para Latinoamérica sur (Brasil, Argentina, Chile)",
    awsEquivalent: "sa-east-1",
  },
  {
    id: "europe-west1",
    label: "europe-west1",
    location: "Bélgica",
    zones: [
      { id: "europe-west1-b", label: "europe-west1-b" },
      { id: "europe-west1-c", label: "europe-west1-c" },
      { id: "europe-west1-d", label: "europe-west1-d" },
    ],
    latencyHint: "Baja latencia para Europa occidental",
    awsEquivalent: "eu-west-1",
  },
  {
    id: "asia-east1",
    label: "asia-east1",
    location: "Taiwán",
    zones: [
      { id: "asia-east1-a", label: "asia-east1-a" },
      { id: "asia-east1-b", label: "asia-east1-b" },
      { id: "asia-east1-c", label: "asia-east1-c" },
    ],
    latencyHint: "Buena para Asia-Pacífico oriental",
    awsEquivalent: "ap-northeast-1",
  },
];

type MachineProfile = {
  id: string;
  label: string;
  family: string;
  gcpType: string;
  awsType: string;
  cpu: number;
  memory: number;
  useCase: string;
  color: string;
};

const machineProfiles: MachineProfile[] = [
  { id: "general", label: "Uso general", family: "E2 / N2", gcpType: "e2-standard-4", awsType: "t3.xlarge", cpu: 4, memory: 16, useCase: "Aplicaciones web, APIs, servicios mixtos", color: "text-azure" },
  { id: "compute", label: "Cómputo intensivo", family: "C2 / C2D", gcpType: "c2-standard-8", awsType: "c5.2xlarge", cpu: 8, memory: 16, useCase: "Procesamiento batch, compilación, simulaciones", color: "text-cyan" },
  { id: "memory", label: "Alta memoria", family: "M2 / N2-highmem", gcpType: "n2-highmem-4", awsType: "r5.xlarge", cpu: 4, memory: 32, useCase: "Bases de datos en memoria, caché, análisis", color: "text-green" },
  { id: "accelerator", label: "Aceleradores (GPU)", family: "A2 / G2", gcpType: "a2-highgpu-1g", awsType: "p3.2xlarge", cpu: 12, memory: 85, useCase: "Machine learning, IA, renderizado", color: "text-orange" },
];

type DeployScenario = {
  id: string;
  title: string;
  description: string;
  idealRegion: string;
  idealZones: number;
  idealMachine: string;
  feedback: string;
};

const scenarios: DeployScenario[] = [
  {
    id: "university",
    title: "App para estudiantes en México",
    description: "Plataforma educativa con usuarios en una sola región geográfica. Tráfico moderado, disponibilidad estándar.",
    idealRegion: "us-central1",
    idealZones: 1,
    idealMachine: "general",
    feedback: "Correcta elección. us-central1 ofrece buena latencia para México. Con tráfico moderado, una zona y tipo general son suficientes.",
  },
  {
    id: "institutional",
    title: "Sistema institucional con alta disponibilidad",
    description: "Portal académico crítico que no puede caer. Necesita redundancia ante fallos de infraestructura.",
    idealRegion: "us-central1",
    idealZones: 2,
    idealMachine: "general",
    feedback: "Bien pensado. Distribuir en 2+ zonas da redundancia: si una zona falla, la otra sigue sirviendo. Para un portal web, tipo general es adecuado.",
  },
  {
    id: "ailab",
    title: "Laboratorio de IA con GPU",
    description: "Entrenamiento de modelos de ML que requiere GPU y alta memoria. Uso intensivo pero no permanente.",
    idealRegion: "us-central1",
    idealZones: 1,
    idealMachine: "accelerator",
    feedback: "Perfecto. Las cargas de IA necesitan GPU (tipo acelerador). Una zona basta para laboratorio. Usa VMs preemptibles/spot para ahorrar.",
  },
];

type ViewMode = "concept" | "gcp" | "aws";

export function RegionZoneExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedZones, setSelectedZones] = useState<Set<string>>(new Set());
  const [selectedMachine, setSelectedMachine] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const region = regions.find((r) => r.id === selectedRegion);
  const machine = machineProfiles.find((m) => m.id === selectedMachine);
  const scenario = scenarios.find((s) => s.id === activeScenario);

  const toggleZone = (zoneId: string) => {
    setSelectedZones((prev) => {
      const next = new Set(prev);
      if (next.has(zoneId)) next.delete(zoneId);
      else next.add(zoneId);
      return next;
    });
  };

  const checkScenario = () => {
    setShowFeedback(true);
  };

  const resetScenario = () => {
    setSelectedRegion(null);
    setSelectedZones(new Set());
    setSelectedMachine(null);
    setShowFeedback(false);
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Regiones, zonas y tipos de máquina
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Elige dónde desplegar y con qué capacidad. Selecciona un escenario para practicar.
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

      {/* Scenario selector */}
      <div className="space-y-1.5">
        <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
          Escenario de despliegue
        </p>
        <div className="flex flex-wrap gap-1.5">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActiveScenario(s.id); resetScenario(); setActiveScenario(s.id); }}
              className={`px-2.5 py-1.5 rounded-md text-[10px] font-medium border transition-all ${
                activeScenario === s.id
                  ? "border-azure/40 bg-azure/10 text-azure"
                  : "border-border text-text-secondary hover:border-azure/20"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
        {scenario && (
          <p className="text-xs text-text-secondary italic px-1">
            {scenario.description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left: Region & Zone selection */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-medium">
              <MapPin className="w-3 h-3" />
              {viewMode === "aws" ? "AWS Region" : "Región"}
            </div>
            <div className="space-y-1">
              {regions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setSelectedRegion(r.id); setSelectedZones(new Set()); }}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md border text-xs text-left transition-all ${
                    selectedRegion === r.id
                      ? "border-azure/40 bg-azure/5"
                      : "border-border hover:border-azure/20"
                  }`}
                >
                  <Globe className={`w-3.5 h-3.5 ${selectedRegion === r.id ? "text-azure" : "text-text-secondary"}`} />
                  <div className="flex-1">
                    <span className={`font-mono font-semibold ${selectedRegion === r.id ? "text-foreground" : "text-text-secondary"}`}>
                      {viewMode === "aws" ? r.awsEquivalent : r.id}
                    </span>
                    <span className="text-[10px] text-text-secondary ml-2">{r.location}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Zones */}
          {region && (
            <div className="space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-medium">
                <Shield className="w-3 h-3" />
                {viewMode === "aws" ? "Availability Zones" : "Zonas disponibles"}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {region.zones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => toggleZone(z.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-md border text-[10px] font-mono transition-all ${
                      selectedZones.has(z.id)
                        ? "border-green/40 bg-green/5 text-green font-semibold"
                        : "border-border text-text-secondary hover:border-green/20"
                    }`}
                  >
                    {selectedZones.has(z.id) && <CheckCircle2 className="w-3 h-3 text-green" />}
                    <span>{z.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-text-secondary italic">
                {region.latencyHint}
              </p>
              {selectedZones.size >= 2 && (
                <div className="flex items-start gap-1.5 text-[10px] text-green bg-green/5 border border-green/20 rounded-md px-2.5 py-1.5">
                  <Shield className="w-3 h-3 shrink-0 mt-0.5" />
                  <span>Redundancia multi-zona: si una zona falla, la otra sigue sirviendo.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Machine type selection */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-medium">
              <Server className="w-3 h-3" />
              Tipo de máquina
            </div>
            <div className="space-y-1.5">
              {machineProfiles.map((mp) => (
                <button
                  key={mp.id}
                  onClick={() => setSelectedMachine(mp.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-md border transition-all ${
                    selectedMachine === mp.id
                      ? "border-azure/40 bg-azure/5"
                      : "border-border hover:border-azure/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-semibold ${selectedMachine === mp.id ? "text-foreground" : "text-text-secondary"}`}>
                      {mp.label}
                    </span>
                    <span className="text-[9px] font-mono text-text-secondary">
                      {viewMode === "gcp" ? mp.gcpType : viewMode === "aws" ? mp.awsType : mp.family}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-text-secondary">
                    <span className="flex items-center gap-0.5">
                      <Cpu className="w-3 h-3" /> {mp.cpu} vCPU
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MemoryStick className="w-3 h-3" /> {mp.memory} GB
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary mt-1">{mp.useCase}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Decision check */}
          {scenario && selectedRegion && selectedZones.size > 0 && selectedMachine && !showFeedback && (
            <button
              onClick={checkScenario}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-azure text-white text-xs font-semibold hover:bg-azure/90 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              Verificar mi decisión
            </button>
          )}

          {/* Feedback */}
          {showFeedback && scenario && (
            <div className="rounded-lg border border-green/30 bg-green/5 p-3 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-green" />
                <span className="text-xs font-semibold text-green">Retroalimentación</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                {scenario.feedback}
              </p>
              <div className="text-[10px] text-text-secondary space-y-0.5">
                <p><span className="font-medium">Región sugerida:</span> {scenario.idealRegion}</p>
                <p><span className="font-medium">Zonas recomendadas:</span> {scenario.idealZones}+</p>
                <p><span className="font-medium">Tipo sugerido:</span> {machineProfiles.find(m => m.id === scenario.idealMachine)?.label}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
