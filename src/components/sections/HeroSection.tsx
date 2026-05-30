"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Mesh Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #7bd0ff 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto flex flex-col items-center text-center max-w-5xl">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10 px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md font-mono text-[10px] uppercase tracking-widest text-[#e1e2e7]/70 flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff] animate-pulse" />
          Available for hire
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-sans font-semibold leading-[0.9] tracking-[-0.05em] mb-6 text-[64px] md:text-[96px] lg:text-[112px]"
          style={{ color: "#e1e2e7" }}
        >
          Hi, I&apos;m Ayush <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #818cf8 0%, #7bd0ff 100%)",
            }}
          >
            Carpenter.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-sm md:text-base uppercase tracking-[0.2em] mb-12"
          style={{ color: "#908f9e" }}
        >
          Software Engineer <span className="mx-4 text-[#454653]">|</span> AI Developer
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#projects">
            <Button size="lg">View Projects</Button>
          </a>
          <a href="/Ayush_Carpenter_ResumeSDE.pdf" download="Ayush_Carpenter_Resume.pdf">
            <Button variant="glass" size="lg">Download Resume</Button>
          </a>
        </motion.div>

        {/* Hero Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 relative"
        >
          {/* Glow behind image */}
          <div
            className="absolute inset-0 rounded-[2rem] opacity-40"
            style={{
              background: "radial-gradient(ellipse, rgba(129,140,248,0.3) 0%, transparent 70%)",
              filter: "blur(30px)",
              transform: "scale(1.2)",
            }}
          />
          {/* Image container */}
          <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-[2rem] overflow-hidden bg-[rgba(15,19,29,0.4)] backdrop-blur-3xl border border-[rgba(255,255,255,0.08)] p-2">
            <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
              <Image
                src="/hero_image.jpg"
                alt="Ayush Carpenter"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top"
                priority
              />
              {/* Subtle color overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 60%, rgba(5,7,10,0.6) 100%)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
