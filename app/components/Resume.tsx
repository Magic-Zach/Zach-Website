"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";

const RESUME_URL = "/Zach_Lipkin_Resume.pdf";

const PDFModal = dynamic(() => import("./PDFModal"), { ssr: false });

const CONTACT_LINKS = [
  { label: "Email",    href: "mailto:zach.lipkin@gmail.com",        display: "zach.lipkin@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zach-lipkin/",  display: "linkedin.com/in/zach-lipkin" },
];

/* ── PDF thumbnail via scaled iframe ────────────────────────────────────────
   The iframe renders the real PDF at ~850px wide (letter width in px),
   then a CSS transform scales it down to fit the container.
   pointer-events:none makes the iframe non-interactive so clicks hit the
   outer button. A "CLICK TO VIEW" badge floats at the bottom.
   ──────────────────────────────────────────────────────────────────────── */
function ResumeThumbnail({ onClick, containerRef, isMobile }: { onClick: () => void; containerRef: React.RefObject<HTMLDivElement | null>; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(260);

  /* Track container width so we can compute the right scale */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [containerRef]);

  /* PDF page is 8.5" × 11" at 96dpi ≈ 816 × 1056px.
     We render the iframe at those native dimensions then scale to fit. */
  const PDF_W = 816;
  const PDF_H = 1056;
  const scale = containerWidth / PDF_W;
  const scaledH = PDF_H * scale;

  /* Mobile: iframe-embedded PDFs render unreliably (esp. iOS Safari — a small
     top-left render on an otherwise blank box). Show a pre-rendered image of the
     resume's first page instead; tapping still opens the real PDF via onClick
     (handleOpen -> window.open). NOTE: public/resume-thumb.png must be
     regenerated (e.g. `sips -s format png public/Zach_Lipkin_Resume.pdf --out
     public/resume-thumb.png`) whenever the resume PDF changes. */
  if (isMobile) {
    return (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
        aria-label="View resume"
        style={{
          width: "100%",
          aspectRatio: "8.5 / 11",
          background: "#fff",
          border: "1px solid rgba(150,112,32,0.75)",
          boxShadow: "0 4px 18px rgba(150,112,32,0.18)",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        <Image
          src="/resume-thumb.png"
          alt="Resume preview"
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          sizes="100vw"
        />
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
          <CornerMarks />
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
          style={{ padding: "10px 0" }}
        >
          <span
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: "#1C1A14",
              background: "rgba(242,235,217,0.95)",
              border: "1px solid rgba(196,154,60,0.45)",
              padding: "4px 12px",
            }}
          >
            TAP TO VIEW
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label="View resume"
      style={{
        width: "100%",
        height: `${scaledH}px`,
        background: "#fff",
        border: "1px solid rgba(150,112,32,0.75)",
        position: "relative",
        boxShadow: hovered
          ? "0 8px 26px rgba(150,112,32,0.26)"
          : "0 4px 18px rgba(150,112,32,0.18)",
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
      }}
    >
      {/* Pre-rendered first page, not a live PDF iframe — the browser's built-in
          PDF viewer draws its own drop-shadow page chrome inside the iframe
          document that no CSS on our side can reach, which at this scale-down
          reads as a heavy black border around the whole box. A static image
          (same asset the mobile branch already uses) avoids that entirely. */}
      <Image
        src="/resume-thumb.png"
        alt="Resume preview"
        fill
        style={{ objectFit: "cover", objectPosition: "top" }}
        sizes="(min-width: 768px) 40vw, 100vw"
      />

      <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
        <CornerMarks />
      </div>

      {/* "CLICK TO VIEW" badge */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "14px",
          background: hovered ? "rgba(28,26,20,0.06)" : "transparent",
          transition: "background 0.22s ease",
        }}
      >
        <span
          className="font-mono"
          style={{
            fontSize: "10px",
            letterSpacing: "0.18em",
            color: "#000000ff",
            background: "rgba(242,235,217,0.95)",
            border: "1px solid rgba(196,154,60,0.45)",
            padding: "4px 12px",
          }}
        >
          CLICK TO VIEW
        </span>
      </div>
    </div>
  );
}

/* ── Art Deco corner marks ───────────────────────────────────────────────── */
function CornerMarks() {
  return (
    <>
      {[
        { top: 0, left: 0, borderTop: "2px solid #C49A3C", borderLeft: "2px solid #C49A3C" },
        { top: 0, right: 0, borderTop: "2px solid #C49A3C", borderRight: "2px solid #C49A3C" },
        { bottom: 0, left: 0, borderBottom: "2px solid #C49A3C", borderLeft: "2px solid #C49A3C" },
        { bottom: 0, right: 0, borderBottom: "2px solid #C49A3C", borderRight: "2px solid #C49A3C" },
      ].map((pos, i) => (
        <div key={i} className="absolute w-4 h-4" style={pos} />
      ))}
    </>
  );
}

