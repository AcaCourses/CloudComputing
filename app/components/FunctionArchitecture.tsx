"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Code2,
  Upload,
  Globe,
  Clock,
  Zap,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Package,
  DollarSign,
  Server,
  Play,
  Box,
  ChevronRight,
} from "lucide-react";

/* ─── Datos de escenarios ───────────────────────────── */
const TRIGGERS = [
  {
    id: "storage",
    label: "Imagen subida",
    icon: <Upload className="w-4 h-4" />,
    eventLabel: "google.storage.object.finalized",
    eventSource: "Cloud Storage",
    payload: '{ "bucket": "tareas", "name": "foto.jpg" }',
    functionName: "procesar_imagen",
    functionCode: `@functions_framework.cloud_event
def procesar_imagen(event):
    img = download(event.data["name"])
    thumb = img.thumbnail((300, 300))
    upload(thumb, "thumbs/foto.jpg")`,
    result: "thumbnail creado ✓",
    execMs: 420,
    color: "orange",
  },
  {
    id: "http",
    label: "Webhook HTTP",
    icon: <Globe className="w-4 h-4" />,
    eventLabel: "POST /notificar-slack",
    eventSource: "GitHub Webhook",
    payload: '{ "author": "ana", "commit": "fix bug" }',
    functionName: "notificar_slack",
    functionCode: `@functions_framework.http
def notificar_slack(request):
    data = request.get_json()
    msg = f"🚀 {data['author']}: {data['commit']}"
    slack.post(msg)
    return "OK", 200`,
    result: "Slack notificado ✓",
    execMs: 180,
    color: "blue",
  },
  {
    id: "schedule",
    label: "Cron diario",
    icon: <Clock className="w-4 h-4" />,
    eventLabel: "Cloud Scheduler — 23:59",
    eventSource: "Cloud Scheduler",
    payload: '{ "jobName": "reporte-diario" }',
    functionName: "generar_reporte",
    functionCode: `@functions_framework.http
def generar_reporte(request):
    datos = db.query("SELECT COUNT(*) FROM entregas")
    pdf = render_pdf(datos)
    email.send("director@uni.edu", pdf)
    return "OK", 200`,
    result: "Reporte enviado ✓",
    execMs: 1240,
    color: "purple",
  },
];

