import {
  BrainCircuit,
  Cloud,
  Code2,
  MonitorSmartphone,
  Server,
  Terminal,
  type LucideIcon,
} from "lucide-react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { codingProfiles, skillGroups, type SkillGroup } from "@/content/site";

const ICONS: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  monitor: MonitorSmartphone,
  server: Server,
  brain: BrainCircuit,
  cloud: Cloud,
  terminal: Terminal,
};

export function SkillsSection() {
  return (
    <section
      id="stack"
      className="relative overflow-hidden border-y border-hairline bg-surface px-5 py-section md:px-10"
    >
      {/* Faint technical grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Stack"
          title={
            <>
              Tools I reach for, <span className="text-gradient">grouped by job.</span>
            </>
          }
          description="Grouped the way I actually use them — the languages, the interface layer, the services behind it, and the infrastructure underneath."
          align="center"
          className="mx-auto items-center text-center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = ICONS[group.icon];
            return (
              <Reveal
                key={group.category}
                delay={index * 0.06}
                className="perspective"
              >
                <Tilt3D intensity={6} lift={12} className="h-full rounded-2xl">
                  <GlassPanel interactive className="h-full p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white/4">
                        <Icon size={17} className="text-indigo" />
                      </span>
                      <h3 className="font-sans text-base font-medium text-ink">
                        {group.category}
                      </h3>
                    </div>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg border border-hairline bg-white/3 px-2.5 py-1.5 font-mono text-[11px] text-ink-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlassPanel>
                </Tilt3D>
              </Reveal>
            );
          })}
        </div>

        {/* ---- Competitive programming: real figures from the resume ---- */}
        <Reveal delay={0.1} className="mt-16">
          <p className="label-mono mb-5 text-center text-ink-faint">
            Problem solving
          </p>

          <div className="grid gap-5 md:grid-cols-3">
            {codingProfiles.map((item) => {
              const body = (
                <GlassPanel
                  interactive={Boolean(item.href)}
                  className="flex h-full items-center justify-between gap-5 p-6"
                >
                  <div>
                    <p className="label-mono text-ink-faint">{item.platform}</p>
                    <p className="mt-3 font-sans text-3xl font-semibold tracking-tight text-ink">
                      {item.metric}
                    </p>
                    <p className="mt-1 font-sans text-xs text-ink-muted">
                      {item.metricLabel}
                    </p>
                  </div>
                  <p className="max-w-36 text-right font-mono text-[11px] leading-relaxed text-ink-faint">
                    {item.detail}
                  </p>
                </GlassPanel>
              );

              return item.href ? (
                <a
                  key={item.platform}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block rounded-2xl"
                >
                  {body}
                </a>
              ) : (
                <div key={item.platform}>{body}</div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
