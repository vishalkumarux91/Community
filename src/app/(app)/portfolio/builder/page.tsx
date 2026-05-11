"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Sparkles, ArrowRight, Check, LinkIcon } from "@/components/ui/Icons";
import { savePortfolio, type PortfolioConfig } from "@/lib/portfolio";

type Stage =
  | "intro"
  | "linkedin"
  | "name"
  | "career"
  | "projects"
  | "theme"
  | "subdomain"
  | "done";

type Message =
  | { id: string; from: "bot"; text: string; sub?: string }
  | { id: string; from: "user"; text: string };

const SUGGESTED_PROJECTS = [
  {
    title: "Razorpay onboarding redesign",
    role: "Lead designer",
    summary: "Reduced merchant drop-off by 18% through a 3-step KYC flow.",
    impact: ["18% drop-off reduction", "8M merchants", "Shipped in 6 weeks"],
    recommendedFor: ["junior", "mid", "senior"],
  },
  {
    title: "Internal design system v2",
    role: "Systems designer",
    summary: "Token architecture and 24 base components adopted across 11 product teams.",
    impact: ["11 teams", "24 components", "87% adoption"],
    recommendedFor: ["mid", "senior"],
  },
  {
    title: "Indie marketing site",
    role: "Designer + builder",
    summary: "Solo Framer site for a freelance brand. Good for craft, less for product narrative.",
    impact: ["6k visits in 3 months"],
    recommendedFor: ["junior"],
  },
];

const THEMES: { id: PortfolioConfig["theme"]; name: string; desc: string }[] = [
  { id: "minimal", name: "Minimal", desc: "Editorial, type-led, single column." },
  { id: "studio", name: "Studio", desc: "Bold typography, full-bleed visuals." },
  { id: "case-study", name: "Case-study heavy", desc: "Long-form storytelling, deep dives." },
];

