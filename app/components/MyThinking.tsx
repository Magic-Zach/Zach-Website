"use client";

/* My Thinking — Substack blog preview section.
   Replace POSTS with real data from your RSS feed, or wire up a Server
   Component to fetch https://[yourhandle].substack.com/feed              */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const SUBSTACK_URL = "https://substack.com/@zachlipkin";

/* ── Placeholder posts — swap with real data from your Substack RSS ─────── */
const POSTS = [
  {
    title: "The Pattern-Matching Skill No One Teaches",
    date: "JUN 2026",
    excerpt:
      "After evaluating early-stage companies, I noticed something: the best investors aren't smarter, they've just seen more patterns. Here's what I learned about building that muscle.",
    href: SUBSTACK_URL,
  },
  {
    title: "Why Magicians Are the Best UX Researchers",
    date: "MAY 2026",
    excerpt:
      "Magic is applied psychology. Every trick is an experiment in attention, expectation, and surprise. What performing taught me about product design.",
    href: SUBSTACK_URL,
  },
  {
    title: "Building Visionova: Automating Startup Coverage",
    date: "MAY 2026",
    excerpt:
      "Six months, 40+ posts, real subscribers. Building an automated content engine from scratch taught me more than any MBA case study.",
    href: SUBSTACK_URL,
  },
];

/* ── Post card ───────────────────────────────────────────────────────────── */
function PostCard({ post, delay }: { post: (typeof POSTS)[number]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  return (
    <motion.a
      ref={ref}
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduced ? {} : { y: -4 }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "28px 24px",
        border: "1px solid rgba(196,154,60,0.28)",
        background: "#FBF7EE",
        textDecoration: "none",
        cursor: "pointer",
        flex: "1 1 240px",
        minWidth: "200px",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.6)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.28)";
      }}
    >
      {/* Gold top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, #C49A3C, transparent)",
          opacity: 0.6,
        }}
      />

      <span
        className="font-mono"
        style={{ fontSize: "8px", letterSpacing: "0.2em", color: "#C49A3C", opacity: 0.7 }}
      >
        {post.date}
      </span>

      <h3
        className="font-display italic"
        style={{
          fontFamily: "var(--font-cormorant)",
          fontSize: "clamp(18px, 2vw, 24px)",
          fontWeight: 400,
          color: "#1C1A14",
          lineHeight: 1.25,
        }}
      >
        {post.title}
      </h3>

      <p
        style={{
          fontSize: "13px",
          lineHeight: 1.65,
          color: "#1C1A14",
          opacity: 0.62,
          flex: 1,
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        {post.excerpt}
      </p>

      <span
        className="font-mono"
        style={{ fontSize: "9px", letterSpacing: "0.14em", color: "#C49A3C" }}
      >
        READ →
      </span>
    </motion.a>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function MyThinking() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const anim = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="my-thinking" style={{ background: "#F2EBD9", padding: "80px 0 96px" }}>
      {/* Gold divider from previous section */}
      <div className="flex items-center" style={{ maxWidth: "1152px", margin: "0 auto 60px", padding: "0 56px" }}>
        <div style={{ height: "1px", flex: 1, background: "rgba(196,154,60,0.35)" }} />
        <svg width="10" height="10" style={{ margin: "0 12px", flexShrink: 0 }}>
          <polygon points="5,0 10,5 5,10 0,5" fill="#C49A3C" />
        </svg>
        <div style={{ height: "1px", flex: 1, background: "rgba(196,154,60,0.35)" }} />
      </div>

      <div ref={ref} style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 56px" }}>
        {/* Header */}
        <motion.p
          {...anim(0)}
          className="font-mono"
          style={{ fontSize: "9px", letterSpacing: "0.28em", color: "#C49A3C", marginBottom: "16px" }}
        >
          MY THINKING
        </motion.p>

        <motion.h2
          {...anim(0.07)}
          className="font-display italic"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 400,
            color: "#1C1A14",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          Writing about what I can't stop thinking about.
        </motion.h2>

        <motion.p
          {...anim(0.12)}
          style={{
            fontSize: "15px",
            lineHeight: 1.65,
            color: "#1C1A14",
            opacity: 0.6,
            maxWidth: "520px",
            marginBottom: "48px",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Startups, technology, psychology, magic, and anything else worth examining carefully.
        </motion.p>

        {/* Post cards */}
        <div className="flex gap-5" style={{ flexWrap: "wrap", marginBottom: "40px" }}>
          {POSTS.map((post, i) => (
            <PostCard key={post.title} post={post} delay={0.08 + i * 0.1} />
          ))}
        </div>

        {/* Subscribe CTA */}
        <motion.div {...anim(0.35)}>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono inline-flex items-center gap-3"
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: "#C49A3C",
              textDecoration: "none",
              border: "1px solid rgba(196,154,60,0.45)",
              padding: "12px 24px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#FBF7EE";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.8)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.45)";
            }}
          >
            SUBSCRIBE ON SUBSTACK →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
