import { GraduationCap } from "lucide-react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coursework, education } from "@/content/site";

export function AboutSection() {
  return (
    // overflow-clip, not hidden: it contains the decorative aura below
    // without turning the section into a scroll container.
    <section id="about" className="relative overflow-clip px-5 py-section md:px-10">
      <div className="aura -right-40 top-20 h-120 w-120 bg-violet/10" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Narrative */}
          <div className="lg:col-span-6">
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
                  I&apos;m a Computer Science undergraduate at IIIT Kota. Most of
                  what I build lives in the gap between a clean interface and the
                  systems work that makes it trustworthy — a Go API that refuses
                  an illegal move, a booking transaction that cannot double-sell
                  a slot, an assistant that answers from real records instead of
                  guessing.
                </p>
              </Reveal>

              <Reveal delay={0.12}>
                <p className="text-pretty font-sans text-lg font-light leading-relaxed text-ink-muted">
                  Alongside coursework I keep my fundamentals sharp
                  competitively: 550+ problems solved on LeetCode at a 1928
                  Knight rating, 250+ on GeeksforGeeks, and a 3-star rating on
                  CodeChef.
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
                    className="rounded-full border border-hairline bg-white/3 px-3 py-1.5 font-mono text-[11px] text-ink-muted"
                  >
                    {course}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Education */}
          <div className="lg:col-span-6">
            <Reveal from="right">
              <p className="label-mono mb-5 flex items-center gap-3 text-cyan">
                <GraduationCap size={14} />
                Education
              </p>
            </Reveal>

            <ol className="space-y-4">
              {education.map((entry, index) => (
                <Reveal key={entry.degree} from="right" delay={index * 0.08}>
                  <GlassPanel
                    interactive
                    className="flex items-start justify-between gap-6 p-5 md:p-6"
                  >
                    <div className="min-w-0">
                      <h3 className="font-sans text-base font-medium text-ink">
                        {entry.degree}
                      </h3>
                      <p className="mt-1 text-sm text-ink-muted">
                        {entry.institute}
                      </p>
                      <p className="label-mono mt-3 text-ink-faint">
                        {entry.year}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-indigo/25 bg-indigo/10 px-3 py-1.5 font-mono text-xs text-violet">
                      {entry.score}
                    </span>
                  </GlassPanel>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
