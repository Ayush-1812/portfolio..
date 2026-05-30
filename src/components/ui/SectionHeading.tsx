import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({ title, subtitle, className, centered = false }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4 mb-16", centered && "items-center text-center", className)}>
      <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-muted-foreground opacity-70">
          {subtitle}
        </p>
      )}
    </div>
  );
}
