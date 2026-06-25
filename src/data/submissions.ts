/**
 * Submissions + assessments — the member side of the loop and the
 * internal review queue.
 *
 * Mock data only. When the DB lands, these arrays are replaced by
 * queries scoped to the current member (for /me/submissions) and to
 * every submission (for /internal).
 */

import { DEFAULT_RUBRIC, WORKSHOPS, type RubricCriterion } from "./workshops";

export type SubmissionStatus = "SUBMITTED" | "IN_REVIEW" | "ASSESSED";

export type Score = { key: string; score: number; /** 1–5 */ };

export type Assessment = {
  id: string;
  scores: Score[];
  /** Overall summary value — RPS picks the scale; default is the avg of `scores`. */
  overall: string;
  notes?: string;
  reviewedAt: string;
};

export type Submission = {
  id: string;
  assignmentId: string;
  workshopSlug: string;
  /** Member metadata — replaced by a user join when DB lands. */
  memberId: string;
  memberName: string;
  memberRole?: string;
  /** Primary deliverable link. */
  url: string;
  /** Optional uploaded image. */
  imageUrl?: string;
  note?: string;
  status: SubmissionStatus;
  submittedAt: string;
  assessment?: Assessment;
};

export const SUBMISSIONS: Submission[] = [
  {
    id: "s-001",
    assignmentId: "a-003",
    workshopSlug: "figma-file-hygiene",
    memberId: "u-current",
    memberName: "Vivin R.",
    memberRole: "Mid-level designer",
    url: "https://figma.com/file/example/file-hygiene-restructure",
    note:
      "Restructured our marketing-site Figma file using the four-page layout from the session. Cover + System + WIP + Archive. The biggest change was moving every active flow into Components instead of pages.",
    status: "ASSESSED",
    submittedAt: "2026-06-12T14:30:00.000Z",
    assessment: {
      id: "as-001",
      scores: [
        { key: "hierarchy", score: 4 },
        { key: "consistency", score: 5 },
        { key: "states", score: 3 },
        { key: "handoff", score: 4 },
      ],
      overall: "4 / 5",
      notes:
        "Great restructure. Hierarchy + system are strong; some empty / error states would round it out. Handoff is clear.",
      reviewedAt: "2026-06-14T11:00:00.000Z",
    },
  },
  {
    id: "s-002",
    assignmentId: "a-001",
    workshopSlug: "ship-with-claude",
    memberId: "u-current",
    memberName: "Vivin R.",
    memberRole: "Mid-level designer",
    url: "https://my-claude-site.vercel.app",
    note:
      "Marketing site for a fictional consulting brief. Prompted Claude through layout and copy; stepped in for spacing, microcopy on the CTAs, and the dark-mode palette.",
    status: "IN_REVIEW",
    submittedAt: "2026-07-18T09:00:00.000Z",
  },
  {
    id: "s-003",
    assignmentId: "a-001",
    workshopSlug: "ship-with-claude",
    memberId: "u-002",
    memberName: "Priya M.",
    memberRole: "Career switcher",
    url: "https://priya-portfolio.vercel.app",
    note:
      "Portfolio one-pager — used Claude for the copy structure and a few component scaffolds. Re-did the type pairings + the project cards by hand.",
    status: "SUBMITTED",
    submittedAt: "2026-07-19T15:30:00.000Z",
  },
];

/**
 * Resolve the rubric for a given assignmentId so the internal console
 * doesn't have to walk WORKSHOPS by hand.
 */
export function rubricForAssignment(assignmentId: string): RubricCriterion[] {
  for (const w of WORKSHOPS) {
    if (w.assignment?.id === assignmentId) return w.assignment.rubric;
  }
  return DEFAULT_RUBRIC;
}

export function findSubmission(id: string): Submission | undefined {
  return SUBMISSIONS.find((s) => s.id === id);
}

/** Current-user submissions — stubbed to memberId "u-current". */
export function mySubmissions(): Submission[] {
  return SUBMISSIONS.filter((s) => s.memberId === "u-current").sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}
