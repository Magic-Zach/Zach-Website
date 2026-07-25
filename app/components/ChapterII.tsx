"use client";

/* Chapter II — Ross, Psychology, and 500 Skateboarders.
   Accent color: Baby Blue #7FB3D3 */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import GoldDivider from "./ui/GoldDivider";
import ChapterLabel from "./ui/ChapterLabel";

const BLUE = "#7FB3D3";

export default function ChapterII() {
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
    <section id="chapter-ii" className="py-24 sm:py-32" style={{ background: "#FBF7EE" }}>
      <GoldDivider className="max-w-4xl mx-auto px-6 mb-20" />

      <div ref={ref} className="max-w-2xl mx-auto px-6">
        {/* Chapter label */}
        <motion.div {...anim(0)} className="mb-6">
          <ChapterLabel number="Ch. II" color={BLUE} />
        </motion.div>

        {/* Title */}
        <motion.h2
          {...anim(0.08)}
          className="font-display italic mb-10 leading-tight"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(36px, 6vw, 56px)",
            fontWeight: 400,
            color: "#1C1A14",
          }}
        >
          Ross, Psychology,
          <br />
          and 500 Skateboarders
        </motion.h2>

        {/* Body copy */}
        <motion.div {...anim(0.16)} className="space-y-5 text-base leading-relaxed" style={{ color: "#1C1A14", opacity: 0.82 }}>
          <p>
            At Michigan, I studied business and psychology — one to understand
            systems, the other to understand the people inside them. Psychology
            kept raising better questions than it answered. Why do people make
            the choices they make? What lies beneath behavior — in chemistry,
            in physics, in the mechanics of how brains work? I still don't have
            clean answers, which is maybe why I kept asking.
          </p>
          <p>
            The skateboarding club started because there was no space for it.
            So I built one. What began as a handful of people with boards and
            nowhere to go grew to something none of us expected.
          </p>
        </motion.div>

        {/* 500+ data moment */}
        <motion.div {...anim(0.26)} className="mt-14 mb-10">
          <div className="flex items-baseline gap-3">
            <span
              className="font-display leading-none"
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(72px, 14vw, 96px)",
                fontWeight: 300,
                color: BLUE,
                lineHeight: 1,
              }}
            >
              500+
            </span>
          </div>
          <p
            className="font-mono mt-1"
            style={{
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#1C1A14",
              opacity: 0.45,
            }}
          >
            SKATEBOARDERS IN THE CLUB
          </p>
        </motion.div>

        <motion.div {...anim(0.34)} className="space-y-5 text-base leading-relaxed" style={{ color: "#1C1A14", opacity: 0.82 }}>
          <p>
            I learned that building communities isn't that different from
            building anything else: you find the gap, show up for it
            consistently, and make it easy for others to join. The skateboarding
            club taught me more about growth and operations than any case study.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
