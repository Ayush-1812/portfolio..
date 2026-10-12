import { ArrowUpRight, Check, Users } from "lucide-react";

import { GithubIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { projects, socials, type Project } from "@/content/site";
import { cn } from "@/lib/utils";

/* Full class strings — Tailwind cannot see dynamically assembled names. */
const ACCENT: Record<
  Project["accent"],
  { text: string; chip: string; glow: string; rule: string }
> = {
  indigo: {
    text: "text-indigo",
    chip: "border-indigo/25 bg-indigo/10 text-violet",
    glow: "bg-indigo/20",
    rule: "bg-indigo/40",
  },
  cyan: {
    text: "text-cyan",
    chip: "border-cyan/25 bg-cyan/10 text-cyan",
    glow: "bg-cyan/20",
    rule: "bg-cyan/40",
  },
  violet: {
    text: "text-violet",
    chip: "border-violet/25 bg-violet/10 text-violet",
    glow: "bg-violet/20",
    rule: "bg-violet/40",
  },
  sand: {
    text: "text-sand",
    chip: "border-sand/25 bg-sand/10 text-sand",
    glow: "bg-sand/15",
    rule: "bg-sand/40",
  },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const accent = ACCENT[project.accent];

  return (
    <Reveal delay={0.04} className="perspective">
      <Tilt3D intensity={4} lift={10} className="rounded-[1.75rem]">
        <article className="glass group relative overflow-hidden rounded-[1.75rem] transition-colors duration-500 hover:border-hairline-strong">
          {/* Accent bloom, strengthens on hover */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-[90px] transition-opacity duration-700 group-hover:opacity-100",
              accent.glow,
            )}
          />

          <div className="relative grid gap-8 p-6 md:p-9 lg:grid-cols-12 lg:gap-10">
            {/* ---- Left: identity + summary ---- */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="label-mono text-ink-ghost">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={cn("h-px w-6", accent.rule)} aria-hidden />
                <span className="label-mono text-ink-faint">
                  {project.live ? "Live" : "Source only"}
                </span>
              </div>

              <h3 className="mt-5 font-sans text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                {project.title}
              </h3>
              <p className={cn("label-mono mt-2.5", accent.text)}>
                {project.tagline}
              </p>

              <p className="mt-5 text-pretty font-sans text-sm font-light leading-relaxed text-ink-muted">
                {project.summary}
              </p>

              {project.note && (
                <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-hairline bg-white/3 px-3 py-2 font-mono text-[11px] text-ink-faint">
                  <Users size={12} />
                  {project.note}
                </p>
              )}

              {/* Links */}
              <div className="mt-7 flex flex-wrap items-center gap-2.5">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-void transition-colors hover:bg-white"
                  >
                    Live demo
                    <ArrowUpRight size={14} />
                  </a>
                )}
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-hairline px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:border-hairline-strong hover:text-ink"
                >
                  <GithubIcon size={14} />
                  Source
                </a>
              </div>
            </div>

            {/* ---- Right: what it actually does ---- */}
            <div className="lg:col-span-7">
              <p className="label-mono text-ink-faint">What it does</p>

              <ul className="mt-4 space-y-2.5">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <Check
                      size={14}
                      className={cn("mt-1 shrink-0", accent.text)}
                      aria-hidden
                    />
                    <span className="text-pretty font-sans text-sm font-light leading-relaxed text-ink-muted">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              <ul className="mt-7 flex flex-wrap gap-2 border-t border-hairline pt-6">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className={cn(
                      "rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
                      accent.chip,
                    )}
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Tilt3D>
    </Reveal>
  );
}

export function ProjectsSection() {
  return (
    <section id="work" className="relative px-5 py-section md:px-10">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title={
              <>
                Four systems, <span className="text-gradient">built end to end.</span>
              </>
            }
            description="Each one owns its own backend and data model — not a frontend sitting on someone else's API."
          />

          <Reveal delay={0.1}>
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer noopener"
              className="label-mono inline-flex items-center gap-2 text-ink-muted transition-colors hover:text-ink"
            >
              All repositories
              <ArrowUpRight size={13} />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
