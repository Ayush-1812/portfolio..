# Ayush Carpenter — Portfolio

Personal portfolio for Ayush Carpenter, a Computer Science undergraduate at IIIT Kota (B.Tech CSE, 2027).
Dark-only, single page, built around a "Cinematic Cyber-Minimalist" design language.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · hand-written WebGL

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in WEB3FORMS_KEY
npm run dev
```

Open http://localhost:3000.

| Script          | Purpose                          |
| --------------- | -------------------------------- |
| `npm run dev`   | Dev server (Turbopack)           |
| `npm run build` | Production build                 |
| `npm start`     | Serve the production build       |
| `npm run lint`  | ESLint                           |

## Environment

| Variable         | Required | Notes                                                                 |
| ---------------- | -------- | --------------------------------------------------------------------- |
| `WEB3FORMS_KEY`  | Yes      | Access key for the contact form. Read **server-side only**, inside the Server Action — deliberately not `NEXT_PUBLIC_`, so it never ships to the browser. Web3Forms delivers to the address the key was registered under, so create the key with the inbox you actually read. |

Without it the contact form renders and validates normally but returns a
message asking the visitor to email directly, rather than failing silently.
**Remember to add this variable in your Vercel project settings** — `.env.local`
is git-ignored and does not deploy.

## Architecture

```
src/
├── app/
│   ├── actions/contact.ts     Server Action: validation, honeypot, Web3Forms
│   ├── layout.tsx             Fonts, metadata, JSON-LD Person schema, skip link
│   ├── page.tsx               Section composition
│   ├── globals.css            Design tokens (@theme) + utilities
│   ├── opengraph-image.tsx    Generated 1200×630 link preview
│   ├── icon.tsx               Generated monogram favicon
│   ├── sitemap.ts / robots.ts
├── content/site.ts            ← all copy and data live here
├── components/
│   ├── layout/                Navbar, SideRail, Footer, ScrollProgress
│   ├── sections/              Hero, About, Projects, Skills, Experience, Contact
│   └── ui/                    Button, GlassPanel, SectionHeading, Reveal,
│                              Tilt3D, ParticleKnot, HeroVisual, Spotlight,
│                              TechMarquee, Magnetic, CountUp, Icons
└── hooks/useEnvironment.ts    Media-query / capability gates
```

### Content is data, not markup

Every fact on the page — projects, skills, education, links, metrics — comes from
[`src/content/site.ts`](src/content/site.ts). Components only render it.

That file carries a provenance rule: a value may only appear there if it comes from
`public/Ayush_Carpenter_Resume.pdf` or from the linked repository's own README.
Nothing is estimated or inferred. Keep it that way — to update the site, edit that
one file.

### Design tokens

Colours, type, radii and motion curves are declared once in the `@theme` block of
[`globals.css`](src/app/globals.css) and consumed as ordinary Tailwind utilities
(`bg-surface`, `text-ink-muted`, `border-hairline`). Components contain no hex
literals, so the palette can be changed in one place.

### 3D and motion

Three layers, each degrading independently:

1. **`ParticleKnot`** — a (2,3) torus knot drawn as a GPU particle cloud in
   hand-written WebGL (no three.js, no added dependency weight). Perspective,
   rotation and depth attenuation happen in the shader.
2. **`Tilt3D`** — pointer-driven perspective tilt with a tracking specular glare.
3. **`TechMarquee`** — two counter-scrolling rows of technologies tilted back
   on the X axis, animated by a CSS keyframe on a duplicated track so it costs
   no JavaScript.
4. **`Spotlight`** — a glow trailing the pointer, written as CSS custom
   properties from one rAF-throttled listener, so it never triggers a render.
5. **`Magnetic`** — controls that pull toward the cursor and spring back.
6. **`CountUp`** — figures that count up once when scrolled into view.
7. **`Reveal`** — scroll-triggered entrances, observed once.

The WebGL hero loads only after the browser is idle, and only when the visitor has
a fine pointer, a viewport ≥ 768px, no `prefers-reduced-motion`, and no Data Saver.
It pauses when scrolled offscreen or when the tab is hidden, and releases its
context on unmount. `Tilt3D` and `Reveal` return plain wrappers when motion is
reduced, so no content depends on an animation that may never run.

## Accessibility

Skip link, labelled form fields with `aria-invalid`/`aria-describedby`, a polite
live region for submission status, `aria-label` on every icon-only control, a single
consistent `:focus-visible` ring, and a full mobile menu with Escape-to-close and
scroll lock. Hover states are CSS, so they apply on keyboard focus too.

## Deploying

Push to GitHub and import the repository on Vercel — the framework is detected
automatically. Set `WEB3FORMS_KEY` in project settings, and update
`profile.siteUrl` in `src/content/site.ts` to the final domain so `metadataBase`,
the sitemap and the canonical URL all resolve correctly.
