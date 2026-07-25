"use client";

/* Chapter IV — Prophet & The Magician.
   Accent color: Warm Slate #6B7A8D
   Two subsections: 4A (Prophet consulting) + 4B (Magic community) */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import GoldDivider from "./ui/GoldDivider";
import ChapterLabel from "./ui/ChapterLabel";

const SLATE = "#6B7A8D";

export default function ChapterIV() {
  const ref = useRef(null);
  const magicRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const magicInView = useInView(magicRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const anim = (inViewState: boolean, delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inViewState ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="chapter-iv" style={{ background: "#FBF7EE" }}>

      {/* ── 4A: Prophet ─────────────────────────────────────────────────── */}
      <div className="py-24 sm:py-32">
        <GoldDivider className="max-w-4xl mx-auto px-6 mb-20" />

        <div ref={ref} className="max-w-2xl mx-auto px-6">
          {/* Label */}
          <motion.div {...anim(inView, 0)} className="mb-6">
            <ChapterLabel number="Ch. IV" color={SLATE} />
          </motion.div>

          {/* Title */}
          <motion.h2
            {...anim(inView, 0.08)}
            className="font-display italic mb-10 leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(32px, 5.5vw, 52px)",
              fontWeight: 400,
              color: "#1C1A14",
            }}
          >
            Building Things That Matter.
          </motion.h2>

          {/* Copy */}
          <motion.div
            {...anim(inView, 0.16)}
            className="space-y-5 text-base leading-relaxed"
            style={{ color: "#1C1A14", opacity: 0.82 }}
          >
            <p>
              After VC, I wanted to go deeper — not evaluate businesses from the
              outside, but work inside them to understand what actually breaks and
              what actually fixes it. Prophet was the answer.
            </p>
            <p>
              As a Business Growth Consultant, I work with Fortune 500 companies
              on innovation strategy and growth — the real, unglamorous work of
              figuring out what to build, who it's for, and how to make it stick
              in markets that don't wait for you to get it right.
            </p>
          </motion.div>

          {/* Pull quote */}
          <motion.blockquote
            {...anim(inView, 0.26)}
            className="mt-10 pl-5"
            style={{ borderLeft: `2px solid ${SLATE}` }}
          >
            <p
              className="font-display italic"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "22px",
                fontWeight: 400,
                color: "#1C1A14",
                opacity: 0.8,
                lineHeight: 1.5,
              }}
            >
              "The move to New York was part of the decision.
              <br />
              The city is its own education."
            </p>
          </motion.blockquote>
        </div>
      </div>

      {/* ── 4B: The Magician ──────────────────────────────────────────────── */}
      <div
        className="py-16 sm:py-20"
        style={{ background: "#F2EBD9", borderTop: "1px solid rgba(196, 154, 60, 0.3)" }}
      >
        <div ref={magicRef} className="max-w-2xl mx-auto px-6">
          {/* Thin gold rule above */}
          <div
            className="mb-10 h-px w-12"
            style={{ background: "#C49A3C", opacity: 0.5 }}
          />

          {/* Sub-label */}
          <motion.p
            {...anim(magicInView, 0)}
            className="font-mono mb-4"
            style={{ fontSize: "9px", letterSpacing: "0.2em", color: SLATE }}
          >
            AND THEN, A SLIGHT DETOUR →
          </motion.p>

          {/* Sub-title */}
          <motion.h3
            {...anim(magicInView, 0.08)}
            className="font-display italic mb-8 leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 400,
              color: "#1C1A14",
            }}
          >
            And Learning to Vanish.
          </motion.h3>

          {/* Card fan icon */}
          <motion.div
            {...anim(magicInView, 0.12)}
            className="mb-8"
            style={{ color: "#C49A3C", width: "72px", opacity: 0.7 }}
          >
            <svg viewBox="0 0 72 56" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
              <g transform="rotate(-18, 20, 44)">
                <rect x="4" y="8" width="28" height="40" rx="2" />
              </g>
              <rect x="22" y="8" width="28" height="40" rx="2" />
              <text x="26" y="24" fontSize="10" fontFamily="serif" fill="currentColor" stroke="none">A</text>
              <g transform="rotate(18, 52, 44)">
                <rect x="40" y="8" width="28" height="40" rx="2" />
              </g>
            </svg>
          </motion.div>

          {/* Copy */}
          <motion.div
            {...anim(magicInView, 0.18)}
            className="space-y-5 text-base leading-relaxed"
            style={{ color: "#1C1A14", opacity: 0.82 }}
          >
            <p>
              Inspired to challenge comfort zones and explore storytelling, I
              became a magician. Not because I wanted a party trick, but because
              magic is one of the most direct ways to create a genuine moment of
              human connection. You have someone's complete attention. They're
              uncertain, delighted, disarmed. I became fascinated by what that
              moment reveals about trust, attention, and the architecture of
              surprise.
            </p>
            <p>
              I started a weekly magician community in New York City. Performers,
              engineers who do card magic on weekends, curious novices. It became
              one of the stranger and more meaningful things I've built.
            </p>
          </motion.div>

          {/* 50+ stat */}
          <motion.div {...anim(magicInView, 0.28)} className="mt-10">
            <span
              className="font-display"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(48px, 10vw, 72px)",
                fontWeight: 300,
                color: SLATE,
                lineHeight: 1,
              }}
            >
              50+
            </span>
            <p
              className="font-mono mt-1"
              style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#1C1A14", opacity: 0.4 }}
            >
              WEEKLY MAGICIANS IN NYC
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
