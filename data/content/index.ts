import { unit1Content, TopicContent, ContentSection } from "./unit1";
import { unit2Content } from "./unit2";

export type { TopicContent, ContentSection };

const allContent: Record<string, TopicContent[]> = {
  "1": unit1Content,
  "2": unit2Content,
};

export function getTopicContent(unit: string, slug: string): TopicContent | null {
  const unitContent = allContent[unit];
  if (!unitContent) return null;
  return unitContent.find((t) => t.slug === slug) ?? null;
}
