import { Award, Briefcase } from "lucide-react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timeline } from "@/content/site";

export function ExperienceSection() {
  return (
    <section id="path" className="relative overflow-clip px-5 py-section md:px-10">
      <div className="aura -left-40 top-40 h-120 w-120 bg-indigo/10" aria-hidden />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Path"
          title={
            <>
              Experience <span className="text-gradient">&amp; recognition.</span>
            </>
          }
        />

        <ol className="relative mt-14">
          {/* Rail. Absolutely positioned within this list — never fixed to the
              viewport, so it cannot overlay the rest of the page. */}
          <span
            aria-hidden
            className="absolute bottom-6 left-3.75 top-2 w-px bg-linear-to-b from-hairline-strong via-hairline to-transparent"
          />

          {timeline.map((entry, index) => {
            const Icon = entry.kind === "work" ? Briefcase : Award;

            return (
              <li key={entry.title} className="relative pb-6 pl-12 last:pb-0">
                <Reveal delay={index * 0.08} from="left">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-hairline bg-raised"
                  >
                    <Icon
                      size={13}
                      className={
                        entry.kind === "work" ? "text-indigo" : "text-cyan"
                      }
                    />
                  </span>

                  <GlassPanel interactive className="p-5 md:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="font-sans text-lg font-medium text-ink">
                        {entry.title}
                      </h3>
                      {entry.period && (
                        <span className="label-mono text-cyan">
                          {entry.period}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 font-sans text-sm text-violet">
                      {entry.org}
                    </p>
                  </GlassPanel>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
