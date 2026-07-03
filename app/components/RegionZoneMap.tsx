"use client";

import { useState } from "react";
import {
  Globe,
  MapPin,
  Server,
  Database,
  AppWindow,
  ChevronDown,
  ChevronRight,
  GitBranch,
} from "lucide-react";

type Zone = {
  id: string;
  label: string;
  resourceIcon?: "server" | "database" | "app";
};

type Region = {
  id: string;
  name: string;
  location: string;
  zones: Zone[];
};

const regions: Region[] = [
  {
    id: "us-central1",
    name: "us-central1",
    location: "Iowa, EE.UU.",
    zones: [
      { id: "a", label: "us-central1-a", resourceIcon: "server" },
      { id: "b", label: "us-central1-b", resourceIcon: "database" },
      { id: "c", label: "us-central1-c", resourceIcon: "app" },
      { id: "f", label: "us-central1-f" },
    ],
  },
  {
    id: "europe-west1",
    name: "europe-west1",
    location: "Bélgica",
    zones: [
      { id: "b", label: "europe-west1-b", resourceIcon: "server" },
      { id: "c", label: "europe-west1-c", resourceIcon: "app" },
      { id: "d", label: "europe-west1-d" },
    ],
  },
  {
    id: "southamerica-east1",
    name: "southamerica-east1",
    location: "São Paulo, Brasil",
    zones: [
      { id: "a", label: "southamerica-east1-a", resourceIcon: "database" },
      { id: "b", label: "southamerica-east1-b", resourceIcon: "server" },
      { id: "c", label: "southamerica-east1-c" },
    ],
  },
  {
    id: "asia-east1",
    name: "asia-east1",
    location: "Taiwán",
    zones: [
      { id: "a", label: "asia-east1-a", resourceIcon: "app" },
      { id: "b", label: "asia-east1-b" },
      { id: "c", label: "asia-east1-c", resourceIcon: "server" },
    ],
  },
];

function ResourceIcon({ type }: { type?: "server" | "database" | "app" }) {
  if (!type) return null;
  const icons = {
    server: <Server className="w-3 h-3 text-text-secondary/60" />,
    database: <Database className="w-3 h-3 text-text-secondary/60" />,
    app: <AppWindow className="w-3 h-3 text-text-secondary/60" />,
  };
  return icons[type];
}

