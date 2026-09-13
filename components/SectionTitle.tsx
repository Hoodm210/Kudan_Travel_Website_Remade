interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  copy,
  align = "left",
  light = true,
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <div className={`max-w-2xl ${isCenter ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <span className="inline-block text-xs font-black uppercase tracking-widest text-[#D4AF37]">
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-1.5 text-3xl font-black tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-3 text-sm leading-relaxed font-medium sm:text-base ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}