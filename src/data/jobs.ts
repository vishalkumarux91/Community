export type InterviewQ = {
  id: string;
  question: string;
  category: "Behavioral" | "Portfolio" | "Whiteboard" | "Take-home" | "Craft";
  difficulty: "Easy" | "Medium" | "Hard";
  asksMostlyFor: ("First job" | "Mid-level" | "Senior")[];
  prep: string;
};

export const INTERVIEW_BANK: InterviewQ[] = [
  {
    id: "q-1",
    question: "Walk me through a project where the original brief was wrong.",
    category: "Behavioral",
    difficulty: "Medium",
    asksMostlyFor: ["Mid-level", "Senior"],
    prep: "Pick a project where you re-framed the problem. Be specific about the moment you noticed and what you did about it.",
  },
  {
    id: "q-2",
    question: "Design a remote-first whiteboarding tool. Take 45 minutes.",
    category: "Whiteboard",
    difficulty: "Hard",
    asksMostlyFor: ["Mid-level", "Senior"],
    prep: "Spend 5 mins clarifying users and goals before drawing. Show 2 explorations, not 1 polished answer.",
  },
  {
    id: "q-3",
    question: "Critique our app — what would you ship next, and why?",
    category: "Portfolio",
    difficulty: "Medium",
    asksMostlyFor: ["First job", "Mid-level"],
    prep: "Don't redesign the whole thing. Pick one thread, ground it in a user problem, and propose one shipping-shaped change.",
  },
  {
    id: "q-4",
    question: "Tell me about a time you disagreed with engineering.",
    category: "Behavioral",
    difficulty: "Medium",
    asksMostlyFor: ["Mid-level", "Senior"],
    prep: "Lead with how you got to a shared decision. Avoid villainizing the engineer in your story.",
  },
  {
    id: "q-5",
    question: "Take-home: redesign our settings page (5 days, async).",
    category: "Take-home",
    difficulty: "Hard",
    asksMostlyFor: ["Mid-level"],
    prep: "Spend 1 day on problem framing. 1 day on exploration. 2 days on the artifact. 1 day on the writeup.",
  },
  {
    id: "q-6",
    question: "What's a design opinion you used to hold but no longer do?",
    category: "Craft",
    difficulty: "Easy",
    asksMostlyFor: ["First job", "Mid-level", "Senior"],
    prep: "Be specific. 'I used to think a portfolio needed 8 projects.' Show what changed your mind.",
  },
];

export type TakeHome = {
  id: string;
  title: string;
  company: string;
  duration: string;
  brief: string;
  level: "First job" | "Mid-level" | "Senior";
};

export const TAKE_HOMES: TakeHome[] = [
  {
    id: "t-1",
    title: "Redesign a learner's first 60 seconds",
    company: "EdTech (anonymized)",
    duration: "5 days",
    brief: "Their app has 38% activation. They want to know what your first 60 seconds would look like and why.",
    level: "Mid-level",
  },
  {
    id: "t-2",
    title: "Add a new permission system to a B2B tool",
    company: "B2B SaaS (anonymized)",
    duration: "3 days",
    brief: "Roles, scopes, audit logs. Show how you'd handle complexity without overwhelming admins.",
    level: "Senior",
  },
  {
    id: "t-3",
    title: "Onboarding flow for a finance app",
    company: "FinTech (anonymized)",
    duration: "4 days",
    brief: "KYC required. Make it feel less like a tax form and more like the start of a relationship.",
    level: "Mid-level",
  },
  {
    id: "t-4",
    title: "Bug-report flow for a creative tool",
    company: "Creative tool (anonymized)",
    duration: "2 days",
    brief: "Designers using the tool aren't filing bug reports. Diagnose why and propose a redesign.",
    level: "First job",
  },
];

export type MockSession = {
  id: string;
  with: string;
  withTitle: string;
  focus: string;
  durationMinutes: number;
  price: number;
  date: string;
};

export const MOCK_SESSIONS: MockSession[] = [
  {
    id: "ms-1",
    with: "Maya Rao",
    withTitle: "Senior PD · Atlassian",
    focus: "Whiteboard interview · B2B SaaS",
    durationMinutes: 60,
    price: 1500,
    date: "Available · book within 7 days",
  },
  {
    id: "ms-2",
    with: "Aria Park",
    withTitle: "Design Manager · Razorpay",
    focus: "Behavioral round · FinTech",
    durationMinutes: 45,
    price: 1800,
    date: "Available · book within 5 days",
  },
  {
    id: "ms-3",
    with: "Yuki Tanaka",
    withTitle: "Principal Designer · Shopify",
    focus: "Portfolio walkthrough · Career switch",
    durationMinutes: 60,
    price: 2800,
    date: "Available · book within 14 days",
  },
];
