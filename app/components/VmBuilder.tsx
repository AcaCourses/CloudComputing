"use client";

import { useState } from "react";
import {
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Gpu,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
  Wrench,
  Zap,
} from "lucide-react";

type OsOption = {
  id: string;
  label: string;
  detail: string;
};

const osOptions: OsOption[] = [
  { id: "debian", label: "Debian 12", detail: "Linux — ligero y estable" },
  { id: "ubuntu", label: "Ubuntu 22.04 LTS", detail: "Linux — popular para desarrollo" },
  { id: "centos", label: "Rocky Linux 9", detail: "Linux — compatible con RHEL" },
  { id: "windows", label: "Windows Server 2022", detail: "Windows — apps .NET y legacy" },
];

type MachineType = {
  id: string;
  label: string;
  cpu: number;
  memory: number;
  gcpType: string;
  awsType: string;
  idealFor: string;
};

const machineTypes: MachineType[] = [
  { id: "micro", label: "Micro", cpu: 0.25, memory: 1, gcpType: "e2-micro", awsType: "t3.micro", idealFor: "Pruebas y free tier" },
  { id: "small", label: "Pequeña", cpu: 1, memory: 2, gcpType: "e2-small", awsType: "t3.small", idealFor: "Desarrollo ligero" },
  { id: "medium", label: "Mediana", cpu: 2, memory: 4, gcpType: "e2-medium", awsType: "t3.medium", idealFor: "Apps web y APIs" },
  { id: "standard", label: "Estándar", cpu: 4, memory: 16, gcpType: "e2-standard-4", awsType: "m5.xlarge", idealFor: "Producción general" },
  { id: "highcpu", label: "Alto cómputo", cpu: 8, memory: 8, gcpType: "c2-standard-8", awsType: "c5.2xlarge", idealFor: "Procesamiento intensivo" },
  { id: "highmem", label: "Alta memoria", cpu: 4, memory: 32, gcpType: "n2-highmem-4", awsType: "r5.xlarge", idealFor: "Bases de datos en memoria" },
];

type DiskOption = {
  id: string;
  label: string;
  gcpName: string;
  awsName: string;
  speed: string;
};

const diskOptions: DiskOption[] = [
  { id: "standard", label: "HDD estándar", gcpName: "pd-standard", awsName: "gp2 (magnetic)", speed: "Económico, menor rendimiento" },
  { id: "balanced", label: "SSD balanceado", gcpName: "pd-balanced", awsName: "gp3", speed: "Buen equilibrio costo/rendimiento" },
  { id: "ssd", label: "SSD alto rendimiento", gcpName: "pd-ssd", awsName: "io2", speed: "Máximo IOPS para cargas exigentes" },
];

type ViewMode = "concept" | "gcp" | "aws";

