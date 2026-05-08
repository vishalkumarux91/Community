export type StepType = "video" | "article" | "doc" | "exercise" | "project";
export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Step = {
  id: string;
  title: string;
  type: StepType;
  brief: string;
  estimatedMinutes: number;
  goal: string;
  source: string;
  url?: string;
  prompt: string;
};

export type LearningLevel = {
  level: Level;
  summary: string;
  steps: Step[];
};

export type LearningPath = {
  slug: string;
  title: string;
  topic: string;
  category: "Tool" | "Concept" | "Career" | "Process";
  description: string;
  totalHours: number;
  enrolled: number;
  rating: number;
  curatedBy: string;
  gradient: string;
  emoji: string;
  outcomes: string[];
  levels: LearningLevel[];
};

const figmaPath: LearningPath = {
  slug: "figma-from-zero-to-design-systems",
  title: "Figma — Zero to Design Systems",
  topic: "Figma",
  category: "Tool",
  description:
    "A guided 3-level pipeline that takes you from your first Figma frame to publishing a real design system used by an engineering team.",
  totalHours: 24,
  enrolled: 4128,
  rating: 4.9,
  curatedBy: "Maya Rao + RPS Mentors",
  gradient: "from-fuchsia-500/40 via-purple-600/20 to-indigo-700/10",
  emoji: "🎯",
  outcomes: [
    "Ship clean auto-layout components",
    "Build a token-driven design system",
    "Hand off cleanly to engineers",
    "Publish your library to a team",
  ],
  levels: [
    {
      level: "Beginner",
      summary: "Move from a blank canvas to your first end-to-end screen.",
      steps: [
        {
          id: "f-b-1",
          title: "Figma in 60 minutes — the canonical intro",
          type: "video",
          brief: "Tour every panel, learn keyboard shortcuts, and ship one screen.",
          estimatedMinutes: 60,
          goal: "Navigate Figma confidently and recreate any reference screen.",
          source: "YouTube · Figma official",
          prompt: "Quiz me on Figma shortcuts I just learned and grade my answers.",
        },
        {
          id: "f-b-2",
          title: "Frames vs Groups vs Sections",
          type: "article",
          brief: "Understand the layout primitives — when to use each, and why it matters.",
          estimatedMinutes: 12,
          goal: "Choose the right container without thinking.",
          source: "Figma blog",
          prompt: "Give me 3 layout problems and tell me which container I should use.",
        },
        {
          id: "f-b-3",
          title: "Recreate the Spotify mobile player",
          type: "exercise",
          brief: "Pixel-match a known UI to internalize spacing and typography choices.",
          estimatedMinutes: 90,
          goal: "Build a 1:1 recreation using only auto-layout.",
          source: "RPS Exercise",
          prompt: "Review my recreation against the reference and call out 5 misses.",
        },
        {
          id: "f-b-4",
          title: "Auto layout — the official docs",
          type: "doc",
          brief: "Padding, gap, hug vs fill, alignment, advanced wrapping.",
          estimatedMinutes: 25,
          goal: "Know every property in the auto-layout panel.",
          source: "help.figma.com",
          prompt: "Give me 5 auto-layout puzzles and walk through the solution if I get stuck.",
        },
        {
          id: "f-b-5",
          title: "Mini project — build a 3-screen onboarding",
          type: "project",
          brief: "Apply everything: frames, auto-layout, components, prototyping.",
          estimatedMinutes: 180,
          goal: "Deliver a clickable 3-screen flow ready for review.",
          source: "RPS Project",
          prompt: "Critique my 3-screen onboarding like a senior product designer would.",
        },
      ],
    },
    {
      level: "Intermediate",
      summary: "Tokens, components, variants, and proper handoff.",
      steps: [
        {
          id: "f-i-1",
          title: "Variables and modes — the why",
          type: "video",
          brief: "Color tokens, spacing tokens, light/dark — without losing your mind.",
          estimatedMinutes: 35,
          goal: "Use variables for everything that should be themable.",
          source: "Config talk",
          prompt: "Audit my Figma file and tell me where I should be using variables instead of hex values.",
        },
        {
          id: "f-i-2",
          title: "Component properties + variants deep dive",
          type: "article",
          brief: "Boolean, instance swap, text, variant — when to reach for each.",
          estimatedMinutes: 20,
          goal: "Design a Button component with every variant and state.",
          source: "Smashing Magazine",
          prompt: "Generate 8 edge cases I should test on my Button component.",
        },
        {
          id: "f-i-3",
          title: "Build a 12-component starter library",
          type: "project",
          brief: "Button, Input, Select, Checkbox, Radio, Toggle, Modal, Toast, Card, Badge, Avatar, Tabs.",
          estimatedMinutes: 360,
          goal: "Publish a library with consistent naming and documentation.",
          source: "RPS Project",
          prompt: "Review my component library for naming consistency and missing states.",
        },
      ],
    },
    {
      level: "Advanced",
      summary: "Run a design system used by real teams.",
      steps: [
        {
          id: "f-a-1",
          title: "Connecting Figma variables to code tokens",
          type: "video",
          brief: "Tokens Studio, GitHub sync, Style Dictionary — the practical pipeline.",
          estimatedMinutes: 50,
          goal: "Ship a token sync from Figma → repo without manual exports.",
          source: "Config 2024",
          prompt: "Walk me through setting up Tokens Studio for my project step by step.",
        },
        {
          id: "f-a-2",
          title: "Versioning and releasing a library",
          type: "doc",
          brief: "Branching in Figma, release notes, change communication.",
          estimatedMinutes: 30,
          goal: "Know how to ship a breaking change without breaking the team.",
          source: "help.figma.com",
          prompt: "Help me write release notes for these 4 component updates.",
        },
        {
          id: "f-a-3",
          title: "Capstone — design system for a fictional fintech",
          type: "project",
          brief: "Tokens, components, patterns, docs site, contribution guide.",
          estimatedMinutes: 900,
          goal: "Produce a portfolio-ready design system case study.",
          source: "RPS Capstone",
          prompt: "Critique my design system case study like a hiring manager at a Series B fintech.",
        },
      ],
    },
  ],
};

