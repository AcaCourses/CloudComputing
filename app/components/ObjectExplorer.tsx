"use client";

import { useState } from "react";
import {
  Image,
  Video,
  FileText,
  Archive,
  FileCode,
  Box,
  Tag,
  Calendar,
  User,
  HardDrive,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Database,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type StorageObject = {
  id: string;
  name: string;
  icon: React.ReactNode;
  type: string;
  size: string;
  metadata: { key: string; value: string }[];
  whyObject: string;
};

type ClassifyItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  isObject: boolean;
  explanation: string;
};

export function ObjectExplorer() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [showClassifier, setShowClassifier] = useState(false);
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [showResults, setShowResults] = useState(false);

  const objects: StorageObject[] = [
    {
      id: "foto",
      name: "practica-lab3.jpg",
      icon: <Image className="w-5 h-5" />,
      type: "image/jpeg",
      size: "2.4 MB",
      metadata: [
        { key: "Content-Type", value: "image/jpeg" },
        { key: "Autor", value: "Estudiante A" },
        { key: "Fecha", value: "2026-03-15" },
        { key: "Práctica", value: "Laboratorio 3" },
      ],
      whyObject: "Una imagen no tiene estructura tabular. Se guarda como unidad con metadatos que la describen (autor, fecha, práctica). Acceso por URL, sin necesidad de consultas SQL.",
    },
    {
      id: "video",
      name: "clase-semana5.mp4",
      icon: <Video className="w-5 h-5" />,
      type: "video/mp4",
      size: "450 MB",
      metadata: [
        { key: "Content-Type", value: "video/mp4" },
        { key: "Duración", value: "47 min" },
        { key: "Tema", value: "Contenedores" },
        { key: "Semana", value: "5" },
      ],
      whyObject: "Un video es un bloque grande de datos binarios. El almacenamiento de objetos escala sin problema y permite acceso por streaming o descarga directa.",
    },
    {
      id: "pdf",
      name: "lectura-cloud-intro.pdf",
      icon: <FileText className="w-5 h-5" />,
      type: "application/pdf",
      size: "1.8 MB",
      metadata: [
        { key: "Content-Type", value: "application/pdf" },
        { key: "Páginas", value: "24" },
        { key: "Unidad", value: "1 - Fundamentos" },
        { key: "Compartido", value: "Grupo completo" },
      ],
      whyObject: "Un PDF es contenido no estructurado que no se modifica parcialmente. Se sube, se comparte por URL y se reemplaza cuando hay nueva versión.",
    },
    {
      id: "respaldo",
      name: "backup-proyecto-2026-03.tar.gz",
      icon: <Archive className="w-5 h-5" />,
      type: "application/gzip",
      size: "89 MB",
      metadata: [
        { key: "Content-Type", value: "application/gzip" },
        { key: "Proyecto", value: "App final" },
        { key: "Fecha backup", value: "2026-03-20" },
        { key: "Clase", value: "Coldline" },
      ],
      whyObject: "Los respaldos son archivos grandes, de acceso infrecuente. El almacenamiento de objetos permite guardarlos en clases económicas y recuperarlos cuando sea necesario.",
    },
  ];

  const classifyItems: ClassifyItem[] = [
    { id: "fotos", label: "Fotos de laboratorio", icon: <Image className="w-3.5 h-3.5" />, isObject: true, explanation: "Archivos binarios sin esquema, acceso por URL → ideal como objetos." },
    { id: "videos", label: "Videos de clase", icon: <Video className="w-3.5 h-3.5" />, isObject: true, explanation: "Contenido pesado y no editable parcialmente → almacenamiento de objetos." },
    { id: "pdfs", label: "PDFs de lectura", icon: <FileText className="w-3.5 h-3.5" />, isObject: true, explanation: "Documentos completos que se comparten por enlace → objetos con metadatos." },
    { id: "backups", label: "Archivos de respaldo", icon: <Archive className="w-3.5 h-3.5" />, isObject: true, explanation: "Bloques grandes de acceso infrecuente → objetos en clase económica." },
    { id: "tabla", label: "Tabla de calificaciones", icon: <Database className="w-3.5 h-3.5" />, isObject: false, explanation: "Datos tabulares que se consultan y filtran por campos → base de datos relacional, no objetos." },
    { id: "editable", label: "Documento editable colaborativo", icon: <FileCode className="w-3.5 h-3.5" />, isObject: false, explanation: "Se edita constantemente por múltiples usuarios → mejor en sistema colaborativo, no como objeto estático." },
  ];

  const activeObject = objects.find((o) => o.id === selectedObject);

  const classify = (id: string, value: boolean) => {
    if (!showResults) setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const checkClassifier = () => setShowResults(true);
  const resetClassifier = () => { setAnswers({}); setShowResults(false); };

  const allClassified = classifyItems.every((item) => answers[item.id] != null);
  const correctCount = classifyItems.filter((item) => answers[item.id] === item.isObject).length;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Box className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Explorador de objetos
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Haz clic en cada archivo para ver su contenido, metadatos y por qué se almacena como objeto.
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

      {/* Object cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {objects.map((obj) => (
          <button
            key={obj.id}
            onClick={() => setSelectedObject(obj.id)}
            className={`flex flex-col items-center gap-2 px-3 py-3 rounded-lg border transition-all text-center ${
              selectedObject === obj.id
                ? "bg-azure/10 border-azure/30"
                : "border-border hover:border-azure/20"
            }`}
          >
            <div className={`${selectedObject === obj.id ? "text-azure" : "text-text-secondary"}`}>
              {obj.icon}
            </div>
            <div>
              <p className={`text-[9px] font-mono font-medium truncate max-w-[100px] ${
                selectedObject === obj.id ? "text-azure" : "text-foreground"
              }`}>
                {obj.name}
              </p>
              <p className="text-[8px] text-text-secondary">{obj.size}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Object detail */}
      {activeObject && (
        <div className="rounded-lg border border-azure/20 bg-azure/5 p-4 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <div className="text-azure">{activeObject.icon}</div>
            <div>
              <p className="text-xs font-mono font-semibold text-foreground">{activeObject.name}</p>
              <p className="text-[9px] text-text-secondary">{activeObject.type} · {activeObject.size}</p>
            </div>
          </div>

          {/* Metadata */}
          <div className="rounded-md bg-gray-900 p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 mb-2">
              <Tag className="w-3 h-3 text-cyan" />
              <p className="text-[9px] font-semibold text-cyan">Metadatos del objeto</p>
            </div>
            {activeObject.metadata.map((m, i) => (
              <div key={i} className="flex items-center gap-2 text-[10px]">
                <span className="text-gray-500 font-mono w-24 shrink-0">{m.key}:</span>
                <span className="text-cyan font-mono">{m.value}</span>
              </div>
            ))}
          </div>

          {/* Why object */}
          <div className="rounded-md bg-white/60 border border-border p-2.5">
            <p className="text-[9px] font-medium text-foreground mb-0.5">¿Por qué almacenarlo como objeto?</p>
            <p className="text-[9px] text-text-secondary">{activeObject.whyObject}</p>
          </div>

          {/* Provider note */}
          {viewMode !== "concept" && (
            <div className={`rounded-md border px-3 py-2 ${
              viewMode === "gcp" ? "border-azure/20 bg-azure/5" : "border-orange/20 bg-orange/5"
            }`}>
              <p className={`text-[9px] font-medium ${viewMode === "gcp" ? "text-azure" : "text-orange"}`}>
                {viewMode === "gcp" ? "En Google Cloud Storage:" : "En Amazon S3:"}
              </p>
              <p className="text-[9px] text-text-secondary mt-0.5">
                {viewMode === "gcp"
                  ? `gs://mi-bucket/${activeObject.name} — Acceso por gsutil, Console o API REST. Versionado opcional.`
                  : `s3://mi-bucket/${activeObject.name} — Acceso por AWS CLI, Console o SDK. Versionado opcional.`
                }
              </p>
            </div>
          )}
        </div>
      )}

      {/* Classifier */}
      <div className="border-t border-border pt-4">
        <button
          onClick={() => setShowClassifier(!showClassifier)}
          className="flex items-center gap-2 text-xs font-medium text-azure hover:text-azure/80 transition-colors"
        >
          <Box className="w-3.5 h-3.5" />
          {showClassifier ? "Ocultar clasificador" : "¿Objeto o no? — Clasifica estos datos"}
        </button>

        {showClassifier && (
          <div className="mt-3 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {classifyItems.map((item) => {
                const userAnswer = answers[item.id];
                const isCorrect = userAnswer === item.isObject;
                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border transition-all ${
                      showResults
                        ? isCorrect ? "border-green/30 bg-green/5" : "border-red-300/30 bg-red-50/50"
                        : userAnswer != null ? "border-azure/20 bg-azure/5" : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`shrink-0 ${showResults ? (isCorrect ? "text-green" : "text-red-500") : "text-text-secondary"}`}>
                        {showResults ? (isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />) : item.icon}
                      </div>
                      <span className="text-[10px] font-medium text-foreground truncate">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => classify(item.id, true)}
                        className={`px-2 py-0.5 rounded text-[8px] font-semibold border transition-all ${
                          userAnswer === true
                            ? showResults && !isCorrect ? "bg-red-100 border-red-300 text-red-600" : "bg-azure/10 border-azure/30 text-azure"
                            : "border-border text-text-secondary hover:border-azure/20"
                        }`}
                      >
                        Sí
                      </button>
                      <button
                        onClick={() => classify(item.id, false)}
                        className={`px-2 py-0.5 rounded text-[8px] font-semibold border transition-all ${
                          userAnswer === false
                            ? showResults && !isCorrect ? "bg-red-100 border-red-300 text-red-600" : "bg-azure/10 border-azure/30 text-azure"
                            : "border-border text-text-secondary hover:border-azure/20"
                        }`}
                      >
                        No
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {showResults && (
              <div className={`rounded-md px-3 py-2 text-xs font-medium ${
                correctCount === classifyItems.length ? "bg-green/10 text-green border border-green/20" : "bg-azure/10 text-azure border border-azure/20"
              }`}>
                {correctCount}/{classifyItems.length} correctas
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={checkClassifier}
                disabled={!allClassified || showResults}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  allClassified && !showResults
                    ? "bg-azure/10 text-azure border border-azure/30 hover:bg-azure/20"
                    : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                }`}
              >
                Verificar
              </button>
              <button
                onClick={resetClassifier}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-text-secondary border border-border hover:border-azure/20 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Anatomy diagram */}
      <div className="rounded-lg border border-border bg-gray-900 p-4">
        <p className="text-[9px] font-semibold text-gray-400 mb-3 uppercase tracking-wider">Anatomía de un objeto</p>
        <div className="flex items-stretch gap-3">
          <div className="flex-1 rounded-md border border-cyan/30 bg-cyan/5 p-3 text-center">
            <HardDrive className="w-4 h-4 text-cyan mx-auto mb-1" />
            <p className="text-[9px] font-semibold text-cyan">Contenido</p>
            <p className="text-[8px] text-gray-400">Los bytes del archivo</p>
          </div>
          <div className="flex-1 rounded-md border border-azure/30 bg-azure/5 p-3 text-center">
            <Tag className="w-4 h-4 text-azure mx-auto mb-1" />
            <p className="text-[9px] font-semibold text-azure">Metadatos</p>
            <p className="text-[8px] text-gray-400">Info descriptiva</p>
          </div>
          <div className="flex-1 rounded-md border border-green/30 bg-green/5 p-3 text-center">
            <Calendar className="w-4 h-4 text-green mx-auto mb-1" />
            <p className="text-[9px] font-semibold text-green">Identificador</p>
            <p className="text-[8px] text-gray-400">Nombre único en bucket</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Objeto =</span> unidad independiente de almacenamiento que combina contenido + metadatos + identificador. No vive en carpetas jerárquicas — vive en buckets planos con prefijos que simulan estructura.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">Cloud Storage:</span> Buckets con nombres globalmente únicos. Objetos accesibles por <code className="text-cyan font-mono">gs://bucket/objeto</code> o URL HTTPS. Clases: Standard, Nearline, Coldline, Archive. IAM + ACL para permisos.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">Amazon S3:</span> Buckets con nombres globalmente únicos. Objetos por <code className="text-orange font-mono">s3://bucket/key</code> o URL HTTPS. Clases: Standard, IA, Glacier. Bucket policies + IAM para permisos.
          </p>
        )}
      </div>
    </div>
  );
}
