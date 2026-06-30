"use client";

import { useState } from "react";
import { ArrowLeftRight, Eye, Layers } from "lucide-react";

type Equivalence = {
  concept: string;
  aws: string;
  azure: string;
  gcp: string;
};

const equivalences: Equivalence[] = [
  { concept: "Máquinas virtuales", aws: "EC2", azure: "Virtual Machines", gcp: "Compute Engine" },
  { concept: "Almacenamiento de objetos", aws: "S3", azure: "Blob Storage", gcp: "Cloud Storage" },
  { concept: "Base de datos relacional", aws: "RDS", azure: "Azure SQL Database", gcp: "Cloud SQL" },
  { concept: "Funciones serverless", aws: "Lambda", azure: "Azure Functions", gcp: "Cloud Functions" },
  { concept: "Contenedores orquestados", aws: "EKS", azure: "AKS", gcp: "GKE" },
];

type ViewMode = "concept" | "provider";

export function ProviderExplorer() {
  const [mode, setMode] = useState<ViewMode>("concept");
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const [revealedRows, setRevealedRows] = useState<Record<number, boolean>>({});

  const toggleReveal = (i: number) => {
    setRevealedRows((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Equivalencias entre proveedores
          </h3>
          <p className="text-xs text-text-secondary">
            Los nombres cambian, el concepto permanece. Alterna entre vistas para comprobarlo.
          </p>
        </div>
        {/* Mode toggle */}
        <div className="flex items-center bg-grey-light rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => setMode("concept")}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              mode === "concept"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            <Layers className="w-3 h-3" />
            Concepto
          </button>
          <button
            onClick={() => setMode("provider")}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              mode === "provider"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            <ArrowLeftRight className="w-3 h-3" />
            Proveedor
          </button>
        </div>
      </div>

      {/* Concept mode: show concepts with reveal */}
      {mode === "concept" && (
        <div className="space-y-2">
          {equivalences.map((eq, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveRow(i)}
              onMouseLeave={() => setActiveRow(null)}
              className={`rounded-lg border overflow-hidden transition-all duration-300 ${
                activeRow === i ? "border-azure/40 shadow-sm" : "border-border"
              }`}
            >
              <button
                onClick={() => toggleReveal(i)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-grey-light/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-azure/10 flex items-center justify-center text-[10px] font-mono font-bold text-azure">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-foreground">{eq.concept}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-azure/10 text-azure font-medium">
                  {revealedRows[i] ? "Ocultar" : "Ver equivalencias"}
                </span>
              </button>
              {revealedRows[i] && (
                <div className="px-4 py-3 border-t border-border/50 bg-azure/5 grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <span className="text-[10px] font-semibold text-text-secondary block mb-1">AWS</span>
                    <span className="text-xs font-mono font-bold text-orange bg-orange/10 px-2 py-1 rounded-md inline-block">{eq.aws}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-semibold text-text-secondary block mb-1">Azure</span>
                    <span className="text-xs font-mono font-bold text-azure bg-azure/10 px-2 py-1 rounded-md inline-block">{eq.azure}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-semibold text-text-secondary block mb-1">GCP</span>
                    <span className="text-xs font-mono font-bold text-green-dark bg-green/10 px-2 py-1 rounded-md inline-block">{eq.gcp}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          <p className="text-[10px] text-text-secondary text-center italic pt-1">
            <Eye className="w-3 h-3 inline mr-1" />
            Haz clic en cada concepto para revelar sus nombres en cada proveedor
          </p>
        </div>
      )}

      {/* Provider mode: side-by-side columns */}
      {mode === "provider" && (
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 gap-px bg-border rounded-lg overflow-hidden min-w-[500px]">
            {/* Headers */}
            <div className="bg-panel px-3 py-2.5">
              <span className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">Concepto</span>
            </div>
            <div className="bg-panel px-3 py-2.5 text-center">
              <span className="text-[10px] font-bold text-orange bg-orange/10 px-2 py-0.5 rounded-full">AWS</span>
            </div>
            <div className="bg-panel px-3 py-2.5 text-center">
              <span className="text-[10px] font-bold text-azure bg-azure/10 px-2 py-0.5 rounded-full">Azure</span>
            </div>
            <div className="bg-panel px-3 py-2.5 text-center">
              <span className="text-[10px] font-bold text-green-dark bg-green/10 px-2 py-0.5 rounded-full">GCP</span>
            </div>

            {/* Rows */}
            {equivalences.map((eq, i) => (
              <div key={i} className="contents">
                <div
                  onMouseEnter={() => setActiveRow(i)}
                  onMouseLeave={() => setActiveRow(null)}
                  className={`px-3 py-2.5 transition-colors ${activeRow === i ? "bg-azure/5" : "bg-white"}`}
                >
                  <span className="text-xs font-medium text-foreground">{eq.concept}</span>
                </div>
                <div
                  onMouseEnter={() => setActiveRow(i)}
                  onMouseLeave={() => setActiveRow(null)}
                  className={`px-3 py-2.5 text-center transition-colors ${activeRow === i ? "bg-orange/5" : "bg-white"}`}
                >
                  <span className="text-xs font-mono text-orange">{eq.aws}</span>
                </div>
                <div
                  onMouseEnter={() => setActiveRow(i)}
                  onMouseLeave={() => setActiveRow(null)}
                  className={`px-3 py-2.5 text-center transition-colors ${activeRow === i ? "bg-azure/5" : "bg-white"}`}
                >
                  <span className="text-xs font-mono text-azure">{eq.azure}</span>
                </div>
                <div
                  onMouseEnter={() => setActiveRow(i)}
                  onMouseLeave={() => setActiveRow(null)}
                  className={`px-3 py-2.5 text-center transition-colors ${activeRow === i ? "bg-green/5" : "bg-white"}`}
                >
                  <span className="text-xs font-mono text-green-dark">{eq.gcp}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-text-secondary text-center italic pt-2">
            Pasa el cursor sobre una fila para resaltar la equivalencia completa
          </p>
        </div>
      )}
    </div>
  );
}
