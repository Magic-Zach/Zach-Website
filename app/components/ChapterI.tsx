"use client";

/* Chapter I — Growing Up in Michigan.
   Accent color: Soft Purple #9B8EC4 */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import GoldDivider from "./ui/GoldDivider";
import ChapterLabel from "./ui/ChapterLabel";

const PURPLE = "#9B8EC4";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export default function ChapterI() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          ...fadeUp(delay),
          animate: inView ? fadeUp(delay).animate : fadeUp(delay).initial,
        };

  return (
    <section id="chapter-i" className="pt-10 pb-24 sm:pt-14 sm:pb-32" style={{ background: "#F2EBD9" }}>
      <GoldDivider className="max-w-4xl mx-auto px-6 mb-20" />

      <div ref={ref} className="max-w-2xl mx-auto px-6">
        {/* Chapter label */}
        <motion.div {...anim(0)} className="mb-6">
          <ChapterLabel number="Ch. I" color={PURPLE} />
        </motion.div>

        {/* Chapter title */}
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
          Curious Kid from Michigan
        </motion.h2>

        {/* Body copy */}
        <motion.div {...anim(0.16)} className="space-y-5 text-base leading-relaxed" style={{ color: "#1C1A14", opacity: 0.82 }}>
          <p>
            I grew up in Michigan, the son of two doctors and the brother of
            another. Medicine was the family language — impact measured in lives
            changed, in diagnoses made, in people sent home healthier than they
            arrived. That ethos of meaningful work never left me.
          </p>
          <p>
            But I couldn't stop noticing the other crises: energy, finance,
            climate, the fragmentation of how people communicate and understand
            each other. Problems at humanity's scale, across every domain. And
            through watching my family, I started to see the pattern: the doctors
            had a system. People organized around a purpose, resources allocated,
            outcomes measured. Business isn't just commerce — it's the underlying
            vehicle for organizing human effort toward any goal that matters.
          </p>
          <p>
            That realization changed what I wanted to study. Not how to treat a
            condition, but how to understand the system that makes it possible.
          </p>
        </motion.div>

        {/* State Championship badge */}
        <motion.div
          {...anim(0.28)}
          className="mt-12 inline-flex flex-col items-center gap-1 px-8 py-5 relative"
          style={{ border: "1px solid #C49A3C" }}
        >
          {/* Diagonal corner marks */}
          <div className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: "2px solid #C49A3C", borderLeft: "2px solid #C49A3C" }} />
          <div className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: "2px solid #C49A3C", borderRight: "2px solid #C49A3C" }} />
          <div className="absolute bottom-0 left-0 w-3 h-3" style={{ borderBottom: "2px solid #C49A3C", borderLeft: "2px solid #C49A3C" }} />
          <div className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: "2px solid #C49A3C", borderRight: "2px solid #C49A3C" }} />

          <span
            className="font-mono"
            style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#C49A3C" }}
          >
            MICHIGAN STATE CHAMPIONS
          </span>
          <span
            className="font-display italic"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "22px",
              fontWeight: 400,
              color: "#1C1A14",
            }}
          >
            Soccer
          </span>
          <span
            className="font-mono"
            style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#C49A3C", opacity: 0.6 }}
          >
            ◆
          </span>
        </motion.div>
      </div>
    </section>
  );
}
