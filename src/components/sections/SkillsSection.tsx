import {
  Cloud,
  Code2,
  Database,
  MonitorSmartphone,
  Server,
  type LucideIcon,
} from "lucide-react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { skillGroups, type SkillGroup } from "@/content/site";

const ICONS: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  monitor: MonitorSmartphone,
  server: Server,
  database: Database,
  cloud: Cloud,
};

export function SkillsSection() {
  return (
    <section
      id="stack"
      className="relative overflow-clip border-y border-hairline bg-surface px-5 py-section md:px-10"
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
      <div className="aura -top-20 left-1/2 h-120 w-120 -translate-x-1/2 bg-indigo/10" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Stack"
          title={
            <>
              Tools I reach for,{" "}
              <span className="text-gradient">grouped by job.</span>
            </>
          }
          description="The languages, the interface layer, the services behind it, the data underneath, and what ships it all."
          align="center"
          className="mx-auto items-center text-center"
        />

        {/* Six columns with two-column cards: three per row, and the fourth
            card offset so the final pair centres instead of hanging left. */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, index) => {
            const Icon = ICONS[group.icon];
            return (
              <Reveal
                key={group.category}
                delay={index * 0.06}
                className={cn(
                  "perspective lg:col-span-2",
                  index === 3 && "lg:col-start-2",
                )}
              >
                <Tilt3D intensity={7} lift={14} className="h-full rounded-2xl">
                  <GlassPanel
                    interactive
                    className="group relative h-full overflow-hidden p-6"
                  >
                    {/* Accent bloom that wakes up on hover */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo/20 opacity-0 blur-[70px] transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div className="relative">
                      <div className="flex items-center gap-3">
                        {/* Pushed toward the viewer inside the tilt. */}
                        <span
                          className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white/4"
                          style={{ transform: "translateZ(28px)" }}
                        >
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
                            className="rounded-lg border border-hairline bg-white/3 px-2.5 py-1.5 font-mono text-[11px] text-ink-muted transition-colors duration-300 group-hover:border-hairline-strong"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassPanel>
                </Tilt3D>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
