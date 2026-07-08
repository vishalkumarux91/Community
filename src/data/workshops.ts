/**
 * Workshops — the front door + the proof for the community.
 *
 * MVP carries a single live workshop. When more are added, drop them
 * into WORKSHOPS and the listing / homepage card automatically picks
 * up the next UPCOMING.
 *
 * Mock data only — replace with DB queries when the schema lands.
 */

export type WorkshopStatus = "UPCOMING" | "PAST";

export type RubricCriterion = {
  key: string;
  label: string;
  hint?: string;
};

export type Assignment = {
  id: string;
  brief: string;
  /** RPS edits these per-assignment; default is the four-criterion set. */
  rubric: RubricCriterion[];
  /** ISO string or null when no due date is set. */
  dueAt: string | null;
};

export type Trainer = {
  name: string;
  role: string;
  /** Avatar image URL. */
  avatar: string;
  /** One-line bio shown under the name. */
  bio?: string;
};

export type AgendaItem = {
  /** e.g. "0–15 min" — optional relative marker. */
  duration?: string;
  title: string;
  detail?: string;
};

export type Workshop = {
  id: string;
  slug: string;
  title: string;
  host: string;
  hostRole: string;
  /** ~2 sentence pitch — shows on the listing card + above-the-fold on detail. */
  description: string;
  /** ~3 sentence longer pitch — shows on the detail page body. */
  longDescription?: string;
  /** What the attendee will walk away having built. */
  deliverable: string;
  /** ISO string. */
  datetime: string;
  durationMin: number;
  status: WorkshopStatus;
  /** Sent to registrants for upcoming sessions (e.g. Zoom/Meet/Luma). */
  joinUrl?: string;
  /** Set once the live session is recorded + uploaded. */
  recordingUrl?: string;
  /** Comma-separated topic tags shown on the card. */
  tags: string[];
  /** Cover image — landscape, ~16:9. Used on listing + detail hero. */
  heroImage: string;
  /** Who the workshop is aimed at — bullet points on the detail page. */
  audience?: string[];
  /** Running order for the live session. */
  agenda?: AgendaItem[];
  /** People running the session. Falls back to host/hostRole when unset. */
  trainers?: Trainer[];
  /** Attached assignment (workshops can have at most one). */
  assignment?: Assignment;
};

/**
 * Default 4-criterion rubric for a UI assignment. RPS can override per
 * assignment; the structure here is what the AI scorer will eventually
 * read against.
 */
export const DEFAULT_RUBRIC: RubricCriterion[] = [
  { key: "hierarchy", label: "Hierarchy", hint: "Is the most important thing the most legible?" },
  { key: "consistency", label: "System / consistency", hint: "Tokens, spacing, naming — does the work scale?" },
  { key: "states", label: "Real-world states", hint: "Empty / loading / error / overflow covered?" },
  { key: "handoff", label: "Handoff-readiness", hint: "Could an engineer build this without asking?" },
];

