/**
 * Level Up — the members-only mini-course.
 *
 * A curated playlist of YouTube videos that help juniors learn what design
 * school skips: file hygiene, discovery, working with PMs/engineers, critique,
 * shipping at pace. Completing the course unlocks a signed certificate and
 * priority access to design openings at Rock Paper Scissors Studio.
 */
export type LevelUpLesson = {
  id: string;
  number: string;
  title: string;
  brief: string;
  takeaway: string;
  durationMin: number;
  youtubeId: string; // Public YouTube video for the lesson.
  channel: string;
};

export const LEVEL_UP_LESSONS: LevelUpLesson[] = [
  {
    id: "figma-file-hygiene",
    number: "01",
    title: "Figma file hygiene",
    brief:
      "Folders, components, naming, branches — the conventions every shipping team uses to keep files sane as the work grows.",
    takeaway:
      "Set up a starter file structure your future self (and teammates) will thank you for.",
    durationMin: 22,
    youtubeId: "ihM21V4OYO0",
    channel: "Figma",
  },
  {
    id: "discovery-questions",
    number: "02",
    title: "Discovery questions to ask in kickoff",
    brief:
      "What to ask in the first meeting so you don't spend three sprints designing the wrong thing.",
    takeaway:
      "Walk away with a kickoff question template you can paste into any project.",
    durationMin: 18,
    youtubeId: "JLLqQTrqzAU",
    channel: "Femke van Schoonhoven",
  },
  {
    id: "reading-a-brief",
    number: "03",
    title: "Reading a brief — what's missing",
    brief:
      "How senior designers read between the lines of a brief, spot the gaps, and push back without sounding difficult.",
    takeaway:
      "Learn the three questions to ask before opening Figma on any new project.",
    durationMin: 14,
    youtubeId: "i70xMng3rew",
    channel: "Jesse Showalter",
  },
  {
    id: "working-with-pms-engineers",
    number: "04",
    title: "Working with PMs and engineers",
    brief:
      "How to collaborate with product managers and engineers so design decisions actually ship — not just get admired in Figma.",
    takeaway:
      "Take away a weekly ritual that keeps design, product, and eng in sync.",
    durationMin: 26,
    youtubeId: "TPXc0LM0K9k",
    channel: "DesignCourse",
  },
  {
    id: "design-critique",
    number: "05",
    title: "Design critique — giving and receiving",
    brief:
      "What good critique sounds like, how to ask for it, and how to receive feedback without taking it personally.",
    takeaway:
      "Use the SCQA framework to give critique that strengthens the work without bruising the maker.",
    durationMin: 31,
    youtubeId: "y_OqE60Y6JI",
    channel: "Jared Spool",
  },
  {
    id: "shipping-at-pace",
    number: "06",
    title: "Shipping at pace — scope & tradeoffs",
    brief:
      "How to scope a feature down to its smallest valuable version, negotiate tradeoffs, and ship without breaking the brand.",
    takeaway:
      "Walk away with a tradeoff matrix and a 'good-better-best' template you can use in any planning meeting.",
    durationMin: 29,
    youtubeId: "NwhT-D2-1Ig",
    channel: "Femke van Schoonhoven",
  },
];

export const LEVEL_UP_TOTAL_MINUTES = LEVEL_UP_LESSONS.reduce(
  (sum, l) => sum + l.durationMin,
  0,
);
