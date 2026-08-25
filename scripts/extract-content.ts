/**
 * scripts/extract-content.ts
 *
 * Extrae el contenido de las unidades del curso (data/content/unit1.ts ... unit7.ts)
 * y genera dos archivos JSON:
 *
 *  1. knowledge-chunks.json   -> para embeddings / búsqueda semántica / RAG
 *  2. style-examples.json     -> quizzes y escenarios reales, para usarlos
 *                                 como few-shot al generar exámenes nuevos
 *
 * Uso desde d:\dr871\Projects\CloudComputing:
 *   npx tsx scripts/extract-content.ts
 */

import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

// ─────────────────────────────────────────────────────────────
// 1. IMPORTA TUS UNIDADES Y CONTENIDOS Y LABS
// ─────────────────────────────────────────────────────────────
import { unit1Content } from "../data/content/unit1";
import { unit2Content } from "../data/content/unit2";
import { unit3Content } from "../data/content/unit3";
import { unit4Content } from "../data/content/unit4";
import { unit5Content } from "../data/content/unit5";
import { unit6Content } from "../data/content/unit6";
import { unit7Content } from "../data/content/unit7";
import { labsContent, LabContent } from "../data/content/labs";

const allUnits: { unidad: number; topics: TopicContent[] }[] = [
  { unidad: 1, topics: unit1Content },
  { unidad: 2, topics: unit2Content },
  { unidad: 3, topics: unit3Content },
  { unidad: 4, topics: unit4Content },
  { unidad: 5, topics: unit5Content },
  { unidad: 6, topics: unit6Content },
  { unidad: 7, topics: unit7Content },
];

// ─────────────────────────────────────────────────────────────
// 2. TIPOS
// ─────────────────────────────────────────────────────────────
type Section = { type: string; [key: string]: any };

type TopicContent = {
  slug: string;
  title: string;
  courseLink?: string;
  courseTitle?: string;
  readingTime?: string;
  objectives?: string[];
  sections: Section[];
};

type KnowledgeChunk = {
  id: string;
  type: "lesson" | "lab";
  unidad?: number;
  labNumber?: number;
  slug: string;
  title: string;
  text: string;
  url: string;
};

type StyleExample = {
  id: string;
  source: "lesson" | "lab";
  unidad?: number;
  labNumber?: number;
  slug: string;
  topicTitle: string;
  tipo: "quiz" | "scenario" | "matching" | "classify" | "labTask";
  data: any;
};

const BASE_URL = "";
const buildUrl = (slug: string, isLab: boolean = false) =>
  isLab ? `${BASE_URL}/#lab-${slug}` : `${BASE_URL}/#${slug}`;