export function RegionZoneMap() {
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"cards" | "tree">("cards");

  const toggleRegion = (id: string) => {
    setExpandedRegions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const hoveredRegion = hoveredZone
    ? regions.find((r) => r.zones.some((z) => z.label === hoveredZone))?.id
    : null;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Mapa jerárquico de regiones y zonas
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Haz clic en una región para ver sus zonas. Una región agrupa varias zonas aisladas.
          </p>
        </div>
        <div className="flex items-center bg-grey-light rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => setViewMode("cards")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "cards"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Tarjetas
          </button>
          <button
            onClick={() => setViewMode("tree")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "tree"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Jerarquía
          </button>
        </div>
      </div>

      {/* Key messages */}
      <div className="flex flex-wrap gap-3 text-[10px] text-text-secondary">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-azure" />
          Región = área geográfica amplia
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-sm bg-green/60" />
          Zona = subdivisión aislada dentro
        </span>
        <span className="flex items-center gap-1">
          <Server className="w-3 h-3 text-text-secondary/50" />
          Los recursos viven en zonas
        </span>
      </div>

      {/* Cards view */}
      {viewMode === "cards" && (
        <div className="grid sm:grid-cols-2 gap-3">
          {regions.map((region) => {
            const isExpanded = expandedRegions.has(region.id);
            const isHighlighted = hoveredRegion === region.id;

            return (
              <div
                key={region.id}
                className={`rounded-lg border transition-all duration-200 ${
                  isExpanded
                    ? "border-azure/40 bg-azure/5"
                    : isHighlighted
                    ? "border-azure/30 bg-azure/3"
                    : "border-border bg-white hover:border-azure/20"
                }`}
              >
                {/* Region header */}
                <button
                  onClick={() => toggleRegion(region.id)}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-left"
                >
                  <MapPin
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isExpanded ? "text-azure" : "text-text-secondary"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-foreground">
                        {region.name}
                      </span>
                      <span className="text-[10px] text-text-secondary">
                        {region.location}
                      </span>
                    </div>
                    <span className="text-[10px] text-text-secondary">
                      {region.zones.length} zonas disponibles
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-azure shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-text-secondary shrink-0" />
                  )}
                </button>

                {/* Zones (expanded) */}
                {isExpanded && (
                  <div className="px-4 pb-3 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                    <p className="text-[10px] text-azure font-medium mb-2">
                      Esta región agrupa {region.zones.length} zonas aisladas:
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {region.zones.map((zone) => (
                        <div
                          key={zone.label}
                          onMouseEnter={() => setHoveredZone(zone.label)}
                          onMouseLeave={() => setHoveredZone(null)}
                          className={`relative flex items-center gap-1.5 px-2.5 py-2 rounded-md border transition-all ${
                            hoveredZone === zone.label
                              ? "border-green/50 bg-green/10"
                              : "border-border/60 bg-white"
                          }`}
                        >
                          <div className="w-2 h-2 rounded-sm bg-green/60 shrink-0" />
                          <span className="text-[10px] font-mono text-foreground truncate">
                            {zone.label.split("-").pop()}
                          </span>
                          {zone.resourceIcon && (
                            <div className="ml-auto">
                              <ResourceIcon type={zone.resourceIcon} />
                            </div>
                          )}

                          {/* Tooltip on hover */}
                          {hoveredZone === zone.label && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground text-white text-[9px] whitespace-nowrap z-20 shadow-lg">
                              Pertenece a {region.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tree/Hierarchy view */}
      {viewMode === "tree" && (
        <div className="rounded-lg border border-border bg-white p-4">
          {/* Root */}
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-azure" />
            <span className="text-xs font-bold text-foreground">Google Cloud</span>
          </div>

          {/* Regions */}
          <div className="ml-4 border-l-2 border-azure/20 space-y-3 pl-4">
            {regions.map((region) => (
              <div key={region.id}>
                <div className="flex items-center gap-2 relative">
                  <div className="absolute -left-[18px] top-1/2 -translate-y-1/2 w-3 h-px bg-azure/30" />
                  <GitBranch className="w-3.5 h-3.5 text-azure" />
                  <span className="text-[11px] font-bold font-mono text-foreground">
                    {region.name}
                  </span>
                  <span className="text-[9px] text-text-secondary">
                    ({region.location})
                  </span>
                </div>

                {/* Zones */}
                <div className="ml-5 border-l-2 border-green/20 pl-3 mt-1.5 space-y-1">
                  {region.zones.map((zone) => (
                    <div
                      key={zone.label}
                      className="flex items-center gap-1.5 relative"
                      onMouseEnter={() => setHoveredZone(zone.label)}
                      onMouseLeave={() => setHoveredZone(null)}
                    >
                      <div className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-2.5 h-px bg-green/30" />
                      <div
                        className={`w-2 h-2 rounded-sm transition-colors ${
                          hoveredZone === zone.label ? "bg-green" : "bg-green/50"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-mono transition-colors ${
                          hoveredZone === zone.label
                            ? "text-foreground font-medium"
                            : "text-text-secondary"
                        }`}
                      >
                        {zone.label}
                      </span>
                      {zone.resourceIcon && (
                        <ResourceIcon type={zone.resourceIcon} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer explanation */}
      <div className="rounded-lg bg-amber-50 border border-amber-200/60 px-4 py-3">
        <p className="text-[11px] text-amber-900 leading-relaxed">
          <span className="font-semibold">Idea clave:</span> una región no es un solo punto — está
          formada por varias zonas aisladas. Si una zona tiene un problema, las demás siguen
          funcionando. Piensa en la región como una ciudad y las zonas como barrios independientes.
        </p>
      </div>
    </div>
  );
}
