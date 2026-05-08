export type PostKind = "Discussion" | "Critique" | "Portfolio Review" | "Job Prep" | "Question";

export type Post = {
  id: string;
  kind: PostKind;
  title: string;
  body: string;
  author: string;
  authorTitle: string;
  postedAgo: string;
  tags: string[];
  upvotes: number;
  comments: number;
  saves: number;
  pinned?: boolean;
  hasImage?: boolean;
  imageGradient?: string;
};

export const POSTS: Post[] = [
  {
    id: "p-1",
    kind: "Critique",
    title: "Critique my onboarding flow for a habit-tracker (Day 4)",
    body:
      "I've been iterating on this onboarding for a week. Target users are people who downloaded the app after a New Year resolution and bounced once. Constraint: max 3 screens. What's not landing?",
    author: "Sahil M.",
    authorTitle: "Junior UX Designer · Pune",
    postedAgo: "2h",
    tags: ["UI Critique", "Onboarding", "Mobile"],
    upvotes: 84,
    comments: 23,
    saves: 41,
    hasImage: true,
    imageGradient: "from-violet-500/40 via-fuchsia-500/20 to-rose-500/10",
  },
  {
    id: "p-2",
    kind: "Portfolio Review",
    title: "Going from graphic design to product — does my portfolio say that yet?",
    body:
      "Made the switch 8 months ago. I'm worried recruiters still read me as a graphic designer. Honest reads on which projects to drop?",
    author: "Anika B.",
    authorTitle: "Career Switcher · Hyderabad",
    postedAgo: "5h",
    tags: ["Portfolio", "Career Switch", "Visual to Product"],
    upvotes: 162,
    comments: 47,
    saves: 88,
    hasImage: true,
    imageGradient: "from-emerald-500/40 via-teal-500/20 to-cyan-700/10",
  },
  {
    id: "p-3",
    kind: "Job Prep",
    title: "Razorpay design interview — what's the loop actually look like in 2026?",
    body:
      "Got a screening call yesterday. Anyone been through it recently? Whiteboard, take-home, behavioral? Trying to plan the next 2 weeks.",
    author: "Karthik V.",
    authorTitle: "Mid-level Product Designer",
    postedAgo: "8h",
    tags: ["Interview", "FinTech", "Razorpay"],
    upvotes: 54,
    comments: 18,
    saves: 22,
  },
  {
    id: "p-4",
    kind: "Discussion",
    title: "Hot take: most design system articles are written by people who haven't shipped one",
    body:
      "The advice loops are weirdly disconnected from teams that actually maintain a system in production. Curious if others see this.",
    author: "Maya Rao",
    authorTitle: "Senior Product Designer · Atlassian",
    postedAgo: "1d",
    tags: ["Design Systems", "Hot Take"],
    upvotes: 421,
    comments: 156,
    saves: 109,
    pinned: true,
  },
  {
    id: "p-5",
    kind: "Question",
    title: "How are you using AI day-to-day without losing your taste?",
    body:
      "Trying to find the line between 'AI as accelerator' and 'AI as crutch'. What's working for the people here?",
    author: "Devika S.",
    authorTitle: "Senior Designer · Bengaluru",
    postedAgo: "1d",
    tags: ["AI", "Workflow"],
    upvotes: 217,
    comments: 89,
    saves: 64,
  },
  {
    id: "p-6",
    kind: "Critique",
    title: "Settings IA for a wellness app — too many groups?",
    body:
      "Started with 4 groups. Then 6. Now 5. I think I'm drifting. Sanity check on info architecture, please.",
    author: "Rohan G.",
    authorTitle: "UX Designer · Mumbai",
    postedAgo: "2d",
    tags: ["IA", "UX", "Wellness"],
    upvotes: 38,
    comments: 14,
    saves: 9,
    hasImage: true,
    imageGradient: "from-orange-500/40 via-amber-500/20 to-yellow-700/10",
  },
];

export type Comment = {
  id: string;
  author: string;
  authorTitle: string;
  authorBadge?: "Mentor" | "OP";
  postedAgo: string;
  body: string;
  upvotes: number;
  replies?: Comment[];
};

export const COMMENTS: Record<string, Comment[]> = {
  "p-1": [
    {
      id: "c-1-1",
      author: "Maya Rao",
      authorTitle: "Senior Product Designer · Atlassian",
      authorBadge: "Mentor",
      postedAgo: "1h",
      upvotes: 42,
      body:
        "Day 1 of three onboarding screens, you're asking for too many things. Pick the one promise the app makes and prove it. Cut 'pick your color theme' to a setting later.",
      replies: [
        {
          id: "c-1-1-1",
          author: "Sahil M.",
          authorTitle: "Junior UX Designer · Pune",
          authorBadge: "OP",
          postedAgo: "45m",
          upvotes: 8,
          body: "This lines up with what I felt but couldn't name. Going to drop the theme step and re-test.",
        },
      ],
    },
    {
      id: "c-1-2",
      author: "Liam Patel",
      authorTitle: "Founding Designer · stealth",
      authorBadge: "Mentor",
      postedAgo: "30m",
      upvotes: 18,
      body:
        "Visually, the hero illustration on screen 2 is competing with the CTA. Try a single-color treatment — even a flat shape — and watch tap-throughs.",
    },
  ],
  "p-2": [
    {
      id: "c-2-1",
      author: "Yuki Tanaka",
      authorTitle: "Principal Designer · Shopify",
      authorBadge: "Mentor",
      postedAgo: "3h",
      upvotes: 65,
      body:
        "I made the same switch a decade ago. Lead with the one project that has clearest cause-effect on a metric. Drop anything that reads as a brand exercise unless you can show product impact.",
    },
  ],
};

export function getPostById(id: string): Post | undefined {
  return POSTS.find((p) => p.id === id);
}
