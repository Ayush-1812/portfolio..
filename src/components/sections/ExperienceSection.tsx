import {
  Braces,
  Briefcase,
  MapPin,
  Trophy,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { CountUp } from "@/components/ui/CountUp";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import {
  achievements,
  codingProfiles,
  experience,
  type Achievement,
} from "@/content/site";

const ACHIEVEMENT_ICONS: Record<Achievement["icon"], LucideIcon> = {
  trophy: Trophy,
  zap: Zap,
  braces: Braces,
};

export function ExperienceSection() {
  return (
    <section id="path" className="relative overflow-clip px-5 py-section md:px-10">
      <div className="aura -left-40 top-40 h-120 w-120 bg-indigo/10" aria-hidden />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Path"
          title={
            <>
              Experience <span className="text-gradient">&amp; recognition.</span>
            </>
          }
        />

        {/* ---- Employment ---- */}
        <ol className="relative mt-14">
          {/* Absolutely positioned inside this list, never fixed to the
              viewport, so it cannot overlay the rest of the page. */}
          <span
            aria-hidden
            className="absolute bottom-6 left-3.75 top-2 w-px bg-linear-to-b from-hairline-strong via-hairline to-transparent"
          />

          {experience.map((role, index) => (
            <li key={role.company} className="relative pb-6 pl-12 last:pb-0">
              <Reveal delay={index * 0.08} from="left">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-hairline bg-raised"
                >
                  <Briefcase size={13} className="text-indigo" />
                </span>

                <GlassPanel className="p-6 md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="font-sans text-xl font-medium text-ink">
                      {role.company}
                    </h3>
                    <span className="label-mono text-cyan">{role.period}</span>
                  </div>

                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-sm text-violet">
                    {role.title}
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-faint">
                      <MapPin size={11} />
                      {role.location}
                    </span>
                  </p>

                  <ul className="mt-5 space-y-3">
                    {role.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo"
                        />
                        <span className="text-pretty font-sans text-sm font-light leading-relaxed text-ink-muted">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </GlassPanel>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* ---- Achievements ---- */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {achievements.map((item, index) => {
            const Icon = ACHIEVEMENT_ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={index * 0.07} className="perspective">
                <Tilt3D intensity={7} lift={12} className="h-full rounded-2xl">
                  <GlassPanel interactive className="h-full p-6">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-hairline bg-white/4">
                      <Icon size={16} className="text-cyan" />
                    </span>
                    <h3 className="mt-5 font-sans text-lg font-medium text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-pretty font-sans text-sm font-light leading-relaxed text-ink-muted">
                      {item.detail}
                    </p>
                  </GlassPanel>
                </Tilt3D>
              </Reveal>
            );
          })}
        </div>

        {/* ---- Competitive programming profiles ---- */}
        <Reveal delay={0.1} className="mt-6">
          <GlassPanel className="p-6 md:p-8">
            <p className="label-mono text-ink-faint">Problem solving</p>

            <dl className="mt-6 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {codingProfiles.map((item) => {
                const body = (
                  <>
                    <dt className="label-mono text-ink-faint">{item.platform}</dt>
                    <dd>
                      <CountUp
                        value={item.metric}
                        className="mt-3 block font-sans text-3xl font-semibold tracking-tight text-ink"
                      />
                      <span className="mt-1 block font-sans text-xs text-ink-muted">
                        {item.metricLabel}
                      </span>
                      <span className="mt-2 block font-mono text-[11px] text-ink-faint">
                        {item.detail}
                      </span>
                    </dd>
                  </>
                );

                return item.href ? (
                  <a
                    key={item.platform}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-xl transition-opacity hover:opacity-80"
                  >
                    {body}
                  </a>
                ) : (
                  <div key={item.platform}>{body}</div>
                );
              })}
            </dl>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
