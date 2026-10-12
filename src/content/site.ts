/**
 * Single source of truth for every piece of content on this site.
 *
 * Provenance rule: everything here comes from either
 *   (a) public/Ayush_Carpenter_ResumeSDE.pdf, or
 *   (b) the linked repository's own README.
 * Nothing is estimated, rounded or inferred. If a fact is not in one of those
 * two places it does not belong in this file.
 */

export const profile = {
  name: "Ayush Carpenter",
  shortName: "AJ",
  role: "Software Engineer",
  discipline: "MERN Stack & Next.js Developer",
  email: "ayushcarpenter181204@gmail.com",
  phone: "+91 95875 67453",
  phoneHref: "tel:+919587567453",
  location: "India — Remote / Open to Relocation",
  resumePath: "/Ayush_Carpenter_ResumeSDE.pdf",
  resumeFileName: "Ayush_Carpenter_Resume.pdf",
  siteUrl: "https://ayushcarpenter.vercel.app",
} as const;

export const socials = {
  github: "https://github.com/Ayush-1812",
  linkedin: "https://www.linkedin.com/in/ayush-carpenter-b1785237b/",
  leetcode: "https://leetcode.com/u/Ayush__2004/",
} as const;

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  /** Drawn from each repository's own README. */
  highlights: string[];
  stack: string[];
  repo: string;
  live?: string;
  /** Shown as a note when the repository is not solely the owner's. */
  note?: string;
  year: string;
  accent: "indigo" | "cyan" | "violet" | "sand";
};

export const projects: Project[] = [
  {
    slug: "medicare",
    title: "MediCare",
    tagline: "Bringing healthcare to rural areas",
    summary:
      "A full-stack healthcare platform where patients book doctors, consult over video and keep their medical records in one place. The largest system here by surface area — realtime video, OCR, payments and an AI assistant grounded in actual patient records.",
    highlights: [
      "Peer-to-peer WebRTC video consultation with screen share and fullscreen, gated by appointment-based access",
      "Role-based auth for patient, doctor and admin using JWT sessions in httpOnly cookies",
      "Slot-conflict-free booking — the reservation runs inside a database transaction",
      "Prescription OCR with Tesseract.js, fuzzy-matched against a medicine list",
      "Aether AI: a Gemini assistant with intent routing, tool-based retrieval over real records and conversation memory",
      "Razorpay checkout verified server-side with HMAC-SHA256 signatures",
      "Geolocation pharmacy search via SerpAPI, sorted by distance",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "WebRTC",
      "PostgreSQL",
      "Prisma",
      "Socket.IO",
      "Redis",
      "Gemini API",
      "Tesseract.js",
      "Razorpay",
      "Docker",
    ],
    repo: "https://github.com/Ayush-1812/MediCare",
    live: "https://medi-care-2vbm.vercel.app/",
    year: "2026",
    accent: "cyan",
  },
  {
    slug: "cardplay",
    title: "CardPlay",
    tagline: "A private card table for friends",
    summary:
      "Built for live play and reliable reconnection. A Go API owns the rules so the client cannot cheat, and every match is written to PostgreSQL before a move is acknowledged — drop your connection mid-hand and the table is exactly where you left it.",
    highlights: [
      "Server-authoritative rules engine — the Go API validates every move",
      "Matches persisted to PostgreSQL before a move is acknowledged, making reconnection lossless",
      "Realtime transport over WebSockets with PostgreSQL LISTEN/NOTIFY for fan-out",
      "Private rooms joinable as a guest or with a verified account",
      "Monopoly Deal and Trump playable today; Cambio scaffolded, not yet playable",
      "Covered end-to-end by Go tests and Playwright, wired into GitHub Actions",
    ],
    stack: [
      "Go 1.27",
      "chi v5",
      "WebSockets",
      "PostgreSQL 18",
      "sqlc",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Docker Compose",
      "Playwright",
      "Caddy 2",
    ],
    repo: "https://github.com/Ayush-1812/CardPlay",
    year: "2026",
    accent: "sand",
  },
  {
    slug: "wealthwise",
    title: "WealthWise",
    tagline: "AI-powered personal finance",
    summary:
      "A full-stack platform for tracking income, expenses, budgets and financial goals — with Gemini reading your receipts and turning raw transaction history into recommendations you can act on.",
    highlights: [
      "AI-generated financial insights and recommendations over real spending history",
      "Receipt scanning powered by Gemini vision",
      "Interactive dashboard with visual spending analytics and reports",
      "Automated recurring transactions and budget alerts via Inngest",
      "Monthly financial summaries with automatic account balance calculation",
      "Authentication handled by Clerk over a Supabase-hosted PostgreSQL database",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Clerk",
      "Inngest",
      "Gemini API",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    repo: "https://github.com/Ayush-1812/WelthWise",
    live: "https://welth-wise-nwr1-git-main-ayush-carpenters-projects.vercel.app/",
    year: "2026",
    accent: "indigo",
  },
  {
    slug: "versionvista",
    title: "VersionVista",
    tagline: "Visualizing GitHub code evolution",
    summary:
      "A high-density, timeline-driven Git visualization tool. Scrub a slider across a repository's history and watch the file tree, diffs and commit graph reassemble themselves at that point in time.",
    highlights: [
      "Interactive commit timeline you can scrub, play and pause through history",
      "Historical file tree reflecting the repository's exact state at the selected commit",
      "Line-by-line syntax-highlighted inline diff viewer",
      "Local repository indexing — clones and snapshots repositories with simple-git",
    ],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "simple-git",
      "Zustand",
      "TanStack Query",
      "Tailwind CSS",
    ],
    repo: "https://github.com/prayag0one4/VersionVista",
    live: "https://versionvista.iamprayag.space",
    note: "Collaborative project — repository hosted on a teammate's account",
    year: "2025",
    accent: "violet",
  },
];

