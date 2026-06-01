import {
  Cloud,
  Network,
  Server,
  Database,
  Shield,
  Rocket,
  CheckCircle2,
} from "lucide-react";

const milestones = [
  {
    icon: Cloud,
    label: "Fundamentos Cloud",
    labs: "Labs 1-2",
    description: "Configuración de cuenta Azure y comprensión de modelos de servicio.",
    color: "text-azure",
    borderColor: "border-azure/30",
  },
  {
    icon: Network,
    label: "Networking",
    labs: "Labs 3-4",
    description: "Red virtual, subredes, DNS y CDN para el proyecto.",
    color: "text-cyan",
    borderColor: "border-cyan/30",
  },
  {
    icon: Server,
    label: "Cómputo & Storage",
    labs: "Labs 5-6",
    description: "Despliegue de aplicación con almacenamiento y base de datos.",
    color: "text-azure",
    borderColor: "border-azure/30",
  },
  {
    icon: Shield,
    label: "Seguridad & Monitoreo",
    labs: "Labs 7-8",
    description: "Políticas de acceso, cifrado y dashboards de monitoreo.",
    color: "text-success",
    borderColor: "border-success/30",
  },
  {
    icon: Rocket,
    label: "Integración Final",
    labs: "Proyecto",
    description: "Arquitectura completa desplegada, documentada y presentada.",
    color: "text-unam-gold",
    borderColor: "border-unam-gold/30",
  },
];

export default function FinalProject() {
  return (
    <section id="proyecto" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-panel/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-unam-gold" />
            <span className="text-xs font-medium text-unam-gold uppercase tracking-wider">
              Proyecto Integrador
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Proyecto Final
          </h2>
          <p className="mt-2 text-text-secondary max-w-2xl">
            Cada laboratorio aporta un componente al proyecto final. La construcción es progresiva
            y acumulativa: al final del semestre tendrás una arquitectura cloud completa.
          </p>
        </div>

        {/* Timeline / Roadmap */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-azure via-cyan to-unam-gold hidden sm:block" />

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.label}
                className="flex gap-4 sm:gap-6 items-start"
              >
                {/* Node */}
                <div className={`relative z-10 p-3 rounded-xl border ${milestone.borderColor} bg-panel shrink-0`}>
                  <milestone.icon className={`w-5 h-5 ${milestone.color}`} />
                </div>

                {/* Content card */}
                <div className="flex-1 p-4 rounded-xl border border-border bg-panel/50 hover:border-azure/20 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-foreground">
                      {milestone.label}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-text-secondary px-2 py-0.5 rounded-full border border-border bg-grey-light">
                      {milestone.labs}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    {milestone.description}
                  </p>

                  {/* Progress indicator */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-grey-light rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full opacity-30 ${
                          milestone.color === "text-azure"
                            ? "bg-azure"
                            : milestone.color === "text-cyan"
                            ? "bg-cyan"
                            : milestone.color === "text-success"
                            ? "bg-success"
                            : "bg-unam-gold"
                        }`}
                        style={{ width: "0%" }}
                      />
                    </div>
                    <span className="text-[10px] text-text-secondary">0%</span>
                  </div>
                </div>

                {/* Check */}
                <div className="hidden sm:block shrink-0 mt-3">
                  <CheckCircle2 className="w-4 h-4 text-border" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary box */}
        <div className="mt-12 p-5 rounded-xl border border-unam-gold/20 bg-unam-gold/5">
          <div className="flex items-start gap-3">
            <Database className="w-5 h-5 text-unam-gold shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                Entrega Final
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                El proyecto final consiste en una arquitectura cloud funcional desplegada en Azure,
                con documentación técnica, diagrama de arquitectura, análisis de costos y
                presentación en clase. Fecha límite: semana 16 del semestre.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
