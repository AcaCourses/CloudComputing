import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Cloud,
  ArrowLeft,
  Clock,
  BookOpen,
  Lightbulb,
  Target,
  CheckCircle2,
  Table2,
  ListChecks,
  Sparkles,
} from "lucide-react";
import { unitsData } from "@/data/units";
import { getTopicContent, ContentSection } from "@/data/content";
import { getRelatedLabs } from "@/data/topicLabMap";
import Navbar from "@/app/components/Navbar";
import { RelatedLabBanner } from "@/app/components/RelatedLabBanner";
import { QuizBanner } from "@/app/components/QuizBanner";
import {
  TriggerQuestion,
  TabsSection,
  MatchingSection,
  ScenarioSection,
  QuizSection,
} from "@/app/components/InteractiveSections";
import { ResponsibilityStack } from "@/app/components/ResponsibilityStack";
import { ClassifyCases } from "@/app/components/ClassifyCases";
import { Timeline } from "@/app/components/Timeline";
import { DeploymentDecision } from "@/app/components/DeploymentDecision";
import { ProviderExplorer } from "@/app/components/ProviderExplorer";
import { CloudArchitecture } from "@/app/components/CloudArchitecture";
import { ProjectOrganizer } from "@/app/components/ProjectOrganizer";
import { BillingSimulator } from "@/app/components/BillingSimulator";
import { ConsoleMockup } from "@/app/components/ConsoleMockup";
import { AutomationTimeline } from "@/app/components/AutomationTimeline";
import { ComputeOptions } from "@/app/components/ComputeOptions";
import { VmBuilder } from "@/app/components/VmBuilder";
import { RegionZoneMap } from "@/app/components/RegionZoneMap";
import { ScalingSimulator } from "@/app/components/ScalingSimulator";
import { ScalingComparison } from "@/app/components/ScalingComparison";
import { ContainerVsVmVisual } from "@/app/components/ContainerVsVmVisual";
import { ServerlessExplainer } from "@/app/components/ServerlessExplainer";
import { ContainerBuilder } from "@/app/components/ContainerBuilder";
import { ServerlessFlow } from "@/app/components/ServerlessFlow";
import { EventMapper } from "@/app/components/EventMapper";
import { EventFunctionSimulator } from "@/app/components/EventFunctionSimulator";
import { AutomationBuilder } from "@/app/components/AutomationBuilder";
import { DeploymentFlow } from "@/app/components/DeploymentFlow";
import { StorageSelector } from "@/app/components/StorageSelector";
import { DataClassifier } from "@/app/components/DataClassifier";
import { StorageArchitecture } from "@/app/components/StorageArchitecture";
import { ObjectExplorer } from "@/app/components/ObjectExplorer";
import { RelationalMap } from "@/app/components/RelationalMap";
import { ManagedSqlExplorer } from "@/app/components/ManagedSqlExplorer";
import { GlobalDbExplainer } from "@/app/components/GlobalDbExplainer";
import { NoSqlExplorer } from "@/app/components/NoSqlExplorer";
import { LoadBalancerSimulator } from "@/app/components/LoadBalancerSimulator";
import { StarService } from "@/app/components/StarService";
import { UseCaseCards } from "@/app/components/UseCaseCards";
import { ApiVisualizer } from "@/app/components/ApiVisualizer";

type Params = {
  unit: string;
  topic: string;
};

export function generateStaticParams() {
  const params: Params[] = [];
  for (const unit of unitsData) {
    for (const mod of unit.modules) {
      params.push({ unit: String(unit.number), topic: mod.slug });
    }
  }
  return params;
}

