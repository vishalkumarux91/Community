"use client";

import { useEffect, useState } from "react";

export type PortfolioConfig = {
  linkedin: string;
  fullName: string;
  stage: "junior" | "mid" | "senior";
  projects: string[]; // titles
  theme: "minimal" | "studio" | "case-study";
  subdomain: string;
  hero: string;
  generatedAt: string; // ISO
};

const KEY = "rps:portfolio";

export function loadPortfolio(): PortfolioConfig | null {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function savePortfolio(cfg: PortfolioConfig) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cfg));
  } catch {}
}

export function clearPortfolio() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}

export function usePortfolio() {
  const [cfg, setCfg] = useState<PortfolioConfig | null>(null);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setCfg(loadPortfolio());
    setHydrated(true);
  }, []);
  return { cfg, hydrated, setCfg };
}
