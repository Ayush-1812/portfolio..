"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/Button";

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
      style={{
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(5,7,10,0.6)",
      }}
    >
      <Link
        href="/"
        className="font-sans font-bold text-xl tracking-tighter"
        style={{ color: "#e1e2e7" }}
      >
        AJ
      </Link>

      <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase" style={{ letterSpacing: "0.2em" }}>
        {[
          { label: "Work", href: "#about" },
          { label: "Skills", href: "#skills" },
          { label: "Labs", href: "#projects" },
          { label: "Contact", href: "#contact" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="transition-colors"
            style={{ color: "#908f9e" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e1e2e7")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#908f9e")}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        {/* Status badge */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] uppercase"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.03)",
            color: "#c6c5d5",
            letterSpacing: "0.2em",
          }}
        >
          <div
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#7bd0ff" }}
          />
          Available
        </div>

        <Button variant="glass" size="default" className="text-[10px] md:text-xs">
          <a href="/Ayush_Carpenter_ResumeSDE.pdf" download="Ayush_Carpenter_Resume.pdf">
            Resume
          </a>
        </Button>
      </div>
    </motion.header>
  );
}
