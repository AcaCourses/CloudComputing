"use client";

import { useState } from "react";
import { ArrowRight, Package, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";

const layers = [
  { id: "app", label: "Código de la app", color: "bg-cyan/20 border-cyan/30", hint: "Tu aplicación: scripts, lógica, archivos fuente" },
  { id: "runtime", label: "Runtime", color: "bg-cyan/15 border-cyan/25", hint: "La versión del entorno que la app necesita (ej: Python 3.11, Node 20)" },
  { id: "libs", label: "Librerías", color: "bg-cyan/10 border-cyan/20", hint: "Paquetes o dependencias externas que usa la app" },
  { id: "config", label: "Configuración", color: "bg-cyan/8 border-cyan/15", hint: "Variables de entorno y ajustes de ejecución" },
  { id: "deps", label: "Dependencias del sistema", color: "bg-cyan/5 border-cyan/10", hint: "Herramientas del SO necesarias para que todo funcione" },
];

const flowSteps = [
  { id: "dockerfile", label: "Dockerfile", desc: "Definir cómo se construye" },
  { id: "build", label: "Build", desc: "Crear imagen" },
  { id: "image", label: "Image", desc: "Guardar imagen" },
  { id: "registry", label: "Registry", desc: "Almacenar en registro" },
  { id: "deploy", label: "Deploy", desc: "Ejecutar contenedor" },
];

export function ContainerVsVmVisual() {
  const [showCause, setShowCause] = useState(false);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [showVmComparison, setShowVmComparison] = useState(false);
  const [activeFlowStep, setActiveFlowStep] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Package className="w-4 h-4 text-cyan" />
          <h3 className="text-sm font-semibold text-foreground">
            Contenedores: por qué funcionan igual en distintos entornos
          </h3>
        </div>
        <p className="text-xs text-text-secondary italic">
          ¿Por qué una app funciona en mi computadora pero falla en otro entorno?
        </p>
      </div>

      {/* Block 1: The Problem */}
      <div className="rounded-lg border border-orange/20 bg-orange/5 p-4 space-y-3">
        <p className="text-[11px] font-bold text-foreground">Mismo código, resultados distintos</p>

        <div className="flex items-center gap-3 flex-wrap justify-center py-2">
          <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-white border border-border min-w-[70px]">
            <span className="text-lg">💻</span>
            <span className="text-[9px] text-text-secondary font-medium">Laptop</span>
            <span className="text-[10px] text-green font-bold">✓ Funciona</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-text-secondary/50" />
          <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-white border border-orange/30 min-w-[70px]">
            <span className="text-lg">🧪</span>
            <span className="text-[9px] text-text-secondary font-medium">Test</span>
            <span className="text-[10px] text-orange font-bold">⚠ Falla</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-text-secondary/50" />
          <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-white border border-red-200 min-w-[70px]">
            <span className="text-lg">🌐</span>
            <span className="text-[9px] text-text-secondary font-medium">Producción</span>
            <span className="text-[10px] text-red-500 font-bold">✗ Error</span>
          </div>
        </div>

        <p className="text-[10px] text-text-secondary text-center">
          El problema no siempre está en el código. A veces cambia el entorno.
        </p>

        {/* Interactive: show cause */}
        <div className="text-center">
          <button
            onClick={() => setShowCause(!showCause)}
            className="text-[10px] font-semibold text-orange hover:text-orange/80 underline underline-offset-2 transition-colors"
          >
            {showCause ? "Ocultar causa" : "Ver causa →"}
          </button>
        </div>

        {showCause && (
          <div className="grid grid-cols-3 gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {[
              { env: "Laptop", items: ["Python 3.11", "numpy 1.24", "config local"] },
              { env: "Test", items: ["Python 3.9 ⚠", "numpy 1.21 ⚠", "sin config ⚠"] },
              { env: "Producción", items: ["Python 3.8 ✗", "numpy falta ✗", "otra config ✗"] },
            ].map((col) => (
              <div key={col.env} className="rounded-md bg-white border border-border p-2 space-y-1">
                <p className="text-[9px] font-bold text-foreground text-center">{col.env}</p>
                {col.items.map((item) => (
                  <p key={item} className="text-[8px] text-text-secondary text-center">{item}</p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Block 2: What's inside a container */}
      <div className="rounded-lg border border-cyan/20 bg-white p-4 space-y-3">
        <p className="text-[11px] font-bold text-foreground">Empaquetar la app con lo que necesita</p>
        <p className="text-[10px] text-text-secondary">
          Un contenedor reúne la aplicación y sus dependencias en un mismo paquete.
          Pasa el cursor sobre cada capa para entender qué contiene.
        </p>

        {/* Container layers */}
        <div className="relative max-w-xs mx-auto space-y-1 py-2">
          {layers.map((layer) => (
            <div
              key={layer.id}
              onMouseEnter={() => setHoveredLayer(layer.id)}
              onMouseLeave={() => setHoveredLayer(null)}
              className={`relative rounded-md border px-4 py-2 text-center cursor-default transition-all duration-200 ${layer.color} ${
                hoveredLayer === layer.id ? "scale-[1.03] shadow-md z-10" : ""
              }`}
            >
              <span className="text-[10px] font-medium text-foreground">{layer.label}</span>

              {/* Tooltip */}
              {hoveredLayer === layer.id && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-md bg-foreground text-white text-[9px] whitespace-nowrap shadow-lg z-20 max-w-[200px] text-left">
                  {layer.hint}
                </div>
              )}
            </div>
          ))}
          {/* Container border */}
          <div className="absolute inset-0 -m-2 rounded-lg border-2 border-dashed border-cyan/40 pointer-events-none" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-2 bg-white text-[8px] font-bold text-cyan uppercase tracking-wider">
            Contenedor
          </div>
        </div>
      </div>

      {/* Block 3: The Result */}
      <div className="rounded-lg border border-green/20 bg-green/5 p-4 space-y-3">
        <p className="text-[11px] font-bold text-foreground">Mismo paquete, mismo comportamiento</p>

        <div className="flex items-center gap-3 flex-wrap justify-center py-2">
          {/* Container icon */}
          <div className="flex flex-col items-center gap-1 p-3 rounded-lg bg-white border-2 border-cyan/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/Container Registry.svg" alt="Container" className="w-7 h-7" />
            <span className="text-[8px] font-bold text-cyan">Contenedor</span>
          </div>

          <ArrowRight className="w-3.5 h-3.5 text-green" />

          {/* Environments all working */}
          <div className="flex gap-2">
            {["Laptop", "Test", "Producción"].map((env) => (
              <div key={env} className="flex flex-col items-center gap-1 p-2.5 rounded-lg bg-white border border-green/30 min-w-[65px]">
                <CheckCircle2 className="w-4 h-4 text-green" />
                <span className="text-[8px] text-text-secondary font-medium">{env}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center space-y-0.5">
          <p className="text-[10px] text-text-secondary">El contenedor abstrae la app del entorno donde corre.</p>
          <p className="text-[10px] text-text-secondary">Más portabilidad. Más repetibilidad. Despliegues más predecibles.</p>
        </div>
      </div>

      {/* Block 4: VM Comparison (collapsible) */}
      <div className="rounded-lg border border-border bg-white overflow-hidden">
        <button
          onClick={() => setShowVmComparison(!showVmComparison)}
          className="w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
        >
          {showVmComparison ? (
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-text-secondary" />
          )}
          <span className="text-[11px] font-semibold text-foreground">
            ¿Y en qué se diferencia de una máquina virtual?
          </span>
        </button>

        {showVmComparison && (
          <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="text-[10px] text-text-secondary mb-3">
              La VM incluye un SO completo. El contenedor comparte el SO del host y por eso suele ser más ligero.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {/* VM */}
              <div className="rounded-md border border-border p-3 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/Compute Engine.svg" alt="VM" className="w-4 h-4" />
                  <span className="text-[10px] font-bold text-foreground">VM</span>
                </div>
                <div className="space-y-0.5 text-[9px] text-text-secondary">
                  <p>• SO completo incluido</p>
                  <p>• Más pesada</p>
                  <p>• Arranque más lento</p>
                  <p>• Aislamiento fuerte</p>
                </div>
              </div>
              {/* Container */}
              <div className="rounded-md border-2 border-cyan/30 bg-cyan/3 p-3 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/Container Registry.svg" alt="Container" className="w-4 h-4" />
                  <span className="text-[10px] font-bold text-foreground">Contenedor</span>
                </div>
                <div className="space-y-0.5 text-[9px] text-text-secondary">
                  <p>• Comparte SO del host</p>
                  <p>• Más ligero</p>
                  <p>• Arranque más rápido</p>
                  <p>• Alta portabilidad</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Block 5: Simplified flow (clickable steps) */}
      <div className="rounded-lg border border-border bg-gray-50 p-4 space-y-3">
        <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
          Flujo: del código al despliegue
        </p>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {flowSteps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveFlowStep(activeFlowStep === step.id ? null : step.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg border transition-all ${
                  activeFlowStep === step.id
                    ? "border-cyan/40 bg-cyan/10 shadow-sm"
                    : "border-border bg-white hover:border-cyan/20"
                }`}
              >
                <span className={`text-[10px] font-bold ${
                  activeFlowStep === step.id ? "text-cyan" : "text-foreground"
                }`}>
                  {step.label}
                </span>
                <span className="text-[8px] text-text-secondary">{step.desc}</span>
              </button>
              {i < flowSteps.length - 1 && (
                <ArrowRight className="w-3 h-3 text-text-secondary/40 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {activeFlowStep && (
          <div className="rounded-md bg-white border border-cyan/20 px-3 py-2 text-[10px] text-text-secondary animate-in fade-in duration-150">
            {activeFlowStep === "dockerfile" && "Un archivo de texto con instrucciones paso a paso para construir la imagen."}
            {activeFlowStep === "build" && "Se ejecuta el Dockerfile y se genera una imagen con todo empaquetado."}
            {activeFlowStep === "image" && "El resultado: un archivo portable que contiene la app lista para correr."}
            {activeFlowStep === "registry" && "Se sube la imagen a un registro (como Artifact Registry) para que esté disponible."}
            {activeFlowStep === "deploy" && "Se ejecuta la imagen en cualquier plataforma que soporte contenedores."}
          </div>
        )}
      </div>
    </div>
  );
}
