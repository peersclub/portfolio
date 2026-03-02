"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import { themes } from "@/lib/themes";

const THEME_IDS = themes.map((t) => t.id);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="midnight"
      themes={THEME_IDS}
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