// ─────────────────────────────────────────────────────────────
// 3. EXTRACCIÓN DE TEXTO POR TIPO DE SECCIÓN DE LECCIONES
// ─────────────────────────────────────────────────────────────
function sectionToText(section: Section): string | null {
  switch (section.type) {
    case "trigger":
      return `Pregunta disparadora: ${section.question}`;

    case "concept":
      return `${section.title ?? "Concepto clave"}: ${section.content}`;

    case "text":
      return `${section.title ? section.title + ": " : ""}${section.content}`.trim();

    case "example":
      return `Ejemplo - ${section.title ?? ""}: ${section.content}`.trim();

    case "list": {
      const itemsText = section.items?.map((item: string) => `- ${item}`).join("\n") ?? "";
      return `${section.title ?? "Lista"}:\n${itemsText}`;
    }

    case "table": {
      const header = section.headers?.join(" | ") ?? "";
      const rows =
        section.rows?.map((r: string[]) => r.join(" | ")).join("\n") ?? "";
      return `Tabla "${section.title ?? ""}":\n${header}\n${rows}`;
    }

    case "tabs": {
      const tabsText =
        section.tabs
          ?.map((t: any) => `${t.label}: ${t.content}`)
          .join("\n") ?? "";
      return `${section.title ?? "Comparación"}:\n${tabsText}`;
    }

    case "scenario": {
      const scenariosText =
        section.scenarios
          ?.map(
            (s: any) =>
              `Situación: ${s.situation} Pregunta: ${s.question}${s.hint ? ` (Pista: ${s.hint})` : ""}`
          )
          .join("\n") ?? "";
      return `${section.title ?? "Escenarios"}:\n${scenariosText}`;
    }

    case "matching": {
      const pairsText =
        section.pairs
          ?.map((p: any) => `${p.concept} -> ${p.items?.join(", ")}`)
          .join("\n") ?? "";
      return `${section.title ?? "Relación de conceptos"}:\n${pairsText}`;
    }

    case "quiz":
      return `Pregunta: ${section.question}\n${section.options
        ?.map(
          (o: any) =>
            `- ${o.label} (${o.correct ? "correcta" : "incorrecta"})${o.explanation ? `: ${o.explanation}` : ""}`
        )
        .join("\n")}`;

    case "classify": {
      const casesText =
        section.cases
          ?.map(
            (c: any) =>
              `Caso: ${c.text} -> Clasificación: ${c.answer}. Explicación: ${c.explanation}`
          )
          .join("\n") ?? "";
      return `${section.title ?? "Clasificación"}:\n${casesText}`;
    }

    case "timeline": {
      const eventsText =
        section.events
          ?.map((e: any) => `${e.year} - ${e.title}: ${e.description}`)
          .join("\n") ?? "";
      return `${section.title ?? "Línea de tiempo"}:\n${eventsText}`;
    }

    case "starService": {
      const features = section.features?.map((f: string) => `- ${f}`).join("\n") ?? "";
      return `Servicio GCP Destacado: ${section.serviceName}\nDescripción: ${section.description}\nCaracterísticas:\n${features}`;
    }

    case "useCaseCards": {
      const casesText =
        section.cases
          ?.map((c: any) => `- ${c.title} (Temas: ${c.subjects?.join(", ")}): ${c.explanation}`)
          .join("\n") ?? "";
      return `${section.serviceName ? `Casos de uso para ${section.serviceName}` : "Casos de Uso"}:\n${casesText}`;
    }

    case "responsibilityStack":
      return section.title && section.description ? `${section.title}: ${section.description}` : null;

    // Componentes interactivos/visuales
    case "cloudArchitecture":
    case "projectOrganizer":
    case "deploymentDecision":
    case "providerExplorer":
    case "billingSimulator":
    case "consoleMockup":
    case "automationTimeline":
    case "computeOptions":
    case "vmBuilder":
    case "regionZoneMap":
    case "scalingSimulator":
    case "scalingComparison":
    case "containerVsVmVisual":
    case "serverlessExplainer":
    case "containerBuilder":
    case "serverlessFlow":
    case "eventMapper":
    case "eventFunctionSimulator":
    case "automationBuilder":
    case "deploymentFlow":
    case "storageSelector":
    case "dataClassifier":
    case "storageArchitecture":
    case "objectExplorer":
    case "relationalMap":
    case "managedSqlExplorer":
    case "globalDbExplainer":
    case "noSqlExplorer":
    case "loadBalancerSimulator":
    case "apiVisualizer":
    case "interaction":
      return null;

    default:
      console.warn(`[extract] Tipo de sección no manejado: "${section.type}"`);
      return null;
  }
}

// ─────────────────────────────────────────────────────────────
// 3.B. EXTRACCIÓN DE TEXTO PARA LABORATORIOS (LABS)
// ─────────────────────────────────────────────────────────────
function labToText(lab: LabContent): string {
  const parts: string[] = [
    `Laboratorio ${lab.labNumber}: ${lab.title}`,
    `Descripción: ${lab.description}`,
    `Introducción: ${lab.introduction}`,
  ];

  if (lab.overview?.objectives?.length) {
    parts.push(`Objetivos del Lab: ${lab.overview.objectives.join("; ")}`);
  }

  if (lab.overview?.whatYouLearn?.length) {
    parts.push(`Lo que aprenderás: ${lab.overview.whatYouLearn.join("; ")}`);
  }

  if (lab.concepts?.length) {
    const conceptsText = lab.concepts
      .map((c) => `- ${c.term}: ${c.definition}`)
      .join("\n");
    parts.push(`Conceptos clave del Lab:\n${conceptsText}`);
  }

  if (lab.tasks?.length) {
    const tasksText = lab.tasks
      .map(
        (t) =>
          `[${t.title}]\n` +
          `Nota de concepto: ${t.conceptNote}\n` +
          `Pregunta guía: ${t.guidingQuestion}\n` +
          `Observación: ${t.observation}\n` +
          `Reflexión: ${t.reflection}\n` +
          `Preguntas de participación: ${t.participationQuestions?.join(" | ")}`
      )
      .join("\n\n");
    parts.push(`Tareas del Lab:\n${tasksText}`);
  }

  return parts.join("\n\n");
}

// ─────────────────────────────────────────────────────────────
// 4. CONSTRUCCIÓN DE knowledge-chunks.json (Lecciones + Labs)
// ─────────────────────────────────────────────────────────────
function buildKnowledgeChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  // Chunks de Lecciones
  for (const { unidad, topics } of allUnits) {
    for (const topic of topics) {
      const parts: string[] = [
        `Unidad ${unidad} - ${topic.title}`,
        topic.objectives?.length
          ? `Objetivos: ${topic.objectives.join("; ")}`
          : "",
      ];

      for (const section of topic.sections) {
        const text = sectionToText(section);
        if (text) parts.push(text);
      }

      chunks.push({
        id: `u${unidad}-${topic.slug}`,
        type: "lesson",
        unidad,
        slug: topic.slug,
        title: topic.title,
        text: parts.filter(Boolean).join("\n\n"),
        url: buildUrl(topic.slug, false),
      });
    }
  }

  // Chunks de Laboratorios (Labs)
  for (const lab of labsContent) {
    chunks.push({
      id: `lab-${lab.labNumber}-${lab.slug}`,
      type: "lab",
      labNumber: lab.labNumber,
      slug: lab.slug,
      title: `Laboratorio ${lab.labNumber}: ${lab.title}`,
      text: labToText(lab),
      url: buildUrl(lab.slug, true),
    });
  }

  return chunks;
}

