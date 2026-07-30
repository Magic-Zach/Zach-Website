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

/* ── Name display via SVG — equal width + ultra-thick glyphs ────────────── */
/* NameDisplay fills whatever height its container gives it via preserveAspectRatio="none".
   Since both words already have textLength="1000" stretching them full width, vertical
   scaling just makes the letterforms taller/bolder — no distortion of relative proportions. */
function NameDisplay() {
  const font = "var(--font-display-name), Anton, Impact, sans-serif";
  return (
    <div style={{ flex: 1, position: "relative", minHeight: "160px" }}>
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
        }}
        role="img"
        aria-label="Zach Lipkin"
      >
        <defs>
          <filter id="name-shadow" x="-4%" y="-10%" width="112%" height="130%">
            <feDropShadow dx="2" dy="4" stdDeviation="0" floodColor="#C49A3C" floodOpacity="0.28" />
            <feDropShadow dx="4" dy="8" stdDeviation="10" floodColor="#1C1A14" floodOpacity="0.10" />
          </filter>
        </defs>

        <text
          x="0" y="235"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          fontSize="240"
          fontFamily={font}
          fontWeight="900"
          fill="#1C1A14"
          stroke="#1C1A14"
          strokeWidth="2"
          paintOrder="stroke fill"
          filter="url(#name-shadow)"
        >ZACH</text>

        <text
          x="0" y="490"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          fontSize="240"
          fontFamily={font}
          fontWeight="900"
          fill="#1C1A14"
          stroke="#1C1A14"
          strokeWidth="2"
          paintOrder="stroke fill"
          filter="url(#name-shadow)"
        >LIPKIN</text>
      </svg>
    </div>
  );
}

/* ── Hero ────────────────────────────────────────────────────────────────── */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

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


      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-10 sm:px-16">
        <div className="flex flex-col md:flex-row items-stretch">

          {/* LEFT — Name fills portrait height */}
          <motion.div
            className="flex-1 flex flex-col relative z-10 min-w-0"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <NameDisplay />
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

      </div>

      {/* Scroll cue — art-deco box button linking to MyStory */}
      <motion.a
        href="#my-story"
        className="relative z-10 mt-10 flex items-center justify-center gap-2 mx-auto font-mono"
        style={{
          width: "fit-content",
          textDecoration: "none",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          background: "#1C1A14",
          border: "1px solid #C49A3C",
          color: "#F2EBD9",
          fontSize: "11px",
          letterSpacing: "0.24em",
          padding: "10px 22px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        {/* Gold gradient sweep */}
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "50%",
              background: "linear-gradient(90deg, transparent, rgba(196,154,60,0.55), transparent)",
              pointerEvents: "none",
            }}
            animate={{ x: ["-120%", "220%"] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "linear" }}
          />
        )}
        <span style={{ position: "relative" }}>SCROLL</span>
        <span style={{ position: "relative", color: "#C49A3C" }}>↓</span>
      </motion.a>
    </section>
  );
}
