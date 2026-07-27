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
    label: "NOW",
    accent: "#8AAF8E",
    title: "Strategy, New York, and a Side of Magic",
    paragraphs: [
      "I moved to New York to become a Business Growth Strategy Consultant at Prophet, where we only focus on revenue growth (only the fun stuff… not cutting costs by firing people). For the past few years, I've been helping Fortune 500 companies innovate and grow by understanding what people need, and figuring out how to meet those needs through unique brand, marketing, and product strategies.",
      "I've learned a ton about how businesses and their leaders think, make decisions, and grow (or don't).",
    ],
    hero: { src: "/ch3-main.jpg" as string | null, label: "PROPHET — NEW YORK CITY" },
    notes: [
      { type: "image" as const, src: "/ch3-side1.jpeg" as string | null, label: "NYC LIFE", caption: "I've been loving NYC, meeting new people and trying new things — data science competition, producing an artistic photo project, performing a comedy show, origami convention, dog show, sword dancing festival, piano recital, astronomy lectures, and more." },
      { type: "image" as const, src: "/ch3-side2.jpeg" as string | null, label: "MAGICIAN", caption: "I became a magician, using psychology, storytelling, and improvisation to engage live audiences at private events and on the street. This photo is from my gig at a black-tie boxing and ballet gala." },
    ],
  },
] as const;

/* ── Flip-reveal image note card ─────────────────────────────────────────── */
function FlipImageCard({ src, label, caption, accent }: { src: string | null; label: string; caption: string; accent: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col gap-2" style={{ flex: "1 1 130px", minWidth: "110px", maxWidth: "190px" }}>
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
            style={{ objectFit: "cover", transition: "filter 0.45s ease", filter: flipped ? "blur(5px) brightness(0.38)" : "none" }}
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
                  fontSize: "clamp(11px, 1vw, 13px)",
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
              fontSize: "8px",
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
      <span className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.15em", color: accent }}>
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
  const isLast = index === n - 1;

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

      {/* Chapter label row */}
      <div
        className="flex-shrink-0 flex items-center gap-4"
        style={{ padding: "20px 56px 12px" }}
      >
        <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.22em", color: chapter.accent }}>
          CHAPTER {chapter.number}
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
          padding: "0 56px 24px",
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
              <span className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.22em", color: "#1C1A14", opacity: 0.35, whiteSpace: "nowrap" }}>
                SIDE NOTES
              </span>
              <div style={{ height: "1px", flex: 1, background: "rgba(196,154,60,0.2)" }} />
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
                CHAPTER {chapter.number}
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
            <div style={{ marginTop: "20px" }}>
              <div className="flex items-center gap-3" style={{ marginBottom: "12px" }}>
                <span className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.22em", color: "#1C1A14", opacity: 0.35 }}>
                  SIDE NOTES
                </span>
                <div style={{ height: "1px", flex: 1, background: "rgba(196,154,60,0.2)" }} />
              </div>
              <div className="flex gap-4 flex-wrap">
                {chapter.notes.map((note, i) => (
                  <NoteCard key={i} note={note} accent={chapter.accent} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
