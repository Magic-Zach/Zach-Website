"use client";

import { useReducedMotion, motion } from "framer-motion";
import Image from "next/image";

/* ── Art Deco corner ornament ────────────────────────────────────────────── */
function ArtDecoCorner({ rotate = 0 }: { rotate?: number }) {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="#C49A3C"
      strokeWidth="1" aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M3,62 L3,3 L62,3" />
      <path d="M11,54 L11,11 L54,11" />
      <rect x="1.5" y="1.5" width="5" height="5" fill="#C49A3C" stroke="none" />
      <polygon points="26,26 32,20 38,26 32,32" />
    </svg>
  );
}

function EdgeDiamond() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="#C49A3C" aria-hidden style={{ opacity: 0.5 }}>
      <polygon points="7,0 14,7 7,14 0,7" />
    </svg>
  );
}

/* ── Art Deco / retro-futurist background ────────────────────────────────── */
function ArtDecoBackground() {
  /* All coords in a 1440×820 viewBox — radiating from behind the portrait */
  const cx = 1020;
  const cy = 410;
  const numRays = 60;
  const rays = Array.from({ length: numRays }, (_, i) => (i * 360) / numRays);

  /* Concentric circles — alternating thick / thin for Art Deco effect */
  const circles = [
    { r: 110, w: 1.5 }, { r: 200, w: 0.6 }, { r: 295, w: 1.5 },
    { r: 390, w: 0.6 }, { r: 490, w: 1.5 }, { r: 600, w: 0.6 },
    { r: 720, w: 1.2 }, { r: 860, w: 0.5 },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Rays — alternating opacity for depth */}
      {rays.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = +(cx + 1400 * Math.cos(rad)).toFixed(1);
        const y2 = +(cy + 1400 * Math.sin(rad)).toFixed(1);
        const isPrimary = i % 3 === 0;
        return (
          <line
            key={angle}
            x1={cx} y1={cy}
            x2={x2} y2={y2}
            stroke="#C49A3C"
            strokeWidth={isPrimary ? 1.2 : 0.5}
            opacity={isPrimary ? 0.14 : 0.07}
          />
        );
      })}

      {/* Concentric circles */}
      {circles.map(({ r, w }, i) => (
        <circle
          key={r}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#C49A3C"
          strokeWidth={w}
          opacity={Math.max(0.06, 0.22 - i * 0.025)}
        />
      ))}

      {/* Small tick marks where thick circles cross key rays */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return [295, 490, 720].map((r) => {
          const tx = cx + r * Math.cos(rad);
          const ty = cy + r * Math.sin(rad);
          const nx = Math.cos(rad) * 10;
          const ny = Math.sin(rad) * 10;
          return (
            <line
              key={`tick-${angle}-${r}`}
              x1={+(tx - nx).toFixed(1)} y1={+(ty - ny).toFixed(1)}
              x2={+(tx + nx).toFixed(1)} y2={+(ty + ny).toFixed(1)}
              stroke="#C49A3C" strokeWidth="2" opacity="0.28"
            />
          );
        });
      })}

      {/* Art Deco corner fan lines — top-left */}
      {[0, 15, 30, 45, 60, 75, 90].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={`fan-tl-${angle}`}
            x1="60" y1="60"
            x2={+(60 + 220 * Math.cos(rad)).toFixed(1)}
            y2={+(60 + 220 * Math.sin(rad)).toFixed(1)}
            stroke="#C49A3C" strokeWidth="0.6" opacity="0.09"
          />
        );
      })}
      {/* Fan arc */}
      <path
        d={`M ${60 + 220} 60 A 220 220 0 0 1 60 ${60 + 220}`}
        fill="none" stroke="#C49A3C" strokeWidth="0.8" opacity="0.12"
      />
      <path
        d={`M ${60 + 160} 60 A 160 160 0 0 1 60 ${60 + 160}`}
        fill="none" stroke="#C49A3C" strokeWidth="0.5" opacity="0.09"
      />

      {/* Bottom-right matching fan */}
      {[180, 195, 210, 225, 240, 255, 270].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={`fan-br-${angle}`}
            x1="1380" y1="760"
            x2={+(1380 + 220 * Math.cos(rad)).toFixed(1)}
            y2={+(760 + 220 * Math.sin(rad)).toFixed(1)}
            stroke="#C49A3C" strokeWidth="0.6" opacity="0.09"
          />
        );
      })}
      <path
        d={`M ${1380 - 220} 760 A 220 220 0 0 1 1380 ${760 - 220}`}
        fill="none" stroke="#C49A3C" strokeWidth="0.8" opacity="0.12"
      />
    </svg>
  );
}

