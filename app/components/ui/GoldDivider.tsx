/* Reusable Art Deco gold horizontal rule with diamond midpoint */
export default function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px" style={{ background: "#C49A3C", opacity: 0.5 }} />
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
        <polygon points="5,0 10,5 5,10 0,5" fill="#C49A3C" />
      </svg>
      <div className="flex-1 h-px" style={{ background: "#C49A3C", opacity: 0.5 }} />
    </div>
  );
}
