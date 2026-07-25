import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation/Navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import SmoothScroll from "@/components/SmoothScroll";
import TouchHaptics from "@/components/TouchHaptics";
import "./globals.css";
import "./view-transitions.css";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-inter",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono-loaded",
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL
            || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://sureshvictor.com')
    ),
    title: "Suresh Victor | Product Architect",
    description: "Product Leader & Co-Founder. 10+ years building products that scale to millions.",
    keywords: ["product leader", "co-founder", "fintech", "crypto", "AI", "assetworks"],
    authors: [{ name: "Suresh Victor" }],
    openGraph: {
        title: "Suresh Victor | Product Architect",
        description: "Building products that scale to millions",
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Suresh Victor | Product Architect",
        description: "Building products that scale to millions",
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('theme');if(t!=='dark'&&t!=='light'){t=(t==='light')?'light':'dark';localStorage.setItem('theme',t)}d.setAttribute('data-theme',t);var a=localStorage.getItem('accent');var va=['gold','emerald','coral','violet'];if(va.indexOf(a)===-1){a='gold';localStorage.setItem('accent',a)}d.setAttribute('data-accent',a)}catch(e){}})();`,
                    }}
                />
            </head>
            <body>
                <a href="#main-content" className="skip-link">Skip to main content</a>
                <ThemeProvider>
                    <SmoothScroll>
<div className="noise-overlay" />
                        <div className="blueprint-grid" />
                        <div className="atmospheric-glow" />
                        <Navigation />
                        <main id="main-content" className="relative z-10">
                            {children}
                        </main>
                        <ThemeSwitcher />
                        <TouchHaptics />
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
