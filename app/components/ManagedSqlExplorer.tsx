"use client";

import { useState } from "react";
import {
  Database,
  Server,
  User,
  Shield,
  RefreshCw,
  HardDrive,
  Settings,
  Code2,
  Table2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Wrench,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type ResponsibilityItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  owner: "provider" | "user";
  explanation: string;
};

export function ManagedSqlExplorer() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [answers, setAnswers] = useState<Record<string, "provider" | "user" | null>>({});
  const [showResults, setShowResults] = useState(false);
  const [queryStep, setQueryStep] = useState(0);

  const responsibilities: ResponsibilityItem[] = [
    { id: "infra", label: "Infraestructura de servidores", icon: <Server className="w-3.5 h-3.5" />, owner: "provider", explanation: "El proveedor opera los servidores físicos y virtuales donde corre la base de datos." },
    { id: "backups", label: "Backups automáticos", icon: <HardDrive className="w-3.5 h-3.5" />, owner: "provider", explanation: "El proveedor configura y ejecuta respaldos periódicos sin intervención del usuario." },
    { id: "patches", label: "Parches de seguridad del motor", icon: <Shield className="w-3.5 h-3.5" />, owner: "provider", explanation: "El proveedor aplica actualizaciones de seguridad al motor de base de datos." },
    { id: "ha", label: "Alta disponibilidad y failover", icon: <RefreshCw className="w-3.5 h-3.5" />, owner: "provider", explanation: "El proveedor configura réplicas y failover automático para mantener el servicio activo." },
    { id: "schema", label: "Diseño del esquema (tablas)", icon: <Table2 className="w-3.5 h-3.5" />, owner: "user", explanation: "Tú diseñas las tablas, columnas, tipos de datos y relaciones de tu aplicación." },
    { id: "queries", label: "Consultas SQL", icon: <Code2 className="w-3.5 h-3.5" />, owner: "user", explanation: "Tú escribes las consultas que tu aplicación necesita para leer y escribir datos." },
    { id: "relations", label: "Relaciones entre tablas", icon: <Database className="w-3.5 h-3.5" />, owner: "user", explanation: "Tú defines las claves foráneas y la lógica de integridad referencial entre entidades." },
    { id: "tuning", label: "Optimización de consultas", icon: <Settings className="w-3.5 h-3.5" />, owner: "user", explanation: "Tú analizas y optimizas consultas lentas, índices y patrones de acceso." },
  ];

  const querySteps = [
    { sql: "SELECT nombre, promedio", description: "Seleccionar columnas" },
    { sql: "FROM estudiantes", description: "De la tabla estudiantes" },
    { sql: "WHERE semestre = 6", description: "Filtrar por condición" },
    { sql: "ORDER BY promedio DESC;", description: "Ordenar resultados" },
  ];

  const classify = (id: string, value: "provider" | "user") => {
    if (!showResults) setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const checkAnswers = () => setShowResults(true);
  const reset = () => { setAnswers({}); setShowResults(false); };

  const allAnswered = responsibilities.every((r) => answers[r.id] != null);
  const correctCount = responsibilities.filter((r) => answers[r.id] === r.owner).length;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Wrench className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              ¿Qué administra el proveedor y qué haces tú?
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Clasifica cada responsabilidad: ¿la maneja el proveedor cloud o es tuya?
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

      {/* Responsibility classifier */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {responsibilities.map((r) => {
          const userAnswer = answers[r.id];
          const isCorrect = userAnswer === r.owner;
          return (
            <div
              key={r.id}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border transition-all ${
                showResults
                  ? isCorrect ? "border-green/30 bg-green/5" : "border-red-300/30 bg-red-50/50"
                  : userAnswer ? "border-azure/20 bg-azure/5" : "border-border"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className={`shrink-0 ${showResults ? (isCorrect ? "text-green" : "text-red-500") : "text-text-secondary"}`}>
                  {showResults ? (isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />) : r.icon}
                </div>
                <span className="text-[10px] font-medium text-foreground">{r.label}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => classify(r.id, "provider")}
                  className={`px-2 py-0.5 rounded text-[8px] font-semibold border transition-all ${
                    userAnswer === "provider"
                      ? showResults && !isCorrect ? "bg-red-100 border-red-300 text-red-600" : "bg-azure/10 border-azure/30 text-azure"
                      : "border-border text-text-secondary hover:border-azure/20"
                  }`}
                >
                  Proveedor
                </button>
                <button
                  onClick={() => classify(r.id, "user")}
                  className={`px-2 py-0.5 rounded text-[8px] font-semibold border transition-all ${
                    userAnswer === "user"
                      ? showResults && !isCorrect ? "bg-red-100 border-red-300 text-red-600" : "bg-azure/10 border-azure/30 text-azure"
                      : "border-border text-text-secondary hover:border-azure/20"
                  }`}
                >
                  Tú
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Results */}
      {showResults && (
        <div className="space-y-2">
          <div className={`rounded-md px-3 py-2 text-xs font-medium ${
            correctCount === responsibilities.length ? "bg-green/10 text-green border border-green/20" : "bg-azure/10 text-azure border border-azure/20"
          }`}>
            {correctCount}/{responsibilities.length} correctas
            {correctCount === responsibilities.length && " — ¡Perfecto!"}
          </div>
          {responsibilities.filter((r) => answers[r.id] !== r.owner).length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {responsibilities.filter((r) => answers[r.id] !== r.owner).map((r) => (
                <div key={r.id} className="rounded-md border border-border bg-white/50 px-2.5 py-2">
                  <p className="text-[9px] font-semibold text-foreground">{r.label}</p>
                  <p className="text-[9px] text-text-secondary mt-0.5">{r.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={checkAnswers}
          disabled={!allAnswered || showResults}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            allAnswered && !showResults
              ? "bg-azure/10 text-azure border border-azure/30 hover:bg-azure/20"
              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          }`}
        >
          Verificar
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-text-secondary border border-border hover:border-azure/20 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Query builder */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-azure" />
          <p className="text-[10px] font-semibold text-foreground">Constructor de consultas</p>
          <p className="text-[9px] text-text-secondary">— tu parte del trabajo</p>
        </div>
        <div className="rounded-lg bg-gray-900 p-3 space-y-1">
          {querySteps.map((step, i) => (
            <button
              key={i}
              onClick={() => setQueryStep(i + 1)}
              className={`w-full flex items-center gap-3 px-2 py-1 rounded transition-all text-left ${
                i < queryStep ? "opacity-100" : "opacity-30"
              }`}
            >
              <code className="text-[10px] font-mono text-cyan flex-1">{step.sql}</code>
              <span className="text-[8px] text-gray-500 shrink-0">{step.description}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setQueryStep(querySteps.length)}
            className="px-2.5 py-1 rounded-md text-[10px] font-medium text-azure border border-azure/30 hover:bg-azure/10 transition-colors"
          >
            Mostrar todo
          </button>
          <button
            onClick={() => setQueryStep(0)}
            className="px-2.5 py-1 rounded-md text-[10px] font-medium text-text-secondary border border-border hover:border-azure/20 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Split view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-azure/20 bg-azure/5 p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-azure" />
            <p className="text-[10px] font-semibold text-foreground">Proveedor administra</p>
          </div>
          <ul className="space-y-1 text-[9px] text-text-secondary">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-azure/60" /> Servidores y red</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-azure/60" /> Backups automáticos</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-azure/60" /> Parches y actualizaciones</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-azure/60" /> Alta disponibilidad</li>
          </ul>
        </div>
        <div className="rounded-lg border border-green/20 bg-green/5 p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-green" />
            <p className="text-[10px] font-semibold text-foreground">Tú te encargas de</p>
          </div>
          <ul className="space-y-1 text-[9px] text-text-secondary">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green/60" /> Diseño de tablas</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green/60" /> Consultas SQL</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green/60" /> Relaciones y claves</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green/60" /> Optimización de queries</li>
          </ul>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">SQL administrado =</span> misma experiencia SQL (tablas, relaciones, consultas) pero sin operar servidores. El proveedor mantiene la infraestructura; tú te enfocas en tus datos y tu aplicación.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">Cloud SQL:</span> MySQL, PostgreSQL y SQL Server administrados. Backups automáticos, réplicas de lectura, failover Multi-AZ, escalado vertical con un clic. Conexión vía IP privada, Cloud SQL Proxy o Auth Proxy.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">Amazon RDS:</span> MySQL, PostgreSQL, SQL Server, Oracle y MariaDB administrados. Multi-AZ, read replicas, automated backups. Aurora como opción de mayor rendimiento compatible con MySQL/PostgreSQL.
          </p>
        )}
      </div>
    </div>
  );
}
