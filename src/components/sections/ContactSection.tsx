"use client";

import { AlertCircle, CheckCircle2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useActionState, useId } from "react";

import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { initialContactState, submitContact } from "@/app/actions/contact";
import { profile } from "@/content/site";
import { cn } from "@/lib/utils";

const FIELD_CLASS =
  "w-full rounded-xl border border-ink-ghost/60 bg-void px-4 py-3 font-sans text-sm text-ink " +
  "placeholder:text-ink-faint/70 transition-colors focus:border-violet focus:outline-none " +
  "focus-visible:outline-none aria-[invalid=true]:border-danger/70";

export function ContactSection() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );

  /* Stable ids so every label is wired to its input. */
  const uid = useId();
  const nameId = `${uid}-name`;
  const emailId = `${uid}-email`;
  const messageId = `${uid}-message`;

  const errors = state.fieldErrors ?? {};

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-section md:px-10">
      <div className="aura -left-20 bottom-0 h-120 w-120 bg-indigo/15" aria-hidden />
      <div className="aura -right-20 top-10 h-96 w-96 bg-cyan/10" aria-hidden />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-16">
        {/* ---- Left: the pitch ---- */}
        <div className="flex flex-col justify-center">
          <Reveal from="left">
            <h2 className="font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
              Let&apos;s build
              <br />
              <span className="text-ink-faint">something</span>
              <br />
              <span className="text-gradient">worth shipping.</span>
            </h2>
          </Reveal>

          <Reveal from="left" delay={0.1}>
            <p className="mt-7 max-w-md text-pretty font-sans text-lg font-light leading-relaxed text-ink-muted">
              I&apos;m looking for SDE, full-stack and AI engineering roles, and
              I&apos;m open to internships and collaborations. Messages sent
              from this form land straight in my inbox.
            </p>
          </Reveal>

          <Reveal from="left" delay={0.18}>
            <ul className="mt-10 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="glass inline-flex w-full items-center gap-4 rounded-2xl p-4 transition-colors hover:border-hairline-strong hover:bg-glass-hover sm:w-auto"
                >
                  <Mail className="shrink-0 text-violet" size={18} />
                  <span className="break-all font-mono text-xs lowercase text-ink">
                    {profile.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={profile.phoneHref}
                  className="glass inline-flex w-full items-center gap-4 rounded-2xl p-4 transition-colors hover:border-hairline-strong hover:bg-glass-hover sm:w-auto"
                >
                  <Phone className="shrink-0 text-cyan" size={18} />
                  <span className="font-mono text-xs text-ink">
                    {profile.phone}
                  </span>
                </a>
              </li>
              <li className="glass inline-flex w-full items-center gap-4 rounded-2xl p-4 sm:w-auto">
                <MapPin className="shrink-0 text-sand" size={18} />
                <span className="label-mono text-ink-muted">
                  {profile.location}
                </span>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* ---- Right: the form ---- */}
        <Reveal from="right">
          <GlassPanel className="p-6 md:p-9">
            <form action={formAction} className="flex flex-col gap-5">
              {/* Honeypot — hidden from people, irresistible to bots. */}
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor={`${uid}-company`}>Company</label>
                <input
                  id={`${uid}-company`}
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor={nameId} className="label-mono text-ink-muted">
                    Full name
                  </label>
                  <input
                    id={nameId}
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${nameId}-error` : undefined}
                    className={FIELD_CLASS}
                  />
                  {errors.name && (
                    <p id={`${nameId}-error`} className="font-mono text-[11px] text-danger">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={emailId} className="label-mono text-ink-muted">
                    Email
                  </label>
                  <input
                    id={emailId}
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? `${emailId}-error` : undefined}
                    className={FIELD_CLASS}
                  />
                  {errors.email && (
                    <p id={`${emailId}-error`} className="font-mono text-[11px] text-danger">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor={messageId} className="label-mono text-ink-muted">
                  Message
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  required
                  rows={5}
                  placeholder="What are you building?"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? `${messageId}-error` : undefined}
                  className={cn(FIELD_CLASS, "resize-none")}
                />
                {errors.message && (
                  <p id={`${messageId}-error`} className="font-mono text-[11px] text-danger">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Status region — announced to screen readers when it changes. */}
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "flex items-center gap-2 font-mono text-[11px]",
                  state.status === "success" && "text-success",
                  state.status === "error" && "text-danger",
                  state.status === "idle" && "sr-only",
                )}
              >
                {state.status === "success" && <CheckCircle2 size={14} />}
                {state.status === "error" && <AlertCircle size={14} />}
                {state.message}
              </p>

              <button
                type="submit"
                disabled={pending}
                className="mt-1 inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-ink font-mono text-[11px] uppercase tracking-[0.2em] text-void transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? (
                  <>
                    <span
                      aria-hidden
                      className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-void/25 border-t-void"
                    />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <Send size={14} />
                  </>
                )}
              </button>

              {/* Escape hatch: if the form ever fails, nobody is stranded. */}
              <p className="text-center font-mono text-[11px] text-ink-faint">
                Prefer email?{" "}
                <a
                  href={`mailto:${profile.email}`}
                  className="text-ink-muted underline underline-offset-4 transition-colors hover:text-ink"
                >
                  {profile.email}
                </a>
              </p>
            </form>
          </GlassPanel>
        </Reveal>
      </div>
    </section>
  );
}
