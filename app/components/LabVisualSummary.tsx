"use client";

import {
  Globe,
  Terminal,
  Server,
  Code,
  CheckCircle2,
  Monitor,
  Cloud,
  Shield,
  Brain,
  Database,
  Zap,
  ArrowRight,
  Target,
  Clock,
  Award,
  GraduationCap,
} from "lucide-react";
import type { LabOverview } from "@/data/content/labs";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  globe: Globe,
  terminal: Terminal,
  server: Server,
  code: Code,
  "check-circle": CheckCircle2,
  monitor: Monitor,
  cloud: Cloud,
  shield: Shield,
  brain: Brain,
  database: Database,
  zap: Zap,
};

function StepIcon({ icon }: { icon?: string }) {
  if (!icon) return <Cloud className="w-5 h-5 text-azure" />;

  if (icon.startsWith("service:")) {
    const serviceName = icon.replace("service:", "");
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/assets/${serviceName}.svg`}
        alt={serviceName}
        className="w-6 h-6"
      />
    );
  }

  const IconComponent = iconMap[icon];
  if (IconComponent) return <IconComponent className="w-5 h-5 text-azure" />;
  return <Cloud className="w-5 h-5 text-azure" />;
}

export default function LabVisualSummary({ overview }: { overview: LabOverview }) {
  return (
    <div className="mb-12 rounded-2xl border-2 border-green/20 bg-gradient-to-br from-green/5 via-white to-emerald-50 overflow-hidden shadow-sm">
      {/* Header with service info */}
      <div className="p-6 sm:p-8 border-b border-green/10 bg-gradient-to-r from-green/8 to-transparent">
        <div className="flex items-center gap-4 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={overview.serviceIcon}
            alt={overview.serviceName}
            className="w-12 h-12 sm:w-14 sm:h-14"
          />
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              ¿Qué vas a hacer en este lab?
            </h2>
          </div>
        </div>

        {/* Quick badges */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-xs font-medium text-foreground shadow-sm">
            <Clock className="w-3.5 h-3.5 text-azure" />
            {overview.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-xs font-medium text-foreground shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-green" />
            {overview.level}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border text-xs font-medium text-foreground shadow-sm">
            <Award className="w-3.5 h-3.5 text-orange" />
            {overview.credits} crédito{overview.credits > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Steps - visual flow */}
      <div className="p-6 sm:p-8">
        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-5 flex items-center gap-2">
          <Target className="w-4 h-4 text-azure" />
          Flujo del laboratorio
        </h3>

        {/* Steps grid/flow */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overview.steps.map((step, i) => (
            <div
              key={step.step}
              className="group relative flex flex-col p-4 rounded-xl border border-border bg-white hover:border-azure/40 hover:shadow-md transition-all duration-200"
            >
              {/* Step number badge */}
              <div className="absolute -top-2.5 -left-2.5 w-6 h-6 rounded-full bg-azure text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {step.step}
              </div>

              {/* Icon */}
              <div className="p-2.5 rounded-lg bg-azure/5 w-fit mb-3 group-hover:bg-azure/10 transition-colors">
                <StepIcon icon={step.icon} />
              </div>

              {/* Content */}
              <h4 className="text-sm font-bold text-foreground mb-1">
                {step.action}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed flex-1">
                {step.detail}
              </p>

              {/* Arrow connector (hidden on last item per row) */}
              {i < overview.steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-azure/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Objectives & What you learn */}
      <div className="p-6 sm:p-8 border-t border-green/10 bg-green/3">
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Objectives */}
          <div>
            <h3 className="text-sm font-bold text-azure uppercase tracking-wider mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Objetivos
            </h3>
            <div className="space-y-2">
              {overview.objectives.map((obj, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What you learn */}
          <div>
            <h3 className="text-sm font-bold text-green uppercase tracking-wider mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Lo que aprenderás
            </h3>
            <div className="space-y-2">
              {overview.whatYouLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
