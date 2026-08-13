import type { Metadata } from "next";
import { Teko, DM_Sans, DM_Mono, Yatra_One } from "next/font/google";
import { allProjects } from "@/content/projects";
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
  title: {
    default: "Pratham Nahata — Full-Stack & ML Engineer",
    template: "%s — Pratham Nahata",
  },
  description:
    "Pratham Nahata builds full-stack + ML systems that feel alive — real-time inference, graph neural networks, multi-agent AI. Interfaces that feel right, models that actually ship.",
  metadataBase: new URL("https://itzpratham.in"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://itzpratham.in/",
    siteName: "Pratham Nahata — Portfolio",
    title: "Pratham Nahata — Full-Stack & ML Engineer",
    description:
      "Full-stack + ML systems that feel alive. CS undergrad, SIH 2024 grand finalist.",
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "Pratham Nahata — Full-Stack × ML Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Nahata — Full-Stack & ML Engineer",
    description: "Full-stack + ML systems that feel alive. CS undergrad, SIH 2024 grand finalist.",
    images: ["/assets/og-image.png"],
  },
  icons: { icon: "/assets/favicon.svg" },
  robots: { index: true, follow: true },
  other: { "theme-color": "#f4efe6" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
              "(function(){try{var q=new URLSearchParams(location.search);var t=q.get('theme')||localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();",
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Pratham Nahata",
                url: "https://itzpratham.in/",
                image: "https://itzpratham.in/assets/og-image.png",
                jobTitle: "Full-Stack × ML Engineer",
                description:
                  "CS undergrad building full-stack + ML systems — real-time browser inference, graph neural networks, multi-agent AI.",
                knowsAbout: [
                  "FastAPI", "Next.js", "XGBoost", "ONNX Runtime", "PyTorch", "ESM-2",
                  "Graph Neural Networks", "Tauri", "Multi-Agent AI", "WebSockets",
                ],
                alumniOf: { "@type": "CollegeOrUniversity", name: "B.Tech Computer Science" },
                sameAs: [
                  "https://github.com/iAMv1",
                  "https://www.linkedin.com/in/itzpratham",
                  "https://itzpratham.in/",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Pratham Nahata — Portfolio",
                url: "https://itzpratham.in/",
                inLanguage: "en",
                description: "Full-stack + ML systems that ship. Portfolio of Pratham Nahata.",
              },
              ...allProjects().map((c) => ({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: c.title,
                url: `https://itzpratham.in/work/${c.slug}`,
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Web",
                description: c.blurb,
                author: { "@type": "Person", name: "Pratham Nahata", url: "https://itzpratham.in/" },
                softwareRequirements: c.stack.join(", "),
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              })),
            ]),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