/* ── Gold diamond divider ────────────────────────────────────────────────── */
function GoldRule() {
  return (
    <div className="flex items-center" style={{ marginBottom: "56px" }}>
      <div style={{ height: "1px", flex: 1, background: "rgba(196,154,60,0.35)" }} />
      <svg width="10" height="10" style={{ margin: "0 12px", flexShrink: 0 }}>
        <polygon points="5,0 10,5 5,10 0,5" fill="#C49A3C" />
      </svg>
      <div style={{ height: "1px", flex: 1, background: "rgba(196,154,60,0.35)" }} />
    </div>
  );
}

/* ── Combined Resume + Contact section ───────────────────────────────────── */
export default function ResumeAndContact() {
  const sectionRef = useRef(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
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
    <div style={{ background: "#F2EBD9", padding: "clamp(32px, 8vw, 80px) 0 clamp(48px, 10vw, 96px)" }}>
      <div style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 56px" }}>
        <GoldRule />
      </div>

      <div
        ref={sectionRef}
        style={{ maxWidth: "1152px", margin: "0 auto", padding: "0 56px" }}
      >
        {/* Two-column grid — both columns stretch to the same height */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "clamp(48px, 6vw, 96px)", alignItems: "start" }}
        >
          {/* LEFT — Resume: flex column so thumbnail fills remaining height */}
          <div id="resume" style={{ display: "flex", flexDirection: "column", scrollMarginTop: "56px" }}>
            <motion.p
              {...anim(0)}
              className="font-mono"
              style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#C49A3C", marginBottom: "28px" }}
            >
              RESUME
            </motion.p>

            {/* Thumbnail — fills flex space to match contact block height */}
            <motion.div
              {...anim(0.07)}
              ref={thumbnailContainerRef}
              style={{ width: "100%" }}
            >
              <ResumeThumbnail onClick={handleOpen} containerRef={thumbnailContainerRef} isMobile={isMobile} />
            </motion.div>

            <motion.a
              {...anim(0.12)}
              href={RESUME_URL}
              download="Zach_Lipkin_Resume.pdf"
              className="font-mono inline-flex items-center gap-2"
              style={{
                fontSize: "11px",
                letterSpacing: "0.14em",
                color: "#1C1A14",
                opacity: 0.45,
                textDecoration: "none",
                marginTop: "12px",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.45"; }}
            >
              ↓ DOWNLOAD PDF
            </motion.a>
          </div>

          {/* RIGHT — Contact */}
          <div id="contact" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", paddingTop: "4px", scrollMarginTop: "56px" }}>
            <motion.p
              {...anim(0.04)}
              className="font-mono"
              style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#C49A3C", marginBottom: "28px" }}
            >
              CONTACT
            </motion.p>

            <motion.div
              {...anim(0.1)}
              className="relative p-10 flex flex-col"
              style={{ border: "1px solid rgba(196,154,60,0.5)" }}
            >
              <CornerMarks />

              <motion.h2
                {...anim(0.16)}
                className="font-display italic mb-4 leading-tight"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px, 3.5vw, 44px)",
                  fontWeight: 400,
                  color: "#1C1A14",
                }}
              >
                Say hello.
              </motion.h2>

              <motion.p
                {...anim(0.2)}
                className="text-sm leading-relaxed mb-8"
                style={{ color: "#1C1A14", opacity: 0.65, fontFamily: "var(--font-dm-sans)" }}
              >
                Always up for a conversation about startups, innovation, or whatever else you're passionate about.
              </motion.p>

              <motion.div {...anim(0.26)} className="flex flex-col gap-3">
                {CONTACT_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={link.label === "Email" ? "Email Zach Lipkin" : "Zach Lipkin on LinkedIn"}
                    className="group flex items-center justify-between px-4 py-3 transition-all duration-200"
                    style={{
                      border: "1px solid rgba(196,154,60,0.3)",
                      textDecoration: "none",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#EDE7D5";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.7)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.3)";
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.12em", color: "#C49A3C" }}>
                      {link.label.toUpperCase()}
                    </span>
                    <span className="hidden md:inline text-sm" style={{ color: "#1C1A14", opacity: 0.6, fontFamily: "var(--font-dm-sans)" }}>
                      {link.display}
                    </span>
                    <span className="md:hidden" style={{ color: "#C49A3C", opacity: 0.8, fontSize: "14px" }} aria-hidden>
                      →
                    </span>
                  </a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && <PDFModal url={RESUME_URL} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
