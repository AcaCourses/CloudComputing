"use client";

import { useState } from "react";
import {
  Table2,
  Link2,
  Key,
  Search,
  Database,
  ArrowRight,
  Users,
  BookOpen,
  ClipboardList,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type TableDef = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  columns: { name: string; type: string; isKey?: boolean; isFk?: boolean }[];
  rows: string[][];
};

type QueryOption = {
  id: string;
  question: string;
  tables: string[];
  explanation: string;
  sql: string;
};

export function RelationalMap() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  const tables: TableDef[] = [
    {
      id: "estudiantes",
      name: "Estudiantes",
      icon: <Users className="w-4 h-4" />,
      color: "azure",
      columns: [
        { name: "matricula", type: "VARCHAR", isKey: true },
        { name: "nombre", type: "VARCHAR" },
        { name: "carrera", type: "VARCHAR" },
        { name: "semestre", type: "INT" },
      ],
      rows: [
        ["12345", "Ana García", "Informática", "6"],
        ["12346", "Luis Pérez", "Matemáticas", "4"],
        ["12347", "María López", "Informática", "6"],
      ],
    },
    {
      id: "materias",
      name: "Materias",
      icon: <BookOpen className="w-4 h-4" />,
      color: "green",
      columns: [
        { name: "clave", type: "VARCHAR", isKey: true },
        { name: "nombre", type: "VARCHAR" },
        { name: "creditos", type: "INT" },
      ],
      rows: [
        ["CC101", "Cloud Computing", "8"],
        ["BD201", "Bases de Datos", "6"],
        ["PR301", "Programación", "8"],
      ],
    },
    {
      id: "calificaciones",
      name: "Calificaciones",
      icon: <ClipboardList className="w-4 h-4" />,
      color: "orange",
      columns: [
        { name: "id", type: "INT", isKey: true },
        { name: "matricula", type: "VARCHAR", isFk: true },
        { name: "clave_materia", type: "VARCHAR", isFk: true },
        { name: "calificacion", type: "DECIMAL" },
      ],
      rows: [
        ["1", "12345", "CC101", "9.5"],
        ["2", "12345", "BD201", "8.8"],
        ["3", "12346", "CC101", "7.2"],
        ["4", "12347", "PR301", "9.0"],
      ],
    },
  ];

  const queries: QueryOption[] = [
    {
      id: "materias-estudiante",
      question: "¿Qué materias cursa Ana García?",
      tables: ["estudiantes", "calificaciones", "materias"],
      explanation: "Se une Estudiantes → Calificaciones (por matrícula) → Materias (por clave). La relación permite navegar entre tablas sin duplicar datos.",
      sql: "SELECT m.nombre FROM Materias m JOIN Calificaciones c ON m.clave = c.clave_materia WHERE c.matricula = '12345'",
    },
    {
      id: "calificacion",
      question: "¿Qué calificación obtuvo Luis en Cloud?",
      tables: ["estudiantes", "calificaciones"],
      explanation: "Se busca en Calificaciones el registro que une la matrícula de Luis con la clave de Cloud Computing.",
      sql: "SELECT calificacion FROM Calificaciones WHERE matricula = '12346' AND clave_materia = 'CC101'",
    },
    {
      id: "inscritos",
      question: "¿Quiénes están inscritos en Cloud Computing?",
      tables: ["calificaciones", "estudiantes"],
      explanation: "Desde Calificaciones se filtran los registros con clave CC101 y se unen con Estudiantes para obtener nombres.",
      sql: "SELECT e.nombre FROM Estudiantes e JOIN Calificaciones c ON e.matricula = c.matricula WHERE c.clave_materia = 'CC101'",
    },
  ];

  const activeTable = tables.find((t) => t.id === selectedTable);
  const activeQuery = queries.find((q) => q.id === selectedQuery);

  const getColorClasses = (color: string, active: boolean) => {
    if (!active) return "border-border text-text-secondary";
    switch (color) {
      case "azure": return "border-azure/30 bg-azure/10 text-azure";
      case "green": return "border-green/30 bg-green/10 text-green";
      case "orange": return "border-orange/30 bg-orange/10 text-orange";
      default: return "border-azure/30 bg-azure/10 text-azure";
    }
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Mapa relacional
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Explora las tablas y sus relaciones. Luego prueba consultas para ver cómo se conectan.
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

      {/* Table selector with relationship lines */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {tables.map((table, i) => (
          <div key={table.id} className="flex items-center gap-3">
            <button
              onClick={() => setSelectedTable(table.id)}
              className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-lg border transition-all ${
                getColorClasses(table.color, selectedTable === table.id)
              }`}
            >
              {table.icon}
              <p className="text-[10px] font-semibold">{table.name}</p>
              <p className="text-[8px] text-text-secondary">{table.columns.length} columnas</p>
            </button>
            {i < tables.length - 1 && (
              <div className="flex items-center gap-0.5">
                <Link2 className="w-3.5 h-3.5 text-azure/40" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Table detail */}
      {activeTable && (
        <div className="rounded-lg border border-border overflow-hidden animate-in fade-in duration-200">
          <div className="bg-panel px-3 py-2 border-b border-border flex items-center gap-2">
            <Table2 className="w-3.5 h-3.5 text-text-secondary" />
            <p className="text-[10px] font-semibold text-foreground">{activeTable.name}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-gray-50 border-b border-border">
                  {activeTable.columns.map((col) => (
                    <th key={col.name} className="text-left px-3 py-2 font-semibold text-foreground">
                      <div className="flex items-center gap-1">
                        {col.isKey && <Key className="w-2.5 h-2.5 text-orange" />}
                        {col.isFk && <Link2 className="w-2.5 h-2.5 text-azure" />}
                        <span>{col.name}</span>
                        <span className="text-[8px] text-text-secondary font-normal ml-1">({col.type})</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeTable.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="px-3 py-1.5 text-text-secondary font-mono">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-3 py-1.5 flex items-center gap-3 text-[8px] text-text-secondary">
            <span className="flex items-center gap-1"><Key className="w-2.5 h-2.5 text-orange" /> Clave primaria</span>
            <span className="flex items-center gap-1"><Link2 className="w-2.5 h-2.5 text-azure" /> Clave foránea</span>
          </div>
        </div>
      )}

      {/* Query section */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center gap-2">
          <Search className="w-3.5 h-3.5 text-azure" />
          <p className="text-[10px] font-semibold text-foreground">Consultas entre tablas</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {queries.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQuery(q.id)}
              className={`px-3 py-2 rounded-lg border text-left transition-all ${
                selectedQuery === q.id
                  ? "border-azure/30 bg-azure/5"
                  : "border-border hover:border-azure/20"
              }`}
            >
              <p className={`text-[10px] font-medium ${selectedQuery === q.id ? "text-azure" : "text-foreground"}`}>
                {q.question}
              </p>
            </button>
          ))}
        </div>

        {activeQuery && (
          <div className="rounded-lg border border-border bg-white/60 p-3 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 flex-wrap">
              <p className="text-[9px] text-text-secondary">Tablas involucradas:</p>
              {activeQuery.tables.map((t, i) => (
                <span key={t} className="flex items-center gap-1">
                  <span className="text-[9px] font-semibold text-azure">{tables.find((tb) => tb.id === t)?.name}</span>
                  {i < activeQuery.tables.length - 1 && <ArrowRight className="w-2.5 h-2.5 text-gray-400" />}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-text-secondary">{activeQuery.explanation}</p>
            <div className="rounded-md bg-gray-900 px-3 py-2">
              <code className="text-[9px] font-mono text-cyan">{activeQuery.sql}</code>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Base relacional =</span> datos en tablas conectadas por claves. Las relaciones permiten consultar información cruzada sin duplicar datos. Ideal para datos estructurados que necesitan consistencia y consultas precisas.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">En GCP:</span> Cloud SQL (MySQL, PostgreSQL, SQL Server) — administrado con backups automáticos, réplicas y escalado vertical. AlloyDB para cargas analíticas. Spanner para escala global con consistencia fuerte.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> Amazon RDS (MySQL, PostgreSQL, SQL Server, Oracle) — administrado con Multi-AZ y read replicas. Aurora para mayor rendimiento compatible con MySQL/PostgreSQL.
          </p>
        )}
      </div>
    </div>
  );
}
