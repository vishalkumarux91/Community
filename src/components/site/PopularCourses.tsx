import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Star, Clock } from "@/components/ui/Icons";

type Course = {
  title: string;
  instructor: string;
  format: string;
  duration: string;
  students: number;
  rating: number;
};

const COURSES: Course[] = [
  { title: "AI-Powered Design Workflows", instructor: "Aanya Sharma", format: "Course", duration: "4h", students: 1234, rating: 4.8 },
  { title: "Spline 3D to Webflow Tutorial", instructor: "Aria Park", format: "Tutorial", duration: "1h 20m", students: 982, rating: 4.7 },
  { title: "Master Midjourney for Concept Art", instructor: "Reena Iyer", format: "Podcast", duration: "55m", students: 2104, rating: 4.9 },
  { title: "Build a Design System in Figma", instructor: "Rohan Iyer", format: "Workshop", duration: "2h", students: 1845, rating: 4.6 },
  { title: "ChatGPT for Creative Professionals", instructor: "Yuki Tanaka", format: "Course", duration: "3h", students: 3120, rating: 4.8 },
  { title: "Run Your First 5 User Interviews", instructor: "Dev Patel", format: "Workshop", duration: "90m", students: 4012, rating: 4.9 },
];

export function PopularCourses() {
  return (
    <section className="border-b border-stroke-faint py-24">
      <Container>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
              Courses & tutorials
            </p>
            <h2 className="mt-3 font-display text-2xl font-medium tracking-tight text-text-strong md:text-3xl">
              Lessons from designers shipping with AI.
            </h2>
          </div>
          <Link
            href="/learn"
            className="hidden items-center gap-1.5 text-sm text-text-weak hover:text-text-strong md:inline-flex"
          >
            See all <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <ul className="mt-10 divide-y divide-stroke-faint border-y border-stroke-faint">
          {COURSES.map((c) => (
            <li key={c.title}>
              <a
                href="#"
                className="grid grid-cols-[1fr_auto] items-center gap-6 py-5 transition-colors hover:bg-bg-card-hover/40 md:grid-cols-[1fr_120px_120px_60px_24px] md:gap-8 md:px-2"
              >
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">
                    {c.format}
                  </p>
                  <h3 className="mt-1 truncate text-[15px] font-medium text-text-strong">
                    {c.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-text-muted">by {c.instructor}</p>
                </div>
                <div className="hidden items-center gap-1.5 text-xs text-text-muted md:flex">
                  <Clock className="size-3" /> {c.duration}
                </div>
                <div className="hidden text-xs text-text-muted md:block">
                  {c.students.toLocaleString()} students
                </div>
                <div className="hidden items-center gap-1 text-xs text-text-muted md:flex">
                  <Star className="size-3 text-accent-yellow" />
                  {c.rating}
                </div>
                <ArrowRight className="size-4 text-text-muted" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
