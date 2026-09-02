"use client";

import { useState, useEffect } from "react";
import {
  Code2,
  Terminal,
  Upload,
  Globe,
  Clock,
  Database,
  Zap,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
  Image as ImageIcon,
  Package,
  Box,
  DollarSign,
  Server,
  Activity,
} from "lucide-react";

/* ─── Escenarios de trigger ─────────────────────────── */
const TRIGGERS = [
  {
    id: "storage",
    label: "Archivo subido a Storage",
    icon: <Upload className="w-4 h-4" />,
    event: "google.cloud.storage.object.v1.finalized",
    payload: `{
  "bucket": "tareas-alumnos",
  "name": "foto-tarea.jpg",
  "size": "2048000",
  "contentType": "image/jpeg"
}`,
    functionCode: `import functions_framework
from PIL import Image
import io, storage

@functions_framework.cloud_event
def procesar_imagen(event):
  data = event.data
  bucket = data["bucket"]
  archivo = data["name"]

  # Descargar imagen original
  blob = storage.get(bucket, archivo)
  img = Image.open(io.BytesIO(blob))

  # Redimensionar a 300x300
  img.thumbnail((300, 300))

  # Guardar thumbnail
  thumb_name = f"thumbs/{archivo}"
  storage.save(bucket, thumb_name, img)
  print(f"Thumbnail creado: {thumb_name}")`,
    result: "thumbnail guardado en /thumbs/",
    execMs: 420,
    color: "orange",
  },
  {
    id: "http",
    label: "Solicitud HTTP (webhook)",
    icon: <Globe className="w-4 h-4" />,
    event: "POST /webhook  →  HTTP trigger",
    payload: `{
  "method": "POST",
  "body": {
    "repo": "mi-proyecto",
    "author": "ana.garcia",
    "commit": "fix: login bug"
  }
}`,
    functionCode: `import functions_framework
import requests

@functions_framework.http
def notificar_slack(request):
  data = request.get_json()
  autor = data["body"]["author"]
  commit = data["body"]["commit"]

  # Enviar mensaje a Slack
  requests.post(SLACK_WEBHOOK, json={
    "text": f"🚀 {autor}: {commit}"
  })

  return "OK", 200`,
    result: "Mensaje enviado a Slack",
    execMs: 180,
    color: "blue",
  },
  {
    id: "schedule",
    label: "Tarea programada (cron)",
    icon: <Clock className="w-4 h-4" />,
    event: "Cloud Scheduler → cada día 23:59",
    payload: `{
  "jobName": "reporte-diario",
  "scheduleTime": "2026-09-02T23:59:00Z",
  "httpTarget": {
    "uri": "mi-funcion-url"
  }
}`,
    functionCode: `import functions_framework
from db import query
from email import send

@functions_framework.http
def generar_reporte(request):
  # Consultar BD
  datos = query("""
    SELECT COUNT(*) as total,
           AVG(calificacion) as promedio
    FROM entregas
    WHERE fecha = CURDATE()
  """)

  # Enviar email con resumen
  send(to="director@uni.edu",
       subject="Reporte diario",
       body=f"Entregas: {datos.total}")

  return "Reporte enviado", 200`,
    result: "Reporte enviado por email",
    execMs: 1240,
    color: "purple",
  },
];

const STEPS = [
  { id: 0, phase: "Tu código", title: "Elige un escenario real", subtitle: "Selecciona qué tipo de evento dispara tu función" },
  { id: 1, phase: "El trigger", title: "El evento ocurre", subtitle: "Algo sucede en el sistema y activa automáticamente tu función" },
  { id: 2, phase: "Deploy", title: "Despliega la función", subtitle: "Un comando sube tu código — la plataforma hace el resto" },
  { id: 3, phase: "Ejecución", title: "La plataforma ejecuta tu función", subtitle: "Se levanta un entorno efímero, corre tu código y termina" },
  { id: 4, phase: "Costo real", title: "Pagas solo por lo que usas", subtitle: "Compara qué hubiera costado un servidor encendido 24/7" },
];

