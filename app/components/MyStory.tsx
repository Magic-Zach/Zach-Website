"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";

/* ── Chapter content data ────────────────────────────────────────────────── */
/* heroSrc / noteSrc fields: replace null with the imported image path once
   you have photos. The placeholder labels show what image belongs there.    */

const CHAPTERS = [
  {
    id: "growing-up",
    number: "I",
    label: "GROWING UP",
    accent: "#9B8EC4",
    title: "Curious Kid from Michigan",
    paragraphs: [
      "I grew up in a pretty suburb of Detroit, Michigan, in a family of doctors. Seeing that my parents saved lives… I wanted to have a meaningful impact too.",
      "I've always been drawn to the foundational, human-level things like health, energy, financial wellbeing, and fun. I couldn't choose just one, because they all mattered and I didn't want to ignore any.",
      "Then I discovered what business was. Not just money and suits, but the way people and resources organize around an idea to make it real, and drive change across all these areas and around the world.",
      "So I chose that.",
    ],
    hero: { src: "/ch1-main.png" as string | null, label: "MICHIGAN — EARLY YEARS" },
    notes: [
      { type: "image" as const, src: "/ch1-side1.jpg" as string | null, label: "SOCCER CHAMPIONSHIP", caption: "I love soccer! It was my main sport growing up, and we won the State Championship my senior year of high school!" },
      { type: "image" as const, src: "/ch1-side2.jpeg" as string | null, label: "MICHIGAN SUMMERS", caption: "I love the summers! I grew up near a lake and love playing outside and in the water — running around, swimming, etc." },
    ],
  },
  {
    id: "michigan",
    number: "II",
    label: "MICHIGAN",
    accent: "#7FB3D3",
    title: "Ross, Startups, and Building Things",
    paragraphs: [
      "I went on to study business (and psychology) at the University of Michigan's Ross School of Business. I loved learning the fundamentals, from balance sheets to marketing funnels, and quickly became interested in how those tools could turn ambitious ideas into real businesses with impact.",
      "I found that happening at startups, where entrepreneurs were applying technology and business to rethink fundamental constraints across energy, computing, biology, finance, and beyond. I became fascinated by these companies and gained hands-on experience through a VC internship while building a social media channel breaking down startups I found exciting.",
      "But I wanted to do more than study these ideas. I wanted to help founders turn ambitious visions into companies that create real impact, which led me to become a business growth strategy consultant.",
    ],
    hero: { src: "/ch2-main.jpeg" as string | null, label: "MICHIGAN ROSS — ANN ARBOR" },
    notes: [
      { type: "image" as const, src: "/ch2-side1.jpg" as string | null, label: "SKATE CLUB", caption: "I started a skate club, raised $10k+ and built a community of over 500 members!" },
      { type: "image" as const, src: "/ch2-side2.jpg" as string | null, label: "SOCIAL MEDIA", caption: "I started a social media account breaking down startups, gaining over 100k views!" },
      { type: "image" as const, src: "/ch2-side3.jpg" as string | null, label: "VC INTERNSHIP", caption: "In my VC internship, I built a deal-flow database, screened 50+ startups, informed 2 successful investments and wrote memos for LPs outlining the thesis on them!" },
    ],
  },
  {
    id: "building",
    number: "III",
    label: "BUILDING",
    accent: "#8AAF8E",
    title: "Startups, Strategy, and a Side of Magic",
    paragraphs: [
      "After Michigan I went deep into startups and strategy. At Prophet I worked inside Fortune 500 companies — diagnosing what wasn't working, building what might. Then VC: evaluating early-stage bets, sharpening the pattern-recognition that separates ideas worth betting on from ideas that just sound good.",
      "And then, a slight detour. Magic — the performance kind — became a serious obsession. Weekly sessions with 50+ magicians. A community that sharpened not just sleight of hand, but how to hold a room.",
    ],
    hero: { src: null as null | string, label: "PROPHET — NEW YORK CITY" },
    notes: [
      { type: "stat" as const, stat: "50+", statLabel: "WEEKLY MAGICIANS", caption: "A serious community built around a shared obsession with the impossible." },
      { type: "image" as const, src: null as null | string, label: "MAGIC — PERFORMANCE", caption: "The most underrated lens for understanding attention, surprise, and what people actually remember." },
      { type: "image" as const, src: null as null | string, label: "VISIONOVA", caption: "Breaking down cool startups for people who want to understand what's being built." },
    ],
  },
] as const;

