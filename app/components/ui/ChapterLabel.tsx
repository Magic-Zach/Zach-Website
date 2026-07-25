/* Chapter number label — DM Mono, small-caps, chapter accent color */
interface ChapterLabelProps {
  number: string;  // e.g. "CH. I"
  color: string;   // e.g. "#9B8EC4"
}

export default function ChapterLabel({ number, color }: ChapterLabelProps) {
  return (
    <span
      className="font-mono text-[11px] tracking-[0.2em] uppercase block"
      style={{ color, letterSpacing: "0.2em" }}
    >
      {number}
    </span>
  );
}
