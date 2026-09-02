"use client";

import { useState } from "react";
import {
  Server,
  Cloud,
  Box,
  Zap,
  Globe,
  Database,
  Shield,
  ArrowRight,
  Code2,
  Terminal,
  Settings,
  Package,
  Layers,
  Cpu,
  CheckCircle2,
} from "lucide-react";

type ArchitectureType = "iaas" | "paas" | "caas" | "faas";

const ARCHITECTURES = {
  iaas: {
    id: "iaas",
    name: "IaaS (Máquina Virtual)",
    icon: <Server className="w-5 h-5" />,
    color: "blue",
    description: "Tú configuras todo desde el sistema operativo hacia arriba. Control total, máxima responsabilidad.",
    diagram: [
      { layer: "Hardware / Red (Google)", provider: true },
      { layer: "Sistema Operativo (Linux)", provider: false },
      { layer: "Dependencias (Node, Nginx)", provider: false },
      { layer: "Tu Código (API)", provider: false },
    ],
    details: [
      "Debes instalar Node.js, Nginx y configurar el firewall.",
      "Si el tráfico sube, tú configuras el balanceador y los grupos de autoescalado.",
      "Pagas por hora que la VM esté encendida, reciba tráfico o no."
    ],
    command: "$ gcloud compute instances create api-vm \\ \n    --image-family=debian-11 \\ \n    --machine-type=e2-medium",
  },
  paas: {
    id: "paas",
    name: "PaaS (App Engine)",
    icon: <Cloud className="w-5 h-5" />,
    color: "orange",
    description: "Tú das el código, la plataforma maneja la infraestructura, el SO y el balanceo.",
    diagram: [
      { layer: "Hardware / Red (Google)", provider: true },
      { layer: "SO y Runtime (Node.js) (Google)", provider: true },
      { layer: "Autoescalado / LB (Google)", provider: true },
      { layer: "Tu Código (API)", provider: false },
    ],
    details: [
      "Solo escribes tu app.js y un archivo app.yaml indicando el runtime.",
      "Google configura Nginx, los certificados SSL y el balanceo de carga.",
      "Pagas por instancia activa, pero escala automáticamente."
    ],
    command: "$ gcloud app deploy app.yaml",
  },
  caas: {
    id: "caas",
    name: "CaaS (Cloud Run)",
    icon: <Box className="w-5 h-5" />,
    color: "cyan",
    description: "Empaquetas tu código en un contenedor Docker. Google lo ejecuta y escala.",
    diagram: [
      { layer: "Hardware / Red (Google)", provider: true },
      { layer: "Orquestador de Contenedores (Google)", provider: true },
      { layer: "Tu Contenedor (SO base + Runtime + API)", provider: false },
    ],
    details: [
      "Tienes que escribir un Dockerfile y construir la imagen.",
      "Puedes usar cualquier lenguaje, librería de sistema o binario.",
      "Escala a cero automáticamente. Pagas solo cuando se procesan peticiones."
    ],
    command: "$ gcloud run deploy api-service \\ \n    --image=gcr.io/proyecto/api \\ \n    --allow-unauthenticated",
  },
  faas: {
    id: "faas",
    name: "FaaS (Cloud Functions)",
    icon: <Zap className="w-5 h-5" />,
    color: "purple",
    description: "Subes funciones individuales atadas a eventos específicos (HTTP, Storage).",
    diagram: [
      { layer: "Hardware / Red / SO (Google)", provider: true },
      { layer: "Gestor de Eventos (Google)", provider: true },
      { layer: "Función 1 (Procesar Pago)", provider: false },
      { layer: "Función 2 (Generar Recibo)", provider: false },
    ],
    details: [
      "No hay un 'servidor web' principal, la aplicación se divide en pequeñas funciones.",
      "La infraestructura es 100% invisible y efímera.",
      "Pagas por milisegundos de ejecución. Escala instantáneamente por evento."
    ],
    command: "$ gcloud functions deploy procesarPago \\ \n    --trigger-http \\ \n    --runtime=nodejs20",
  }
};

export function ArchitectureComparison() {
  const [activeTab, setActiveTab] = useState<ArchitectureType>("iaas");

  const arch = ARCHITECTURES[activeTab];

  const colorMap: Record<string, string> = {
    blue: "border-blue-500/50 bg-blue-500/10 text-blue-400",
    orange: "border-orange/50 bg-orange/10 text-orange",
    cyan: "border-cyan/50 bg-cyan/10 text-cyan",
    purple: "border-purple-500/50 bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-azure" />
          <h3 className="text-base font-semibold text-foreground">
            Comparativa: API de E-commerce
          </h3>
        </div>
        <p className="text-xs text-text-secondary">
          Cómo se despliega exactamente la misma aplicación web usando 4 modelos diferentes.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-border/50 bg-gray-900/50">
        {(Object.keys(ARCHITECTURES) as ArchitectureType[]).map((key) => {
          const tab = ARCHITECTURES[key];
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold transition-all border-b-2 ${
                isActive
                  ? `${colorMap[tab.color].split(" ")[0]} ${colorMap[tab.color].split(" ")[2]}`
                  : "border-transparent text-text-secondary hover:text-foreground hover:bg-white/5"
              }`}
            >
              <div className={isActive ? "" : "opacity-60"}>{tab.icon}</div>
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-5 grid md:grid-cols-2 gap-6 animate-in fade-in duration-300" key={activeTab}>
        
        {/* Left Column: Stack Diagram */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-bold text-foreground mb-1">Pila de Tecnología</h4>
            <p className="text-xs text-text-secondary">{arch.description}</p>
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-950 p-4 space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500 mb-2 px-1">
              <span>Capa</span>
              <span>Responsable</span>
            </div>
            
            <div className="flex flex-col-reverse gap-2">
              {arch.diagram.map((layer, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-md text-xs font-medium border ${
                    layer.provider
                      ? "bg-gray-800/50 border-gray-700 text-gray-400"
                      : `bg-azure/10 border-azure/30 text-azure-light`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {layer.provider ? <Cloud className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                    {layer.layer}
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded ${layer.provider ? "bg-gray-700/50 text-gray-300" : "bg-azure/20 text-azure-light"}`}>
                    {layer.provider ? "Google" : "Tú"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Implementation Details */}
        <div className="space-y-5">
          
          <div>
            <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4" /> En la práctica
            </h4>
            <ul className="space-y-2">
              {arch.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-text-secondary">
                  <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${colorMap[arch.color].split(" ")[2]}`} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Comando de Despliegue
            </h4>
            <div className="rounded-md bg-gray-950 border border-gray-800 p-3 overflow-x-auto">
              <pre className="text-[11px] font-mono text-green-400 leading-relaxed">
                {arch.command}
              </pre>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
