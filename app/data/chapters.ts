/* Chapter content data — shared between MyStory (renders the chapters) and
   Nav (Story dropdown links into them). heroSrc / noteSrc fields: replace
   null with the imported image path once you have photos. The placeholder
   labels show what image belongs there. */

export const CHAPTERS = [
  {
    id: "growing-up",
    number: "I",
    label: "GROWING UP",
    accent: "#c49a3cff",
    title: "Growing Up Curious",
    paragraphs: [
      "I grew up in a pretty suburb of Detroit, Michigan, in a family of doctors. Seeing that my parents saved lives… I wanted to have a meaningful impact too.",
      "I've always been drawn to the foundational, human-level things like health, energy, financial wellbeing, and fun, but I couldn't choose just one, because they all mattered and I didn't want to ignore any.",
      "Then I discovered what business was. Not just money and suits, but the way people and resources organize around a vision to make it real, driving change across all these areas and around the world.",
    ],
    hero: { src: "/ch1-main.png" as string | null, label: "MICHIGAN — EARLY YEARS", objectPosition: "center top" },
    notes: [
      { type: "image" as const, src: "/ch1-side1.jpg" as string | null, label: "SOCCER CHAMPIONSHIP", caption: "Played soccer growing up, finishing with a state championship my senior year of high school.", objectPosition: undefined as string | undefined },
      { type: "image" as const, src: "/ch1-side2.jpeg" as string | null, label: "MUSIC", caption: "Passionate about music, co-creating an original album while learning piano and guitar.", objectPosition: "top" as string | undefined },
    ],
  },
  {
    id: "michigan",
    number: "II",
    label: "MICHIGAN",
    accent: "#c49a3cff",
    title: "Studying Business and Big Ideas",
    paragraphs: [
      "I went on to study business (and psychology) at the University of Michigan's Ross School of Business. I loved learning the fundamentals, and quickly became fascinated by how startups were applying them in creative ways to reimagine what's possible, from computing with human DNA to solving nuclear fusion and teaching machines to reason for themselves.",
      "Inspired by these grand visions, innovative technologies, and daring founders, I built a social media channel with 100k+ views breaking down the coolest startups, and landed a venture capital internship analyzing startup investments and talking directly with entrepreneurs.",
      "But I wanted to do more than analyze these ideas. I wanted to understand how they figure out what to do next, and grow into businesses that reshape entire spaces.",
    ],
    hero: { src: "/ch2-main-v2.png" as string | null, label: "MICHIGAN ROSS — ANN ARBOR", objectPosition: "center top" },
    notes: [
      { type: "image" as const, src: "/ch2-side1.jpg" as string | null, label: "SKATE CLUB", caption: "Founded a skate club and scaled to 600+ members and $10k+ in funding.", objectPosition: undefined as string | undefined },
      { type: "image" as const, src: "/ch2-side2.png" as string | null, label: "STARTUP CONTENT", caption: "Built a social media channel breaking down early-stage innovation to ~100k views, now rebuilding it with AI-automated production.", objectPosition: undefined as string | undefined },
      { type: "image" as const, src: "/ch2-side3.jpg" as string | null, label: "VENTURE INTERNSHIP", caption: "Interned as a VC analyst, building a 150+ startup deal-flow database, running diligence and founder meetings, and authoring LP memos on successful investments.", objectPosition: undefined as string | undefined },
    ],
  },
  {
    id: "building",
    number: "III",
    label: "NOW",
    accent: "#c49a3cff",
    title: "Driving Business Growth and Impact",
    paragraphs: [
      "I moved to New York and became a business growth strategy consultant at Prophet, helping companies grow revenue (as opposed to cutting costs) across markets and geographies, everything from peanuts and biopharma in America to wealth management in Germany.",
      "For the past few years, I've helped Fortune 500 companies innovate and grow by understanding what people need, and figuring out how to meet those needs through unique brand, marketing, and product strategies.",
      "I've learned a ton about how businesses and their leaders think, make decisions, and grow, and I've been excited to apply these learnings alongside AI, building with new tools and finding new ways to create impact for clients.",
    ],
    hero: { src: "/ch3-main.jpg" as string | null, label: "PROPHET — NEW YORK CITY", objectPosition: "center 35%" },
    notes: [
      { type: "image" as const, src: "/ch3-side1.jpeg" as string | null, label: "NYC EXPLORATION", caption: "Always meeting new people and trying new things, from a data science thesis competition to a sword dancing festival and an origami convention.", objectPosition: undefined as string | undefined },
      { type: "image" as const, src: "/ch3-side2.jpeg" as string | null, label: "MAGIC", caption: "Became a magician, engaging live audiences at private events and on the street. This photo is from my gig at a black-tie boxing and ballet gala.", objectPosition: undefined as string | undefined },
      { type: "image" as const, src: "/ch3-side3.jpg" as string | null, label: "ART", caption: "Produced a photography project exploring the tension between corporate and personal identity.", objectPosition: undefined as string | undefined },
    ],
  },
] as const;

/* Horizontal track translation timing (desktop story) — mostly smooth, with
   just a gentle settle at each chapter. Each transition is wide (spans most
   of the segment) and eased so it accelerates/decelerates instead of
   snapping abruptly, with only a brief dwell right at the read-point of
   each chapter.
   Per-transition scroll ranges [start, end], hand-tuned by feel rather than
   derived from a uniform ramp, so each chapter's dwell can be adjusted
   independently:
   - ch I holds only until 0.12, so the track responds soon after you start scrolling
   - ch II gets a real dwell (0.42 → 0.51) so it visibly settles
   - the second transition and the final hold are left exactly as they were
   NOTE: hand-tuned for 3 chapters — extend this array if CHAPTERS grows. */
export const TRANSITIONS: ReadonlyArray<readonly [number, number]> = [
  [0.12, 0.42],
  [0.51, 0.8233],
];

/* Scroll progress (0-1) through the desktop story track at which chapter i
   is settled and readable — the midpoint of its dwell between transitions
   (or, for the first/last chapter, the midpoint of its hold at the start/end). */
export function chapterProgress(i: number): number {
  if (i === 0) return TRANSITIONS[0][0] / 2;
  if (i === CHAPTERS.length - 1) {
    const [, prevEnd] = TRANSITIONS[TRANSITIONS.length - 1];
    return (prevEnd + 1) / 2;
  }
  const [, end] = TRANSITIONS[i - 1];
  const [start] = TRANSITIONS[i];
  return (end + start) / 2;
}
