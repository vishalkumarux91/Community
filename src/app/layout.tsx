import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * Replicate-inspired font stack.
 *
 * Inter substitutes for basier-square (square sans) on body + UI.
 * Bricolage Grotesque substitutes for rb-freigeist-neue (heavy
 * condensed grotesque) on display sizes — this is the official
 * fallback called out in DESIGN.md. JetBrains Mono carries code.
 *
 * Both Freigeist + Basier Square are licensed — the substitutes here
 * are the closest free Google Fonts; swap in the real licensed
 * families if RPS adds them to the project.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Opencanvas — Become industry-ready. Ship with AI.",
  description:
    "A community for early-career designers. Live workshops, real assignments, honest assessments from senior designers — plus a tidy library of playbooks and resources.",
};

// Sets data-theme before paint to avoid the wrong-theme flash on first load.
const themeInit = `
(function() {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
