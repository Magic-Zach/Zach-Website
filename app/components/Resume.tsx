"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";

const RESUME_URL = "/resume.pdf";

/* Lazy-load the modal so the PDF iframe isn't part of the initial bundle */
const PDFModal = dynamic(() => import("./PDFModal"), { ssr: false });

/* ── Decorative document thumbnail ──────────────────────────────────────── */
function ResumeThumbnail() {
  return (
    <div
      style={{
        width: "clamp(200px, 28vw, 320px)",
        aspectRatio: "8.5/11",
        background: "#FDFAF4",
        border: "1px solid rgba(196,154,60,0.45)",
        position: "relative",
        boxShadow: "4px 6px 24px rgba(28,26,20,0.14)",
        overflow: "hidden",
      }}
    >
      {/* Inner frame */}
      <div style={{ position: "absolute", inset: "10px", border: "1px solid rgba(196,154,60,0.18)", pointerEvents: "none" }} />

      {/* Corner marks */}
      {[
        { top: 0, left: 0, borderTop: "2px solid #C49A3C", borderLeft: "2px solid #C49A3C" },
        { top: 0, right: 0, borderTop: "2px solid #C49A3C", borderRight: "2px solid #C49A3C" },
        { bottom: 0, left: 0, borderBottom: "2px solid #C49A3C", borderLeft: "2px solid #C49A3C" },
        { bottom: 0, right: 0, borderBottom: "2px solid #C49A3C", borderRight: "2px solid #C49A3C" },
      ].map((s, i) => (
        <div key={i} style={{ position: "absolute", width: "10px", height: "10px", ...s }} />
      ))}

      {/* Simulated document content */}
      <div style={{ padding: "10% 12%", display: "flex", flexDirection: "column", gap: "6%" }}>
        {/* Name block */}
        <div style={{ marginBottom: "2%" }}>
          <div style={{ height: "clamp(6px,1.4%,14px)", background: "#1C1A14", width: "70%", marginBottom: "4px", opacity: 0.85 }} />
          <div style={{ height: "clamp(3px,0.7%,7px)", background: "#C49A3C", width: "45%", opacity: 0.6 }} />
        </div>
        {/* Gold rule */}
        <div style={{ height: "1px", background: "rgba(196,154,60,0.5)", marginBottom: "2%" }} />
        {/* Text lines */}
        {[90, 75, 80, 60, 85, 70, 55, 78, 65, 88, 72, 58].map((w, i) => (
          <div key={i} style={{ height: "clamp(2px,0.55%,5px)", background: "#1C1A14", width: `${w}%`, opacity: 0.18 + (i % 3) * 0.06 }} />
        ))}
        {/* Second section */}
        <div style={{ height: "clamp(4px,0.9%,9px)", background: "#1C1A14", width: "40%", opacity: 0.55, marginTop: "3%" }} />
        {[82, 68, 75, 90, 60, 72].map((w, i) => (
          <div key={i} style={{ height: "clamp(2px,0.55%,5px)", background: "#1C1A14", width: `${w}%`, opacity: 0.14 + (i % 2) * 0.06 }} />
        ))}
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleOpen = () => {
    if (isMobile) {
      window.open(RESUME_URL, "_blank", "noopener,noreferrer");
    } else {
      setOpen(true);
    }
  };

  const anim = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="resume" style={{ background: "#F2EBD9", padding: "80px 0 96px" }}>
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
          RESUME
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
          Background, in full.
        </motion.h2>

        <motion.p
          {...anim(0.12)}
          style={{
            fontSize: "15px",
            lineHeight: 1.65,
            color: "#1C1A14",
            opacity: 0.6,
            maxWidth: "460px",
            marginBottom: "52px",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          Click to view or download. Opens in a new tab on mobile.
        </motion.p>

        {/* Thumbnail + CTA */}
        <motion.div {...anim(0.18)} className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
          <motion.button
            onClick={handleOpen}
            style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
            whileHover={reduced ? {} : { y: -4, boxShadow: "6px 10px 32px rgba(28,26,20,0.2)" }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            aria-label="View resume"
          >
            <ResumeThumbnail />
          </motion.button>

          <div className="flex flex-col gap-4">
            <button
              onClick={handleOpen}
              className="font-mono inline-flex items-center gap-3"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "#C49A3C",
                background: "transparent",
                border: "1px solid rgba(196,154,60,0.5)",
                padding: "14px 28px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#FBF7EE";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.85)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.5)";
              }}
            >
              VIEW RESUME →
            </button>

            <a
              href={RESUME_URL}
              download="Zach_Lipkin_Resume.pdf"
              className="font-mono inline-flex items-center gap-2"
              style={{
                fontSize: "9px",
                letterSpacing: "0.14em",
                color: "#1C1A14",
                opacity: 0.45,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.45"; }}
            >
              ↓ DOWNLOAD PDF
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modal (desktop only) */}
      <AnimatePresence>
        {open && <PDFModal url={RESUME_URL} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </section>
  );
}
