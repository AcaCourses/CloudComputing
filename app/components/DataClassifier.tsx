"use client";

import { useState } from "react";
import {
  Table2,
  FileText,
  Image,
  Video,
  Music,
  FileCode,
  Grid3X3,
  Layers,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Database,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type DataItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  answer: "structured" | "unstructured";
  explanation: string;
};

export function DataClassifier() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [classifications, setClassifications] = useState<Record<string, "structured" | "unstructured" | null>>({});
  const [showResults, setShowResults] = useState(false);

  const dataItems: DataItem[] = [
    {
      id: "csv",
      label: "CSV de calificaciones",
      icon: <Table2 className="w-4 h-4" />,
      answer: "structured",
      explanation: "Un CSV tiene filas y columnas definidas — cada campo tiene posición y tipo predecible.",
    },
    {
      id: "imagen",
      label: "Foto de laboratorio",
      icon: <Image className="w-4 h-4" />,
      answer: "unstructured",
      explanation: "Una imagen es un bloque binario sin esquema tabular. Su contenido no se recorre con consultas SQL.",
    },
    {
      id: "tabla-ventas",
      label: "Tabla de ventas",
      icon: <Grid3X3 className="w-4 h-4" />,
      answer: "structured",
      explanation: "Una tabla con columnas (producto, precio, fecha) es la definición clásica de dato estructurado.",
    },
    {
      id: "pdf",
      label: "Documento PDF",
      icon: <FileText className="w-4 h-4" />,
      answer: "unstructured",
      explanation: "Un PDF contiene texto, imágenes y formato libre. No tiene esquema fijo ni se consulta por campos.",
    },
    {
      id: "audio",
      label: "Grabación de clase",
      icon: <Music className="w-4 h-4" />,
      answer: "unstructured",
      explanation: "El audio es un flujo continuo sin estructura tabular. Para extraer información requiere procesamiento especial.",
    },
    {
      id: "json",
      label: "JSON de una API",
      icon: <FileCode className="w-4 h-4" />,
      answer: "structured",
      explanation: "JSON tiene estructura definida con claves y valores tipados — es semi-estructurado, pero organizado y consultable.",
    },
    {
      id: "video",
      label: "Video de presentación",
      icon: <Video className="w-4 h-4" />,
      answer: "unstructured",
      explanation: "Un video es contenido multimedia sin esquema. Su información no se extrae con consultas directas.",
    },
    {
      id: "alumnos",
      label: "Lista de alumnos (nombre, matrícula)",
      icon: <Database className="w-4 h-4" />,
      answer: "structured",
      explanation: "Una lista con campos definidos (nombre, matrícula, promedio) es dato estructurado — cada registro sigue el mismo esquema.",
    },
  ];

  const classify = (itemId: string, type: "structured" | "unstructured") => {
    setClassifications((prev) => ({ ...prev, [itemId]: type }));
  };

  const checkAnswers = () => setShowResults(true);

  const reset = () => {
    setClassifications({});
    setShowResults(false);
  };

  const allAnswered = dataItems.every((item) => classifications[item.id] != null);
  const correctCount = dataItems.filter((item) => classifications[item.id] === item.answer).length;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Clasifica el tipo de dato
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Para cada ejemplo, decide si es un dato estructurado o no estructurado.
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

      {/* Classification grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {dataItems.map((item) => {
          const userAnswer = classifications[item.id];
          const isCorrect = userAnswer === item.answer;
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border transition-all ${
                showResults
                  ? isCorrect
                    ? "border-green/30 bg-green/5"
                    : "border-red-300/30 bg-red-50/50"
                  : userAnswer
                  ? "border-azure/20 bg-azure/5"
                  : "border-border"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className={`shrink-0 ${
                  showResults ? (isCorrect ? "text-green" : "text-red-500") : "text-text-secondary"
                }`}>
                  {showResults ? (
                    isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />
                  ) : (
                    item.icon
                  )}
                </div>
                <span className="text-[11px] font-medium text-foreground truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => !showResults && classify(item.id, "structured")}
                  disabled={showResults}
                  className={`px-2 py-1 rounded text-[9px] font-semibold border transition-all ${
                    userAnswer === "structured"
                      ? showResults && !isCorrect
                        ? "bg-red-100 border-red-300 text-red-600"
                        : "bg-azure/10 border-azure/30 text-azure"
                      : "border-border text-text-secondary hover:border-azure/20"
                  }`}
                >
                  Estructurado
                </button>
                <button
                  onClick={() => !showResults && classify(item.id, "unstructured")}
                  disabled={showResults}
                  className={`px-2 py-1 rounded text-[9px] font-semibold border transition-all ${
                    userAnswer === "unstructured"
                      ? showResults && !isCorrect
                        ? "bg-red-100 border-red-300 text-red-600"
                        : "bg-azure/10 border-azure/30 text-azure"
                      : "border-border text-text-secondary hover:border-azure/20"
                  }`}
                >
                  No estructurado
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Results or explanations */}
      {showResults && (
        <div className="space-y-2">
          <div className={`rounded-md px-3 py-2 text-xs font-medium ${
            correctCount === dataItems.length
              ? "bg-green/10 text-green border border-green/20"
              : "bg-azure/10 text-azure border border-azure/20"
          }`}>
            {correctCount}/{dataItems.length} correctas
            {correctCount === dataItems.length && " — ¡Perfecto!"}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {dataItems.filter((item) => classifications[item.id] !== item.answer).map((item) => (
              <div key={item.id} className="rounded-md border border-border bg-white/50 px-2.5 py-2">
                <p className="text-[9px] font-semibold text-foreground">{item.label}</p>
                <p className="text-[9px] text-text-secondary mt-0.5">{item.explanation}</p>
              </div>
            ))}
          </div>
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

      {/* Visual comparator */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border pt-4">
        <div className="rounded-lg border border-border p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <Grid3X3 className="w-3.5 h-3.5 text-azure" />
            <p className="text-[10px] font-semibold text-foreground">Dato estructurado</p>
          </div>
          <div className="rounded-md bg-gray-900 p-2.5 font-mono text-[9px] text-white space-y-0.5">
            <p>| nombre | matrícula | promedio |</p>
            <p>|--------|-----------|---------|</p>
            <p>| Ana    | 12345     | 9.2     |</p>
            <p>| Luis   | 12346     | 8.7     |</p>
          </div>
          <p className="text-[9px] text-text-secondary">Esquema rígido, campos definidos, consultable con filtros y reglas.</p>
        </div>
        <div className="rounded-lg border border-border p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-orange" />
            <p className="text-[10px] font-semibold text-foreground">Dato no estructurado</p>
          </div>
          <div className="rounded-md bg-gray-900 p-2.5 flex items-center gap-2">
            <Image className="w-6 h-6 text-white" />
            <Video className="w-6 h-6 text-white" />
            <Music className="w-6 h-6 text-white" />
            <FileText className="w-6 h-6 text-white" />
          </div>
          <p className="text-[9px] text-text-secondary">Sin esquema tabular, contenido libre, requiere estrategias flexibles.</p>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">La forma del dato importa.</span> Los datos estructurados se consultan con SQL y filtros; los no estructurados requieren almacenamiento flexible y, para extraer valor, herramientas de ML o procesamiento especializado.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">En GCP:</span> Datos estructurados → BigQuery, Cloud SQL, Spanner. Datos no estructurados → Cloud Storage. Semi-estructurados → Firestore, Bigtable. La clasificación guía qué servicio usar.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> Datos estructurados → RDS, Redshift, Athena. Datos no estructurados → S3. Semi-estructurados → DynamoDB. Data lakes combinan ambos tipos en S3 con catálogo Glue.
          </p>
        )}
      </div>
    </div>
  );
}
