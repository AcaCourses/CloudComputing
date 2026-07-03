"use client";

import { useState } from "react";
import {
  FileJson,
  Key,
  Columns3,
  Database,
  Table2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Layers,
  Zap,
  Scale,
  Shuffle,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type NoSqlModel = {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  looksLike: string;
  bestFor: string;
  gcpService: string;
  awsService: string;
};

type ClassifyCase = {
  id: string;
  label: string;
  answer: "sql" | "nosql";
  explanation: string;
};

export function NoSqlExplorer() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, "sql" | "nosql" | null>>({});
  const [showResults, setShowResults] = useState(false);

  const models: NoSqlModel[] = [
    {
      id: "document",
      label: "Documental",
      icon: <FileJson className="w-4 h-4" />,
      color: "azure",
      description: "Guarda datos como documentos JSON flexibles. Cada documento puede tener campos diferentes sin romper un esquema rígido.",
      looksLike: `{
  "nombre": "Ana García",
  "rol": "estudiante",
  "materias": ["Cloud", "BD"],
  "preferencias": {
    "tema": "oscuro",
    "idioma": "es"
  }
}`,
      bestFor: "Perfiles de usuario, catálogos, apps web/móviles, contenido flexible.",
      gcpService: "Firestore / Datastore",
      awsService: "DynamoDB / DocumentDB",
    },
    {
      id: "keyvalue",
      label: "Clave-Valor",
      icon: <Key className="w-4 h-4" />,
      color: "green",
      description: "Cada dato es un par simple: una clave única y un valor asociado. Acceso ultra-rápido por clave, sin consultas complejas.",
      looksLike: `session:abc123 → { user: "ana", expires: "2026-07-01" }
cart:user456  → { items: [...], total: 249.90 }
cache:page-home → "<html>...</html>"`,
      bestFor: "Sesiones, caché, carritos de compra, configuraciones rápidas.",
      gcpService: "Memorystore (Redis/Memcached)",
      awsService: "ElastiCache (Redis/Memcached)",
    },
    {
      id: "widecolumn",
      label: "Columna amplia",
      icon: <Columns3 className="w-4 h-4" />,
      color: "orange",
      description: "Organiza datos en filas con columnas dinámicas. Optimizada para lecturas/escrituras masivas a baja latencia con esquema flexible por fila.",
      looksLike: `row: "sensor-001#2026-06-30"
  → temp: 38.5
  → humidity: 72
  → status: "active"

row: "sensor-002#2026-06-30"
  → temp: 22.1
  → battery: 89`,
      bestFor: "IoT, series temporales, analytics masivos, alto rendimiento a gran escala.",
      gcpService: "Bigtable",
      awsService: "DynamoDB / Keyspaces (Cassandra)",
    },
  ];

  const classifyCases: ClassifyCase[] = [
    { id: "calificaciones", label: "Calificaciones escolares (alumno, materia, nota)", answer: "sql", explanation: "Entidades claras con relaciones definidas → modelo relacional." },
    { id: "clicks", label: "Historial de clics de millones de usuarios", answer: "nosql", explanation: "Alto volumen, escrituras masivas, sin relaciones → NoSQL (columna amplia o documental)." },
    { id: "perfil", label: "Perfil de usuario con campos variables", answer: "nosql", explanation: "Estructura flexible que cambia por usuario → NoSQL documental." },
    { id: "inventario", label: "Inventario con proveedores y pedidos relacionados", answer: "sql", explanation: "Múltiples entidades con integridad referencial → relacional con SQL." },
    { id: "sesiones", label: "Sesiones activas de una app web", answer: "nosql", explanation: "Acceso por clave, expiración, sin relaciones → NoSQL clave-valor." },
    { id: "eventos", label: "Logs de eventos a gran velocidad", answer: "nosql", explanation: "Escrituras masivas, lectura por rango temporal → NoSQL columna amplia." },
  ];

  const activeModel = models.find((m) => m.id === selectedModel);

  const classify = (id: string, value: "sql" | "nosql") => {
    if (!showResults) setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const checkAnswers = () => setShowResults(true);
  const reset = () => { setAnswers({}); setShowResults(false); };

  const allAnswered = classifyCases.every((c) => answers[c.id] != null);
  const correctCount = classifyCases.filter((c) => answers[c.id] === c.answer).length;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shuffle className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Modelos NoSQL y clasificador
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Explora los modelos NoSQL y luego clasifica casos de uso como SQL o NoSQL.
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

      {/* NoSQL model selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {models.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedModel(m.id)}
            className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border transition-all text-center ${
              selectedModel === m.id
                ? `bg-${m.color}/10 border-${m.color}/30`
                : "border-border hover:border-azure/20"
            } ${selectedModel === m.id ? "ring-1 ring-azure/20" : ""}`}
          >
            <div className={`${selectedModel === m.id ? "text-azure" : "text-text-secondary"}`}>
              {m.icon}
            </div>
            <p className={`text-[10px] font-semibold ${selectedModel === m.id ? "text-azure" : "text-foreground"}`}>
              {m.label}
            </p>
            <p className="text-[8px] text-text-secondary">
              {viewMode === "gcp" ? m.gcpService : viewMode === "aws" ? m.awsService : m.bestFor.split(",")[0]}
            </p>
          </button>
        ))}
      </div>

      {/* Model detail */}
      {activeModel && (
        <div className="rounded-lg border border-border bg-white/60 p-4 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <div className="text-azure">{activeModel.icon}</div>
            <h4 className="text-xs font-semibold text-foreground">Modelo {activeModel.label}</h4>
          </div>
          <p className="text-[10px] text-text-secondary">{activeModel.description}</p>

          {/* Data visualization */}
          <div className="rounded-md bg-gray-900 p-3">
            <p className="text-[8px] text-gray-500 mb-1.5 uppercase tracking-wider">Cómo luce el dato:</p>
            <pre className="text-[9px] font-mono text-cyan-500 whitespace-pre-wrap">{activeModel.looksLike}</pre>
          </div>

          <div className="rounded-md border border-border bg-panel/50 px-3 py-2">
            <p className="text-[9px] font-medium text-foreground">Ideal para:</p>
            <p className="text-[9px] text-text-secondary">{activeModel.bestFor}</p>
          </div>

          {viewMode !== "concept" && (
            <div className={`rounded-md border px-3 py-2 ${
              viewMode === "gcp" ? "border-azure/20 bg-azure/5" : "border-orange/20 bg-orange/5"
            }`}>
              <p className={`text-[9px] font-semibold ${viewMode === "gcp" ? "text-azure" : "text-orange"}`}>
                {viewMode === "gcp" ? "GCP:" : "AWS:"}
              </p>
              <p className="text-[9px] text-text-secondary mt-0.5">
                {viewMode === "gcp" ? activeModel.gcpService : activeModel.awsService}
              </p>
            </div>
          )}
        </div>
      )}

      {/* SQL vs NoSQL classifier */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-azure" />
          <p className="text-[10px] font-semibold text-foreground">¿SQL o NoSQL?</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {classifyCases.map((c) => {
            const userAnswer = answers[c.id];
            const isCorrect = userAnswer === c.answer;
            return (
              <div
                key={c.id}
                className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border transition-all ${
                  showResults
                    ? isCorrect ? "border-green/30 bg-green/5" : "border-red-300/30 bg-red-50/50"
                    : userAnswer ? "border-azure/20 bg-azure/5" : "border-border"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`shrink-0 ${showResults ? (isCorrect ? "text-green" : "text-red-500") : "text-text-secondary"}`}>
                    {showResults ? (isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />) : <Layers className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-[10px] font-medium text-foreground">{c.label}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => classify(c.id, "sql")}
                    className={`px-2 py-0.5 rounded text-[8px] font-semibold border transition-all ${
                      userAnswer === "sql"
                        ? showResults && !isCorrect ? "bg-red-100 border-red-300 text-red-600" : "bg-azure/10 border-azure/30 text-azure"
                        : "border-border text-text-secondary hover:border-azure/20"
                    }`}
                  >
                    SQL
                  </button>
                  <button
                    onClick={() => classify(c.id, "nosql")}
                    className={`px-2 py-0.5 rounded text-[8px] font-semibold border transition-all ${
                      userAnswer === "nosql"
                        ? showResults && !isCorrect ? "bg-red-100 border-red-300 text-red-600" : "bg-azure/10 border-azure/30 text-azure"
                        : "border-border text-text-secondary hover:border-azure/20"
                    }`}
                  >
                    NoSQL
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {showResults && (
          <div className="space-y-2">
            <div className={`rounded-md px-3 py-2 text-xs font-medium ${
              correctCount === classifyCases.length ? "bg-green/10 text-green border border-green/20" : "bg-azure/10 text-azure border border-azure/20"
            }`}>
              {correctCount}/{classifyCases.length} correctas
              {correctCount === classifyCases.length && " — ¡Perfecto!"}
            </div>
            {classifyCases.filter((c) => answers[c.id] !== c.answer).length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {classifyCases.filter((c) => answers[c.id] !== c.answer).map((c) => (
                  <div key={c.id} className="rounded-md border border-border bg-white/50 px-2.5 py-2">
                    <p className="text-[9px] font-semibold text-foreground">{c.label}</p>
                    <p className="text-[9px] text-text-secondary mt-0.5">{c.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
      </div>

      {/* Quick comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <Table2 className="w-3.5 h-3.5 text-azure" />
            <p className="text-[10px] font-semibold text-foreground">SQL</p>
          </div>
          <ul className="space-y-1 text-[9px] text-text-secondary">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-azure/50" /> Estructura rígida</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-azure/50" /> Relaciones claras</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-azure/50" /> Consultas complejas (JOIN)</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-azure/50" /> Consistencia fuerte</li>
          </ul>
        </div>
        <div className="rounded-lg border border-border p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <Shuffle className="w-3.5 h-3.5 text-orange" />
            <p className="text-[10px] font-semibold text-foreground">NoSQL</p>
          </div>
          <ul className="space-y-1 text-[9px] text-text-secondary">
            <li className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-orange/50" /> Estructura flexible</li>
            <li className="flex items-center gap-1.5"><Scale className="w-3 h-3 text-orange/50" /> Escalado horizontal</li>
            <li className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-orange/50" /> Alto rendimiento</li>
            <li className="flex items-center gap-1.5"><Scale className="w-3 h-3 text-orange/50" /> Modelos variados</li>
          </ul>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">NoSQL no reemplaza a SQL.</span> Son complementarios. SQL para relaciones claras y consistencia; NoSQL para flexibilidad, escala y modelos de datos que no encajan en tablas rígidas.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">En GCP:</span> Firestore (documental, serverless, apps web/móviles), Bigtable (columna amplia, IoT, analytics masivos), Memorystore (clave-valor, caché Redis). Cada uno resuelve un patrón diferente de acceso.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> DynamoDB (documental + clave-valor, serverless), DocumentDB (compatible MongoDB), ElastiCache (Redis/Memcached), Keyspaces (compatible Cassandra para columna amplia).
          </p>
        )}
      </div>
    </div>
  );
}
