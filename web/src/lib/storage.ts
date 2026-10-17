"use client";

import { useSyncExternalStore } from "react";
import type { Answers, Constraints, SkillLevels } from "find-my-business-engine";

// Quiz progress lives in localStorage so people can leave and come back
// (SPEC §5). Reads and writes are wrapped because storage can be unavailable
// (private mode, blocked site data).

export interface QuizState {
  index: number;
  answers: Answers;
  constraints: Partial<Constraints>;
  completed: boolean;
}

interface Store<T> {
  get: () => T;
  set: (value: T) => void;
  subscribe: (listener: () => void) => () => void;
  fallback: T;
}

function createStore<T>(key: string, fallback: T): Store<T> {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  return {
    fallback,
    get() {
      if (cache === undefined) {
        try {
          const raw = localStorage.getItem(key);
          cache = raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
        } catch {
          cache = fallback;
        }
      }
      return cache as T;
    },
    set(value) {
      cache = value;
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Keep working in memory if storage is unavailable.
      }
      listeners.forEach((l) => l());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export const EMPTY_QUIZ: QuizState = { index: 0, answers: {}, constraints: {}, completed: false };

export const quizStore = createStore<QuizState>("fmb:quiz:v1", EMPTY_QUIZ);
export const skillsStore = createStore<SkillLevels>("fmb:skills:v1", {});

export function useStore<T>(store: Store<T>): [T, (value: T) => void] {
  const value = useSyncExternalStore(store.subscribe, store.get, () => store.fallback);
  return [value, store.set];
}

const noopSubscribe = () => () => {};

/** False during server render and hydration, true after. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