// ─────────────────────────────────────────────────────────────
// 5. CONSTRUCCIÓN DE style-examples.json (Lecciones + Labs)
// ─────────────────────────────────────────────────────────────
function buildStyleExamples(): StyleExample[] {
  const examples: StyleExample[] = [];
  let counter = 0;

  // Ejemplos de Lecciones
  for (const { unidad, topics } of allUnits) {
    for (const topic of topics) {
      for (const section of topic.sections) {
        if (section.type === "quiz") {
          examples.push({
            id: `style-${counter++}`,
            source: "lesson",
            unidad,
            slug: topic.slug,
            topicTitle: topic.title,
            tipo: "quiz",
            data: {
              question: section.question,
              options: section.options,
            },
          });
        }

        if (section.type === "scenario") {
          for (const s of section.scenarios ?? []) {
            examples.push({
              id: `style-${counter++}`,
              source: "lesson",
              unidad,
              slug: topic.slug,
              topicTitle: topic.title,
              tipo: "scenario",
              data: s,
            });
          }
        }

        if (section.type === "matching") {
          examples.push({
            id: `style-${counter++}`,
            source: "lesson",
            unidad,
            slug: topic.slug,
            topicTitle: topic.title,
            tipo: "matching",
            data: {
              description: section.description,
              pairs: section.pairs,
            },
          });
        }

        if (section.type === "classify") {
          examples.push({
            id: `style-${counter++}`,
            source: "lesson",
            unidad,
            slug: topic.slug,
            topicTitle: topic.title,
            tipo: "classify",
            data: {
              description: section.description,
              cases: section.cases,
            },
          });
        }
      }
    }
  }

  // Ejemplos de Laboratorios (Labs tasks & preguntas de guía/participación)
  for (const lab of labsContent) {
    for (const task of lab.tasks) {
      examples.push({
        id: `style-${counter++}`,
        source: "lab",
        labNumber: lab.labNumber,
        slug: lab.slug,
        topicTitle: `Lab ${lab.labNumber}: ${lab.title}`,
        tipo: "labTask",
        data: {
          taskTitle: task.title,
          conceptNote: task.conceptNote,
          guidingQuestion: task.guidingQuestion,
          observation: task.observation,
          reflection: task.reflection,
          participationQuestions: task.participationQuestions,
        },
      });
    }
  }

  return examples;
}

// ─────────────────────────────────────────────────────────────
// 6. EJECUCIÓN
// ─────────────────────────────────────────────────────────────
function main() {
  const knowledgeChunks = buildKnowledgeChunks();
  const styleExamples = buildStyleExamples();

  // Guardar en frontend (rag-data)
  const frontOutDir = resolve(__dirname, "../rag-data");
  mkdirSync(frontOutDir, { recursive: true });

  writeFileSync(
    resolve(frontOutDir, "knowledge-chunks.json"),
    JSON.stringify(knowledgeChunks, null, 2)
  );

  writeFileSync(
    resolve(frontOutDir, "style-examples.json"),
    JSON.stringify(styleExamples, null, 2)
  );

  console.log(`✔ Frontend: ${knowledgeChunks.length} knowledge chunks (lecciones y labs) -> rag-data/knowledge-chunks.json`);
  console.log(`✔ Frontend: ${styleExamples.length} style examples -> rag-data/style-examples.json`);

  // Exportar copia a CloudBackend/data
  try {
    const backendDataDir = resolve(__dirname, "../../CloudBackend/data");
    mkdirSync(backendDataDir, { recursive: true });

    writeFileSync(
      resolve(backendDataDir, "knowledge-chunks.json"),
      JSON.stringify(knowledgeChunks, null, 2)
    );

    writeFileSync(
      resolve(backendDataDir, "style-examples.json"),
      JSON.stringify(styleExamples, null, 2)
    );

    console.log(`✔ Backend: Datos actualizados en CloudBackend/data/`);
  } catch (err) {
    console.warn(`⚠ No se pudo escribir copia a CloudBackend/data/:`, err);
  }

  const short = knowledgeChunks.filter((c) => c.text.length < 100);
  if (short.length) {
    console.warn(
      `⚠ ${short.length} chunk(s) con texto muy corto, revisa: ${short
        .map((c) => c.id)
        .join(", ")}`
    );
  }
}

main();