/* ── Flip-reveal image note card ─────────────────────────────────────────── */
function FlipImageCard({ src, label, caption, accent }: { src: string | null; label: string; caption: string; accent: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className="flex flex-col gap-2"
      style={{ flex: "1 1 130px", minWidth: "110px", maxWidth: "200px" }}
    >
      {/* Card container with flip */}
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
            style={{ objectFit: "cover", transition: "filter 0.4s ease", filter: flipped ? "blur(6px) brightness(0.55)" : "none" }}
            sizes="200px"
          />
        ) : (
          <div style={{ position: "absolute", inset: 0, background: "#FBF7EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="font-mono text-center" style={{ fontSize: "6px", letterSpacing: "0.12em", color: "#C49A3C", opacity: 0.38 }}>{label}</span>
          </div>
        )}

        {/* Caption overlay — revealed on flip */}
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
                padding: "16px",
                zIndex: 2,
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  lineHeight: 1.55,
                  color: "#fff",
                  textAlign: "center",
                  fontFamily: "var(--font-dm-sans)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
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
              fontSize: "8px",
              letterSpacing: "0.1em",
              color: "#fff",
              fontFamily: "var(--font-dm-mono)",
              background: "rgba(0,0,0,0.35)",
              padding: "2px 6px",
              borderRadius: "2px",
            }}
            className="font-mono"
          >
            TAP
          </div>
        )}
      </div>

      {/* Label below */}
      <span className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.14em", color: accent, opacity: 0.65 }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ── Image / stat side-note card ─────────────────────────────────────────── */
