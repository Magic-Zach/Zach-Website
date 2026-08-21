# Learnings

- **No shared page container.** Different sections use different max-width/padding
  conventions (Nav was `max-w-7xl mx-auto px-6`, Hero is `max-w-6xl px-10 sm:px-16`,
  MyStory panels/header use a flat `56px` from the viewport edge, Resume uses
  `maxWidth: 1152px` + `padding: 0 56px`). The de facto dominant gutter is **56px
  desktop / 24px mobile, full-bleed (no max-width, no mx-auto)** — that's what
  MyStory and Resume use. When aligning a new section to the rest of the page,
  match that rhythm rather than centering a max-width box.

- **`Hero.tsx`'s `NameDisplay`** sits in a `flex-1` column with an SVG using
  `preserveAspectRatio="none"` and `textLength="1000"` — it stretches to fill
  whatever height its container gets. Never add a sibling inside that same
  flex column (it will visibly squash/stretch the name). Add new content below
  the whole `flex flex-col md:flex-row` row instead, and grow the section's
  `paddingBottom` if more vertical room is needed — never touch the row itself.

- **Chapter data lives in `app/data/chapters.ts`** (`CHAPTERS`, `TRANSITIONS`,
  `chapterProgress()`), not inline in `MyStory.tsx` — it's also consumed by
  `Nav.tsx` for the Story dropdown/mobile submenu. If you add/reorder/remove a
  chapter, update it there; `TRANSITIONS` is hand-tuned per chapter for the
  desktop horizontal-scroll dwell points, so a 4th chapter needs a 3rd entry.

- **Nav active-section highlighting** is IntersectionObserver-driven and will
  mis-highlight when two `id`s sit close together on screen (e.g. `#resume`
  and `#contact` in the same viewport). `Nav.tsx`'s `handleLink`/`handleChapterLink`
  now "pin" `active` to the clicked link until `scrollend` (or a 900ms fallback)
  fires, so the observer doesn't immediately override it mid-scroll. Keep that
  pin pattern if more sections get added close together.
