// ─────────────────────────────────────────────────────────────────────────
// Level Up — single content source.
//
// Consumed by BOTH the public marketing page (/levelup) and the member
// course view (/course), so curriculum + marketing copy live in one place.
//
// Lesson content is the team-provided field-guide text for the three tracks
// (Craft, Collaboration, Career). Linked videos/articles are third-party,
// free resources by independent creators — open in a new tab.
// TODO(team): confirm whether this stays hard-coded or moves to a CMS.
// ─────────────────────────────────────────────────────────────────────────

export type ResourceKind = "watch" | "read" | "use" | "browse";

export type ResourceLink = {
  kind: ResourceKind;
  title: string;
  source: string;
  /** Third-party URL — render with target="_blank" + rel + "external" label. */
  url: string;
};

/** Optional two-column comparison table inside a lesson. */
export type LessonTable = {
  head: [string, string];
  rows: [string, string][];
};

/** Optional stage / step diagram inside a lesson. */
export type LessonSteps = {
  caption?: string;
  items: { label: string; text: string }[];
};

export type Lesson = {
  id: string;
  title: string;
  /** The idea — explained plainly (one or more paragraphs). */
  idea: string[];
  /** In the wild — how a real product/team solves it. */
  inTheWild?: string;
  /** An optional comparison table from the guide. */
  table?: LessonTable;
  /** An optional stage diagram from the guide. */
  steps?: LessonSteps;
  /** Watch / Read — hand-picked free resources. */
  links?: ResourceLink[];
  /** Try it — a small, concrete rep. */
  tryIt?: string;
  /** What juniors get wrong — the tell to skip. */
  pitfall?: string;
  /** Say this — exact phrasing for a hard moment. */
  sayThis?: string;
};

export type Part = {
  id: string;
  number: string; // "01"
  title: string;
  blurb: string;
  intro?: string;
  outcomes: string[];
  lessons: Lesson[];
  capstone: string;
};

/** A "The Bar" checklist item; `ref` is a lessonId to open on click. */
export type BarItem = { text: string; ref?: string };

export type Track = {
  id: string;
  n: number;
  name: string;
  title: string;
  subtitle: string;
  accent: string;
  intro: string;
  /** Before-you-start framing for the track. */
  about?: string[];
  parts: Part[];
  barTitle: string;
  bar: BarItem[];
  /** Optional closing note (Track 3's "Launch" system). */
  outro?: { title: string; body: string };
};

export const COURSE_META = {
  name: "Level Up",
  tagline: "Go from course-finished to job-ready.",
  meta: "Free with an account · 3 tracks · ~6 weeks each · self-paced",
  // TODO(team): confirm CTAs point to your real sign-up / login flow.
  signUpHref: "/auth/sign-up",
  loginHref: "/auth/sign-in",
  courseHref: "/course",
};

/** How each lesson is built — shown to members so they know what to do. */
export const LESSON_RHYTHM: { label: string; text: string }[] = [
  { label: "The idea", text: "Explained plainly, in the fewest words that still respect the topic." },
  { label: "In the wild", text: "How a product you already use actually solves it, so the concept stops being abstract." },
  { label: "Watch / read", text: "A hand-picked free video or article by someone who teaches that one topic well." },
  { label: "Try it", text: "A small, concrete thing to build. Reading about craft doesn't build craft — reps do." },
  { label: "What juniors get wrong", text: "The specific mistake that quietly marks someone as inexperienced, so you can skip it." },
];

export const MARKETING = {
  hero: {
    eyebrow: "A self-paced course for designers",
    headline: "Level Up",
    subhead:
      "You finished the course. You can open Figma and make a screen look decent. This is the part nobody warned you about: the gap between that and being someone a product team can hand a real feature to. Three self-paced tracks close it — in the order it actually happens.",
    primaryCta: "Start free",
    secondaryCta: "See what's inside",
  },
  why: {
    heading: "Why it exists",
    body: "A course teaches you the design process — research, wireframes, making a screen look decent. It rarely teaches what comes next: the craft that shows up the moment your work meets engineers, real data, and other people's opinions. That gap is why genuinely skilled designers send a hundred applications and hear nothing. Level Up closes it.",
  },
  tracksHeading: "Three tracks. One path to job-ready.",
  trackCards: [
    {
      name: "Craft",
      title: "Make Your Work Production-Grade",
      body: "Components, design systems, real-world states, and Figma speed — the output a team trusts on day one.",
    },
    {
      name: "Collaboration",
      title: "Work Like You're Already on a Team",
      body: "Handoff, critique, communication, and an AI-augmented workflow — so your great work actually ships.",
    },
    {
      name: "Career",
      title: "Get the Job and the Headstart",
      body: "Case studies that get interviews and answers that get offers — skill, converted into a career.",
    },
  ],
  value: {
    heading: "What you walk away with",
    items: [
      "Work a developer can build from your file alone — no follow-up questions.",
      "The collaboration skills that make a team want to keep you.",
      "A portfolio and interview performance that turns “skilled” into “hired.”",
    ],
  },
  howItWorks: {
    heading: "How it works",
    points: [
      "Free with an account",
      "Three self-paced tracks, ~6 weeks each",
      "Best done in order",
    ],
    note: "Read for the why, watch for the how, build to own it.",
  },
  finalCta: {
    heading: "Ready to design up?",
    body: "Create your free account and start with Craft today.",
    primaryCta: "Start free",
    secondaryCta: "Already a member? Log in",
  },
};

// ── Track 1 · Craft ─────────────────────────────────────────────────────────

