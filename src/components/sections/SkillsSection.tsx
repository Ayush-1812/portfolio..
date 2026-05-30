"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "../ui/GlassPanel";
import { Code2, Database, BrainCircuit, Cloud } from "lucide-react";

const skillsData = [
  {
    category: "Frontend",
    icon: <Code2 size={18} style={{ color: "#bdc2ff" }} />,
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML / CSS / JS", level: 90 },
    ],
  },
  {
    category: "Backend",
    icon: <Database size={18} style={{ color: "#7bd0ff" }} />,
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 85 },
    ],
  },
  {
    category: "AI / ML",
    icon: <BrainCircuit size={18} style={{ color: "#bdc2ff" }} />,
    skills: [
      { name: "LLMs / RAG", level: 80 },
      { name: "Agentic AI", level: 75 },
      { name: "Python", level: 85 },
    ],
  },
  {
    category: "Cloud Infrastructure",
    icon: <Cloud size={18} style={{ color: "#7bd0ff" }} />,
    skills: [
      { name: "AWS / Docker", level: 80 },
      { name: "DevOps / CI-CD", level: 75 },
      { name: "Git / GitHub", level: 90 },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 px-6 relative" style={{ background: "#111417" }}>
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2
            className="font-sans text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4"
            style={{ color: "#e1e2e7", letterSpacing: "-0.02em" }}
          >
            Technological Stack
          </h2>
          <p
            className="font-mono text-xs uppercase"
            style={{ color: "#908f9e", letterSpacing: "0.2em" }}
          >
            System Architecture Proficiency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: groupIdx * 0.1 }}
            >
              <GlassPanel className="h-full flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {group.icon}
                  </div>
                  <h3
                    className="font-sans text-lg font-medium"
                    style={{ color: "#e1e2e7" }}
                  >
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-col gap-5">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span
                          className="font-mono text-[10px] uppercase"
                          style={{ color: "#908f9e", letterSpacing: "0.15em" }}
                        >
                          {skill.name}
                        </span>
                        <span
                          className="font-mono text-[10px]"
                          style={{ color: "#454653" }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      {/* Track */}
                      <div
                        className="h-[2px] w-full rounded-full overflow-hidden"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.2,
                            delay: 0.3 + groupIdx * 0.1,
                            ease: "easeOut",
                          }}
                          className="h-full"
                          style={{
                            background:
                              "linear-gradient(90deg, #818cf8 0%, #7bd0ff 100%)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
