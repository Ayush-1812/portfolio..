import { GithubIcon, LeetcodeIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile, socials } from "@/content/site";

const LINKS = [
  { label: "GitHub", href: socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: socials.linkedin, Icon: LinkedinIcon },
  { label: "LeetCode", href: socials.leetcode, Icon: LeetcodeIcon },
];

export function Footer() {
  return (
    <footer className="relative border-t border-hairline bg-void">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-14 lg:pl-28 2xl:pl-6 md:flex-row md:justify-between md:py-16">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-sans text-2xl font-bold tracking-tighter text-ink">
            {profile.shortName}
            <span className="text-cyan">.</span>
          </span>
          <p className="label-mono text-ink-faint">
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>

        <nav aria-label="Elsewhere" className="flex items-center gap-2">
          {LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${label} profile`}
              className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-ink-muted transition-colors duration-300 hover:border-hairline-strong hover:text-ink"
            >
              <Icon size={18} />
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-center gap-1 md:items-end">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs lowercase text-ink-muted transition-colors hover:text-ink"
          >
            {profile.email}
          </a>
          <a
            href={profile.phoneHref}
            className="font-mono text-xs text-ink-faint transition-colors hover:text-ink"
          >
            {profile.phone}
          </a>
        </div>
      </div>
    </footer>
  );
}
