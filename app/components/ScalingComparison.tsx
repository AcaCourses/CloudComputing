"use client";

import { ArrowUp, ArrowRight, Server, AlertTriangle, CheckCircle2, RotateCcw, TrendingUp } from "lucide-react";

export function ScalingComparison() {
  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="w-4 h-4 text-cyan" />
        <h3 className="text-sm font-semibold text-foreground">
          Vertical vs. Horizontal
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Scale Up - Vertical */}
        <div className="rounded-lg border border-border bg-white p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center">
              <ArrowUp className="w-4 h-4 text-orange" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Scale Up</h4>
              <p className="text-[10px] text-text-secondary">Escalamiento vertical</p>
            </div>
          </div>

          {/* Visual: small VM → big VM */}
          <div className="flex items-center justify-center gap-3 py-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-md border-2 border-orange/30 bg-orange/5 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/Compute Engine.svg" alt="VM" className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-text-secondary font-mono">2 CPU</span>
              <span className="text-[9px] text-text-secondary font-mono">4 GB</span>
            </div>

            <ArrowRight className="w-4 h-4 text-orange" />

            <div className="flex flex-col items-center gap-1">
              <div className="w-14 h-14 rounded-md border-2 border-orange/50 bg-orange/10 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/Compute Engine.svg" alt="VM" className="w-7 h-7" />
              </div>
              <span className="text-[9px] text-foreground font-mono font-bold">8 CPU</span>
              <span className="text-[9px] text-foreground font-mono font-bold">32 GB</span>
            </div>
          </div>

          {/* Pros/Cons */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-1.5 text-[10px]">
              <CheckCircle2 className="w-3 h-3 text-green shrink-0 mt-0.5" />
              <span className="text-text-secondary">Simple: solo cambiar tipo de máquina</span>
            </div>
            <div className="flex items-start gap-1.5 text-[10px]">
              <AlertTriangle className="w-3 h-3 text-orange shrink-0 mt-0.5" />
              <span className="text-text-secondary">Requiere reinicio de la VM</span>
            </div>
            <div className="flex items-start gap-1.5 text-[10px]">
              <AlertTriangle className="w-3 h-3 text-orange shrink-0 mt-0.5" />
              <span className="text-text-secondary">Tiene un techo físico (no hay VMs infinitas)</span>
            </div>
          </div>
        </div>

        {/* Scale Out - Horizontal */}
        <div className="rounded-lg border-2 border-cyan/30 bg-cyan/3 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-cyan" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Scale Out</h4>
              <p className="text-[10px] text-text-secondary">Escalamiento horizontal</p>
            </div>
            <span className="ml-auto text-[9px] font-bold text-cyan bg-cyan/10 px-2 py-0.5 rounded-full">
              Patrón dominante
            </span>
          </div>

          {/* Visual: 1 VM → many VMs behind LB */}
          <div className="flex items-center justify-center gap-3 py-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-md border-2 border-cyan/30 bg-cyan/5 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/Compute Engine.svg" alt="VM" className="w-5 h-5" />
              </div>
              <span className="text-[9px] text-text-secondary font-mono">×1</span>
            </div>

            <ArrowRight className="w-4 h-4 text-cyan" />

            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="w-8 h-8 rounded-md border-2 border-cyan/40 bg-cyan/10 flex items-center justify-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/Compute Engine.svg" alt="VM" className="w-4 h-4" />
                  </div>
                ))}
              </div>
              <span className="text-[9px] text-foreground font-mono font-bold">×4 instancias</span>
              <span className="text-[9px] text-text-secondary">+ balanceador de carga</span>
            </div>
          </div>

          {/* Pros/Cons */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-1.5 text-[10px]">
              <CheckCircle2 className="w-3 h-3 text-green shrink-0 mt-0.5" />
              <span className="text-text-secondary">Sin techo práctico: agrega más instancias</span>
            </div>
            <div className="flex items-start gap-1.5 text-[10px]">
              <CheckCircle2 className="w-3 h-3 text-green shrink-0 mt-0.5" />
              <span className="text-text-secondary">Alta disponibilidad (si una cae, las demás siguen)</span>
            </div>
            <div className="flex items-start gap-1.5 text-[10px]">
              <RotateCcw className="w-3 h-3 text-cyan shrink-0 mt-0.5" />
              <span className="text-text-secondary">Se combina con autoescalado para ajuste automático</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom summary */}
      <div className="rounded-lg bg-gray-50 border border-border px-4 py-2.5 flex items-center gap-3">
        <Server className="w-4 h-4 text-cyan shrink-0" />
        <p className="text-[11px] text-text-secondary leading-relaxed">
          <span className="font-semibold text-foreground">En la nube</span>, el escalamiento horizontal con autoescalado es el patrón dominante: más instancias cuando sube la demanda, menos cuando baja. Sin reinicio, sin techo.
        </p>
      </div>
    </div>
  );
}
