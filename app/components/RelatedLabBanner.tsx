import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { RelatedLab } from "@/data/topicLabMap";

export function RelatedLabBanner({ labs }: { labs: RelatedLab[] }) {
  if (labs.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <FlaskConical className="w-3.5 h-3.5 text-cyan shrink-0" />
      <span className="text-xs text-text-secondary">Lab relacionado:</span>
      {labs.map((lab, i) => (
        <span key={lab.slug} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-border">·</span>}
          <Link
            href={`/labs/${lab.slug}`}
            className="text-xs text-cyan hover:text-azure hover:underline transition-colors"
          >
            Lab {lab.labNumber} — {lab.title}
          </Link>
        </span>
      ))}
    </div>
  );
}
