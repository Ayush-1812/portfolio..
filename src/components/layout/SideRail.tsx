"use client";

import { motion } from "framer-motion";
import { FileDown, Mail } from "lucide-react";

import { GithubIcon, LeetcodeIcon, LinkedinIcon } from "@/components/ui/Icons";
import { profile, socials } from "@/content/site";

const RAIL = [
  { label: "GitHub profile", href: socials.github, Icon: GithubIcon, external: true },
  { label: "LinkedIn profile", href: socials.linkedin, Icon: LinkedinIcon, external: true },
  { label: "LeetCode profile", href: socials.leetcode, Icon: LeetcodeIcon, external: true },
];

/**
 * Fixed social rail. Hidden below `lg` — the same links live in the footer,
 * so nothing is only reachable here.
 */
export function SideRail() {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Social links"
      className="js-reveal glass fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1 rounded-full p-2 lg:flex"
    >
      {RAIL.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          className="grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors duration-300 hover:bg-white/5 hover:text-ink"
        >
          <Icon size={18} />
        </a>
      ))}

      <a
        href={`mailto:${profile.email}`}
        aria-label="Email Ayush"
        className="grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors duration-300 hover:bg-white/5 hover:text-ink"
      >
        <Mail size={18} strokeWidth={1.75} />
      </a>

      <span className="mx-auto my-1 h-px w-5 bg-hairline-strong" aria-hidden />

      <a
        href={profile.resumePath}
        download={profile.resumeFileName}
        aria-label="Download resume (PDF)"
        className="grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors duration-300 hover:bg-white/5 hover:text-indigo"
      >
        <FileDown size={18} strokeWidth={1.75} />
      </a>
    </motion.aside>
  );
}
