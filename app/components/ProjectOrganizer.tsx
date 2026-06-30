"use client";

import { useState } from "react";
import {
  FolderTree,
  Server,
  HardDrive,
  Database,
  Globe,
  ShieldCheck,
  Tag,
  ChevronDown,
  ChevronRight,
  Building2,
  Folder,
  FolderOpen,
  Box,
} from "lucide-react";

type Resource = {
  name: string;
  type: string;
  icon: React.ElementType;
  labels: Record<string, string>;
};

type Project = {
  id: string;
  name: string;
  color: string;
  borderColor: string;
  bgColor: string;
  resources: Resource[];
};

type FolderNode = {
  id: string;
  name: string;
  projects: Project[];
};

const folders: FolderNode[] = [
  {
    id: "docencia",
    name: "Carpeta: Docencia",
    projects: [
      {
        id: "lab-cloud",
        name: "Proyecto: Laboratorio de Cloud",
        color: "text-azure",
        borderColor: "border-azure/30",
        bgColor: "bg-azure/5",
        resources: [
          { name: "lab-vm-01", type: "Compute Engine", icon: Server, labels: { environment: "dev", course: "cloud", team: "equipo-a" } },
          { name: "archivos-clase", type: "Cloud Storage", icon: HardDrive, labels: { environment: "dev", course: "cloud" } },
          { name: "clase-db", type: "Cloud SQL", icon: Database, labels: { environment: "dev", course: "cloud", team: "equipo-a" } },
        ],
      },
      {
        id: "portal",
        name: "Proyecto: Portal Académico",
        color: "text-green",
        borderColor: "border-green/30",
        bgColor: "bg-green/5",
        resources: [
          { name: "portal-web", type: "Compute Engine", icon: Server, labels: { environment: "prod", course: "cloud", team: "frontend" } },
          { name: "portal-api", type: "Cloud Functions", icon: Globe, labels: { environment: "prod", course: "cloud", team: "backend" } },
          { name: "portal-assets", type: "Cloud Storage", icon: HardDrive, labels: { environment: "prod" } },
          { name: "portal-db", type: "Cloud SQL", icon: Database, labels: { environment: "prod", team: "backend" } },
        ],
      },
    ],
  },
  {
    id: "investigacion",
    name: "Carpeta: Investigación",
    projects: [
      {
        id: "tesis-ia",
        name: "Proyecto: Tesis de Analítica",
        color: "text-orange",
        borderColor: "border-orange/30",
        bgColor: "bg-orange/5",
        resources: [
          { name: "ml-training", type: "Compute Engine (GPU)", icon: Server, labels: { environment: "research", owner: "alumno01" } },
          { name: "datasets", type: "Cloud Storage", icon: HardDrive, labels: { environment: "research", owner: "alumno01" } },
          { name: "results-db", type: "Firestore", icon: Database, labels: { environment: "research", owner: "alumno01" } },
        ],
      },
    ],
  },
];

const allLabels = ["environment", "course", "team", "owner"] as const;

