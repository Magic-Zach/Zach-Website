# Project Instructions & Conventions

## Boot Instructions
- Before doing any development work, you must read `.claude/learnings.md`.

## Front-End Conventions
- Component Paradigm: Functional React components only.
- Styling: Tailwind utility classes for static/structural layout. Inline `style` objects
  are expected for computed or dynamic values (e.g. `clamp()`, scroll-driven transforms,
  gradients, hover state) — this mix is the established pattern, not a fallback.
- Absolute positioning is allowed for decorative/overlay elements (ornaments, badges,
  trackers) as long as the parent's existing padding/flow already reserves the space.
  Do not add new padding or margin to a parent purely to make room for an
  absolutely-positioned child — reposition within existing whitespace instead.
- When a layout depends on two elements sharing a top edge or height (e.g. grid/flex
  columns), state the intended `alignItems`/`alignSelf` explicitly rather than relying on
  the default, and flag it if changing it would shift visual alignment.
- Never resize, reposition, or change the padding of an existing image or hero element as
  a side effect of an unrelated change — call it out explicitly if a change requires it.
- Gate all animation (Framer Motion or otherwise) behind `useReducedMotion()` (or
  equivalent) with a static fallback.
- Components with separate desktop/mobile branches (e.g. `md:hidden` blocks) must be
  updated together — a desktop-only change is incomplete until the mobile branch is
  checked for drift.

## Learning Loop
- `CLAUDE.md` (this file) is static and human-authored. Do not edit it automatically —
  only change it when the user explicitly asks you to update or rewrite it.
- `.claude/learnings.md` is the continuously-updated record: append project-specific
  feedback, corrections, recurring patterns, and preferences as they're discovered during
  work, without waiting for permission. This is how context compounds across sessions.
- Before making major changes, review `.claude/learnings.md` to apply what's already
  been learned.

## Coding Style
- Prefer focused, minimal changes that directly solve the requested problem.
- Avoid unnecessary refactors unless they clearly improve the stability of the project.
- For larger changes, explain your technical approach before implementing it.

## Safety & Integrity
- Before making significant changes, inspect the existing implementation and explain the approach.
- Preserve all existing functionality unless the requested change explicitly requires modifying it.
- When uncertain about user intent — layout or otherwise — halt and ask clarifying questions before proceeding.