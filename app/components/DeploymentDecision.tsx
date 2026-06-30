"use client";

import { useState } from "react";
import { Building2, Rocket, Landmark, Check, ArrowRight } from "lucide-react";

type Scenario = {
  id: string;
  icon: "hospital" | "startup" | "bank" | "university";
  label: string;
  description: string;
  correctModel: "publica" | "privada" | "hibrida";
  factors: { security: number; cost: number; scalability: number; regulation: number };
  explanation: string;
};

const scenarios: Scenario[] = [
  {
    id: "hospital",
    icon: "hospital",
    label: "Hospital",
    description: "Maneja historiales clínicos electrónicos regulados por ley. Necesita acceso 24/7 y protección máxima de datos de pacientes.",
    correctModel: "privada",
    factors: { security: 5, cost: 2, scalability: 2, regulation: 5 },
    explanation: "Un hospital necesita nube privada porque las regulaciones de datos médicos exigen control estricto sobre dónde se almacenan y quién accede. La seguridad y el cumplimiento normativo pesan más que la escalabilidad o el ahorro.",
  },
  {
    id: "startup",
    icon: "startup",
    label: "Startup",
    description: "Lanza una app móvil y espera crecer de 100 a 100,000 usuarios en 6 meses. Presupuesto limitado, equipo técnico pequeño.",
    correctModel: "publica",
    factors: { security: 2, cost: 5, scalability: 5, regulation: 1 },
    explanation: "Una startup necesita nube pública porque requiere escalar rápido sin inversión inicial. El pago por uso y la elasticidad inmediata son críticos cuando el crecimiento es impredecible y el capital es limitado.",
  },
  {
    id: "bank",
    icon: "bank",
    label: "Banco",
    description: "Procesa transacciones financieras sensibles pero quiere usar IA en la nube para detectar fraudes en tiempo real.",
    correctModel: "hibrida",
    factors: { security: 5, cost: 3, scalability: 4, regulation: 5 },
    explanation: "Un banco necesita nube híbrida: datos financieros y transacciones en infraestructura privada (por regulación), pero servicios de IA y analítica en nube pública (por escalabilidad y acceso a herramientas avanzadas).",
  },
  {
    id: "university",
    icon: "university",
    label: "Universidad",
    description: "Quiere migrar su plataforma educativa. Tiene datos académicos de miles de alumnos y picos de demanda en inscripciones.",
    correctModel: "hibrida",
    factors: { security: 3, cost: 4, scalability: 4, regulation: 3 },
    explanation: "Una universidad se beneficia de nube híbrida: datos académicos sensibles en privado (cumplimiento FERPA/LFPDPPP) y la plataforma web en pública para escalar durante inscripciones sin invertir en hardware que se usaría pocas semanas al año.",
  },
];

const models = [
  { id: "publica" as const, label: "Nube pública", badge: "Compartida", color: "azure" },
  { id: "privada" as const, label: "Nube privada", badge: "Exclusiva", color: "orange" },
  { id: "hibrida" as const, label: "Nube híbrida", badge: "Combinada", color: "green" },
];

const factorLabels: Record<string, string> = {
  security: "Seguridad",
  cost: "Ahorro",
  scalability: "Escalabilidad",
  regulation: "Regulación",
};

function getIcon(icon: string) {
  switch (icon) {
    case "hospital": return <Building2 className="w-5 h-5" />;
    case "startup": return <Rocket className="w-5 h-5" />;
    case "bank": return <Landmark className="w-5 h-5" />;
    case "university": return <Building2 className="w-5 h-5" />;
    default: return <Building2 className="w-5 h-5" />;
  }
}

