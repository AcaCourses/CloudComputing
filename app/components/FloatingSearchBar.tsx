"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, ArrowRight, Loader2, AlertCircle, X } from "lucide-react";
import { API_URL, STORAGE_KEYS, SearchResult, fetchWithTimeout } from "../lib/api";

export default function FloatingSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "slow">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const slowTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cargar búsquedas recientes desde localStorage al montar
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("No se pudo cargar búsquedas recientes", e);
    }
  }, []);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Manejar el debounce y la petición de búsqueda
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setStatus("idle");
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
      return;
    }

    // Cancelar petición anterior si existía
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setStatus("loading");
    setSelectedIndex(-1);

    // Timer de advertencia "slow" (>3s)
    if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    slowTimerRef.current = setTimeout(() => {
      setStatus((prev) => (prev === "loading" ? "slow" : prev));
    }, 3000);

    const debounceTimer = setTimeout(async () => {
      try {
        const response = await fetchWithTimeout(
          `${API_URL}/search`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query.trim(), k: 6 }),
            signal: abortControllerRef.current?.signal,
          },
          12000
        );

        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        const data = await response.json();
        setResults(data.results || []);
        setStatus("success");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setStatus("error");
          setErrorMessage(err.message || "Error al conectar con la búsqueda");
        }
      } finally {
        if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
      }
    }, 350);

    return () => {
      clearTimeout(debounceTimer);
      if (slowTimerRef.current) clearTimeout(slowTimerRef.current);
    };
  }, [query]);

  // Guardar en búsquedas recientes
  const saveRecentSearch = (term: string) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) return;
    const updated = [cleanTerm, ...recentSearches.filter((s) => s !== cleanTerm)].slice(0, 8);
    setRecentSearches(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(updated));
    } catch (e) {
      console.warn("No se pudo guardar la búsqueda reciente", e);
    }
  };

  // Navegar al resultado
  const handleSelectResult = (result: SearchResult) => {
    saveRecentSearch(result.title || query);
    setIsOpen(false);
    setQuery("");

    // Navegación mediante router push y scroll a la sección/ancla
    router.push(result.url);

    setTimeout(() => {
      const targetId = result.slug;
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth", block: "start" });
        // Efecto temporal de resalte (Highlight visual estilo Gemini)
        elem.classList.add("ring-2", "ring-cyan-500", "ring-offset-2", "transition-all", "duration-500");
        setTimeout(() => {
          elem.classList.remove("ring-2", "ring-cyan-500", "ring-offset-2");
        }, 2500);
      }
    }, 200);
  };

  // Teclado (Navegación con flechas)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        e.preventDefault();
        handleSelectResult(results[selectedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-xl z-40">
      {/* Barra de Búsqueda Flotante Principal Estilo Dock */}
      <div className="relative flex items-center bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 focus-within:border-cyan-400 focus-within:ring-4 focus-within:ring-cyan-500/20 transition-all duration-300">
        <Search className="w-5 h-5 ml-4 text-cyan-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar temas, GCP, laboratorios o conceptos..."
          className="w-full py-3.5 pl-3 pr-10 text-sm text-slate-100 bg-transparent placeholder-slate-400 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="p-1.5 mr-2 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown de Resultados Desplegable Hacia Arriba (bottom-full) */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-3 bg-slate-900/95 backdrop-blur-xl border border-slate-700/90 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-[60vh] overflow-y-auto">
          {/* Estado de Carga y Mensaje Slow (>3s) */}
          {(status === "loading" || status === "slow") && (
            <div className="p-4 flex items-center space-x-3 text-slate-300 text-sm border-b border-slate-800">
              <Loader2 className="w-5 h-5 text-cyan-400 animate-spin shrink-0" />
              <span>
                {status === "slow"
                  ? "Esto está tardando más de lo normal (el servidor puede estar despertando en Render)..."
                  : "Buscando en lecciones y laboratorios..."}
              </span>
            </div>
          )}

          {/* Mensaje de Error */}
          {status === "error" && (
            <div className="p-4 flex items-center space-x-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Resultados de Búsqueda */}
          {query.trim() !== "" && results.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-1.5 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Resultados coincidentes
              </div>
              {results.map((res, index) => (
                <div
                  key={res.id}
                  onClick={() => handleSelectResult(res)}
                  className={`px-4 py-3 cursor-pointer transition-colors border-b border-slate-800/60 last:border-0 ${
                    selectedIndex === index ? "bg-cyan-950/60 text-cyan-200" : "hover:bg-slate-800/60 text-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-cyan-300">{res.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
                      {res.labNumber ? `Lab ${res.labNumber}` : `Unidad ${res.unidad}`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{res.snippet}</p>
                </div>
              ))}
            </div>
          )}

          {/* Si no hay resultados */}
          {query.trim() !== "" && status === "success" && results.length === 0 && (
            <div className="p-6 text-center text-sm text-slate-400">
              No se encontraron coincidencias para &quot;{query}&quot;
            </div>
          )}

          {/* Búsquedas Recientes (Query Vacía) */}
          {query.trim() === "" && recentSearches.length > 0 && (
            <div className="py-2">
              <div className="px-4 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Búsquedas recientes</span>
                <button
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-300"
                >
                  Limpiar
                </button>
              </div>
              {recentSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(term)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/60 flex items-center space-x-2 transition-colors"
                >
                  <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
