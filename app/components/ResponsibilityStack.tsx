"use client";

import { useState } from "react";

type Model = "iaas" | "paas" | "saas";

const layers = [
  { id: "datos", label: "Datos" },
  { id: "aplicacion", label: "Aplicación" },
  { id: "middleware", label: "Middleware" },
  { id: "runtime", label: "Runtime" },
  { id: "so", label: "Sistema Operativo" },
  { id: "virtualizacion", label: "Virtualización" },
  { id: "red", label: "Red" },
  { id: "hardware", label: "Hardware" },
];

// 'user' = you manage, 'provider' = provider manages, 'shared' = shared
type Responsibility = "user" | "provider" | "shared";

const responsibilities: Record<Model, Responsibility[]> = {
  iaas: ["user", "user", "user", "user", "user", "provider", "provider", "provider"],
  paas: ["user", "user", "provider", "provider", "provider", "provider", "provider", "provider"],
  saas: ["shared", "provider", "provider", "provider", "provider", "provider", "provider", "provider"],
};

const modelInfo: Record<Model, { label: string; description: string; examples: string }> = {
  iaas: {
    label: "IaaS",
    description: "Infraestructura como Servicio: máximo control, tú administras desde el SO hacia arriba.",
    examples: "AWS EC2, Azure Virtual Machines, Google Compute Engine",
  },
  paas: {
    label: "PaaS",
    description: "Plataforma como Servicio: solo te enfocas en tu código y datos. El proveedor administra la plataforma.",
    examples: "Azure App Service, AWS Elastic Beanstalk, Google App Engine",
  },
  saas: {
    label: "SaaS",
    description: "Software como Servicio: solo usas la aplicación. El proveedor administra toda la pila.",
    examples: "Gmail, Microsoft 365, Zoom, Salesforce",
  },
};

function getColor(resp: Responsibility) {
  switch (resp) {
    case "user":
      return { bg: "bg-azure/15 border-azure/40", text: "text-azure-dark", label: "Tú administras" };
    case "provider":
      return { bg: "bg-green/15 border-green/40", text: "text-green-dark", label: "Proveedor" };
    case "shared":
      return { bg: "bg-yellow/20 border-yellow/50", text: "text-orange", label: "Compartida" };
  }
}

export function ResponsibilityStack({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [active, setActive] = useState<Model>("iaas");
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const layerDescriptions: Record<string, string> = {
    datos: "Tus archivos, bases de datos e información. Siempre son tu responsabilidad.",
    aplicacion: "El código y configuración de tu software.",
    middleware: "Servicios intermedios como servidores web o colas de mensajes.",
    runtime: "El entorno de ejecución (Node.js, Python, .NET, etc.).",
    so: "El sistema operativo del servidor (Linux, Windows Server).",
    virtualizacion: "La capa que permite crear máquinas virtuales sobre hardware compartido.",
    red: "Switches, routers, firewalls físicos y conectividad del centro de datos.",
    hardware: "Servidores físicos, discos, procesadores, memoria RAM.",
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-xs text-text-secondary">{description}</p>
      </div>

      {/* Model selector buttons */}
      <div className="flex gap-2">
        {(["iaas", "paas", "saas"] as Model[]).map((model) => (
          <button
            key={model}
            onClick={() => setActive(model)}
            className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 border ${
              active === model
                ? "bg-azure text-white border-azure shadow-sm shadow-azure/20"
                : "bg-white text-text-secondary border-border hover:border-azure/40 hover:text-foreground"
            }`}
          >
            {modelInfo[model].label}
          </button>
        ))}
      </div>

      {/* Model description */}
      <div className="px-3 py-2 rounded-lg bg-azure/5 border border-azure/10">
        <p className="text-xs text-foreground font-medium">{modelInfo[active].description}</p>
        <p className="text-[10px] text-text-secondary mt-1">Ej: {modelInfo[active].examples}</p>
      </div>

      {/* Stack visualization */}
      <div className="space-y-1">
        {layers.map((layer, i) => {
          const resp = responsibilities[active][i];
          const color = getColor(resp);
          const isHovered = hoveredLayer === i;

          return (
            <div
              key={layer.id}
              onMouseEnter={() => setHoveredLayer(i)}
              onMouseLeave={() => setHoveredLayer(null)}
              className={`relative flex items-center justify-between px-4 py-2.5 rounded-lg border transition-all duration-300 cursor-default ${color.bg} ${
                isHovered ? "scale-[1.01] shadow-sm" : ""
              }`}
            >
              <span className={`text-xs font-medium ${color.text}`}>{layer.label}</span>
              <span className={`text-[10px] font-semibold uppercase tracking-wide ${color.text}`}>
                {color.label}
              </span>
              {isHovered && (
                <div className="absolute left-0 right-0 -bottom-7 z-10 px-3">
                  <div className="bg-foreground text-white text-[10px] px-2 py-1 rounded shadow-lg">
                    {layerDescriptions[layer.id]}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/50">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-azure/15 border border-azure/40" />
          <span className="text-[10px] text-text-secondary">Tú administras</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-green/15 border border-green/40" />
          <span className="text-[10px] text-text-secondary">El proveedor administra</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-yellow/20 border border-yellow/50" />
          <span className="text-[10px] text-text-secondary">Responsabilidad compartida</span>
        </div>
      </div>

      {/* Control slider visual */}
      <div className="pt-2">
        <div className="flex items-center justify-between text-[10px] text-text-secondary mb-1">
          <span className="font-medium">← Más control técnico</span>
          <span className="font-medium">Menos gestión →</span>
        </div>
        <div className="h-2 rounded-full bg-grey-light relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-azure via-cyan to-green transition-all duration-500"
            style={{
              width: active === "iaas" ? "33%" : active === "paas" ? "66%" : "100%",
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className={`text-[10px] font-semibold ${active === "iaas" ? "text-azure" : "text-text-secondary/50"}`}>IaaS</span>
          <span className={`text-[10px] font-semibold ${active === "paas" ? "text-azure" : "text-text-secondary/50"}`}>PaaS</span>
          <span className={`text-[10px] font-semibold ${active === "saas" ? "text-azure" : "text-text-secondary/50"}`}>SaaS</span>
        </div>
      </div>
    </div>
  );
}
