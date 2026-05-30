"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "../ui/GlassPanel";
import { Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "286eab45-eaaa-4961-bdb7-edfa77038a72",
          name,
          email,
          message,
          subject: `Portfolio Contact: ${name}`,
          from_name: name,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSent(true);
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setIsSent(false), 6000);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      {/* Top separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent" />

      {/* Mesh blobs */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 pointer-events-none bg-[#818cf8]" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10 pointer-events-none bg-[#7bd0ff]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-sans text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
              Let&apos;s build <br />
              <span className="text-[#e1e2e7]/50">something</span> <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#818cf8] to-[#7bd0ff]">
                extraordinary.
              </span>
            </h2>

            <p className="font-sans text-lg text-[#e1e2e7]/60 leading-relaxed mb-12 max-w-md">
              Currently accepting new projects and research collaborations.
              Drop a line if you want to push the boundaries of what&apos;s
              possible.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(15,19,29,0.4)] backdrop-blur-3xl border border-[rgba(255,255,255,0.06)] w-max">
                <Mail className="text-[#bdc2ff] shrink-0" size={20} />
                <span className="font-mono text-xs text-[#e1e2e7]/80 lowercase">
                  ayushcarpenter181204@gmail.com
                </span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[rgba(15,19,29,0.4)] backdrop-blur-3xl border border-[rgba(255,255,255,0.06)] w-max">
                <MapPin className="text-[#7bd0ff] shrink-0" size={20} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#e1e2e7]/80">
                  India — Remote / Open to Relocation
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <GlassPanel className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#e1e2e7]/50">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="bg-[#0B0F17] border border-[#454653] rounded-xl px-4 py-3 text-sm text-[#e1e2e7] placeholder:text-[#908f9e]/50 focus:outline-none focus:border-[#bdc2ff] focus:ring-1 focus:ring-[#818cf8]/30 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-[#e1e2e7]/50">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="bg-[#0B0F17] border border-[#454653] rounded-xl px-4 py-3 text-sm text-[#e1e2e7] placeholder:text-[#908f9e]/50 focus:outline-none focus:border-[#bdc2ff] focus:ring-1 focus:ring-[#818cf8]/30 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-[#e1e2e7]/50">
                    Project Enquiry
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your vision..."
                    rows={5}
                    className="bg-[#0B0F17] border border-[#454653] rounded-xl px-4 py-3 text-sm text-[#e1e2e7] placeholder:text-[#908f9e]/50 focus:outline-none focus:border-[#bdc2ff] focus:ring-1 focus:ring-[#818cf8]/30 transition-all resize-none"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="flex items-center gap-2 text-[#ffb4ab] font-mono text-xs">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSent}
                  whileHover={{ scale: isSubmitting || isSent ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting || isSent ? 1 : 0.98 }}
                  className="mt-2 w-full bg-[#E5D5C5] text-[#05070A] font-mono text-xs uppercase tracking-[0.2em] py-4 rounded-full hover:bg-white transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin"
                        width={14}
                        height={14}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Transmitting...
                    </span>
                  ) : isSent ? (
                    <span className="flex items-center gap-2 text-green-800">
                      <CheckCircle size={16} /> Message Sent!
                    </span>
                  ) : (
                    "Transmit Message"
                  )}
                </motion.button>
              </form>
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
