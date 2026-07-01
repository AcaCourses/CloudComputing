"use client";

import { useState } from "react";
import {
  Box,
  Layers,
  Monitor,
  Cpu,
  HardDrive,
  Package,
  FileCode,
  Settings,
  ArrowDown,
  CheckCircle2,
  Container,
  Server,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type ContainerLayer = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  selected: boolean;
};

export function ContainerBuilder() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [activeTab, setActiveTab] = useState<"layers" | "build">("layers");
  const [buildSteps, setBuildSteps] = useState<ContainerLayer[]>([
    { id: "language", label: "Lenguaje", icon: <FileCode className="w-3.5 h-3.5" />, color: "azure", selected: false },
    { id: "deps", label: "Dependencias", icon: <Package className="w-3.5 h-3.5" />, color: "cyan", selected: false },
    { id: "config", label: "Configuración", icon: <Settings className="w-3.5 h-3.5" />, color: "green", selected: false },
    { id: "app", label: "Aplicación", icon: <Box className="w-3.5 h-3.5" />, color: "orange", selected: false },
  ]);

  const languages = ["Python", "Node.js", "Go", "Java"];
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedDeps, setSelectedDeps] = useState<string[]>([]);

  const depsByLang: Record<string, string[]> = {
    Python: ["Flask", "FastAPI", "requests", "numpy"],
    "Node.js": ["Express", "Next.js", "axios", "pg"],
    Go: ["gin", "gorilla/mux", "gorm", "cobra"],
    Java: ["Spring Boot", "Jakarta EE", "Gson", "JDBC"],
  };

  const toggleBuildStep = (id: string) => {
    setBuildSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const toggleDep = (dep: string) => {
    setSelectedDeps((prev) =>
      prev.includes(dep) ? prev.filter((d) => d !== dep) : [...prev, dep]
    );
  };

  const allSelected = buildSteps.every((s) => s.selected) && selectedLang;
  const containerReady = allSelected && selectedDeps.length > 0;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Container className="w-4 h-4 text-cyan" />
            <h3 className="text-sm font-semibold text-foreground">
              Contenedores vs Máquinas Virtuales
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Compara las capas de abstracción y empaqueta tu propia aplicación en un contenedor.
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
          onClick={() => setActiveTab("layers")}
          className={`px-3 py-2 text-xs font-medium border-b-2 transition-all ${
            activeTab === "layers"
              ? "border-azure text-azure"
              : "border-transparent text-text-secondary hover:text-foreground"
          }`}
        >
          <Layers className="w-3 h-3 inline mr-1" />
          Capas de abstracción
        </button>
        <button
          onClick={() => setActiveTab("build")}
          className={`px-3 py-2 text-xs font-medium border-b-2 transition-all ${
            activeTab === "build"
              ? "border-cyan text-cyan"
              : "border-transparent text-text-secondary hover:text-foreground"
          }`}
        >
          <Package className="w-3 h-3 inline mr-1" />
          Empaqueta tu app
        </button>
      </div>

      {activeTab === "layers" ? (
        /* Layer comparison: VM vs Container */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* VM Stack */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 mb-2">
              <Server className="w-3.5 h-3.5 text-text-secondary" />
              <h4 className="text-xs font-semibold text-foreground">Máquina Virtual</h4>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              {[
                { label: "Tu aplicación", color: "bg-orange/10 border-orange/20 text-orange", icon: <Box className="w-3 h-3" /> },
                { label: "Dependencias / Librerías", color: "bg-orange/5 border-orange/10 text-orange/80", icon: <Package className="w-3 h-3" /> },
                { label: "Sistema Operativo completo", color: "bg-purple-50 border-purple-100 text-purple-600", icon: <Monitor className="w-3 h-3" /> },
                { label: "Hypervisor", color: "bg-gray-50 border-gray-200 text-gray-600", icon: <Cpu className="w-3 h-3" /> },
                { label: "Hardware físico", color: "bg-gray-100 border-gray-300 text-gray-700", icon: <HardDrive className="w-3 h-3" /> },
              ].map((layer, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-3 py-2.5 border-b last:border-b-0 ${layer.color}`}
                >
                  {layer.icon}
                  <span className="text-[11px] font-medium">{layer.label}</span>
                </div>
              ))}
            </div>
            <div className="text-[9px] text-text-secondary text-center">
              Cada VM incluye un SO completo (~GB)
            </div>
          </div>

          {/* Container Stack */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 mb-2">
              <Container className="w-3.5 h-3.5 text-cyan" />
              <h4 className="text-xs font-semibold text-foreground">Contenedor</h4>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              {[
                { label: "Tu aplicación", color: "bg-orange/10 border-orange/20 text-orange", icon: <Box className="w-3 h-3" /> },
                { label: "Dependencias / Librerías", color: "bg-orange/5 border-orange/10 text-orange/80", icon: <Package className="w-3 h-3" /> },
                { label: "Container Runtime (compartido)", color: "bg-cyan/10 border-cyan/20 text-cyan", icon: <Container className="w-3 h-3" /> },
                { label: "Sistema Operativo del host", color: "bg-gray-50 border-gray-200 text-gray-600", icon: <Monitor className="w-3 h-3" /> },
                { label: "Hardware físico", color: "bg-gray-100 border-gray-300 text-gray-700", icon: <HardDrive className="w-3 h-3" /> },
              ].map((layer, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 px-3 py-2.5 border-b last:border-b-0 ${layer.color}`}
                >
                  {layer.icon}
                  <span className="text-[11px] font-medium">{layer.label}</span>
                </div>
              ))}
            </div>
            <div className="text-[9px] text-text-secondary text-center">
              Contenedores comparten el SO del host (~MB)
            </div>
          </div>

          {/* Key differences */}
          <div className="sm:col-span-2 rounded-lg border border-border bg-white/30 p-3">
            <h5 className="text-[10px] uppercase tracking-wider text-text-secondary font-medium mb-2">
              Diferencias clave
            </h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Tamaño", vm: "GBs", container: "MBs" },
                { label: "Inicio", vm: "Minutos", container: "Segundos" },
                { label: "Aislamiento", vm: "Completo (HW)", container: "Proceso (kernel)" },
                { label: "Portabilidad", vm: "Limitada", container: "Alta" },
              ].map((diff) => (
                <div key={diff.label} className="text-center">
                  <p className="text-[9px] text-text-secondary mb-0.5">{diff.label}</p>
                  <div className="flex items-center justify-center gap-1 text-[10px]">
                    <span className="text-gray-500">{diff.vm}</span>
                    <span className="text-text-secondary">→</span>
                    <span className="font-semibold text-cyan">{diff.container}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Build your container */
        <div className="space-y-4">
          {/* Language selection */}
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
              1. Elige tu lenguaje
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLang(lang);
                    setSelectedDeps([]);
                    setBuildSteps((prev) =>
                      prev.map((s) => (s.id === "language" ? { ...s, selected: true } : s))
                    );
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                    selectedLang === lang
                      ? "bg-azure/10 border-azure/30 text-azure"
                      : "border-border text-text-secondary hover:border-azure/20"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Dependencies */}
          {selectedLang && (
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
                2. Selecciona dependencias
              </p>
              <div className="flex flex-wrap gap-2">
                {depsByLang[selectedLang]?.map((dep) => (
                  <button
                    key={dep}
                    onClick={() => {
                      toggleDep(dep);
                      setBuildSteps((prev) =>
                        prev.map((s) => (s.id === "deps" ? { ...s, selected: true } : s))
                      );
                    }}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] font-medium border transition-all ${
                      selectedDeps.includes(dep)
                        ? "bg-cyan/10 border-cyan/30 text-cyan"
                        : "border-border text-text-secondary hover:border-cyan/20"
                    }`}
                  >
                    {dep}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Config & App toggles */}
          {selectedDeps.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
                3. Completa tu contenedor
              </p>
              <div className="flex flex-wrap gap-2">
                {buildSteps
                  .filter((s) => s.id === "config" || s.id === "app")
                  .map((step) => (
                    <button
                      key={step.id}
                      onClick={() => toggleBuildStep(step.id)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium border transition-all ${
                        step.selected
                          ? `bg-${step.color}/10 border-${step.color}/30 text-${step.color}`
                          : "border-border text-text-secondary hover:border-azure/20"
                      }`}
                    >
                      {step.icon}
                      {step.id === "config" ? "Agregar configuración (env vars, puerto)" : "Incluir código de la aplicación"}
                      {step.selected && <CheckCircle2 className="w-3 h-3" />}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Result: visual container */}
          <div className="rounded-lg border border-border bg-gray-900 p-4 space-y-2">
            <p className="text-[9px] uppercase tracking-wider text-gray-400 font-medium">
              {viewMode === "gcp"
                ? "Dockerfile → Artifact Registry → Cloud Run"
                : viewMode === "aws"
                ? "Dockerfile → ECR → ECS / App Runner"
                : "Tu contenedor"}
            </p>
            <div className="space-y-1">
              {selectedLang && (
                <div className="flex items-center gap-2 text-[11px] text-cyan font-mono">
                  <span className="text-gray-500">FROM</span>
                  <span>
                    {selectedLang === "Python"
                      ? "python:3.11-slim"
                      : selectedLang === "Node.js"
                      ? "node:20-alpine"
                      : selectedLang === "Go"
                      ? "golang:1.22-alpine"
                      : "eclipse-temurin:21-jre"}
                  </span>
                </div>
              )}
              {selectedDeps.length > 0 && (
                <div className="flex items-center gap-2 text-[11px] text-green font-mono">
                  <span className="text-gray-500">RUN</span>
                  <span>
                    {selectedLang === "Python"
                      ? `pip install ${selectedDeps.join(" ")}`
                      : selectedLang === "Node.js"
                      ? `npm install ${selectedDeps.join(" ")}`
                      : selectedLang === "Go"
                      ? `go get ${selectedDeps.join(" ")}`
                      : `mvn dependency:resolve`}
                  </span>
                </div>
              )}
              {buildSteps.find((s) => s.id === "config")?.selected && (
                <div className="flex items-center gap-2 text-[11px] text-orange font-mono">
                  <span className="text-gray-500">ENV</span>
                  <span>PORT=8080</span>
                </div>
              )}
              {buildSteps.find((s) => s.id === "app")?.selected && (
                <>
                  <div className="flex items-center gap-2 text-[11px] text-yellow-300 font-mono">
                    <span className="text-gray-500">COPY</span>
                    <span>. /app</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-purple-300 font-mono">
                    <span className="text-gray-500">CMD</span>
                    <span>
                      {selectedLang === "Python"
                        ? '["python", "app.py"]'
                        : selectedLang === "Node.js"
                        ? '["node", "index.js"]'
                        : selectedLang === "Go"
                        ? '["./main"]'
                        : '["java", "-jar", "app.jar"]'}
                    </span>
                  </div>
                </>
              )}
              {!selectedLang && (
                <p className="text-[11px] text-gray-500 italic">
                  Selecciona un lenguaje para comenzar a construir...
                </p>
              )}
            </div>
            {containerReady && (
              <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-green" />
                <p className="text-[10px] text-green font-medium">
                  Contenedor listo para construir y desplegar
                </p>
                {viewMode === "gcp" && (
                  <span className="text-[9px] text-gray-400 ml-auto font-mono">
                    gcloud run deploy --image gcr.io/my-project/app
                  </span>
                )}
                {viewMode === "aws" && (
                  <span className="text-[9px] text-gray-400 ml-auto font-mono">
                    aws ecs create-service --task-definition app
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
