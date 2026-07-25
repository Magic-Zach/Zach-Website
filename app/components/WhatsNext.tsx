"use client";

/* What's Next — airy, door-opening section with Substack preview card */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import GoldDivider from "./ui/GoldDivider";

export default function WhatsNext() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="whats-next" className="py-24 sm:py-32" style={{ background: "#F2EBD9" }}>
      <GoldDivider className="max-w-4xl mx-auto px-6 mb-20" />

      <div ref={ref} className="max-w-2xl mx-auto px-6">
        {/* Label */}
        <motion.p
          {...anim(0)}
          className="font-mono mb-6"
          style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#C49A3C" }}
        >
          WHAT'S NEXT
        </motion.p>

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
          Still Building.
        </motion.h2>

        {/* Copy */}
        <motion.div {...anim(0.16)} className="space-y-5 text-base leading-relaxed mb-12" style={{ color: "#1C1A14", opacity: 0.82 }}>
          <p>
            I'm continuing to explore startups, technology, and what's emerging
            at the intersection of both. The problems worth solving keep
            multiplying, and the tools available to solve them keep getting
            stranger and more powerful.
          </p>
          <p>
            I write about what I'm discovering — current thinking, half-formed
            ideas, startups worth knowing about, and the occasional digression
            into magic, psychology, or whatever I can't stop thinking about this
            week.
          </p>
        </motion.div>

        {/* Substack preview card */}
        <motion.a
          {...anim(0.26)}
          href="https://substack.com/@zachlipkin"
          target="_blank"
          rel="noopener noreferrer"
          className="block group transition-all duration-200"
          style={{
            border: "1px solid rgba(196, 154, 60, 0.5)",
            background: "#FBF7EE",
            textDecoration: "none",
          }}
          whileHover={prefersReducedMotion ? {} : { y: -3 }}
        >
          <div className="p-6">
            <p
              className="font-mono mb-3"
              style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#C49A3C" }}
            >
              SUBSTACK
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
              Dispatches from Curiosity
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#1C1A14", opacity: 0.65 }}>
              Essays, notes, and discoveries from someone who can't stop asking
              questions. Subscribe for occasional writing worth reading.
            </p>
            <span
              className="font-mono text-xs transition-colors duration-200"
              style={{
                fontSize: "10px",
                letterSpacing: "0.12em",
                color: "#C49A3C",
              }}
            >
              Subscribe →
            </span>
          </div>
          {/* Bottom gold accent line */}
          <div
            className="h-px"
            style={{
              background: "linear-gradient(90deg, #C49A3C, transparent)",
              opacity: 0.5,
            }}
          />
        </motion.a>
      </div>
    </section>
  );
}
