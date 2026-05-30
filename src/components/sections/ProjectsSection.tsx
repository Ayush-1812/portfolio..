"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "../ui/GlassPanel";
import { ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.5 1-5-2.5-5-2.5"/></svg>
);

const projectsData = [
  {
    title: "Wealthwise",
    subtitle: "AI Finance Platform",
    description:
      "Built AI-driven financial insights & predictions for user spending and savings. Developed an interactive React dashboard with real-time data visualizations.",
    tech: ["React 19", "Next.js 15", "Tailwind CSS", "Supabase", "Prisma"],
    github: "#",
    live: "#",
  },
  {
    title: "MediCare",
    subtitle: "Bringing healthcare to rural areas",
    description:
      "Full-stack healthcare web app for booking appointments and managing records. Implemented real-time video consultation with AI-powered prescription scanning.",
    tech: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL"],
    github: "#",
    live: "#",
  },
  {
    title: "VersionVista",
    subtitle: "Visualizing GitHub code evolution",
    description:
      "Interactive commit timeline with repository evolution playback. Features a visual dashboard with a commit tree, file explorer, and code viewer.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Simple-Git"],
    github: "#",
    live: "#",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-32 px-6 relative">
      {/* Background mesh */}
      <div
        className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header row */}
        <div className="flex justify-between items-end mb-16">
          <h2
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
            style={{ color: "#e1e2e7", letterSpacing: "-0.02em" }}
          >
            Featured Labs
          </h2>
          <a
            href="https://github.com/ayushcarpenter"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase transition-colors"
            style={{ color: "#908f9e", letterSpacing: "0.2em" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#bdc2ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#908f9e")}
          >
            Explore All <ExternalLink size={12} />
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <GlassPanel
                interactive
                className="h-full flex flex-col group"
              >
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full font-mono text-[9px] uppercase"
                      style={{
                        color: "#bdc2ff",
                        letterSpacing: "0.15em",
                        background: "rgba(129,140,248,0.08)",
                        border: "1px solid rgba(129,140,248,0.15)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Title & Description */}
                <h3
                  className="font-sans text-xl font-medium mb-1 transition-colors duration-300 group-hover:text-[#7bd0ff]"
                  style={{ color: "#e1e2e7" }}
                >
                  {project.title}
                </h3>
                <p
                  className="font-mono text-[10px] uppercase mb-4"
                  style={{ color: "#908f9e", letterSpacing: "0.15em" }}
                >
                  {project.subtitle}
                </p>
                <p
                  className="font-sans text-sm leading-relaxed mb-6 flex-grow"
                  style={{ color: "#c6c5d5" }}
                >
                  {project.description}
                </p>

                {/* Links */}
                <div
                  className="flex items-center gap-4 pt-4"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <a
                    href={project.github}
                    className="transition-colors"
                    style={{ color: "#908f9e" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#bdc2ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#908f9e")
                    }
                  >
                    <GithubIcon size={18} />
                  </a>
                  <a
                    href={project.live}
                    className="transition-colors"
                    style={{ color: "#908f9e" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#7bd0ff")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#908f9e")
                    }
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Developer Velocity Section */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            <div>
              <h3
                className="font-sans text-3xl md:text-4xl font-semibold tracking-tight"
                style={{ color: "#e1e2e7", letterSpacing: "-0.02em" }}
              >
                Developer Velocity
              </h3>
              <p
                className="font-sans text-sm mt-2"
                style={{ color: "#908f9e" }}
              >
                Total daily open-source contributions and commit history.
              </p>
            </div>
            <div className="flex items-center gap-10">
              <div className="text-right">
                <p
                  className="font-sans text-4xl font-semibold"
                  style={{ color: "#e1e2e7" }}
                >
                  850+
                </p>
                <p
                  className="font-mono text-[10px] uppercase"
                  style={{ color: "#908f9e", letterSpacing: "0.2em" }}
                >
                  Commits
                </p>
              </div>
              <div className="text-right">
                <p
                  className="font-sans text-4xl font-semibold"
                  style={{ color: "#e1e2e7" }}
                >
                  42
                </p>
                <p
                  className="font-mono text-[10px] uppercase"
                  style={{ color: "#908f9e", letterSpacing: "0.2em" }}
                >
                  Repos
                </p>
              </div>
            </div>
          </div>

          {/* Commit graph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassPanel className="p-6 overflow-hidden">
              <div className="flex gap-[3px] justify-center flex-wrap">
                {Array.from({ length: 52 * 7 }).map((_, i) => {
                  // Deterministic pseudo-random based on index to prevent hydration mismatch
                  const intensity = (Math.sin(i * 12.9898) * 43758.5453) - Math.floor(Math.sin(i * 12.9898) * 43758.5453);
                  let bg = "rgba(255,255,255,0.03)";
                  if (intensity > 0.85)
                    bg = "#818cf8";
                  else if (intensity > 0.7)
                    bg = "rgba(129,140,248,0.6)";
                  else if (intensity > 0.5)
                    bg = "rgba(129,140,248,0.3)";
                  else if (intensity > 0.3)
                    bg = "rgba(129,140,248,0.12)";

                  return (
                    <div
                      key={i}
                      className="w-[10px] h-[10px] rounded-[2px]"
                      style={{ background: bg }}
                    />
                  );
                })}
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
