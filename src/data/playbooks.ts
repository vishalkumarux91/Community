/**
 * Playbooks — RPS's own evergreen guides. MVP carries a single sample
 * (the Claude website step-by-step). New playbooks drop into PLAYBOOKS
 * and the listing renders them automatically.
 *
 * Mock data only — replace with DB queries when the schema lands.
 */

export type Playbook = {
  id: string;
  slug: string;
  title: string;
  topic: string;
  /** ~2 sentence summary for the listing card. */
  summary: string;
  /** Cover image — landscape, ~16:9. */
  cover: string;
  /** Markdown body — final shape will be MDX in the DB version. */
  body: string;
  /** Optional pointer to the matching workshop slug. */
  relatedWorkshopSlug?: string;
  /** Estimated read time in minutes. */
  readMinutes: number;
};

export const PLAYBOOKS: Playbook[] = [
  {
    id: "pb-001",
    slug: "build-a-website-with-claude",
    title: "Build a website with Claude — step by step",
    topic: "AI · Web",
    summary:
      "A practical, sample walk-through: from a one-line idea to a deployed marketing site, with the prompts that hold up at each step.",
    cover:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    relatedWorkshopSlug: "ship-with-claude",
    readMinutes: 10,
    body:
      "## What you'll build\n\nA one-page marketing site for a fictional indie product — hero, features, FAQ, footer. Responsive, deployed to Vercel, brand-consistent. The exact stack is Next.js + Tailwind, but the playbook is technology-agnostic — swap in any framework Claude can write.\n\n" +
      "## Step 1 — Frame the brief\n\nOpen a new conversation with Claude and start with the brief, not the code. One paragraph, three numbered constraints:\n\n> Build a one-page marketing site for `ProductName`. Audience: `<who>`. The hero must promise `<value>`. Constraints: (1) single page, (2) responsive, (3) under 5 sections.\n\nIf you can't write the three constraints in one breath, you're not ready to prompt yet. Pause, write them out, then start.\n\n" +
      "## Step 2 — Generate the structure\n\nAsk Claude for the section list before any code:\n\n> Given the brief above, propose the section list for this page in order. For each section, give me a one-line purpose. No code yet.\n\nRead the output. Cut anything that doesn't earn its keep. A four-section page beats a seven-section page nine times out of ten.\n\n" +
      "## Step 3 — Stack + scaffold\n\nWith the section list confirmed, prompt for the scaffold:\n\n> Generate a Next.js 16 App Router project scaffold with Tailwind v4. One page (`app/page.tsx`) containing placeholder sections matching the list above. Use semantic HTML. No design tokens yet.\n\nClaude will write `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, and the Tailwind config. Drop the files in, run `npm install`, then `npm run dev`. Confirm it boots before adding craft.\n\n" +
      "## Step 4 — Tokens before components\n\nThis is the step most people skip and regret. Before any visual styling, get the design tokens in:\n\n> Generate a token set in `globals.css` — color, type, spacing, radius — following the Airtable editorial style: white canvas, dark ink, near-black primary CTA, signature coral accent. Tokens only; no component styles yet.\n\nPaste in. Reload. The page will look raw — that's correct. Tokens are the floor; components build on top.\n\n" +
      "## Step 5 — Section by section\n\nNow prompt one section at a time, in order. For each one:\n\n> Style the `<hero>` section using only the tokens already in `globals.css`. Inter Tight 400 for the headline at 64px desktop / 40px mobile, near-black primary CTA + hairline-outline secondary. Calm whitespace, no atmospheric gradient.\n\nDon't pass the whole page back to Claude. One section per turn. Each section gets a clean prompt; each prompt names the tokens; each output is committed before the next.\n\n" +
      "## Step 6 — Where to step back in by hand\n\nLeave these to yourself, not the model:\n\n- **Spacing decisions.** Vertical rhythm between sections, the breathing room around the headline — these read as the brand. Tune by eye, not by prompt.\n- **Microcopy on the CTAs.** A button label is two or three words; you'll write a better one than a model will.\n- **The one thing that's load-bearing.** Whatever the page actually has to say — the value prop, the proof point, the price — write it yourself.\n\n" +
      "## Step 7 — Ship it\n\nDeploy to Vercel:\n\n> Generate the steps to deploy this to Vercel and add a custom domain. Show me the exact CLI commands and the dashboard fields I'll touch.\n\nFollow them. The site is live in under ten minutes. Send the URL to a friend for one round of feedback before posting it publicly — fresh eyes catch what familiar ones can't.\n\n" +
      "## Reusable prompts\n\nKeep these in a file. They survive across projects:\n\n- **Section list:** \"Given the brief, propose the section list in order. One-line purpose each. No code.\"\n- **Token spec:** \"Generate `globals.css` tokens — color, type, space, radius — following `<brand>` style. No component styles yet.\"\n- **Section build:** \"Style the `<section>` using only the tokens in `globals.css`. `<font + size>`. `<button pair>`. `<atmosphere notes>`.\"\n- **Deploy:** \"Generate Vercel deploy steps for this Next.js app, including custom domain.\"",
  },
];

export function findPlaybook(slug: string): Playbook | undefined {
  return PLAYBOOKS.find((p) => p.slug === slug);
}
