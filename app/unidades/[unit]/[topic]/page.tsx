import Link from "next/link";
import { notFound } from "next/navigation";
import { Cloud, ArrowLeft, Clock, BookOpen } from "lucide-react";
import { unitsData } from "@/data/units";
import Navbar from "@/app/components/Navbar";

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

export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { unit, topic } = await params;
  const unitNumber = parseInt(unit, 10);
  const unitData = unitsData.find((u) => u.number === unitNumber);

  if (!unitData) notFound();

  const moduleData = unitData.modules.find((m) => m.slug === topic);

  if (!moduleData) notFound();

  const moduleIndex = unitData.modules.findIndex((m) => m.slug === topic);

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
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {moduleData.title}
            </h1>

            <p className="text-sm text-text-secondary">
              Unidad {unitData.number}: {unitData.title}
            </p>
          </div>

          {/* Coming soon content */}
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
