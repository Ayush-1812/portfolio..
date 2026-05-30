"use client";

import { motion } from "framer-motion";
import { Mail, FileDown } from "lucide-react";

const GithubIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"/><path d="M9 18c-4.5 1-5-2.5-5-2.5"/></svg>
);

const LinkedinIcon = ({ size = 24, strokeWidth = 2, className = "" }: { size?: number; strokeWidth?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function SideNav() {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-5 p-3 rounded-full"
      style={{
        background: "rgba(15,19,29,0.4)",
        backdropFilter: "blur(24px)",
        border: "0.5px solid rgba(255,255,255,0.06)",
      }}
    >
      <a
        href="https://github.com"
        target="_blank"
        rel="noreferrer"
        className="transition-colors"
        style={{ color: "#908f9e" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e1e2e7")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#908f9e")}
      >
        <GithubIcon size={20} strokeWidth={1.5} />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noreferrer"
        className="transition-colors"
        style={{ color: "#908f9e" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e1e2e7")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#908f9e")}
      >
        <LinkedinIcon size={20} strokeWidth={1.5} />
      </a>
      <a
        href="mailto:ayushcarpenter181204@gmail.com"
        className="transition-colors"
        style={{ color: "#908f9e" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#e1e2e7")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#908f9e")}
      >
        <Mail size={20} strokeWidth={1.5} />
      </a>
      <div
        className="w-full h-[1px] my-1"
        style={{ background: "rgba(255,255,255,0.1)" }}
      />
      <a
        href="/Ayush_Carpenter_ResumeSDE.pdf"
        download
        className="transition-colors"
        style={{ color: "#908f9e" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#bdc2ff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#908f9e")}
      >
        <FileDown size={20} strokeWidth={1.5} />
      </a>
    </motion.div>
  );
}
