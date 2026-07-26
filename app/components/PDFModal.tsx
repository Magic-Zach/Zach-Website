"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function PDFModal({ url, onClose }: { url: string; onClose: () => void }) {
  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[200] flex flex-col"
      style={{ background: "rgba(28,26,20,0.92)" }}
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between"
        style={{ padding: "16px 24px", borderBottom: "1px solid rgba(196,154,60,0.25)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#C49A3C" }}>
          RESUME
        </span>
        <div className="flex items-center gap-4">
          <a
            href={url}
            download="Zach_Lipkin_Resume.pdf"
            className="font-mono inline-flex items-center gap-2"
            style={{
              fontSize: "10px",
              letterSpacing: "0.16em",
              color: "#C49A3C",
              textDecoration: "none",
              border: "1px solid rgba(196,154,60,0.45)",
              padding: "8px 18px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(196,154,60,0.12)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            DOWNLOAD ↓
          </a>
          <button
            onClick={onClose}
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.16em",
              color: "#C49A3C",
              background: "transparent",
              border: "1px solid rgba(196,154,60,0.3)",
              padding: "8px 14px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.7)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(196,154,60,0.3)"; }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* PDF iframe */}
      <div className="flex-1 min-h-0" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`${url}#toolbar=0`}
          title="Resume PDF"
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
        />
      </div>
    </motion.div>
  );
}