const craft: Track = {
  id: "craft",
  n: 1,
  name: "Craft",
  title: "Make Your Work Production-Grade",
  subtitle:
    "The skills a team trusts on day one — components, design systems, real-world states, and Figma speed.",
  accent: "var(--accent-orange)",
  intro:
    "The “last mile” between finishing a course and being genuinely job-ready: the unglamorous, durable craft that shows up the moment your work meets engineering, real data, and other people's opinions.",
  about: [
    "You've already learned the process — a bootcamp or a course taught you research, wireframes, and how to make a screen look decent. This track is about the gap nobody warns you about: the difference between a designer who can make screens and one a product team can hand a real feature to and trust.",
    "That gap is almost always “craft” — the unglamorous, durable skills that show up the moment your work meets engineering, real data, and other people's opinions. Junior portfolios are full of beautiful happy-path screens. Production work is full of components that scale, states that don't break, files other people can read, and decisions you can defend. Close that gap and you stop looking like a beginner, regardless of how long you've been designing.",
    "Who this is for: anyone who has finished a UX/UI course or bootcamp, switched in from a nearby field, or has been designing solo and wants to work the way real teams do. You don't need a job yet — this is what gets you one, and what keeps you from drowning in your first ninety days.",
  ],
  parts: [
    {
      id: "components",
      number: "01",
      title: "Component Craft & Design Systems",
      blurb: "Stop designing screens. Start building parts that scale.",
      intro:
        "If there is one skill that instantly separates “I just finished a course” from “I can join your team,” it's this one. Anyone can draw a button. A production designer builds a button once, in a way that flexes to every situation, updates everywhere when the brand changes, and hands to a developer without a single question. This part teaches you to think in systems instead of screens.",
      outcomes: [
        "Build reusable components with proper structure, variants, and properties.",
        "Set up design tokens and variables for color, type, spacing, and theming.",
        "Assemble a small but real design system — and document it so others can use it.",
      ],
      lessons: [
        {
          id: "parts-not-screens",
          title: "Think in parts, not screens",
          idea: [
            "Beginners design a screen as one big picture: they place a header, draw a card, type some text, drop in a button, and move the next one a few pixels off because they eyeballed it. It looks fine. Then the client asks for a second screen, and a third, and suddenly there are nine slightly different buttons and four shades of “the same” grey across the file. The work doesn't scale because it was never built to.",
            "The mental shift is simple but deep: a product is not a stack of screens, it's a small set of parts arranged in different ways. A button, an input, a card, a list row, a nav bar. Design the parts well, define how they behave, and screens become a matter of assembling pieces you already trust. This is the difference between drawing and engineering — and it's why teams move fast without falling apart.",
          ],
          inTheWild:
            "Linear — open it and notice how every list row, button, menu, and label feels cut from the same cloth. That consistency isn't discipline applied screen by screen — it's a tiny, ruthless component set reused everywhere. The product feels fast and trustworthy partly because nothing is ever slightly off. Compare that to an early-stage app where every page looks like a different designer made it: same features, far less trust.",
          links: [
            {
              kind: "watch",
              title: "Create a Design System — Foundations",
              source: "Figma (official)",
              url: "https://www.youtube.com/watch?v=EK-pHkc5EL4",
            },
          ],
          pitfall:
            "They copy-paste a button instead of making it a component. The fifth time the design changes, they're hand-editing dozens of copies — and missing a few. A reviewer can spot this instantly: inconsistent spacing and near-duplicate elements are the fingerprint of someone who hasn't learned to work in parts yet.",
        },
        {
          id: "component-anatomy",
          title: "The anatomy of a good component",
          idea: [
            "A good component is more than “a thing I turned into a component.” It has deliberate structure: clean, named layers; a clear content area; padding that comes from rules rather than nudging; and a sensible idea of what should be editable and what should stay locked. Think of it as a small contract — “give me a label and an optional icon, and I'll always look right.”",
            "Take a button. Its anatomy is a container with horizontal padding, a centered row holding an optional leading icon, a text label, and an optional trailing icon. The container has a corner radius, a fill, and a defined height. Everything about it is a decision you can write down. When the anatomy is explicit, the component behaves predictably — and a developer can rebuild it from your file alone.",
          ],
          table: {
            head: ["Part of the button", "The decision behind it"],
            rows: [
              ["Container", "Fill, corner radius, height, horizontal padding — all from tokens, never magic numbers."],
              ["Label", "One text style; truncates or wraps by a rule, not by accident."],
              ["Leading / trailing icon", "Optional, toggled with a property — not a separate “button with icon” copy."],
              ["Spacing", "Gap between icon and label comes from auto layout, so it's identical every time."],
            ],
          },
          links: [
            {
              kind: "read",
              title: "Explore component properties",
              source: "Figma Learn",
              url: "https://help.figma.com/hc/en-us/articles/5579474826519",
            },
          ],
          tryIt:
            "Build one button component from scratch. No copying. Give it auto layout, a text property for the label, and a boolean property to show or hide a leading icon. Rename every layer so a stranger could read the layer panel and understand it. This single button is the seed of everything in Part One.",
        },
        {
          id: "variants-properties",
          title: "Variants & properties — one component, many forms",
          idea: [
            "Real buttons aren't one button. They're primary and secondary and ghost; small, medium, large; default, hover, pressed, disabled. The amateur instinct is to make a separate component for each combination. The professional move is to combine them into a single component set with variant properties — Type, Size, State — so the person using it just flips dropdowns instead of hunting through a library of near-identical things.",
            "Pair variants (for the meaningfully different versions) with the other property types: boolean for things that toggle on and off (show icon?), text for editable labels, and instance swap for nested pieces you might exchange (which icon?). Done right, one button covers dozens of cases and stays maintainable. Done wrong, you get “variant explosion” — hundreds of combinations nobody can navigate.",
          ],
          inTheWild:
            "Material & Polaris — public design systems are your free textbooks. Google's Material and Shopify's Polaris both define a handful of button kinds and a small grid of states — not an endless list. Study how they decide what deserves a variant (a real behavioral difference) versus what should just be a property (a small on/off detail). That judgment is the actual skill.",
          links: [
            {
              kind: "watch",
              title: "Master Figma Components & Variants in 20 Minutes",
              source: "DesignWithArash",
              url: "https://www.youtube.com/watch?v=bnoPAezI6cw",
            },
            {
              kind: "watch",
              title: "The Ultimate Guide to Components & Variants",
              source: "Sergei Chyrkov",
              url: "https://www.youtube.com/watch?v=6XST-BB2JpI",
            },
          ],
          pitfall:
            "Variant explosion. Making State × Size × Type × HasIcon all variants creates a wall of combinations. Reserve variants for genuinely different appearances; use boolean and instance-swap properties for the rest. If your component set has 60 frames, you've modelled it wrong.",
        },
        {
          id: "auto-layout-skeleton",
          title: "Auto layout is the skeleton",
          idea: [
            "Auto layout is the single feature that turns static drawings into components that behave. It lets a frame arrange its children automatically — in a row or column, with consistent gaps and padding — and resize itself as content changes. A button with auto layout grows when its label gets longer. A card with auto layout keeps its padding no matter what you put inside. Without it, every content change means manual cleanup; with it, your components are alive.",
            "The three resizing behaviors are the whole game: Hug contents (the frame shrinks to fit), Fill container (the child stretches to fill the parent), and Fixed (a set size). Most real layouts are just nested auto layout frames mixing these three. A list row, for example, is a horizontal frame: an avatar (fixed), a text block (fill), and a timestamp (hug) — and it will look correct at any width.",
          ],
          links: [
            {
              kind: "watch",
              title: "Auto Layout Explained in 10 Minutes",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=QDjPXRWOLbI",
            },
            {
              kind: "read",
              title: "Guide to auto layout (+ practice file)",
              source: "Figma Learn",
              url: "https://help.figma.com/hc/en-us/articles/5731482952599",
            },
          ],
          tryIt:
            "Build a notification list row using only nested auto layout: avatar (fixed) · name + message (fill, wraps to two lines) · time (hug). Then drag the row wider and narrower. If the avatar and time stay put while the message reflows, you've got it. If things overlap or float, fix your hug/fill settings before moving on.",
          pitfall:
            "They apply auto layout but leave everything “fixed,” so nothing actually responds — then wonder why their component breaks. Auto layout without the right resizing behavior is just a fancy group.",
        },
        {
          id: "tokens-variables",
          title: "Design tokens & variables — decisions you only make once",
          idea: [
            "A token is a named design decision. Instead of typing #1A73E8 into forty places, you define color/action/primary once and reference it everywhere. Change the value in one spot and the whole product updates. Figma calls these variables, and they're how modern systems stay consistent and theme themselves (light/dark, multiple brands) without an army of duplicated components.",
            "The structure that scales is a three-layer chain. Primitives are raw values with no opinion (every grey, every blue, every spacing step). Semantic tokens give those raw values meaning by use (“the color of a primary action,” “the page background”). Component tokens (optional) point a specific part at a semantic token. The magic of the middle layer: it lets you re-theme by repointing semantic tokens, while component names never change.",
          ],
          steps: {
            caption: "The three-layer token chain",
            items: [
              { label: "Primitive", text: "blue/600 = #2563EB — a raw value, no meaning." },
              { label: "Semantic", text: "action/primary = blue/600 (in light mode)." },
              { label: "Component", text: "button/bg = action/primary." },
            ],
          },
          inTheWild:
            "Light/dark & theming — this is exactly how an app ships a dark mode without redrawing every screen. The component still says “use action/primary”; only the value behind that token changes between modes. Products like Stripe's dashboard and countless apps theme themselves this way — one set of components, swappable values underneath.",
          links: [
            {
              kind: "read",
              title: "Guide to variables in Figma",
              source: "Figma Learn",
              url: "https://help.figma.com/hc/en-us/articles/15339657135383",
            },
            {
              kind: "watch",
              title: "Design System & Variable Set-Up — Full Tutorial",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=L-tpK7Eeuow",
            },
          ],
          tryIt:
            "Create two variable collections: Primitives (5–6 greys, one brand color, a spacing scale of 4/8/12/16/24/32) and Tokens (bg/page, text/primary, action/primary, border/default). Add a second mode for dark, repoint the semantic tokens, and switch a frame from light to dark with one click.",
        },
        {
          id: "assemble-system",
          title: "Assembling a small — but real — design system",
          idea: [
            "A design system isn't a 500-component megaproject; at its core it's foundations plus a component library plus documentation. Foundations are your tokens: color, a type scale, a spacing scale, corner radii, and elevation/shadows. The library is the parts built on those foundations — button, input, checkbox, card, badge, list row, nav. Documentation is the short note on each that says how and when to use it.",
            "Build bottom-up. Lock the foundations first, because everything inherits from them. Then build the smallest components (button, input, icon), then the ones that contain them (a form, a card with a button inside). This is the spirit of “atomic design” — atoms combine into molecules into organisms — without needing to be religious about the vocabulary. The point is that big things are made of small, trustworthy things.",
          ],
          inTheWild:
            "Read real systems — some of the best systems are fully public and free to study: Shopify Polaris, IBM Carbon, GitHub Primer, Atlassian, and Google Material. Don't just look at the components — read the usage sections. The line “use this button for the single most important action on a screen” is design-system thinking in one sentence, and it's the part beginners always skip.",
          links: [
            {
              kind: "watch",
              title: "Your First Design System in Figma (Beginner)",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=_uva2dQPlV8",
            },
            {
              kind: "watch",
              title: "Build a Design System — Full Course",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=opTANvl9G1g",
            },
          ],
          pitfall:
            "They build 40 pretty components and zero documentation. A system nobody can understand isn't a system — it's a folder. Even one line of guidance per component (“when to use,” “when not to”) is what makes it usable by a team, and it's exactly what interviewers look for.",
        },
        {
          id: "naming-organization",
          title: "Naming & organization — the unglamorous superpower",
          idea: [
            "Naming is where craft becomes invisible and obvious at the same time. Figma uses slash-naming to build hierarchy: a component named Button/Primary/Large automatically nests in the assets panel. Layers named label, icon-leading, and container tell a developer exactly what they're looking at. “Frame 247” tells them you didn't care.",
            "Organize the file the way teams do: separate pages for your cover/readme, work-in-progress, ready-for-dev, and an archive. Publish your components as a library so they can be reused across files. None of this is glamorous, and all of it is the reason senior designers can be handed your file and not immediately sigh.",
          ],
          tryIt:
            "Take the components you built in this part and rename every layer and component with intention — slash-naming for components, plain human names for layers. Then split your file into pages: Readme · WIP · Ready · Archive. Open it tomorrow and see if it still makes sense at a glance.",
        },
      ],
      capstone:
        "Build a mini design system: tokens (color + spacing + type scale) with a light and dark mode, and four components — button, text input, card, and badge — each with proper variants/properties, auto layout, and one line of usage docs. This single file is the strongest possible proof, in an interview, that you're not a beginner. We'll keep using it in Parts Two and Three.",
    },
    {
      id: "real-world",
      number: "02",
      title: "Designing for the Real World",
      blurb: "States, edge cases, forms, accessibility — the screens bootcamps skip.",
      intro:
        "Course projects live on the happy path: the inbox always has three nice emails, the search always finds something, the form is always filled correctly. Real products spend most of their life off that path — loading, empty, broken, half-filled, on a slow connection, used by someone who can't see the screen clearly. This part is about the screens bootcamps never show you, and they are exactly the screens that get you hired.",
      outcomes: [
        "Design every state of a screen — empty, loading, partial, ideal, error, success.",
        "Build forms and product patterns (search, filters, tables) that hold up under real use.",
        "Apply accessibility and responsive fundamentals so your work survives real users and real devices.",
      ],
      lessons: [
        {
          id: "five-states",
          title: "Every screen has five lives",
          idea: [
            "A screen is not one design; it's a small family of designs for the situations the screen can be in. Before you call anything “done,” walk it through its states. The classic five: empty (no content yet), loading (content is coming), partial (some content, some still loading or missing), ideal (the happy path everyone designs), and error (something went wrong). Many flows add a success state too.",
            "Designing only the ideal state is the most common beginner tell. The moment you start asking “what does this look like with nothing in it? while it loads? when the request fails?”, your work jumps a level — because you're now designing the experience, not just the screenshot.",
          ],
          steps: {
            caption: "The five states (plus success)",
            items: [
              { label: "Empty", text: "No data yet. First use, or everything cleared. An opportunity, not a dead end." },
              { label: "Loading", text: "Content is on its way. Skeletons or spinners; never a frozen blank." },
              { label: "Partial", text: "Some content present, more arriving or missing. Often forgotten." },
              { label: "Ideal", text: "The happy path. Real, varied content — not three perfect rows." },
              { label: "Error", text: "Something failed. Say what, why, and how to recover." },
              { label: "Success", text: "A task completed. Confirm it, then point to the next step." },
            ],
          },
          inTheWild:
            "Gmail & Slack — Gmail's empty inbox doesn't show a blank white void; it congratulates you. Slack fills loading and idle moments with light, on-brand messages instead of a dead spinner. These tiny decisions are what make a product feel cared-for. They cost almost nothing and they're invisible until they're missing.",
        },
        {
          id: "empty-states",
          title: "Empty states, done right",
          idea: [
            "An empty state is the first thing many users ever see, so treating it as an afterthought wastes your best onboarding moment. There are four common kinds, and each wants a different response. First-use: explain the value and give one clear action to create the first thing. User-cleared (inbox zero, all tasks done): acknowledge the win. No results (a search returned nothing): explain why and offer a way forward — broaden the query, clear filters. Error-as-empty (couldn't load): be honest and offer a retry.",
            "The structure of a good empty state is almost always the same: a short, human headline; one line of context; and a single primary action. Resist decoration for its own sake — a giant illustration with no “what do I do now?” is a pretty dead end.",
          ],
          inTheWild:
            "Notion & Dropbox — Notion's blank page nudges you with “Press / for commands,” turning emptiness into a tutorial. A fresh Dropbox folder tells you to drag files in. Both treat the empty state as a prompt, not a gap. That's the reframe: empty isn't the absence of design, it's a design problem of its own.",
          links: [
            {
              kind: "read",
              title: "Empty States: The Most Overlooked Aspect of UX",
              source: "Toptal",
              url: "https://www.toptal.com/designers/ux/empty-state-ux-design",
            },
            {
              kind: "browse",
              title: "Empty State patterns & examples",
              source: "Mobbin",
              url: "https://mobbin.com/glossary/empty-state",
            },
          ],
          tryIt:
            "Pick any list-based screen (messages, tasks, saved items). Design all four empty states — first-use, all-cleared, no-search-results, and failed-to-load — each with a headline, one line of context, and one action. Reuse the components from your Part One system.",
        },
        {
          id: "loading-error",
          title: "Loading & error states — designing for when things go wrong",
          idea: [
            "Loading: the question is never “spinner or not,” it's “how do I keep the user oriented while they wait?” For content with a known shape (a feed, a profile), skeleton screens — grey placeholders in the layout's shape — feel faster than a spinner because the page appears to be assembling itself. For short, unpredictable waits, a simple spinner is fine. For anything over a few seconds, show progress or reassurance.",
            "Errors: a good error message does three things — says what happened, in plain language; explains why if it helps; and offers a clear way to recover. Match the error to its scale: a wrong field gets inline, in-context feedback; a failed page load gets a full-screen state with a retry. “Something went wrong” with no next step is the error-message equivalent of a shrug.",
          ],
          inTheWild:
            "Stripe Checkout — Stripe's payment forms are a masterclass in error handling: problems appear inline next to the exact field, in human language (“Your card's expiration date is in the past”), the moment they can be detected — not after you hit submit and lose everything. That precision is why people trust typing their card number into it.",
          pitfall:
            "They design one generic error screen and reuse it everywhere, and they forget loading entirely — so their prototype teleports from tap to fully-loaded screen. Real products spend real time in between. Show it.",
        },
        {
          id: "forms",
          title: "Forms that survive real users",
          idea: [
            "Forms are where products make or lose money, and where sloppy design does the most damage. The fundamentals are well-established and worth burning into memory: prefer a single column (eyes track straight down); use persistent top labels, never placeholder-only fields that vanish the moment someone types; validate inline, after a field is completed, not in a wall of red after submit; mark whichever is rarer — required or optional — clearly; and ask for the fewest fields you genuinely need.",
            "Then handle the details that signal experience: the right input type and keyboard for each field (email, number, phone), helpful microcopy under tricky fields, a password field with a show/hide toggle and a strength hint, and segmented, paste-friendly OTP inputs. Every one of these is a small thing; together they're the difference between a form people finish and one they abandon.",
          ],
          table: {
            head: ["Do", "Instead of"],
            rows: [
              ["Labels above fields, always visible", "Placeholder text as the label (disappears, fails accessibility)"],
              ["Validate when a field is done", "All errors dumped on submit"],
              ["One column, logical order", "Two columns that zig-zag the eye"],
              ["Mark the rarer of required/optional", "No indication, so users guess"],
              ["Specific errors (“date is in the past”)", "“Invalid input”"],
            ],
          },
          links: [
            {
              kind: "read",
              title: "Your Ultimate Guide to Form Design",
              source: "UX Design Institute",
              url: "https://www.uxdesigninstitute.com/blog/guide-to-form-design/",
            },
            {
              kind: "read",
              title: "Better Form Design: UX tips & tutorial",
              source: "LogRocket",
              url: "https://blog.logrocket.com/ux-design/better-form-design/",
            },
          ],
          tryIt:
            "Design a sign-up form and its full state set: empty, focused field, inline validation error, loading on submit, and success. Use top labels, one column, and specific error copy. Bonus: design the same form for a 375px-wide phone.",
        },
        {
          id: "patterns",
          title: "Real product patterns — search, filters, tables, lists",
          idea: [
            "Beyond single screens, products are built from recurring patterns, and knowing the standard solutions means you don't reinvent (or botch) them. Search needs a clear input, a results state, a no-results state, and ideally recent/suggested queries. Filters need to show what's active, be easy to clear, and tell you how many results remain. Tables and lists need to handle sorting, selection, very long content, and — again — empty and loading states.",
            "These patterns have well-understood best practices because millions of users have already taught the industry what works. Your job isn't novelty here; it's fluency. Use the established pattern, fit it to your product, and save your creativity for the parts that actually need it.",
          ],
          inTheWild:
            "Airbnb filters — Airbnb's filters always show how many stays match before you commit (“Show 312 places”), keep active filters visible, and make clearing them effortless. Notice how it reduces the fear of “did I just hide everything?” That reassurance is the pattern doing its job.",
          pitfall:
            "They design tables and lists with three short, tidy rows. Then real data arrives — a name that's 40 characters, a description that wraps to four lines, a list with 900 items — and the design falls apart. Always stress-test patterns with ugly, realistic content.",
        },
        {
          id: "accessibility",
          title: "Accessibility you can't skip",
          idea: [
            "Accessibility isn't a special mode for a few users; it's baseline quality that happens to be legally required in many places. You don't need to memorize the whole spec to clear the bar that matters in everyday UI work — four habits cover most of it.",
            "Contrast: body text needs a contrast ratio of at least 4.5:1 against its background (large text and UI elements like icons/borders, at least 3:1) — check it with a tool, don't eyeball it. Don't rely on color alone: a red field and a green field look identical to a colorblind user, so pair color with an icon, label, or text. Visible focus: every interactive element needs a clear focus state for keyboard users — design it on purpose. Touch targets: tappable things should be roughly 44–48px, so fingers (and shaky hands) can hit them.",
          ],
          inTheWild:
            "Your own Part One tokens — this is why semantic color tokens pay off: run your text/primary on bg/page through a contrast checker once, fix it at the token level, and every component inherits an accessible pairing automatically. Accessibility becomes a property of the system, not a per-screen chore.",
          links: [
            {
              kind: "use",
              title: "WebAIM Contrast Checker",
              source: "WebAIM",
              url: "https://webaim.org/resources/contrastchecker/",
            },
            {
              kind: "read",
              title: "Color contrast accessibility: how to get it right",
              source: "iubenda",
              url: "https://www.iubenda.com/en/help/120597-color-contrast-accessibility",
            },
          ],
        },
        {
          id: "responsive",
          title: "Responsive & adaptive thinking",
          idea: [
            "Your design will be viewed on a phone, a laptop, and a wide monitor, and “it looked fine on my artboard” is not a defense. Two tools do most of the work. Auto layout (from Part One) handles the fluid stretching and reflowing within a screen size. Breakpoints handle the bigger structural changes between sizes — a three-column grid collapsing to one column, a sidebar becoming a bottom bar. Designing mobile-first (start narrow, then expand) tends to produce cleaner results than shrinking a desktop layout down.",
            "The deeper skill is thinking about content reflow: what should wrap, what should hide, what should resize, and what should move. A price stays put; a long description wraps; a secondary action might collapse into a menu on small screens. Decide these on purpose.",
          ],
          links: [
            {
              kind: "watch",
              title: "Responsive Design in Figma Using Breakpoints",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=DmgSnNSRYks",
            },
            {
              kind: "read",
              title: "Create a responsive component",
              source: "Figma Learn",
              url: "https://help.figma.com/hc/en-us/articles/5601723884951",
            },
          ],
        },
      ],
      capstone:
        "Take one real flow — say, a “search → results” experience — and design it completely: the search entry, the loading state, the results (with realistic, messy content), the no-results empty state, and an error state — at both phone and desktop widths, with contrast and focus states checked. That single, thorough flow is worth more in a portfolio than ten happy-path screens.",
    },
    {
      id: "speed",
      number: "03",
      title: "Figma at Production Speed",
      blurb: "Work fast, stay organized, hand off clean.",
      intro:
        "Knowing what to design is half the job; producing it quickly and cleanly is the other half. On a team, your speed and your tidiness are leverage — they decide how much you ship and how little you cost everyone around you. A messy, slow file isn't a personal quirk; it's a tax the whole team pays. This part turns the craft from Parts One and Two into a fast, organized, handoff-ready way of working.",
      outcomes: [
        "Move fast with advanced auto layout, variables/modes, and component properties.",
        "Build prototypes that communicate intent, and organize files a team can navigate.",
        "Hand off work that developers can build from with minimal back-and-forth.",
      ],
      lessons: [
        {
          id: "auto-layout-mastery",
          title: "Auto layout mastery",
          idea: [
            "You met auto layout as a skeleton in Part One; here it becomes a speed tool. The advanced moves are nesting frames to mix horizontal and vertical flows in one component, using wrap so items flow onto new lines automatically, setting min/max widths so things flex within limits, and using absolute position to pin an element (a badge, a close button) inside an auto-layout frame without breaking the flow. The “ignore auto layout” toggle is how you place that one floating element without fighting the system.",
            "Mastery looks like building a full product card — image, tag, title, description, price, button — in under two minutes, entirely in auto layout, so it stays perfect at any width and any content length. That fluency is what lets you explore ten variations in the time a beginner builds one.",
          ],
          links: [
            {
              kind: "watch",
              title: "How to Master Auto Layout in Figma",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=jiOv6_Yi7yI",
            },
          ],
          tryIt:
            "Rebuild a product card from a real shopping app entirely in nested auto layout. Pin a “Sale” badge to the corner with absolute position. Then resize the card from narrow to wide and confirm nothing breaks. Time yourself; do it again tomorrow and beat your time.",
        },
        {
          id: "variables-modes",
          title: "Variables & modes for speed and scale",
          idea: [
            "Variables aren't only for color tokens. Modes let one set of designs serve many contexts — light/dark, compact/comfortable density, multiple brands — by swapping values, not files. Number variables can drive spacing and even responsive sizing. And in prototyping, variables let you store state (a count, a toggle, a logged-in flag) so you can build a realistic interactive prototype with a fraction of the frames.",
            "The payoff is leverage: change one variable and watch dozens of screens update at once. This is how a designer keeps a fast-growing product consistent without manually touching every artboard — and it's increasingly how design files stay legible to AI and code tools that read your structure.",
          ],
          inTheWild:
            "One file, many themes — multi-brand companies (and any product with a dark mode) rely on modes so a single component library renders correctly across themes. The component never changes; the mode does. If you've built the tokens from Part One, you already have the foundation — modes are the switch on top.",
        },
        {
          id: "component-properties",
          title: "Component properties to collapse complexity",
          idea: [
            "The fastest libraries aren't the ones with the most components — they're the ones with the fewest, made flexible by properties. Reach for the right property type deliberately: variant for genuinely different appearances, boolean for show/hide toggles, text for editable copy, and instance swap for interchangeable nested pieces (swap which icon, which avatar). Used well, a single component flexes to dozens of needs and stays navigable.",
            "This is the cure for the variant explosion warned about in Part One. Every time you're tempted to make a new variant, ask whether a property would do the job. Usually it will, and your library stays small enough for a teammate to actually use.",
          ],
          links: [
            {
              kind: "watch",
              title: "Figma Components FULL GUIDE",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=OD7jCT0kuVc",
            },
          ],
        },
        {
          id: "prototyping",
          title: "Prototyping that communicates",
          idea: [
            "A prototype's job is to make intent unmistakable — to a teammate, a stakeholder, or a usability tester. You don't always need high fidelity; you need the right fidelity. A simple click-through is enough to test a flow. Smart animate shows how elements transition. Overlays handle menus, sheets, and modals. Variables and conditionals let you fake real logic — a working toggle, a counter, a form that responds — without a hundred near-identical frames.",
            "The judgment is knowing when to stop. A polished micro-interaction is wasted if the flow itself is still in question; a rough click-through is perfect for that stage. Match prototype effort to the question you're trying to answer.",
          ],
          links: [
            {
              kind: "watch",
              title: "Figma: Advanced Prototyping Tutorials",
              source: "YouTube (playlist)",
              url: "https://www.youtube.com/results?search_query=figma+advanced+prototyping",
            },
          ],
          pitfall:
            "They over-polish a prototype to impress, burning hours on smart-animate flourishes while the underlying flow is still unresolved — or they hand over a static frame and expect the developer to guess the motion. Prototype the parts that carry a decision; annotate the rest.",
        },
        {
          id: "file-organization",
          title: "File organization & naming conventions",
          idea: [
            "A team file is a shared space, and the same rules from Part One scale up here. Use pages to separate stages — a readme/cover, work-in-progress, ready-for-dev, and an archive — so nobody builds from a half-finished idea. Use sections within a page to group flows. Keep layer and component names human and consistent. Pin the components and tokens in a published library so every file pulls from one source of truth.",
            "This sounds like bureaucracy until you've opened a 300-layer file named entirely “Frame,” “Frame 2,” “Group 14” and had to reverse-engineer what the designer meant. Tidy files are a kindness to your teammates and your future self — and in interviews, a well-organized file quietly says “I've done this for real.”",
          ],
          tryIt:
            "Take any old, messy project file you have. Restructure it: pages for WIP/Ready/Archive, sections for each flow, every component slash-named, every meaningful layer renamed. Time how long it takes — that number is roughly the debt your messy files quietly charge a team every week.",
        },
        {
          id: "speed-system",
          title: "Build a speed system: shortcuts, plugins, steal-smart",
          idea: [
            "Speed is mostly habits. Learn the keyboard shortcuts you use hourly until your hands do them without thought — frame, auto layout, component, the alignment keys, copy properties. Keep a tiny, trusted set of plugins rather than hoarding fifty; a few good ones for content, accessibility checks, and icon insertion cover most needs. And work components-first: build the parts, then assemble, instead of detailing one screen at a time.",
            "Finally, learn to “steal smart.” You're not expected to invent every pattern. Reference libraries of real product screenshots let you study how shipping apps solve a problem, then adapt — not copy — the proven solution. Standing on the industry's shoulders is faster and smarter than starting from a blank artboard every time.",
          ],
          inTheWild:
            "Reference, don't reinvent — tools like Mobbin catalogue thousands of real app flows. Before designing a checkout, an onboarding, or a settings screen, spend ten minutes seeing how five mature products did it. You'll design faster and avoid rookie mistakes the rest of the industry already learned the hard way.",
        },
        {
          id: "handoff-dev-mode",
          title: "Handoff-ready files & Dev Mode",
          idea: [
            "The last mile of production is the moment your design becomes someone else's build. Files that hand off well share traits: components and layers are named the way the code probably will be; spacing comes from tokens a developer can read as values; states and edge cases (Part Two!) are present so engineers aren't guessing; and anything non-obvious — a transition, a piece of conditional logic, an interaction — is annotated. Figma's Dev Mode exists to expose measurements, tokens, and specs to developers, but it only works if you gave it clean, structured work to read.",
            "Great handoff is mostly a by-product of everything in this book: tokens make values legible, components make structure obvious, and tidy naming makes intent clear. That's the deeper point of the Craft track — production-grade work is what makes collaboration painless. And collaboration is exactly where we go next.",
          ],
        },
      ],
      capstone:
        "Take one screen you designed earlier in this book and make it genuinely handoff-ready: every layer named, every value on a token, all relevant states present, interactions annotated, organized on a “Ready for dev” page. When a developer could build it without messaging you a single question, you've hit production grade — and you're ready for Track 2.",
    },
  ],
  barTitle: "You're production-ready when…",
  bar: [
    { text: "You build buttons, inputs, and cards as proper components — with variants, properties, and auto layout — instead of copies.", ref: "component-anatomy" },
    { text: "Your colors, spacing, and type come from named tokens, and you can switch a design to dark mode with one change.", ref: "tokens-variables" },
    { text: "You can assemble a small design system and write one line of usage guidance per component.", ref: "assemble-system" },
    { text: "Before calling a screen done, you design its empty, loading, partial, ideal, error, and success states.", ref: "five-states" },
    { text: "Your forms use top labels, one column, inline validation, and specific, human error messages.", ref: "forms" },
    { text: "You check contrast with a tool, never rely on color alone, and design visible focus states and large-enough touch targets.", ref: "accessibility" },
    { text: "Your work holds up at phone and desktop widths, and with long, messy, realistic content.", ref: "responsive" },
    { text: "You move quickly in Figma — auto layout, variables, properties, shortcuts — without fighting the tool.", ref: "auto-layout-mastery" },
    { text: "Your files are organized into clear pages and sections, with human layer names a stranger could follow.", ref: "file-organization" },
    { text: "A developer could build your screen from the file alone, with no follow-up questions.", ref: "handoff-dev-mode" },
  ],
};

