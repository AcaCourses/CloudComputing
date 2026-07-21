import { ClipboardCheck } from "lucide-react";
import { QuizLink } from "@/data/content";

export function QuizBanner({ quizLinks }: { quizLinks: QuizLink[] }) {
  if (quizLinks.length === 0) return null;

  return (
    <div className="mb-6 rounded-xl border border-orange/30 bg-gradient-to-r from-orange/5 to-yellow/5 p-4">
      <div className="flex items-start gap-3">
        <div className="shrink-0 p-2 rounded-lg bg-orange/10">
          <ClipboardCheck className="w-5 h-5 text-orange" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            Quiz disponible
          </p>
          <p className="text-xs text-text-secondary mt-0.5 mb-2">
            Al terminar esta clase, completa el quiz en Google Skills Boost para validar tu comprensión.
          </p>
          <div className="flex flex-wrap gap-2">
            {quizLinks.map((quiz, i) => (
              <a
                key={i}
                href={quiz.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-orange hover:text-orange/80 bg-white border border-orange/25 px-3 py-1.5 rounded-lg hover:shadow-sm transition-all"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                {quiz.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
