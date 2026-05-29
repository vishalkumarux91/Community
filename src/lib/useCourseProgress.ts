"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * localStorage-backed completion set for the Level Up course. One flat set of
 * namespaced ids covers lessons, capstones, and "The Bar" checklist ticks, so
 * progress persists across reloads without a backend.
 *
 * Id conventions (see helpers below):
 *   L:<trackId>:<lessonId>   — a lesson marked complete
 *   C:<trackId>:<partId>     — a part capstone marked complete
 *   B:<trackId>:<index>      — a "The Bar" checklist item ticked
 */
export const lessonKey = (trackId: string, lessonId: string) =>
  `L:${trackId}:${lessonId}`;
export const capstoneKey = (trackId: string, partId: string) =>
  `C:${trackId}:${partId}`;
export const barKey = (trackId: string, index: number) =>
  `B:${trackId}:${index}`;

export function useCourseProgress(key = "designup:progress") {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setDone(new Set(JSON.parse(raw)));
    } catch {}
    setReady(true);
  }, [key]);

  const persist = useCallback(
    (next: Set<string>) => {
      setDone(next);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {}
    },
    [key],
  );

  const has = useCallback((id: string) => done.has(id), [done]);

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(done);
      next.has(id) ? next.delete(id) : next.add(id);
      persist(next);
    },
    [done, persist],
  );

  const set = useCallback(
    (id: string, value: boolean) => {
      const next = new Set(done);
      value ? next.add(id) : next.delete(id);
      persist(next);
    },
    [done, persist],
  );

  return { done, has, toggle, set, ready };
}
