"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { HeroVisual } from "@/components/ui/HeroVisual";
import { Magnetic } from "@/components/ui/Magnetic";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { profile, quickFacts, socials } from "@/content/site";

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden px-5 pb-20 pt-28 md:px-10 md:pt-32"
    >
      {/* Ambient wash — stays visible whether or not WebGL loads. */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="aura -left-40 -top-40 h-168 w-168 bg-indigo/20" />
        <div className="aura -bottom-52 -right-32 h-136 w-136 bg-cyan/15" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* ---------------- Copy ---------------- */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.09, delayChildren: 0.1 }}
          className="js-reveal lg:col-span-7"
        >
          <motion.span
            variants={rise}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/3 px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
            </span>
            <span className="label-mono text-ink-muted">Open to SDE roles</span>
          </motion.span>

          <motion.h1
            variants={rise}
            transition={{ duration: 0.8, ease: EASE }}
            className="mt-7 font-sans text-[clamp(3rem,10vw,7rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-ink"
          >
            Ayush
            <br />
            <span className="text-gradient">Carpenter.</span>
          </motion.h1>

          <motion.p
            variants={rise}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-7 max-w-xl text-pretty font-sans text-lg font-light leading-relaxed text-ink-muted"
          >
            {profile.role} · {profile.discipline}. I build full-stack systems
            end to end — peer-to-peer video consultation, authoritative game
            servers in Go, and AI assistants that answer from real records.
          </motion.p>

          <motion.div
            variants={rise}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.3}>
              <Button href="#work" size="lg">
                View Work
                <ArrowUpRight size={15} />
              </Button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Button
                href={profile.resumePath}
                download={profile.resumeFileName}
                variant="glass"
                size="lg"
              >
                <Download size={15} />
                Resume
              </Button>
            </Magnetic>
            <Button
              href={socials.github}
              target="_blank"
              rel="noreferrer noopener"
              variant="ghost"
              size="lg"
            >
              GitHub
            </Button>
          </motion.div>

          {/* Quick facts */}
          <motion.dl
            variants={rise}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-hairline pt-8 sm:grid-cols-4"
          >
            {quickFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd>
                  <CountUp
                    value={fact.value}
                    className="block font-sans text-xl font-semibold tracking-tight text-ink"
                  />
                  <span className="label-mono mt-1.5 block text-ink-faint">
                    {fact.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------------- Portrait + 3D field ---------------- */}
        <div className="relative lg:col-span-5">
          {/* Oversized on purpose: the knot has to read as a form orbiting
              the portrait, not as specks peeking out from behind it. */}
          <HeroVisual className="pointer-events-none absolute left-1/2 top-1/2 h-[210%] w-[210%] -translate-x-1/2 -translate-y-1/2" />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            className="js-reveal perspective relative mx-auto w-full max-w-88"
          >
            <Tilt3D intensity={9} lift={20} className="rounded-[2rem]">
              <div className="glass relative overflow-hidden rounded-[2rem] p-2">
                <div className="relative aspect-4/5 overflow-hidden rounded-[1.6rem]">
                  <Image
                    src="/hero_image.jpg"
                    alt={`Portrait of ${profile.name}`}
                    fill
                    sizes="(max-width: 1024px) 80vw, 22rem"
                    className="object-cover object-top"
                    priority
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-void/80 via-transparent to-transparent"
                  />
                </div>

                {/* Floating caption plate, pushed forward in 3D space. */}
                <div
                  className="absolute inset-x-5 bottom-5 rounded-xl border border-hairline bg-void/70 px-4 py-3 backdrop-blur-xl"
                  style={{ transform: "translateZ(42px)" }}
                >
                  <p className="label-mono text-cyan">Currently</p>
                  <p className="mt-1.5 font-sans text-sm text-ink">
                    B.Tech CSE · IIIT Kota · 2027
                  </p>
                </div>
              </div>
            </Tilt3D>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="js-reveal absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 text-ink-ghost transition-colors hover:text-ink md:block"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
