"use client";

import { useState, useEffect, useRef } from "react";
import {
  TrendingUp,
  Server,
  Users,
  Minus,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Zap,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

export function ScalingSimulator() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [minInstances, setMinInstances] = useState(2);
  const [maxInstances, setMaxInstances] = useState(10);
  const [cpuTarget, setCpuTarget] = useState(60);
  const [trafficLevel, setTrafficLevel] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [currentInstances, setCurrentInstances] = useState(2);
  const [cpuUsage, setCpuUsage] = useState(25);
  const [history, setHistory] = useState<{ traffic: number; instances: number; cpu: number }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Simulate autoscaling logic
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setHistory((prev) => {
        const newCpu = Math.min(95, Math.max(5, (trafficLevel / currentInstances) * 1.8 + Math.random() * 10 - 5));
        setCpuUsage(newCpu);

        // Autoscaling decision
        let newInstances = currentInstances;
        if (newCpu > cpuTarget + 10 && currentInstances < maxInstances) {
          newInstances = Math.min(maxInstances, currentInstances + 1);
        } else if (newCpu < cpuTarget - 20 && currentInstances > minInstances) {
          newInstances = Math.max(minInstances, currentInstances - 1);
        }
        setCurrentInstances(newInstances);

        const entry = { traffic: trafficLevel, instances: newInstances, cpu: newCpu };
        return [...prev.slice(-29), entry];
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, trafficLevel, currentInstances, cpuTarget, minInstances, maxInstances]);

  const reset = () => {
    setIsRunning(false);
    setCurrentInstances(minInstances);
    setCpuUsage(25);
    setHistory([]);
    setTrafficLevel(30);
  };

  const costPerInstance = 35; // simplified monthly cost
  const monthlyCost = currentInstances * costPerInstance;
  const isOverloaded = cpuUsage > 85;
  const isHealthy = cpuUsage <= cpuTarget + 10 && cpuUsage >= 10;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-cyan" />
            <h3 className="text-sm font-semibold text-foreground">
              Simulador de escalamiento automático
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Mueve el tráfico y observa cómo el autoscaler ajusta las instancias. Configura la política de escalado.
          </p>
        </div>
        <div className="flex items-center bg-grey-light rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => setViewMode("concept")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "concept"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Concepto
          </button>
          <button
            onClick={() => setViewMode("gcp")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "gcp"
                ? "bg-white text-azure shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            GCP
          </button>
          <button
            onClick={() => setViewMode("aws")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "aws"
                ? "bg-white text-orange shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            AWS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-4">
        {/* Main area: traffic control + visualization */}
        <div className="space-y-3">
          {/* Traffic control */}
          <div className="rounded-lg border border-border bg-white/30 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-medium">
                <Users className="w-3 h-3" />
                Tráfico de usuarios
              </div>
              <span className="text-xs font-mono font-semibold text-foreground">
                {trafficLevel} usuarios/s
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              value={trafficLevel}
              onChange={(e) => setTrafficLevel(Number(e.target.value))}
              className="w-full accent-cyan h-1.5"
            />
            <div className="flex items-center justify-between text-[9px] text-text-secondary">
              <span>Bajo (10)</span>
              <span>Medio (150)</span>
              <span>Pico (500)</span>
            </div>
          </div>

          {/* Live status */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg border border-border p-2.5 text-center">
              <Server className="w-4 h-4 text-azure mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{currentInstances}</p>
              <p className="text-[9px] text-text-secondary">
                {viewMode === "gcp" ? "VMs en MIG" : viewMode === "aws" ? "EC2 en ASG" : "Instancias"}
              </p>
            </div>
            <div className={`rounded-lg border p-2.5 text-center ${
              isOverloaded ? "border-red-300 bg-red-50" : isHealthy ? "border-green/30 bg-green/5" : "border-orange/30 bg-orange/5"
            }`}>
              <Zap className={`w-4 h-4 mx-auto mb-1 ${
                isOverloaded ? "text-red-500" : isHealthy ? "text-green" : "text-orange"
              }`} />
              <p className="text-lg font-bold text-foreground">{cpuUsage.toFixed(0)}%</p>
              <p className="text-[9px] text-text-secondary">CPU promedio</p>
            </div>
            <div className="rounded-lg border border-border p-2.5 text-center">
              <DollarSign className="w-4 h-4 text-green mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">${monthlyCost}</p>
              <p className="text-[9px] text-text-secondary">USD/mes est.</p>
            </div>
          </div>

          {/* Mini chart */}
          {history.length > 0 && (
            <div className="rounded-lg border border-border bg-gray-900 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] text-gray-400 font-medium uppercase tracking-wider">
                  Histórico (últimos 30s)
                </span>
                <div className="flex items-center gap-3 text-[9px]">
                  <span className="flex items-center gap-1 text-cyan">
                    <div className="w-2 h-2 rounded-full bg-cyan" /> Instancias
                  </span>
                  <span className="flex items-center gap-1 text-orange">
                    <div className="w-2 h-2 rounded-full bg-orange" /> CPU%
                  </span>
                </div>
              </div>
              <div className="flex items-end gap-[2px] h-16">
                {history.map((entry, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-[1px]">
                    <div
                      className="w-full bg-cyan/60 rounded-t-sm transition-all"
                      style={{ height: `${(entry.instances / maxInstances) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
              {/* CPU line overlay */}
              <div className="relative h-0">
                <div
                  className="absolute bottom-0 left-0 right-0 border-t border-dashed border-orange/50"
                  style={{ bottom: `${(cpuTarget / 100) * 64}px` }}
                />
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                isRunning
                  ? "bg-orange/10 text-orange border border-orange/30 hover:bg-orange/20"
                  : "bg-cyan/10 text-cyan border border-cyan/30 hover:bg-cyan/20"
              }`}
            >
              {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isRunning ? "Pausar" : "Iniciar"}
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-text-secondary border border-border hover:border-azure/20 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
            {isOverloaded && (
              <div className="flex items-center gap-1 text-[10px] text-red-500 ml-auto">
                <AlertTriangle className="w-3 h-3" />
                <span className="font-medium">Sobrecarga — escalando...</span>
              </div>
            )}
            {isHealthy && isRunning && (
              <div className="flex items-center gap-1 text-[10px] text-green ml-auto">
                <CheckCircle2 className="w-3 h-3" />
                <span className="font-medium">Saludable</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Policy configuration */}
        <div className="space-y-3">
          <div className="rounded-lg border border-border p-3 space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-medium">
              <Settings className="w-3 h-3" />
              {viewMode === "gcp" ? "Autoscaler policy" : viewMode === "aws" ? "ASG Scaling policy" : "Política de escalado"}
            </div>

            {/* Min instances */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-text-secondary">Mínimo</span>
                <span className="font-mono font-semibold text-foreground">{minInstances}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinInstances(Math.max(1, minInstances - 1))}
                  className="w-5 h-5 rounded flex items-center justify-center border border-border text-text-secondary hover:text-foreground"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={minInstances}
                  onChange={(e) => setMinInstances(Number(e.target.value))}
                  className="flex-1 accent-azure h-1"
                />
                <button
                  onClick={() => setMinInstances(Math.min(5, minInstances + 1))}
                  className="w-5 h-5 rounded flex items-center justify-center border border-border text-text-secondary hover:text-foreground"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Max instances */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-text-secondary">Máximo</span>
                <span className="font-mono font-semibold text-foreground">{maxInstances}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMaxInstances(Math.max(minInstances + 1, maxInstances - 1))}
                  className="w-5 h-5 rounded flex items-center justify-center border border-border text-text-secondary hover:text-foreground"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <input
                  type="range"
                  min={3}
                  max={20}
                  value={maxInstances}
                  onChange={(e) => setMaxInstances(Number(e.target.value))}
                  className="flex-1 accent-azure h-1"
                />
                <button
                  onClick={() => setMaxInstances(Math.min(20, maxInstances + 1))}
                  className="w-5 h-5 rounded flex items-center justify-center border border-border text-text-secondary hover:text-foreground"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* CPU target */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-text-secondary">CPU objetivo</span>
                <span className="font-mono font-semibold text-foreground">{cpuTarget}%</span>
              </div>
              <input
                type="range"
                min={30}
                max={90}
                value={cpuTarget}
                onChange={(e) => setCpuTarget(Number(e.target.value))}
                className="w-full accent-orange h-1"
              />
            </div>
          </div>

          {/* Info box */}
          <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary space-y-1.5">
            <p className="font-medium text-foreground">
              {viewMode === "gcp" ? "Managed Instance Group" : viewMode === "aws" ? "Auto Scaling Group" : "Cómo funciona"}
            </p>
            {viewMode === "concept" ? (
              <ul className="space-y-0.5">
                <li>• Si CPU &gt; objetivo → añade instancias</li>
                <li>• Si CPU &lt; objetivo − 20% → reduce instancias</li>
                <li>• Nunca baja del mínimo ni sube del máximo</li>
                <li>• El ajuste toma tiempo (cooldown)</li>
              </ul>
            ) : viewMode === "gcp" ? (
              <ul className="space-y-0.5">
                <li>• MIG con autoscaling policy</li>
                <li>• Métrica: CPU utilization</li>
                <li>• Cool down: 60s por defecto</li>
                <li>• gcloud compute instance-groups managed set-autoscaling</li>
              </ul>
            ) : (
              <ul className="space-y-0.5">
                <li>• ASG con target tracking policy</li>
                <li>• Métrica: CPUUtilization</li>
                <li>• Cooldown: 300s por defecto</li>
                <li>• aws autoscaling put-scaling-policy</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
