import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";

import { education, profile, socials } from "@/content/site";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — ${profile.role}`;
const description =
  "Computer Science undergraduate at IIIT Kota (2027) building full-stack systems end to end — WebRTC telemedicine, authoritative Go game servers, and AI assistants grounded in real records.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: socials.github }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Software Engineer",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Go",
    "WebRTC",
    "PostgreSQL",
    "IIIT Kota",
    "SDE",
    "Portfolio",
  ],
  openGraph: {
    type: "profile",
    siteName: `${profile.name} — Portfolio`,
    title,
    description,
    url: profile.siteUrl,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "/" },
};

/** Person schema so search engines can resolve the profile and its links. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.siteUrl,
  sameAs: [socials.github, socials.linkedin, socials.leetcode],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.institute,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kota",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Full-stack web development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Go",
    "WebRTC",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Large language models",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="grain relative flex min-h-full flex-col bg-void">
        {/* Framer Motion writes its initial `opacity: 0` into the server
            markup. Without JS those styles are never animated away, so force
            every animated wrapper visible instead of showing a blank page. */}
        <noscript>
          <style>{`.js-reveal,.js-reveal *{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        {/* First tab stop: lets keyboard users skip the nav and social rail. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-void"
        >
          Skip to content
        </a>

        {children}

        <script
          type="application/ld+json"
          // Serialised from a local constant — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
