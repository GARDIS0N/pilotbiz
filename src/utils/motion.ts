import { useState, useEffect } from 'react';

const STORAGE_KEY = 'jifuno_reduce_motion';

export function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored !== null) {
    return stored === 'true';
  }
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

const listeners = new Set<(reduced: boolean) => void>();

export function setReducedMotionPreference(enabled: boolean) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false');
  }
  listeners.forEach(fn => fn(enabled));
}

export function useReducedMotionPreference(): boolean {
  const [reduced, setReduced] = useState<boolean>(getInitialReducedMotion);

  useEffect(() => {
    const handler = (val: boolean) => setReduced(val);
    listeners.add(handler);

    const mediaQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const mediaHandler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY) === null) {
        setReduced(e.matches);
      }
    };

    mediaQuery?.addEventListener?.('change', mediaHandler);
    return () => {
      listeners.delete(handler);
      mediaQuery?.removeEventListener?.('change', mediaHandler);
    };
  }, []);

  return reduced;
}

export const springTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 28
};
