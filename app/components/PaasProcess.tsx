"use client";

import { useState, useEffect } from "react";
import { 
  Code2, 
  Terminal, 
  Server, 
  Globe, 
  Rocket, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  RotateCcw 
} from "lucide-react";

export function PaasProcess() {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      id: 0,
      title: "1. Escribes tu código",
      desc: "El desarrollador se enfoca únicamente en la lógica de la aplicación (Python, Node.js, Java, etc.).",
      icon: <Code2 className="w-6 h-6 text-azure" />
    },
    {
      id: 1,
      title: "2. Ejecutas el comando de despliegue",
      desc: "Un simple comando (ej. gcloud app deploy) envía tu código a la plataforma.",
      icon: <Terminal className="w-6 h-6 text-orange" />
    },
    {
      id: 2,
      title: "3. La plataforma crea la infraestructura",
      desc: "Automáticamente se provisionan servidores, contenedores y dependencias sin intervención manual.",
      icon: <Server className="w-6 h-6 text-purple-500" />
    },
    {
      id: 3,
      title: "4. Configura red y seguridad",
      desc: "Se establecen balanceadores de carga, certificados HTTPS y reglas de firewall.",
      icon: <ShieldCheck className="w-6 h-6 text-green" />
    },
    {
      id: 4,
      title: "5. ¡Aplicación lista para escalar!",
      desc: "La app recibe tráfico y escala automáticamente según la demanda.",
      icon: <Rocket className="w-6 h-6 text-pink-500" />
    }
  ];

  const advanceStep = () => {
    if (step < steps.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(prev => prev + 1);
        setIsAnimating(false);
      }, 600);
    }
  };

  const reset = () => {
    setStep(0);
  };

  // Auto advance option? Let's just use manual advance for better understanding.
  
  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Cpu className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              El proceso de un PaaS (Ej: App Engine)
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Observa cómo una plataforma administrada simplifica el paso de código a producción.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start pt-4">
        
        {/* Left side: Timeline */}
        <div className="flex-1 space-y-4 w-full">
          {steps.map((s, idx) => (
            <div 
              key={s.id} 
              className={`flex items-start gap-3 transition-all duration-500 ${
                idx <= step ? "opacity-100 translate-y-0" : "opacity-30 translate-y-2 grayscale"
              }`}
            >
              <div className={`mt-1 p-2 rounded-full flex-shrink-0 ${idx <= step ? "bg-panel border border-border shadow-sm" : "bg-transparent border border-transparent"}`}>
                {s.icon}
              </div>
              <div>
                <h4 className={`text-sm font-bold ${idx === step ? "text-foreground" : "text-text-secondary"}`}>{s.title}</h4>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right side: Visual Representation */}
        <div className="flex-1 w-full bg-gray-900 rounded-lg border border-gray-800 p-6 flex flex-col items-center justify-center min-h-[250px] relative overflow-hidden">
          
          {step === 0 && (
            <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
              <Code2 className="w-16 h-16 text-azure mb-3" />
              <p className="text-xs text-gray-400 font-mono">app.js / main.py</p>
            </div>
          )}
          
          {step === 1 && (
            <div className="flex flex-col items-center animate-in slide-in-from-right duration-500">
              <Terminal className="w-16 h-16 text-orange mb-3" />
              <div className="bg-black border border-gray-700 rounded p-2 text-[10px] text-green-400 font-mono">
                $ gcloud app deploy
                <br/>
                <span className="text-gray-500">Uploading code...</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center animate-in slide-in-from-bottom duration-500">
              <Server className="w-16 h-16 text-purple-500 mb-3" />
              <p className="text-xs text-gray-400 mb-2">Construyendo imagen...</p>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-800 rounded border border-gray-700 animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-800 rounded border border-gray-700 animate-pulse delay-75"></div>
                <div className="w-8 h-8 bg-gray-800 rounded border border-gray-700 animate-pulse delay-150"></div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center animate-in fade-in duration-500 w-full">
              <ShieldCheck className="w-12 h-12 text-green mb-3" />
              <div className="flex justify-between w-full max-w-[200px] mb-2 text-[10px] text-gray-400">
                <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-blue-400" /> DNS</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3 text-green" /> SSL</span>
              </div>
              <div className="w-full max-w-[200px] h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="w-full h-full bg-green animate-pulse"></div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center animate-in zoom-in duration-500">
              <Rocket className="w-16 h-16 text-pink-500 mb-3" />
              <p className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green" /> Producción
              </p>
              <p className="text-[10px] text-gray-400 mt-2 text-center">Escalamiento 0 → ∞ manejado por la plataforma</p>
            </div>
          )}
          
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-border/50">
        <button
          onClick={advanceStep}
          disabled={step === steps.length - 1 || isAnimating}
          className={`px-4 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-2 ${
            step === steps.length - 1 || isAnimating
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-azure text-white hover:bg-azure/90 shadow-sm"
          }`}
        >
          {step === 0 ? "Comenzar proceso" : step < steps.length - 1 ? "Siguiente paso" : "Proceso completado"}
          {step < steps.length - 1 && <ArrowRight className="w-3 h-3" />}
        </button>
        
        {step > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-1 px-3 py-2 rounded-md text-xs text-text-secondary hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reiniciar
          </button>
        )}
      </div>
    </div>
  );
}
