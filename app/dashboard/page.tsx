"use client";

import { useState, useEffect } from "react";
import { 
  BarChart3, RefreshCw, ThumbsUp, ThumbsDown, Zap, Clock, 
  ShieldAlert, BookOpen, Search, CheckCircle2, AlertTriangle, 
  Lock, Sparkles, Layers, PieChart, Sun, Moon, TrendingUp, Activity
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

  // Calcular franjas horarias de estudio (Mañana: 6-12, Tarde: 12-18, Noche: 18-24, Madrugada: 0-6)
  const timeSlots = { "Mañana (6-12h)": 0, "Tarde (12-18h)": 0, "Noche (18-24h)": 0, "Madrugada (0-6h)": 0 };
  (data?.recent_logs || []).forEach((log) => {
    const hour = new Date(log.created_at).getHours();
    if (hour >= 6 && hour < 12) timeSlots["Mañana (6-12h)"] += 1;
    else if (hour >= 12 && hour < 18) timeSlots["Tarde (12-18h)"] += 1;
    else if (hour >= 18 && hour < 24) timeSlots["Noche (18-24h)"] += 1;
    else timeSlots["Madrugada (0-6h)"] += 1;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-8 pt-24 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Encabezado del Dashboard - Modo Claro / Azul Oscuro Elegante */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>Panel de Control Pedagógico Docente</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-blue-800" />
              Analíticas del Tutor IA & Diagnóstico del Curso
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Supervisión en tiempo real de dudas de estudiantes, tasa de satisfacción y temas con mayor consulta.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => fetchAnalytics(accessKey)}
              disabled={loading || !hasValidKey}
              className="px-4 py-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>Actualizar Datos</span>
            </button>
          </div>
        </div>

        {/* Modal de Autenticación Docente */}
        {(!hasValidKey || errorMsg) && (
          <div className="bg-white border border-amber-300 p-6 rounded-3xl max-w-xl mx-auto space-y-4 shadow-md">
            <div className="flex items-center space-x-3 text-amber-800 font-bold text-base">
              <Lock className="w-6 h-6 shrink-0 text-amber-600" />
              <span>Acceso Restringido para Docentes</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ingresa la Clave del Curso asignada en Render/variables de entorno para visualizar el reporte completo de estadísticas.
            </p>
            <form onSubmit={handleSaveKey} className="flex items-center space-x-2">
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Clave de acceso (ej. rgm8dh)"
                className="flex-1 bg-slate-50 border border-slate-300 focus:border-blue-600 text-xs rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 outline-none"
              />
              <button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
              >
                Ingresar
              </button>
            </form>
            {errorMsg && <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>}
          </div>
        )}

        {/* Contenido Principal de Analíticas */}
        {hasValidKey && data && (
          <>
            {/* Grid de KPIs Principales (Tarjetas Blancas con Texto Azul Oscuro y Bordes Elegantes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Total Consultas */}
              <div className="bg-white border border-slate-200/90 p-6 rounded-2xl space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Total Consultas</span>
                  <div className="p-2 bg-blue-50 text-blue-900 rounded-xl">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-blue-950">
                  {data.total_queries_sample}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Preguntas registradas por alumnos</p>
              </div>

              {/* Card 2: Satisfacción Alumnos */}
              <div className="bg-white border border-slate-200/90 p-6 rounded-2xl space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Satisfacción Alumnos</span>
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                    <ThumbsUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-emerald-700 flex items-baseline gap-1">
                  <span>{data.satisfaction_rate_percent}%</span>
                  <span className="text-xs font-normal text-slate-500">👍</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium pt-1">
                  <span className="text-emerald-700 font-semibold">{data.positive_ratings} Útiles</span>
                  <span className="text-rose-600 font-semibold">{data.negative_ratings} No útiles</span>
                </div>
              </div>

              {/* Card 3: Eficiencia Caché Semántica */}
              <div className="bg-white border border-slate-200/90 p-6 rounded-2xl space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Caché Semántica</span>
                  <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                    <Zap className="w-4 h-4 fill-amber-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-amber-700">
                  {data.cache_hit_ratio_percent}%
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {data.cached_hits_count} consultas resueltas a 0 tokens (&lt;50ms)
                </p>
              </div>

              {/* Card 4: Latencia Media */}
              <div className="bg-white border border-slate-200/90 p-6 rounded-2xl space-y-2 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <span>Latencia Media</span>
                  <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-indigo-950">
                  {data.avg_response_time_ms} ms
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Tiempo medio de respuesta SSE</p>
              </div>

            </div>

            {/* Fila 2: Gráficas Adicionales (Barras por Unidad + Anillo de Satisfacción + Horarios de Estudio) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Gráfica 1: Barras de Dudas por Unidad Temática */}
              <div className="lg:col-span-2 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-800" />
                      Distribución de Dudas por Unidad Temática
                    </h3>
                    <p className="text-xs text-slate-500">Muestra las unidades del programa con mayor concentración de preguntas</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-800 rounded-full">
                    Programa del Curso
                  </span>
                </div>

                <div className="space-y-4 pt-1">
                  {Object.entries(data.unit_breakdown || {}).length === 0 && (
                    <p className="text-xs text-slate-400">No hay datos por unidad registrados aún.</p>
                  )}

                  {Object.entries(data.unit_breakdown || {})
                    .sort((a, b) => b[1] - a[1])
                    .map(([unitName, count]) => {
                      const percentage = Math.round((count / (data.total_queries_sample || 1)) * 100);
                      return (
                        <div key={unitName} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-800">{unitName}</span>
                            <span className="text-blue-900 font-bold">{count} preguntas ({percentage}%)</span>
                          </div>
                          <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div
                              className="h-full bg-gradient-to-r from-blue-800 to-indigo-600 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(percentage, 4)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Gráfica 2: Donut / Indicador de Satisfacción del Alumno */}
              <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl space-y-5 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-blue-950 flex items-center gap-2 border-b border-slate-100 pb-4">
                    <PieChart className="w-5 h-5 text-emerald-600" />
                    Índice de Aprobación del Alumno
                  </h3>
                  <p className="text-xs text-slate-500 mt-2">Valoración general de la utilidad de las respuestas</p>
                </div>

                {/* Anillo Visual SVG */}
                <div className="flex flex-col items-center justify-center my-4 relative">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-100"
                      strokeWidth="3.8"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-500 transition-all duration-1000 ease-out"
                      strokeDasharray={`${data.satisfaction_rate_percent}, 100`}
                      strokeWidth="3.8"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-black text-slate-900">{data.satisfaction_rate_percent}%</span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Positivo</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs pt-2 border-t border-slate-100">
                  <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="text-emerald-800 font-bold block">{data.positive_ratings}</span>
                    <span className="text-[10px] text-emerald-700">👍 Útiles</span>
                  </div>
                  <div className="p-2 bg-rose-50 rounded-xl border border-rose-100">
                    <span className="text-rose-800 font-bold block">{data.negative_ratings}</span>
                    <span className="text-[10px] text-rose-700">👎 No útiles</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Fila 3: Gráfica Adicional de Horarios de Estudio + Salud de Sistema */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Gráfica 3: Hábitos y Franjas Horarias de Estudio */}
              <div className="lg:col-span-2 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-700" />
                      Franjas Horarias de Mayor Estudio
                    </h3>
                    <p className="text-xs text-slate-500">Identifica a qué horas del día los estudiantes realizan más consultas</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-900 rounded-full">
                    Actividad Diaria
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {Object.entries(timeSlots).map(([slotName, count]) => (
                    <div key={slotName} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-1">
                      <span className="text-[11px] font-semibold text-slate-600 block">{slotName}</span>
                      <span className="text-2xl font-black text-blue-950 block">{count}</span>
                      <span className="text-[10px] text-slate-500">consultas</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Salud del Servicio RAG & Guardrails */}
              <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-blue-950 flex items-center gap-2 border-b border-slate-100 pb-4">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  Rendimiento y Seguridad RAG
                </h3>

                <div className="space-y-2.5 text-xs pt-1">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">IA Groq (Modelos Activos)</span>
                    <span className="font-bold text-blue-900">{data.success_count - data.cached_hits_count} resueltas</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Caché Semántica</span>
                    <span className="font-bold text-amber-700">{data.cached_hits_count} instantáneas</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Bloqueos Guardrails</span>
                    <span className="font-bold text-slate-700">{data.blocked_guardrails_count} rechazadas</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                    <span className="text-slate-600 font-medium">Errores de Generación</span>
                    <span className="font-bold text-rose-700">{data.error_count} errores</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Fila 4: Bitácora de Consultas Recientes (Tabla en Fondo Blanco con Texto Oscuro) */}
            <div className="bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-800" />
                    Bitácora en Tiempo Real de Consultas
                  </h3>
                  <p className="text-xs text-slate-500">Últimas preguntas realizadas por los alumnos con snippet y calificación</p>
                </div>

                {/* Filtros de Búsqueda y Unidad */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder="Buscar duda..."
                      className="bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 text-slate-800 placeholder-slate-400 outline-none focus:border-blue-700"
                    />
                  </div>

                  <select
                    value={unitFilter}
                    onChange={(e) => setUnitFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 outline-none focus:border-blue-700 font-medium"
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
                    <tr className="border-b border-slate-200 text-slate-500 bg-slate-50/80 uppercase font-semibold text-[11px]">
                      <th className="p-3">Hora / Fecha</th>
                      <th className="p-3">Unidad</th>
                      <th className="p-3">Consulta del Alumno</th>
                      <th className="p-3">Latencia</th>
                      <th className="p-3">Origen</th>
                      <th className="p-3">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLogs.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                          No se encontraron registros de consultas coincidentes.
                        </td>
                      </tr>
                    )}

                    {filteredLogs.map((log) => (
                      <tr key={log.id || Math.random().toString()} className="hover:bg-blue-50/40 transition-colors">
                        <td className="p-3 text-slate-600 whitespace-nowrap">
                          <span className="font-semibold text-slate-800 block">
                            {new Date(log.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(log.created_at).toLocaleDateString("es-MX")}
                          </span>
                        </td>

                        <td className="p-3 font-bold text-blue-900 whitespace-nowrap">
                          {log.unidad !== null ? `Unidad ${log.unidad}` : "General"}
                        </td>

                        <td className="p-3 max-w-md">
                          <p className="font-bold text-slate-900 line-clamp-1">{log.user_query}</p>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{log.assistant_snippet}</p>
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          <span className="font-mono text-slate-700 font-medium">{log.response_time_ms} ms</span>
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          {log.status === "success_cached" ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold">
                              <Zap className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
                              <span>Caché</span>
                            </span>
                          ) : log.status === "success" ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-semibold">
                              <CheckCircle2 className="w-2.5 h-2.5 text-blue-700" />
                              <span>Groq IA</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-semibold">
                              <AlertTriangle className="w-2.5 h-2.5 text-rose-600" />
                              <span>Rechazo</span>
                            </span>
                          )}
                        </td>

                        <td className="p-3 whitespace-nowrap">
                          {log.rating === 1 ? (
                            <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold">
                              <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Útil</span>
                            </span>
                          ) : log.rating === -1 ? (
                            <span className="inline-flex items-center space-x-1 text-rose-600 font-bold">
                              <ThumbsDown className="w-3.5 h-3.5 text-rose-600" />
                              <span>No útil</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Sin calificar</span>
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