/* ── SVG Artifact Icons ───────────────────────────────────────────────────── */
function SoccerBall() {
  return (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.25" aria-label="Soccer ball">
      <circle cx="28" cy="28" r="24" />
      <polygon points="28,10 36,18 33,28 23,28 20,18" strokeWidth="1" />
      <line x1="28" y1="4" x2="28" y2="10" /><line x1="20" y1="18" x2="9" y2="16" />
      <line x1="36" y1="18" x2="47" y2="16" /><line x1="23" y1="28" x2="14" y2="38" />
      <line x1="33" y1="28" x2="42" y2="38" /><line x1="14" y1="38" x2="20" y2="48" />
      <line x1="42" y1="38" x2="36" y2="48" />
    </svg>
  );
}
function BlockM() {
  return (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.25" aria-label="Block M">
      <path d="M6,48 L6,10 L16,10 L28,32 L40,10 L50,10 L50,48 L40,48 L40,26 L31,44 L25,44 L16,26 L16,48 Z" />
    </svg>
  );
}
function Skateboard() {
  return (
    <svg viewBox="0 0 72 40" fill="none" stroke="currentColor" strokeWidth="1.25" aria-label="Skateboard">
      <rect x="6" y="10" width="60" height="14" rx="6" />
      <circle cx="18" cy="30" r="5" /><circle cx="54" cy="30" r="5" />
    </svg>
  );
}
function CircuitBoard() {
  return (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.25" aria-label="Circuit board">
      <rect x="6" y="6" width="44" height="44" /><rect x="18" y="18" width="20" height="20" />
      <line x1="6" y1="22" x2="18" y2="22" /><line x1="6" y1="34" x2="18" y2="34" />
      <line x1="38" y1="22" x2="50" y2="22" /><line x1="38" y1="34" x2="50" y2="34" />
      <line x1="22" y1="6" x2="22" y2="18" /><line x1="34" y1="6" x2="34" y2="18" />
      <line x1="22" y1="38" x2="22" y2="50" /><line x1="34" y1="38" x2="34" y2="50" />
      <circle cx="6" cy="22" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="6" cy="34" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="22" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="34" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Briefcase() {
  return (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.25" aria-label="Briefcase">
      <rect x="6" y="18" width="44" height="30" rx="1" />
      <path d="M20,18 L20,12 Q20,8 28,8 Q36,8 36,12 L36,18" />
      <line x1="6" y1="32" x2="50" y2="32" /><rect x="25" y="29" width="6" height="6" rx="1" />
    </svg>
  );
}
function PlayingCards() {
  return (
    <svg viewBox="0 0 72 56" fill="none" stroke="currentColor" strokeWidth="1.25" aria-label="Playing cards">
      <g transform="rotate(-18, 20, 44)"><rect x="4" y="8" width="28" height="40" rx="2" /></g>
      <rect x="22" y="8" width="28" height="40" rx="2" />
      <text x="26" y="24" fontSize="10" fontFamily="serif" fill="currentColor" stroke="none">A</text>
      <g transform="rotate(18, 52, 44)"><rect x="40" y="8" width="28" height="40" rx="2" /></g>
    </svg>
  );
}

/* ── Artifact config — positioned relative to the hero section ───────────── */
const ARTIFACTS = [
  { id: "soccer",     label: "Growing Up", scrollTo: "#chapter-i",   Icon: SoccerBall,   top: "10%", left: "4%",  floatDelay: 0,   floatDuration: 3.8 },
  { id: "block-m",    label: "Michigan",   scrollTo: "#chapter-ii",  Icon: BlockM,       top: "8%",  left: "88%", floatDelay: 0.7, floatDuration: 4.2 },
  { id: "skateboard", label: "Michigan",   scrollTo: "#chapter-ii",  Icon: Skateboard,   top: "58%", left: "3%",  floatDelay: 1.3, floatDuration: 3.5 },
  { id: "circuit",    label: "Startups",   scrollTo: "#chapter-iii", Icon: CircuitBoard, top: "56%", left: "87%", floatDelay: 0.4, floatDuration: 4.6 },
  { id: "briefcase",  label: "Prophet",    scrollTo: "#chapter-iv",  Icon: Briefcase,    top: "80%", left: "22%", floatDelay: 1.0, floatDuration: 4.0 },
  { id: "cards",      label: "Magic",      scrollTo: "#chapter-iv",  Icon: PlayingCards, top: "78%", left: "76%", floatDelay: 0.2, floatDuration: 3.3 },
] as const;

/* ── Name display via SVG — equal width + ultra-thick glyphs ────────────── */
function NameDisplay() {
  const font = "var(--font-display-name), Anton, Impact, sans-serif";
  return (
    <svg
      viewBox="0 0 1000 240"
      width="100%"
      style={{ display: "block", overflow: "visible" }}
      role="img"
      aria-label="Zach Lipkin"
    >
      <defs>
        <filter id="name-shadow" x="-4%" y="-10%" width="112%" height="130%">
          <feDropShadow dx="2" dy="4" stdDeviation="0" floodColor="#C49A3C" floodOpacity="0.28" />
          <feDropShadow dx="4" dy="8" stdDeviation="10" floodColor="#1C1A14" floodOpacity="0.10" />
        </filter>
      </defs>

      {/* ZACH — spacingAndGlyphs stretches the actual letter shapes to fill width */}
      <text
        x="0" y="113"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        fontSize="118"
        fontFamily={font}
        fontWeight="900"
        fill="#1C1A14"
        stroke="#1C1A14"
        strokeWidth="2"
        paintOrder="stroke fill"
        filter="url(#name-shadow)"
      >ZACH</text>

      {/* LIPKIN */}
      <text
        x="0" y="232"
        textLength="1000"
        lengthAdjust="spacingAndGlyphs"
        fontSize="118"
        fontFamily={font}
        fontWeight="900"
        fill="#1C1A14"
        stroke="#1C1A14"
        strokeWidth="2"
        paintOrder="stroke fill"
        filter="url(#name-shadow)"
      >LIPKIN</text>
    </svg>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ background: "#F2EBD9", paddingTop: "8vh", paddingBottom: "3vh" }}
    >
      {/* Art Deco / retro-futurist background */}
      {!prefersReducedMotion && <ArtDecoBackground />}

      {/* ── Art Deco frame — equal inset on all sides ───────────────────── */}
      <div
        className="absolute inset-4 pointer-events-none"
        style={{ border: "1px solid rgba(196,154,60,0.42)" }}
        aria-hidden
      >
        <div className="absolute top-0 left-0"><ArtDecoCorner rotate={0} /></div>
        <div className="absolute top-0 right-0"><ArtDecoCorner rotate={90} /></div>
        <div className="absolute bottom-0 right-0"><ArtDecoCorner rotate={180} /></div>
        <div className="absolute bottom-0 left-0"><ArtDecoCorner rotate={270} /></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[7px]"><EdgeDiamond /></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[7px]"><EdgeDiamond /></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[7px]"><EdgeDiamond /></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[7px]"><EdgeDiamond /></div>
      </div>

      {/* ── Floating artifacts across the full hero ──────────────────────── */}
      {ARTIFACTS.map((art) => (
        <motion.button
          key={art.id}
          aria-label={`Go to ${art.label}`}
          onClick={() => scrollTo(art.scrollTo)}
          className="absolute hidden md:flex items-center justify-center cursor-pointer z-10"
          style={{ top: art.top, left: art.left, color: "#C49A3C", width: "48px", height: "48px", background: "transparent", border: "none", padding: 0 }}
          animate={prefersReducedMotion ? {} : {
            y: [-6, 6, -6],
            transition: { duration: art.floatDuration, delay: art.floatDelay, repeat: Infinity, ease: "easeInOut" },
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.14 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
          title={art.label}
        >
          <art.Icon />
        </motion.button>
      ))}

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-10 sm:px-16">
        <div className="flex flex-col md:flex-row items-center">

          {/* LEFT — Name + Tagline */}
          <motion.div
            className="flex-1 flex flex-col justify-center relative z-10 min-w-0"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <NameDisplay />

            <div className="mt-5 mb-5" style={{ height: "1px", background: "rgba(196,154,60,0.45)" }} />

            {/* Tagline — bigger */}
            <p
              className="font-display italic"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(20px, 2.6vw, 32px)",
                color: "#1C1A14",
                opacity: 0.72,
                fontWeight: 400,
                whiteSpace: "nowrap",
                lineHeight: 1.3,
              }}
            >
              Consultant. Builder. Magician. Perpetually curious.
            </p>
          </motion.div>

          {/* RIGHT — Portrait, no frame, mix-blend removes bg, overlaps name */}
          <motion.div
            className="relative flex-shrink-0"
            style={{
              width: "clamp(200px, 28vw, 330px)",
              marginLeft: "clamp(-60px, -4vw, -40px)",
              zIndex: 20,
            }}
            initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/zach-portrait.png"
              alt="Zach Lipkin"
              width={330}
              height={440}
              style={{ width: "100%", height: "auto", display: "block", mixBlendMode: "multiply" }}
              priority
            />
          </motion.div>
        </div>

        {/* Mobile artifact row */}
        <div className="mt-8 flex md:hidden gap-5 overflow-x-auto pb-1 justify-center">
          {ARTIFACTS.filter((_, i) => i % 2 === 0).map((art) => (
            <button
              key={art.id}
              aria-label={`Go to ${art.label}`}
              onClick={() => scrollTo(art.scrollTo)}
              className="flex-shrink-0 flex flex-col items-center gap-1"
              style={{ color: "#C49A3C", background: "transparent", border: "none" }}
            >
              <div style={{ width: "38px", height: "38px" }}><art.Icon /></div>
              <span className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.1em", color: "#C49A3C", opacity: 0.7 }}>
                {art.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 mt-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <span className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.22em", color: "#1C1A14", opacity: 0.3 }}>
          SCROLL
        </span>
        <motion.div
          style={{ width: "1px", height: "32px", background: "#C49A3C", opacity: 0.35 }}
          animate={prefersReducedMotion ? {} : { scaleY: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
