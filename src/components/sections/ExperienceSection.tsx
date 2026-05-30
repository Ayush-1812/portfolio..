"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "../ui/GlassPanel";

const experienceData = [
  {
    title: "Frontend Developer Intern",
    company: "Gyanama",
    period: "2023 – Present",
    description:
      "Developed modern web applications and improved frontend architecture using React, Next.js, and Tailwind CSS.",
    alignment: "right" as const,
  },
  {
    title: "Top 50 / 950+ Teams",
    company: "Oddo Hackathon — IIT Gandhinagar",
    period: "2024",
    description:
      "Focused on implementing advanced microservice architectures for real-time edge processing.",
    alignment: "left" as const,
  },
  {
    title: "Competitive Programmer",
    company: "LeetCode & CodeChef",
    period: "2022 – Present",
    description:
      "Solved 550+ problems. Achieved Knight Badge (1928 rating) on LeetCode and 3-Star on CodeChef.",
    alignment: "right" as const,
  },
];

export function ExperienceSection() {
  return (
    <section className="py-32 px-6 relative">
      {/* Side line labels */}
      <div className="hidden lg:flex flex-col gap-4 fixed left-10 top-1/2 -translate-y-1/2 z-30">
        {["01", "02", "03"].map((n) => (
          <span
            key={n}
            className="font-mono text-[10px]"
            style={{ color: "#454653", letterSpacing: "0.2em" }}
          >
            {n}
          </span>
        ))}
      </div>

      <div className="container mx-auto max-w-4xl">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
            style={{ color: "#e1e2e7", letterSpacing: "-0.02em" }}
          >
            Experience Timeline
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — gradient from transparent → white/10 → transparent */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)",
            }}
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {experienceData.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center ${
                  item.alignment === "left" ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block"
                >
                  <div
                    className="w-3 h-3 rounded-full transition-transform duration-300 hover:scale-150"
                    style={{
                      background: "#818cf8",
                      boxShadow: "0 0 12px rgba(129,140,248,0.4)",
                    }}
                  />
                </motion.div>

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ${
                    item.alignment === "left" ? "md:pl-14" : "md:pr-14"
                  }`}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: item.alignment === "left" ? 40 : -40,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <GlassPanel className="relative group transition-colors duration-300 hover:border-[rgba(189,194,255,0.2)]">
                      <p
                        className="font-mono text-[10px] uppercase mb-3"
                        style={{ color: "#7bd0ff", letterSpacing: "0.2em" }}
                      >
                        {item.period}
                      </p>
                      <h3
                        className="font-sans text-xl font-medium mb-1"
                        style={{ color: "#e1e2e7" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="font-sans text-sm mb-4"
                        style={{ color: "#bdc2ff" }}
                      >
                        {item.company}
                      </p>
                      <p
                        className="font-sans text-sm leading-relaxed"
                        style={{ color: "#908f9e" }}
                      >
                        {item.description}
                      </p>
                    </GlassPanel>
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
