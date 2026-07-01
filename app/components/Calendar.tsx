"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, CalendarDays } from "lucide-react";
import { schedule, unitColors } from "@/data/schedule";
import { useInView } from "../hooks/useInView";

type GroupFilter = "all" | "A" | "B";

type CalEvent = {
  id: string;
  title: string;
  date: string;
  type: "lab" | "class" | "project" | "info";
  group?: "A" | "B";
  unit: number;
};

function buildEvents(): CalEvent[] {
  const events: CalEvent[] = [];
  for (const entry of schedule) {
    // Parse group A dates
    const aDates = parseDates(entry.groupA.dates, entry.dateRange);
    for (const d of aDates) {
      events.push({
        id: `A-class-${entry.week}-${d}`,
        title: entry.topic,
        date: d,
        type: "class",
        group: "A",
        unit: entry.unit,
      });
    }
    // Parse group B dates
    const bDates = parseDates(entry.groupB.dates, entry.dateRange);
    for (const d of bDates) {
      events.push({
        id: `B-class-${entry.week}-${d}`,
        title: entry.topic,
        date: d,
        type: "class",
        group: "B",
        unit: entry.unit,
      });
    }
    // Lab events
    if (entry.lab && entry.labDue) {
      const labDate = parseSingleDate(entry.labDue, entry.dateRange);
      if (labDate) {
        const labs = Array.isArray(entry.lab) ? entry.lab : [entry.lab];
        for (let i = 0; i < labs.length; i++) {
          events.push({
            id: `lab-A-${entry.week}-${i}`,
            title: labs[i],
            date: labDate,
            type: entry.type === "project" ? "project" : "lab",
            group: "A",
            unit: entry.unit,
          });
          events.push({
            id: `lab-B-${entry.week}-${i}`,
            title: labs[i],
            date: labDate,
            type: entry.type === "project" ? "project" : "lab",
            group: "B",
            unit: entry.unit,
          });
        }
      }
    }
  }
  return events;
}

const MONTHS_SHORT: Record<string, number> = {
  Ene: 0, Feb: 1, Mar: 2, Abr: 3, May: 4, Jun: 5,
  Jul: 6, Ago: 7, Sep: 8, Oct: 9, Nov: 10, Dic: 11,
};

function parseDates(datesStr: string, rangeHint: string): string[] {
  // e.g. "5, 7 Ago" or "30 Sep, 2 Oct"
  const results: string[] = [];
  const parts = datesStr.split(",").map((s) => s.trim());

  for (const part of parts) {
    const tokens = part.split(/\s+/);
    if (tokens.length >= 2) {
      const day = parseInt(tokens[0]);
      const monthStr = tokens[1];
      const monthIdx = MONTHS_SHORT[monthStr];
      if (!isNaN(day) && monthIdx !== undefined) {
        results.push(
          `2026-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        );
      }
    } else if (tokens.length === 1) {
      // Just a number, get month from the last token of another part or range
      const day = parseInt(tokens[0]);
      const monthMatch = datesStr.match(/([A-Z][a-z]{2})/g);
      if (!isNaN(day) && monthMatch) {
        const monthStr = monthMatch[0];
        const monthIdx = MONTHS_SHORT[monthStr];
        if (monthIdx !== undefined) {
          results.push(
            `2026-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
          );
        }
      }
    }
  }
  return results;
}

