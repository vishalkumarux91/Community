// Mock data for the prototype. In production these would come from an API.

export type Level = "Beginner" | "Intermediate" | "Advanced";
export type ResourceType = "video" | "article" | "doc" | "exercise" | "project";

export type JourneyStep = {
  id: string;
  title: string;
  type: ResourceType;
  description: string;
  estimatedTime: string;
  goal: string;
  source?: string; // domain like youtube.com
  prompt?: string; // suggested AI prompt while learning
  url?: string;
};

export type Journey = {
  level: Level;
  steps: JourneyStep[];
};

export type Topic = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  audience: string;
  problem: string;
  emoji: string;
  gradient: string;
  journeys: Record<Level, Journey>;
};

export type ToolCategory =
  | "Design"
  | "Prototyping"
  | "Handoff"
  | "Research"
  | "AI"
  | "Collaboration"
  | "No-code"
  | "Inspiration"
  | "Dev";

export type Tool = {
  slug: string;
  name: string;
  category: ToolCategory;
  shortDescription: string;
  audience: string;
  problem: string;
  rating: number;
  reviews: number;
  emoji: string;
  gradient: string;
  pricing: "Free" | "Freemium" | "Paid";
  topicSlug: string; // links to learning journey
  releasedYear?: number;
  source?: string; // where it surfaced (e.g. "Product Hunt 2024")
};

export type Mentor = {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  expertise: string[];
  rating: number;
  sessions: number;
  hourlyRate: number;
  available: boolean;
  photo: string;
};

export type ClassEvent = {
  id: string;
  title: string;
  description: string;
  mentorId: string;
  level: Level;
  format: "online" | "offline";
  startsAt: string; // ISO
  durationMin: number;
  capacity: number;
  registered: number;
  price: number; // 0 = free
  tags: string[];
  thumbnail: string;
};

export type Post = {
  id: string;
  type: "discussion" | "critique" | "portfolio-review" | "job-prep";
  authorName: string;
  authorRole: string;
  authorPhoto: string;
  title: string;
  body: string;
  tags: string[];
  upvotes: number;
  comments: number;
  postedAgo: string;
  imageGradient?: string;
  image?: string;
};

// ---------- TOPICS / LEARNING JOURNEYS ----------

const figmaJourneys: Record<Level, Journey> = {
  Beginner: {
    level: "Beginner",
    steps: [
      {
        id: "f-b-1",
        title: "Figma in 2 hours — The Crash Course",
        type: "video",
        description: "A guided tour of frames, components, auto layout, and the file system.",
        estimatedTime: "2h",
        goal: "Navigate Figma confidently and recreate a simple landing page.",
        source: "youtube.com",
        prompt: "Explain auto layout like I'm onboarding to a new design team.",
      },
      {
        id: "f-b-2",
        title: "Auto Layout fundamentals",
        type: "article",
        description: "Padding, gaps, fill vs hug, and resizing rules without the confusion.",
        estimatedTime: "20m",
        goal: "Build any flex-style layout without manual nudging.",
        source: "figma.com",
      },
      {
        id: "f-b-3",
        title: "Build: a sign-in screen",
        type: "exercise",
        description: "Recreate a sign-in screen using only frames + auto layout.",
        estimatedTime: "45m",
        goal: "Comfort with constraints and resizing.",
      },
      {
        id: "f-b-4",
        title: "Components & Variants",
        type: "video",
        description: "When to use components, how to set up variants for state.",
        estimatedTime: "30m",
        goal: "Build a button with hover/active/disabled states.",
        source: "youtube.com",
      },
      {
        id: "f-b-5",
        title: "Mini-project: a 4-screen flow",
        type: "project",
        description: "Design a 4-screen onboarding flow using a small component library.",
        estimatedTime: "3h",
        goal: "Tie everything together — components, auto layout, prototyping.",
      },
    ],
  },
  Intermediate: {
    level: "Intermediate",
    steps: [
      {
        id: "f-i-1",
        title: "Variables & modes",
        type: "doc",
        description: "Design tokens, light/dark modes, and brand theming.",
        estimatedTime: "30m",
        goal: "Set up a typography + color system using variables.",
        source: "help.figma.com",
      },
      {
        id: "f-i-2",
        title: "Advanced prototyping",
        type: "video",
        description: "Conditional logic, smart animate, and overlays.",
        estimatedTime: "1h",
        goal: "Prototype a real interaction (e.g., a search dropdown).",
      },
      {
        id: "f-i-3",
        title: "Build: a 12-component library",
        type: "project",
        description: "Ship a reusable button, input, card, modal, dropdown set.",
        estimatedTime: "5h",
        goal: "Hands-on system thinking + variant naming discipline.",
      },
    ],
  },
  Advanced: {
    level: "Advanced",
    steps: [
      {
        id: "f-a-1",
        title: "Plugin development primer",
        type: "doc",
        description: "Build your first Figma plugin to automate a repetitive task.",
        estimatedTime: "2h",
        goal: "Ship a plugin that renames layers in a chosen pattern.",
      },
      {
        id: "f-a-2",
        title: "Dev mode + handoff at scale",
        type: "article",
        description: "Code Connect, design tokens, spec docs that engineers actually read.",
        estimatedTime: "40m",
        goal: "Set up a handoff that saves an hour per ticket.",
      },
    ],
  },
};

