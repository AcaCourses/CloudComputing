"use client";

import { useState } from "react";
import { MessageCircle, Lightbulb, ArrowRight, Check, RotateCcw } from "lucide-react";
import type { ContentSection } from "@/data/content";

export function TriggerQuestion({ section }: { section: Extract<ContentSection, { type: "trigger" }> }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-azure/30 bg-azure/5 p-6">
      <div className="flex items-start gap-3">
        <MessageCircle className="w-5 h-5 text-azure shrink-0 mt-0.5" />
        <div>
          <p className="text-[10px] uppercase tracking-wider text-azure font-semibold mb-1">Pregunta detonadora</p>
          <p className="text-base font-medium text-foreground italic">&ldquo;{section.question}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}

export function TabsSection({ section }: { section: Extract<ContentSection, { type: "tabs" }> }) {
  const [active, setActive] = useState(section.tabs[0].id);
  const activeTab = section.tabs.find((t) => t.id === active)!;

  return (
    <div className="rounded-xl border border-border bg-panel/30 overflow-hidden">
      <div className="px-4 pt-4 pb-0">
        <h3 className="text-sm font-semibold text-foreground mb-3">{section.title}</h3>
        <div className="flex gap-1 border-b border-border">
          {section.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-3 py-2 text-xs font-medium rounded-t-lg transition-all duration-200 ${
                active === tab.id
                  ? "bg-white border border-border border-b-white text-foreground -mb-px"
                  : "text-text-secondary hover:text-foreground hover:bg-grey-light"
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                  active === tab.id ? "bg-azure/10 text-azure" : "bg-grey-light text-text-secondary"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5 bg-white transition-all duration-300">
        <p className="text-sm text-text-secondary leading-relaxed">{activeTab.content}</p>
      </div>
    </div>
  );
}

export function MatchingSection({ section }: { section: Extract<ContentSection, { type: "matching" }> }) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleReveal = (concept: string) => {
    setRevealed((prev) => ({ ...prev, [concept]: !prev[concept] }));
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5">
      <h3 className="text-sm font-semibold text-foreground mb-1">{section.title}</h3>
      <p className="text-xs text-text-secondary mb-4">{section.description}</p>
      <div className="space-y-3">
        {section.pairs.map((pair) => (
          <div key={pair.concept} className="rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => toggleReveal(pair.concept)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-grey-light transition-colors"
            >
              <span className="text-sm font-medium text-foreground">{pair.concept}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full transition-all ${
                revealed[pair.concept]
                  ? "bg-green/10 text-green-dark"
                  : "bg-azure/10 text-azure"
              }`}>
                {revealed[pair.concept] ? "Ocultar" : "Revelar"}
              </span>
            </button>
            {revealed[pair.concept] && (
              <div className="px-4 py-3 border-t border-border/50 bg-azure/5 space-y-1">
                {pair.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                    <ArrowRight className="w-3 h-3 text-azure shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScenarioSection({ section }: { section: Extract<ContentSection, { type: "scenario" }> }) {
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});

  return (
    <div className="rounded-xl border border-yellow/30 bg-yellow/5 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-orange" />
        <h3 className="text-sm font-semibold text-orange">{section.title}</h3>
      </div>
      <div className="space-y-4">
        {section.scenarios.map((sc, i) => (
          <div key={i} className="rounded-lg border border-border/50 bg-white p-4">
            <p className="text-sm text-foreground mb-2">{sc.situation}</p>
            <p className="text-sm font-medium text-foreground mb-2">→ {sc.question}</p>
            {sc.hint && (
              <button
                onClick={() => setShowHint((prev) => ({ ...prev, [i]: !prev[i] }))}
                className="text-[11px] text-azure hover:text-azure-dark transition-colors flex items-center gap-1"
              >
                <Lightbulb className="w-3 h-3" />
                {showHint[i] ? "Ocultar pista" : "Ver pista"}
              </button>
            )}
            {showHint[i] && sc.hint && (
              <p className="mt-2 text-xs text-text-secondary italic border-l-2 border-azure/30 pl-2">
                {sc.hint}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuizSection({ section }: { section: Extract<ContentSection, { type: "quiz" }> }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const correctIndex = section.options.findIndex((o) => o.correct);

  const handleSelect = (i: number) => {
    if (submitted) return;
    setSelected(i);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(null);
    setSubmitted(false);
  };

  return (
    <div className="rounded-xl border border-border bg-panel/50 p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="w-5 h-5 text-cyan" />
        <h3 className="text-sm font-semibold text-cyan">Autoevaluación</h3>
      </div>
      <p className="text-sm text-foreground font-medium mb-3">{section.question}</p>
      <div className="space-y-2 mb-4">
        {section.options.map((opt, i) => {
          let borderClass = "border-border";
          let bgClass = "";
          if (submitted && i === correctIndex) {
            borderClass = "border-green";
            bgClass = "bg-green/5";
          } else if (submitted && i === selected && i !== correctIndex) {
            borderClass = "border-red";
            bgClass = "bg-red/5";
          } else if (!submitted && i === selected) {
            borderClass = "border-azure";
            bgClass = "bg-azure/5";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border ${borderClass} ${bgClass} text-sm text-text-secondary hover:border-azure/30 transition-all text-left`}
            >
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono shrink-0 ${
                submitted && i === correctIndex ? "border-green bg-green text-white" :
                submitted && i === selected && i !== correctIndex ? "border-red bg-red text-white" :
                !submitted && i === selected ? "border-azure bg-azure text-white" :
                "border-border"
              }`}>
                {submitted && i === correctIndex ? <Check className="w-3 h-3" /> : String.fromCharCode(65 + i)}
              </span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
      <div className="flex gap-2">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="px-4 py-2 rounded-lg bg-azure text-white text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-azure-dark transition-colors"
          >
            Verificar respuesta
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-xs text-text-secondary hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Intentar de nuevo
          </button>
        )}
      </div>
      {submitted && (
        <div className="mt-3">
          <p className={`text-xs font-medium ${selected === correctIndex ? "text-green-dark" : "text-red-dark"}`}>
            {selected === correctIndex ? "¡Correcto!" : `Incorrecto. La respuesta correcta es: ${section.options[correctIndex].label}`}
          </p>
          {selected !== null && section.options[selected]?.explanation && (
            <p className="text-xs text-text-secondary mt-1 border-l-2 border-azure/30 pl-2">
              {section.options[selected].explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
