"use client";

/* Contact — minimal, centered, Art Deco framed. */

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import GoldDivider from "./ui/GoldDivider";

const LINKS = [
  { label: "Email",    href: "mailto:zach.lipkin@gmail.com",           display: "zach.lipkin@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/zachlipkin",     display: "linkedin.com/in/zachlipkin" },
  { label: "Substack", href: "https://substack.com/@zachlipkin",       display: "substack.com/@zachlipkin" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  const anim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="contact" className="py-24 sm:py-32" style={{ background: "#FBF7EE" }}>
      <GoldDivider className="max-w-4xl mx-auto px-6 mb-20" />

      <div ref={ref} className="max-w-md mx-auto px-6">
        {/* Framed contact block */}
        <motion.div
          {...anim(0)}
          className="relative p-10 flex flex-col items-center text-center"
          style={{ border: "1px solid rgba(196, 154, 60, 0.5)" }}
        >
          {/* Art Deco corner marks */}
          {[
            { top: 0, left: 0, bt: "2px solid #C49A3C", bl: "2px solid #C49A3C" },
            { top: 0, right: 0, bt: "2px solid #C49A3C", br: "2px solid #C49A3C" },
            { bottom: 0, left: 0, bb: "2px solid #C49A3C", bl: "2px solid #C49A3C" },
            { bottom: 0, right: 0, bb: "2px solid #C49A3C", br: "2px solid #C49A3C" },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute w-4 h-4"
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                bottom: pos.bottom,
                borderTop: pos.bt,
                borderLeft: pos.bl,
                borderBottom: pos.bb,
                borderRight: pos.br,
              }}
            />
          ))}

          {/* Label */}
          <p
            className="font-mono mb-6"
            style={{ fontSize: "9px", letterSpacing: "0.2em", color: "#C49A3C" }}
          >
            CONTACT
          </p>

          {/* Headline */}
          <motion.h2
            {...anim(0.08)}
            className="font-display italic mb-4 leading-tight"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 400,
              color: "#1C1A14",
            }}
          >
            Say hello.
          </motion.h2>

          <motion.p
            {...anim(0.14)}
            className="text-sm leading-relaxed mb-8"
            style={{ color: "#1C1A14", opacity: 0.65 }}
          >
            Always happy to talk startups, magic,
            <br />
            or anything in between.
          </motion.p>

          {/* Links */}
          <motion.div {...anim(0.22)} className="flex flex-col gap-4 w-full">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group flex items-center justify-between px-4 py-3 transition-all duration-200"
                style={{
                  border: "1px solid rgba(196, 154, 60, 0.3)",
                  textDecoration: "none",
                  background: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#F2EBD9";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(196, 154, 60, 0.7)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(196, 154, 60, 0.3)";
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: "9px", letterSpacing: "0.15em", color: "#C49A3C" }}
                >
                  {link.label.toUpperCase()}
                </span>
                <span
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#1C1A14", opacity: 0.6, fontFamily: "var(--font-dm-sans)" }}
                >
                  {link.display}
                </span>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