function NoteCard({
  note,
  accent,
}: {
  note: (typeof CHAPTERS)[number]["notes"][number];
  accent: string;
}) {
  if (note.type === "stat") {
    return (
      <motion.div
        className="flex flex-col gap-1"
        style={{ flex: "1 1 100px", minWidth: "80px", maxWidth: "160px" }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          className="font-display"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(40px, 4.5vw, 58px)",
            fontWeight: 400,
            color: accent,
            lineHeight: 1,
          }}
        >
          {note.stat}
        </div>
        <div
          className="font-mono"
          style={{ fontSize: "7px", letterSpacing: "0.14em", color: "#1C1A14", opacity: 0.4, marginTop: "2px" }}
        >
          {note.statLabel}
        </div>
        <p style={{ fontSize: "11px", lineHeight: 1.55, color: "#1C1A14", opacity: 0.55, marginTop: "6px" }}>
          {note.caption}
        </p>
      </motion.div>
    );
  }

  return <FlipImageCard src={note.src} label={note.label} caption={note.caption} accent={accent} />;
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

  /* Fade content in as this chapter enters the viewport */
  const inStart = Math.max(0, (index - 0.6) / n);
  const inEnd   = (index + 0.2) / n;
  const outStart = (index + 0.65) / n;
  const outEnd   = Math.min(1, (index + 1.2) / n);

  const opacity = useTransform(
    scrollYProgress,
    [inStart, inEnd, outStart, outEnd],
    [index === 0 ? 1 : 0.2, 1, 1, 0.2]
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

      {/* Chapter label row */}
      <div
        className="flex-shrink-0 flex items-center gap-4"
        style={{ padding: "24px 56px 16px" }}
      >
        <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.22em", color: chapter.accent }}>
          CH. {chapter.number}
        </span>
        <div style={{ height: "1px", flex: 1, background: chapter.accent, opacity: 0.22 }} />
        <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#1C1A14", opacity: 0.28 }}>
          {chapter.label}
        </span>
      </div>

      {/* Two-column body */}
      <div
        className="flex-1 min-h-0 grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(24px, 3vw, 56px)",
          padding: "0 56px 28px",
        }}
      >
        {/* LEFT — hero image */}
        <motion.div style={{ opacity }} className="relative min-h-0 flex flex-col">
          <div
            className="flex-1 relative min-h-0"
            style={{
              border: `1px solid rgba(196,154,60,0.38)`,
              background: "#FBF7EE",
              overflow: "hidden",
            }}
          >
            {/* Inner Art Deco frame inset */}
            <div className="absolute" style={{ inset: "10px", border: "1px solid rgba(196,154,60,0.18)", pointerEvents: "none", zIndex: 2 }} />
            {chapter.hero.src ? (
              <Image
                src={chapter.hero.src}
                alt={chapter.hero.label}
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="50vw"
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
          className="flex flex-col justify-center gap-5 min-h-0 py-2"
        >
          <h2
            className="font-display italic leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(26px, 3.5vw, 50px)",
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
                  fontSize: "clamp(13px, 1.15vw, 15px)",
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
          <div
            className="flex gap-5 mt-1"
            style={{ flexWrap: "wrap", borderTop: "1px solid rgba(196,154,60,0.2)", paddingTop: "20px" }}
          >
            {chapter.notes.map((note, i) => (
              <NoteCard key={i} note={note} accent={chapter.accent} />
            ))}
          </div>
        </motion.div>
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

  /* Horizontal track translation: scroll 0→1 moves track 0 → -(n-1)×100vw */
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `${-(n - 1) * 100}vw`]);

  /* Progress bar */
  const progressW = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /* Chapter dot indicators — pre-computed (no hooks in loops) */
  const dot0 = useTransform(scrollYProgress, [0, 0.28, 0.36], [1, 1, 0.25]);
  const dot1 = useTransform(scrollYProgress, [0.28, 0.36, 0.64, 0.72], [0.25, 1, 1, 0.25]);
  const dot2 = useTransform(scrollYProgress, [0.64, 0.72, 1], [0.25, 1, 1]);
  const dotOpacities = [dot0, dot1, dot2];

  const dot0w = useTransform(scrollYProgress, [0, 0.28, 0.36], [20, 20, 6]);
  const dot1w = useTransform(scrollYProgress, [0.28, 0.36, 0.64, 0.72], [6, 20, 20, 6]);
  const dot2w = useTransform(scrollYProgress, [0.64, 0.72, 1], [6, 20, 20]);
  const dotWidths = [dot0w, dot1w, dot2w];

  return (
    <>
      {/* ── Desktop: sticky horizontal scroll ──────────────────────────── */}
      <section
        ref={containerRef}
        id="my-story"
        className="hidden md:block"
        style={{ height: `${n * 100}vh`, position: "relative" }}
      >
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#F2EBD9" }}>

          {/* MY STORY label + scroll hint */}
          <div
            className="absolute top-0 left-0 right-0 flex items-center justify-between pointer-events-none"
            style={{ zIndex: 20, padding: "10px 56px 0" }}
          >
            <span className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.3em", color: "#1C1A14", opacity: 0.18 }}>
              MY STORY
            </span>
            <span className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.2em", color: "#1C1A14", opacity: 0.18 }}>
              SCROLL TO EXPLORE →
            </span>
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

          {/* Chapter dot indicators */}
          <div
            className="absolute flex items-center gap-2"
            style={{ bottom: "20px", left: "56px", zIndex: 20 }}
          >
            {CHAPTERS.map((_, i) => (
              <motion.div
                key={i}
                style={{
                  height: "4px",
                  borderRadius: "2px",
                  background: "#C49A3C",
                  width: dotWidths[i],
                  opacity: dotOpacities[i],
                }}
              />
            ))}
          </div>

          {/* Gold progress line at very bottom */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: "2px", background: "rgba(196,154,60,0.12)", zIndex: 20 }}
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
      <section id="my-story" className="block md:hidden" style={{ background: "#F2EBD9" }}>
        <div style={{ padding: "12px 24px 4px" }}>
          <span className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.3em", color: "#1C1A14", opacity: 0.2 }}>
            MY STORY
          </span>
        </div>
        {CHAPTERS.map((chapter) => (
          <div
            key={chapter.id}
            style={{ borderTop: `1px solid ${chapter.accent}33`, padding: "32px 24px 40px" }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.2em", color: chapter.accent }}>
                CH. {chapter.number}
              </span>
              <div style={{ height: "1px", flex: 1, background: chapter.accent, opacity: 0.2 }} />
            </div>
            {/* Hero image */}
            <div
              style={{ border: "1px solid rgba(196,154,60,0.3)", background: "#FBF7EE", height: "220px", position: "relative", overflow: "hidden", marginBottom: "24px" }}
            >
              {chapter.hero.src ? (
                <Image src={chapter.hero.src} alt={chapter.hero.label} fill style={{ objectFit: "cover", objectPosition: "center top" }} sizes="100vw" />
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
            <div className="flex gap-4 mt-5 flex-wrap">
              {chapter.notes.map((note, i) => (
                <NoteCard key={i} note={note} accent={chapter.accent} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
