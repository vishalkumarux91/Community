export type Mentor = {
  id: string;
  name: string;
  title: string;
  company: string;
  city: string;
  bio: string;
  expertise: string[];
  rating: number;
  reviewCount: number;
  sessionsCompleted: number;
  hourlyRate: number;
  badges: ("Top Rated" | "Mentor" | "First-Job Coach" | "Career Switch")[];
};

export const MENTORS: Mentor[] = [
  {
    id: "maya-rao",
    name: "Maya Rao",
    title: "Senior Product Designer",
    company: "Atlassian",
    city: "Bengaluru, IN",
    bio: "10 years building design systems for B2B SaaS. I'll tear apart your case studies and make them honest.",
    expertise: ["Design Systems", "Portfolio Review", "B2B SaaS"],
    rating: 4.9,
    reviewCount: 218,
    sessionsCompleted: 540,
    hourlyRate: 1500,
    badges: ["Top Rated", "Mentor"],
  },
  {
    id: "aria-park",
    name: "Aria Park",
    title: "Design Manager",
    company: "Razorpay",
    city: "Mumbai, IN",
    bio: "Hires juniors every quarter. I'll prep you for the interview that actually happens, not the one in the YouTube video.",
    expertise: ["Interview Prep", "Career Switch", "FinTech"],
    rating: 4.8,
    reviewCount: 154,
    sessionsCompleted: 312,
    hourlyRate: 1800,
    badges: ["First-Job Coach", "Mentor"],
  },
  {
    id: "liam-patel",
    name: "Liam Patel",
    title: "Founding Designer",
    company: "stealth",
    city: "Goa, IN",
    bio: "Solo-founder energy. Best for brand-heavy product work and 0→1 product shape.",
    expertise: ["0→1", "Brand", "Visual Design"],
    rating: 4.7,
    reviewCount: 86,
    sessionsCompleted: 140,
    hourlyRate: 2200,
    badges: ["Mentor"],
  },
  {
    id: "reena-iyer",
    name: "Reena Iyer",
    title: "Staff UX Researcher",
    company: "Google",
    city: "London, UK",
    bio: "Mixed-methods researcher. If you want your portfolio to show real research, not Lorem Ipsum personas, talk to me.",
    expertise: ["UX Research", "Portfolio Review", "Synthesis"],
    rating: 4.9,
    reviewCount: 142,
    sessionsCompleted: 280,
    hourlyRate: 2500,
    badges: ["Top Rated", "Mentor"],
  },
  {
    id: "yuki-tanaka",
    name: "Yuki Tanaka",
    title: "Principal Designer",
    company: "Shopify",
    city: "Toronto, CA",
    bio: "Made the jump from graphic design to product 12 years ago. I'll help you do it in months, not years.",
    expertise: ["Career Switch", "Visual to Product", "Mentorship"],
    rating: 4.8,
    reviewCount: 98,
    sessionsCompleted: 175,
    hourlyRate: 2800,
    badges: ["Career Switch", "Mentor"],
  },
];

export type LiveClass = {
  id: string;
  title: string;
  mentorId: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  date: string;
  durationMinutes: number;
  format: "Online" | "Offline";
  city?: string;
  capacity: number;
  enrolled: number;
  price: number;
};

export const CLASSES: LiveClass[] = [
  {
    id: "c-1",
    title: "Live Portfolio Critique — Cohort 14",
    mentorId: "maya-rao",
    description: "Bring your portfolio. We'll go through 6 portfolios in 90 minutes. No softballs.",
    level: "Intermediate",
    date: "Sat, May 17 · 7:00 PM IST",
    durationMinutes: 90,
    format: "Online",
    capacity: 6,
    enrolled: 4,
    price: 999,
  },
  {
    id: "c-2",
    title: "Cracking the FinTech Design Interview",
    mentorId: "aria-park",
    description: "What hiring managers actually ask, with two live mock rounds.",
    level: "Intermediate",
    date: "Sun, May 18 · 11:00 AM IST",
    durationMinutes: 120,
    format: "Online",
    capacity: 12,
    enrolled: 9,
    price: 1499,
  },
  {
    id: "c-3",
    title: "Bengaluru Design Walk + Crit",
    mentorId: "liam-patel",
    description: "Coffee, a 90-minute design walk through Indiranagar, then live crit at our space.",
    level: "Beginner",
    date: "Sat, May 24 · 10:00 AM IST",
    durationMinutes: 240,
    format: "Offline",
    city: "Bengaluru",
    capacity: 12,
    enrolled: 7,
    price: 0,
  },
  {
    id: "c-4",
    title: "Research without a research team",
    mentorId: "reena-iyer",
    description: "Practical, lightweight research workflows you can run as a solo product designer.",
    level: "Intermediate",
    date: "Wed, May 21 · 8:30 PM IST",
    durationMinutes: 90,
    format: "Online",
    capacity: 30,
    enrolled: 22,
    price: 1199,
  },
];

export function getMentorById(id: string): Mentor | undefined {
  return MENTORS.find((m) => m.id === id);
}
