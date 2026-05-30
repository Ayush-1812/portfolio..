---
name: Cinematic Cyber-Minimalist
colors:
  surface: '#05070A'
  surface-dim: '#111417'
  surface-bright: rgba(255, 255, 255, 0.03)
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#191c1f'
  surface-container: '#0B0F17'
  surface-container-high: '#282a2e'
  surface-container-highest: '#323539'
  on-surface: '#e1e2e7'
  on-surface-variant: '#c6c5d5'
  inverse-surface: '#e1e2e7'
  inverse-on-surface: '#2e3134'
  outline: '#908f9e'
  outline-variant: '#454653'
  surface-tint: '#bdc2ff'
  primary: '#bdc2ff'
  on-primary: '#131e8c'
  primary-container: '#818cf8'
  on-primary-container: '#101b8a'
  inverse-primary: '#4953bc'
  secondary: '#c3c0ff'
  on-secondary: '#231691'
  secondary-container: '#3e37a9'
  on-secondary-container: '#b3b0ff'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#00a0d7'
  on-tertiary-container: '#003246'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bdc2ff'
  on-primary-fixed: '#000767'
  on-primary-fixed-variant: '#2f3aa3'
  secondary-fixed: '#e2dfff'
  secondary-fixed-dim: '#c3c0ff'
  on-secondary-fixed: '#0f0069'
  on-secondary-fixed-variant: '#3b35a7'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#111417'
  on-background: '#e1e2e7'
  surface-variant: '#323539'
  outline-glow: rgba(255, 255, 255, 0.06)
  primary-glow: rgba(99, 102, 241, 0.15)
  tertiary-glow: rgba(14, 165, 233, 0.15)
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 112px
    fontWeight: '600'
    lineHeight: '0.9'
    letterSpacing: -0.05em
  display-xl-mobile:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: -0.03em
  display-lg:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '300'
    lineHeight: '1.6'
    letterSpacing: 0.02em
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: 0.2em
  label-mono-micro:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: 0.3em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 12px
  stack-md: 32px
  stack-lg: 120px
  container-max: 1280px
---

## Brand & Style
The brand personality is high-end, technical, and visionary, designed for a developer who views code as a cinematic art form. The aesthetic is "Cinematic Cyber-Minimalist," blending the precision of a code editor with the atmospheric depth of sci-fi filmmaking.

The UI employs a "Bent" Glassmorphism style, characterized by extremely thin borders (0.5px), deep backdrop blurs (24px+), and subtle mesh gradients that create an immersive, non-flat digital space. The goal is to evoke a sense of high performance, intelligence, and professional maturity through dark-mode exclusivity and heavy, intentional whitespace.

## Colors
The palette is rooted in a "Pure Black" base (#05070A) to achieve infinite contrast and power efficiency. The primary color is a soft Indigo (#818cf8), used for brand identity and primary actions. A vibrant Cyan (#38bdf8) serves as the tertiary accent, representing "Intelligence" and "AI" status indicators.

Backgrounds are enriched by "Mesh Blobs"—low-opacity radial gradients of Indigo and Cyan that sit behind the content layer. Text uses high-contrast white for headings and a muted slate-blue (#94a3b8) for secondary information to maintain a focused hierarchy.

## Typography
The system uses **Geist** for all communicative and display text, leveraging its tight apertures and clean, technical look. Headlines use a semi-bold weight with extremely tight letter-spacing for a modern, compressed feel. Body text is kept light (300 weight) to ensure the dark interface feels airy rather than heavy.

**JetBrains Mono** is utilized for technical labels, status indicators, and navigation elements. It is consistently set in uppercase with generous letter-spacing (0.2em+) to distinguish it from the geometric sans-serif body text.

## Layout & Spacing
The system utilizes a **Fixed Grid** model for desktop, centered within a 1280px container, and a **Fluid Grid** for mobile. A massive vertical rhythm is established using "stack-lg" (120px) to separate major sections, forcing the user to focus on one narrative block at a time.

Desktop layouts use a 12-column structure with 24px gutters. Reflow rules dictate that "feature cards" collapse from side-by-side (50/50 or 60/40 splits) to vertical stacks on screens smaller than 1024px. Margins are generous (64px) to emphasize the premium nature of the portfolio.

## Elevation & Depth
Depth is created through transparency rather than shadows. 
- **Tier 1 (Surface):** Pure black background.
- **Tier 2 (Floating Glass):** Surfaces with `rgba(15, 19, 29, 0.4)` background, 24px backdrop-blur, and a 0.5px border of `rgba(255, 255, 255, 0.06)`.
- **Tier 3 (Interactive):** On hover, glass surfaces increase background opacity to 0.03 (bright white) and increase border opacity to 0.12, shifting 4px upward.

Glows (radial gradients) are used sparingly behind primary containers to lift them off the background without traditional drop-shadows.

## Shapes
The shape language is defined by large, organic radii. Primary sections and large containers use `rounded-[2rem]` (32px), creating a friendly yet sophisticated "encapsulated" look. 

Secondary elements like smaller cards and input fields use `rounded-xl` (12px or 16px). Buttons and chips utilize a full-pill radius to contrast against the more geometric grid lines and text blocks.

## Components
- **Buttons:** Primary buttons are pure white with black text, no border. Secondary buttons are "Premium Glass"—translucent with a subtle border. All buttons use 48px to 56px heights with uppercase mono-labels.
- **Data Bars:** Skill indicators use a 2px height. The track is `rgba(255, 255, 255, 0.05)` and the fill is a linear gradient from Indigo to Cyan.
- **Interactive Cards:** Large-radius containers with a "mix-blend-screen" or "grayscale" image state. On hover, images transition to full color or increased contrast.
- **Timeline:** A 1px vertical gradient line (transparent -> white/10 -> transparent) with small 8px circular "nodes" that scale up 1.5x on hover.
- **Navigation:** Fixed top bar with `backdrop-blur-3xl` and a 1px bottom border. Side navigation is a vertical pill containing icon-only links.
- **Input Fields:** Dark background (#0B0F17), 1px border, and uppercase technical labels. Focus state adds a subtle glow effect (`primary-glow`).