const colorMap: Record<string, { tab: string; badge: string; dot: string; text: string; border: string; bg: string }> = {
  orange: { tab: "border-orange/50 bg-orange/10 text-orange", badge: "bg-orange/20 text-orange border-orange/30", dot: "bg-orange", text: "text-orange", border: "border-orange/40", bg: "bg-orange/10" },
  blue: { tab: "border-blue-400/50 bg-blue-400/10 text-blue-400", badge: "bg-blue-400/20 text-blue-400 border-blue-400/30", dot: "bg-blue-400", text: "text-blue-400", border: "border-blue-400/40", bg: "bg-blue-400/10" },
  purple: { tab: "border-purple-400/50 bg-purple-400/10 text-purple-400", badge: "bg-purple-400/20 text-purple-400 border-purple-400/30", dot: "bg-purple-400", text: "text-purple-400", border: "border-purple-400/40", bg: "bg-purple-400/10" },
  cyan: { tab: "border-cyan/50 bg-cyan/10 text-cyan", badge: "bg-cyan/20 text-cyan border-cyan/30", dot: "bg-cyan", text: "text-cyan", border: "border-cyan/40", bg: "bg-cyan/10" },
  green: { tab: "border-green/50 bg-green/10 text-green", badge: "bg-green/20 text-green border-green/30", dot: "bg-green", text: "text-green", border: "border-green/40", bg: "bg-green/10" },
};

