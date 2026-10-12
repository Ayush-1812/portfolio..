/**
 * Single source of truth for every piece of content on this site.
 *
 * Provenance rule: everything here comes from either
 *   (a) public/Ayush_Carpenter_Resume.pdf, or
 *   (b) the linked repository's own README.
 * Nothing is estimated, rounded or inferred. If a fact is not in one of those
 * two places it does not belong in this file.
 */

export const profile = {
  name: "Ayush Carpenter",
  shortName: "AJ",
  role: "Software Engineer",
  discipline: "Full-Stack & Realtime Systems",
  email: "ayushcarpenter1812.work@gmail.com",
  phone: "+91 95875 67453",
  phoneHref: "tel:+919587567453",
  location: "Kota, Rajasthan — open to remote & relocation",
  resumePath: "/Ayush_Carpenter_Resume.pdf",
  resumeFileName: "Ayush_Carpenter_Resume.pdf",
  /** The deployed address this resume links to as "Portfolio". */
  siteUrl: "https://ayush-portfolio-three-gamma.vercel.app",
} as const;

export const socials = {
  github: "https://github.com/Ayush-1812",
  linkedin: "https://www.linkedin.com/in/ayush-carpenter-b1785237b/",
  leetcode: "https://leetcode.com/u/Ayush__2004/",
} as const;

/* ------------------------------------------------------------------ */
/* Projects — resume order                                             */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  highlights: string[];
  /** Quantified facts rendered as a stat strip on each card. */
  metrics: { value: string; label: string }[];
  stack: string[];
  repo: string;
  live?: string;
  note?: string;
  accent: "indigo" | "cyan" | "violet" | "sand";
};

export const projects: Project[] = [
  {
    slug: "medicare",
    title: "MediCare",
    tagline: "Full-stack telemedicine platform",
    summary:
      "Booking, prescriptions, payments and peer-to-peer video consultation in one Dockerized system — with a Gemini health assistant wired into the live record set rather than guessing.",
    highlights: [
      "JWT auth with role-based access control across 3 roles, built on 39 type-safe Server Actions and 6 Prisma models",
      "Peer-to-peer video consultations over WebRTC, with a custom Node.js + Socket.IO signaling server handling SDP/ICE negotiation",
      "Redis pub/sub synchronizes sessions across multiple server instances, so signaling survives horizontal scaling",
      "Razorpay payment flow alongside appointment booking and digital prescription generation",
      "A 7-tool Gemini health assistant operating over real patient records",
    ],
    metrics: [
      { value: "39", label: "Server Actions" },
      { value: "6", label: "Prisma models" },
      { value: "3", label: "RBAC roles" },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "WebRTC",
      "Socket.IO",
      "Redis",
      "PostgreSQL",
      "Prisma",
      "Gemini API",
      "Razorpay",
      "Docker",
    ],
    repo: "https://github.com/Ayush-1812/MediCare",
    live: "https://medi-care-2vbm.vercel.app/",
    accent: "cyan",
  },
  {
    slug: "versionvista",
    title: "VersionVista",
    tagline: "Git repository visualizer",
    summary:
      "Replays a repository's history as an interactive timeline. Scrub through it and the file tree, diffs and commit graph reassemble themselves at that point in time — without blocking the UI.",
    highlights: [
      "Parses and indexes repository metadata with simple-git to replay commit history as an interactive timeline",
      "File-level and line-level diffs with side-by-side comparison, handling 1,000+ commits without blocking the UI",
      "Dashboard combining a commit tree, file explorer and code viewer",
      "Caches repository data in MongoDB, reducing analysis time by approximately 60%",
    ],
    metrics: [
      { value: "1,000+", label: "commits handled" },
      { value: "~60%", label: "faster analysis" },
    ],
    stack: ["Next.js", "React.js", "MongoDB", "simple-git", "Tailwind CSS"],
    repo: "https://github.com/prayag0one4/VersionVista",
    live: "https://inquisitive-narwhal-2c09de.netlify.app/",
    note: "Collaborative project — repository hosted on a teammate's account",
    accent: "violet",
  },
  {
    slug: "cardplay",
    title: "CardPlay",
    tagline: "Real-time multiplayer card games",
    summary:
      "Monopoly Deal and Trump, played live in the browser. A Go rules engine owns every decision so the client cannot cheat, and the table survives a restart or a dropped connection without losing a hand.",
    highlights: [
      "Authoritative Go rules engines behind one pluggable game interface, so a new game plugs into the same contract",
      "Exactly-once WebSocket command processing, verified for 8 concurrent actions",
      "Recovery without data loss, verified under restart and reconnect tests",
      "89.7% test coverage with 46 end-to-end tests across 4 live player sessions",
    ],
    metrics: [
      { value: "89.7%", label: "test coverage" },
      { value: "46", label: "E2E tests" },
      { value: "8", label: "concurrent actions" },
    ],
    stack: ["Go", "PostgreSQL", "WebSockets", "Next.js", "TypeScript", "Docker"],
    repo: "https://github.com/Ayush-1812/CardPlay",
    live: "https://card-play01.vercel.app/",
    accent: "sand",
  },
  {
    slug: "wealthwise",
    title: "WealthWise",
    tagline: "AI personal-finance platform",
    summary:
      "Tracks income, expenses and budgets with Gemini reading the receipts — plus a Splitwise-style expense module that nets debts pairwise across a derived-balance ledger.",
    highlights: [
      "Gemini receipt OCR feeding Recharts dashboards over a Prisma-backed PostgreSQL schema",
      "Inngest-driven automated budget alerts and scheduled reports",
      "Splitwise-style expense module with 6 split algorithms",
      "Group and friend management with RBAC, pairwise debt netting and settlements",
      "Derived-balance ledger spanning 10 tables",
      "Authentication handled by Clerk",
    ],
    metrics: [
      { value: "6", label: "split algorithms" },
      { value: "10", label: "ledger tables" },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "PostgreSQL",
      "Prisma",
      "Clerk",
      "Inngest",
      "Gemini API",
      "Recharts",
      "Tailwind CSS",
    ],
    repo: "https://github.com/Ayush-1812/WelthWise",
    live: "https://welth-wise-nwr1-git-main-ayush-carpenters-projects.vercel.app/",
    accent: "indigo",
  },
];

