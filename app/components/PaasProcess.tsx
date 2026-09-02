"use client";

import { useState, useEffect } from "react";
import {
  Code2,
  Terminal,
  Upload,
  Server,
  Shield,
  Globe,
  Zap,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
  Laptop,
  Cloud,
  Package,
  BarChart3,
} from "lucide-react";

const STEPS = [
  {
    id: 0,
    phase: "Tu laptop",
    title: "Tu proyecto Flask: 3 archivos",
    subtitle: "Este es todo lo que necesitas escribir",
    color: "blue",
  },
  {
    id: 1,
    phase: "Tu laptop → Terminal",
    title: "Un solo comando desde tu carpeta",
    subtitle: "Desde la misma carpeta donde tienes main.py",
    color: "orange",
  },
  {
    id: 2,
    phase: "Google Cloud Build",
    title: "Google empaqueta tu código automáticamente",
    subtitle: "Tú no tocas nada — la plataforma lo construye",
    color: "purple",
  },
  {
    id: 3,
    phase: "App Engine — Infraestructura invisible",
    title: "La plataforma configura todo lo que no ves",
    subtitle: "Servidores, HTTPS, balanceador — todo automático",
    color: "cyan",
  },
  {
    id: 4,
    phase: "Producción",
    title: "Tu app está viva en internet",
    subtitle: "Escala sola. Tú solo mandas el siguiente commit.",
    color: "green",
  },
];

