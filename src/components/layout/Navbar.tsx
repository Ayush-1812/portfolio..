"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { navLinks, profile } from "@/content/site";
import { cn } from "@/lib/utils";

/** Tracks which section currently occupies the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    /* The hero is not a nav target, so without this the last section to
       intersect stays highlighted after scrolling back to the top. */
    const clearAtTop = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive("");
    };
    window.addEventListener("scroll", clearAtTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearAtTop);
    };
  }, [ids]);

  return active;
}

const SECTION_IDS = navLinks.map((link) => link.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock the page behind the mobile menu, and let Escape close it. */
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "js-reveal fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled
            ? "border-b border-hairline bg-void/70 backdrop-blur-2xl"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
          <a
            href="#top"
            className="font-sans text-xl font-bold tracking-tighter text-ink"
          >
            {profile.shortName}
            <span className="text-cyan">.</span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 md:flex"
          >
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "label-mono relative rounded-full px-4 py-2.5 transition-colors duration-300",
                    isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border border-hairline bg-white/5"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-hairline bg-white/3 px-3 py-1.5 lg:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              <span className="label-mono text-ink-muted">Available</span>
            </span>

            <Button
              href={profile.resumePath}
              download={profile.resumeFileName}
              variant="glass"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Resume
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-ink md:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl md:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex h-full flex-col items-center justify-center gap-2 px-8"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.4 }}
                  className="py-3 font-sans text-3xl font-semibold tracking-tight text-ink"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-8"
              >
                <Button
                  href={profile.resumePath}
                  download={profile.resumeFileName}
                  variant="glass"
                >
                  Download Resume
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
