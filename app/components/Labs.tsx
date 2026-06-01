"use client";

import { useState } from "react";
import { ExternalLink, Filter } from "lucide-react";
import labsData from "@/data/labs.json";

type Lab = {
  id: number;
  name: string;
  group: string;
  dueDate: string;
  submitLink: string;
  status: string;
  unit: number;
};

const statusColors: Record<string, string> = {
  pending: "bg-warning/10 text-warning border-warning/20",
  active: "bg-azure/10 text-azure border-azure/20",
  completed: "bg-success/10 text-success border-success/20",
  overdue: "bg-error/10 text-error border-error/20",
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  active: "Activo",
  completed: "Completado",
  overdue: "Vencido",
};

export default function Labs() {
  const [selectedGroup, setSelectedGroup] = useState<string>("A");
  const [selectedUnit, setSelectedUnit] = useState<number>(0);

  const labs: Lab[] = labsData.labs;

  const filtered = labs.filter((lab) => {
    if (lab.group !== selectedGroup) return false;
    if (selectedUnit !== 0 && lab.unit !== selectedUnit) return false;
    return true;
  });

  return (
    <section id="laboratorios" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-azure" />
            <span className="text-xs font-medium text-azure uppercase tracking-wider">
              Prácticas
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Laboratorios
          </h2>
          <p className="mt-2 text-text-secondary max-w-2xl">
            Entregas semanales por grupo. Cada laboratorio se vincula a una unidad temática.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Group selector */}
          <div className="flex items-center rounded-lg border border-border overflow-hidden">
            {["A", "B"].map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGroup(g)}
                className={`px-4 py-2 text-xs font-medium transition-colors ${
                  selectedGroup === g
                    ? "bg-blue-light text-blue-dark"
                    : "text-text-secondary hover:text-foreground hover:bg-grey-light"
                }`}
              >
                Grupo {g}
              </button>
            ))}
          </div>

          {/* Unit filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-text-secondary" />
            <select
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(Number(e.target.value))}
              className="bg-panel border border-border rounded-lg px-3 py-2 text-xs text-text-secondary focus:outline-none focus:border-azure/50"
            >
              <option value={0}>Todas las unidades</option>
              {[1, 2, 3, 4, 5].map((u) => (
                <option key={u} value={u}>
                  Unidad {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Labs list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-text-secondary text-sm">
              No hay laboratorios disponibles para este filtro.
            </div>
          )}
          {filtered.map((lab) => (
            <div
              key={lab.id}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-border bg-panel/50 hover:border-azure/20 transition-all"
            >
              {/* Unit badge */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-xs font-mono font-bold text-azure bg-azure/10 px-2 py-1 rounded-md shrink-0">
                  U{lab.unit}
                </span>
                <span className="text-sm text-foreground font-medium truncate">
                  {lab.name}
                </span>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-text-secondary">
                  {new Date(lab.dueDate).toLocaleDateString("es-MX", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>

                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    statusColors[lab.status] || statusColors.pending
                  }`}
                >
                  {statusLabels[lab.status] || lab.status}
                </span>

                {lab.submitLink ? (
                  <a
                    href={lab.submitLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-azure hover:text-cyan transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Entregar
                  </a>
                ) : (
                  <span className="text-xs text-text-secondary/50">
                    Sin link
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