const designSystemsPath: LearningPath = {
  slug: "design-systems-fundamentals",
  title: "Design Systems Fundamentals",
  topic: "Design Systems",
  category: "Concept",
  description: "What a design system actually is, what's in it, and how to build one teams will adopt.",
  totalHours: 16,
  enrolled: 2210,
  rating: 4.8,
  curatedBy: "Aria Park",
  gradient: "from-sky-500/40 via-indigo-500/20 to-violet-700/10",
  emoji: "🧩",
  outcomes: ["Define tokens that scale", "Document components a dev will read", "Drive adoption inside a team"],
  levels: [
    {
      level: "Beginner",
      summary: "Vocabulary first.",
      steps: [
        { id: "ds-b-1", title: "What lives in a design system?", type: "article", brief: "Tokens, components, patterns, guidelines.", estimatedMinutes: 10, goal: "Use the right word for the right layer.", source: "Brad Frost", prompt: "Quiz me on design-system vocabulary." },
        { id: "ds-b-2", title: "Audit an existing public system", type: "exercise", brief: "Pick Polaris, Material 3, or Carbon and map its layers.", estimatedMinutes: 60, goal: "Spot the structure inside a real system.", source: "RPS Exercise", prompt: "Score my audit on coverage and accuracy." },
      ],
    },
    {
      level: "Intermediate",
      summary: "Build the smallest useful system.",
      steps: [
        { id: "ds-i-1", title: "Token architecture: primitive, semantic, component", type: "video", brief: "Why three layers beats one big swatch list.", estimatedMinutes: 28, goal: "Design a 3-layer token taxonomy from scratch.", source: "Lukas Oppermann", prompt: "Review my 3-layer token taxonomy for gaps." },
        { id: "ds-i-2", title: "Documentation that actually gets read", type: "article", brief: "Anti-patterns: walls of text, missing examples, no rationale.", estimatedMinutes: 15, goal: "Write component docs an engineer will skim and ship.", source: "EightShapes", prompt: "Rewrite my Button docs to be more skimmable." },
      ],
    },
    {
      level: "Advanced",
      summary: "Govern and grow.",
      steps: [
        { id: "ds-a-1", title: "Adoption metrics that matter", type: "article", brief: "% of components used, override count, drift.", estimatedMinutes: 18, goal: "Track adoption with 3 numbers leadership cares about.", source: "Spotify design", prompt: "Help me draft an adoption dashboard with the right metrics." },
      ],
    },
  ],
};

