"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Cloud,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { unitsData } from "@/data/units";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Curso", href: "/#curso" },
  { label: "Unidades", href: "/#unidades", hasDropdown: true },
  { label: "Laboratorios", href: "/#laboratorios" },

  { label: "Evaluación", href: "/#evaluacion" },
  { label: "Profesor", href: "/#profesor" },
  { label: "Recursos", href: "/#recursos" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeUnit, setActiveUnit] = useState<number | null>(null);
  const [mobileUnitsOpen, setMobileUnitsOpen] = useState(false);
  const [mobileActiveUnit, setMobileActiveUnit] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setActiveUnit(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Cloud className="w-6 h-6 text-azure group-hover:text-cyan transition-colors" />
            <span className="font-semibold text-sm text-foreground hidden sm:block">
              Cloud Computing
            </span>
            <span className="text-xs text-text-secondary hidden md:block">
              | FES Acatlán
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.href} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      if (!dropdownOpen) setActiveUnit(null);
                    }}
                    className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-all duration-200 ${
                      dropdownOpen
                        ? "text-foreground bg-grey-light"
                        : "text-text-secondary hover:text-foreground hover:bg-grey-light"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown mega menu */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] rounded-xl border border-border bg-white backdrop-blur-xl shadow-lg shadow-black/8 overflow-hidden">
                      <div className="flex">
                        {/* Units list */}
                        <div className="w-64 border-r border-border/50 py-2">
                          <div className="px-3 py-2 mb-1">
                            <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">
                              Unidades Temáticas
                            </span>
                          </div>
                          {unitsData.map((unit) => (
                            <button
                              key={unit.number}
                              onMouseEnter={() => setActiveUnit(unit.number)}
                              onClick={() => setActiveUnit(unit.number)}
                              className={`w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors ${
                                activeUnit === unit.number
                                  ? "bg-blue-light text-foreground"
                                  : "text-text-secondary hover:text-foreground hover:bg-grey-light"
                              }`}
                            >
                              <span className="text-[10px] font-mono font-bold text-azure bg-azure/10 px-1.5 py-0.5 rounded shrink-0">
                                {String(unit.number).padStart(2, "0")}
                              </span>
                              <span className="text-xs font-medium truncate">
                                {unit.shortTitle}
                              </span>
                              <ChevronRight className="w-3 h-3 ml-auto shrink-0 opacity-50" />
                            </button>
                          ))}
                        </div>

                        {/* Modules list */}
                        <div className="flex-1 py-2">
                          {activeUnit ? (
                            <>
                              <div className="px-4 py-2 mb-1 border-b border-border/30">
                                <span className="text-[10px] font-medium text-azure uppercase tracking-wider">
                                  Unidad {activeUnit} — Temas
                                </span>
                              </div>
                              <div className="p-2 space-y-0.5">
                                {unitsData
                                  .find((u) => u.number === activeUnit)
                                  ?.modules.map((mod) => (
                                    <Link
                                      key={mod.slug}
                                      href={`/unidades/${activeUnit}/${mod.slug}`}
                                      onClick={() => {
                                        setDropdownOpen(false);
                                        setActiveUnit(null);
                                      }}
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-foreground hover:bg-grey-light transition-colors"
                                    >
                                      <div className="w-1 h-1 rounded-full bg-azure/50 shrink-0" />
                                      {mod.title}
                                    </Link>
                                  ))}
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center justify-center h-full px-4">
                              <p className="text-xs text-text-secondary/60">
                                Selecciona una unidad para ver sus temas
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-grey-light rounded-md transition-all duration-200"
                >
                  {item.label}
                </Link>
              )
            )}
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-exam-modal"));
                }
              }}
              className="ml-2 px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs rounded-full shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Generar Examen</span>
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-text-secondary hover:text-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-border max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <div key={item.href}>
                  <button
                    onClick={() => setMobileUnitsOpen(!mobileUnitsOpen)}
                    className="flex items-center justify-between w-full px-3 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-grey-light rounded-md transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        mobileUnitsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileUnitsOpen && (
                    <div className="ml-3 mt-1 space-y-1 border-l border-border/50 pl-3">
                      {unitsData.map((unit) => (
                        <div key={unit.number}>
                          <button
                            onClick={() =>
                              setMobileActiveUnit(
                                mobileActiveUnit === unit.number ? null : unit.number
                              )
                            }
                            className="flex items-center gap-2 w-full px-2 py-1.5 text-xs text-text-secondary hover:text-foreground rounded transition-colors"
                          >
                            <span className="font-mono font-bold text-azure text-[10px]">
                              U{unit.number}
                            </span>
                            <span className="truncate">{unit.shortTitle}</span>
                            <ChevronRight
                              className={`w-3 h-3 ml-auto shrink-0 transition-transform ${
                                mobileActiveUnit === unit.number ? "rotate-90" : ""
                              }`}
                            />
                          </button>
                          {mobileActiveUnit === unit.number && (
                            <div className="ml-4 mt-1 space-y-0.5 border-l border-border/30 pl-2">
                              {unit.modules.map((mod) => (
                                <Link
                                  key={mod.slug}
                                  href={`/unidades/${unit.number}/${mod.slug}`}
                                  onClick={() => {
                                    setMobileOpen(false);
                                    setMobileUnitsOpen(false);
                                    setMobileActiveUnit(null);
                                  }}
                                  className="block px-2 py-1.5 text-[11px] text-text-secondary hover:text-foreground rounded transition-colors"
                                >
                                  {mod.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm text-text-secondary hover:text-foreground hover:bg-grey-light rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
