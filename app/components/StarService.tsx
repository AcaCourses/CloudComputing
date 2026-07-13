"use client";

import Image from "next/image";
import { Star, Terminal } from "lucide-react";

type StarServiceProps = {
  serviceName: string;
  icon: string;
  description: string;
  features: string[];
  commands: { command: string; description: string }[];
};

export function StarService({ serviceName, icon, description, features, commands }: StarServiceProps) {
  return (
    <div className="rounded-xl border border-yellow/30 bg-gradient-to-br from-yellow/5 via-orange/5 to-transparent overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-yellow/20 bg-yellow/5">
        <Star className="w-5 h-5 text-yellow fill-yellow" />
        <span className="text-xs font-bold uppercase tracking-wider text-orange">
          Servicio Estrella
        </span>
      </div>

      {/* Service info */}
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center p-2">
            <Image src={icon} alt={serviceName} width={32} height={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">{serviceName}</h3>
            <p className="text-xs text-text-secondary">Google Cloud Platform</p>
          </div>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          {description}
        </p>

        {/* Features */}
        <div className="mb-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
            Características principales
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-text-secondary bg-panel/50 rounded-lg px-3 py-2 border border-border/50"
              >
                <span className="text-orange font-bold text-xs mt-0.5">▸</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commands */}
        {commands.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-azure" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Comandos básicos
              </h4>
            </div>
            <div className="rounded-lg border border-border bg-[#1e1e2e] overflow-hidden">
              <div className="divide-y divide-border/30">
                {commands.map((cmd, i) => (
                  <div key={i} className="px-4 py-3">
                    <code className="text-xs font-mono text-green-500 block mb-1">
                      $ {cmd.command}
                    </code>
                    <p className="text-[11px] text-gray-400">{cmd.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
