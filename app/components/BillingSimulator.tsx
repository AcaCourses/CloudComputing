"use client";

import { useState } from "react";
import {
  DollarSign,
  Server,
  HardDrive,
  Database,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Minus,
  TrendingUp,
  Bell,
  Building2,
  FolderOpen,
} from "lucide-react";

type Resource = {
  id: string;
  label: string;
  icon: React.ElementType;
  costPerUnit: number;
  unit: string;
  gcpName: string;
  awsName: string;
};

const resources: Resource[] = [
  {
    id: "vm",
    label: "Máquina virtual",
    icon: Server,
    costPerUnit: 35,
    unit: "/mes",
    gcpName: "Compute Engine e2-medium",
    awsName: "EC2 t3.medium",
  },
  {
    id: "storage",
    label: "Almacenamiento (50 GB)",
    icon: HardDrive,
    costPerUnit: 1.15,
    unit: "/mes",
    gcpName: "Cloud Storage Standard",
    awsName: "S3 Standard",
  },
  {
    id: "database",
    label: "Base de datos",
    icon: Database,
    costPerUnit: 25,
    unit: "/mes",
    gcpName: "Cloud SQL db-f1-micro",
    awsName: "RDS db.t3.micro",
  },
];

type Project = {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  bgColor: string;
};

const projects: Project[] = [
  {
    id: "clase",
    name: "Laboratorio de clase",
    color: "text-azure",
    borderColor: "border-azure/30",
    bgColor: "bg-azure/5",
  },
  {
    id: "portal",
    name: "Portal académico",
    color: "text-green",
    borderColor: "border-green/30",
    bgColor: "bg-green/5",
  },
  {
    id: "investigacion",
    name: "Investigación",
    color: "text-orange",
    borderColor: "border-orange/30",
    bgColor: "bg-orange/5",
  },
];

const BUDGET = 100;

type ViewMode = "concept" | "gcp" | "aws";

