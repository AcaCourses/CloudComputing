"use client";

import { useState } from "react";
import {
  Rocket,
  Code2,
  Server,
  Container,
  Globe,
  ArrowRight,
  CheckCircle2,
  Play,
  RotateCcw,
  Cloud,
  Layers,
  Monitor,
} from "lucide-react";

type ViewMode = "concept" | "gcp" | "aws";

type DeployTarget = {
  id: string;
  label: string;
  gcpName: string;
  awsName: string;
  icon: React.ReactNode;
  description: string;
  command: string;
  awsCommand: string;
  bestFor: string;
};

export function DeploymentFlow() {
  const [viewMode, setViewMode] = useState<ViewMode>("concept");
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [deployStep, setDeployStep] = useState(0); // 0:idle 1:build 2:push 3:deploy 4:live
  const [isDeploying, setIsDeploying] = useState(false);

  const targets: DeployTarget[] = [
    {
      id: "cloudrun",
      label: "Contenedor serverless",
      gcpName: "Cloud Run",
      awsName: "App Runner / ECS Fargate",
      icon: <Container className="w-4 h-4" />,
      description: "Desplegar contenedor con escalado automático y escala a cero. Sin gestionar servidores.",
      command: "gcloud run deploy my-api --image gcr.io/project/app --region us-central1",
      awsCommand: "aws apprunner create-service --source-configuration ...",
      bestFor: "APIs, microservicios, apps en contenedor",
    },
    {
      id: "gke",
      label: "Clúster de Kubernetes",
      gcpName: "GKE",
      awsName: "EKS",
      icon: <Layers className="w-4 h-4" />,
      description: "Desplegar en un clúster orquestado con control sobre pods, réplicas y networking.",
      command: "kubectl apply -f deployment.yaml",
      awsCommand: "kubectl apply -f deployment.yaml (en EKS)",
      bestFor: "Microservicios complejos, apps multi-componente",
    },
    {
      id: "appengine",
      label: "Plataforma administrada",
      gcpName: "App Engine",
      awsName: "Elastic Beanstalk",
      icon: <Cloud className="w-4 h-4" />,
      description: "Subir código directamente. La plataforma configura runtime, escalado y SSL.",
      command: "gcloud app deploy",
      awsCommand: "eb deploy",
      bestFor: "Apps web, prototipos, código sin contenedor",
    },
  ];

  const activeTarget = targets.find((t) => t.id === selectedTarget);

  const startDeploy = () => {
    if (!selectedTarget) return;
    setIsDeploying(true);
    setDeployStep(0);
    setTimeout(() => setDeployStep(1), 400);
    setTimeout(() => setDeployStep(2), 1200);
    setTimeout(() => setDeployStep(3), 2000);
    setTimeout(() => setDeployStep(4), 2800);
    setTimeout(() => setIsDeploying(false), 3200);
  };

  const reset = () => {
    setSelectedTarget(null);
    setDeployStep(0);
    setIsDeploying(false);
  };

  const steps = [
    { label: "App preparada", subLabel: "Código + config listos", icon: <Code2 className="w-4 h-4" /> },
    { label: "Build", subLabel: selectedTarget === "appengine" ? "Empaquetando código" : "Construyendo imagen", icon: <Container className="w-4 h-4" /> },
    { label: "Push", subLabel: selectedTarget === "appengine" ? "Subiendo a plataforma" : "Subiendo al registry", icon: <Server className="w-4 h-4" /> },
    { label: "Deploy", subLabel: `Desplegando en ${activeTarget ? (viewMode === "aws" ? activeTarget.awsName : activeTarget.gcpName) : "destino"}`, icon: <Rocket className="w-4 h-4" /> },
    { label: "Live", subLabel: "Servicio disponible", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="rounded-xl border border-border bg-panel/30 p-5 space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Rocket className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">
              Línea de despliegue
            </h3>
          </div>
          <p className="text-xs text-text-secondary">
            Elige un destino y observa el flujo desde código local hasta servicio disponible.
          </p>
        </div>
        <div className="flex items-center bg-grey-light rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => setViewMode("concept")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "concept"
                ? "bg-white text-foreground shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            Concepto
          </button>
          <button
            onClick={() => setViewMode("gcp")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "gcp"
                ? "bg-white text-azure shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            GCP
          </button>
          <button
            onClick={() => setViewMode("aws")}
            className={`px-2.5 py-1.5 rounded-md text-[10px] font-semibold transition-all ${
              viewMode === "aws"
                ? "bg-white text-orange shadow-sm"
                : "text-text-secondary hover:text-foreground"
            }`}
          >
            AWS
          </button>
        </div>
      </div>

      {/* Target selector */}
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
          ¿Dónde desplegar?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {targets.map((t) => (
            <button
              key={t.id}
              onClick={() => { setSelectedTarget(t.id); setDeployStep(0); }}
              className={`flex items-start gap-2.5 px-3 py-3 rounded-lg text-left border transition-all ${
                selectedTarget === t.id
                  ? "bg-azure/10 border-azure/30"
                  : "border-border hover:border-azure/20"
              }`}
            >
              <div className={`mt-0.5 ${selectedTarget === t.id ? "text-azure" : "text-text-secondary"}`}>
                {t.icon}
              </div>
              <div>
                <p className={`text-xs font-semibold ${selectedTarget === t.id ? "text-azure" : "text-foreground"}`}>
                  {viewMode === "aws" ? t.awsName : viewMode === "gcp" ? t.gcpName : t.label}
                </p>
                <p className="text-[9px] text-text-secondary mt-0.5">{t.bestFor}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Deploy pipeline */}
      {activeTarget && (
        <div className="rounded-lg border border-border bg-gray-900 p-4 space-y-4">
          {/* Steps */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-1 shrink-0">
                <div className={`flex flex-col items-center gap-1 px-2.5 py-2 rounded-lg border transition-all duration-500 min-w-[80px] ${
                  deployStep >= i
                    ? i === 4 && deployStep >= 4
                      ? "bg-green/20 border-green/40 text-green"
                      : "bg-azure/20 border-azure/40 text-azure"
                    : "border-gray-700 text-gray-600"
                }`}>
                  {s.icon}
                  <p className="text-[9px] font-semibold">{s.label}</p>
                  <p className="text-[7px] opacity-70 text-center">{s.subLabel}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className={`w-3 h-3 shrink-0 transition-all ${
                    deployStep > i ? "text-azure" : "text-gray-700"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Command */}
          {deployStep >= 3 && (
            <div className="rounded-md bg-gray-800 px-3 py-2">
              <p className="text-[9px] text-gray-400 mb-1">Comando:</p>
              <code className={`text-[10px] font-mono ${viewMode === "aws" ? "text-orange" : "text-cyan"}`}>
                {viewMode === "aws" ? activeTarget.awsCommand : activeTarget.command}
              </code>
            </div>
          )}

          {/* Result */}
          {deployStep >= 4 && (
            <div className="flex items-center gap-2 rounded-md bg-green/10 border border-green/30 px-3 py-2">
              <CheckCircle2 className="w-4 h-4 text-green" />
              <div>
                <p className="text-[10px] text-green font-medium">Servicio desplegado y disponible</p>
                <p className="text-[9px] text-gray-400">
                  {viewMode === "gcp"
                    ? `https://my-api-xxxxx.run.app (${activeTarget.gcpName})`
                    : viewMode === "aws"
                    ? `https://my-api.us-east-1.awsapprunner.com (${activeTarget.awsName})`
                    : "Accesible por URL pública o interna"}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={startDeploy}
          disabled={!selectedTarget || isDeploying}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            selectedTarget && !isDeploying
              ? "bg-azure/10 text-azure border border-azure/30 hover:bg-azure/20"
              : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
          }`}
        >
          <Play className="w-3 h-3" />
          Desplegar
        </button>
        <button
          onClick={reset}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs text-text-secondary border border-border hover:border-azure/20 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Before / After */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <Monitor className="w-3.5 h-3.5 text-text-secondary" />
            <p className="text-[10px] font-semibold text-foreground">Antes del despliegue</p>
          </div>
          <ul className="space-y-1 text-[10px] text-text-secondary">
            <li className="flex items-center gap-1.5">
              <Code2 className="w-3 h-3 text-gray-400" />
              Código en tu máquina local
            </li>
            <li className="flex items-center gap-1.5">
              <Code2 className="w-3 h-3 text-gray-400" />
              Solo tú puedes ejecutarlo
            </li>
            <li className="flex items-center gap-1.5">
              <Code2 className="w-3 h-3 text-gray-400" />
              No accesible por internet
            </li>
          </ul>
        </div>
        <div className="rounded-lg border border-green/20 bg-green/5 p-3 space-y-2">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-green" />
            <p className="text-[10px] font-semibold text-foreground">Después del despliegue</p>
          </div>
          <ul className="space-y-1 text-[10px] text-text-secondary">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-green" />
              Servicio en infraestructura cloud
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-green" />
              Accesible por otros usuarios/servicios
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-green" />
              Escalable, monitoreable, versionado
            </li>
          </ul>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-lg border border-border bg-panel/50 p-2.5 text-[10px] text-text-secondary">
        {viewMode === "concept" ? (
          <p>
            <span className="font-medium text-foreground">Desplegar =</span> llevar tu servicio desde tu entorno local hasta una infraestructura cloud donde puede ejecutarse, recibir tráfico y ser administrado. No es solo &ldquo;subir archivos&rdquo; — implica destino, configuración y disponibilidad.
          </p>
        ) : viewMode === "gcp" ? (
          <p>
            <span className="font-medium text-foreground">En GCP:</span> Cloud Run (<code className="text-cyan font-mono">gcloud run deploy</code>), GKE (<code className="text-cyan font-mono">kubectl apply</code>), App Engine (<code className="text-cyan font-mono">gcloud app deploy</code>). Cloud Build para CI/CD. Cloud Deploy para entregas administradas.
          </p>
        ) : (
          <p>
            <span className="font-medium text-foreground">En AWS:</span> App Runner, ECS Fargate (<code className="text-orange font-mono">aws ecs create-service</code>), EKS (<code className="text-orange font-mono">kubectl apply</code>), Elastic Beanstalk (<code className="text-orange font-mono">eb deploy</code>). CodeDeploy para entregas administradas.
          </p>
        )}
      </div>
    </div>
  );
}
