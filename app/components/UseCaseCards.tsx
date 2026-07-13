"use client";

import { useState } from "react";
import {
  Monitor,
  Server,
  Database,
  Globe,
  BarChart3,
  Brain,
  Shield,
  Code,
  Cpu,
  HardDrive,
  Network,
  Cog,
  Boxes,
  Zap,
  Container,
  Cloud,
  Lock,
  Workflow,
  FileCode,
  Microscope,
  GraduationCap,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  monitor: Monitor,
  server: Server,
  database: Database,
  globe: Globe,
  chart: BarChart3,
  brain: Brain,
  shield: Shield,
  code: Code,
  cpu: Cpu,
  disk: HardDrive,
  network: Network,
  cog: Cog,
  boxes: Boxes,
  zap: Zap,
  container: Container,
  cloud: Cloud,
  lock: Lock,
  workflow: Workflow,
  filecode: FileCode,
  microscope: Microscope,
  graduation: GraduationCap,
  flask: FlaskConical,
};

export type UseCase = {
  title: string;
  icons: string[];
  explanation: string;
  subjects: string[];
  tag: string;
};

type UseCaseCardsProps = {
  serviceName: string;
  cases: UseCase[];
};

const tagColors: Record<string, { bg: string; text: string; border: string }> = {
  "control total": { bg: "bg-orange/10", text: "text-orange", border: "border-orange/30" },
  "escalado automático": { bg: "bg-cyan/10", text: "text-azure", border: "border-azure/30" },
  "contenedores": { bg: "bg-blue/10", text: "text-blue", border: "border-blue/30" },
  "evento": { bg: "bg-yellow/10", text: "text-orange", border: "border-yellow/30" },
  "base administrada": { bg: "bg-green/10", text: "text-green", border: "border-green/30" },
  "GPU/HPC": { bg: "bg-red/10", text: "text-red", border: "border-red/30" },
  "migración lift-and-shift": { bg: "bg-yellow/10", text: "text-orange", border: "border-yellow/30" },
  "aislamiento completo": { bg: "bg-blue/10", text: "text-blue", border: "border-blue/30" },
  "orquestación": { bg: "bg-cyan/10", text: "text-azure", border: "border-azure/30" },
  "serverless": { bg: "bg-green/10", text: "text-green", border: "border-green/30" },
  "PaaS": { bg: "bg-blue/10", text: "text-blue", border: "border-blue/30" },
};

function getTagStyle(tag: string) {
  const key = Object.keys(tagColors).find((k) => tag.toLowerCase().includes(k.toLowerCase()));
  return key ? tagColors[key] : { bg: "bg-grey-light", text: "text-foreground", border: "border-border" };
}

export function UseCaseCards({ serviceName, cases }: UseCaseCardsProps) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-azure/20 bg-gradient-to-br from-azure/5 via-transparent to-transparent overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-azure/15 bg-azure/5">
        <Boxes className="w-5 h-5 text-azure" />
        <span className="text-xs font-bold uppercase tracking-wider text-azure-dark">
          Escenarios de uso — {serviceName}
        </span>
      </div>

      {/* Cards grid */}
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {cases.map((useCase, idx) => {
            const isExpanded = expandedIdx === idx;
            const tagStyle = getTagStyle(useCase.tag);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                className={`group text-left rounded-xl border transition-all duration-300 cursor-pointer ${
                  isExpanded
                    ? "border-azure/40 bg-azure/5 shadow-lg shadow-azure/5 scale-[1.02]"
                    : "border-border hover:border-azure/30 bg-white hover:bg-azure/[0.02] hover:shadow-md"
                }`}
              >
                {/* Icon area */}
                <div className="px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2 mb-3">
                    {useCase.icons.map((iconName, i) => {
                      const IconComponent = iconMap[iconName];
                      if (!IconComponent) return null;
                      return (
                        <div
                          key={i}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            isExpanded
                              ? "bg-azure/15 text-azure"
                              : "bg-panel text-text-secondary group-hover:bg-azure/10 group-hover:text-azure"
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Title */}
                  <h4 className="text-sm font-semibold text-foreground leading-snug mb-2">
                    {useCase.title}
                  </h4>

                  {/* Tag */}
                  <span
                    className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagStyle.bg} ${tagStyle.text} ${tagStyle.border}`}
                  >
                    {useCase.tag}
                  </span>
                </div>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-4 border-t border-border/50 pt-3">
                    {/* Explanation */}
                    <p className="text-xs text-text-secondary leading-relaxed mb-3">
                      {useCase.explanation}
                    </p>

                    {/* Subject badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {useCase.subjects.map((subject, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-md bg-panel border border-border/80 text-text-secondary"
                        >
                          <GraduationCap className="w-2.5 h-2.5 text-azure/60" />
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hint to expand */}
                <div className={`px-5 pb-3 ${isExpanded ? "hidden" : "block"}`}>
                  <span className="text-[10px] text-text-secondary/50 italic">
                    Toca para ver más →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
