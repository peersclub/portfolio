'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { DEFAULT_MODE, MODES } from '@/lib/theme/config';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider
            attribute="data-theme"
            themes={MODES.map(m => m.id)}
            defaultTheme={DEFAULT_MODE}
            enableSystem={false}
        >
            {children}
        </NextThemesProvider>
    );
}
