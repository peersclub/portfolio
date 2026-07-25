/* Haptic feedback — tasteful, centralized, and silent where unsupported.
 *
 * Uses the Vibration API (Android Chrome/Firefox). iOS Safari has no web
 * vibration API, so every call degrades to a no-op there — never feature-
 * gate UI on this, it's seasoning, not the meal.
 *
 * Grammar (keep this tiny so the site has ONE tactile language):
 *   tick    — 5ms  · scrub detents, passing a milestone dot
 *   tap     — 10ms · buttons, links, toggles
 *   select  — confirm pattern · committing a choice (theme, submit)
 */

const canVibrate = (): boolean =>
    typeof navigator !== 'undefined' &&
    'vibrate' in navigator &&
    // only fire on touch devices — desktop gamepad-adjacent vibrations are never wanted
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: coarse)').matches;

const vibrate = (pattern: number | number[]) => {
    try {
        if (canVibrate()) navigator.vibrate(pattern);
    } catch {
        /* some browsers throw on vibrate() without user activation — never surface it */
    }
};

export const haptics = {
    /** finest grain — scrubbing detents, one per unit crossed */
    tick: () => vibrate(5),
    /** standard press acknowledgement */
    tap: () => vibrate(10),
    /** a committed choice — double pulse */
    select: () => vibrate([12, 40, 18]),
};