export function VmBuilder() {
  const [selectedOs, setSelectedOs] = useState<string>("ubuntu");
  const [selectedMachine, setSelectedMachine] = useState<string>("medium");
  const [selectedDisk, setSelectedDisk] = useState<string>("balanced");
  const [diskSize, setDiskSize] = useState<number>(50);
  const [hasGpu, setHasGpu] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>("concept");

  const machine = machineTypes.find((m) => m.id === selectedMachine)!;
  const disk = diskOptions.find((d) => d.id === selectedDisk)!;
  const os = osOptions.find((o) => o.id === selectedOs)!;

  // Estimated monthly cost (simplified)
  const cpuCost = machine.cpu * 12;
  const memCost = machine.memory * 2.5;
  const diskCost = diskSize * (selectedDisk === "ssd" ? 0.17 : selectedDisk === "balanced" ? 0.10 : 0.04);
  const gpuCost = hasGpu ? 350 : 0;
  const totalCost = cpuCost + memCost + diskCost + gpuCost;

  const reset = () => {
    setSelectedOs("ubuntu");
    setSelectedMachine("medium");
    setSelectedDisk("balanced");
    setDiskSize(50);
    setHasGpu(false);
  };

  // Determine suggested use case
  const getSuggestedUse = () => {
    if (hasGpu) return "Machine learning, renderizado o simulaciones científicas";
    if (machine.id === "highmem") return "Bases de datos en memoria, caché o análisis en RAM";
    if (machine.id === "highcpu") return "Procesamiento batch, compilación o cálculo intensivo";
    if (machine.id === "micro" || machine.id === "small") return "Desarrollo, pruebas o servicios ligeros";
    return "Aplicaciones web, APIs o servicios de producción general";
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Server className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Constructor de máquina virtual
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Arma tu VM seleccionando cada componente. Al final verás el uso sugerido y costo estimado.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-text-secondary hover:text-foreground border border-border hover:border-azure/20 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Left column: Configuration */}
        <div className="space-y-3">
          {/* OS selection */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-medium">
              <Monitor className="w-3 h-3" />
              Sistema operativo
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {osOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOs(opt.id)}
                  className={`text-left px-2.5 py-2 rounded-md border text-xs transition-all ${
                    selectedOs === opt.id
                      ? "border-azure/40 bg-azure/5 text-foreground"
                      : "border-border text-text-secondary hover:border-azure/20"
                  }`}
                >
                  <span className="font-semibold block">{opt.label}</span>
                  <span className="text-[10px] text-text-secondary">{opt.detail}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Machine type */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-medium">
              <Cpu className="w-3 h-3" />
              Tipo de máquina
            </div>
            <div className="space-y-1">
              {machineTypes.map((mt) => (
                <button
                  key={mt.id}
                  onClick={() => setSelectedMachine(mt.id)}
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-md border text-xs transition-all text-left ${
                    selectedMachine === mt.id
                      ? "border-azure/40 bg-azure/5"
                      : "border-border hover:border-azure/20"
                  }`}
                >
                  <span className={`font-semibold w-24 ${selectedMachine === mt.id ? "text-foreground" : "text-text-secondary"}`}>
                    {mt.label}
                  </span>
                  <span className="text-[10px] text-text-secondary flex-1">
                    {viewMode === "gcp" ? mt.gcpType : viewMode === "aws" ? mt.awsType : `${mt.cpu} vCPU, ${mt.memory} GB RAM`}
                  </span>
                  <span className="text-[9px] text-text-secondary hidden sm:block">
                    {mt.idealFor}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Disk */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-text-secondary font-medium">
              <HardDrive className="w-3 h-3" />
              Disco
            </div>
            <div className="flex gap-1.5">
              {diskOptions.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDisk(d.id)}
                  className={`flex-1 px-2 py-2 rounded-md border text-[10px] text-center transition-all ${
                    selectedDisk === d.id
                      ? "border-azure/40 bg-azure/5 text-foreground font-semibold"
                      : "border-border text-text-secondary hover:border-azure/20"
                  }`}
                >
                  {viewMode === "gcp" ? d.gcpName : viewMode === "aws" ? d.awsName : d.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={diskSize}
                onChange={(e) => setDiskSize(Number(e.target.value))}
                className="flex-1 accent-azure h-1.5"
              />
              <span className="text-xs font-mono font-semibold text-foreground w-14 text-right">
                {diskSize} GB
              </span>
            </div>
          </div>

          {/* GPU toggle */}
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-md border border-border">
            <Gpu className="w-3.5 h-3.5 text-text-secondary" />
            <span className="text-xs text-text-secondary flex-1">GPU / Acelerador</span>
            <button
              onClick={() => setHasGpu(!hasGpu)}
              className={`w-9 h-5 rounded-full transition-colors ${
                hasGpu ? "bg-azure" : "bg-grey-light"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                  hasGpu ? "translate-x-4.5 ml-[18px]" : "translate-x-0.5 ml-[2px]"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right column: Summary */}
        <div className="space-y-3">
          {/* Config summary card */}
          <div className="rounded-lg border border-azure/20 bg-azure/5 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-azure" />
              <h4 className="text-xs font-semibold text-foreground">Tu máquina virtual</h4>
              {viewMode !== "concept" && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-medium ml-auto ${
                    viewMode === "gcp"
                      ? "bg-azure/10 text-azure border border-azure/20"
                      : "bg-orange/10 text-orange border border-orange/20"
                  }`}
                >
                  {viewMode === "gcp" ? "Compute Engine" : "EC2"}
                </span>
              )}
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">SO:</span>
                <span className="font-medium text-foreground">{os.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Tipo:</span>
                <span className="font-mono text-foreground">
                  {viewMode === "gcp" ? machine.gcpType : viewMode === "aws" ? machine.awsType : `${machine.cpu} vCPU / ${machine.memory} GB`}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Disco:</span>
                <span className="font-medium text-foreground">
                  {diskSize} GB {viewMode === "gcp" ? disk.gcpName : viewMode === "aws" ? disk.awsName : disk.label}
                </span>
              </div>
              {hasGpu && (
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">GPU:</span>
                  <span className="font-medium text-foreground">
                    {viewMode === "gcp" ? "NVIDIA T4 (Compute Engine)" : viewMode === "aws" ? "NVIDIA T4 (EC2 G4)" : "NVIDIA T4"}
                  </span>
                </div>
              )}
            </div>

            {/* Cost estimate */}
            <div className="border-t border-azure/20 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-text-secondary">Costo estimado mensual:</span>
                <span className="text-sm font-bold text-azure">${totalCost.toFixed(0)} USD</span>
              </div>
              <p className="text-[9px] text-text-secondary italic mt-1">
                * Estimación simplificada para fines pedagógicos
              </p>
            </div>
          </div>

          {/* Suggested use */}
          <div className="rounded-lg border border-green/20 bg-green/5 p-3 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-green" />
              <span className="text-[10px] uppercase tracking-wider text-green font-medium">
                Uso sugerido
              </span>
            </div>
            <p className="text-xs text-foreground leading-relaxed">
              {getSuggestedUse()}
            </p>
          </div>

          {/* VM vs Managed comparison */}
          <div className="rounded-lg border border-border p-3 space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
              VM vs Servicio administrado
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-azure font-semibold">
                  <Wrench className="w-3 h-3" />
                  VM (tú administras)
                </div>
                <ul className="space-y-0.5 text-text-secondary">
                  <li>• Control total del SO</li>
                  <li>• Instalar cualquier software</li>
                  <li>• Configurar red a detalle</li>
                  <li>• Tú haces parches y updates</li>
                </ul>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-green font-semibold">
                  <Zap className="w-3 h-3" />
                  Administrado (proveedor)
                </div>
                <ul className="space-y-0.5 text-text-secondary">
                  <li>• Sin acceso al SO</li>
                  <li>• Solo tu código/config</li>
                  <li>• Escalado automático</li>
                  <li>• Proveedor hace parches</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
