# Ayush Carpenter - Software Engineer Portfolio

This is a premium, high-performance portfolio built for Ayush Carpenter, designed with a "Cinematic Cyber-Minimalist" aesthetic.

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Lucide React & Custom SVGs
- **Typography**: Geist (Primary), JetBrains Mono (Labels/Technical text)

## Architecture & Design
This application utilizes a strict component-based architecture:
- `src/components/layout/`: Global structure (Navbar, SideNav, Footer).
- `src/components/sections/`: Modular page sections mirroring the resume content.
- `src/components/ui/`: Reusable, styled base components (`Button`, `GlassPanel`, `SectionHeading`).

The design language emphasizes a pure black canvas (`#05070A`) with deep "Bent" glassmorphism (`backdrop-blur-3xl`, 0.5px subtle white borders) and ambient mesh gradients.

## Setup Instructions

1. Ensure you have Node.js 20+ installed.
2. Clone this repository or navigate to the project root.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push this repository to GitHub.
2. Go to Vercel and import the repository.
3. Vercel will automatically detect Next.js and build your app seamlessly. No extra configuration required.

## SEO & Accessibility

This portfolio is built with semantic HTML tags, accessible color contrast ratios on text, and responsive typography out of the box. Metadata is configured in `src/app/layout.tsx` for optimal search engine crawling.
