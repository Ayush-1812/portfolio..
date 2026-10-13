import { GraduationCap, MapPin } from "lucide-react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { coursework, education, profile } from "@/content/site";

export function AboutSection() {
  return (
    // overflow-clip, not hidden: it contains the decorative aura below
    // without turning the section into a scroll container.
    <section id="about" className="relative overflow-clip px-5 py-section md:px-10 lg:pl-28 2xl:pl-10">
      <div className="aura -right-40 top-20 h-120 w-120 bg-violet/10" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Narrative */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="About"
              title={
                <>
                  I build the whole stack —{" "}
                  <span className="text-gradient">and the parts underneath.</span>
                </>
              }
            />

            <div className="mt-8 space-y-5">
              <Reveal delay={0.05}>
                <p className="text-pretty font-sans text-lg font-light leading-relaxed text-ink-muted">
                  I&apos;m a Computer Science undergraduate at IIIT Kota, due to
                  graduate in 2027. Most of what I build lives in the gap
                  between a clean interface and the systems work that makes it
                  trustworthy — a Go rules engine that refuses an illegal move,
                  WebRTC signaling that survives horizontal scaling, a ledger
                  that nets debts correctly across ten tables.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-pretty font-sans text-lg font-light leading-relaxed text-ink-muted">
                  I keep my fundamentals sharp competitively: 1,050+ problems
                  solved across LeetCode and GeeksforGeeks, LeetCode Knight at a
                  1924 rating, and a top-500 finish among 32,000+ participants
                  in a Biweekly Contest.
                </p>
              </Reveal>
            </div>

            {/* Coursework */}
            <Reveal delay={0.18} className="mt-10">
              <p className="label-mono text-ink-faint">Relevant coursework</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {coursework.map((course) => (
                  <li
                    key={course}
                    className="rounded-full border border-hairline bg-white/3 px-3 py-1.5 font-mono text-[11px] text-ink-muted transition-colors hover:border-hairline-strong hover:text-ink"
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Education */}
          <div className="lg:col-span-5">
            <Reveal from="right">
              <p className="label-mono mb-5 flex items-center gap-3 text-cyan">
                <GraduationCap size={14} />
                Education
              </p>
            </Reveal>

            <Reveal from="right" delay={0.08} className="perspective">
              <Tilt3D intensity={7} lift={14} className="rounded-2xl">
                <GlassPanel className="relative overflow-hidden p-6 md:p-7">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo/20 blur-[80px]"
                  />

                  <div className="relative">
                    <h3 className="font-sans text-xl font-medium leading-snug text-ink">
                      {education.institute}
                    </h3>

                    <p className="mt-3 font-sans text-sm text-ink-muted">
                      {education.degree}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-2.5">
                      <span className="rounded-full border border-indigo/25 bg-indigo/10 px-3 py-1.5 font-mono text-xs text-violet">
                        {education.score}
                      </span>
                      <span className="rounded-full border border-hairline px-3 py-1.5 font-mono text-xs text-ink-muted">
                        {education.period}
                      </span>
                    </div>

                    <p className="label-mono mt-6 flex items-center gap-2 text-ink-faint">
                      <MapPin size={12} />
                      {education.location}
                    </p>
                  </div>
                </GlassPanel>
              </Tilt3D>
            </Reveal>

            <Reveal from="right" delay={0.16} className="mt-4">
              <GlassPanel className="p-6">
                <p className="label-mono text-ink-faint">Based in</p>
                <p className="mt-2 font-sans text-sm text-ink">
                  {profile.location}
                </p>
              </GlassPanel>
            </Reveal>
          </div>
        </div>
      </div>

      {/* 3D technology band */}
      <Reveal delay={0.1} className="mt-20">
        <TechMarquee />
      </Reveal>
    </section>
  );
}
