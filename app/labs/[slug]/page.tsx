import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Lightbulb,
  MessageCircleQuestion,
  Users,
  ChevronRight,
  ListChecks,
  Eye,
  Brain,
  ExternalLink,
} from "lucide-react";
import { getLabContent } from "@/data/content/labs";
import Navbar from "@/app/components/Navbar";
import LabVisualSummary from "@/app/components/LabVisualSummary";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string; skillbadgeUrl?: string }>;
};

export default async function LabPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { from, skillbadgeUrl } = await searchParams;
  const lab = getLabContent(slug);

  if (!lab) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/#laboratorios"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-azure transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Laboratorios
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-xs font-mono font-bold text-azure bg-azure/10 px-2 py-1 rounded-md">
                Lab {lab.labNumber}
              </span>
              {/* Google Skills Boost badge */}
              <a
                href={lab.labUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-0 px-2 py-1 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: "linear-gradient(white, white) padding-box, linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853) border-box", border: "0.5px solid transparent", borderRadius: "9999px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/GCPLogo.png"
                  alt="Google Cloud"
                  className="h-4 object-contain"
                />
                <span className="text-[11px] text-gray-600 group-hover:text-gray-900" style={{ fontFamily: "'Google Sans', 'Product Sans', sans-serif" }}>
                  Google Skills Lab
                </span>
              </a>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {lab.title}
            </h1>
            <p className="text-text-secondary text-lg">{lab.description}</p>
            {lab.labUrl && (
              <a
                href={lab.labUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-azure text-white rounded-lg text-sm font-medium hover:bg-azure/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir laboratorio en Google Cloud Skills Boost
              </a>
            )}
            {from === "skillbadge" && skillbadgeUrl && (
              <a
                href={decodeURIComponent(skillbadgeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 ml-2 px-4 py-2 bg-success text-white rounded-lg text-sm font-medium hover:bg-success/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Ver en Skill Badge
              </a>
            )}
          </header>

          {/* Visual Overview */}
          {lab.overview && <LabVisualSummary overview={lab.overview} />}

          {/* Introduction */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-azure" />
              <h2 className="text-xl font-bold text-foreground">
                Introducción
              </h2>
            </div>
            <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed space-y-4">
              {lab.introduction.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Prerequisite Concepts */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-orange" />
              <h2 className="text-xl font-bold text-foreground">
                Conceptos previos necesarios
              </h2>
            </div>
            <div className="grid gap-3">
              {lab.concepts.map((concept, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 rounded-xl border border-border bg-panel/50"
                >
                  <span className="text-xs font-mono font-bold text-orange bg-orange/10 px-2 py-1 rounded-md h-fit shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-foreground text-sm">
                      {concept.term}:
                    </span>{" "}
                    <span className="text-text-secondary text-sm">
                      {concept.definition}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interaction Pattern */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <ChevronRight className="w-5 h-5 text-cyan" />
              <h2 className="text-xl font-bold text-foreground">
                Patrón de interacción por tarea
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {lab.interactionPattern.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 p-3 rounded-lg border border-border bg-panel/30"
                >
                  <span className="text-cyan font-bold text-sm mt-0.5">
                    {i + 1}.
                  </span>
                  <span className="text-sm text-text-secondary">{step}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Participation Rules */}
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-green" />
              <h2 className="text-xl font-bold text-foreground">
                Dinámica de participación
              </h2>
            </div>
            <div className="p-4 rounded-xl border border-green/20 bg-green/5">
              <ul className="space-y-2">
                {lab.participationRules.map((rule, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-text-secondary"
                  >
                    <ListChecks className="w-4 h-4 text-green shrink-0 mt-0.5" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Tasks */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <MessageCircleQuestion className="w-5 h-5 text-azure" />
              <h2 className="text-xl font-bold text-foreground">
                Tareas del laboratorio
              </h2>
            </div>

            <div className="space-y-8">
              {lab.tasks.map((task, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-panel/50 overflow-hidden"
                >
                  {/* Task header */}
                  <div className="px-6 py-4 bg-azure/5 border-b border-border">
                    <h3 className="text-lg font-bold text-foreground">
                      {task.title}
                    </h3>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Concept note */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-orange/5 border border-orange/15">
                      <Lightbulb className="w-4 h-4 text-orange shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-orange uppercase tracking-wide">
                          Concepto clave
                        </span>
                        <p className="text-sm text-text-secondary mt-1">
                          {task.conceptNote}
                        </p>
                      </div>
                    </div>

                    {/* Guiding question */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan/5 border border-cyan/15">
                      <MessageCircleQuestion className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-cyan uppercase tracking-wide">
                          Pregunta guía
                        </span>
                        <p className="text-sm text-text-secondary mt-1">
                          {task.guidingQuestion}
                        </p>
                      </div>
                    </div>

                    {/* Observation */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-light/30 border border-blue/10">
                      <Eye className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-blue uppercase tracking-wide">
                          Observa esto
                        </span>
                        <p className="text-sm text-text-secondary mt-1">
                          {task.observation}
                        </p>
                      </div>
                    </div>

                    {/* Reflection */}
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-green/5 border border-green/15">
                      <Brain className="w-4 h-4 text-green shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-green uppercase tracking-wide">
                          ¿Qué acabas de configurar?
                        </span>
                        <p className="text-sm text-text-secondary mt-1">
                          {task.reflection}
                        </p>
                      </div>
                    </div>

                    {/* Participation questions */}
                    <div className="border-t border-border pt-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-azure" />
                        <span className="text-xs font-semibold text-azure uppercase tracking-wide">
                          Preguntas de participación (2 personas por pregunta)
                        </span>
                      </div>
                      <div className="space-y-2">
                        {task.participationQuestions.map((q, qi) => (
                          <div
                            key={qi}
                            className="flex items-start gap-2 p-3 rounded-lg bg-azure/5 border border-azure/10"
                          >
                            <span className="text-xs font-mono font-bold text-azure mt-0.5">
                              P{qi + 1}
                            </span>
                            <span className="text-sm text-text-secondary">
                              {q}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
