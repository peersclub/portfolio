'use client';

// Tiny cross-component theme store: V2Nav's switcher writes it, ThreadStage
// and pages read it. Persisted to localStorage, mirrored to <html
// data-v2-theme> so the CSS variable blocks in v2.css follow along —
// including the portaled fixed layers that live outside .v2.

import { useSyncExternalStore } from 'react';
import { V2_THEMES, type V2ThemeId } from './themes';

const KEY = 'v2-theme';
let current: V2ThemeId = 'gold';
const listeners = new Set<() => void>();
let initialized = false;

function apply(id: V2ThemeId) {
    document.documentElement.setAttribute('data-v2-theme', id);
}

function init() {
    if (initialized || typeof window === 'undefined') return;
    initialized = true;
    const saved = localStorage.getItem(KEY) as V2ThemeId | null;
    if (saved && saved in V2_THEMES) current = saved;
    apply(current);
}

export function setV2Theme(id: V2ThemeId) {
    if (!(id in V2_THEMES)) return;
    current = id;
    localStorage.setItem(KEY, id);
    apply(id);
    listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
    init();
    listeners.add(cb);
    return () => listeners.delete(cb);
}

export function useV2Theme(): V2ThemeId {
    return useSyncExternalStore(
        subscribe,
        () => {
            init();
            return current;
        },
        () => 'gold' as V2ThemeId,
    );
}
