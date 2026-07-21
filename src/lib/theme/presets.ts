import { themes, defaultTheme } from "@/lib/themes";

export type ThemeId =
  | "midnight"
  | "ocean"
  | "sunset"
  | "forest"
  | "lavender"
  | "ember"
  | "monochrome"
  | "light";

export interface ThemePreset {
  id: ThemeId;
  name: string;
  description: string;
  mode: "dark" | "light";
  iconName: string;
  accentColor: string;
  bgColor: string;
}

const DESCRIPTIONS: Record<ThemeId, string> = {
  midnight: "Purple gradient on deep black",
  ocean: "Cyan blue on deep navy",
  sunset: "Coral orange on dark plum",
  forest: "Emerald green on dark green",
  lavender: "Soft purple on dark violet",
  ember: "Warm orange on dark brown",
  monochrome: "Pure white on near-black",
  light: "Indigo on clean white",
};

// Editorial cut 2026-07-21: the switcher offers dark (midnight) + light only.
// The other theme token blocks remain in tokens.css, so previously saved
// preferences keep working until the user toggles.
const OFFERED: ThemeId[] = ["midnight", "light"];

export const THEME_PRESETS: ThemePreset[] = themes.filter((t) => OFFERED.includes(t.id as ThemeId)).map((t) => ({
  id: t.id as ThemeId,
  name: t.name,
  description: DESCRIPTIONS[t.id as ThemeId],
  mode: t.isDark ? "dark" : "light",
  iconName: t.iconName,
  accentColor: t.colors.accent,
  bgColor: t.colors.bgPrimary,
}));

export const DEFAULT_THEME: ThemeId = defaultTheme.id as ThemeId;
