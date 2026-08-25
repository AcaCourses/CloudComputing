"use client";

import { useState, useEffect } from "react";
import { API_URL, STORAGE_KEYS, ExamResponse, fetchWithTimeout } from "../lib/api";
import { ClassifyCases } from "./ClassifyCases";
import { Sparkles, Loader2, AlertCircle, RefreshCw, Layers, TestTube, Check, X as XIcon } from "lucide-react";

export default function ExamGeneratorModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [unidad, setUnidad] = useState<number | null>(1);
  const [labNumber, setLabNumber] = useState<number | null>(null);
  const [tipo, setTipo] = useState<"quiz" | "scenario" | "matching" | "classify" | "all">("all");
  const [cantidad, setCantidad] = useState<number>(5);

  const [examData, setExamData] = useState<ExamResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Precargar última configuración desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAM_CONFIG);
      if (saved) {
        const config = JSON.parse(saved);
        setUnidad(config.unidad ?? 1);
        setLabNumber(config.labNumber ?? null);
        setTipo(config.tipo ?? "all");
        setCantidad(config.cantidad ?? 5);
      }
    } catch (e) {
      console.warn("No se pudo cargar la configuración previa del examen", e);
    }
  }, []);

  if (!isOpen) return null;

  // Selección mutuamente excluyente entre Unidad y Lab
  const handleSelectUnidad = (u: number | null) => {
    setUnidad(u);
    if (u !== null) setLabNumber(null);
  };

  const handleSelectLab = (l: number | null) => {
    setLabNumber(l);
    if (l !== null) setUnidad(null);
  };

  const handleGenerate = async () => {
    setStatus("loading");
    setErrorMessage("");

    const config = { unidad, labNumber, tipo, cantidad };
    try {
      localStorage.setItem(STORAGE_KEYS.EXAM_CONFIG, JSON.stringify(config));
    } catch (e) {}

    try {
      const accessKey = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEYS.CHAT_ACCESS_KEY) || "") : "";

      const response = await fetchWithTimeout(
        `${API_URL}/exam`,
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "X-Access-Key": accessKey,
          },
          body: JSON.stringify({ ...config, access_key: accessKey }),
        },
        20000
      );

      if (response.status === 401) {
        throw new Error("Clave de acceso requerida o incorrecta. Por favor ingresa la clave en el Chatbot.");
      }

      if (!response.ok) throw new Error(`Error generando examen (${response.status})`);

      const data = await response.json();
      setExamData(data);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "No se pudo conectar con el backend en Render para generar el examen.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Cabecera Modal */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
              <Sparkles className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100">Generador de Exámenes e Inferencia</h2>
              <p className="text-xs text-slate-400">Generación dinámica basada en style-examples del curso</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-sm px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Cerrar ✕
          </button>
        </div>

        {/* Cuerpo Modal */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Panel de Configuración */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            {/* Selección Unidad (Mutuamente excluyente con Lab) */}
            <div>
              <label className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Filtrar por Unidad
              </label>
              <select
                value={unidad ?? ""}
                onChange={(e) => handleSelectUnidad(e.target.value ? Number(e.target.value) : null)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:border-cyan-500 focus:outline-none"
              >
                <option value="">-- Sin filtro por Unidad --</option>
                {[1, 2, 3, 4, 5, 6, 7].map((u) => (
                  <option key={u} value={u}>
                    Unidad {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Selección Lab (Mutuamente excluyente con Unidad) */}
            <div>
              <label className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <TestTube className="w-3.5 h-3.5" /> O Filtrar por Laboratorio
              </label>
              <select
                value={labNumber ?? ""}
                onChange={(e) => handleSelectLab(e.target.value ? Number(e.target.value) : null)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:border-cyan-500 focus:outline-none"
              >
                <option value="">-- Sin filtro por Lab --</option>
                {[1, 2, 3, 4, 5, 6, 7].map((l) => (
                  <option key={l} value={l}>
                    Laboratorio {l}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipo de Ejercicio */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tipo de Reactivo</label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:border-cyan-500 focus:outline-none"
              >
                <option value="all">Todos los tipos (Quiz, Escenario, Matching)</option>
                <option value="quiz">Opción Múltiple (Quiz)</option>
                <option value="scenario">Escenarios Prácticos</option>
                <option value="matching">Relación de Conceptos</option>
                <option value="classify">Clasificación de Casos</option>
              </select>
            </div>

            {/* Cantidad */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cantidad de Preguntas</label>
              <select
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:border-cyan-500 focus:outline-none"
              >
                <option value={3}>3 Preguntas</option>
                <option value={5}>5 Preguntas</option>
                <option value={8}>8 Preguntas</option>
                <option value={10}>10 Preguntas</option>
              </select>
            </div>
          </div>

          {/* Botón Acción */}
          <button
            onClick={handleGenerate}
            disabled={status === "loading"}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-950/50 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Generando reactivos con Few-Shot (Backend Render)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generar Examen</span>
              </>
            )}
          </button>

          {/* Error */}
          {status === "error" && (
            <div className="p-4 bg-red-950/40 border border-red-800/80 rounded-2xl flex items-center space-x-3 text-red-300 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Renderizado de Resultados Reutilizando Componentes Existentes */}
          {status === "success" && examData && (
            <div className="space-y-6 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
                  Examen Generado ({examData.total_examples} reactivos)
                </h3>
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center space-x-1 text-xs text-slate-400 hover:text-cyan-400"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Regenerar</span>
                </button>
              </div>

              {examData.questions.map((q, idx) => (
                <div key={idx} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                  {q.question && q.options && (
                    <div className="space-y-3">
                      <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded font-mono">
                        Opción Múltiple
                      </span>
                      <p className="text-xs text-slate-100 font-semibold">{q.question}</p>
                      <div className="space-y-1.5">
                        {q.options.map((opt: any, oIdx: number) => (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border text-xs flex items-start justify-between ${
                              opt.correct
                                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                                : "bg-slate-900/60 border-slate-800 text-slate-300"
                            }`}
                          >
                            <span>{opt.label}</span>
                            {opt.correct && <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {q.situation && (
                    <div className="space-y-2">
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded font-mono">
                        Escenario Práctico
                      </span>
                      <p className="text-xs text-slate-200 font-semibold">{q.situation}</p>
                      <p className="text-xs text-slate-300">{q.question}</p>
                      {q.hint && <p className="text-[11px] text-cyan-400 italic">Pista: {q.hint}</p>}
                    </div>
                  )}

                  {q.cases && (
                    <ClassifyCases title="Clasificación de Casos" description={q.description || ""} cases={q.cases} />
                  )}

                  {q.taskTitle && (
                    <div className="space-y-2">
                      <span className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded font-mono">
                        Tarea de Laboratorio
                      </span>
                      <h4 className="text-xs font-bold text-cyan-300">{q.taskTitle}</h4>
                      <p className="text-xs text-slate-300">{q.conceptNote}</p>
                      <p className="text-xs text-amber-300 font-medium">Pregunta Guía: {q.guidingQuestion}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