export function BillingSimulator() {
  const [allocations, setAllocations] = useState<Record<string, Record<string, number>>>({
    clase: { vm: 1, storage: 1, database: 0 },
    portal: { vm: 1, storage: 1, database: 1 },
    investigacion: { vm: 0, storage: 1, database: 0 },
  });
  const [viewMode, setViewMode] = useState<ViewMode>("concept");

  const adjustResource = (projectId: string, resourceId: string, delta: number) => {
    setAllocations((prev) => {
      const current = prev[projectId]?.[resourceId] ?? 0;
      const next = Math.max(0, Math.min(10, current + delta));
      return {
        ...prev,
        [projectId]: { ...prev[projectId], [resourceId]: next },
      };
    });
  };

  const projectCost = (projectId: string) => {
    const alloc = allocations[projectId] ?? {};
    return resources.reduce((sum, r) => sum + (alloc[r.id] ?? 0) * r.costPerUnit, 0);
  };

  const totalCost = projects.reduce((sum, p) => sum + projectCost(p.id), 0);
  const budgetPercent = Math.min((totalCost / BUDGET) * 100, 100);
  const isOverBudget = totalCost > BUDGET;
  const isNearBudget = totalCost >= BUDGET * 0.9 && !isOverBudget;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-green" />
            <h3 className="text-sm font-semibold text-foreground">
              Simulador de facturación
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Ajusta los recursos de cada proyecto y observa cómo cambia el costo total.
            El presupuesto mensual es <span className="font-semibold text-foreground">${BUDGET} USD</span>.
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

      {/* Budget bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-text-secondary flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Consumo mensual
          </span>
          <span
            className={`font-semibold ${
              isOverBudget ? "text-red-500" : isNearBudget ? "text-orange" : "text-green"
            }`}
          >
            ${totalCost.toFixed(2)} / ${BUDGET} USD
          </span>
        </div>
        <div className="h-3 bg-grey-light rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget
                ? "bg-red-500"
                : isNearBudget
                ? "bg-orange"
                : "bg-green"
            }`}
            style={{ width: `${budgetPercent}%` }}
          />
        </div>
        {/* Alert */}
        {(isNearBudget || isOverBudget) && (
          <div
            className={`flex items-start gap-2 rounded-lg border p-2.5 text-xs animate-in fade-in duration-300 ${
              isOverBudget
                ? "border-red-300 bg-red-50 text-red-700"
                : "border-orange/30 bg-orange/5 text-orange"
            }`}
          >
            {isOverBudget ? (
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            ) : (
              <Bell className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            )}
            <span>
              {isOverBudget
                ? `⚠️ Presupuesto excedido por $${(totalCost - BUDGET).toFixed(2)}. En un entorno real recibirías una alerta de Budgets & Alerts.`
                : `Alerta: has consumido el ${budgetPercent.toFixed(0)}% del presupuesto. Momento de revisar recursos.`}
            </span>
          </div>
        )}
      </div>

      {/* Flow diagram header */}
      <div className="flex items-center gap-2 text-[10px] text-text-secondary">
        <Building2 className="w-3 h-3" />
        <span className="font-medium uppercase tracking-wider">
          {viewMode === "aws" ? "AWS Account → Proyectos → Recursos → Costos" : viewMode === "gcp" ? "Billing Account → Proyectos → Recursos → Costos" : "Cuenta de facturación → Proyectos → Recursos → Costos"}
        </span>
      </div>

      {/* Projects */}
      <div className="space-y-3">
        {projects.map((project) => {
          const cost = projectCost(project.id);
          return (
            <div
              key={project.id}
              className={`rounded-lg border ${project.borderColor} ${project.bgColor} p-3 space-y-2`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderOpen className={`w-3.5 h-3.5 ${project.color}`} />
                  <span className={`text-xs font-semibold ${project.color}`}>
                    {project.name}
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-foreground">
                  ${cost.toFixed(2)}
                </span>
              </div>

              <div className="grid gap-1.5">
                {resources.map((resource) => {
                  const count = allocations[project.id]?.[resource.id] ?? 0;
                  const Icon = resource.icon;
                  return (
                    <div
                      key={resource.id}
                      className="flex items-center gap-2 text-xs bg-white/40 rounded-md px-2.5 py-1.5"
                    >
                      <Icon className="w-3 h-3 text-text-secondary shrink-0" />
                      <span className="text-foreground flex-1">
                        {viewMode === "aws" ? resource.awsName : viewMode === "gcp" ? resource.gcpName : resource.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => adjustResource(project.id, resource.id, -1)}
                          disabled={count === 0}
                          className="w-5 h-5 rounded flex items-center justify-center border border-border text-text-secondary hover:border-azure/30 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-mono font-semibold text-foreground">
                          {count}
                        </span>
                        <button
                          onClick={() => adjustResource(project.id, resource.id, 1)}
                          className="w-5 h-5 rounded flex items-center justify-center border border-border text-text-secondary hover:border-azure/30 hover:text-foreground transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-[10px] text-text-secondary w-20 text-right font-mono">
                        ${(count * resource.costPerUnit).toFixed(2)}{resource.unit}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="rounded-lg border border-border bg-white/30 p-3">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-text-secondary font-medium">Resumen de costos por proyecto</span>
          {viewMode !== "concept" && (
            <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
              viewMode === "gcp"
                ? "bg-azure/10 text-azure border border-azure/20"
                : "bg-orange/10 text-orange border border-orange/20"
            }`}>
              {viewMode === "gcp" ? "Cost Table" : "AWS Cost Explorer"}
            </span>
          )}
        </div>
        <div className="space-y-1">
          {projects.map((project) => {
            const cost = projectCost(project.id);
            const pct = totalCost > 0 ? (cost / totalCost) * 100 : 0;
            return (
              <div key={project.id} className="flex items-center gap-2">
                <span className={`text-[10px] w-32 truncate ${project.color} font-medium`}>
                  {project.name}
                </span>
                <div className="flex-1 h-2 bg-grey-light rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      project.id === "clase"
                        ? "bg-azure"
                        : project.id === "portal"
                        ? "bg-green"
                        : "bg-orange"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-foreground w-16 text-right">
                  ${cost.toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] text-text-secondary italic text-center">
        💡 Prueba añadir recursos hasta superar el presupuesto y observa la alerta.
        {viewMode !== "concept" && ` En ${viewMode === "gcp" ? "GCP" : "AWS"} usarías ${viewMode === "gcp" ? "Budgets & Alerts + Pub/Sub" : "AWS Budgets + SNS"} para recibir notificaciones.`}
      </p>
    </div>
  );
}