export function ProjectOrganizer() {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    docencia: true,
  });
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    "lab-cloud": true,
  });
  const [filterLabel, setFilterLabel] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | null>(null);

  const toggleFolder = (id: string) => {
    setExpandedFolders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allResources = folders.flatMap((f) => f.projects.flatMap((p) => p.resources));

  const labelValues = filterLabel
    ? [...new Set(allResources.map((r) => r.labels[filterLabel]).filter(Boolean))]
    : [];

  const isResourceVisible = (r: Resource) => {
    if (!filterLabel || !filterValue) return true;
    return r.labels[filterLabel] === filterValue;
  };

  const visibleCount = (project: Project) =>
    project.resources.filter(isResourceVisible).length;

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderTree className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Organizador de proyectos y recursos
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Explora la jerarquía de Google Cloud: Organización → Carpetas → Proyectos → Recursos. Usa los filtros de labels para clasificar transversalmente.
          </p>
        </div>
      </div>

      {/* Label filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        <Tag className="w-3.5 h-3.5 text-text-secondary" />
        <span className="text-[10px] text-text-secondary font-medium">Filtrar por label:</span>
        {allLabels.map((label) => (
          <button
            key={label}
            onClick={() => {
              if (filterLabel === label) {
                setFilterLabel(null);
                setFilterValue(null);
              } else {
                setFilterLabel(label);
                setFilterValue(null);
              }
            }}
            className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all border ${
              filterLabel === label
                ? "border-azure/40 bg-azure/10 text-azure"
                : "border-border text-text-secondary hover:border-azure/20 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
        {filterLabel && (
          <button
            onClick={() => {
              setFilterLabel(null);
              setFilterValue(null);
            }}
            className="text-[10px] text-text-secondary hover:text-foreground underline ml-1"
          >
            Limpiar
          </button>
        )}
      </div>

      {/* Label values */}
      {filterLabel && labelValues.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pl-5">
          <span className="text-[10px] text-text-secondary">{filterLabel} =</span>
          {labelValues.map((val) => (
            <button
              key={val}
              onClick={() => setFilterValue(filterValue === val ? null : val)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all border ${
                filterValue === val
                  ? "border-azure/50 bg-azure/15 text-azure"
                  : "border-border text-text-secondary hover:border-azure/20"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      )}

      {/* Organization hierarchy */}
      <div className="rounded-lg border border-border p-3 space-y-1">
        {/* Organization root */}
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-3.5 h-3.5 text-azure" />
          <span className="text-[10px] font-semibold text-azure uppercase tracking-wider">
            Organization: universidad.edu
          </span>
        </div>

        {/* Folders */}
        {folders.map((folder) => {
          const folderExpanded = expandedFolders[folder.id];
          return (
            <div key={folder.id} className="ml-4">
              <button
                onClick={() => toggleFolder(folder.id)}
                className={`flex items-center gap-2 w-full text-left px-2.5 py-2 rounded-lg border transition-all ${
                  folderExpanded
                    ? "border-cyan/30 bg-cyan/5"
                    : "border-transparent hover:bg-panel/60"
                }`}
              >
                {folderExpanded ? (
                  <FolderOpen className="w-3.5 h-3.5 text-cyan" />
                ) : (
                  <Folder className="w-3.5 h-3.5 text-text-secondary" />
                )}
                <span className={`text-xs font-semibold ${folderExpanded ? "text-cyan" : "text-foreground"}`}>
                  {folder.name}
                </span>
              </button>

              {folderExpanded && (
                <div className="ml-4 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                  {/* Projects */}
                  {folder.projects.map((project) => {
                    const projExpanded = expandedProjects[project.id];
                    const count = visibleCount(project);
                    return (
                      <div key={project.id}>
                        <button
                          onClick={() => toggleProject(project.id)}
                          className={`flex items-center gap-2 w-full text-left px-2.5 py-2 rounded-lg border transition-all ${
                            projExpanded
                              ? `${project.borderColor} ${project.bgColor}`
                              : "border-transparent hover:bg-panel/60"
                          }`}
                        >
                          {projExpanded ? (
                            <ChevronDown className={`w-3 h-3 ${project.color}`} />
                          ) : (
                            <ChevronRight className="w-3 h-3 text-text-secondary" />
                          )}
                          <Box className={`w-3 h-3 ${projExpanded ? project.color : "text-text-secondary"}`} />
                          <span className={`text-xs font-semibold ${projExpanded ? project.color : "text-foreground"}`}>
                            {project.name}
                          </span>
                          <span className="text-[10px] text-text-secondary ml-auto">
                            {count} recurso{count !== 1 ? "s" : ""}
                            {filterValue && count !== project.resources.length && (
                              <span className="text-azure"> (filtrado)</span>
                            )}
                          </span>
                        </button>

                        {projExpanded && (
                          <div className="ml-7 mt-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                            {project.resources.map((resource, i) => {
                              const Icon = resource.icon;
                              const visible = isResourceVisible(resource);
                              return (
                                <div
                                  key={i}
                                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs transition-all duration-200 ${
                                    visible ? "" : "opacity-20"
                                  }`}
                                >
                                  <Icon className={`w-3 h-3 ${project.color} shrink-0`} />
                                  <span className="font-mono text-foreground">{resource.name}</span>
                                  <span className="text-[10px] text-text-secondary">({resource.type})</span>
                                  {filterLabel && resource.labels[filterLabel] && (
                                    <span
                                      className={`ml-auto text-[9px] px-1.5 py-0.5 rounded font-medium ${
                                        visible
                                          ? "bg-azure/10 text-azure border border-azure/20"
                                          : "bg-grey-light text-text-secondary"
                                      }`}
                                    >
                                      {filterLabel}={resource.labels[filterLabel]}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-text-secondary italic text-center">
        💡 Prueba filtrar por &quot;environment&quot; → &quot;research&quot; para ver cómo las labels agrupan recursos sin importar la carpeta o el proyecto.
      </p>
    </div>
  );
}