/* ------------------------------------------------------------------ */
/* Skills — resume groupings, verbatim                                 */
/* ------------------------------------------------------------------ */

export type SkillGroup = {
  category: string;
  icon: "code" | "server" | "database" | "cloud" | "monitor";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: "code",
    items: ["C++", "JavaScript", "TypeScript", "Go", "Python", "Java", "SQL"],
  },
  {
    category: "Frontend",
    icon: "monitor",
    items: [
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux",
      "Zustand",
      "React Query",
      "Responsive Design",
    ],
  },
  {
    category: "Backend",
    icon: "server",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebRTC",
      "Socket.IO",
      "WebSockets",
      "JWT Authentication",
      "Microservices",
    ],
  },
  {
    category: "Databases & ORM",
    icon: "database",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma"],
  },
  {
    category: "DevOps & Tools",
    icon: "cloud",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Git",
      "GitHub",
      "GitHub Actions (CI/CD)",
      "Linux",
      "Postman",
      "VS Code",
    ],
  },
];

export const coursework = [
  "Data Structures & Algorithms",
  "OOP",
  "DBMS",
  "Operating Systems",
  "Computer Networks",
  "System Design",
];

/* ------------------------------------------------------------------ */
/* Experience & education                                              */
/* ------------------------------------------------------------------ */

export type Role = {
  company: string;
  title: string;
  location: string;
  period: string;
  bullets: string[];
};

export const experience: Role[] = [
  {
    company: "Gyanama",
    title: "Frontend Developer Intern",
    location: "Remote",
    period: "March 2025 – June 2025",
    bullets: [
      "Developed 15+ reusable, responsive UI components in React.js, Next.js and Tailwind CSS, adopted across 10 product pages and cutting duplicated UI code by 40% — establishing a shared component library for the team.",
      "Collaborated with senior engineers on frontend architecture, state management and API data flow, standardizing 3+ new feature modules.",
      "Integrated 8+ REST API endpoints using React Query for caching, loading and error states, reducing redundant network calls by 30%.",
    ],
  },
];

export const education = {
  institute: "Indian Institute of Information Technology, Kota",
  location: "Kota, Rajasthan",
  degree: "B.Tech in Computer Science and Engineering",
  score: "CGPA 7.78 / 10",
  period: "2023 – 2027 (Expected)",
};

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */

export type Achievement = {
  title: string;
  detail: string;
  icon: "trophy" | "zap" | "braces";
};

export const achievements: Achievement[] = [
  {
    title: "Top 7 of 950+ teams",
    detail: "Odoo Hackathon at IIT Gandhinagar — top 0.7%",
    icon: "trophy",
  },
  {
    title: "Top 500 of 32,000+",
    detail: "LeetCode Biweekly Contest — top 1.6%",
    icon: "zap",
  },
  {
    title: "1,050+ problems solved",
    detail:
      "Graphs, dynamic programming, trees, binary search and greedy algorithms",
    icon: "braces",
  },
];

export const codingProfiles = [
  {
    platform: "LeetCode",
    metric: "850+",
    metricLabel: "solved",
    detail: "Knight · 1924 rating",
    href: socials.leetcode as string | undefined,
  },
  {
    platform: "GeeksforGeeks",
    metric: "200+",
    metricLabel: "solved",
    detail: "Core DSA coverage",
    href: undefined as string | undefined,
  },
  {
    platform: "CodeChef",
    metric: "3★",
    metricLabel: "rating",
    detail: "Competitive programming",
    href: undefined as string | undefined,
  },
  {
    platform: "Codeforces",
    metric: "1380",
    metricLabel: "rating",
    detail: "Pupil",
    href: undefined as string | undefined,
  },
];

/** Headline facts for the hero strip. Every figure is on the resume. */
export const quickFacts = [
  { value: "1,050+", label: "DSA problems" },
  { value: "Knight", label: "1924 on LeetCode" },
  { value: "Top 7", label: "of 950+ teams" },
  { value: "2027", label: "Graduating" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Path", href: "#path" },
  { label: "Contact", href: "#contact" },
];