export const WORKSHOPS: Workshop[] = [
  {
    id: "w-001",
    slug: "ship-with-claude",
    title: "Ship client-ready sites with Claude",
    host: "Vineet Chopdekar",
    hostRole: "Principle designer · RPS Studio",
    description:
      "A live build session: take a brief, prompt Claude through structure, ship a responsive marketing site by the end of the hour.",
    longDescription:
      "We'll start from a real client brief and design + ship a one-page marketing site live, using Claude as a pairing partner. You'll see prompt patterns for layout, copy, and component generation — and where to step back in by hand.",
    deliverable:
      "A live, responsive marketing one-pager — your own brief, your own copy, shipped on Vercel.",
    datetime: "2026-07-15T15:00:00.000Z",
    durationMin: 90,
    status: "UPCOMING",
    tags: ["AI", "Web", "Live build"],
    heroImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    audience: [
      "Early-career product & UI designers who want to ship, not just mock up.",
      "Career switchers from graphic, web, or visual design moving into product.",
      "Designers curious about using AI as a real pairing partner, not a gimmick.",
      "Anyone who has a brief but freezes at the blank-canvas moment.",
    ],
    agenda: [
      {
        duration: "0–10 min",
        title: "The brief & the plan",
        detail:
          "We read a real client brief together and break it into a build plan — structure, sections, and what 'done' looks like.",
      },
      {
        duration: "10–35 min",
        title: "Prompt the structure",
        detail:
          "Live-prompt Claude through layout and component scaffolding. You'll learn the prompt patterns that actually hold up.",
      },
      {
        duration: "35–65 min",
        title: "Copy, polish & step back in",
        detail:
          "Generate copy, then take the wheel by hand — spacing, microcopy, and the dark-mode palette where taste beats automation.",
      },
      {
        duration: "65–85 min",
        title: "Ship it on Vercel",
        detail:
          "Deploy the responsive one-pager live and get a URL you can share the moment the session ends.",
      },
      {
        duration: "85–90 min",
        title: "The assignment & Q&A",
        detail:
          "Walk through the take-home assignment and how the RPS Studio assessment works.",
      },
    ],
    trainers: [
      {
        name: "Vineet Chopdekar",
        role: "Principal Designer",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        bio: "15+ years shipping product & brand work; leads craft at RPS Studio.",
      },
      {
        name: "Vivin Richard",
        role: "Design Manager",
        avatar: "https://randomuser.me/api/portraits/men/85.jpg",
        bio: "Runs the community program and mentors early-career designers.",
      },
    ],
    assignment: {
      id: "a-001",
      brief:
        "Pick a real (or fictional) client brief and ship a one-page marketing site. Submit the live URL + a 2-paragraph note on the prompts you reused vs. the moments you stepped in by hand. Anything from a portfolio site to a small SaaS landing is fair game.",
      rubric: DEFAULT_RUBRIC,
      dueAt: "2026-07-29T23:59:00.000Z",
    },
  },
  {
    id: "w-002",
    slug: "figma-file-hygiene",
    title: "Figma file hygiene for real teams",
    host: "Vineet Chopdekar",
    hostRole: "Principle designer · RPS Studio",
    description:
      "Restructure a messy production Figma file live — pages, components, naming — so any teammate can find their way in under a minute.",
    deliverable:
      "A restructured Figma file using the four-page layout: Cover, System, WIP, Archive.",
    datetime: "2026-06-10T15:00:00.000Z",
    durationMin: 60,
    status: "PAST",
    tags: ["Figma", "Systems"],
    heroImage:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    assignment: {
      id: "a-003",
      brief:
        "Restructure one of your own Figma files using the four-page layout from the session. Submit the file link + a short note on what moved where.",
      rubric: DEFAULT_RUBRIC,
      dueAt: "2026-06-24T23:59:00.000Z",
    },
  },
  {
    id: "w-003",
    slug: "design-handoff-that-sticks",
    title: "Design handoff that sticks",
    host: "Vivin Richard",
    hostRole: "Design Manager · RPS Studio",
    description:
      "Turn a finished screen into a spec an engineer can build from without a single follow-up question.",
    deliverable:
      "A handoff-ready Figma frame with tokens, states, and annotations engineers can build straight from.",
    datetime: "2026-07-01T15:00:00.000Z",
    durationMin: 60,
    status: "PAST",
    tags: ["Handoff", "Systems"],
    heroImage:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    assignment: {
      id: "a-004",
      brief:
        "Take one screen you've designed and produce a handoff spec: tokens, spacing, every interactive state, and edge cases. Submit the Figma link + a short note on what an engineer would still need to ask.",
      rubric: DEFAULT_RUBRIC,
      dueAt: "2026-07-15T23:59:00.000Z",
    },
  },
];

/**
 * Workshops the current member is enrolled in — stubbed until the DB
 * lands. Drives the dashboard's "My workshops" list.
 */
export const MY_ENROLLMENTS = [
  "ship-with-claude",
  "figma-file-hygiene",
  "design-handoff-that-sticks",
];

export function enrolledWorkshops(): Workshop[] {
  return MY_ENROLLMENTS.map((slug) => findWorkshop(slug)).filter(
    (w): w is Workshop => Boolean(w),
  );
}

export function findWorkshop(slug: string): Workshop | undefined {
  return WORKSHOPS.find((w) => w.slug === slug);
}

export function upcomingWorkshops(): Workshop[] {
  return WORKSHOPS.filter((w) => w.status === "UPCOMING").sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
  );
}

/** Convenience for surfaces that show a single hero workshop. */
export function nextWorkshop(): Workshop | undefined {
  return upcomingWorkshops()[0];
}
