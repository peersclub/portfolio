import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation/Navigation";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import EnhancedCursor from "@/components/EnhancedCursor/EnhancedCursor";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import "./view-transitions.css";

export const metadata: Metadata = {
    title: "Suresh Victor | Product Architect",
    description: "Product Leader & Co-Founder. 10+ years building products that scale to millions.",
    keywords: ["product leader", "co-founder", "fintech", "crypto", "AI", "assetworks"],
    authors: [{ name: "Suresh Victor" }],
    openGraph: {
        title: "Suresh Victor | Product Architect",
        description: "Building products that scale to millions",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var t=localStorage.getItem('theme');var v=['midnight','ocean','sunset','forest','lavender','ember','monochrome','light'];if(t&&v.indexOf(t)!==-1){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','midnight')}}catch(e){}})();`,
                    }}
                />
            </head>
            <body>
                <ThemeProvider>
                    <SmoothScroll>
                        <EnhancedCursor />
                        <div className="noise-overlay" />
                        <div className="blueprint-grid" />
                        <div className="atmospheric-glow" />
                        <Navigation />
                        <main className="relative z-10">
                            {children}
                        </main>
                        <ThemeSwitcher />
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