/* ─── Colores por tema ──────────────────────────────── */
const C: Record<string, Record<string, string>> = {
  orange: { text: "text-orange", bg: "bg-orange/10", border: "border-orange/40", dot: "bg-orange", pill: "bg-orange/20 text-orange border-orange/30" },
  blue: { text: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/40", dot: "bg-blue-400", pill: "bg-blue-400/20 text-blue-400 border-blue-400/30" },
  purple: { text: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/40", dot: "bg-purple-400", pill: "bg-purple-400/20 text-purple-400 border-purple-400/30" },
};

/* ─── Estados de la animación ───────────────────────── */
type AnimState = "idle" | "event" | "platform" | "boot" | "inject" | "run" | "result" | "destroy" | "zero";

const ANIM_SEQUENCE: { state: AnimState; ms: number }[] = [
  { state: "event",    ms: 600  },
  { state: "platform", ms: 500  },
  { state: "boot",     ms: 700  },
  { state: "inject",   ms: 700  },
  { state: "run",      ms: 1200 },
  { state: "result",   ms: 700  },
  { state: "destroy",  ms: 600  },
  { state: "zero",     ms: 99999 },
];

export function FunctionArchitecture() {
  const [trigger, setTrigger] = useState(0);
  const [animState, setAnimState] = useState<AnimState>("idle");
  const [execPct, setExecPct] = useState(0);
  const [running, setRunning] = useState(false);

  const t = TRIGGERS[trigger];
  const c = C[t.color];

  const runAnimation = useCallback(() => {
    if (running) return;
    setRunning(true);
    setAnimState("idle");
    setExecPct(0);

    let delay = 0;
    ANIM_SEQUENCE.forEach(({ state, ms }) => {
      setTimeout(() => setAnimState(state), delay);
      delay += ms;
    });
    setTimeout(() => setRunning(false), delay - 99999 + 3000);
  }, [running]);

  // exec progress bar
  useEffect(() => {
    if (animState === "run") {
      setExecPct(0);
      const steps = 30;
      const stepMs = (t.execMs * 0.9) / steps;
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setExecPct(Math.round((i / steps) * 100));
        if (i >= steps) clearInterval(iv);
      }, stepMs);
      return () => clearInterval(iv);
    }
  }, [animState, t.execMs]);

  const reset = () => {
    setAnimState("idle");
    setExecPct(0);
    setRunning(false);
  };

  const changeTrigger = (idx: number) => {
    reset();
    setTrigger(idx);
  };

  /* helpers */
  const after = (s: AnimState) => {
    const order: AnimState[] = ["idle","event","platform","boot","inject","run","result","destroy","zero"];
    return order.indexOf(animState) >= order.indexOf(s);
  };
  const is = (s: AnimState) => animState === s;

  return (
    <div className="rounded-xl border border-border bg-panel/30 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border/50">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-orange" />
          <h3 className="text-sm font-semibold text-foreground">
            Cómo se ejecuta una Cloud Function
          </h3>
        </div>
        <p className="text-xs text-text-secondary">
          Elige un escenario y observa el ciclo completo: evento → contenedor Docker → ejecución → destrucción.
        </p>
      </div>

      {/* Scenario selector */}
      <div className="flex gap-2 px-5 pt-4 flex-wrap">
        {TRIGGERS.map((tr, idx) => (
          <button
            key={tr.id}
            onClick={() => changeTrigger(idx)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
              trigger === idx
                ? `${C[tr.color].bg} ${C[tr.color].border} ${C[tr.color].text} border-2`
                : "border-border text-text-secondary hover:border-gray-400"
            }`}
          >
            {tr.icon} {tr.label}
          </button>
        ))}
      </div>

      {/* ══════════════════════ MAIN ANIMATION ══════════════════════ */}
      <div className="px-5 pt-5 pb-2">
        <div className="rounded-xl bg-gray-950 border border-gray-800 p-5 overflow-x-auto">

          {/* ── Flow diagram ── */}
          <div className="flex items-center justify-center gap-2 min-w-[560px]">

            {/* 1. Event Source */}
            <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${after("event") ? "opacity-100 scale-100" : "opacity-30 scale-90"}`}>
              <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${after("event") ? `${c.bg} ${c.border}` : "bg-gray-900 border-gray-700"}`}>
                <span className={`transition-colors duration-500 ${after("event") ? c.text : "text-gray-600"}`}>
                  {t.icon && <span className="[&>svg]:w-6 [&>svg]:h-6">{t.icon}</span>}
                </span>
              </div>
              <span className="text-[9px] text-gray-500 text-center leading-tight max-w-[56px]">{t.eventSource}</span>
            </div>

            {/* Arrow 1 */}
            <div className={`flex flex-col items-center gap-1 transition-all duration-500 ${after("event") ? "opacity-100" : "opacity-0"}`}>
              <div className={`flex items-center gap-0.5 ${is("event") ? "animate-pulse" : ""}`}>
                {[0,1,2].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${after("event") ? c.dot : "bg-gray-700"}`}
                    style={{ animationDelay: `${i*150}ms` }} />
                ))}
              </div>
              <div className={`text-[8px] font-mono text-center max-w-[72px] leading-tight transition-opacity duration-500 ${after("event") ? c.text + " opacity-100" : "opacity-0"}`}>
                {t.payload.slice(0, 28)}…
              </div>
            </div>

            {/* 2. Platform / Eventarc */}
            <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${after("platform") ? "opacity-100 scale-100" : "opacity-30 scale-90"}`}>
              <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-500 ${after("platform") ? "bg-blue-500/10 border-blue-500/40" : "bg-gray-900 border-gray-700"}`}>
                <Zap className={`w-6 h-6 transition-colors duration-500 ${after("platform") ? "text-blue-400" : "text-gray-600"}`} />
              </div>
              <span className="text-[9px] text-gray-500 text-center leading-tight max-w-[56px]">Eventarc / Platform</span>
            </div>

            {/* Arrow 2 */}
            <ArrowRight className={`w-4 h-4 transition-all duration-500 ${after("boot") ? "text-gray-400 opacity-100" : "opacity-20"}`} />

            {/* 3. Docker Container (the big box) */}
            <div className={`relative flex flex-col rounded-xl border-2 border-dashed transition-all duration-700 overflow-hidden ${
              after("boot") && !after("destroy")
                ? "border-cyan/60 bg-cyan/5 opacity-100 scale-100 w-[180px]"
                : after("destroy")
                ? "border-gray-700 bg-transparent opacity-0 scale-75 w-[60px]"
                : "border-gray-700 bg-transparent opacity-20 scale-75 w-[60px]"
            }`}
              style={{ minHeight: after("boot") && !after("destroy") ? "120px" : "60px" }}
            >
              {after("boot") && !after("destroy") && (
                <div className="p-3 flex flex-col gap-2 animate-in fade-in duration-300">
                  {/* Docker label */}
                  <div className="flex items-center gap-1.5">
                    <Box className="w-3 h-3 text-cyan" />
                    <span className="text-[9px] font-bold text-cyan uppercase tracking-wider">Docker Container</span>
                    {is("boot") && <div className="ml-auto w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />}
                    {after("inject") && !after("destroy") && <div className="ml-auto w-2 h-2 rounded-full bg-green animate-pulse" />}
                  </div>

                  {/* Runtime badge */}
                  {after("boot") && (
                    <div className="flex gap-1 flex-wrap animate-in fade-in duration-300">
                      <span className="text-[8px] bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded font-mono">python312</span>
                      <span className="text-[8px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded font-mono">256MB</span>
                    </div>
                  )}

                  {/* Code injection */}
                  {after("inject") && (
                    <div className="bg-gray-900 rounded p-1.5 border border-gray-700 animate-in fade-in slide-in-from-bottom duration-400">
                      <div className="flex items-center gap-1 mb-1">
                        <Code2 className="w-2.5 h-2.5 text-gray-400" />
                        <span className="text-[8px] text-gray-500 font-mono">main.py</span>
                      </div>
                      <div className="text-[7px] font-mono text-green-400 leading-relaxed">
                        <div>def {t.functionName}(e):</div>
                        <div className="text-gray-500 pl-2">  # tu lógica</div>
                        {(is("run") || after("result")) && (
                          <div className={`text-cyan animate-in fade-in duration-200`}>  ...</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Exec bar */}
                  {after("run") && !after("result") && (
                    <div className="animate-in fade-in duration-200">
                      <div className="flex justify-between text-[8px] mb-0.5">
                        <span className="text-gray-500">ejecutando</span>
                        <span className={c.text}>{execPct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded overflow-hidden">
                        <div className={`h-full ${c.dot} rounded transition-all duration-100`} style={{ width: `${execPct}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Idle/before */}
              {!after("boot") && (
                <div className="flex items-center justify-center h-[60px]">
                  <span className="text-[9px] text-gray-700">sin instancias</span>
                </div>
              )}
            </div>

            {/* Arrow 3 */}
            <ArrowRight className={`w-4 h-4 transition-all duration-500 ${after("result") ? "text-green opacity-100" : "opacity-20"}`} />

            {/* 4. Result */}
            <div className={`flex flex-col items-center gap-2 transition-all duration-700 ${after("result") ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
              <div className="w-14 h-14 rounded-xl border-2 border-green/40 bg-green/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green" />
              </div>
              <span className="text-[9px] text-green text-center leading-tight max-w-[56px] font-medium">{t.result}</span>
            </div>

          </div>

          {/* ── Phase labels below ── */}
          <div className="mt-4 flex items-start justify-center gap-1 min-w-[560px] px-2">
            {[
              { label: "1. Evento llega", active: after("event") && !after("platform"), done: after("platform") },
              { label: "2. Plataforma recibe", active: after("platform") && !after("boot"), done: after("boot") },
              { label: "3. Docker arranca", active: is("boot"), done: after("inject") },
              { label: "4. Código inyectado", active: is("inject"), done: after("run") },
              { label: "5. Función ejecuta", active: is("run"), done: after("result") },
              { label: "6. Resultado", active: is("result"), done: after("destroy") },
              { label: "7. Contenedor destruido", active: is("destroy") || is("zero"), done: false },
            ].map((phase, i) => (
              <div key={i} className={`flex-1 text-center transition-all duration-300 ${
                phase.done ? "opacity-40" : phase.active ? "opacity-100" : "opacity-20"
              }`}>
                <div className={`h-0.5 rounded mb-1 transition-colors duration-300 ${
                  phase.done ? "bg-gray-600" : phase.active ? c.dot : "bg-gray-700"
                }`} />
                <span className={`text-[7px] leading-tight block ${phase.active ? c.text : "text-gray-500"}`}>
                  {phase.label}
                </span>
              </div>
            ))}
          </div>

          {/* ── "Scale to zero" message ── */}
          {(is("zero")) && (
            <div className="mt-3 text-center animate-in fade-in zoom-in duration-400">
              <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-700 px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                <span className="text-[10px] text-gray-400">0 instancias activas — $0.00 en reposo</span>
              </div>
            </div>
          )}

          {/* ── Controls ── */}
          <div className="flex items-center justify-center gap-3 mt-4">
            {animState === "idle" ? (
              <button
                onClick={runAnimation}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all ${c.dot} hover:opacity-90`}
              >
                <Play className="w-3.5 h-3.5" /> Simular ejecución
              </button>
            ) : is("zero") ? (
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
              </button>
            ) : (
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <div className={`w-2 h-2 rounded-full animate-pulse ${c.dot}`} />
                Ejecutando…
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════ BOTTOM DETAILS ══════════════════════ */}
      <div className="px-5 pb-5 pt-3 grid sm:grid-cols-3 gap-3">

        {/* Código que escribes */}
        <div className="rounded-lg border border-gray-700 bg-gray-950 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-b border-gray-800">
            <Code2 className="w-3 h-3 text-gray-400" />
            <span className="text-[9px] font-mono text-gray-300">Tu código — main.py</span>
          </div>
          <pre className={`text-[9px] font-mono p-3 leading-relaxed overflow-x-auto ${c.text}`}>
            {t.functionCode}
          </pre>
        </div>

        {/* Comando deploy */}
        <div className="rounded-lg border border-gray-700 bg-gray-950 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-b border-gray-800">
            <Package className="w-3 h-3 text-gray-400" />
            <span className="text-[9px] font-mono text-gray-300">Deploy</span>
          </div>
          <div className="p-3 space-y-2">
            <p className="text-[8px] text-gray-600 uppercase tracking-wider">Un solo comando:</p>
            <pre className="text-[9px] font-mono text-green-400 leading-relaxed whitespace-pre-wrap">
{`gcloud functions deploy \\
  ${t.functionName} \\
  --gen2 \\
  --runtime=python312 \\
  --trigger-${t.id === "storage" ? "event=..." : "http"}`}
            </pre>
            <p className="text-[8px] text-gray-600">Google instala deps, construye el contenedor y registra el trigger.</p>
          </div>
        </div>

        {/* Costo */}
        <div className="rounded-lg border border-gray-700 bg-gray-950 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-b border-gray-800">
            <DollarSign className="w-3 h-3 text-gray-400" />
            <span className="text-[9px] font-mono text-gray-300">Costo real</span>
          </div>
          <div className="p-3 space-y-2">
            <div className="flex justify-between text-[9px]">
              <span className="text-gray-500">Duración</span>
              <span className="font-mono text-gray-300">{t.execMs} ms</span>
            </div>
            <div className="flex justify-between text-[9px]">
              <span className="text-gray-500">FaaS / invocación</span>
              <span className="font-mono text-green">~$0.0000004</span>
            </div>
            <div className="border-t border-gray-800 pt-2 flex justify-between text-[9px]">
              <span className="text-gray-500">VM 24/7 equivalente</span>
              <span className="font-mono text-red-400">~$7.30/mes</span>
            </div>
            <div className="flex items-center gap-1.5 text-[8px] text-green">
              <CheckCircle2 className="w-3 h-3" />
              <span>$0 cuando no hay eventos</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