function parseSingleDate(dateStr: string, _rangeHint: string): string | null {
  // e.g. "22 Ago"
  const tokens = dateStr.trim().split(/\s+/);
  if (tokens.length >= 2) {
    const day = parseInt(tokens[0]);
    const monthStr = tokens[1];
    const monthIdx = MONTHS_SHORT[monthStr];
    if (!isNaN(day) && monthIdx !== undefined) {
      return `2026-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
  }
  return null;
}

const allEvents = buildEvents();

const typeColors: Record<string, string> = {
  class: "bg-blue-light/60 text-blue-dark border-blue/20",
  lab: "bg-green-light/60 text-green-dark border-green/20",
  project: "bg-yellow-light/60 text-orange border-orange/20",
  info: "bg-grey-light text-text-secondary border-border",
};

const typeDots: Record<string, string> = {
  class: "bg-blue",
  lab: "bg-green",
  project: "bg-orange",
  info: "bg-grey",
};

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export default function Calendar() {
  const [groupFilter, setGroupFilter] = useState<GroupFilter>("all");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // Agosto 2026
  const headerAnim = useInView();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return allEvents.filter((e) => {
      if (e.date !== dateStr) return false;
      if (groupFilter === "all") return true;
      return e.group === groupFilter;
    });
  };

  const monthEvents = allEvents
    .filter((e) => {
      const d = new Date(e.date);
      if (d.getFullYear() !== year || d.getMonth() !== month) return false;
      if (groupFilter === "all") return true;
      return e.group === groupFilter;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  // Unique events for sidebar (avoid duplicates for same lab)
  const sidebarEvents = monthEvents.reduce<CalEvent[]>((acc, ev) => {
    if (ev.type === "class") return acc; // skip class events in sidebar
    const exists = acc.find((e) => e.title === ev.title && e.date === ev.date);
    if (!exists) acc.push(ev);
    return acc;
  }, []);

  return (
    <section id="calendario" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-panel/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerAnim.ref}
          className={`mb-8 transition-all duration-700 ${
            headerAnim.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-orange" />
            <span className="text-xs font-medium text-orange uppercase tracking-wider">
              Agenda
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Calendario del Semestre
          </h2>
          <p className="mt-2 text-text-secondary max-w-2xl">
            Agosto – Noviembre 2026 · 16 semanas · 2 sesiones por semana.
          </p>
        </div>

        {/* Group filter */}
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-4 h-4 text-text-secondary" />
          <span className="text-xs text-text-secondary font-medium">Grupo:</span>
          {(["all", "A", "B"] as GroupFilter[]).map((g) => (
            <button
              key={g}
              onClick={() => setGroupFilter(g)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                groupFilter === g
                  ? "bg-blue text-white shadow-sm"
                  : "bg-grey-light text-text-secondary hover:bg-blue-light/50 hover:text-blue-dark"
              }`}
            >
              {g === "all" ? "Ambos" : `Grupo ${g}`}
            </button>
          ))}
          <div className="ml-auto hidden sm:flex items-center gap-4 text-[10px] text-text-secondary">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              Grupo A: Mar/Jue
            </span>
            <span className="flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              Grupo B: Mié/Vie
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar grid */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-white p-5 shadow-sm">
            {/* Month navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-2 hover:bg-grey-light rounded-lg transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-text-secondary" />
              </button>
              <h3 className="text-sm font-semibold text-foreground">
                {monthNames[month]} {year}
              </h3>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-grey-light rounded-lg transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-text-secondary" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((d) => (
                <div key={d} className="text-center text-[10px] text-text-secondary py-1 uppercase tracking-wider">
                  {d}
                </div>
              ))}
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = getEventsForDay(day);
                const hasLab = dayEvents.some((e) => e.type === "lab" || e.type === "project");
                const hasClass = dayEvents.some((e) => e.type === "class");
                return (
                  <div
                    key={day}
                    className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs relative transition-all duration-200 ${
                      hasLab
                        ? "bg-green-light/40 border border-green/20"
                        : hasClass
                        ? "bg-blue-light/30 border border-blue/10"
                        : "hover:bg-grey-light/60"
                    }`}
                  >
                    <span className={dayEvents.length > 0 ? "text-foreground font-medium" : "text-text-secondary"}>
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayEvents.slice(0, 3).map((ev) => (
                          <div
                            key={ev.id}
                            className={`w-1.5 h-1.5 rounded-full ${typeDots[ev.type]}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-border/50">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue" />
                <span className="text-[10px] text-text-secondary">Clase</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green" />
                <span className="text-[10px] text-text-secondary">Entrega Lab</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-orange" />
                <span className="text-[10px] text-text-secondary">Proyecto</span>
              </div>
            </div>
          </div>

          {/* Upcoming events sidebar */}
          <div className="rounded-xl border border-border bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
              Entregas del Mes
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {sidebarEvents.length === 0 && (
                <p className="text-xs text-text-secondary">Sin entregas este mes.</p>
              )}
              {sidebarEvents.map((ev) => {
                const colors = unitColors[ev.unit];
                return (
                  <div
                    key={ev.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${typeColors[ev.type]}`}
                  >
                    <div className="text-center shrink-0">
                      <div className="text-lg font-bold leading-none">
                        {new Date(ev.date).getDate()}
                      </div>
                      <div className="text-[10px] uppercase mt-0.5">
                        {monthNames[new Date(ev.date).getMonth()]?.slice(0, 3)}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{ev.title}</p>
                      <span className={`inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                        Unidad {ev.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
