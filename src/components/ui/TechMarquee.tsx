import { skillGroups } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Two counter-scrolling rows of technologies, tilted back in 3D.
 *
 * Driven entirely by a CSS keyframe on a duplicated track, so it costs no
 * JavaScript and no layout work — the compositor animates a transform. The
 * duplicate copy is what makes the loop seamless, and is hidden from
 * assistive tech so the list is not announced twice.
 */
function Row({
  items,
  reverse = false,
  duration,
}: {
  items: string[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="mask-x flex overflow-hidden">
      <ul
        className={cn(
          "flex shrink-0 items-center gap-3 pr-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ animationDuration: duration }}
      >
        {items.map((item) => (
          <li
            key={item}
            className="whitespace-nowrap rounded-full border border-hairline bg-glass px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted backdrop-blur-sm"
          >
            {item}
          </li>
        ))}
      </ul>
      <ul
        aria-hidden
        className={cn(
          "flex shrink-0 items-center gap-3 pr-3",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
        style={{ animationDuration: duration }}
      >
        {items.map((item) => (
          <li
            key={item}
            className="whitespace-nowrap rounded-full border border-hairline bg-glass px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted backdrop-blur-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TechMarquee() {
  const all = skillGroups.flatMap((group) => group.items);
  const half = Math.ceil(all.length / 2);

  return (
    <div
      className="perspective relative select-none py-10"
      aria-label="Technologies I work with"
    >
      <div
        className="flex flex-col gap-3"
        style={{ transform: "rotateX(22deg) rotateZ(-1.5deg)" }}
      >
        <Row items={all.slice(0, half)} duration="56s" />
        <Row items={all.slice(half)} reverse duration="48s" />
      </div>
    </div>
  );
}
