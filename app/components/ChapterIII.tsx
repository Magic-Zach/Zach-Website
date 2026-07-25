"use client";

/* Chapter III — The Startup Obsession.
   Accent color: Sage Green #8AAF8E */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import GoldDivider from "./ui/GoldDivider";
import ChapterLabel from "./ui/ChapterLabel";

const SAGE = "#8AAF8E";

export default function ChapterIII() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="chapter-iii" className="py-24 sm:py-32" style={{ background: "#F2EBD9" }}>
      <GoldDivider className="max-w-4xl mx-auto px-6 mb-20" />

      <div ref={ref} className="max-w-2xl mx-auto px-6">
        {/* Chapter label */}
        <motion.div {...anim(0)} className="mb-6">
          <ChapterLabel number="Ch. III" color={SAGE} />
        </motion.div>

        {/* Title */}
        <motion.h2
          {...anim(0.08)}
          className="font-display italic mb-10 leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(32px, 5.5vw, 52px)",
            fontWeight: 400,
            color: "#1C1A14",
          }}
        >
          Startups Are Building the Future.
          <br />I Wanted In.
        </motion.h2>

        {/* Body copy */}
        <motion.div {...anim(0.16)} className="space-y-5 text-base leading-relaxed mb-14" style={{ color: "#1C1A14", opacity: 0.82 }}>
          <p>
            There's something about startups I can't shake: the fact that small
            teams, with the right insight and relentlessness, can bend the
            trajectory of entire industries. I wanted to be as close to that as
            possible — ideally across many bets at once.
          </p>
          <p>
            Venture capital felt like the answer. One role, access to many futures.
            I interned evaluating early-stage companies and confirmed what I
            suspected: the pattern-matching is the skill, and the only way to
            sharpen it is exposure.
          </p>
        </motion.div>

        {/* Two-column newspaper layout: Visionova + VC */}
        <motion.div
          {...anim(0.26)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-0"
          style={{ border: "1px solid #C49A3C", borderColor: "rgba(196, 154, 60, 0.4)" }}
        >
          {/* Visionova */}
          <div
            className="p-6"
            style={{ borderRight: "1px solid rgba(196, 154, 60, 0.4)" }}
          >
            <p
              className="font-mono mb-3"
              style={{ fontSize: "9px", letterSpacing: "0.2em", color: SAGE }}
            >
              CURRENT PROJECT
            </p>
            <p
              className="font-display italic mb-2"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "22px",
                fontWeight: 500,
                color: "#1C1A14",
              }}
            >
              Visionova
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1C1A14", opacity: 0.65 }}>
              A social account breaking down cool startups for people who want to
              understand what's being built — without the insider jargon. Built
              and currently automating.
            </p>
          </div>

          {/* VC Internship */}
          <div className="p-6">
            <p
              className="font-mono mb-3"
              style={{ fontSize: "9px", letterSpacing: "0.2em", color: SAGE }}
            >
              EXPERIENCE
            </p>
            <p
              className="font-display italic mb-2"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "22px",
                fontWeight: 500,
                color: "#1C1A14",
              }}
            >
              VC Internship
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#1C1A14", opacity: 0.65 }}>
              Evaluating early-stage companies, sharpening the pattern-matching
              that separates ideas worth betting on from ideas that just sound good.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