// ── Track 2 · Collaboration ──────────────────────────────────────────────────

const collaboration: Track = {
  id: "collaboration",
  n: 2,
  name: "Collaboration",
  title: "Work Like You're Already on a Team",
  subtitle:
    "Handoff, critique, communication, and an AI-augmented workflow — the human skills that decide whether your work actually ships.",
  accent: "var(--accent-blue)",
  intro:
    "Track 1 made your output production-grade. This track makes you production-grade — because on a real team, the best design in the file is worthless if it never ships, and it won't ship through craft alone. It ships through people.",
  about: [
    "Most design work doesn't die because it was bad. It dies because a developer couldn't build it from the file, because a stakeholder didn't trust the designer enough to say yes, or because the designer couldn't explain why it was right and folded the moment someone with a louder voice disagreed. The designers who get promoted aren't always the most talented at pushing pixels — they're the ones whose work consistently makes it out into the world, and that is a collaboration skill, not a craft one.",
    "A note on practicing collaboration solo: you practice the reps, not the meeting. You can annotate a file as if handing it to a developer, record yourself presenting a project and critique the recording, write the rationale for every decision in a flow, and run your work through an AI as a stand-in reviewer. None of these need a team — and all of them build the exact muscles that make you valuable once you're on one.",
  ],
  parts: [
    {
      id: "handoff",
      number: "01",
      title: "Design–Dev Handoff & Collaboration",
      blurb: "The part of the job that happens after the design is “done.”",
      intro:
        "A junior designer thinks the job ends when the screens look good. A production designer knows that's halftime. The second half — getting the work built accurately, by people who didn't make it — is where most designs quietly fall apart. This part is about being the designer engineers and PMs want on their project, because your work arrives clear, buildable, and free of guesswork.",
      outcomes: [
        "Hand off files that a developer can build from with almost no follow-up questions.",
        "Anticipate what's cheap vs expensive to build, and collaborate with PMs on scope.",
        "Run design QA so what ships actually matches what you designed.",
      ],
      lessons: [
        {
          id: "the-triad",
          title: "The triad: how product teams actually work",
          idea: [
            "Modern products are built by a small cross-functional unit — sometimes called the triad, the trio, or “EPD” (engineering, product, design). Each leg represents a different question the product has to answer at once: the PM owns whether it's worth building (business value and priorities), engineering owns whether it can be built well (feasibility), and you own whether it should exist for the user this way (the experience). Great teams hold these in tension together rather than tossing work over walls.",
            "Understanding this changes how you behave. You're not an artist receiving requests and returning artwork; you're one of three equal voices shaping a decision. That means showing up early (not just at handoff), asking what the PM is actually trying to achieve, and treating engineering constraints as design inputs rather than annoyances. The designers who thrive are the ones who make the other two legs' jobs easier.",
          ],
          steps: {
            caption: "The triad",
            items: [
              { label: "The PM — why & what", text: "Owns the problem, the priorities, the business goal. Wants to know your design moves the metric." },
              { label: "Engineering — how & can-we", text: "Owns feasibility and quality of build. Wants clarity, edge cases, and no surprises." },
              { label: "You (design) — for whom & how it feels", text: "Own the user's experience. Want the right problem solved in a way that actually ships." },
            ],
          },
          inTheWild:
            "“The trifecta” — teams at companies like OneSignal organize into cross-functional pods with a PM, a design lead, and a tech lead each owning their leg, described as a three-legged stool: pull one leg and the product falls over. The takeaway: you're expected to have and voice a point of view, not to wait for instructions.",
          links: [
            {
              kind: "read",
              title: "How Product Design works with PMs and Engineers",
              source: "Lee Munroe",
              url: "https://leemunroe.medium.com/",
            },
          ],
        },
        {
          id: "build-cost",
          title: "What's cheap and what's expensive to build",
          idea: [
            "You don't need to code, but you do need a rough mental model of build cost — because a design that ignores it either gets rejected or gets silently “simplified” by an engineer without you in the room. The pattern is learnable: reusing an existing component is nearly free; a brand-new bespoke component is expensive. Standard platform behaviors are cheap; custom gestures, complex animations, and anything that fights the platform are costly. Showing data you already have is easy; data the backend doesn't track yet can be a multi-week project hiding behind one innocent label.",
            "This is where Track 1 pays off twice: when you design from a component system, you're mostly assembling things engineering can already build. The skill here is to flag the expensive bits yourself — “this part is custom, is that worth it?” — so cost is a shared, deliberate decision rather than a nasty surprise at handoff.",
          ],
          inTheWild:
            "The hidden-cost label — a classic trap: you add a tidy “Last active 3 minutes ago” line to a profile. Trivial in Figma — but if the system never recorded last-active timestamps, you've just specced a database change, new tracking, and a privacy review. Mature designers learn to ask “do we already have this data?” before designing as if the answer is yes.",
          pitfall:
            "They treat “the engineers will figure it out” as collaboration. It's the opposite — it hands your hardest decisions to someone optimizing for a different goal, and you lose control of the experience. Flag the costly parts and bring options.",
        },
        {
          id: "specs-annotations",
          title: "Specs, annotations & the single source of truth",
          idea: [
            "A handoff is a piece of communication, and good communication anticipates the reader's questions. A clean handoff makes the implicit explicit: which screens are final, how spacing and sizing behave, what each state does, what happens on tap, what's required vs optional, and any behavior that isn't visible in a static frame. The goal is a file that answers questions before they're asked, so the developer builds confidently instead of guessing — or worse, interrupting you ten times a day.",
            "The modern way to do this is to keep one shared link as the single source of truth, and to annotate directly on the design: notes pinned to elements, measurements made explicit, interactions described. Mark sections as “Ready for dev” so nobody builds from a half-baked idea sitting two frames over. Tidy files (Track 1, Part 3) make this almost automatic — named layers and token-based values are already half a spec.",
          ],
          table: {
            head: ["A good handoff makes explicit…", "So the developer doesn't…"],
            rows: [
              ["Which frames are final vs WIP", "Build the wrong, abandoned version"],
              ["Every state (empty, loading, error, success)", "Ship only the happy path"],
              ["Interactions & transitions (annotated)", "Invent motion you didn't intend"],
              ["Edge cases: long text, big numbers, no data", "Discover them in production"],
              ["Spacing/sizing from tokens, not eyeballing", "Approximate and drift off-spec"],
            ],
          },
          links: [
            {
              kind: "watch",
              title: "Collaboration and handoff in Dev Mode",
              source: "Figma (official)",
              url: "https://www.youtube.com/watch?v=xCJsRuH7v9w",
            },
            {
              kind: "read",
              title: "The Designer's Handbook for Developer Handoff",
              source: "Figma Blog",
              url: "https://www.figma.com/blog/",
            },
          ],
        },
        {
          id: "dev-mode",
          title: "Dev Mode: speak the developer's language",
          idea: [
            "Figma's Dev Mode is a separate, developer-focused view of your file: it surfaces measurements, spacing, colors and tokens as real values, lets developers inspect and copy code-like snippets, and uses your “Ready for dev” marks to show exactly what to build. It's the bridge that lets designers and developers stay on the same page so details don't get lost. But — and this is the whole point — Dev Mode only outputs something useful if you fed it something clean.",
            "Your job isn't to live in Dev Mode; it's to make your file legible to it. Tokens give developers named values instead of random hex codes. Auto layout exposes real spacing rules. Named components hint at the code components they'll become. Annotations add the context the visuals can't. Learn Dev Mode well enough to preview what a developer sees — then design so that view is unambiguous.",
          ],
          links: [
            {
              kind: "watch",
              title: "Master Figma Dev Mode — the Dev Handoff Process",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=YkOi7bd-2Jo",
            },
            {
              kind: "read",
              title: "Guide to Dev Mode",
              source: "Figma Learn",
              url: "https://help.figma.com/hc/en-us/articles/15023124644247",
            },
          ],
          tryIt:
            "Take the handoff-ready screen from your Track 1 capstone. Open Dev Mode and look at it as a developer would. Add three annotations: one interaction (“tapping this opens the filter sheet”), one edge case (“title truncates after two lines”), and one piece of logic (“button is disabled until all required fields are valid”). Mark the frame Ready for dev.",
        },
        {
          id: "working-with-pms",
          title: "Working with PMs: scope, trade-offs, and shared goals",
          idea: [
            "PMs aren't obstacles between you and shipping — they're your closest partner in deciding what's worth building. The single most useful habit is to align on the goal before you design: what problem are we solving, for whom, and how will we know it worked? When you and the PM share that sentence, every later disagreement has a referee — “does this serve the goal?” — instead of dissolving into taste.",
            "The second habit is negotiating scope honestly and early. Real teams cut and stage work; not everything ships in v1. Techniques like story mapping (laying out the user's journey and slicing a first version across it) let you and the PM agree on a sensible first cut together, so you don't pour days into polishing a screen that gets deferred. Designers who can talk scope and trade-offs fluently are treated as product partners, not pixel vendors.",
          ],
          links: [
            {
              kind: "read",
              title: "How PMs and Designers Can Collaborate Effectively",
              source: "MockFlow",
              url: "https://mockflow.com/blog/",
            },
          ],
          pitfall:
            "They design the perfect, complete vision and present it as all-or-nothing — then feel crushed when it's “cut to pieces.” Pros design the vision and a believable v1, and frame the rest as a roadmap. That's not compromise; it's how products actually get built.",
        },
        {
          id: "design-qa",
          title: "Design QA: make sure what ships is what you designed",
          idea: [
            "Handoff isn't the finish line — the build is. The gap between your file and the live product is where quality silently leaks: spacing that drifted, a wrong shade of grey, a missing empty state, an animation that never made it in. Design QA is the practice of reviewing the built version against your design and flagging the differences before it reaches users. It's unglamorous and it's exactly the kind of ownership that earns trust.",
            "Do it kindly and specifically. Compare screens side by side at the same width. File issues like a teammate, not a critic: precise, prioritized, and with the “why” attached (“this padding is 12px but should be 16 per the token — it's making the cards feel cramped”). Distinguish must-fix bugs from nice-to-haves so engineering can triage. The designer who QAs their own work is the designer whose work looks right in the wild.",
          ],
          inTheWild:
            "The side-by-side window trick — designers place a browser window next to the Figma frame at matching widths to spot spacing and sizing drift fast. Practitioners call the trained result a “third developer's eye.” It's a habit you can build now: pixel-compare any build you're part of against the source.",
        },
      ],
      capstone:
        "Produce a complete handoff package for one feature from Track 1: a “Ready for dev” page, every state present, full annotations (interactions, edge cases, logic), and a short written spec stating the goal and any scope decisions. Then write the design-QA checklist you'd use to review the build. If a developer you've never met could build it and you could verify it — you've nailed Part One.",
    },
    {
      id: "communication",
      number: "02",
      title: "Critique, Communication & Decision-Making",
      blurb: "You're hired for judgment you can explain — not pretty screens.",
      intro:
        "This is the part that separates designers who get listened to from designers who get overruled. Nobody is hired to make pretty screens — software is full of pretty screens that solve nothing. You're hired for judgment, and judgment is invisible until you can explain it. The single biggest signal of seniority is walking into a room and articulating why, not just what.",
      outcomes: [
        "Present work so stakeholders trust it, and defend decisions with reasoning instead of taste.",
        "Give critique that improves work, and receive it without getting defensive or deflated.",
        "Say no constructively, and tell the story behind your choices so people buy in.",
      ],
      lessons: [
        {
          id: "present-work",
          title: "Present work so people trust it",
          idea: [
            "A design presentation is not a reveal; it's an argument. The amateur opens with “so here's what I made” and clicks through screens. The professional opens with the problem: who the user is, what they were trying to do, what the goal was, and how we'll know it worked. Only then do the screens appear — now framed as a solution to a problem everyone has agreed is real. Lead with the “why,” and the “what” lands as inevitable rather than arbitrary.",
            "Structure beats charisma. A reliable arc: context (the problem and goal) → journey (what you explored and what you ruled out) → solution (the work, tied back to the goal) → asks (the specific decisions or feedback you need). Showing the paths you didn't take is quietly powerful — it proves you considered alternatives, which is exactly what makes stakeholders trust your final choice.",
          ],
          steps: {
            caption: "The presentation arc",
            items: [
              { label: "Context", text: "The user, the problem, the goal, the constraints." },
              { label: "Journey", text: "What you explored, what you ruled out, and why." },
              { label: "Solution", text: "The work — every choice tied back to the goal." },
              { label: "The ask", text: "The specific decision or feedback you need now." },
            ],
          },
          links: [
            {
              kind: "watch",
              title: "This one tip will change how you present work to stakeholders",
              source: "Femke",
              url: "https://www.youtube.com/shorts/a11XODaL7Sk",
            },
          ],
          pitfall:
            "They narrate the UI (“this is the header, this is a button…”). Everyone can see the header. Your job is to narrate the thinking behind it. If a sentence would be obvious to someone just looking at the screen, cut it.",
        },
        {
          id: "defend-decisions",
          title: "Defend decisions with reasoning, not ego",
          idea: [
            "“Defending” your work doesn't mean fighting for it — it means articulating it so well that the right decision becomes obvious to everyone. The strongest defenses rest on something firmer than “I think it looks better”: the user need, research or data, an established principle, a business goal, or a known constraint. When a choice is anchored to one of those, you're no longer trading opinions — you're reasoning from shared ground, and that's very hard to argue with.",
            "There's a whole craft here, captured well in Tom Greever's Articulating Design Decisions: understand what the stakeholder actually cares about, restate their concern so they feel heard, then connect your choice to their goal. And know when to hold versus fold — defend the decisions that affect the user's core experience, and cheerfully let go of the ones that are genuinely just preference. Picking the right battles is itself a senior skill.",
          ],
          table: {
            head: ["Weak (taste)", "Strong (reasoning)"],
            rows: [
              ["“I think this looks cleaner.”", "“We removed it because the analytics showed almost no one used it, and it was crowding the primary action.”"],
              ["“Blue feels nicer here.”", "“This needs 4.5:1 contrast for accessibility; the lighter blue fails, this one passes.”"],
              ["“Users will figure it out.”", "“In testing, 3 of 5 users missed this step, so we made it the default.”"],
            ],
          },
          inTheWild:
            "Borrow the principles — reference Jon Yablonski's Laws of UX to give a quick, credible name to instincts you already have (Fitts's Law for touch-target size, Hick's Law for too many choices). “This follows Hick's Law — fewer options means a faster decision” turns a gut feeling into a defensible rationale in one sentence.",
          links: [
            {
              kind: "watch",
              title: "How to Defend Your Design Decisions (And Win Over Clients)",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=KT7cOpxDYtE",
            },
            {
              kind: "read",
              title: "20 Tactics to Defend Your Design Decisions",
              source: "UX Playbook",
              url: "https://uxplaybook.org/",
            },
          ],
        },
        {
          id: "run-critique",
          title: "Run — and survive — a design critique",
          idea: [
            "A critique (“crit”) is a structured session where peers give feedback to help you reach your goal — not a performance review and not a vote. The most common reason crits go badly is that the presenter skips the setup, so reviewers give scattered feedback based on guesses. The fix is a disciplined opening: spend the first few minutes framing who the user is, what the goal is, where you are in the process, and crucially, what kind of feedback you want right now (“I've locked the flow — I want feedback on the visual hierarchy, not the structure”).",
            "Good crits separate clarifying questions from feedback, often have reviewers note thoughts before discussing so the loudest voice doesn't dominate, and end with clear next steps. As the presenter, your job is to listen and capture, not to rebut every point in real time — you can decide later what to act on. Following up afterward (“here's what I changed and what I didn't, and why”) builds trust and makes the next crit better.",
          ],
          links: [
            {
              kind: "watch",
              title: "How to get design feedback",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=AhXCCvddR7s",
            },
            {
              kind: "read",
              title: "A practical guide to running effective critiques",
              source: "Royer & Yu",
              url: "https://suelynyu.medium.com/",
            },
          ],
          sayThis:
            "“Quick context: this is the checkout for first-time buyers; the goal is to reduce drop-off at payment. The flow is locked, so today I'm specifically after feedback on clarity and visual hierarchy — hold structural changes for now. I'll take notes and follow up on what I change.”",
        },
        {
          id: "give-feedback",
          title: "Give feedback that makes work better",
          idea: [
            "One day soon you'll be the one reviewing — a peer's work, a junior's, a contractor's — and bad feedback does real damage. The cardinal rule: critique the work against its goal, never the person, and never your personal taste. Anchor every comment to the user or the objective (“for a first-time user, is this label clear?”) rather than to preference (“I'd have used a different font”). Lead with genuine clarifying questions; you often discover the “mistake” was a deliberate, well-reasoned choice.",
            "Make feedback specific and actionable. “I don't like it” helps no one; “the primary action competes with three other buttons of the same weight, so it's hard to know what to do first” gives the designer something to act on. Balance matters too — note what's working, not just what's broken, so the designer knows what to keep. And calibrate to the stage: blue-sky direction in early concepts, pixel-level polish only near the end.",
          ],
          links: [
            {
              kind: "read",
              title: "The Design Critique: Giving and Receiving Feedback",
              source: "Medium",
              url: "https://medium.com/",
            },
          ],
          pitfall:
            "They give solutions instead of problems (“make this button green”), which quietly hijacks the other designer's work. Name the problem you see (“the main action isn't standing out”) and let them solve it. Prescribing pixels is a reviewer overstepping; surfacing problems is a reviewer helping.",
        },
        {
          id: "say-no",
          title: "Say no — constructively",
          idea: [
            "Designers who say yes to everything end up with incoherent products and zero respect. But a flat “no” gets you labeled difficult and cut out of decisions. The skill is the constructive no: acknowledge the underlying need (there's almost always a real one), explain the trade-off in terms the other person cares about, and offer a path forward. You're not refusing the person — you're protecting the goal you both share.",
            "The reframe that makes this easy: most pushback isn't a fight, it's a surfaced concern. “Can we make the logo bigger?” usually means “I'm worried our brand isn't prominent enough.” Address the worry, not the literal instruction, and you'll often resolve it without the change — or land on a better one together. Said well, no becomes a sign of judgment, not obstruction.",
          ],
          inTheWild:
            "Feedback is usually a symptom — seasoned designers treat literal requests as clues. “Use our brand red everywhere” often means “this doesn't feel like us yet.” Diagnose the real concern before you act, and you'll solve the actual problem instead of the misdiagnosis.",
          sayThis:
            "“I hear you — you want the promo to feel more prominent, and I think that's right. If we make it bigger here it'll compete with the checkout button and could hurt conversions, which is our main goal this quarter. What if we give it a stronger color and move it just above the fold instead? We get the prominence without the trade-off.”",
        },
        {
          id: "storytelling",
          title: "Storytelling: the skill under all the others",
          idea: [
            "Every skill in this part is really one skill wearing different clothes: storytelling. A presentation is a story (problem → struggle → resolution). A defended decision is a mini-story (here's the user, here's the tension, here's why this resolves it). Even a portfolio case study is a story. Humans don't remember lists of features; they remember a character (the user) who wanted something, hit an obstacle, and found a way through. Wrap your work in that shape and it becomes persuasive and memorable instead of merely correct.",
            "You don't need to be a dramatic performer. You need a clear protagonist (the user), a real conflict (their problem), and a satisfying resolution (your design, tied to the goal). This is the through-line into Track 3 — the same narrative muscle that wins a stakeholder meeting is what turns a project into a case study that lands interviews.",
          ],
        },
      ],
      capstone:
        "Record yourself presenting one project in 3–5 minutes using the context → journey → solution → ask arc. Then watch it back ruthlessly: did you lead with the problem or the pixels? Could you state the goal in one sentence? For three key decisions, did you give reasoning or taste? Re-record once. This recording is also raw material for your Track 3 portfolio — two birds.",
    },
    {
      id: "ai-workflow",
      number: "03",
      title: "The AI-Augmented Design Workflow",
      blurb: "AI as a teammate inside the real process — not a gimmick.",
      intro:
        "AI belongs in a collaboration track because, used well, it's a teammate — the tireless one that drafts, summarizes, audits, and explores so you can spend your scarce human hours on judgment, empathy, and taste. This part is deliberately not a tour of trendy tools (those change monthly). It's about where AI helps in a real design process, where it must never lead, and how to direct it like a designer instead of a tourist.",
      outcomes: [
        "Use AI to accelerate research synthesis, ideation, audits, and writing — without outsourcing judgment.",
        "Tell where AI genuinely helps versus where it quietly degrades your work.",
        "Prompt AI like a designer: with context, constraints, and a critical eye on the output.",
      ],
      lessons: [
        {
          id: "ai-rule",
          title: "The one rule: AI assists, judgment leads",
          idea: [
            "Before any tool, internalize the principle that keeps AI an asset instead of a liability: AI is most useful when it removes repetitive work without weakening human judgment. It's brilliant at the tedious middle of the process — clustering a hundred sticky notes, drafting ten microcopy variants, summarizing a long transcript, generating placeholder content. It's dangerous when you let it make the decisions that require taste, empathy, ethics, or knowing your specific user — because it will produce something plausible and generic, and plausible-but-generic is exactly what gets a designer fired slowly.",
            "As Figma's head of AI products put it, AI lets humans explore faster and go further, but the judgment, empathy, craft, and taste are “what it means to be the pilot, not the copilot.” Hold that line and everything in this part is upside. Forget it, and AI becomes a machine for producing confident mediocrity at scale.",
          ],
          links: [
            {
              kind: "read",
              title: "Best AI Tools for Product Designers",
              source: "UX Planet",
              url: "https://uxplanet.org/",
            },
          ],
        },
        {
          id: "ai-synthesis",
          title: "Think better: research synthesis & problem framing",
          idea: [
            "The first place AI earns its keep is the slowest, least creative part of research: synthesis. Pages of interview notes, scattered survey responses, support tickets — turning that raw pile into patterns used to eat days. AI can cluster it into themes, surface recurring complaints, and draft an affinity map in minutes, giving you a first-pass structure to interrogate. Teams report cutting multi-day synthesis to under an hour, with broader coverage than manual tagging.",
            "But this is exactly where the “judgment leads” rule bites. AI will happily invent a tidy theme that the data doesn't support, or flatten an important outlier into noise. So treat its output as a draft to verify against the source, not a finding to trust. Use it to clarify and pressure-test problem statements too — ask it to argue the opposite, to list edge cases you've ignored, to name who this design might exclude. The value isn't the answer; it's the faster, sharper thinking it provokes.",
          ],
          inTheWild:
            "From workshop chaos to themes — after a research session, teams drop dozens of sticky notes into a tool like Miro and have its AI cluster them into themes (“onboarding friction,” “pricing confusion,” “feature discoverability”), moving from messy board to usable next steps fast. You still decide which themes matter and what they mean; the AI just does the sorting.",
          pitfall:
            "They paste AI's synthesis straight into a deck as “the research.” If you didn't verify it against the actual data, you're presenting a confident hallucination. Always trace a key finding back to a real quote before you stake a decision on it.",
        },
        {
          id: "ai-ideation",
          title: "Design faster: ideation, variations & audits",
          idea: [
            "In execution, AI is a fast, judgment-free intern for breadth. Stuck on a layout? Ask for ten structurally different approaches to a screen and use them as provocations, not deliverables. Need to stress-test? Have AI list the edge cases, empty states, and error conditions your flow should handle (a direct callback to Track 1, Part 2) — it's remarkably good at the “what could go wrong here?” checklist that humans skip when tired.",
            "It's also a tireless first-pass critic. Before you take work to a real crit, ask AI to audit it: “Where might the visual hierarchy be unclear? What accessibility issues do you see? Is anything inconsistent?” It won't replace human critique — it can't feel your user's frustration — but it catches the obvious stuff cheaply, so your human reviewers spend their attention on what actually needs a human.",
          ],
          links: [
            {
              kind: "read",
              title: "7 Powerful AI Tools to Speed Up Your UX Workflow",
              source: "ProCreator",
              url: "https://procreator.design/blog/",
            },
          ],
          tryIt:
            "Take any screen you've designed. Paste a screenshot into a capable AI and prompt: “Act as a senior product designer. Critique this against clarity, visual hierarchy, accessibility, and consistency. List concrete issues, most important first.” Then decide — with your judgment — which notes are right, which miss your context, and which you'll act on. The deciding is the skill.",
        },
        {
          id: "ai-microcopy",
          title: "Communicate clearly: microcopy & UX writing",
          idea: [
            "Words are part of the interface, and they're where AI is genuinely, immediately useful — because it can generate and refine variants endlessly. Microcopy is the small, load-bearing text: button labels, error messages, empty-state lines, tooltips, onboarding nudges. Done well it's invisible; done badly it breaks an otherwise elegant design. The principles are tight and learnable: one idea per piece of copy, action-oriented button labels that say what happens next (“Create account,” not “Submit”), and error messages that say what went wrong and how to fix it — never a bare “Invalid input.”",
            "Use AI to draft and vary, then apply human judgment for voice and accuracy. Ask for five button labels and pick the one that fits your product's tone; have it rewrite a cold error message to be specific and kind. But you decide what's on-brand and truthful — AI doesn't know your product's voice or whether “Oops!” fits the seriousness of a failed payment (it usually doesn't).",
          ],
          table: {
            head: ["Instead of…", "Write…"],
            rows: [
              ["“Submit”", "“Create account” — say what happens next"],
              ["“Invalid input”", "“Enter a date in the future” — what went wrong + the fix"],
              ["“Error 404”", "“We can't find that page. Back to home?” — human + a way out"],
              ["Empty: “No items”", "“No saved items yet. Tap ♡ to save one.” — context + next step"],
            ],
          },
          links: [
            {
              kind: "read",
              title: "How to Improve Your Microcopy: UX Writing Tips",
              source: "Smashing Magazine",
              url: "https://www.smashingmagazine.com/",
            },
            {
              kind: "watch",
              title: "UX Writing 101 — How to Write Great Microcopy",
              source: "Udemy (free preview)",
              url: "https://www.udemy.com/",
            },
          ],
        },
        {
          id: "ai-prompting",
          title: "Prompt like a designer",
          idea: [
            "The difference between useless and useful AI output is almost always the prompt, and designers have an unfair advantage here: prompting is just clear briefing, and briefing is communication — the whole subject of this track. A weak prompt is vague (“make this better”). A strong prompt gives role (“act as a senior product designer”), context (who the user is, what the product does, the goal), constraints (tone, length, platform, what to avoid), and a clear output format (“list issues, most critical first”).",
            "Then treat the response the way you'd treat a junior's first draft: useful, never final. Iterate (“good, but our tone is warmer — redo lines 2 and 4”), and always keep your hand on the judgment. The designers who get the most from AI aren't the ones who trust it most — they're the ones who direct it best and edit it hardest.",
          ],
          inTheWild:
            "A reusable prompt skeleton — keep one template handy: “You are a [role]. Context: [product, user, goal]. Task: [what you want]. Constraints: [tone, length, platform, avoid]. Output: [exact format].” Filling those five slots turns a coin-flip response into a consistently useful one — and it's the same structure as a good design brief.",
        },
      ],
      capstone:
        "Take one project end to end with AI as your teammate: have it cluster some (real or sample) research into themes you verify; generate edge cases for one flow; run a first-pass critique you triage with judgment; and draft microcopy you refine to your voice. Then write one paragraph: where AI genuinely helped, and one place you overrode it and why. That paragraph — and the project narrative you can now tell — feeds straight into Track 3.",
    },
  ],
  barTitle: "You collaborate like a pro when…",
  bar: [
    { text: "You understand the triad and show up early with a point of view, not just at handoff with deliverables.", ref: "the-triad" },
    { text: "You can roughly tell what's cheap vs expensive to build, and you flag the costly parts yourself.", ref: "build-cost" },
    { text: "Your handoffs are a single source of truth: final marked, all states present, interactions and edge cases annotated.", ref: "specs-annotations" },
    { text: "You can use Dev Mode well enough to make your file unambiguous to a developer.", ref: "dev-mode" },
    { text: "You align with PMs on the goal first, and can negotiate a believable v1 instead of all-or-nothing.", ref: "working-with-pms" },
    { text: "You QA the build against your design and file issues like a teammate, not a critic.", ref: "design-qa" },
    { text: "You present problem-first, and defend decisions with user, data, principle, or constraint — not taste.", ref: "defend-decisions" },
    { text: "You can frame a crit, separate questions from feedback, and take notes without getting defensive.", ref: "run-critique" },
    { text: "You give specific, actionable feedback on the work and its goal, never the person.", ref: "give-feedback" },
    { text: "You can say no constructively by addressing the real concern behind the request.", ref: "say-no" },
    { text: "You use AI to go faster on synthesis, ideation, audits, and writing — while keeping every real decision yours.", ref: "ai-ideation" },
  ],
};

