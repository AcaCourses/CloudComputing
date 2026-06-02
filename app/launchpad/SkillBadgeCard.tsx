"use client";

interface SkillBadgeProps {
  title: string;
  category: string;
  level: string;
  index?: number;
}

export default function SkillBadgeCard({ title, category, level, index = 0 }: SkillBadgeProps) {
  const rotateDir = index % 2 === 0 ? "group-hover:[transform:rotate(-2deg)]" : "group-hover:[transform:rotate(2deg)]";
  return (
    <div className="group relative w-full">
      <div className={`relative bg-white rounded-[24px] border border-[#B0B0B0] p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:shadow-xl ${rotateDir} group-hover:border-[#4285F4]/40 overflow-hidden h-[280px] justify-center`}>
        {/* Google Cloud logo */}
        <img
          src="/assets/logoCloud.png"
          alt="Google Cloud"
          className="h-8 w-auto mb-6 opacity-90"
        />

        {/* Title */}
        <h3 className="text-base font-medium text-[#5F6368] leading-tight mb-3 max-w-[90%] min-h-[2.5rem] flex items-center">
          {title}
        </h3>

        {/* Category */}
        <p className="text-sm text-[#6B7280] font-normal mb-4">
          {category}
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-[#BDBDBD] mb-4" />

        {/* Badge level */}
        <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#6B7280]">
          SKILL BADGE · {level}
        </p>

        {/* Bottom color bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 flex">
          <div className="flex-1 bg-[#EA4335]" />
          <div className="flex-1 bg-[#4285F4]" />
          <div className="flex-1 bg-[#34A853]" />
          <div className="flex-1 bg-[#FBBC04]" />
        </div>
      </div>
    </div>
  );
}
