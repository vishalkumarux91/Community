"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Input, Textarea } from "@/components/ui/Input";
import { Sparkles } from "@/components/ui/Icons";

const TYPES = [
  { id: "discussion", label: "Discussion / question", helper: "Ask anything design — career, tools, hot takes." },
  { id: "critique", label: "Critique my design", helper: "Drop screens + context. The community will roast (kindly)." },
  { id: "portfolio-review", label: "Portfolio review", helper: "Share your portfolio link with target role + level." },
  { id: "job-prep", label: "Job prep / interview", helper: "Take-homes, mock interviews, panel grading." },
] as const;

export default function NewPostPage() {
  const [type, setType] = useState<(typeof TYPES)[number]["id"]>("discussion");

  return (
    <div className="mx-auto w-full max-w-[760px] space-y-8 px-6 py-10 md:px-10">
      <Link href="/community" className="text-sm text-text-muted hover:text-text-strong">← Community</Link>

      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight">New post</h1>
        <p className="text-sm text-text-weak">Pick a type so the right people see it.</p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className={`rounded-2xl border p-5 text-left transition-colors ${
              type === t.id ? "border-accent-orange bg-accent-orange/10" : "border-stroke-weak bg-bg-card hover:border-stroke-strong"
            }`}
          >
            <p className="font-medium">{t.label}</p>
            <p className="mt-1 text-xs text-text-muted">{t.helper}</p>
          </button>
        ))}
      </div>

      <Card className="space-y-5 p-6" hover={false}>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-text-muted">Title</label>
          <Input placeholder="Summarize your question or critique brief in one line" />
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-text-muted">Body</label>
          <Textarea
            className="min-h-40"
            placeholder="Add context: what's the problem you're solving, who is it for, what constraints, and what feedback do you want?"
          />
        </div>

        {(type === "critique" || type === "portfolio-review") && (
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wider text-text-muted">
              {type === "critique" ? "Screens or Figma link" : "Portfolio URL"}
            </label>
            <Input placeholder={type === "critique" ? "Paste Figma share link or upload screens" : "https://yoursite.com"} />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider text-text-muted">Tags</label>
          <div className="flex flex-wrap gap-2">
            {["Figma", "AI tools", "Onboarding", "Dashboard", "Career switch", "Big tech", "Indie", "Fintech"].map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        <Card className="flex items-start gap-3 border-dashed bg-white/[0.02] p-4" hover={false}>
          <Sparkles className="mt-0.5 size-4 shrink-0 text-accent-orange" />
          <div className="text-xs text-text-weak">
            <p className="font-medium text-text-strong">AI will help your post get better feedback.</p>
            <p className="mt-1">We&rsquo;ll suggest missing context (audience, constraints, success metric) before you publish.</p>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-2">
          <Link href="/community" className="rounded-full border border-stroke-weak px-4 py-2 text-sm">
            Cancel
          </Link>
          <button className="rounded-full bg-fill-strong px-5 py-2 text-sm font-medium text-text-inverse-strong">
            Publish
          </button>
        </div>
      </Card>
    </div>
  );
}