const designSystemsJourneys: Record<Level, Journey> = {
  Beginner: {
    level: "Beginner",
    steps: [
      { id: "ds-b-1", title: "What is a design system, really?", type: "article", description: "Cuts through the buzzwords with real examples.", estimatedTime: "15m", goal: "Explain a design system to a PM in 60 seconds.", source: "smashingmagazine.com" },
      { id: "ds-b-2", title: "Atomic design (still relevant)", type: "video", description: "Brad Frost's classic talk, still the clearest mental model.", estimatedTime: "45m", goal: "Categorize any component by atom/molecule/organism.", source: "youtube.com" },
      { id: "ds-b-3", title: "Build: a 6-component starter kit", type: "exercise", description: "Button, input, card, modal, badge, avatar — with tokens.", estimatedTime: "3h", goal: "Hands-on practice with tokens and variants." },
    ],
  },
  Intermediate: {
    level: "Intermediate",
    steps: [
      { id: "ds-i-1", title: "Token architecture", type: "doc", description: "Primitive → semantic → component tokens, the right way.", estimatedTime: "30m", goal: "Design a token JSON that a dev can ship.", source: "tokens.studio" },
      { id: "ds-i-2", title: "Versioning & change management", type: "article", description: "How big systems handle breaking changes without breaking teams.", estimatedTime: "25m", goal: "Draft a changelog for a real component update.", source: "medium.com" },
    ],
  },
  Advanced: {
    level: "Advanced",
    steps: [
      { id: "ds-a-1", title: "Multi-brand systems", type: "video", description: "How Shopify Polaris and IBM Carbon support multiple products.", estimatedTime: "50m", goal: "Sketch an architecture for a 3-brand system.", source: "youtube.com" },
    ],
  },
};

const uxResearchJourneys: Record<Level, Journey> = {
  Beginner: {
    level: "Beginner",
    steps: [
      { id: "uxr-b-1", title: "Just Enough Research (book intro)", type: "article", description: "Erika Hall on doing research without becoming a researcher.", estimatedTime: "20m", goal: "Know when research is and isn't worth the time.", source: "abookapart.com" },
      { id: "uxr-b-2", title: "Run your first 5 user interviews", type: "exercise", description: "A scripted exercise to interview 5 real users this week.", estimatedTime: "5h", goal: "Confidence to talk to users without leading them." },
      { id: "uxr-b-3", title: "Affinity mapping in Figma", type: "video", description: "Synthesize 5 interview transcripts into 3 insights.", estimatedTime: "40m", goal: "Translate raw notes into design direction." },
    ],
  },
  Intermediate: {
    level: "Intermediate",
    steps: [
      { id: "uxr-i-1", title: "Usability testing without a lab", type: "doc", description: "Maze, Useberry, and the 5-user rule in practice.", estimatedTime: "30m", goal: "Run an unmoderated test and write a 1-page report." },
    ],
  },
  Advanced: {
    level: "Advanced",
    steps: [
      { id: "uxr-a-1", title: "Mixed-methods research at scale", type: "article", description: "Pairing qual interviews with funnel analytics.", estimatedTime: "35m", goal: "Pitch a mixed-methods study to leadership." },
    ],
  },
};

