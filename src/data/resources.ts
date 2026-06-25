/**
 * Resources — two curated buckets:
 *   - BLOG: external + internal reading worth the open tab.
 *   - INSPIRATION: design / AI tools, references, libraries.
 *
 * Each item carries a cover image so cards on /resources and the
 * homepage preview can render image-on-top.
 *
 * Mock data only — replace with DB queries when the schema lands.
 */

export type ResourceType = "BLOG" | "INSPIRATION";

export type Resource = {
  id: string;
  type: ResourceType;
  title: string;
  url: string;
  source: string;
  blurb: string;
  cover: string;
};

export const RESOURCES: Resource[] = [
  // ---------- Blogs ----------
  {
    id: "r-b-001",
    type: "BLOG",
    title: "Refactoring UI — visual design rules for developers",
    url: "https://refactoringui.com/",
    source: "Adam Wathan & Steve Schoger",
    blurb:
      "The practical 80/20 of visual craft — spacing, hierarchy, color — written for people who already ship.",
    cover:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "r-b-002",
    type: "BLOG",
    title: "Design at Stripe — the systems doc you wish your team wrote",
    url: "https://stripe.com/blog",
    source: "Stripe Design",
    blurb:
      "How Stripe ships and governs its design system across 100+ surfaces and product teams.",
    cover:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "r-b-003",
    type: "BLOG",
    title: "How to be a good design critic",
    url: "https://example.com/articles/design-critique",
    source: "Jared Spool",
    blurb:
      "The SCQA framework for giving critique that strengthens the work without bruising the maker.",
    cover:
      "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&w=1200&q=80",
  },

  // ---------- Inspiration & resources (AI + design) ----------
  {
    id: "r-i-001",
    type: "INSPIRATION",
    title: "21st.dev — modern UI building blocks",
    url: "https://21st.dev/",
    source: "21st.dev",
    blurb:
      "A library of polished, ship-ready React + Tailwind blocks — copy, adapt, deploy.",
    cover:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "r-i-002",
    type: "INSPIRATION",
    title: "getdesign.md — design rules for coding agents",
    url: "https://getdesign.md/",
    source: "getdesign.md",
    blurb:
      "A markdown-first spec of design tokens, components, and rules — built so AI agents can build to brand.",
    cover:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "r-i-003",
    type: "INSPIRATION",
    title: "MCP Market — Model Context Protocol servers + clients",
    url: "https://mcpmarket.com/",
    source: "MCP Market",
    blurb:
      "Browse the open MCP ecosystem — servers, tools, and integrations Claude (and other agents) can plug into.",
    cover:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
  },
];

export function blogs(): Resource[] {
  return RESOURCES.filter((r) => r.type === "BLOG");
}

export function inspiration(): Resource[] {
  return RESOURCES.filter((r) => r.type === "INSPIRATION");
}
