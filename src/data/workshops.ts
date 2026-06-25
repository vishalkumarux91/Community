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
    assignment: {
      id: "a-001",
      brief:
        "Pick a real (or fictional) client brief and ship a one-page marketing site. Submit the live URL + a 2-paragraph note on the prompts you reused vs. the moments you stepped in by hand. Anything from a portfolio site to a small SaaS landing is fair game.",
      rubric: DEFAULT_RUBRIC,
      dueAt: "2026-07-29T23:59:00.000Z",
    },
  },
];

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
