"use client";

/* Fixed top navigation bar — parchment background, 1px gold bottom border.
   Active section link underlined in gold, determined by IntersectionObserver. */

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CHAPTERS, chapterProgress } from "../data/chapters";

const NAV_LINKS = [
  { label: "Intro",   href: "#hero" },
  { label: "Story",   href: "#my-story" },
  { label: "Resume",  href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

/* Scroll to a specific chapter — desktop story is a 300vh sticky horizontal
   track, so we compute the scroll offset that lands on that chapter's dwell
   point; mobile chapters are stacked, so a plain scrollIntoView on their id
   (added in MyStory's mobile branch) works. */
function scrollToChapter(chapterId: string, index: number, smooth: boolean) {
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  if (isDesktop) {
    const section = document.getElementById("story-track");
    if (!section) return;
    const top = section.offsetTop + chapterProgress(index) * (section.offsetHeight - window.innerHeight);
    window.scrollTo({ top, behavior: smooth ? "smooth" : "auto" });
  } else {
    document.getElementById(`ch-${chapterId}`)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
  }
}

export default function Nav() {
  const [active, setActive]     = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState<number | null>(null);
  const pinnedRef = useRef(false);
  const pinTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const storyWrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  /* Measure the dropdown's top offset directly from the header's actual
     rendered bottom border, rather than relying on a CSS percentage-height
     chain to land exactly on it — guarantees pixel alignment regardless of
     any flex/box-model quirk in how the Story link's wrapper sizes itself. */
  useEffect(() => {
    if (!storyOpen) return;
    const measure = () => {
      if (!headerRef.current || !storyWrapperRef.current) return;
      const headerBottom = headerRef.current.getBoundingClientRect().bottom;
      const wrapperTop = storyWrapperRef.current.getBoundingClientRect().top;
      setDropdownTop(headerBottom - wrapperTop);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [storyOpen]);

  /* Track scroll position for backdrop */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* IntersectionObserver — whichever section is most visible wins, unless a
     click just pinned `active` (see handleLink) */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting && !pinnedRef.current) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    setActive(id);
    pinnedRef.current = true;
    if (pinTimerRef.current) clearTimeout(pinTimerRef.current);

    const release = () => {
      pinnedRef.current = false;
      window.removeEventListener("scrollend", release);
      if (pinTimerRef.current) clearTimeout(pinTimerRef.current);
    };
    window.addEventListener("scrollend", release, { once: true });
    pinTimerRef.current = setTimeout(release, 900);

    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChapterLink = (chapterId: string, index: number) => {
    setMenuOpen(false);
    setStoryOpen(false);
    setActive("my-story");
    pinnedRef.current = true;
    if (pinTimerRef.current) clearTimeout(pinTimerRef.current);

    const release = () => {
      pinnedRef.current = false;
      window.removeEventListener("scrollend", release);
      if (pinTimerRef.current) clearTimeout(pinTimerRef.current);
    };
    window.addEventListener("scrollend", release, { once: true });
    pinTimerRef.current = setTimeout(release, 900);

    scrollToChapter(chapterId, index, !prefersReducedMotion);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(242, 235, 217, 0.96)"
            : "rgba(242, 235, 217, 0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #C49A3C",
        }}
      >
        <div className="w-full px-6 md:px-14 h-14 flex items-center justify-between">
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
          <nav className="hidden md:flex items-center gap-8 h-full" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = active === id;
              const isStory = id === "my-story";
              const linkEl = (
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

              if (!isStory) {
                return (
                  <div key={link.href} className="relative flex items-center h-full">
                    {linkEl}
                  </div>
                );
              }

              return (
                <div
                  key={link.href}
                  ref={storyWrapperRef}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => setStoryOpen(true)}
                  onMouseLeave={() => setStoryOpen(false)}
                  onFocus={() => setStoryOpen(true)}
                  onBlur={() => setStoryOpen(false)}
                  onKeyDown={(e) => { if (e.key === "Escape") setStoryOpen(false); }}
                >
                  {linkEl}
                  <AnimatePresence>
                    {storyOpen && dropdownTop !== null && (
                      <motion.div
                        initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 flex flex-col items-start"
                        style={{
                          top: dropdownTop,
                          background: "linear-gradient(to bottom, rgba(242,235,217,0.97), rgba(242,235,217,0.88))",
                          border: "1px solid rgba(196,154,60,0.3)",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                          paddingLeft: "14px",
                          paddingRight: "14px",
                          width: "max-content",
                          zIndex: 50,
                        }}
                      >
                        <div style={{ width: "100%", height: "1px", background: "rgba(196,154,60,0.35)", marginBottom: "2px" }} />
                        {CHAPTERS.map((chapter, i) => (
                          <a
                            key={chapter.id}
                            href={`#my-story`}
                            onClick={(e) => { e.preventDefault(); handleChapterLink(chapter.id, i); }}
                            className="font-mono text-[10px] tracking-[0.12em] uppercase transition-colors duration-200"
                            style={{ color: "#1C1A14", opacity: 0.55, padding: "7px 0", textAlign: "left", whiteSpace: "nowrap" }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = "#C49A3C"; e.currentTarget.style.opacity = "1"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = "#1C1A14"; e.currentTarget.style.opacity = "0.55"; }}
                          >
                            {`Ch. ${chapter.number}: ${chapter.title}`}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isStory = id === "my-story";
                return (
                  <div key={link.href} className="flex flex-col">
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleLink(link.href); }}
                      className="font-mono text-[11px] tracking-[0.15em] uppercase py-2"
                      style={{ color: "#1C1A14", opacity: 0.65 }}
                    >
                      {link.label}
                    </a>
                    {isStory && (
                      <div className="flex flex-col pl-4">
                        {CHAPTERS.map((chapter, i) => (
                          <a
                            key={chapter.id}
                            href="#my-story"
                            onClick={(e) => { e.preventDefault(); handleChapterLink(chapter.id, i); }}
                            className="font-mono text-[10px] tracking-[0.12em] uppercase py-1.5"
                            style={{ color: "#1C1A14", opacity: 0.5 }}
                          >
                            {`Ch. ${chapter.number}: ${chapter.title}`}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