export const TOPICS: Topic[] = [
  {
    slug: "figma",
    title: "Figma",
    category: "Design tool",
    summary: "Master the industry-standard interface design tool.",
    audience: "Designers at every level — from first frame to design systems lead.",
    problem: "Figma is huge. Random YouTube tutorials skip the foundations and teach habits you'll have to unlearn.",
    emoji: "🎨",
    gradient: "from-fuchsia-500/30 via-purple-600/20 to-rose-700/10",
    journeys: figmaJourneys,
  },
  {
    slug: "design-systems",
    title: "Design Systems",
    category: "Discipline",
    summary: "Tokens, components, and governance that scale beyond one designer.",
    audience: "Designers ready to think in patterns, not screens.",
    problem: "Most 'design system' tutorials stop at a button library. Real systems are token + governance + adoption.",
    emoji: "🧩",
    gradient: "from-sky-500/30 via-indigo-600/20 to-violet-700/10",
    journeys: designSystemsJourneys,
  },
  {
    slug: "ux-research",
    title: "UX Research basics",
    category: "Discipline",
    summary: "Talk to users, synthesize what you hear, ship better decisions.",
    audience: "Product designers without a dedicated researcher on the team.",
    problem: "Research feels intimidating, so designers either skip it or over-engineer it. Both fail.",
    emoji: "🔍",
    gradient: "from-emerald-500/30 via-teal-600/20 to-cyan-700/10",
    journeys: uxResearchJourneys,
  },
  {
    slug: "framer",
    title: "Framer",
    category: "Design tool",
    summary: "Design and ship a real, responsive website without writing code.",
    audience: "Designers who want their portfolio (or a client microsite) live, not in PDF.",
    problem: "Webflow is powerful but heavy. Framer is closer to Figma — but needs a guided onramp.",
    emoji: "✨",
    gradient: "from-orange-500/30 via-amber-600/20 to-yellow-700/10",
    journeys: figmaJourneys, // placeholder reuse
  },
];

export function findTopic(slug: string): Topic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

// ---------- TOOLS ----------

