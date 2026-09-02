import { unit1Content, TopicContent, ContentSection, QuizLink } from "./unit1";
import { unit2Content } from "./unit2";
import { unit3Content } from "./unit3";
import { unit4Content } from "./unit4";
import { unit5Content } from "./unit5";
import { unit6Content } from "./unit6";
import { unit7Content } from "./unit7";
import { unit9Content } from "./unit9";

export type { TopicContent, ContentSection, QuizLink };

const allContent: Record<string, TopicContent[]> = {
  "1": unit1Content,
  "2": unit2Content,
  "3": unit3Content,
  "4": unit4Content,
  "5": unit5Content,
  "6": unit6Content,
  "7": unit7Content,
  "9": unit9Content,
};

export function getTopicContent(unit: string, slug: string): TopicContent | null {
  const unitContent = allContent[unit];
  if (!unitContent) return null;
  return unitContent.find((t) => t.slug === slug) ?? null;
}