export default function PortfolioBuilderPage() {
  const router = useRouter();

  const [stage, setStage] = useState<Stage>("intro");
  const [messages, setMessages] = useState<Message[]>([]);
  const [linkedin, setLinkedin] = useState("");
  const [fullName, setFullName] = useState("");
  const [careerStage, setCareerStage] = useState<PortfolioConfig["stage"] | null>(null);
  const [projects, setProjects] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<PortfolioConfig["theme"]>("studio");
  const [subdomain, setSubdomain] = useState("");

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // Initial bot greeting on mount
  useEffect(() => {
    const t = setTimeout(() => {
      addBot(
        "Hi 👋 — I'll help you build your portfolio in a few minutes.",
        "Drop your LinkedIn first, and I'll pull the rest from there.",
      );
      setStage("linkedin");
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, stage]);

  const addBot = (text: string, sub?: string) =>
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: "bot", text, sub }]);
  const addUser = (text: string) =>
    setMessages((m) => [...m, { id: crypto.randomUUID(), from: "user", text }]);

  const handleLinkedin = () => {
    if (!linkedin.trim()) return;
    addUser(linkedin);
    setStage("name");
    setTimeout(() => {
      addBot(
        "Got it. I can see your timeline.",
        "And what should we call you on the portfolio?",
      );
    }, 500);
  };

  const handleName = () => {
    if (!fullName.trim()) return;
    addUser(fullName);
    setStage("career");
    setTimeout(() => {
      addBot(
        `Nice to meet you, ${fullName.split(" ")[0]}.`,
        "What career stage are you targeting? I'll tune the projects + tone for that.",
      );
    }, 500);
  };

  const handleCareer = (c: PortfolioConfig["stage"]) => {
    setCareerStage(c);
    addUser(
      c === "junior" ? "First job" : c === "mid" ? "Mid-level switch" : "Senior / Lead",
    );
    // pre-select recommended projects
    const recommended = SUGGESTED_PROJECTS.filter((p) => p.recommendedFor.includes(c));
    setProjects(new Set(recommended.map((p) => p.title)));
    setStage("projects");
    setTimeout(() => {
      addBot(
        `For ${c === "junior" ? "a first job" : c === "mid" ? "a mid-level switch" : "senior / lead roles"} I usually recommend ${recommended.length} projects.`,
        "Toggle the ones you want included — I'll draft the case studies.",
      );
    }, 500);
  };

  const handleProjectsContinue = () => {
    addUser(`${projects.size} projects selected`);
    setStage("theme");
    setTimeout(() => {
      addBot("Looking great. Pick a theme — you can change it later.");
    }, 500);
  };

  const handleTheme = (t: PortfolioConfig["theme"]) => {
    setTheme(t);
    addUser(THEMES.find((x) => x.id === t)?.name ?? t);
    setStage("subdomain");
    setTimeout(() => {
      const slug = fullName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSubdomain(slug || "yourname");
      addBot(
        "Last thing — pick your subdomain. You can connect a custom domain later.",
      );
    }, 500);
  };

  const handleSubdomain = () => {
    if (!subdomain.trim()) return;
    addUser(`opencanvas.community/${subdomain}`);

    const cfg: PortfolioConfig = {
      linkedin,
      fullName,
      stage: careerStage ?? "mid",
      projects: [...projects],
      theme,
      subdomain,
      hero:
        "Product designer focused on consumer fintech. I help small teams ship — fast, considered, end-to-end.",
      generatedAt: new Date().toISOString(),
    };
    savePortfolio(cfg);

    setStage("done");
    setTimeout(() => {
      addBot(
        "Done — your portfolio is live.",
        "Open it whenever. You can edit any section in place.",
      );
    }, 500);
  };

  return (
    <div className="mx-auto flex h-[calc(100dvh-64px)] w-full max-w-[760px] flex-col px-6 py-6 md:px-10">
      <header className="space-y-1.5 pb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-orange/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-accent-orange">
          <Sparkles className="size-3" /> AI Portfolio Builder
        </span>
        <h1 className="font-display text-2xl font-medium tracking-tight">
          Build your portfolio in a conversation.
        </h1>
      </header>

      <div
        ref={scrollerRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-stroke-weak bg-bg-card p-5"
      >
        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}

        {stage === "projects" && (
          <div className="space-y-2 pl-12">
            {SUGGESTED_PROJECTS.map((p) => {
              const on = projects.has(p.title);
              return (
                <button
                  key={p.title}
                  onClick={() =>
                    setProjects((prev) => {
                      const next = new Set(prev);
                      next.has(p.title) ? next.delete(p.title) : next.add(p.title);
                      return next;
                    })
                  }
                  className={
                    "flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors " +
                    (on
                      ? "border-accent-orange bg-accent-orange/[0.06]"
                      : "border-stroke-weak hover:border-stroke-strong")
                  }
                >
                  <span
                    className={
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border " +
                      (on
                        ? "border-accent-orange bg-accent-orange text-text-inverse-strong"
                        : "border-stroke-weak")
                    }
                  >
                    {on && <Check className="size-3" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {p.role} · {p.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {stage === "theme" && (
          <div className="grid gap-2 pl-12 md:grid-cols-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTheme(t.id)}
                className="rounded-xl border border-stroke-weak p-4 text-left transition-colors hover:border-stroke-strong"
              >
                <p className="font-medium">{t.name}</p>
                <p className="mt-1 text-xs text-text-muted">{t.desc}</p>
              </button>
            ))}
          </div>
        )}

        {stage === "career" && (
          <div className="flex flex-wrap gap-2 pl-12">
            {[
              { id: "junior" as const, label: "Looking for first job" },
              { id: "mid" as const, label: "Mid-level switch" },
              { id: "senior" as const, label: "Senior / Lead" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleCareer(opt.id)}
                className="rounded-full border border-stroke-weak px-4 py-1.5 text-sm hover:border-stroke-strong"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="mt-4">
        {stage === "linkedin" && (
          <Input
            value={linkedin}
            onChange={setLinkedin}
            onSubmit={handleLinkedin}
            placeholder="https://linkedin.com/in/yourname"
            icon={<LinkIcon className="size-4 text-text-muted" />}
          />
        )}
        {stage === "name" && (
          <Input
            value={fullName}
            onChange={setFullName}
            onSubmit={handleName}
            placeholder="Your full name"
          />
        )}
        {stage === "projects" && (
          <button
            onClick={handleProjectsContinue}
            disabled={projects.size === 0}
            className="ml-auto flex items-center gap-1.5 rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong disabled:opacity-40"
          >
            Continue with {projects.size} projects <ArrowRight className="size-4" />
          </button>
        )}
        {stage === "subdomain" && (
          <div className="flex items-center gap-2 rounded-full border border-stroke-weak bg-bg-card p-1">
            <span className="px-3 text-sm text-text-muted">opencanvas.community/</span>
            <input
              value={subdomain}
              onChange={(e) =>
                setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
              }
              onKeyDown={(e) => e.key === "Enter" && handleSubdomain()}
              className="h-8 flex-1 bg-transparent text-sm focus:outline-none"
            />
            <button
              onClick={handleSubdomain}
              disabled={!subdomain.trim()}
              className="grid size-8 place-items-center rounded-full bg-fill-strong text-text-inverse-strong disabled:opacity-40"
              aria-label="Submit"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
        {stage === "done" && (
          <button
            onClick={() => router.push("/portfolio")}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-orange py-3 text-sm font-medium text-bg-sunken"
          >
            Open my portfolio <ArrowRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function Bubble({ message }: { message: Message }) {
  if (message.from === "bot") {
    return (
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-fill-strong text-text-inverse-strong">
          <Sparkles className="size-4" />
        </span>
        <div className="min-w-0 max-w-[80%] space-y-1.5 rounded-2xl rounded-tl-sm bg-bg-card-hover px-4 py-3">
          <p className="text-sm leading-relaxed text-text-strong">{message.text}</p>
          {message.sub && (
            <p className="text-sm leading-relaxed text-text-weak">{message.sub}</p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-start justify-end gap-3 pl-12">
      <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-fill-strong px-4 py-2.5 text-sm text-text-inverse-strong">
        {message.text}
      </div>
    </div>
  );
}

function Input({
  value,
  onChange,
  onSubmit,
  placeholder,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-stroke-weak bg-bg-card p-1.5">
      {icon && <span className="pl-3">{icon}</span>}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        placeholder={placeholder}
        className="h-9 flex-1 bg-transparent px-2 text-sm placeholder:text-text-muted focus:outline-none"
      />
      <button
        onClick={onSubmit}
        disabled={!value.trim()}
        className="grid size-9 place-items-center rounded-full bg-fill-strong text-text-inverse-strong disabled:opacity-40"
        aria-label="Send"
      >
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}
