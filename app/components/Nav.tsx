"use client";

/* Fixed top navigation bar — parchment background, 1px gold bottom border.
   Active section link underlined in gold, determined by IntersectionObserver. */

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Intro",    href: "#hero" },
  { label: "Story",    href: "#my-story" },
  { label: "Thinking", href: "#my-thinking" },
  { label: "Resume",   href: "#resume" },
  { label: "Contact",  href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function Nav() {
  const [active, setActive]     = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Track scroll position for backdrop */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* IntersectionObserver — whichever section is most visible wins */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(242, 235, 217, 0.96)"
            : "rgba(242, 235, 217, 0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #C49A3C",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Monogram */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLink("#hero"); }}
            className="font-display text-xl font-medium tracking-widest"
            style={{ color: "#C49A3C", fontFamily: "var(--font-cormorant)" }}
          >
            ZL
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
                  className="font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 relative py-1"
                  style={{
                    color: isActive ? "#C49A3C" : "#1C1A14",
                    opacity: isActive ? 1 : 0.55,
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-px"
                      style={{ background: "#C49A3C" }}
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px transition-all duration-300"
                style={{
                  width: "20px",
                  background: "#C49A3C",
                  ...(menuOpen && i === 0
                    ? { transform: "translateY(7px) rotate(45deg)" }
                    : {}),
                  ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                  ...(menuOpen && i === 2
                    ? { transform: "translateY(-7px) rotate(-45deg)" }
                    : {}),
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 left-0 right-0 z-40 md:hidden"
            style={{
              background: "rgba(242, 235, 217, 0.98)",
              backdropFilter: "blur(10px)",
              borderBottom: "1px solid #C49A3C",
            }}
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
                  className="font-mono text-[11px] tracking-[0.15em] uppercase py-2"
                  style={{ color: "#1C1A14", opacity: 0.65 }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