const uxResearchPath: LearningPath = {
  slug: "ux-research-basics",
  title: "UX Research Basics",
  topic: "UX Research",
  category: "Process",
  description: "Run lightweight research without a research team — interviews, usability tests, synthesis.",
  totalHours: 12,
  enrolled: 1640,
  rating: 4.7,
  curatedBy: "Reena Iyer",
  gradient: "from-emerald-500/40 via-teal-500/20 to-cyan-700/10",
  emoji: "🔍",
  outcomes: ["Run a 5-person usability test", "Synthesize patterns from raw notes", "Defend a design decision with evidence"],
  levels: [
    {
      level: "Beginner",
      summary: "Start asking better questions.",
      steps: [
        { id: "uxr-b-1", title: "How to ask non-leading questions", type: "video", brief: "The art of getting honest answers.", estimatedMinutes: 22, goal: "Run a 30-min interview without leading the user.", source: "NN/g", prompt: "Score these 5 interview questions on leadingness." },
        { id: "uxr-b-2", title: "Recruit 5 users in a week", type: "exercise", brief: "Practical recruiting for solo designers.", estimatedMinutes: 120, goal: "Get 5 calls on the calendar.", source: "RPS Exercise", prompt: "Help me write a recruiting message for designers in India." },
      ],
    },
    {
      level: "Intermediate",
      summary: "Synthesis without spreadsheets-of-doom.",
      steps: [
        { id: "uxr-i-1", title: "Affinity mapping in Figjam", type: "article", brief: "From raw quotes to clusters in 90 minutes.", estimatedMinutes: 18, goal: "Cluster 50 raw observations into 5 themes.", source: "Atomic Spark", prompt: "Walk me through clustering my 30 raw notes step by step." },
      ],
    },
    {
      level: "Advanced",
      summary: "Defending decisions with research.",
      steps: [
        { id: "uxr-a-1", title: "Writing a research brief stakeholders read", type: "article", brief: "TL;DR, decision, evidence, counter-evidence.", estimatedMinutes: 20, goal: "Write a 1-page brief that drives a decision.", source: "Erika Hall", prompt: "Critique my research brief for clarity and bias." },
      ],
    },
  ],
};

const portfolioPath: LearningPath = {
  slug: "portfolio-that-gets-interviews",
  title: "Portfolio That Gets Interviews",
  topic: "Portfolio",
  category: "Career",
  description: "Stop treating your portfolio like a gallery. Start treating it like a story.",
  totalHours: 10,
  enrolled: 5208,
  rating: 4.9,
  curatedBy: "Liam Patel",
  gradient: "from-orange-500/40 via-rose-500/20 to-pink-700/10",
  emoji: "📁",
  outcomes: ["Pick the right 3 projects", "Write a case study that lands", "Ship a portfolio site that loads in 2s"],
  levels: [
    {
      level: "Beginner",
      summary: "Pick the right projects.",
      steps: [
        { id: "p-b-1", title: "How many projects? (Hint: not 10.)", type: "article", brief: "Why 3 strong beats 10 mediocre.", estimatedMinutes: 8, goal: "Decide which projects to drop.", source: "RPS", prompt: "Help me decide which 3 of my 8 projects to lead with." },
      ],
    },
    {
      level: "Intermediate",
      summary: "Write the case study.",
      steps: [
        { id: "p-i-1", title: "The Problem → Process → Outcome template", type: "doc", brief: "The one structure that works for every project.", estimatedMinutes: 15, goal: "Have a template you can fill in for any project.", source: "RPS Template", prompt: "Help me draft P→P→O for my onboarding redesign." },
      ],
    },
    {
      level: "Advanced",
      summary: "Ship the site.",
      steps: [
        { id: "p-a-1", title: "Hosting, domains, SEO basics", type: "video", brief: "Vercel, custom domains, the 80/20 of being indexable.", estimatedMinutes: 25, goal: "Publish your portfolio and have it indexed by Google.", source: "RPS", prompt: "Audit my portfolio site for SEO and Lighthouse performance." },
      ],
    },
  ],
};

export const PATHS: LearningPath[] = [figmaPath, designSystemsPath, uxResearchPath, portfolioPath];

export function getPathBySlug(slug: string): LearningPath | undefined {
  return PATHS.find((p) => p.slug === slug);
}
