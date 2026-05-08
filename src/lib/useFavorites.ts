"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Lightweight localStorage-backed set for favorite/follow state. Lets the
 * prototype feel real (favorites persist across reloads) without requiring
 * a backend.
 */
export function useFavorites(key: string) {
  const [items, setItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setItems(new Set(JSON.parse(raw)));
    } catch {}
  }, [key]);

  const persist = useCallback(
    (next: Set<string>) => {
      setItems(next);
      try {
        localStorage.setItem(key, JSON.stringify([...next]));
      } catch {}
    },
    [key],
  );

  const toggle = useCallback(
    (id: string) => {
      const next = new Set(items);
      next.has(id) ? next.delete(id) : next.add(id);
      persist(next);
    },
    [items, persist],
  );

  const has = useCallback((id: string) => items.has(id), [items]);

  return { has, toggle, count: items.size, items };
}
