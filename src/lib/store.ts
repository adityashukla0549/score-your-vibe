import { useCallback, useEffect, useState } from "react";
import type { Result } from "./scoring";

const KEY = "rml_state_v1";

export type Friend = { id: string; name: string; score: number; delta: number; avatar: string };
export type Battle = { id: string; friend: string; myStart: number; theirStart: number; theirNow: number; endsIn: number };
export type FriendFeedback = { id: string; from: string; question: string; answer: string; date: string };

export type AppState = {
  history: Result[];
  planChecked: string[];
  planStartedAt: string | null;
  isPro: boolean;
  name: string;
  friends: Friend[];
  battles: Battle[];
  feedback: FriendFeedback[];
};

const defaultState: AppState = {
  history: [],
  planChecked: [],
  planStartedAt: null,
  isPro: false,
  name: "",
  friends: [
    { id: "f1", name: "Aarav", score: 74, delta: 6, avatar: "🦊" },
    { id: "f2", name: "Ishita", score: 81, delta: 3, avatar: "🐼" },
    { id: "f3", name: "Rohan", score: 58, delta: -2, avatar: "🐸" },
  ],
  battles: [{ id: "b1", friend: "Ishita", myStart: 0, theirStart: 78, theirNow: 81, endsIn: 12 }],
  feedback: [
    {
      id: "fb1",
      from: "Anonymous friend",
      question: "What's their most underrated quality?",
      answer: "You show up for people even when you're clearly running on 12% battery.",
      date: new Date().toISOString(),
    },
  ],
};

let listeners: (() => void)[] = [];
let cache: AppState | null = null;

function read(): AppState {
  if (cache) return cache;
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? { ...defaultState, ...(JSON.parse(raw) as Partial<AppState>) } : defaultState;
  } catch {
    cache = defaultState;
  }
  return cache;
}

export function setState(update: (s: AppState) => AppState) {
  const next = update(read());
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function useAppState(): [AppState, typeof setState, boolean] {
  const [, force] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const l = () => force((n) => n + 1);
    listeners.push(l);
    l();
    return () => {
      listeners = listeners.filter((x) => x !== l);
    };
  }, []);

  return [hydrated ? read() : defaultState, setState, hydrated];
}

export function useLatestResult() {
  const [state, , hydrated] = useAppState();
  return { result: state.history[state.history.length - 1] ?? null, state, hydrated };
}

export function useToggleTask() {
  return useCallback((id: string) => {
    setState((s) => ({
      ...s,
      planStartedAt: s.planStartedAt ?? new Date().toISOString(),
      planChecked: s.planChecked.includes(id) ? s.planChecked.filter((x) => x !== id) : [...s.planChecked, id],
    }));
  }, []);
}
