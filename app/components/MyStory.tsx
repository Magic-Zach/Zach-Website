"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from "framer-motion";
import { CHAPTERS, TRANSITIONS } from "../data/chapters";

/* ── Flip-reveal image note card ─────────────────────────────────────────── */
function FlipImageCard({ src, label, caption, accent, objectPosition = "center" }: { src: string | null; label: string; caption: string; accent: string; objectPosition?: string }) {
  const [flipped, setFlipped] = useState(false);

  /* Auto-revert to the un-blurred image after a few seconds so the caption
     doesn't stay covering the photo indefinitely. */
  useEffect(() => {
    if (!flipped) return;
    const timer = setTimeout(() => setFlipped(false), 6000);
    return () => clearTimeout(timer);
  }, [flipped]);

  return (
    <div className="flex flex-col gap-2 md:grow md:shrink md:basis-[130px] md:min-w-[110px] md:max-w-[190px]">
      {/* Card — fixed 4:3 aspect ratio for all side notes */}
      <div
        onClick={() => setFlipped((v) => !v)}
        style={{
          aspectRatio: "4/3",
          position: "relative",
          cursor: "pointer",
          overflow: "hidden",
          border: `1px solid rgba(196,154,60,0.35)`,
        }}
      >
        {/* Photo */}
        {src ? (
          <Image
            src={src}
            alt={label}
            fill
            style={{ objectFit: "cover", objectPosition, transition: "filter 0.45s ease", filter: flipped ? "blur(5px) brightness(0.38)" : "none" }}
            sizes="200px"
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "#FBF7EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="font-mono text-center" style={{ fontSize: "6px", letterSpacing: "0.12em", color: "#C49A3C", opacity: 0.38 }}>{label}</span>
          </div>
        )}

        {/* Caption overlay — dark scrim + readable text */}
        <AnimatePresence>
          {flipped && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px",
                zIndex: 2,
                background: "rgba(20,18,12,0.55)",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(12px, 1vw, 14px)",
                  lineHeight: 1.5,
                  color: "#F2EBD9",
                  textAlign: "center",
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 500,
                }}
              >
                {caption}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tap hint */}
        {!flipped && (
          <div
            style={{
              position: "absolute",
              bottom: "6px",
              right: "8px",
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "#fff",
              background: "rgba(0,0,0,0.45)",
              padding: "2px 6px",
              borderRadius: "2px",
            }}
            className="font-mono"
          >
            TAP
          </div>
        )}
      </div>

      {/* Label below — high contrast gold */}
      <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.12em", color: accent }}>
        {label}
      </span>
    </div>
  );
}

/* ── Image side-note card ────────────────────────────────────────────────── */
function NoteCard({
  note,
  accent,
}: {
  note: (typeof CHAPTERS)[number]["notes"][number];
  accent: string;
}) {
  return (
    <FlipImageCard
      src={note.src}
      label={note.label}
      caption={note.caption}
      accent={accent}
      objectPosition={note.objectPosition}
    />
  );
}

/* ── Sunburst halo — miniature echo of the hero's radiating background,
   used behind the active chapter numeral in the tracker ─────────────────── */
function SunburstMark({
  bloom,
  innerRadius = 8.5,
  radiusXInner,
  radiusYInner,
  radiusXOuter,
  radiusYOuter,
}: {
  bloom: boolean;
  innerRadius?: number;
  radiusXInner?: number;
  radiusYInner?: number;
  radiusXOuter?: number;
  radiusYOuter?: number;
}) {
  const cx = 16;
  const cy = 17;
  const numRays = 12;
  const rays = Array.from({ length: numRays }, (_, i) => (i * 360) / numRays);
  const rxInner = radiusXInner ?? innerRadius;
  const ryInner = radiusYInner ?? innerRadius;
  const rxOuter = radiusXOuter ?? 15.5;
  const ryOuter = radiusYOuter ?? 15.5;

  return (
    <motion.svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      aria-hidden
      style={{ position: "absolute", left: 0, top: "-6px", zIndex: 0, pointerEvents: "none" }}
      initial={bloom ? { opacity: 0, scale: 0.7 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {rays.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = +(cx + rxInner * Math.cos(rad)).toFixed(1);
        const y1 = +(cy + ryInner * Math.sin(rad)).toFixed(1);
        const x2 = +(cx + rxOuter * Math.cos(rad)).toFixed(1);
        const y2 = +(cy + ryOuter * Math.sin(rad)).toFixed(1);
        return (
          <line
            key={angle}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#C49A3C"
            strokeWidth="1.3"
            opacity={i % 2 === 0 ? 0.9 : 0.55}
          />
        );
      })}
    </motion.svg>
  );
}

