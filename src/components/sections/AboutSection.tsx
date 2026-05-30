"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "../ui/GlassPanel";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[600px] rounded-[2rem] overflow-hidden"
            style={{
              background: "rgba(15,19,29,0.4)",
              backdropFilter: "blur(24px)",
              border: "0.5px solid rgba(255,255,255,0.06)",
            }}
          >
            <Image
              src="/hero_image.jpg"
              alt="Ayush Carpenter"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top transition-all duration-700 grayscale hover:grayscale-0"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to top, #05070A 0%, transparent 40%)",
              }}
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2
                className="font-sans text-4xl md:text-5xl lg:text-[56px] font-semibold leading-[1.1] mb-2"
                style={{ color: "#e1e2e7", letterSpacing: "-0.02em" }}
              >
                Engineering the{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #818cf8 0%, #7bd0ff 100%)",
                  }}
                >
                  Digital Future
                </span>
              </h2>
            </div>

            <div className="space-y-5">
              <p
                className="font-sans font-light text-lg leading-relaxed"
                style={{ color: "#c6c5d5" }}
              >
                I specialize in building high-performance systems where AI meets
                tangible software experiences. With a background in research and
                full-stack engineering, I create tools that aren&apos;t just
                functional, but cinematic in their execution.
              </p>
              <p
                className="font-sans font-light text-lg leading-relaxed"
                style={{ color: "#c6c5d5" }}
              >
                Currently pursuing B.Tech in Computer Science and Engineering at
                the Indian Institute of Information Technology, Kota.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <GlassPanel className="p-5">
                <p
                  className="font-mono text-[10px] uppercase mb-2"
                  style={{ color: "#7bd0ff", letterSpacing: "0.2em" }}
                >
                  Computer Science Research
                </p>
                <p
                  className="font-sans text-sm font-medium"
                  style={{ color: "#e1e2e7" }}
                >
                  B.Tech (CSE)
                </p>
                <p
                  className="font-sans text-xs mt-1"
                  style={{ color: "#908f9e" }}
                >
                  IIIT Kota, 2023 – Present
                </p>
              </GlassPanel>

              <GlassPanel className="p-5">
                <p
                  className="font-mono text-[10px] uppercase mb-2"
                  style={{ color: "#7bd0ff", letterSpacing: "0.2em" }}
                >
                  AI &amp; Cloud Architecture
                </p>
                <p
                  className="font-sans text-sm font-medium"
                  style={{ color: "#e1e2e7" }}
                >
                  Full-Stack Development
                </p>
                <p
                  className="font-sans text-xs mt-1"
                  style={{ color: "#908f9e" }}
                >
                  AI/ML &amp; Web Systems
                </p>
              </GlassPanel>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