export function DeploymentDecision() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const scenario = scenarios.find((s) => s.id === activeScenario);
  const isCorrect = selectedModel === scenario?.correctModel;

  const handleReset = () => {
    setSelectedModel(null);
    setRevealed(false);
  };

  const handleScenarioChange = (id: string) => {
    setActiveScenario(id);
    setSelectedModel(null);
    setRevealed(false);
  };

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Elige el modelo según el escenario
        </h3>
        <p className="text-xs text-text-secondary">
          Selecciona una organización, analiza sus necesidades y decide qué modelo de despliegue le conviene más.
        </p>
      </div>

      {/* Scenario selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {scenarios.map((sc) => (
          <button
            key={sc.id}
            onClick={() => handleScenarioChange(sc.id)}
            className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-lg border transition-all duration-300 ${
              activeScenario === sc.id
                ? "border-azure bg-azure/5 text-azure shadow-sm"
                : "border-border bg-white text-text-secondary hover:border-azure/40 hover:text-foreground"
            }`}
          >
            {getIcon(sc.icon)}
            <span className="text-[11px] font-medium">{sc.label}</span>
          </button>
        ))}
      </div>

      {/* Scenario detail */}
      {scenario && (
        <div className="space-y-4 transition-all duration-300">
          {/* Description */}
          <div className="rounded-lg border border-border bg-white p-4">
            <p className="text-sm text-foreground">{scenario.description}</p>

            {/* Factor bars */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(Object.entries(scenario.factors) as [string, number][]).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-[10px] text-text-secondary w-20 shrink-0">{factorLabels[key]}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-grey-light overflow-hidden">
                    <div
                      className="h-full rounded-full bg-azure/60 transition-all duration-500"
                      style={{ width: `${value * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model selection */}
          <div>
            <p className="text-xs font-medium text-foreground mb-2">
              <ArrowRight className="w-3 h-3 inline mr-1" />
              ¿Qué modelo le conviene a esta organización?
            </p>
            <div className="flex gap-2">
              {models.map((m) => {
                let btnClass = "border-border text-text-secondary hover:border-azure/40";
                if (selectedModel === m.id && !revealed) {
                  btnClass = "border-azure bg-azure/10 text-azure";
                }
                if (revealed && m.id === scenario.correctModel) {
                  btnClass = "border-green bg-green/10 text-green-dark";
                }
                if (revealed && selectedModel === m.id && m.id !== scenario.correctModel) {
                  btnClass = "border-red bg-red/10 text-red-dark";
                }

                return (
                  <button
                    key={m.id}
                    onClick={() => { if (!revealed) setSelectedModel(m.id); }}
                    disabled={revealed}
                    className={`flex-1 px-3 py-2.5 rounded-lg border text-xs font-semibold transition-all duration-300 disabled:cursor-default ${btnClass}`}
                  >
                    <span className="block">{m.label}</span>
                    <span className="block text-[10px] font-normal opacity-70">{m.badge}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verify button */}
          {selectedModel && !revealed && (
            <button
              onClick={() => setRevealed(true)}
              className="px-4 py-2 rounded-lg bg-azure text-white text-xs font-medium hover:bg-azure-dark transition-colors"
            >
              Verificar elección
            </button>
          )}

          {/* Feedback */}
          {revealed && (
            <div className={`rounded-lg border p-4 transition-all duration-300 ${
              isCorrect ? "border-green/40 bg-green/5" : "border-red/40 bg-red/5"
            }`}>
              <div className="flex items-start gap-2">
                <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isCorrect ? "text-green" : "text-red"}`} />
                <div>
                  <p className={`text-xs font-semibold mb-1 ${isCorrect ? "text-green-dark" : "text-red-dark"}`}>
                    {isCorrect ? "¡Correcto!" : `La respuesta más adecuada es: ${models.find(m => m.id === scenario.correctModel)?.label}`}
                  </p>
                  <p className="text-xs text-text-secondary leading-relaxed">{scenario.explanation}</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="mt-3 text-[11px] text-azure hover:text-azure-dark font-medium transition-colors"
              >
                Intentar con otro escenario →
              </button>
            </div>
          )}
        </div>
      )}

      {!scenario && (
        <div className="text-center py-6">
          <p className="text-xs text-text-secondary/60">↑ Selecciona un escenario para comenzar</p>
        </div>
      )}
    </div>
  );
}
