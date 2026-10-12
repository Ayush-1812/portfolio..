import { cn } from "@/lib/utils";

import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  /** Small mono eyebrow above the title. */
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

/**
 * The one heading treatment used by every section, so type scale and rhythm
 * stay identical down the page.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="label-mono flex items-center gap-3 text-cyan">
          <span className="h-px w-8 bg-cyan/40" aria-hidden />
          {eyebrow}
        </span>
      )}

      <h2 className="text-balance font-sans text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-ink md:text-5xl lg:text-[3.5rem]">
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "max-w-xl text-pretty font-sans text-base font-light leading-relaxed text-ink-muted",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