/* ── Single chapter panel (100vw × 100vh) ────────────────────────────────── */
function ChapterPanel({
  chapter,
  index,
  scrollYProgress,
}: {
  chapter: (typeof CHAPTERS)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const n = CHAPTERS.length;
  const isLast = index === n - 1;
  const prefersReducedMotion = useReducedMotion();

  /* Fade thresholds — last chapter special-cased:
     stays at full opacity always (no fade-in ramp, no fade-out). */
  const inStart  = isLast ? 0.0   : Math.max(0, (index - 0.6) / n);
  const inEnd    = isLast ? 0.001 : (index + 0.2) / n;
  const outStart = isLast ? 0.999 : (index + 0.65) / n;
  const outEnd   = isLast ? 1.0   : Math.min(1, (index + 1.2) / n);

  const opacity = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    isLast ? [1, 1, 1, 1] : [index === 0 ? 1 : 0.2, 1, 1, 0.2]
  );
  const yText = useTransform(
    scrollYProgress,
    [inStart, inEnd],
    [index === 0 ? 0 : 18, 0]
  );

  return (
    <div
      className="flex-shrink-0 flex flex-col"
      style={{ width: "100vw", height: "100%", background: "#F2EBD9", position: "relative" }}
    >
      {/* Vertical separator on the right edge (between chapters) */}
      {index < n - 1 && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "10%",
            bottom: "10%",
            width: "1px",
            background: `linear-gradient(to bottom, transparent, ${chapter.accent}66, transparent)`,
          }}
        />
      )}

      {/* Two-column body */}
      <div
        className="flex-1 min-h-0 grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px, 3vw, 56px)",
          padding: "83px 56px 44px",
        }}
      >
        {/* LEFT — hero image: fixed 3:4 portrait aspect ratio, consistent across chapters */}
        <motion.div style={{ opacity }} className="flex flex-col justify-center">
          <div
            style={{
              aspectRatio: "3/4",
              position: "relative",
              border: `1px solid rgba(196,154,60,0.38)`,
              background: "#FBF7EE",
              overflow: "hidden",
              maxHeight: "calc(100vh - 140px)",
            }}
          >
            <div className="absolute" style={{ inset: "10px", border: "1px solid rgba(196,154,60,0.18)", pointerEvents: "none", zIndex: 2 }} />
            {chapter.hero.src ? (
              <Image
                src={chapter.hero.src}
                alt={chapter.hero.label}
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="40vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-center" style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#C49A3C", opacity: 0.38, padding: "0 24px" }}>
                  {chapter.hero.label}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* RIGHT — text + notes */}
        <motion.div
          style={{ opacity, y: yText }}
          className="flex flex-col justify-center gap-4 min-h-0 py-2"
        >
          {/* Chapter tracker — CHAPTER label + all three numerals; the active one is
              haloed by a small gold sunburst, echoing the hero's radiating background */}
          <div className="flex items-center gap-3">
            <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.24em", color: "#1C1A14", opacity: 0.4 }}>
              CHAPTER
            </span>
            <div className="flex items-center" style={{ gap: "2px" }}>
              {CHAPTERS.map((c, i) => {
                const active = i === index;
                return (
                  <span key={c.id} className="flex items-center">
                    {i > 0 && (
                      <svg width="5" height="5" style={{ margin: "0 5px", flexShrink: 0 }} aria-hidden>
                        <polygon points="2.5,0 5,2.5 2.5,5 0,2.5" fill="#1C1A14" opacity="0.4" />
                      </svg>
                    )}
                    {/* Fixed-size slot so the row never reflows as the active chapter changes */}
                    <span
                      className="flex items-center justify-center"
                      style={{ position: "relative", width: "34px", height: "22px" }}
                    >
                      {active && !prefersReducedMotion && (
                        <SunburstMark
                          bloom
                          radiusXInner={index === 2 ? 11 : undefined}
                          radiusYInner={index === 2 ? 7 : undefined}
                          radiusXOuter={index === 2 ? 16.5 : undefined}
                          radiusYOuter={index === 2 ? 15.5 : undefined}
                        />
                      )}
                      {active && prefersReducedMotion && (
                        <SunburstMark
                          bloom={false}
                          radiusXInner={index === 2 ? 11 : undefined}
                          radiusYInner={index === 2 ? 7 : undefined}
                          radiusXOuter={index === 2 ? 16.5 : undefined}
                          radiusYOuter={index === 2 ? 15.5 : undefined}
                        />
                      )}
                      <span
                        className="font-mono"
                        style={{
                          position: "relative",
                          zIndex: 1,
                          fontSize: "10px",
                          letterSpacing: "0.18em",
                          fontWeight: 600,
                          color: active ? chapter.accent : "#1C1A14",
                          opacity: active ? 1 : 0.25,
                          transition: "color 0.3s ease",
                        }}
                      >
                        {c.number}
                      </span>
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          <h2
            className="font-display italic leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(26px, 3.2vw, 46px)",
              fontWeight: 400,
              color: "#1C1A14",
              lineHeight: 1.1,
            }}
          >
            {chapter.title}
          </h2>

          {/* Accent rule */}
          <div style={{ height: "1px", width: "40px", background: chapter.accent, opacity: 0.55 }} />

          {/* Narrative paragraphs */}
          <div className="flex flex-col gap-3">
            {chapter.paragraphs.map((p, i) => (
              <p
                key={i}
                style={{
                  fontSize: "clamp(12px, 1.05vw, 14px)",
                  lineHeight: 1.72,
                  color: "#1C1A14",
                  opacity: 0.76,
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Side notes */}
          <div style={{ marginTop: "4px" }}>
            {/* "Side Notes" label + divider */}
            <div className="flex items-center gap-3" style={{ marginBottom: "14px" }}>
              <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#1C1A14", opacity: 0.50, whiteSpace: "nowrap" }}>
                SIDE NOTES
              </span>
              <div style={{ height: "1px", flex: 1, background: "rgba(112, 86, 31, 0.2)" }} />
            </div>
            <div className="flex gap-4" style={{ flexWrap: "wrap" }}>
              {chapter.notes.map((note, i) => (
                <NoteCard key={i} note={note} accent={chapter.accent} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Mobile sticky chapter rail — signals "there are only three of these"
   while the reader is inside the story section ──────────────────────────── */
function MobileChapterRail() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    CHAPTERS.forEach((chapter, i) => {
      const el = document.getElementById(`ch-${chapter.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { rootMargin: "-45% 0px -45% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const goTo = (id: string) => {
    document.getElementById(`ch-${id}`)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <div
      className="flex items-center gap-3"
      style={{
        position: "sticky",
        top: "56px",
        zIndex: 30,
        background: "rgba(242,235,217,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(196,154,60,0.4)",
        padding: "10px 24px",
      }}
    >
      <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#1C1A14", opacity: 0.4 }}>
        CHAPTER
      </span>
      <div className="flex items-center" style={{ gap: "2px" }}>
        {CHAPTERS.map((chapter, i) => {
          const isActive = i === active;
          return (
            <span key={chapter.id} className="flex items-center">
              {i > 0 && (
                <svg width="5" height="5" style={{ margin: "0 6px", flexShrink: 0 }} aria-hidden>
                  <polygon points="2.5,0 5,2.5 2.5,5 0,2.5" fill="#1C1A14" opacity="0.4" />
                </svg>
              )}
              <button
                onClick={() => goTo(chapter.id)}
                className="font-mono"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? chapter.accent : "#1C1A14",
                  opacity: isActive ? 1 : 0.35,
                  transition: "color 0.3s ease, opacity 0.3s ease",
                  background: "none",
                  border: "none",
                  padding: "4px",
                  cursor: "pointer",
                }}
                aria-label={`Go to Chapter ${chapter.number}: ${chapter.title}`}
              >
                {chapter.number}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── MyStory section ─────────────────────────────────────────────────────── */
export default function MyStory() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const n = CHAPTERS.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Horizontal track translation — mostly smooth, with just a gentle settle at each
     chapter. Each transition is wide (spans most of the segment) and eased so it
     accelerates/decelerates instead of snapping abruptly, with only a brief dwell
     right at the read-point of each chapter. */
  const easeFractions = [0, 0.22, 0.5, 0.78, 1]; // gentle ease-in-out, close to linear

  /* TRANSITIONS is imported from ../data/chapters so Nav's Story dropdown can
     compute matching scroll targets via chapterProgress(). */
  const xTimes: number[] = [0];
  const xValues: string[] = ["0vw"];
  TRANSITIONS.forEach(([start, end], i) => {
    const from = -i * 100;
    const to = -(i + 1) * 100;
    for (const f of easeFractions) {
      xTimes.push(start + f * (end - start));
      xValues.push(`${from + f * (to - from)}vw`);
    }
  });
  xTimes.push(1);
  xValues.push(`${-(n - 1) * 100}vw`);

  /* Smooth the track's driver so it trails slightly behind the wheel and glides
     to catch up rather than snapping on every scroll tick — the raw
     scrollYProgress is still used for the per-panel fades/progress bar below so
     those stay in sync with actual scroll position. */
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 20,
    restDelta: 0.0005,
  });
  const x = useTransform(smoothProgress, xTimes, xValues);

  /* Progress bar */
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div id="my-story" style={{ scrollMarginTop: "56px" }}>
      {/* ── Desktop: sticky horizontal scroll ──────────────────────────── */}
      <section
        ref={containerRef}
        id="story-track"
        className="hidden md:block"
        style={{ height: `${n * 100}vh`, position: "relative" }}
      >
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#F2EBD9" }}>

          {/* MY STORY label — section header with accent divider + inline hook.
              height:83px matches ChapterPanel's paddingTop (the space above the
              hero image), so the row centers itself in that band exactly. */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center pointer-events-none"
            style={{ zIndex: 20, height: "83px", padding: "0 56px", gap: "16px" }}
          >
            <div className="flex items-baseline" style={{ gap: "6px" }}>
              <span className="font-mono" style={{ fontSize: "12px", letterSpacing: "0.32em", color: "#1C1A14", opacity: 0.55, fontWeight: 500, whiteSpace: "nowrap" }}>
                MY STORY:
              </span>
              <p
                className="font-mono"
                style={{ fontSize: "14px", color: "#1C1A14", opacity: 0.55, whiteSpace: "nowrap" }}
              >
                How being curious about everything led to a career helping businesses grow.
              </p>
            </div>
            <div style={{ height: "1px", flex: 1, background: "rgba(196,154,60,0.4)" }} />
          </div>

          {/* Horizontal chapter track */}
          <motion.div
            style={{
              x: prefersReducedMotion ? "0vw" : x,
              display: "flex",
              width: `${n * 100}vw`,
              height: "100%",
            }}
          >
            {CHAPTERS.map((chapter, i) => (
              <ChapterPanel
                key={chapter.id}
                chapter={chapter}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </motion.div>

          {/* Gold progress line at very bottom */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: "5px", background: "rgba(196,154,60,0.18)", zIndex: 20 }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "#C49A3C",
                width: prefersReducedMotion ? "100%" : progressW,
                opacity: 0.7,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Mobile: chapters stacked vertically ────────────────────────── */}
      <section className="block md:hidden" style={{ background: "#F2EBD9" }}>
        <div style={{ padding: "12px 24px 4px" }}>
          <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#1C1A14", opacity: 0.55, fontWeight: 500 }}>
            MY STORY:
          </span>
          <p
            className="font-mono"
            style={{ fontSize: "14px", color: "#1C1A14", opacity: 0.55, marginTop: "4px" }}
          >
            How being curious about everything led to a career helping businesses grow.
          </p>
        </div>
        <MobileChapterRail />
        {CHAPTERS.map((chapter) => (
          <div
            key={chapter.id}
            id={`ch-${chapter.id}`}
            style={{ borderTop: `1px solid ${chapter.accent}33`, padding: "32px 24px 40px", scrollMarginTop: "104px" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.2em", color: chapter.accent }}>
                CHAPTER {chapter.number}
              </span>
              <div style={{ height: "1px", flex: 1, background: chapter.accent, opacity: 0.2 }} />
            </div>
            {/* Hero image */}
            <div
              style={{ border: "1px solid rgba(196,154,60,0.3)", background: "#FBF7EE", height: "220px", position: "relative", overflow: "hidden", marginBottom: "24px" }}
            >
              {chapter.hero.src ? (
                <Image src={chapter.hero.src} alt={chapter.hero.label} fill style={{ objectFit: "cover", objectPosition: chapter.hero.objectPosition }} sizes="100vw" />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.12em", color: "#C49A3C", opacity: 0.4 }}>{chapter.hero.label}</span>
                </div>
              )}
            </div>
            <h2
              className="font-display italic"
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px", fontWeight: 400, color: "#1C1A14", lineHeight: 1.15, marginBottom: "16px" }}
            >
              {chapter.title}
            </h2>
            <div style={{ height: "1px", width: "32px", background: chapter.accent, opacity: 0.5, marginBottom: "16px" }} />
            {chapter.paragraphs.map((p, i) => (
              <p key={i} style={{ fontSize: "14px", lineHeight: 1.7, color: "#1C1A14", opacity: 0.75, marginBottom: "12px" }}>{p}</p>
            ))}
            <div style={{ marginTop: "20px" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: "12px" }}>
                <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#1C1A14", opacity: 0.35 }}>
                  SIDE NOTES
                </span>
                <div style={{ height: "1px", flex: 1, background: "rgba(196,154,60,0.2)" }} />
              </div>
              <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap">
                {chapter.notes.map((note, i) => (
                  <NoteCard key={i} note={note} accent={chapter.accent} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
