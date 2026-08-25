"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, RefreshCw, ThumbsUp, ThumbsDown, Zap, Clock, 
  ShieldAlert, BookOpen, Search, CheckCircle2, AlertTriangle, 
  Key, Lock, Sparkles, HelpCircle, UserCheck, MessageSquare, Layers
} from "lucide-react";
import { API_URL, STORAGE_KEYS } from "../lib/api";

interface LogItem {
  id: string;
  user_query: string;
  assistant_snippet: string;
  unidad: number | null;
  sources_count: number;
  response_time_ms: number;
  status: string;
  rating: number | null;
  feedback_comment: string | null;
  created_at: string;
}

interface AnalyticsData {
  configured: boolean;
  message?: string;
  error?: string;
  total_queries_sample: number;
  success_count: number;
  cached_hits_count: number;
  cache_hit_ratio_percent: number;
  error_count: number;
  blocked_guardrails_count: number;
  positive_ratings: number;
  negative_ratings: number;
  satisfaction_rate_percent: number;
  avg_response_time_ms: number;
  unit_breakdown: Record<string, number>;
  recent_logs: LogItem[];
}

export default function TeacherDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [hasValidKey, setHasValidKey] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [unitFilter, setUnitFilter] = useState("all");

  useEffect(() => {
    const savedKey = localStorage.getItem(STORAGE_KEYS.CHAT_ACCESS_KEY) || "";
    if (savedKey) {
      setAccessKey(savedKey);
      setHasValidKey(true);
      fetchAnalytics(savedKey);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAnalytics = async (keyToUse: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/chat/stats?access_key=${encodeURIComponent(keyToUse)}`, {
        headers: {
          "X-Access-Key": keyToUse
        }
      });

      if (res.status === 401) {
        setHasValidKey(false);
        setErrorMsg("🔒 Clave de acceso requerida o incorrecta.");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error(`Error en servidor (${res.status})`);
      }

      const json = await res.json();
      setData(json);
      setHasValidKey(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Error al conectar con el backend de analíticas");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = accessKey.trim();
    if (!cleanKey) return;
    localStorage.setItem(STORAGE_KEYS.CHAT_ACCESS_KEY, cleanKey);
    fetchAnalytics(cleanKey);
  };

  const filteredLogs = (data?.recent_logs || []).filter((log) => {
    const matchesSearch = 
      log.user_query.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.assistant_snippet.toLowerCase().includes(searchFilter.toLowerCase());
    
    const matchesUnit = 
      unitFilter === "all" || 
      (unitFilter === "general" && log.unidad === null) ||
      (log.unidad !== null && log.unidad.toString() === unitFilter);

    return matchesSearch && matchesUnit;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 pt-24 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Encabezado del Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 backdrop-blur-xl p-6 rounded-3xl shadow-xl">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Panel de Control Pedagógico</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-cyan-400" />
              Analíticas del Tutor IA & Diagnóstico del Curso
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Supervisión en tiempo real de preguntas de alumnos, tasa de satisfacción y temas con mayor duda.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => fetchAnalytics(accessKey)}
              disabled={loading || !hasValidKey}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>Actualizar Datos</span>
            </button>
          </div>
        </div>

        {/* Modal de Autenticación Docente */}
        {(!hasValidKey || errorMsg) && (
          <div className="bg-slate-900 border border-amber-500/40 p-6 rounded-3xl max-w-xl mx-auto space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-amber-400 font-bold text-base">
              <Lock className="w-6 h-6 shrink-0" />
              <span>Acceso Restringido para Docentes</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ingresa la Clave del Curso asignada en Render/variables de entorno para visualizar el reporte completo de estadísticas.
            </p>
            <form onSubmit={handleSaveKey} className="flex items-center space-x-2">
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Clave de acceso (ej. rgm8dh)"
                className="flex-1 bg-slate-950 border border-slate-700 focus:border-amber-500 text-xs rounded-xl px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
              >
                Ingresar
              </button>
            </form>
            {errorMsg && <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>}
          </div>
        )}

        {/* Contenido Principal de Analíticas */}
        {hasValidKey && data && (
          <>
            {/* Grid de KPIs Principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Total Consultas */}
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Total Consultas</span>
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-3xl font-black text-slate-100">
                  {data.total_queries_sample}
                </div>
                <p className="text-[11px] text-slate-400">Preguntas registradas por alumnos</p>
              </div>

              {/* Card 2: Satisfacción Alumnos */}
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Satisfacción Alumnos</span>
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-black text-emerald-400 flex items-baseline gap-1">
                  <span>{data.satisfaction_rate_percent}%</span>
                  <span className="text-xs font-normal text-slate-400">👍</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{data.positive_ratings} Útiles</span>
                  <span>{data.negative_ratings} No útiles</span>
                </div>
              </div>

              {/* Card 3: Eficiencia Caché Semántica */}
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg hover:border-amber-500/30 transition-colors">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Ahorro Caché Semántica</span>
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="text-3xl font-black text-amber-300">
                  {data.cache_hit_ratio_percent}%
                </div>
                <p className="text-[11px] text-slate-400">
                  {data.cached_hits_count} consultas resueltas a 0 tokens (&lt;50ms)
                </p>
              </div>

              {/* Card 4: Latencia Media */}
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl space-y-2 shadow-lg hover:border-blue-500/30 transition-colors">
                <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                  <span>Latencia Promedio</span>
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-3xl font-black text-blue-400">
                  {data.avg_response_time_ms} ms
                </div>
                <p className="text-[11px] text-slate-400">Tiempo medio de respuesta SSE</p>
              </div>

            </div>

            {/* Fila 2: Desglose por Unidad Temática & Métricas Técnicas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Gráfico de Barras de Dudas por Unidad */}
              <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    Distribución de Dudas por Unidad Temática
                  </h3>
                  <span className="text-xs text-slate-400">Mapa de calor pedagógico</span>
                </div>

                <div className="space-y-3 pt-2">
                  {Object.entries(data.unit_breakdown || {}).length === 0 && (
                    <p className="text-xs text-slate-500">No hay datos por unidad registrados aún.</p>
                  )}

                  {Object.entries(data.unit_breakdown || {})
                    .sort((a, b) => b[1] - a[1])
                    .map(([unitName, count]) => {
                      const percentage = Math.round((count / (data.total_queries_sample || 1)) * 100);
                      return (
                        <div key={unitName} className="space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className="text-slate-200">{unitName}</span>
                            <span className="text-cyan-400 font-bold">{count} preguntas ({percentage}%)</span>
                          </div>
                          <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(percentage, 4)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Panel de Salud del Sistema y Guardrails */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  Salud & Seguridad RAG
                </h3>

                <div className="space-y-3 pt-1 text-xs">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">IA Groq (Modelos Activos)</span>
                    <span className="font-bold text-emerald-400">{data.success_count - data.cached_hits_count} resueltas</span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Respuestas en Caché</span>
                    <span className="font-bold text-amber-400">{data.cached_hits_count} instantáneas</span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Bloqueos por Guardrails</span>
                    <span className="font-bold text-cyan-400">{data.blocked_guardrails_count} rechazadas</span>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400">Errores de Generación</span>
                    <span className="font-bold text-rose-400">{data.error_count} errores</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Fila 3: Tabla de Actividad y Consultas Recientes */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl space-y-4 shadow-xl">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" />
                    Bitácora en Tiempo Real de Consultas
                  </h3>
                  <p className="text-xs text-slate-400">Últimas preguntas realizadas por los alumnos con snippet y calificación</p>
                </div>

                {/* Filtros de Búsqueda y Unidad */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Buscar duda..."
                      className="bg-slate-950 border border-slate-800 text-xs rounded-xl pl-9 pr-3 py-2 text-slate-200 placeholder-slate-500 outline-none focus:border-cyan-500"
                    />
                  </div>

                  <select
                    value={unitFilter}
                    onChange={(e) => setUnitFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-slate-200 outline-none focus:border-cyan-500"
                  >
                    <option value="all">Todas las Unidades</option>
                    <option value="general">General / Duda Global</option>
                    <option value="1">Unidad 1</option>
                    <option value="2">Unidad 2</option>
                    <option value="3">Unidad 3</option>
                    <option value="4">Unidad 4</option>
                  </select>
                </div>
              </div>

              {/* Tabla de Registros */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                      <th className="p-3">Fecha / Hora</th>
                      <th className="p-3">Unidad</th>
                      <th className="p-3">Consulta del Alumno</th>
                      <th className="p-3">Latencia</th>
                      <th className="p-3">Origen</th>
                      <th className="p-3">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLogs.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-slate-500">
                          No se encontraron registros de consultas coincidentes.
                        </td>
                      </tr>
                    )}

                    {filteredLogs.map((log) => (
                      <tr key={log.id || Math.random().toString()} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 text-slate-400 whitespace-nowrap">
                          {new Date(log.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          <span className="block text-[10px] text-slate-500">
                            {new Date(log.created_at).toLocaleDateString("es-MX")}
                          </span>
                        </td>

                        <td className="p-3 font-semibold text-cyan-400 whitespace-nowrap">
                          {log.unidad !== null ? `Unidad ${log.unidad}` : "General"}
                        </td>

                        <td className="p-3 max-w-md">
                          <p className="font-semibold text-slate-100 line-clamp-1">{log.user_query}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{log.assistant_snippet}</p>
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          <span className="font-mono text-slate-300">{log.response_time_ms} ms</span>
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          {log.status === "success_cached" ? (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px]">
                              <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                              <span>Caché</span>
                            </span>
                          ) : log.status === "success" ? (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px]">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                              <span>Groq IA</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-[10px]">
                              <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                              <span>Error/Rechazo</span>
                            </span>
                          )}
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          {log.rating === 1 ? (
                            <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>Útil</span>
                            </span>
                          ) : log.rating === -1 ? (
                            <span className="inline-flex items-center space-x-1 text-rose-400 font-bold">
                              <ThumbsDown className="w-3.5 h-3.5" />
                              <span>No útil</span>
                            </span>
                          ) : (
                            <span className="text-slate-600 text-[11px]">Sin calificar</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}
