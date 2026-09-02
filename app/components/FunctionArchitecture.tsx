"use client";

import { useState } from "react";
import {
  Code2,
  Server,
  Cloud,
  Zap,
  ArrowRight,
  Box,
  FileCode2,
  RefreshCcw,
  CheckCircle2,
  Cpu
} from "lucide-react";

export function FunctionArchitecture() {
  const [step, setStep] = useState(0);

  const architectureSteps = [
    {
      id: 0,
      title: "1. Tu único enfoque: El Código",
      desc: "Solo escribes una función (ej. en Node.js o Python) que recibe un evento y devuelve un resultado. Cero configuración de red o SO.",
      icon: <FileCode2 className="w-6 h-6 text-purple-500" />
    },
    {
      id: 1,
      title: "2. Almacenamiento en la Nube",
      desc: "Tu código se empaqueta y se guarda de forma segura en la plataforma, inactivo y sin consumir recursos de cómputo.",
      icon: <Cloud className="w-6 h-6 text-blue-400" />
    },
    {
      id: 2,
      title: "3. Ocurre un Evento",
      desc: "Llega una solicitud HTTP, se sube un archivo o se dispara una alerta. Este evento es el gatillo.",
      icon: <Zap className="w-6 h-6 text-orange" />
    },
    {
      id: 3,
      title: "4. Ejecución Aislada",
      desc: "La plataforma levanta un contenedor efímero instantáneamente, inyecta tu código, lo ejecuta y procesa el evento.",
      icon: <Box className="w-6 h-6 text-cyan" />
    },
    {
      id: 4,
      title: "5. Destrucción o Reutilización",
      desc: "Al terminar, el entorno se destruye (escala a cero) o se mantiene tibio si hay más eventos. Pagas solo por los milisegundos de ejecución.",
      icon: <RefreshCcw className="w-6 h-6 text-green" />
    }
  ];

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <Cpu className="w-5 h-5 text-purple-500" />
        <h3 className="text-sm font-semibold text-foreground">
          Arquitectura de Funciones (FaaS)
        </h3>
      </div>
      <p className="text-xs text-text-secondary mt-1">
        A diferencia de los servidores tradicionales, en una arquitectura de funciones solo te preocupas por el código. La plataforma gestiona dinámicamente dónde y cómo se ejecuta.
      </p>

      {/* Interactive Visualizer */}
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        
        {/* Steps List */}
        <div className="space-y-3">
          {architectureSteps.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => setStep(idx)}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                step === idx 
                ? "bg-purple-500/10 border-purple-500/30 shadow-sm" 
                : "bg-transparent border-border hover:border-purple-500/20"
              }`}
            >
              <div className={`mt-0.5 ${step === idx ? "opacity-100" : "opacity-50"}`}>
                {s.icon}
              </div>
              <div>
                <h4 className={`text-xs font-bold ${step === idx ? "text-purple-400" : "text-text-secondary"}`}>
                  {s.title}
                </h4>
                <p className={`text-[10px] mt-1 ${step === idx ? "text-text-secondary" : "text-text-secondary/70"}`}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Graphic Area */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px] relative">
          
          {step === 0 && (
            <div className="flex flex-col items-center text-center animate-in zoom-in duration-300">
              <Code2 className="w-16 h-16 text-purple-500 mb-4" />
              <div className="bg-black border border-gray-700 rounded p-3 text-left">
                <p className="text-[10px] text-green-400 font-mono">exports.myFunction = (req, res) ={">"} {"{"}</p>
                <p className="text-[10px] text-gray-300 font-mono pl-4">res.send("Hello World!");</p>
                <p className="text-[10px] text-green-400 font-mono">{"};"}</p>
              </div>
              <p className="text-xs text-gray-400 mt-4">El desarrollador solo ve esto.</p>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col items-center animate-in fade-in slide-in-from-bottom duration-300">
              <Cloud className="w-20 h-20 text-blue-400 mb-4" />
              <div className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-[10px] border border-blue-500/30">
                Código almacenado (Inactivo)
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col items-center animate-in fade-in duration-300 w-full px-8">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center border border-orange/40 animate-pulse">
                    <Zap className="w-6 h-6 text-orange" />
                  </div>
                  <span className="text-[10px] text-orange mt-2">HTTP / PubSub</span>
                </div>
                <ArrowRight className="w-8 h-8 text-gray-600" />
                <Cloud className="w-12 h-12 text-blue-400 opacity-50" />
              </div>
              <p className="text-xs text-gray-400 mt-6 text-center">El evento activa la plataforma.</p>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center animate-in zoom-in duration-300 w-full relative">
              <div className="w-full max-w-[200px] border-2 border-dashed border-cyan/50 rounded-lg p-4 bg-cyan/5 flex flex-col items-center">
                <span className="text-[10px] text-cyan uppercase mb-2 font-bold tracking-wider">Contenedor Efímero</span>
                <Server className="w-8 h-8 text-gray-500 mb-2" />
                <div className="w-full bg-cyan/20 rounded p-2 flex items-center justify-center border border-cyan/30">
                  <Code2 className="w-4 h-4 text-cyan mr-2" />
                  <span className="text-xs text-cyan font-mono">Ejecutando...</span>
                </div>
              </div>
              <p className="text-[10px] text-gray-400 mt-4 text-center max-w-[200px]">
                Se inyectan variables de entorno, contexto y el payload del evento.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center animate-in fade-in duration-300">
              <CheckCircle2 className="w-16 h-16 text-green mb-4" />
              <div className="flex items-center gap-4 text-xs text-gray-300">
                <div className="flex flex-col items-center">
                  <span className="text-green font-bold text-lg">0</span>
                  <span className="text-[9px]">Instancias activas</span>
                </div>
                <div className="w-px h-8 bg-gray-700"></div>
                <div className="flex flex-col items-center">
                  <span className="text-green font-bold text-lg">$0.00</span>
                  <span className="text-[9px]">Costo en reposo</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
