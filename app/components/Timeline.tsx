"use client";

import { useState } from "react";

type TimelineEvent = {
  year: string;
  title: string;
  description: string;
};

export function Timeline({ title, events }: { title: string; events: TimelineEvent[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5">
      <h3 className="text-sm font-semibold text-foreground mb-5">{title}</h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-azure/60 via-cyan/40 to-green/60" />

        <div className="space-y-1">
          {events.map((event, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={i}
                onClick={() => setActiveIndex(isActive ? null : i)}
                className={`relative flex items-start gap-4 pl-2 pr-3 py-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  isActive ? "bg-azure/5 border border-azure/20" : "hover:bg-grey-light border border-transparent"
                }`}
              >
                {/* Dot */}
                <div className="relative z-10 shrink-0 mt-0.5">
                  <div
                    className={`w-[11px] h-[11px] rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? "border-azure bg-azure scale-125"
                        : "border-azure/50 bg-white hover:border-azure"
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded transition-colors duration-300 ${
                      isActive ? "bg-azure text-white" : "bg-azure/10 text-azure"
                    }`}>
                      {event.year}
                    </span>
                    <span className={`text-xs font-semibold transition-colors duration-300 ${
                      isActive ? "text-foreground" : "text-text-secondary"
                    }`}>
                      {event.title}
                    </span>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isActive ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-[10px] text-text-secondary mt-3 text-center italic">
        Haz clic en cada hito para ver más detalles
      </p>
    </div>
  );
}
