export type ToolCategory =
  | "Design"
  | "Prototyping"
  | "Handoff"
  | "Collaboration"
  | "Dev"
  | "Research";

export type Tool = {
  slug: string;
  name: string;
  emoji: string;
  gradient: string;
  category: ToolCategory;
  oneLiner: string;
  description: string;
  forWho: string;
  problemSolved: string;
  pricing: "Free" | "Freemium" | "Paid";
  rating: number;
  reviews: number;
  pathSlug?: string;
  features: string[];
};

export const TOOLS: Tool[] = [
  {
    slug: "figma",
    name: "Figma",
    emoji: "🎯",
    gradient: "from-fuchsia-500/40 via-purple-600/20 to-indigo-700/10",
    category: "Design",
    oneLiner: "The default UI design tool, with collaborative editing baked in.",
    description: "Real-time, browser-based UI design and prototyping. Auto-layout, components, variables, and a thriving plugin ecosystem.",
    forWho: "Anyone who designs interfaces. Solo designers up to design systems teams of 50+.",
    problemSolved: "Replaces the entire chain of Sketch + Abstract + Invision + Zeplin with one tool that runs in the browser.",
    pricing: "Freemium",
    rating: 4.9,
    reviews: 5810,
    pathSlug: "figma-from-zero-to-design-systems",
    features: ["Auto-layout", "Variables", "Dev Mode", "Plugins", "FigJam"],
  },
  {
    slug: "framer",
    name: "Framer",
    emoji: "⚡",
    gradient: "from-sky-500/40 via-indigo-500/20 to-violet-700/10",
    category: "Prototyping",
    oneLiner: "Design that ships as a real, fast website.",
    description: "Visual canvas + a real React renderer. Build production sites without writing the boilerplate.",
    forWho: "Designers who want to ship a marketing site without a developer.",
    problemSolved: "Closes the gap between Figma mockup and live site by making the design itself the production artifact.",
    pricing: "Freemium",
    rating: 4.6,
    reviews: 1820,
    features: ["Live publish", "CMS", "Animation", "React components"],
  },
  {
    slug: "webflow",
    name: "Webflow",
    emoji: "🌊",
    gradient: "from-emerald-500/40 via-teal-500/20 to-cyan-700/10",
    category: "Dev",
    oneLiner: "Visual web design with production-grade output.",
    description: "Pixel-perfect site builder with full CSS/HTML control, CMS, and e-commerce. Loved by content sites and agencies.",
    forWho: "Designers building marketing sites and small e-commerce.",
    problemSolved: "Lets a designer ship and maintain a site without ongoing engineering help.",
    pricing: "Paid",
    rating: 4.5,
    reviews: 2450,
    features: ["CSS Grid", "CMS", "E-commerce", "Animations", "Hosting"],
  },
  {
    slug: "notion",
    name: "Notion",
    emoji: "📚",
    gradient: "from-slate-400/40 via-zinc-500/20 to-stone-700/10",
    category: "Collaboration",
    oneLiner: "Where design teams write specs, decisions, and rituals.",
    description: "Docs, databases, wikis. Most design teams use it as their second brain — design briefs, project docs, retrospectives.",
    forWho: "Teams of 2+ designers working with PMs and engineers.",
    problemSolved: "Replaces Confluence + Google Docs + tracking spreadsheets for design workflows.",
    pricing: "Freemium",
    rating: 4.6,
    reviews: 9120,
    features: ["Databases", "Wiki", "Comments", "AI"],
  },
  {
    slug: "spline",
    name: "Spline",
    emoji: "🌀",
    gradient: "from-rose-500/40 via-pink-500/20 to-fuchsia-700/10",
    category: "Design",
    oneLiner: "3D for designers — finally, without Blender.",
    description: "Browser-based 3D design. Drop interactive 3D scenes into web and product UI.",
    forWho: "Designers exploring 3D as part of brand and product UI.",
    problemSolved: "Removes the months-long ramp on Blender or Cinema 4D for designers who just need a hero scene.",
    pricing: "Freemium",
    rating: 4.4,
    reviews: 980,
    features: ["3D editor", "Web export", "Animation", "Materials"],
  },
  {
    slug: "maze",
    name: "Maze",
    emoji: "🧪",
    gradient: "from-amber-500/40 via-orange-500/20 to-yellow-700/10",
    category: "Research",
    oneLiner: "Run usability tests in hours, not weeks.",
    description: "Unmoderated user testing on top of Figma prototypes. Heatmaps, completion rates, surveys.",
    forWho: "Solo designers and small teams who don't have a dedicated research function.",
    problemSolved: "Brings real user data into design decisions without hiring researchers.",
    pricing: "Freemium",
    rating: 4.5,
    reviews: 720,
    features: ["Prototype testing", "Surveys", "Heatmaps", "Recruitment"],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}