function SectionRenderer({ section }: { section: ContentSection }) {
  switch (section.type) {
    case "trigger":
      return <TriggerQuestion section={section} />;

    case "concept":
      return (
        <div className="rounded-xl border border-azure/20 bg-azure/5 p-6">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5 text-azure" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-azure mb-2">{section.title}</h3>
              <p className="text-sm text-foreground leading-relaxed">{section.content}</p>
            </div>
          </div>
        </div>
      );

    case "text":
      return (
        <div>
          {section.title && (
            <h3 className="text-lg font-semibold text-foreground mb-3">{section.title}</h3>
          )}
          <p className="text-sm text-text-secondary leading-relaxed">{section.content}</p>
        </div>
      );

    case "example":
      return (
        <div className="rounded-xl border border-green/20 bg-green/5 p-6">
          <div className="flex items-start gap-3">
            <div className="shrink-0 mt-0.5">
              <Target className="w-5 h-5 text-green" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-green-dark mb-2">{section.title}</h3>
              <p className="text-sm text-foreground leading-relaxed">{section.content}</p>
            </div>
          </div>
        </div>
      );

    case "table":
      return (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Table2 className="w-4 h-4 text-text-secondary" />
            <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-panel border-b border-border">
                  {section.headers.map((h, i) => (
                    <th key={i} className="text-left px-4 py-3 font-semibold text-foreground">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-text-secondary">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "list":
      return (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ListChecks className="w-4 h-4 text-azure" />
            <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
          </div>
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <CheckCircle2 className="w-4 h-4 text-azure/60 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "interaction":
      return (
        <div className="rounded-xl border border-yellow/30 bg-yellow/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-orange" />
            <h3 className="text-sm font-semibold text-orange">{section.title}</h3>
          </div>
          <ul className="space-y-2">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="text-orange font-mono text-xs mt-0.5">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "tabs":
      return <TabsSection section={section} />;

    case "matching":
      return <MatchingSection section={section} />;

    case "scenario":
      return <ScenarioSection section={section} />;

    case "responsibilityStack":
      return <ResponsibilityStack title={section.title} description={section.description} />;

    case "classify":
      return <ClassifyCases title={section.title} description={section.description} cases={section.cases} />;

    case "timeline":
      return <Timeline title={section.title} events={section.events} />;

    case "deploymentDecision":
      return <DeploymentDecision />;

    case "providerExplorer":
      return <ProviderExplorer />;

    case "cloudArchitecture":
      return <CloudArchitecture />;

    case "projectOrganizer":
      return <ProjectOrganizer />;

    case "billingSimulator":
      return <BillingSimulator />;

    case "consoleMockup":
      return <ConsoleMockup />;

    case "automationTimeline":
      return <AutomationTimeline />;

    case "computeOptions":
      return <ComputeOptions />;

    case "vmBuilder":
      return <VmBuilder />;
    case "regionZoneMap":
      return <RegionZoneMap />;

    case "scalingSimulator":
      return <ScalingSimulator />;

    case "scalingComparison":
      return <ScalingComparison />;

    case "containerVsVmVisual":
      return <ContainerVsVmVisual />;

    case "containerBuilder":
      return <ContainerBuilder />;

    case "serverlessFlow":
      return <ServerlessFlow />;

    case "serverlessExplainer":
      return <ServerlessExplainer />;

    case "eventMapper":
      return <EventMapper />;

    case "eventFunctionSimulator":
      return <EventFunctionSimulator />;

    case "automationBuilder":
      return <AutomationBuilder />;

    case "deploymentFlow":
      return <DeploymentFlow />;

    case "storageSelector":
      return <StorageSelector />;

    case "dataClassifier":
      return <DataClassifier />;

    case "storageArchitecture":
      return <StorageArchitecture />;

    case "objectExplorer":
      return <ObjectExplorer />;

    case "relationalMap":
      return <RelationalMap />;

    case "managedSqlExplorer":
      return <ManagedSqlExplorer />;

    case "globalDbExplainer":
      return <GlobalDbExplainer />;

    case "noSqlExplorer":
      return <NoSqlExplorer />;

    case "loadBalancerSimulator":
      return <LoadBalancerSimulator />;

    case "apiVisualizer":
      return <ApiVisualizer />;

    case "starService":
      return <StarService serviceName={section.serviceName} icon={section.icon} description={section.description} features={section.features} commands={section.commands} />;

    case "useCaseCards":
      return <UseCaseCards serviceName={section.serviceName} cases={section.cases} />;

    case "quiz":
      return <QuizSection section={section} />;

    default:
      return null;
  }
}

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { unit, topic } = await params;
  const unitNumber = parseInt(unit, 10);
  const unitData = unitsData.find((u) => u.number === unitNumber);

  if (!unitData) notFound();

  const moduleData = unitData.modules.find((m) => m.slug === topic);

  if (!moduleData) notFound();

  const moduleIndex = unitData.modules.findIndex((m) => m.slug === topic);
  const topicContent = getTopicContent(unit, topic);
  const relatedLabs = getRelatedLabs(unit, topic);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-panel/30 via-background to-background" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120,160,210,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120,160,210,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-text-secondary mb-8">
            <Link href="/#unidades" className="hover:text-azure transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              Inicio
            </Link>
            <span>/</span>
            <span className="text-azure">Unidad {unitData.number}</span>
            <span>/</span>
            <span className="text-foreground">{moduleData.title}</span>
          </div>

          {/* Header card */}
          <div className="rounded-xl border border-border bg-panel/50 backdrop-blur-sm p-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono font-bold text-azure bg-azure/10 px-2 py-1 rounded-md">
                U{unitData.number}.{moduleIndex + 1}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-text-secondary px-2 py-0.5 rounded-full border border-border">
                {unitData.shortTitle}
              </span>
              {topicContent && (
                <span className="flex items-center gap-1 text-[10px] text-text-secondary ml-auto">
                  <Clock className="w-3 h-3" />
                  {topicContent.readingTime}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {moduleData.title}
            </h1>

            <p className="text-sm text-text-secondary mb-4">
              Unidad {unitData.number}: {unitData.title}
            </p>

            {/* Learning objectives */}
            {topicContent && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-[10px] uppercase tracking-wider text-text-secondary mb-2 font-medium">
                  Objetivos de aprendizaje
                </p>
                <ul className="space-y-1">
                  {topicContent.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-secondary">
                      <CheckCircle2 className="w-3 h-3 text-green shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Google Skills Boost course link */}
            {topicContent?.courseLink && topicContent?.courseTitle && (
              <div className="mt-3 pt-3 border-t border-border/30 flex items-center gap-2">
                <img src="/assets/logoCloud.png" alt="Google Cloud" className="w-4 h-4 shrink-0" />
                <a
                  href={topicContent.courseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-azure hover:underline transition-colors truncate"
                >
                  {topicContent.courseTitle}
                </a>
              </div>
            )}
          </div>

          {/* Related lab banner */}
          <RelatedLabBanner labs={relatedLabs} />

          {/* Quiz banner */}
          {topicContent?.quizLinks && topicContent.quizLinks.length > 0 && (
            <QuizBanner quizLinks={topicContent.quizLinks} />
          )}

          {/* Content sections */}
          {topicContent ? (
            <div className="space-y-6">
              {topicContent.sections.map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
            </div>
          ) : (
            /* Coming soon content */
            <div className="rounded-xl border border-azure/20 bg-azure/5 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-azure/10 border border-azure/20 mb-6">
                <Cloud className="w-8 h-8 text-azure" />
              </div>

              <h2 className="text-xl font-semibold text-foreground mb-3">
                Contenido próximamente
              </h2>

              <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
                El material de este tema está siendo desarrollado y estará disponible pronto.
                Consulta el calendario del curso para conocer la fecha estimada.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-panel/50">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-xs text-text-secondary">En desarrollo</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-panel/50">
                  <BookOpen className="w-4 h-4 text-cyan" />
                  <span className="text-xs text-text-secondary">Unidad {unitData.number}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation between topics */}
          <div className="mt-8 flex items-center justify-between">
            {moduleIndex > 0 ? (
              <Link
                href={`/unidades/${unitData.number}/${unitData.modules[moduleIndex - 1].slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs text-text-secondary hover:text-foreground hover:border-azure/30 transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                {unitData.modules[moduleIndex - 1].title}
              </Link>
            ) : (
              <div />
            )}
            {moduleIndex < unitData.modules.length - 1 ? (
              <Link
                href={`/unidades/${unitData.number}/${unitData.modules[moduleIndex + 1].slug}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs text-text-secondary hover:text-foreground hover:border-azure/30 transition-colors"
              >
                {unitData.modules[moduleIndex + 1].title}
                <ArrowLeft className="w-3 h-3 rotate-180" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
