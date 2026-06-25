/**
 * Forum mock data — replaces the previous src/lib/mock.ts dump. The
 * forum is the only legacy feature that survived the pivot to the
 * Workshops → Assignment → Submission loop, so this is the smallest
 * surface area we can keep alive until the forum is wired to the DB.
 *
 * Author portraits from randomuser.me; post mockup images from Unsplash
 * (licensed for use without attribution).
 */

export type ForumPost = {
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

export const FORUM_POSTS: ForumPost[] = [
  {
    id: "p1",
    type: "critique",
    authorName: "Karthik R.",
    authorRole: "Junior designer",
    authorPhoto: "https://randomuser.me/api/portraits/men/22.jpg",
    title: "Critique my onboarding flow for a fintech app",
    body:
      "I'm designing onboarding for an Indian-market lending app. Target users are first-time digital lenders, mostly Tier-2 cities. I've got 4 screens — KYC, income, eligibility, offer. Roasting welcome.",
    tags: ["Critique", "Fintech", "Onboarding"],
    upvotes: 42,
    comments: 18,
    postedAgo: "3h ago",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "p2",
    type: "portfolio-review",
    authorName: "Priya M.",
    authorRole: "Looking for first PD job",
    authorPhoto: "https://randomuser.me/api/portraits/women/29.jpg",
    title:
      "Portfolio review request — graphic designer → product designer (3 years exp)",
    body:
      "Made the jump 6 months ago. Have 2 case studies and a tools redesign. Aiming for mid-level product roles in Bangalore. Brutally honest feedback please.",
    tags: ["Portfolio review", "Career switch"],
    upvotes: 87,
    comments: 34,
    postedAgo: "6h ago",
  },
  {
    id: "p3",
    type: "discussion",
    authorName: "Aman K.",
    authorRole: "Design lead",
    authorPhoto: "https://randomuser.me/api/portraits/men/52.jpg",
    title: "Hot take: most 'AI design tools' are demos, not workflow",
    body:
      "Spent the last month evaluating 18 AI-design tools for our team. Maybe 3 actually replaced something. The rest were impressive demos. What's actually in your daily workflow?",
    tags: ["AI tools", "Hot take"],
    upvotes: 156,
    comments: 92,
    postedAgo: "1d ago",
  },
  {
    id: "p4",
    type: "job-prep",
    authorName: "Sneha V.",
    authorRole: "Mid-level",
    authorPhoto: "https://randomuser.me/api/portraits/women/12.jpg",
    title: "Got a take-home from Razorpay — can someone share what to focus on?",
    body:
      "It's a 'design a feature for X' brief. 5-day timeline. Anyone been through this loop recently? What did the panel actually grade on?",
    tags: ["Job prep", "Take-home", "Razorpay"],
    upvotes: 64,
    comments: 22,
    postedAgo: "2d ago",
  },
  {
    id: "p5",
    type: "critique",
    authorName: "Tobias L.",
    authorRole: "Indie designer",
    authorPhoto: "https://randomuser.me/api/portraits/men/9.jpg",
    title: "Critique: dashboard for a SaaS analytics tool",
    body:
      "Solo founder vibes, designing my own product's dashboard. Charts feel busy and the empty state is meh. Where would you cut?",
    tags: ["Critique", "Dashboard", "SaaS"],
    upvotes: 38,
    comments: 14,
    postedAgo: "2d ago",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "p6",
    type: "discussion",
    authorName: "Reena Kapoor",
    authorRole: "Senior IC, Figma",
    authorPhoto: "https://randomuser.me/api/portraits/women/68.jpg",
    title: "If you're prepping for big-tech, do exactly this for app critiques",
    body:
      "I run mock interviews. Here's the 4-part structure that separates a 3-rating from a 5: (1) heuristic scan, (2) user → goal → flow, (3) one bold redesign idea, (4) trade-offs. Details inside.",
    tags: ["Big tech", "Interviews", "Mentor post"],
    upvotes: 412,
    comments: 78,
    postedAgo: "3d ago",
  },
];

export function findForumPost(id: string): ForumPost | undefined {
  return FORUM_POSTS.find((p) => p.id === id);
}