/* ------------------------------------------------------------------ */
/* Skills — resume groupings. The resume carries no proficiency scores, */
/* so none are shown.                                                   */
/* ------------------------------------------------------------------ */

export type SkillGroup = {
  category: string;
  icon: "code" | "server" | "brain" | "cloud" | "terminal" | "monitor";
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: "code",
    items: ["C/C++", "Python", "JavaScript", "SQL", "Java"],
  },
  {
    category: "Frontend",
    icon: "monitor",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend & Databases",
    icon: "server",
    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "FastAPI"],
  },
  {
    category: "AI / ML & GenAI",
    icon: "brain",
    items: ["LLMs", "RAG", "Agentic AI", "OCR / NLP Workflows"],
  },
  {
    category: "Cloud & DevOps",
    icon: "cloud",
    items: ["AWS", "Docker", "DevOps"],
  },
  {
    category: "Tools & Version Control",
    icon: "terminal",
    items: ["VS Code", "Git", "GitHub", "Linux", "Windows"],
  },
];

/* ------------------------------------------------------------------ */
/* Experience, achievements, education                                 */
/* ------------------------------------------------------------------ */

export type TimelineEntry = {
  title: string;
  org: string;
  period?: string;
  kind: "work" | "achievement";
};

export const timeline: TimelineEntry[] = [
  {
    title: "Frontend Developer Intern",
    org: "Gyanama",
    period: "Feb 2023 – Jul 2023",
    kind: "work",
  },
  {
    title: "Top 50 of 950+ teams",
    org: "Oddo Hackathon — IIT Gandhinagar",
    kind: "achievement",
  },
  {
    title: "State-level recognition",
    org: "Badminton",
    kind: "achievement",
  },
];

export const education = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    institute: "Indian Institute of Information Technology, Kota",
    score: "7.80 GPA",
    year: "2023 – Present",
  },
  {
    degree: "Senior Secondary",
    institute: "St. John's School, Jhalrapatan",
    score: "92.4%",
    year: "2022",
  },
  {
    degree: "Secondary",
    institute: "St. John's School, Jhalrapatan",
    score: "87%",
    year: "2020",
  },
];

/** Replaces the previous synthetic contribution graph. Every figure is on the resume. */
export const codingProfiles = [
  {
    platform: "LeetCode",
    metric: "550+",
    metricLabel: "problems solved",
    detail: "Knight Badge · 1928 rating",
    href: socials.leetcode as string | undefined,
  },
  {
    platform: "GeeksforGeeks",
    metric: "250+",
    metricLabel: "problems solved",
    detail: "Core DSA & competitive programming",
    href: undefined as string | undefined,
  },
  {
    platform: "CodeChef",
    metric: "3★",
    metricLabel: "rating",
    detail: "Competitive programming",
    href: undefined as string | undefined,
  },
];

export const coursework = [
  "Data Structures",
  "Algorithms Analysis",
  "Database Management",
  "Operating Systems",
  "Object Oriented Programming",
  "Artificial Intelligence",
  "Computer Architecture",
  "Software Methodology",
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Stack", href: "#stack" },
  { label: "Path", href: "#path" },
  { label: "Contact", href: "#contact" },
];