// Curated set inspired by tools that have surfaced repeatedly in design and
// developer-tooling roundups over the past two years. Descriptions are our own
// — short, opinionated, designer-voice — not vendor copy.
export const TOOLS: Tool[] = [
  // Core design
  { slug: "figma", name: "Figma", category: "Design", shortDescription: "Collaborative interface design tool — the industry default.", audience: "Product designers, design teams.", problem: "Designing UI alone in files no one can edit.", rating: 4.9, reviews: 18420, emoji: "🎨", gradient: "", pricing: "Freemium", topicSlug: "figma", releasedYear: 2016 },
  { slug: "sketch", name: "Sketch", category: "Design", shortDescription: "Mac-native vector design for product designers who like local files.", audience: "Designers on Apple platforms.", problem: "Cloud collaboration when you actually want offline-first.", rating: 4.4, reviews: 5210, emoji: "💎", gradient: "", pricing: "Paid", topicSlug: "figma", releasedYear: 2010 },
  { slug: "penpot", name: "Penpot", category: "Design", shortDescription: "Open-source design + prototyping tool with SVG-native output.", audience: "Designers + devs who want a design tool that speaks code.", problem: "Vendor lock-in and proprietary file formats.", rating: 4.4, reviews: 980, emoji: "🐙", gradient: "", pricing: "Free", topicSlug: "figma", releasedYear: 2021, source: "Product Hunt 2023" },
  { slug: "rive", name: "Rive", category: "Design", shortDescription: "Real-time, interactive animations that ship to any platform.", audience: "Motion-curious product designers.", problem: "Lottie isn't enough; Principle is dead.", rating: 4.7, reviews: 1340, emoji: "🎬", gradient: "", pricing: "Freemium", topicSlug: "figma", releasedYear: 2018, source: "Product Hunt 2023" },

  // Prototyping
  { slug: "framer", name: "Framer", category: "Prototyping", shortDescription: "Design and publish responsive websites visually.", audience: "Designers shipping marketing sites & portfolios.", problem: "Going from Figma mock to a live, responsive site without a dev.", rating: 4.7, reviews: 4310, emoji: "✨", gradient: "", pricing: "Freemium", topicSlug: "framer", releasedYear: 2014 },
  { slug: "protopie", name: "ProtoPie", category: "Prototyping", shortDescription: "High-fidelity prototypes with sensors, variables, and conditionals.", audience: "Designers prototyping native apps and IoT.", problem: "Figma prototyping ends where real interactions begin.", rating: 4.6, reviews: 2110, emoji: "🥧", gradient: "", pricing: "Freemium", topicSlug: "figma", releasedYear: 2017 },
  { slug: "origami", name: "Origami Studio", category: "Prototyping", shortDescription: "Free node-based prototyping from the Meta design org.", audience: "Designers building motion-rich app interactions.", problem: "Communicating animation and interaction precisely.", rating: 4.3, reviews: 720, emoji: "🦢", gradient: "", pricing: "Free", topicSlug: "figma", releasedYear: 2016 },

  // No-code / web
  { slug: "webflow", name: "Webflow", category: "No-code", shortDescription: "Visual web building with full CSS-grid power.", audience: "Designers who want pixel-perfect, CMS-driven sites.", problem: "Marketing sites that need a CMS without an engineering team.", rating: 4.5, reviews: 6810, emoji: "🌐", gradient: "", pricing: "Freemium", topicSlug: "framer", releasedYear: 2013 },
  { slug: "wix-studio", name: "Wix Studio", category: "No-code", shortDescription: "Wix's pro design surface — responsive editor for agencies.", audience: "Studios shipping client sites at speed.", problem: "Webflow felt overkill; Wix classic felt under-built.", rating: 4.2, reviews: 980, emoji: "🪜", gradient: "", pricing: "Freemium", topicSlug: "framer", releasedYear: 2023, source: "Product Hunt 2023" },

  // AI
  { slug: "midjourney", name: "Midjourney", category: "AI", shortDescription: "Cinematic AI image generation for moodboards & concept art.", audience: "Visual designers, art directors.", problem: "Original imagery without expensive shoots or stock libraries.", rating: 4.9, reviews: 7340, emoji: "🪐", gradient: "", pricing: "Paid", topicSlug: "figma", releasedYear: 2022 },
  { slug: "chatgpt", name: "ChatGPT", category: "AI", shortDescription: "Conversational AI for ideation, copy, and code.", audience: "Designers exploring AI in their workflow.", problem: "Getting unstuck on copy, naming, IA, or code snippets.", rating: 4.8, reviews: 21200, emoji: "💬", gradient: "", pricing: "Freemium", topicSlug: "ux-research", releasedYear: 2022 },
  { slug: "claude", name: "Claude", category: "AI", shortDescription: "Anthropic's conversational AI — strong at long-form reasoning.", audience: "Designers writing case studies, briefs, and specs.", problem: "Drafting long-form deliverables without losing the thread.", rating: 4.8, reviews: 4220, emoji: "🟧", gradient: "", pricing: "Freemium", topicSlug: "ux-research", releasedYear: 2023, source: "Product Hunt 2023" },
  { slug: "cursor", name: "Cursor", category: "Dev", shortDescription: "AI-native code editor — designers ship real prototypes here.", audience: "Designers who want to commit code, not hand it off.", problem: "Going from \"design works in Figma\" to \"PR is open\".", rating: 4.9, reviews: 6940, emoji: "🖱️", gradient: "", pricing: "Freemium", topicSlug: "framer", releasedYear: 2023, source: "Product Hunt 2023" },
  { slug: "v0", name: "v0", category: "AI", shortDescription: "Vercel's prompt-to-React-component generator.", audience: "Designers sketching UIs straight to shadcn + Tailwind.", problem: "Translating moodboards into real, themable components.", rating: 4.6, reviews: 3120, emoji: "⚡", gradient: "", pricing: "Freemium", topicSlug: "framer", releasedYear: 2023, source: "Product Hunt 2023" },
  { slug: "lovable", name: "Lovable", category: "AI", shortDescription: "Generate full-stack apps from a single prompt.", audience: "Designers turning side-project ideas into shippable demos.", problem: "Validating an idea without onboarding a dev team.", rating: 4.7, reviews: 2840, emoji: "💜", gradient: "", pricing: "Freemium", topicSlug: "framer", releasedYear: 2024, source: "Product Hunt 2024" },
  { slug: "bolt", name: "Bolt", category: "AI", shortDescription: "In-browser app builder powered by Stackblitz + Claude.", audience: "Designers wanting a real running web app, fast.", problem: "Mockups can't actually demo a workflow.", rating: 4.6, reviews: 1740, emoji: "⚡", gradient: "", pricing: "Freemium", topicSlug: "framer", releasedYear: 2024, source: "Product Hunt 2024" },
  { slug: "galileo", name: "Galileo AI", category: "AI", shortDescription: "Generate editable UI screens from a text description.", audience: "Designers exploring layouts at a sketch stage.", problem: "Empty canvas + 50 references + no momentum.", rating: 4.4, reviews: 1620, emoji: "🪞", gradient: "", pricing: "Paid", topicSlug: "figma", releasedYear: 2023, source: "Product Hunt 2023" },
  { slug: "uizard", name: "Uizard", category: "AI", shortDescription: "Hand-sketch → editable UI screens in seconds.", audience: "Designers and PMs ideating on whiteboard photos.", problem: "Whiteboard sketches die in your photos folder.", rating: 4.3, reviews: 980, emoji: "🖼️", gradient: "", pricing: "Freemium", topicSlug: "figma", releasedYear: 2018 },

  // Research
  { slug: "maze", name: "Maze", category: "Research", shortDescription: "Unmoderated usability tests, surveys, and prototype testing.", audience: "Product designers running their own research.", problem: "Validating a flow without booking 10 calendar slots.", rating: 4.5, reviews: 1820, emoji: "🧪", gradient: "", pricing: "Freemium", topicSlug: "ux-research", releasedYear: 2018 },
  { slug: "useberry", name: "Useberry", category: "Research", shortDescription: "Test Figma prototypes with real users, asynchronously.", audience: "Solo designers and small teams.", problem: "Maze felt heavy for a 5-user check.", rating: 4.4, reviews: 540, emoji: "🫐", gradient: "", pricing: "Freemium", topicSlug: "ux-research", releasedYear: 2018 },
  { slug: "dovetail", name: "Dovetail", category: "Research", shortDescription: "Insights repository — tag, transcribe, synthesize qual research.", audience: "Teams with a real research practice.", problem: "Insights die in slide decks no one rereads.", rating: 4.7, reviews: 1430, emoji: "🪶", gradient: "", pricing: "Freemium", topicSlug: "ux-research", releasedYear: 2018 },

  // Handoff
  { slug: "zeplin", name: "Zeplin", category: "Handoff", shortDescription: "Handoff and design specs for engineering teams.", audience: "Teams where Dev Mode isn't enough.", problem: "Spec docs that drift from the actual design.", rating: 4.3, reviews: 2120, emoji: "🛠️", gradient: "", pricing: "Freemium", topicSlug: "design-systems", releasedYear: 2014 },

  // Collaboration
  { slug: "notion", name: "Notion", category: "Collaboration", shortDescription: "Docs, wikis, and project tracking — designer's second brain.", audience: "Anyone running a design org or solo practice.", problem: "Specs + research + roadmap scattered across 7 tools.", rating: 4.6, reviews: 9120, emoji: "📓", gradient: "", pricing: "Freemium", topicSlug: "design-systems", releasedYear: 2016 },
  { slug: "linear", name: "Linear", category: "Collaboration", shortDescription: "Issue tracker built for product teams that ship fast.", audience: "Designers embedded with engineering.", problem: "Jira eats your week before lunch.", rating: 4.9, reviews: 7240, emoji: "▲", gradient: "", pricing: "Freemium", topicSlug: "design-systems", releasedYear: 2019 },
  { slug: "loom", name: "Loom", category: "Collaboration", shortDescription: "Async video walkthroughs of your designs.", audience: "Designers in distributed teams.", problem: "Slack threads can't show you what to look at.", rating: 4.7, reviews: 8210, emoji: "📹", gradient: "", pricing: "Freemium", topicSlug: "design-systems", releasedYear: 2016 },
  { slug: "tldraw", name: "tldraw", category: "Collaboration", shortDescription: "Open-source whiteboard with magical, AI-powered canvas tools.", audience: "Designers running async workshops.", problem: "Miro is heavy; FigJam is locked into Figma.", rating: 4.6, reviews: 1280, emoji: "✏️", gradient: "", pricing: "Free", topicSlug: "design-systems", releasedYear: 2023, source: "Product Hunt 2023" },

  // Inspiration
  { slug: "mobbin", name: "Mobbin", category: "Inspiration", shortDescription: "30,000+ live mobile and web app screens, organized.", audience: "Designers stuck on a pattern or flow.", problem: "Dribbble looks great; nobody ships those screens.", rating: 4.7, reviews: 3210, emoji: "📱", gradient: "", pricing: "Freemium", topicSlug: "figma", releasedYear: 2018 },
  { slug: "godly", name: "Godly", category: "Inspiration", shortDescription: "Inspirational web design, hand-curated.", audience: "Designers building marketing sites and portfolios.", problem: "Awwwards is overwhelming; Twitter screenshots vanish.", rating: 4.5, reviews: 720, emoji: "🌅", gradient: "", pricing: "Free", topicSlug: "framer", releasedYear: 2021 },
];