// ── Track 3 · Career ─────────────────────────────────────────────────────────

const career: Track = {
  id: "career",
  n: 3,
  name: "Career",
  title: "Get the Job and the Headstart",
  subtitle:
    "Turn your work into case studies that get interviews, and your skills into interview answers that get offers.",
  accent: "var(--accent-sage)",
  intro:
    "The most talented designer and the one who actually gets hired are frequently not the same person. The job doesn't go to the best work — it goes to the best-presented work, backed by someone who can prove their thinking in an interview. This track makes sure that person is you.",
  about: [
    "A hiring manager can't see your ability directly — they see a portfolio link and an hour of conversation. If those two artifacts don't communicate your ability, the ability might as well not exist. Plenty of genuinely skilled designers send out a hundred applications and hear nothing, not because they can't design, but because their case studies read like screenshot galleries and their interview answers wander. That is a fixable problem, and fixing it is the entire job of this track.",
    "Bring your capstones: your Track 1 design-system and full-flow capstones are portfolio projects. Your Track 2 presentation recording is interview practice you've already done once. The reasoning you learned to articulate in Track 2 is the substance of a great case study. You're not starting from a blank page — you're packaging work you already have.",
  ],
  parts: [
    {
      id: "portfolio",
      number: "01",
      title: "Portfolio & Case Study Studio",
      blurb: "Turn your projects into case studies that actually get interviews.",
      intro:
        "Your portfolio is the single highest-leverage artifact in your career. It's the thing that gets skimmed before anyone meets you, and a weak one doesn't just fail to help — it actively hurts you, signaling “junior” before you've said a word. The good news: a strong case study is a craft with known rules, and once you learn them, you can turn even modest projects into pieces that earn interviews.",
      outcomes: [
        "Write case studies that show your thinking and impact, not just final screens.",
        "Structure a portfolio site that passes the recruiter's 60-second skim.",
        "Build compelling projects even if you don't have “real” client work yet.",
      ],
      lessons: [
        {
          id: "sixty-second-test",
          title: "The 60-second test",
          idea: [
            "Start with a brutal fact: hiring managers spend roughly sixty seconds on a case study before deciding whether to keep reading. They're skimming dozens, sometimes hundreds, of portfolios for one role. This single reality should reshape everything about how you build yours. If your most important information — what the project was, what you did, what changed because of it — isn't graspable in the first ten seconds of a page, most readers will never reach the careful work below the fold.",
            "So design your portfolio for a skimmer first and a reader second. Strong titles and thumbnails that say what each project is. A one-line summary up top: the problem, your role, and the outcome. Clear headings someone can scan. Treat the hiring team as your users — you're a designer, this should feel natural — and give them a great experience: fast to understand, easy to navigate, no hunting for the point.",
          ],
          inTheWild:
            "The 10-second test — portfolio reviewers talk about a “10-second test”: land on a project page, and within ten seconds you should know what it is, who it was for, and why it mattered. Open three portfolios you admire and time yourself. The ones that pass lead with a crisp summary and a clear hero image; the ones that fail open with a wall of process or a vague mood shot.",
          links: [
            {
              kind: "read",
              title: "How to Write UX Case Studies That Land You a Job",
              source: "Chris Nguyen / UX Playbook",
              url: "https://medium.com/",
            },
          ],
          pitfall:
            "They bury the lede under a long “my process” preamble — persona templates, a Double Diamond diagram, weeks of throat-clearing — before ever saying what they built or why. The reader is gone by then. Lead with the outcome; explain the process to those who choose to keep reading.",
        },
        {
          id: "case-study-anatomy",
          title: "The anatomy of a case study that works",
          idea: [
            "A case study is not a gallery of screens — it's a linear story that documents how you took a problem to a solution and what resulted. The reliable structure mirrors a narrative arc: set the scene (the problem, the users, your role, the constraints), show the struggle (what you explored, what you learned, the decisions and trade-offs), reveal the resolution (the solution, tied back to the problem), and land the impact (what changed). Every section answers a question a hiring manager is silently asking: Can this person handle the whole process? Do they make reasoned decisions? Did their work matter?",
            "The word “case study” sounds dry — so think of it as a design story instead. Stories give messy real projects form, and they're what make a portfolio memorable rather than merely complete. You don't need drama; you need a clear protagonist (the user), a real conflict (their problem), and a satisfying resolution (your design). This is the exact narrative muscle you built in Track 2 — a defended decision and a case study are the same skill in different clothes.",
          ],
          steps: {
            caption: "The four-beat case-study arc",
            items: [
              { label: "Set up", text: "Problem, users, your role, constraints, the goal." },
              { label: "Struggle", text: "What you explored, learned, and ruled out — and why." },
              { label: "Solution", text: "The design, every key choice tied to the problem." },
              { label: "Impact", text: "What changed — numbers if you have them, outcomes if not." },
            ],
          },
          links: [
            {
              kind: "read",
              title: "The Ultimate UX Case Study Template & Structure",
              source: "UXfolio",
              url: "https://blog.uxfol.io/",
            },
            {
              kind: "read",
              title: "How to Write Case Studies That Get You Hired",
              source: "Interaction Design Foundation",
              url: "https://www.interaction-design.org/literature",
            },
          ],
          tryIt:
            "Take your Track 1 full-flow capstone (the “search → results” experience with all its states). Write it up using the four-beat arc above. Force yourself to write the one-line summary first — problem, your role, outcome — before anything else. If you can't state the outcome in a sentence, that's the work to do before you write the rest.",
        },
        {
          id: "show-thinking",
          title: "Show the thinking, not just the screens",
          idea: [
            "Pretty final screens are the least valuable thing in a portfolio, because everyone has them and they prove nothing about how you got there. What hiring managers are actually buying is your judgment — the reasoning that connects a problem to a solution. So the most important content in a case study isn't the polished UI; it's the “why”: why you chose this structure over the two you rejected, what a piece of research changed about your direction, where you hit a constraint and how you designed around it.",
            "Concretely, that means showing your messy middle on purpose. Include the alternative you didn't ship and say why. Show a before/after where feedback changed the design. Narrate one real trade-off. This is counterintuitive to beginners, who hide the mess to look polished — but the mess is the evidence of thinking, and thinking is the thing being evaluated. A case study with three reasoned decisions beats one with thirty beautiful screens.",
          ],
          inTheWild:
            "The “rejected option” move — strong case studies almost always include a moment like: “My first direction put everything on one screen. Testing showed users missed the key step, so I split it into two — here's the before and after.” That single beat does more to prove seniority than a whole page of final UI, because it shows research changing a decision. Steal the move.",
          links: [
            {
              kind: "watch",
              title: "UX Portfolio Review — What You Need to Show",
              source: "AJ&Smart",
              url: "https://www.youtube.com/watch?v=km_CoJ5a2GA",
            },
          ],
          pitfall:
            "They present design as if it arrived fully formed and perfect — no dead ends, no revisions, no trade-offs. It reads as either dishonest or thoughtless. Real work is iterative; showing the iteration is what makes you look like someone who's actually done it.",
        },
        {
          id: "prove-impact",
          title: "Prove impact — even without big numbers",
          idea: [
            "The strongest case studies end on impact: what changed because the work existed. When you have metrics, use them — “reduced checkout drop-off by 18%,” “cut support tickets about this flow by a third,” “saved engineering rebuild time by shipping a consistent component set.” Numbers turn a nice story into a believable result, and hiring managers in a tight market are specifically scanning for evidence that your design moved something real.",
            "But most early-career designers don't have clean metrics, and that's fine — impact can be qualitative when it has to be. Usability-test results (“4 of 5 users completed the task on the first try, up from 1 of 5”), stakeholder or user quotes, a problem clearly solved, a measurable reduction in steps or clicks. The key is to close the loop you opened: you stated a problem at the top, so end by showing it's actually addressed. A case study that just stops at “and here are the final screens” leaves the most persuasive part unsaid.",
          ],
          table: {
            head: ["If you have…", "Show impact like…"],
            rows: [
              ["Real product metrics", "“Drop-off at payment fell 18% after launch.”"],
              ["Usability test results", "“Task success went from 1/5 to 4/5 users.”"],
              ["A redesign / concept project", "“Reduced the signup flow from 6 steps to 3.”"],
              ["Only qualitative signal", "“Testers described the new flow as obvious — the old one confused everyone.”"],
            ],
          },
          links: [
            {
              kind: "read",
              title: "Tips for Creating a Top-Tier UX Portfolio",
              source: "LogRocket",
              url: "https://blog.logrocket.com/ux-design/",
            },
          ],
          tryIt:
            "Go back to the case study you started. Write its closing impact section. If you have no numbers, run a tiny usability test — five people, the prototype, one task — and report what happened. Even “3 of 5 finished without help” is real, honest evidence, and it instantly outclasses a case study that ends with no result at all.",
        },
        {
          id: "no-real-projects",
          title: "No “real” projects? Build them anyway",
          idea: [
            "The most common blocker for career-switchers and new grads is “I don't have real work to show.” It's not the obstacle it feels like. Hiring managers care about demonstrated thinking and skill, not whether a company paid for it. Self-initiated projects — a thoughtful redesign of an existing product, a concept solving a real problem you've noticed, a charity or local-business project, a design-challenge prompt taken seriously — can be every bit as compelling, sometimes more, because you controlled the whole process.",
            "Two rules make these land. First, treat them with full rigor: do real (even if small) research, test with real people, show iteration — fake projects fail only when they're done lazily. Second, lean into your background instead of hiding it: a former teacher, nurse, or developer brings domain insight a generic junior can't, and a case study rooted in a world you know is instantly more credible. Your “non-design” past is portfolio gold, not a liability.",
          ],
          inTheWild:
            "The rigorous redesign — a classic standout project: pick an app with a genuinely frustrating flow, document why it's frustrating (with a few real users, not just your opinion), redesign it, and test the redesign. It shows analytical thinking, process, and craft in one piece — and because you framed the problem yourself, you can tell the story exactly the way a case study wants to be told.",
          links: [
            {
              kind: "read",
              title: "Tips for Creating a Top-Tier UX Portfolio",
              source: "LogRocket",
              url: "https://blog.logrocket.com/ux-design/",
            },
          ],
        },
        {
          id: "portfolio-site",
          title: "Portfolio site structure & writing for recruiters",
          idea: [
            "Zoom out from individual case studies to the site itself. A working portfolio has a clear home page (who you are, what you do, project thumbnails that pass the skim), 2–3 strong case studies if you're junior (4–5 if senior — and always quality over quantity), an about page with a real human behind it, and obvious contact info. Treat the whole site as a UX project: it's the most on-the-nose demonstration of your skills a recruiter will ever see, so a confusing or sloppy portfolio is a contradiction in terms.",
            "Then sweat the writing, because it's read by busy non-designers as much as designers. Be concise, scannable, and typo-free — and yes, typos and low-quality images read as “doesn't sweat the details,” which is fatal for a design hire. Tailor when it counts: if you're going for a research-heavy role, lead with a research-heavy project; matching your featured work to the job is one of the highest-return things you can do.",
          ],
          steps: {
            caption: "Portfolio site structure",
            items: [
              { label: "Home — pass the skim", text: "Who you are, what you do, thumbnails that say what each project is. The 10-second test lives here." },
              { label: "Case studies — prove the thinking", text: "2–3 (junior) of your best, each a story with a problem, decisions, and an outcome." },
              { label: "About — be a person", text: "A real human with a background — especially your non-design strengths." },
              { label: "Contact — make it easy", text: "Obvious, working ways to reach you. Don't make a keen recruiter hunt." },
            ],
          },
          links: [
            {
              kind: "read",
              title: "Insider UX Portfolio Reviews & Actionable Tips",
              source: "UXfolio",
              url: "https://blog.uxfol.io/",
            },
          ],
        },
      ],
      capstone:
        "Publish a real portfolio with two complete case studies built from your Track 1 capstones, each following the four-beat arc, each showing at least one rejected option and one honest impact result. Run the 10-second test on a friend who isn't a designer: can they tell you what each project was and why it mattered? Fix until they can. This portfolio is what Part Two interviews are built on.",
    },
    {
      id: "interview",
      number: "02",
      title: "Interview & Job-Readiness Lab",
      blurb: "The interview is its own skill — most strong designers fail it for lack of practice.",
      intro:
        "The interview is its own discipline, separate from design itself — and it's where most genuinely good designers lose offers, not because they can't do the work, but because they walked in unprepared for the format. A portfolio walkthrough, a whiteboard challenge, a take-home, an app critique, a behavioral round: each has rules and each rewards practice. The candidate who rehearsed beats the more talented one who improvised, almost every time.",
      outcomes: [
        "Handle every common interview format — walkthrough, whiteboard, take-home, critique, behavioral.",
        "Structure clear answers under pressure using a repeatable framework.",
        "Read a job description, ask sharp questions, and navigate a basic offer conversation.",
      ],
      lessons: [
        {
          id: "interview-landscape",
          title: "The interview landscape",
          idea: [
            "Design interviews are unusually varied, and surprise is the enemy. Knowing the formats in advance turns dread into preparation. The common ones: a recruiter screen (logistics and fit), a portfolio presentation (you walk through your work live), a design challenge (whiteboard or take-home — solve a problem), sometimes an app critique (analyze an existing product), and a behavioral round (“tell me about a time…”). A given process usually strings several of these together over a few rounds.",
            "The unifying insight: across almost every format, they are evaluating how you think and communicate, far more than whether your final artifact is beautiful. A whiteboard interviewer doesn't care about your handwriting; they care whether you ask about the user, structure a problem, and talk through trade-offs. Internalize that and every format becomes a variation on one skill you already built in Track 2 — reasoning out loud.",
          ],
          steps: {
            caption: "A typical interview process",
            items: [
              { label: "Screen", text: "Recruiter call — fit & logistics." },
              { label: "Portfolio", text: "Live walkthrough of your work." },
              { label: "Challenge", text: "Whiteboard or take-home problem." },
              { label: "Behavioral", text: "“Tell me about a time…” + team fit." },
            ],
          },
          inTheWild:
            "Ask the recruiter — you're allowed to ask what the process looks like. A simple “Could you tell me the interview stages and formats so I can prepare?” is normal, professional, and gives you a huge edge — you'll know whether to rehearse a whiteboard or polish a take-home.",
        },
        {
          id: "portfolio-walkthrough",
          title: "The portfolio walkthrough",
          idea: [
            "This is the most common deep round, and it's where Part One pays off live. You'll typically get 30–60 minutes to present 1–3 projects. Don't just read your case study aloud — perform the story. Open by introducing yourself and framing what you'll cover, then walk one strong project end to end using the same arc as your case study: problem and goal, your role, what you explored, the decisions and why, and the impact. Pick the project that best matches this job, not just your favorite.",
            "The room is reading two things at once: your work, and how you talk about it. So narrate the thinking (Track 2, again), invite questions, and don't pretend everything was perfect — mentioning a misstep and what you learned reads as confidence, not weakness. Practice out loud and time yourself; the difference between a rambling walkthrough and a crisp one is almost entirely reps. Your Track 2 capstone recording was your first rep — this is where it cashes in.",
          ],
          links: [
            {
              kind: "watch",
              title: "My REAL Portfolio Walkthrough in a UX Interview",
              source: "YouTube",
              url: "https://www.youtube.com/watch?v=S4-dBMC2t-0",
            },
            {
              kind: "read",
              title: "UX Portfolio Presentation: How to Structure It",
              source: "UXfolio",
              url: "https://blog.uxfol.io/",
            },
          ],
          sayThis:
            "“I'll start with a bit about me, then walk through one project in depth and a second more briefly — please jump in with questions any time. The first is a checkout redesign for first-time buyers; the goal was reducing drop-off at payment. Let me set up the problem before I show the screens…”",
        },
        {
          id: "whiteboard",
          title: "Whiteboard & live design challenges",
          idea: [
            "The phrase “let's do a whiteboard challenge” strikes fear into designers, and it shouldn't. You'll get a prompt (“design an app to help people water their plants”) and ~30–60 minutes to think out loud through it. The crucial reframe: it is not about the final drawing. It's about whether you can take an ambiguous problem and approach it like a designer — in real time, with someone watching. Sketchy boxes are completely fine.",
            "Use a visible structure so you never freeze: understand (ask clarifying questions — who's the user? what's the goal? what are the constraints?), scope (state what you'll focus on and what you're setting aside), ideate (talk through a couple of approaches, pick one and say why), sketch (rough the key screens/flow), and check (walk the user through it, name edge cases, invite feedback). Narrate the entire time — silence is the only real failure. The interviewer wants a thinking partner, not a magician.",
          ],
          steps: {
            caption: "The five-step whiteboard structure",
            items: [
              { label: "1 · Understand", text: "Clarify the user, goal, constraints. Don't solve yet." },
              { label: "2 · Scope", text: "Pick what to focus on; set the rest aside aloud." },
              { label: "3 · Ideate", text: "A couple of directions; choose one, say why." },
              { label: "4 · Sketch & check", text: "Rough the flow; walk it; name edge cases." },
            ],
          },
          inTheWild:
            "Practice with a partner — designers who pass these rehearsed them. Grab prompts from Artiom Dashinsky's Solving Product Design Exercises, have a friend play interviewer, and run the five steps out loud on a real or virtual whiteboard. Three practice runs and the format stops being scary.",
          links: [
            {
              kind: "watch",
              title: "My Uber Whiteboarding UX Challenge",
              source: "Femke",
              url: "https://www.youtube.com/watch?v=8MQmYa_zq0g",
            },
            {
              kind: "read",
              title: "How to Prepare for the Whiteboard Challenge",
              source: "Coursera",
              url: "https://www.coursera.org/articles",
            },
          ],
        },
        {
          id: "take-home-critique",
          title: "Take-home tests & app critiques",
          idea: [
            "Two more formats worth rehearsing. A take-home gives you a prompt and a few days to produce a small solution. The traps are over-scoping (don't build a whole product — solve the asked problem well) and showing only the final result. Treat it like a mini case study: briefly document your thinking, your decisions, and one or two trade-offs, because they're evaluating process as much as pixels. Respect the time box — a tidy, well-reasoned, on-scope submission beats a sprawling one that clearly ate your whole week.",
            "An app critique asks you to analyze an existing product (sometimes theirs). This is a gift if you've done Tracks 1–2: walk it through the same lenses you already know — clarity and hierarchy, the state coverage (empty, loading, error), accessibility, the patterns and flows, what works and what you'd change and why. The goal is to show you have a structured, principled eye — not to dunk on the product. Be specific, be constructive, and tie every critique to a user or principle, exactly as you learned to give feedback in Track 2.",
          ],
          table: {
            head: ["Format · win by…", "…lose by"],
            rows: [
              ["Take-home: staying on scope; documenting your reasoning", "Over-building; submitting screens with no “why”"],
              ["App critique: a structured, principled, constructive read", "Vague opinions; trashing without reasoning"],
            ],
          },
          pitfall:
            "On take-homes, they treat scope as a test of stamina and pour 30 hours into a 5-hour brief — which signals poor judgment about time and priorities, not dedication. On critiques, they list complaints without anchoring to a user need. Both are fixed by the same habit: tie everything to the goal and the user.",
        },
        {
          id: "behavioral-star",
          title: "Behavioral questions & the STAR method",
          idea: [
            "Every process includes some version of “tell me about a time…”: a conflict with a developer, a project that failed, feedback you disagreed with, a deadline you missed. These feel softer than design challenges but sink just as many candidates, because rambling, vague answers read as a lack of real experience. The fix is a simple, proven structure: STAR — Situation, Task, Action, Result. Set the scene briefly, say what your job was, describe what you specifically did, and end with the outcome (quantified if possible).",
            "The goal isn't to memorize scripts — it's to have a handful of adaptable stories ready that you can map onto whatever they ask. This is where Track 2 quietly pays off again: your handoff wins, a critique you navigated, a decision you defended, a scope you renegotiated with a PM — those are your STAR stories. Prepare five or six, keep each answer to a tight 1–2 minutes, and rehearse them aloud until they feel natural rather than recited.",
          ],
          steps: {
            caption: "The STAR structure",
            items: [
              { label: "S — Situation", text: "Briefly set the scene." },
              { label: "T — Task", text: "What was your responsibility?" },
              { label: "A — Action", text: "What did you specifically do?" },
              { label: "R — Result", text: "What happened? Quantify if you can." },
            ],
          },
          links: [
            {
              kind: "read",
              title: "The STAR Method for Designers",
              source: "Mockin",
              url: "https://mockin.work/",
            },
          ],
          sayThis:
            "“Situation: an engineer pushed back that my design was too costly to build. Task: I needed the experience to work without blowing the sprint. Action: I sat with him, learned which part was expensive, and reworked it to reuse an existing component while keeping the core flow. Result: we shipped on time, and it became a pattern we reused on two later features.”",
        },
        {
          id: "jd-questions-offers",
          title: "Read the JD, ask sharp questions, talk offers",
          idea: [
            "Three smaller skills that round out job-readiness. First, read the job description like a brief: it tells you which of your projects to feature, which skills to emphasize, and what language to mirror. A role heavy on “design systems” should meet your Track 1 system project front and center; a research-heavy role wants your most research-driven case study. Tailoring isn't dishonest — it's relevance.",
            "Second, have great questions ready — an interview is mutual, and thoughtful questions signal seniority while protecting you from a bad fit. Ask how design decisions get made, what the design-to-dev process looks like, what success looks like in the role, how the team handles critique. Third, don't fear the offer conversation. It's normal to ask for time to consider, to clarify scope and growth, and (politely, once you have an offer) to discuss compensation. None of this is rude; it's how professionals operate, and handling it calmly is the final signal that you belong on the team.",
          ],
          sayThis:
            "“How are design decisions made here when there's disagreement?” · “What does the handoff to engineering actually look like day to day?” · “What would success in this role look like in the first six months?” · “How does the team give and receive design critique?”",
        },
      ],
      capstone:
        "Run a full mock interview loop with a friend or peer: a 20-minute portfolio walkthrough of your Part One portfolio, one whiteboard prompt (five-step structure, out loud), and three behavioral questions answered in STAR. Record it. Watch it back and grade yourself on one thing only: did you clearly explain your thinking in every format? Re-run the weakest segment once. That recording is proof you're interview-ready — not hoping to be.",
    },
  ],
  barTitle: "You're ready to apply when…",
  bar: [
    { text: "Your portfolio passes the 10-second test — a non-designer can tell what each project is and why it mattered.", ref: "sixty-second-test" },
    { text: "You have 2–3 case studies, each told as a story: problem, decisions, and a real (even qualitative) outcome.", ref: "case-study-anatomy" },
    { text: "At least one case study shows a rejected option and a decision that changed based on research or testing.", ref: "show-thinking" },
    { text: "Your site is clean, scannable, typo-free, with obvious contact info — it's itself a good UX.", ref: "portfolio-site" },
    { text: "You can walk through a project out loud in under 10 minutes, narrating thinking, not just screens.", ref: "portfolio-walkthrough" },
    { text: "You can run a whiteboard prompt through a clear five-step structure without freezing.", ref: "whiteboard" },
    { text: "You can handle a take-home on-scope and an app critique with a structured, principled eye.", ref: "take-home-critique" },
    { text: "You have 5–6 STAR stories ready, drawn from real collaboration moments, each tight to 1–2 minutes.", ref: "behavioral-star" },
    { text: "You tailor your featured work to each job description and arrive with sharp questions to ask.", ref: "jd-questions-offers" },
    { text: "You can calmly ask for time, clarify scope, and discuss an offer like a professional.", ref: "jd-questions-offers" },
  ],
  outro: {
    title: "Run the job search like a system",
    body: "Skills get you ready; a system gets you hired. The market is competitive and rejection is part of the process for everyone — so treat the search like a design project: a clear loop, tracked, iterated, and not taken personally. Each week: send a focused batch of tailored applications (five thoughtful applications beat fifty generic ones), do one piece of practice (a mock interview, a whiteboard rep, a case-study polish), and reach out to one or two humans. Track every application and what stage it reached — a rejection at the portfolio stage is a portfolio problem; one at the final round is an interview problem. Most importantly: a “no” is data, not a verdict. Keep your loop running, keep refining the artifact that's underperforming, and keep going.",
  },
};

export const TRACKS: Track[] = [craft, collaboration, career];

/** Flattened, de-duplicated resource library for the dashboard's one-place view. */
export function getResourceLibrary(): ResourceLink[] {
  const seen = new Set<string>();
  const out: ResourceLink[] = [];
  for (const track of TRACKS) {
    for (const part of track.parts) {
      for (const lesson of part.lessons) {
        for (const link of lesson.links ?? []) {
          if (seen.has(link.url)) continue;
          seen.add(link.url);
          out.push(link);
        }
      }
    }
  }
  return out;
}

export function totalLessons(track: Track): number {
  return track.parts.reduce((n, p) => n + p.lessons.length, 0);
}

export function courseTotalLessons(): number {
  return TRACKS.reduce((n, t) => n + totalLessons(t), 0);
}