export function FunctionArchitecture() {
  const [step, setStep] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [execProgress, setExecProgress] = useState(0);
  const [execDone, setExecDone] = useState(false);

  const t = TRIGGERS[trigger];
  const c = colorMap[t.color];

  const goToStep = (idx: number) => {
    setStep(idx);
    setAnimKey((k) => k + 1);
    setExecProgress(0);
    setExecDone(false);
  };

  const changeTrigger = (idx: number) => {
    setTrigger(idx);
    setStep(0);
    setAnimKey((k) => k + 1);
  };

  // Exec animation on step 3
  useEffect(() => {
    if (step === 3) {
      setExecProgress(0);
      setExecDone(false);
      const totalMs = t.execMs;
      const interval = 80;
      let elapsed = 0;
      const timer = setInterval(() => {
        elapsed += interval;
        setExecProgress(Math.min(100, Math.round((elapsed / totalMs) * 100)));
        if (elapsed >= totalMs) {
          clearInterval(timer);
          setExecDone(true);
        }
      }, interval);
      return () => clearInterval(timer);
    }
  }, [step, animKey, t.execMs]);

  return (
    <div className="rounded-xl border border-border bg-panel/30 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-4 h-4 text-orange" />
          <h3 className="text-sm font-semibold text-foreground">
            Cómo funciona una Cloud Function — de evento a resultado
          </h3>
        </div>
        <p className="text-xs text-text-secondary">
          Ejemplo real en Python con Cloud Run functions (Google Cloud). Elige un escenario y sigue cada paso.
        </p>
      </div>

      {/* Step tabs */}
      <div className="flex border-b border-border/50 overflow-x-auto scrollbar-none">
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => goToStep(idx)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-semibold border-b-2 transition-all ${
              step === idx ? c.tab : "border-transparent text-text-secondary hover:text-foreground"
            }`}
          >
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${step > idx ? "bg-green" : step === idx ? c.dot : "bg-gray-300"}`}>
              {step > idx ? "✓" : idx + 1}
            </span>
            <span className="hidden sm:inline">{s.phase}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-5" key={`${animKey}-${trigger}`}>
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border mb-3 ${c.badge}`}>
          {STEPS[step].phase}
        </div>
        <h4 className="text-base font-bold text-foreground mb-0.5">{STEPS[step].title}</h4>
        <p className="text-xs text-text-secondary mb-4">{STEPS[step].subtitle}</p>

        {/* ══ STEP 0: Elige escenario + muestra el código ══ */}
        {step === 0 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Selector de trigger */}
            <div className="flex flex-wrap gap-2">
              {TRIGGERS.map((tr, idx) => (
                <button
                  key={tr.id}
                  onClick={() => changeTrigger(idx)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                    trigger === idx
                      ? colorMap[tr.color].tab + " border-2"
                      : "border-border text-text-secondary hover:border-gray-400"
                  }`}
                >
                  {tr.icon} {tr.label}
                </button>
              ))}
            </div>

            {/* Código de la función */}
            <div className="rounded-lg border border-gray-700 bg-gray-950 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border-b border-gray-800">
                <Code2 className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[10px] font-mono text-gray-300">main.py</span>
                <span className={`ml-auto text-[9px] font-semibold px-2 py-0.5 rounded border ${c.badge}`}>
                  Tu código — solo esto escribes
                </span>
              </div>
              <pre className="text-[10px] font-mono text-gray-300 p-4 leading-relaxed overflow-x-auto">
                {t.functionCode}
              </pre>
            </div>

            {/* requirements */}
            <div className="rounded-lg border border-gray-700 bg-gray-950 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 border-b border-gray-800">
                <Package className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] font-mono text-gray-300">requirements.txt</span>
              </div>
              <pre className="text-[10px] font-mono text-gray-400 px-4 py-3">
                {t.id === "storage" ? "functions-framework==3.*\nPillow==10.*" :
                 t.id === "http" ? "functions-framework==3.*\nrequests==2.*" :
                 "functions-framework==3.*\nmysql-connector-python==8.*"}
              </pre>
            </div>

            <div className={`rounded-lg border p-3 flex items-start gap-2 ${c.badge}`}>
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-xs">
                <span className="font-semibold">Eso es todo lo que escribes.</span> No configuras servidores, no instalas Python en ningún lado, no defines cuánta RAM usar.
              </p>
            </div>
          </div>
        )}

        {/* ══ STEP 1: El trigger y el payload ══ */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className={`rounded-lg border p-3 text-xs ${c.badge} flex items-center gap-2`}>
              {t.icon}
              <span className="font-mono">{t.event}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Explicación del trigger */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-foreground">¿Qué pasa en el mundo real?</p>
                {t.id === "storage" && (
                  <div className="space-y-2 text-xs text-text-secondary">
                    <div className="flex items-start gap-2">
                      <Upload className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                      <p>Un alumno sube <code className="font-mono text-orange">foto-tarea.jpg</code> al bucket <code className="font-mono text-orange">tareas-alumnos</code> desde la app.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                      <p>Google Cloud Storage detecta el nuevo archivo y emite un evento <code className="font-mono">object.finalized</code> automáticamente.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                      <p>Cloud Run functions recibe ese evento y llama a tu función. <strong className="text-foreground">Tú no hiciste nada</strong> para activarla.</p>
                    </div>
                  </div>
                )}
                {t.id === "http" && (
                  <div className="space-y-2 text-xs text-text-secondary">
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p>GitHub hace un <code className="font-mono text-blue-400">POST</code> automático a la URL de tu función cuando alguien hace push a <code>main</code>.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p>Cloud Run functions expone tu función como un endpoint HTTPS. GitHub simplemente hace un HTTP request.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <p>Tu función se activa solo cuando hay un push. El resto del tiempo <strong className="text-foreground">no existe</strong> (0 instancias, $0).</p>
                    </div>
                  </div>
                )}
                {t.id === "schedule" && (
                  <div className="space-y-2 text-xs text-text-secondary">
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <p>Configuras Cloud Scheduler con un cron: <code className="font-mono text-purple-400">59 23 * * *</code> (cada día a las 23:59).</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <p>A esa hora, Scheduler hace un HTTP request a tu función. Sin que tú hagas nada.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Activity className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <p>La función corre ~1.2 segundos, genera el reporte y termina. <strong className="text-foreground">23 horas y 59 minutos</strong> no hubo ningún servidor encendido.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payload JSON */}
              <div>
                <p className="text-[10px] text-text-secondary uppercase font-semibold tracking-wider mb-2">Payload que recibe tu función</p>
                <div className="rounded-lg bg-gray-950 border border-gray-800 overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-b border-gray-800">
                    <Box className="w-3 h-3 text-gray-500" />
                    <span className="text-[9px] font-mono text-gray-500">event.data / request.json</span>
                  </div>
                  <pre className={`text-[10px] font-mono p-3 leading-relaxed ${c.text}`}>
                    {t.payload}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ STEP 2: Deploy ══ */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Terminal */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-foreground">Desde tu carpeta con <code className="font-mono text-green">main.py</code> y <code className="font-mono text-green">requirements.txt</code>:</p>
                <div className="rounded-lg bg-gray-950 border border-gray-700 overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 border-b border-gray-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-[9px] text-gray-500 font-mono">Terminal — ~/mi-funcion/</span>
                  </div>
                  <div className="p-4 font-mono text-[10px] space-y-2">
                    <p className="text-gray-500">~/mi-funcion $</p>
                    {t.id === "storage" && (
                      <p className="text-green-400">$ <span className="text-white">gcloud functions deploy procesar-imagen \</span>
                        <br /><span className="text-white pl-4">--gen2 \</span>
                        <br /><span className="text-white pl-4">--runtime=python312 \</span>
                        <br /><span className="text-white pl-4">--trigger-event-filters="type=google.cloud.storage.object.v1.finalized" \</span>
                        <br /><span className="text-white pl-4">--trigger-event-filters="bucket=tareas-alumnos"</span>
                      </p>
                    )}
                    {t.id === "http" && (
                      <p className="text-green-400">$ <span className="text-white">gcloud functions deploy notificar-slack \</span>
                        <br /><span className="text-white pl-4">--gen2 \</span>
                        <br /><span className="text-white pl-4">--runtime=python312 \</span>
                        <br /><span className="text-white pl-4">--trigger-http \</span>
                        <br /><span className="text-white pl-4">--allow-unauthenticated</span>
                      </p>
                    )}
                    {t.id === "schedule" && (
                      <p className="text-green-400">$ <span className="text-white">gcloud functions deploy generar-reporte \</span>
                        <br /><span className="text-white pl-4">--gen2 \</span>
                        <br /><span className="text-white pl-4">--runtime=python312 \</span>
                        <br /><span className="text-white pl-4">--trigger-http</span>
                      </p>
                    )}
                    <p className="text-gray-500 animate-pulse">Deploying function...</p>
                    <p className="text-green-400">✓ URL: https://us-central1-mi-proyecto.cloudfunctions.net/...</p>
                  </div>
                </div>
              </div>

              {/* What happens on GCP */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-foreground">Lo que Google hace automáticamente:</p>
                {[
                  { label: "Sube tu código a Cloud Build", detail: "Empaqueta main.py + requirements.txt" },
                  { label: "Instala dependencias", detail: "pip install -r requirements.txt en la nube" },
                  { label: "Construye imagen de contenedor", detail: "Docker image lista para ejecutar" },
                  { label: "Registra el trigger", detail: `Escucha eventos de ${t.id === "storage" ? "Cloud Storage" : t.id === "http" ? "HTTP" : "Cloud Scheduler"}` },
                  { label: "Escala a cero", detail: "No hay instancias hasta que llegue un evento" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 animate-in fade-in duration-300" style={{ animationDelay: `${i * 100}ms` }}>
                    <CheckCircle2 className={`w-4 h-4 ${c.text} shrink-0 mt-0.5`} />
                    <div>
                      <p className="text-xs font-medium text-foreground">{item.label}</p>
                      <p className="text-[10px] text-text-secondary">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ STEP 3: Ejecución ══ */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Timeline visual */}
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider mb-4">
                Línea de tiempo de una ejecución — {t.execMs} ms totales
              </p>

              <div className="space-y-3">
                {[
                  {
                    label: "Cold start: plataforma levanta el contenedor",
                    ms: Math.round(t.execMs * 0.15),
                    color: "bg-gray-500",
                    note: "Solo en la primera invocación. Las siguientes son más rápidas.",
                  },
                  {
                    label: "Import: Python carga tus librerías",
                    ms: Math.round(t.execMs * 0.1),
                    color: "bg-blue-500",
                    note: "Se reutiliza en ejecuciones calientes.",
                  },
                  {
                    label: "Tu función ejecuta",
                    ms: Math.round(t.execMs * 0.65),
                    color: t.id === "storage" ? "bg-orange" : t.id === "http" ? "bg-blue-400" : "bg-purple-500",
                    note: `Descarga, procesa y guarda. Resultado: "${t.result}"`,
                  },
                  {
                    label: "Respuesta y limpieza",
                    ms: Math.round(t.execMs * 0.1),
                    color: "bg-green",
                    note: "La instancia queda en espera o se destruye.",
                  },
                ].map((phase, i) => {
                  const widthPct = Math.round((phase.ms / t.execMs) * 100);
                  const threshold = Math.round((i / 4) * 100);
                  const visible = execProgress >= threshold;
                  return (
                    <div key={i} className={`space-y-1 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-20"}`}>
                      <div className="flex justify-between text-[9px] text-gray-400">
                        <span>{phase.label}</span>
                        <span className="font-mono">{phase.ms} ms</span>
                      </div>
                      <div className="h-4 bg-gray-800 rounded overflow-hidden">
                        <div
                          className={`h-full ${phase.color} rounded transition-all duration-500`}
                          style={{ width: visible ? `${widthPct}%` : "0%" }}
                        />
                      </div>
                      <p className="text-[9px] text-gray-600 italic">{phase.note}</p>
                    </div>
                  );
                })}
              </div>

              {/* Overall progress */}
              <div className="mt-4">
                <div className="flex justify-between text-[9px] text-gray-500 mb-1">
                  <span>Progreso total</span>
                  <span>{execProgress}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded overflow-hidden">
                  <div className={`h-full ${c.text.replace("text-", "bg-")} rounded transition-all duration-100`} style={{ width: `${execProgress}%` }} />
                </div>
              </div>

              {execDone && (
                <div className={`mt-4 rounded-lg border p-3 flex items-center gap-2 animate-in zoom-in duration-300 ${c.badge}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <p className="text-xs font-semibold">Función completada en {t.execMs} ms → {t.result}</p>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-gray-700 bg-gray-900 p-3 text-[10px] text-gray-400">
              <span className="text-foreground font-semibold">Después de la ejecución: </span>
              La instancia queda "tibia" por unos segundos por si llega otro evento. Si no llega, se destruye. La plataforma escala a <strong className="text-white">0 instancias</strong>. No pagas más.
            </div>
          </div>
        )}

        {/* ══ STEP 4: Costo ══ */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Serverless */}
              <div className="rounded-lg border border-green/30 bg-green/5 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green" />
                  <p className="text-xs font-bold text-green">Cloud Function (FaaS)</p>
                </div>

                <div className="space-y-2 text-[10px] text-text-secondary">
                  <p className="font-semibold text-foreground text-xs">Escenario: {t.label}</p>
                  {t.id === "storage" && <p>50 imágenes subidas por día × 420 ms × 256 MB RAM</p>}
                  {t.id === "http" && <p>10 commits por día × 180 ms × 256 MB RAM</p>}
                  {t.id === "schedule" && <p>1 ejecución por día × 1.2 s × 512 MB RAM</p>}

                  <div className="border-t border-green/20 pt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Invocaciones</span>
                      <span className="font-mono text-green">{t.id === "storage" ? "50/día × 30" : t.id === "http" ? "10/día × 30" : "1/día × 30"} = {t.id === "storage" ? "1,500" : t.id === "http" ? "300" : "30"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Costo por invocación</span>
                      <span className="font-mono text-green">$0.0000004</span>
                    </div>
                    <div className="flex justify-between font-bold text-green border-t border-green/20 pt-1">
                      <span>Total mes</span>
                      <span className="font-mono">{t.id === "storage" ? "~$0.10" : t.id === "http" ? "~$0.02" : "~$0.001"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* VM 24/7 */}
              <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-red-400" />
                  <p className="text-xs font-bold text-red-400">VM encendida 24/7 (IaaS)</p>
                </div>

                <div className="space-y-2 text-[10px] text-text-secondary">
                  <p className="font-semibold text-foreground text-xs">Mismo escenario con e2-micro</p>
                  <p>La VM corre aunque no haya eventos. Pagas por cada hora.</p>

                  <div className="border-t border-red-500/20 pt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Horas al mes</span>
                      <span className="font-mono text-red-400">730 hrs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>e2-micro (us-central1)</span>
                      <span className="font-mono text-red-400">$0.0100/hr</span>
                    </div>
                    <div className="flex justify-between font-bold text-red-400 border-t border-red-500/20 pt-1">
                      <span>Total mes</span>
                      <span className="font-mono">~$7.30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-lg border border-green/20 bg-green/5 p-4">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-green shrink-0 mt-0.5" />
                <div className="text-xs text-text-secondary space-y-1">
                  <p className="font-semibold text-foreground">¿Por qué serverless es tan barato para este caso?</p>
                  <p>Una función serverless <strong className="text-foreground">no existe</strong> cuando no hay trabajo que hacer. Una VM existe siempre — incluso a las 3am, sábado, feriados. Pagas por <em>uptime</em>, no por <em>trabajo real</em>.</p>
                  <p className="text-green font-semibold mt-2">
                    Para cargas intermitentes o por evento, FaaS puede ser 10x–100x más barato que una VM equivalente.
                  </p>
                  <p className="text-text-secondary text-[10px] mt-1">
                    ⚠️ Excepción: si tu función corre constantemente (tráfico 24/7 alto), una VM o Cloud Run con instancia mínima puede ser más económico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-5 pb-5 flex items-center justify-between border-t border-border/50 pt-4">
        <button
          onClick={() => goToStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-3 py-1.5 rounded-md text-xs text-text-secondary border border-border disabled:opacity-30 hover:border-gray-400 transition-colors"
        >
          ← Anterior
        </button>

        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              className={`h-1.5 rounded-full transition-all ${step === i ? "w-4 " + c.dot : "w-1.5 bg-gray-300"}`}
            />
          ))}
        </div>

        <button
          onClick={() => step < STEPS.length - 1 ? goToStep(step + 1) : goToStep(0)}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-orange text-white hover:bg-orange/90 transition-colors flex items-center gap-1.5"
        >
          {step < STEPS.length - 1 ? (
            <><ArrowRight className="w-3 h-3" /> Siguiente</>
          ) : (
            <><RotateCcw className="w-3 h-3" /> Volver al inicio</>
          )}
        </button>
      </div>
    </div>
  );
}