export function findTool(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

// ---------- MENTORS ----------

// Portrait URLs come from randomuser.me — a free placeholder portrait service
// that ships AI-generated faces explicitly licensed for prototype/UI use.
export const MENTORS: Mentor[] = [
  { id: "m1", name: "Aanya Sharma", role: "Senior Product Designer", company: "Razorpay", bio: "Designed payment flows used by 8M merchants. Specialty: portfolio reviews for designers transitioning into product.", expertise: ["Portfolio review", "Career switch", "Product design", "Fintech"], rating: 4.9, sessions: 184, hourlyRate: 1500, available: true, photo: "https://randomuser.me/api/portraits/women/65.jpg" },
  { id: "m2", name: "Rohan Iyer", role: "Design Systems Lead", company: "Atlassian", bio: "Builds the Jira design system. Specialty: governance, tokens, cross-team adoption.", expertise: ["Design systems", "Tokens", "Governance"], rating: 4.8, sessions: 92, hourlyRate: 2200, available: true, photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: "m3", name: "Maya Rao", role: "Design Director", company: "Swiggy", bio: "Building consumer experiences for 50M users. Loves coaching juniors on craft and storytelling.", expertise: ["UX strategy", "Storytelling", "Critique", "Hiring"], rating: 5.0, sessions: 247, hourlyRate: 3000, available: false, photo: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: "m4", name: "Dev Patel", role: "UX Researcher", company: "Microsoft", bio: "Mixed-methods research at scale. Helps designers run their first studies.", expertise: ["UX research", "Interviews", "Synthesis"], rating: 4.7, sessions: 56, hourlyRate: 1800, available: true, photo: "https://randomuser.me/api/portraits/men/14.jpg" },
  { id: "m5", name: "Liu Wei", role: "Founding Designer", company: "Stealth (ex-Stripe)", bio: "0→1 design at three startups. Coaches designers joining early-stage teams.", expertise: ["0→1 design", "Founding designer", "Speed"], rating: 4.9, sessions: 71, hourlyRate: 2500, available: true, photo: "https://randomuser.me/api/portraits/men/76.jpg" },
  { id: "m6", name: "Reena Kapoor", role: "Senior IC Designer", company: "Figma", bio: "Works on Figma's prototyping team. Specialty: mock interviews and craft critique.", expertise: ["Mock interviews", "Craft", "Big tech prep"], rating: 5.0, sessions: 128, hourlyRate: 3500, available: false, photo: "https://randomuser.me/api/portraits/women/68.jpg" },
];

export function findMentor(id: string): Mentor | undefined {
  return MENTORS.find((m) => m.id === id);
}

// ---------- CLASSES ----------

const inDays = (d: number) =>
  new Date(Date.now() + d * 24 * 60 * 60 * 1000).toISOString();

// Thumbnails come from Unsplash — workspace, design, and team photos.
export const CLASSES: ClassEvent[] = [
  { id: "c1", title: "Live portfolio review — bring your case study", mentorId: "m1", description: "We review 5 portfolios live. Submit your URL on registration. Get focused feedback on case study structure, visual craft, and what to cut.", level: "Beginner", format: "online", startsAt: inDays(2), durationMin: 90, capacity: 30, registered: 22, price: 0, tags: ["Portfolio review", "Career"], thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80&auto=format&fit=crop" },
  { id: "c2", title: "Build your first design system in Figma", mentorId: "m2", description: "Hands-on workshop. Walk away with a 12-component starter kit using variables and a token JSON your devs can ship.", level: "Intermediate", format: "online", startsAt: inDays(5), durationMin: 120, capacity: 25, registered: 14, price: 999, tags: ["Design systems", "Figma"], thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80&auto=format&fit=crop" },
  { id: "c3", title: "From graphic design → product design", mentorId: "m3", description: "Maya walks through real portfolios from designers who made the switch — what worked, what didn't.", level: "Beginner", format: "online", startsAt: inDays(8), durationMin: 60, capacity: 100, registered: 76, price: 0, tags: ["Career switch", "Portfolio"], thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&auto=format&fit=crop" },
  { id: "c4", title: "Run your first 5 user interviews this week", mentorId: "m4", description: "Live workshop with scripts, recruitment templates, and a synthesis exercise.", level: "Beginner", format: "online", startsAt: inDays(11), durationMin: 90, capacity: 20, registered: 8, price: 599, tags: ["UX research", "Interviews"], thumbnail: "https://images.unsplash.com/photo-1573166364266-7e99861f8d62?w=800&q=80&auto=format&fit=crop" },
  { id: "c5", title: "Mock interview: big-tech product design loop", mentorId: "m6", description: "1-on-1 mock with Reena. Walk through an app critique + design exercise + behavioral round.", level: "Advanced", format: "online", startsAt: inDays(3), durationMin: 60, capacity: 1, registered: 1, price: 3500, tags: ["Mock interview", "Big tech"], thumbnail: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&q=80&auto=format&fit=crop" },
];

export function findClass(id: string): ClassEvent | undefined {
  return CLASSES.find((c) => c.id === id);
}

// ---------- COMMUNITY POSTS ----------

// Author portraits from randomuser.me; post mockup images from Unsplash
// (licensed for use without attribution).
export const POSTS: Post[] = [
  { id: "p1", type: "critique", authorName: "Karthik R.", authorRole: "Junior designer", authorPhoto: "https://randomuser.me/api/portraits/men/22.jpg", title: "Critique my onboarding flow for a fintech app", body: "I'm designing onboarding for an Indian-market lending app. Target users are first-time digital lenders, mostly Tier-2 cities. I've got 4 screens — KYC, income, eligibility, offer. Roasting welcome.", tags: ["Critique", "Fintech", "Onboarding"], upvotes: 42, comments: 18, postedAgo: "3h ago", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&auto=format&fit=crop" },
  { id: "p2", type: "portfolio-review", authorName: "Priya M.", authorRole: "Looking for first PD job", authorPhoto: "https://randomuser.me/api/portraits/women/29.jpg", title: "Portfolio review request — graphic designer → product designer (3 years exp)", body: "Made the jump 6 months ago. Have 2 case studies and a tools redesign. Aiming for mid-level product roles in Bangalore. Brutally honest feedback please.", tags: ["Portfolio review", "Career switch"], upvotes: 87, comments: 34, postedAgo: "6h ago" },
  { id: "p3", type: "discussion", authorName: "Aman K.", authorRole: "Design lead", authorPhoto: "https://randomuser.me/api/portraits/men/52.jpg", title: "Hot take: most 'AI design tools' are demos, not workflow", body: "Spent the last month evaluating 18 AI-design tools for our team. Maybe 3 actually replaced something. The rest were impressive demos. What's actually in your daily workflow?", tags: ["AI tools", "Hot take"], upvotes: 156, comments: 92, postedAgo: "1d ago" },
  { id: "p4", type: "job-prep", authorName: "Sneha V.", authorRole: "Mid-level", authorPhoto: "https://randomuser.me/api/portraits/women/12.jpg", title: "Got a take-home from Razorpay — can someone share what to focus on?", body: "It's a 'design a feature for X' brief. 5-day timeline. Anyone been through this loop recently? What did the panel actually grade on?", tags: ["Job prep", "Take-home", "Razorpay"], upvotes: 64, comments: 22, postedAgo: "2d ago" },
  { id: "p5", type: "critique", authorName: "Tobias L.", authorRole: "Indie designer", authorPhoto: "https://randomuser.me/api/portraits/men/9.jpg", title: "Critique: dashboard for a SaaS analytics tool", body: "Solo founder vibes, designing my own product's dashboard. Charts feel busy and the empty state is meh. Where would you cut?", tags: ["Critique", "Dashboard", "SaaS"], upvotes: 38, comments: 14, postedAgo: "2d ago", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop" },
  { id: "p6", type: "discussion", authorName: "Reena Kapoor", authorRole: "Senior IC, Figma", authorPhoto: "https://randomuser.me/api/portraits/women/68.jpg", title: "If you're prepping for big-tech, do exactly this for app critiques", body: "I run mock interviews. Here's the 4-part structure that separates a 3-rating from a 5: (1) heuristic scan, (2) user → goal → flow, (3) one bold redesign idea, (4) trade-offs. Details inside.", tags: ["Big tech", "Interviews", "Mentor post"], upvotes: 412, comments: 78, postedAgo: "3d ago" },
];

export function findPost(id: string): Post | undefined {
  return POSTS.find((p) => p.id === id);
}

// ---------- JOBS ----------

export type JobListing = {
  id: string;
  role: string;
  company: string;
  companyInitial: string;
  companyColor: string;
  location: string;
  remote: "Remote" | "Hybrid" | "On-site";
  salaryRange: string;
  level: "Junior" | "Mid" | "Senior" | "Lead";
  tags: string[];
  source: "LinkedIn" | "Wellfound" | "Shine" | "Hirect" | "Naukri" | "Y Combinator";
  postedAgo: string;
  applyUrl: string;
  matchScore?: number; // 0-100
};

export const JOBS: JobListing[] = [
  { id: "j1", role: "Senior Product Designer", company: "Razorpay", companyInitial: "Rz", companyColor: "#0E2974", location: "Bangalore", remote: "Hybrid", salaryRange: "₹35–55L", level: "Senior", tags: ["Fintech", "Payments", "Design systems"], source: "LinkedIn", postedAgo: "2h ago", applyUrl: "#", matchScore: 92 },
  { id: "j2", role: "Product Designer (Mid-level)", company: "Swiggy", companyInitial: "Sw", companyColor: "#FC8019", location: "Bangalore", remote: "On-site", salaryRange: "₹20–32L", level: "Mid", tags: ["Consumer", "Mobile-first", "0→1"], source: "LinkedIn", postedAgo: "5h ago", applyUrl: "#", matchScore: 87 },
  { id: "j3", role: "UX Researcher", company: "Microsoft", companyInitial: "Ms", companyColor: "#0078D4", location: "Hyderabad", remote: "Hybrid", salaryRange: "₹40–60L", level: "Senior", tags: ["Enterprise", "Mixed-methods"], source: "LinkedIn", postedAgo: "1d ago", applyUrl: "#", matchScore: 71 },
  { id: "j4", role: "Founding Designer", company: "Stealth Fintech", companyInitial: "St", companyColor: "#0A0A0B", location: "Remote", remote: "Remote", salaryRange: "₹30–45L + equity", level: "Senior", tags: ["0→1", "Founding", "Equity"], source: "Wellfound", postedAgo: "3h ago", applyUrl: "#", matchScore: 88 },
  { id: "j5", role: "Product Designer — Growth", company: "Cred", companyInitial: "Cr", companyColor: "#000000", location: "Bangalore", remote: "Hybrid", salaryRange: "₹28–42L", level: "Mid", tags: ["Growth", "Experimentation"], source: "LinkedIn", postedAgo: "1d ago", applyUrl: "#", matchScore: 79 },
  { id: "j6", role: "Junior Visual Designer", company: "Zerodha", companyInitial: "Zd", companyColor: "#387ED1", location: "Bangalore", remote: "On-site", salaryRange: "₹10–14L", level: "Junior", tags: ["Visual", "Brand"], source: "Shine", postedAgo: "2d ago", applyUrl: "#", matchScore: 64 },
  { id: "j7", role: "Lead Product Designer", company: "Ola", companyInitial: "Ol", companyColor: "#EBB000", location: "Bangalore", remote: "Hybrid", salaryRange: "₹50–80L", level: "Lead", tags: ["Mobility", "Leadership"], source: "Naukri", postedAgo: "4d ago", applyUrl: "#" },
  { id: "j8", role: "Designer (Mid) — Remote, India", company: "Linear", companyInitial: "Ln", companyColor: "#5E6AD2", location: "Remote · India", remote: "Remote", salaryRange: "$55–80k", level: "Mid", tags: ["Remote", "Tooling"], source: "Y Combinator", postedAgo: "6h ago", applyUrl: "#", matchScore: 84 },
  { id: "j9", role: "Senior UI Designer (Contract)", company: "Atlassian", companyInitial: "At", companyColor: "#0052CC", location: "Remote", remote: "Remote", salaryRange: "$80–110/hr", level: "Senior", tags: ["Contract", "Design systems"], source: "LinkedIn", postedAgo: "1d ago", applyUrl: "#", matchScore: 81 },
];
