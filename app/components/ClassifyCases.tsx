"use client";

import { useState } from "react";
import { Check, X, RotateCcw } from "lucide-react";

type ClassifyCase = {
  text: string;
  answer: string;
  explanation: string;
};

export function ClassifyCases({
  title,
  description,
  cases,
}: {
  title: string;
  description: string;
  cases: ClassifyCase[];
}) {
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const options = ["IaaS", "PaaS", "SaaS"];

  const handleSelect = (caseIndex: number, option: string) => {
    if (revealed[caseIndex]) return;
    setAnswers((prev) => ({ ...prev, [caseIndex]: option }));
  };

  const handleReveal = (caseIndex: number) => {
    setRevealed((prev) => ({ ...prev, [caseIndex]: true }));
  };

  const handleReset = () => {
    setAnswers({});
    setRevealed({});
  };

  const allRevealed = Object.keys(revealed).length === cases.length;
  const correctCount = cases.filter(
    (c, i) => revealed[i] && answers[i] === c.answer
  ).length;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-xs text-text-secondary">{description}</p>
        </div>
        {Object.keys(revealed).length > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] text-text-secondary hover:text-foreground border border-border hover:border-azure/30 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reiniciar
          </button>
        )}
      </div>

      <div className="space-y-3">
        {cases.map((c, i) => {
          const isRevealed = revealed[i];
          const isCorrect = answers[i] === c.answer;

          return (
            <div
              key={i}
              className={`rounded-lg border p-4 transition-all duration-300 ${
                isRevealed
                  ? isCorrect
                    ? "border-green/40 bg-green/5"
                    : "border-red/40 bg-red/5"
                  : "border-border bg-white"
              }`}
            >
              <p className="text-sm text-foreground mb-3">{c.text}</p>

              {/* Options */}
              <div className="flex gap-2 mb-2">
                {options.map((opt) => {
                  let btnClass = "border-border text-text-secondary hover:border-azure/40 hover:text-foreground";
                  if (answers[i] === opt && !isRevealed) {
                    btnClass = "border-azure bg-azure/10 text-azure";
                  }
                  if (isRevealed && opt === c.answer) {
                    btnClass = "border-green bg-green/10 text-green-dark";
                  }
                  if (isRevealed && answers[i] === opt && opt !== c.answer) {
                    btnClass = "border-red bg-red/10 text-red-dark line-through";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(i, opt)}
                      disabled={isRevealed}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${btnClass} disabled:cursor-default`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Verify button */}
              {answers[i] && !isRevealed && (
                <button
                  onClick={() => handleReveal(i)}
                  className="text-[11px] text-azure font-medium hover:text-azure-dark transition-colors"
                >
                  Verificar →
                </button>
              )}

              {/* Feedback */}
              {isRevealed && (
                <div className={`flex items-start gap-2 mt-2 pt-2 border-t ${isCorrect ? "border-green/20" : "border-red/20"}`}>
                  {isCorrect ? (
                    <Check className="w-4 h-4 text-green shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-4 h-4 text-red shrink-0 mt-0.5" />
                  )}
                  <p className="text-xs text-text-secondary">{c.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Score */}
      {allRevealed && (
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-border/50">
          <span className="text-xs font-medium text-foreground">
            Resultado: {correctCount}/{cases.length} correctas
          </span>
          {correctCount === cases.length && (
            <span className="text-xs text-green-dark font-semibold">¡Perfecto!</span>
          )}
        </div>
      )}
    </div>
  );
}
