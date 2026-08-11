import type { Metadata } from "next";
import { Teko, DM_Sans, DM_Mono, Yatra_One } from "next/font/google";
import "./globals.css";

const teko = Teko({
  variable: "--font-teko",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const yatraOne = Yatra_One({
  variable: "--font-yatra-one",
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pratham Nahata — Vibe Builder · Full-Stack & ML Engineer",
  description:
    "Pratham Nahata builds full-stack + ML systems that feel alive — real-time inference, graph neural networks, multi-agent AI. Interfaces that feel right, models that actually ship.",
  metadataBase: new URL("https://itzpratham.in"),
  openGraph: {
    title: "Pratham Nahata — Vibe Builder",
    description:
      "Full-stack + ML systems that feel alive. CS undergrad, SIH 2024 grand finalist.",
    images: [{ url: "/assets/og-image.svg", width: 1200, height: 630 }],
  },
  icons: { icon: "/assets/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${teko.variable} ${dmSans.variable} ${dmMono.variable} ${yatraOne.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();",
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