export function PaasProcess() {
  const [step, setStep] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [buildProgress, setBuildProgress] = useState(0);

  const goToStep = (idx: number) => {
    setStep(idx);
    setAnimKey((k) => k + 1);
    setUploading(false);
    setBuildProgress(0);
  };

  // Simulate upload animation on step 1
  useEffect(() => {
    if (step === 1) {
      setUploading(false);
      const t = setTimeout(() => setUploading(true), 600);
      return () => clearTimeout(t);
    }
  }, [step, animKey]);

  // Simulate build progress on step 2
  useEffect(() => {
    if (step === 2) {
      setBuildProgress(0);
      let val = 0;
      const interval = setInterval(() => {
        val += Math.floor(Math.random() * 18) + 5;
        if (val >= 100) {
          val = 100;
          clearInterval(interval);
        }
        setBuildProgress(val);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [step, animKey]);

  const colorMap: Record<string, string> = {
    blue: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    orange: "border-orange/40 bg-orange/10 text-orange",
    purple: "border-purple-500/40 bg-purple-500/10 text-purple-400",
    cyan: "border-cyan/40 bg-cyan/10 text-cyan",
    green: "border-green/40 bg-green/10 text-green",
  };

  const dotMap: Record<string, string> = {
    blue: "bg-blue-400",
    orange: "bg-orange",
    purple: "bg-purple-400",
    cyan: "bg-cyan",
    green: "bg-green",
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2 mb-1">
          <Cloud className="w-4 h-4 text-azure" />
          <h3 className="text-sm font-semibold text-foreground">
            De código a producción con App Engine (PaaS)
          </h3>
        </div>
        <p className="text-xs text-text-secondary">
          Ejemplo real: desplegando un API Flask en Python. Observa qué haces tú y qué hace la plataforma.
        </p>
      </div>

      {/* Step tabs */}
      <div className="flex border-b border-border/50 overflow-x-auto">
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => goToStep(idx)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-semibold border-b-2 transition-all ${
              step === idx
                ? `border-current ${colorMap[s.color]}`
                : "border-transparent text-text-secondary hover:text-foreground"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white ${
                step >= idx ? dotMap[s.color] : "bg-gray-300"
              }`}
            >
              {idx < step ? "✓" : idx + 1}
            </span>
            <span className="hidden sm:inline">{s.phase}</span>
            <span className="sm:hidden">Paso {idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Content area */}
      <div className="p-5" key={animKey}>
        {/* Step label */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border mb-4 ${colorMap[STEPS[step].color]}`}>
          {STEPS[step].phase}
        </div>
        <h4 className="text-base font-bold text-foreground mb-0.5">{STEPS[step].title}</h4>
        <p className="text-xs text-text-secondary mb-5">{STEPS[step].subtitle}</p>

        {/* ── STEP 0: Los archivos que escribes ── */}
        {step === 0 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 text-xs text-text-secondary mb-2">
              <Laptop className="w-4 h-4" />
              <span>Tu carpeta local: <code className="font-mono text-blue-400">~/mi-api/</code></span>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {/* main.py */}
              <div className="rounded-lg border border-blue-500/30 bg-gray-900 overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
                  <Code2 className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] font-mono text-blue-300">main.py</span>
                  <span className="ml-auto text-[9px] bg-blue-500/20 text-blue-400 px-1.5 rounded">Tu código</span>
                </div>
                <pre className="text-[10px] text-gray-300 font-mono p-3 leading-relaxed">
{`from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hola Mundo!"

if __name__ == "__main__":
    app.run()`}
                </pre>
              </div>

              {/* app.yaml */}
              <div className="rounded-lg border border-orange/30 bg-gray-900 overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
                  <Package className="w-3 h-3 text-orange" />
                  <span className="text-[10px] font-mono text-orange-300">app.yaml</span>
                  <span className="ml-auto text-[9px] bg-orange/20 text-orange px-1.5 rounded">Config PaaS</span>
                </div>
                <pre className="text-[10px] text-gray-300 font-mono p-3 leading-relaxed">
{`runtime: python312

# ¿Eso es todo?
# Sí. App Engine
# deduce el resto.`}
                </pre>
                <div className="px-3 pb-2 text-[9px] text-orange/70">← Le dices qué runtime usar</div>
              </div>

              {/* requirements.txt */}
              <div className="rounded-lg border border-purple-500/30 bg-gray-900 overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
                  <Package className="w-3 h-3 text-purple-400" />
                  <span className="text-[10px] font-mono text-purple-300">requirements.txt</span>
                  <span className="ml-auto text-[9px] bg-purple-500/20 text-purple-400 px-1.5 rounded">Deps</span>
                </div>
                <pre className="text-[10px] text-gray-300 font-mono p-3 leading-relaxed">
{`Flask==3.0.0
gunicorn==21.2.0`}
                </pre>
                <div className="px-3 pb-2 text-[9px] text-purple-400/70">← La plataforma instala esto</div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs text-text-secondary">
                <span className="font-semibold text-blue-300">Eso es todo lo que escribes.</span> No configuras Nginx, no decides cuántas CPUs usar, no instalas Python en un servidor. Solo tu lógica de negocio.
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 1: El comando ── */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Left: tu laptop */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                  <Laptop className="w-4 h-4" /> Tu laptop — terminal abierta en <code className="text-orange font-mono">~/mi-api/</code>
                </div>

                {/* Terminal mockup */}
                <div className="rounded-lg bg-gray-950 border border-gray-700 overflow-hidden">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-900 border-b border-gray-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-[9px] text-gray-500 font-mono">Terminal</span>
                  </div>
                  <div className="p-4 font-mono text-[11px] space-y-1.5">
                    <p className="text-gray-500">~/mi-api $</p>
                    <p className="text-green-400">
                      $ <span className="text-white">gcloud app deploy</span>
                    </p>
                    {uploading && (
                      <div className="space-y-1 animate-in fade-in duration-500">
                        <p className="text-gray-400">Services to deploy:</p>
                        <p className="text-gray-400">  descriptor: <span className="text-blue-300">[app.yaml]</span></p>
                        <p className="text-gray-400">  source:     <span className="text-blue-300">[~/mi-api]</span></p>
                        <p className="text-yellow-400 animate-pulse">Uploading files... ████████░░</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="rounded-lg border border-orange/20 bg-orange/5 p-3 text-xs text-text-secondary space-y-1">
                  <p className="font-semibold text-orange text-[11px]">¿Qué hace este comando?</p>
                  <p>1. Lee tu <code className="font-mono text-orange/80">app.yaml</code> para saber el runtime.</p>
                  <p>2. Comprime todos tus archivos.</p>
                  <p>3. Los sube a Google Cloud Build.</p>
                  <p>4. <span className="font-semibold">Tú no haces nada más.</span></p>
                </div>
              </div>

              {/* Right: flujo visual */}
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-gray-900 border-2 border-orange/40 flex flex-col items-center justify-center">
                  <Laptop className="w-7 h-7 text-orange" />
                  <span className="text-[8px] text-gray-400 mt-1">Tu laptop</span>
                </div>

                {uploading && (
                  <div className="flex flex-col items-center gap-1 animate-in fade-in slide-in-from-top duration-500">
                    <div className="flex flex-col items-center gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1 h-2 bg-orange rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 150}ms` }}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-orange">subiendo...</span>
                  </div>
                )}

                <div
                  className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${
                    uploading ? "bg-blue-500/10 border-blue-500/40" : "bg-gray-900 border-gray-700 opacity-40"
                  }`}
                >
                  <Cloud className="w-7 h-7 text-blue-400" />
                  <span className="text-[8px] text-gray-400 mt-1">Cloud Build</span>
                </div>

                {uploading && (
                  <p className="text-[9px] text-blue-400 text-center max-w-[140px]">
                    Google recibe tu código y comienza el proceso de build
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Cloud Build ── */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="rounded-lg bg-gray-950 border border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Cloud className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-purple-300">Google Cloud Build — ejecutándose en la nube</span>
              </div>

              <div className="space-y-2 font-mono text-[10px]">
                {[
                  { label: "Recibiendo código fuente", done: buildProgress >= 15, active: buildProgress > 0 && buildProgress < 15 },
                  { label: "Leyendo app.yaml → runtime: python312", done: buildProgress >= 30, active: buildProgress >= 15 && buildProgress < 30 },
                  { label: "Instalando Flask, gunicorn (requirements.txt)", done: buildProgress >= 55, active: buildProgress >= 30 && buildProgress < 55 },
                  { label: "Construyendo imagen de contenedor", done: buildProgress >= 75, active: buildProgress >= 55 && buildProgress < 75 },
                  { label: "Publicando imagen en Artifact Registry", done: buildProgress >= 100, active: buildProgress >= 75 && buildProgress < 100 },
                ].map((task, i) => (
                  <div key={i} className={`flex items-center gap-2 transition-opacity duration-300 ${task.done || task.active ? "opacity-100" : "opacity-30"}`}>
                    {task.done ? (
                      <CheckCircle2 className="w-3 h-3 text-green shrink-0" />
                    ) : task.active ? (
                      <div className="w-3 h-3 rounded-full border-2 border-purple-400 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-3 h-3 rounded-full border border-gray-600 shrink-0" />
                    )}
                    <span className={task.done ? "text-green" : task.active ? "text-purple-300 animate-pulse" : "text-gray-600"}>
                      {task.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${buildProgress}%` }}
                />
              </div>
              <p className="text-[9px] text-gray-500 mt-1">{buildProgress}% completado</p>
            </div>

            <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-3 flex items-start gap-3">
              <Server className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div className="text-xs text-text-secondary">
                <span className="font-semibold text-purple-300">Tú no instalas nada.</span> Google Cloud Build detecta tu runtime por <code className="font-mono">app.yaml</code>, instala las dependencias del <code className="font-mono">requirements.txt</code> y construye una imagen de contenedor lista para ejecutar.
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Infraestructura invisible ── */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="text-xs text-text-secondary bg-gray-950 border border-gray-800 rounded-lg p-4 space-y-3">
              <p className="text-cyan font-semibold text-[11px] uppercase tracking-wider">Lo que App Engine configura por ti — automáticamente:</p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: <Server className="w-4 h-4" />,
                    label: "Servidores / Instancias",
                    detail: "Aprovisiona VMs con tu contenedor. Arranca con las que necesita.",
                    color: "text-cyan border-cyan/30 bg-cyan/5",
                  },
                  {
                    icon: <Shield className="w-4 h-4" />,
                    label: "HTTPS automático",
                    detail: "Certificado SSL generado y renovado sin que toques nada.",
                    color: "text-green border-green/30 bg-green/5",
                  },
                  {
                    icon: <BarChart3 className="w-4 h-4" />,
                    label: "Balanceador de carga",
                    detail: "Distribuye las peticiones entre instancias. Sin config.",
                    color: "text-blue-400 border-blue-400/30 bg-blue-400/5",
                  },
                  {
                    icon: <Zap className="w-4 h-4" />,
                    label: "Escalamiento automático",
                    detail: "Si llegan 1000 usuarios, levanta más instancias. Si se van, las baja.",
                    color: "text-orange border-orange/30 bg-orange/5",
                  },
                  {
                    icon: <Globe className="w-4 h-4" />,
                    label: "Dominio público",
                    detail: "Tu app queda en https://[tu-proyecto].appspot.com inmediatamente.",
                    color: "text-purple-400 border-purple-400/30 bg-purple-400/5",
                  },
                  {
                    icon: <CheckCircle2 className="w-4 h-4" />,
                    label: "Health checks",
                    detail: "Si una instancia falla, la reemplaza sola. Tú ni te enteras.",
                    color: "text-pink-400 border-pink-400/30 bg-pink-400/5",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2.5 rounded-lg border p-2.5 ${item.color} animate-in fade-in duration-300`}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="mt-0.5 shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-[10px] font-bold">{item.label}</p>
                      <p className="text-[9px] text-text-secondary mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-cyan/20 bg-cyan/5 p-3 text-xs text-text-secondary flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
              <span>
                Con una VM (<strong className="text-foreground">IaaS</strong>) tendrías que configurar todo esto tú mismo. Con App Engine (<strong className="text-foreground">PaaS</strong>) lo delegas completamente al proveedor.
              </span>
            </div>
          </div>
        )}

        {/* ── STEP 4: Producción ── */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            {/* Architecture diagram */}
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-5">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-4">Arquitectura resultante</p>
              
              <div className="flex items-center justify-center gap-0 flex-wrap">
                {/* User */}
                <div className="flex flex-col items-center gap-1.5 p-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-[9px] text-gray-400">Usuario</span>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-600" />

                {/* HTTPS */}
                <div className="flex flex-col items-center gap-1.5 p-3">
                  <div className="w-10 h-10 rounded-full bg-green/20 border border-green/40 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green" />
                  </div>
                  <span className="text-[9px] text-gray-400">HTTPS</span>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-600" />

                {/* LB */}
                <div className="flex flex-col items-center gap-1.5 p-3">
                  <div className="w-10 h-10 rounded-full bg-orange/20 border border-orange/40 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-orange" />
                  </div>
                  <span className="text-[9px] text-gray-400">Load Balancer</span>
                </div>

                <ChevronRight className="w-4 h-4 text-gray-600" />

                {/* Instances */}
                <div className="flex flex-col items-center gap-1.5 p-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                        <Code2 className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[9px] text-gray-400">Tu Flask × instancias</span>
                </div>
              </div>

              <p className="text-center text-[9px] text-gray-600 mt-3">
                Todo esto existe detrás de <span className="text-blue-400 font-mono">https://mi-proyecto.appspot.com</span>
              </p>
            </div>

            {/* Responsibilities comparison */}
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                <p className="text-[10px] font-bold text-red-400 mb-2">Con una VM (IaaS) hubieras hecho tú:</p>
                <ul className="space-y-1 text-[10px] text-text-secondary">
                  {["Instalar Python y pip", "Configurar gunicorn", "Instalar y configurar Nginx", "Gestionar certificado SSL", "Configurar firewall", "Definir autoescalado", "Monitorear health checks"].map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <span className="text-red-400">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-green/20 bg-green/5 p-3">
                <p className="text-[10px] font-bold text-green mb-2">Con App Engine (PaaS) solo escribiste:</p>
                <ul className="space-y-1 text-[10px] text-text-secondary">
                  {["main.py (tu lógica)", "app.yaml (3 líneas)", "requirements.txt (2 líneas)", "gcloud app deploy (1 comando)"].map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-green shrink-0" /> {item}
                    </li>
                  ))}
                  <li className="text-green font-semibold pt-1">= App en producción con HTTPS, LB y escalado.</li>
                </ul>
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
          className="px-3 py-1.5 rounded-md text-xs text-text-secondary border border-border disabled:opacity-30 hover:border-azure/40 transition-colors"
        >
          ← Anterior
        </button>

        <div className="flex items-center gap-1.5">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${step === i ? "w-4 bg-azure" : "bg-gray-300"}`}
            />
          ))}
        </div>

        <button
          onClick={() => step < STEPS.length - 1 ? goToStep(step + 1) : goToStep(0)}
          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-azure text-white hover:bg-azure/90 transition-colors flex items-center gap-1.5"
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
