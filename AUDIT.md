# Portfolio UI Audit — Pre-Redesign Baseline

**Repo:** `tafara-portfolio` · **Audited:** 2026-06-19 · **Branch:** `main`
**Scope:** Read-only audit. No code was changed.

> **Rendering note:** I did not spin up a browser to capture live screenshots, so page
> descriptions below are derived precisely from the source (JSX + CSS), not from rendered
> pixels. Where layout depends on runtime state (typewriter, hover, scroll), that is flagged.
> Anything I'm inferring rather than reading directly is marked **(inferred)**.

---

## 1. Stack & Architecture

| Area | Detail |
|------|--------|
| **Framework** | Next.js `^15.5.12`, **App Router** (`src/app/`) |
| **React** | `^18.3.1` / react-dom `^18.3.1` |
| **Language** | TypeScript `^5.6.3` (strict usage throughout; `tsc --noEmit` script present) |
| **Styling** | Tailwind CSS `^3.4.14` + a large hand-written `globals.css` layer (~525 lines). **Heavy use of inline `style={{}}` objects** with raw hex/rgba — see token audit. |
| **Animation** | `framer-motion ^11.11.17` (used in nearly every component) + CSS keyframe animations in `globals.css` |
| **3D / Canvas** | Raw **WebGL2 fragment shader** in `src/components/ui/animated-shader-hero.tsx` (GLSL by "Matthias Hurrle @atzedent"). **Only used on the orphaned `/shader-demo` route** — not on any linked page. |
| **Icons** | `@heroicons/react ^2.2.0`; plus many hand-inlined SVGs and emoji |
| **Fonts** | `next/font/google` loads **Syne** (400–800) + **JetBrains Mono** (400–600) in `layout.tsx`. `globals.css` *also* `@import`s **Inter + JetBrains Mono** from Google Fonts CSS. See inconsistency note. |
| **Perf tooling** | `web-vitals ^4.2.4`, custom `PerformanceMonitor`, `@next/bundle-analyzer`, Lighthouse CI (`@lhci/cli`) |
| **Testing** | Jest 30 + Testing Library, Playwright 1.58, `fast-check` (property tests). ~30 test files under `__tests__/`. |
| **Build / Deploy** | **Netlify** static export. `next.config.ts` sets `output: 'export'` **only when `NODE_ENV==='production'`**, `trailingSlash: true`, `images.unoptimized: true`. `netlify.toml` publishes `out/`, Node 18, SPA fallback redirect, full security-header + CSP block, Netlify Forms (`contact`). |

### Folder structure (source only)
```
src/
  app/
    layout.tsx, page.tsx (home), globals.css
    contact/  experience/  projects/  what-i-do/   (each: page.tsx + layout.tsx)
    shader-demo/page.tsx          ← orphaned demo route, not in nav
    error.tsx, global-error.tsx, not-found.tsx, robots.ts, sitemap.ts
  components/
    Hero, Navigation, Footer, ContactForm, ContactInfo, ExperienceTimeline,
    CapabilityCard, Certifications, Testimonial, AutomationSystems,
    FloatingCard, SpotlightCard, AnimatedBackground,
    ProjectGrid, ProjectCard            ← DEAD CODE (see below)
    ClientShell, ErrorBoundary, ClientPerformanceInit, PerformanceMonitor,
    OptimizedImage, SEO, StructuredData
    ui/animated-shader-hero.tsx
    Navigation.orig.tsx                 ← stale backup copy, still tracked
  data/portfolio.ts        ← single source of all content
  types/, utils/, test-utils/
public/
  documents/ (cv.pdf, reference.pdf), images/ (tafara-rugara.jpg, placeholder.svg)
  + default create-next-app SVGs (next.svg, vercel.svg, window.svg, globe.svg, file.svg)
```

### Architectural notes / flags
- **`ClientShell`** wraps every page (Nav + Footer + ErrorBoundary + perf). `layout.tsx` is the only server component of consequence; essentially the whole site is `'use client'`.
- **Dead code:** `ProjectGrid.tsx` and `ProjectCard.tsx` (a full search/filter/sort grid) are **never imported by any route** — the live `/projects` page hand-rolls its own card markup with `FloatingCard` instead. Confirmed via grep: no `app/**` file references them.
- **Orphaned route:** `/shader-demo` exists and pulls in the WebGL hero, but nothing links to it.
- **Stale file:** `Navigation.orig.tsx` is a tracked backup of the nav.
- **Leftover scaffolding:** the create-next-app starter SVGs remain in `public/`.
- The session-start git snapshot listed `Navigation.orig.tsx` / `SpotlightCard.tsx` as untracked (`??`); they are in fact **tracked** now — the snapshot was stale.

---

## 2. Design Token Audit

The project *declares* a token system in three places that **do not agree**:
1. `globals.css` `:root` — the richest set (CSS custom properties).
2. `tailwind.config.ts` `theme.extend` — a partial, slightly different set.
3. Reality: **most components ignore both** and hardcode hex/rgba in inline `style`.

> **Headline finding:** there is a defined palette, but raw `#0A0A0A`, `#111111`, `#27272A`,
> `#A1A1AA`, `#71717A`, `#FFFFFF`, and `rgba(255,255,255,…)` are pasted literally across
> ~every component. Tailwind color tokens (`surface`, `border`, `accent`…) are **almost never
> used**; CSS vars (`var(--background)` etc.) are used only by a few utility classes.

### Colors
| Category | Defined tokens | Hardcoded instances found | Notes |
|---|---|---|---|
| Colors | **CSS vars** (`globals.css`): `--background #0A0A0A`, `--foreground #FFFFFF`, `--primary #FFFFFF`, `--secondary #111111`, `--muted #18181B`, `--accent #E4E4E7`, `--border #27272A`, `--border-hover #3F3F46`, `--border-subtle #1C1C1F`, `--text-secondary #A1A1AA`, `--text-muted #71717A`, `--ring #FFFFFF`, `--card #111111`, `--glow-subtle rgba(255,255,255,0.03)`, `--glow-accent rgba(140,180,255,0.06)`. **Tailwind** also defines `surface #111111`, `border #27272A`, `border-hover #3F3F46`, `text-secondary #A1A1AA`, `text-muted #71717A`, `accent #E4E4E7`. | Raw literals everywhere: `#0A0A0A` (every page bg + `layout.tsx` inline body style), `#111111`, `#18181B`/`rgba(24,24,27,…)`, `#27272A`/`rgba(39,39,42,…)`, `#3F3F46`/`rgba(63,63,70,…)`, `#A1A1AA`, `#71717A`, `#52525B` (footer — **not a token at all**), `#FFFFFF`, dozens of `rgba(255,255,255, 0.03–0.5)` glows. Error red `#EF4444`/`rgba(239,68,68,…)` in ContactForm — **no token**. Cert brand colors `#FF9900`, `#00D4FF` in `portfolio.ts` — defined in data but **unused** by render. | Two competing token sources that disagree (`--muted #18181B` vs Tailwind has none; `accent #E4E4E7` defined in both). `#52525B` and `#EF4444` are pure magic numbers. The "zinc monochrome" intent is real but enforced by copy-paste, not tokens. `--glow-accent` is a blue-tinted glow (`140,180,255`) — the one non-monochrome value, used in `.ambient-glow`. |
| Typography | `tailwind.config.ts`: `font-sans`/`font-heading` = **Inter**, `font-mono` = JetBrains Mono. `globals.css` body = Inter. `layout.tsx`: actually loads **Syne** (as `--font-space-grotesk` var) + JetBrains Mono and sets `font-sans`. `letterSpacing.tight = -0.02em`. `.mono-label` = JetBrains Mono, 0.75rem, uppercase, `0.1em`. | Font sizes are almost all **hardcoded** via Tailwind utilities (`text-xs`…`text-5xl`) or inline `clamp()`: Hero name `clamp(2.8rem,7vw,5.5rem)` @ `fontWeight:700` `letterSpacing:-0.03em`; page H1s `text-4xl md:text-5xl` + inline `-0.03em`; `.tech-badge` `0.72rem`. Line-heights: body `1.6`, plus utility `leading-none/relaxed/loose`. | **Major inconsistency:** the configured font (Inter) is **not** the loaded font (Syne). The Syne `variable` is misleadingly named `--font-space-grotesk`. No type scale abstraction — sizes chosen ad hoc per component. Weights span 400–800 (Syne) but config only declares Inter 300–700. |
| Spacing | None formal beyond Tailwind's default scale. | Tailwind spacing utilities used throughout (`px-6`, `py-16`, `gap-8`, `mb-12`…). Inline pixel values appear: badge `padding:3px 10px`, buttons `padding:12px 28px`, icon boxes `width:36/height:36`, dots `width:6/8`. Section vertical rhythm varies: `py-10`, `py-14`, `py-16`, `py-20`, `mb-24` — no consistent section spacing token. | Spacing is "Tailwind default + sprinkled inline px." Section padding is inconsistent across pages/sections. |
| Border-radius | Tailwind defaults; `.glass-card`/`.gradient-border` = `12px`; `.btn-*` = `6px`; `.tech-badge` = `4px`. | Hardcoded per element: `borderRadius: '8px'`, `'10px'`, `'12px'`, `'16px'`, `'20px'` (pill badges), `'6px'`, `'4px'`, `2px` (timeline dot), and `ProjectGrid` inputs use `'0px'` (sharp) — **inconsistent corner language** (sharp inputs vs 16px cards). | No radius scale token. Values range 0→20px chosen case by case. |
| Shadows | Tailwind `boxShadow.card = "none"` (explicitly "depth via borders only"). | Despite that intent, **glow shadows are everywhere inline**: `0 0 12px/16px/20px/40px rgba(255,255,255,0.03–0.12)`, `0 4px 24px rgba(0,0,0,0.3)`, button hover `0 0 20px + 0 0 40px`, input focus `0 0 0 3px …`. `.glass-card:hover` has a 3-layer shadow. | The config says "no glow shadows"; the CSS/components contradict it heavily. Shadow values are all bespoke. |
| Breakpoints | Tailwind defaults only (`sm 640`, `md 768`, `lg 1024`, `xl 1280`…). | Used via `sm:`/`md:`/`lg:` prefixes. No custom breakpoints. Mobile menu switches at `md`. | Consistent (Tailwind default) — the one area with little drift. |
| Motion | `tailwind.config.ts` animations `fade-in 0.5s ease-out`, `fade-in-up 0.5s ease-out`. `globals.css` defines many: `heroFadeIn 0.7s cubic-bezier(0.16,1,0.3,1)`, `fadeInUp 0.6s`, `scrollReveal 0.8s`, `shimmer 3s`, `marquee 30s linear`, `ambientDrift 20s/25s`, `glowPulse 3s`, `borderRotate 6s`, `dotFade 8s`, `starSparkle 2s`, `quoteBreathe 6s`, `pulse 2s`. | framer-motion durations hardcoded per component: `0.3`,`0.5`,`0.6`,`0.7`,`0.8`, spring `stiffness:250–500 damping:25–40`, stagger `0.04–0.2`. Easings: mostly `'easeOut'` + the signature `cubic-bezier(0.16,1,0.3,1)`. | Two easing vocabularies (Tailwind `ease-out` vs CSS custom bezier vs framer `easeOut`). Durations not tokenized. **No `prefers-reduced-motion` handling anywhere** — see a11y. |

---

## 3. Component Inventory

Visual treatment described for a non-sighted reader. All cards share the dark "glass" aesthetic: near-black `#0A0A0A` page on `#111111` translucent cards with thin `#27272A` borders, white text, gray (`#A1A1AA`/`#71717A`) secondary text, faint white glows on hover.

| Component | Where it appears | Current visual treatment | States (default/hover/focus/active/disabled) | Status |
|---|---|---|---|---|
| **Navigation** (`Navigation.tsx`) | Global (every page via ClientShell), fixed top | Translucent blurred bar; "TR" monogram chip + name; 5 text links + white "Hire Me" pill with shimmer; active link gets animated white underline (framer `layoutId`); mobile hamburger → staggered slide-down menu with backdrop blur. | default ✓; hover ✓ (text-shadow glow, button invert via JS); focus ✗ (`focus:outline-none` with **no visible replacement** on links/button); active ✓ (underline + white color); disabled n/a | **Done** (a11y gap: focus removed) |
| **Hero** (`Hero.tsx`) | Home top | Full-screen; dot-grid + two drifting ambient glows; magnetic-tilt profile photo (96–112px rounded square); pulsing "AVAILABLE" pill; huge clamp() name; **typewriter** cycling 5 job titles with blinking caret; summary; 3 glow stat cards; 7 tech badges; 5 CTA buttons; bouncing scroll cue. | default ✓; hover ✓ (photo 3D tilt, stat border/glow, button invert); focus — relies on global `:focus-visible`; active n/a; disabled n/a | **Done** (visually rich; content partly generic — §5) |
| **Footer** (`Footer.tsx`) | Global | 3-col: brand+availability dot, nav links, socials + CV/Reference download buttons; bottom bar "© year · Built with Next.js" + "Harare · GMT+2". | default ✓; hover ✓ (text-shadow / border glow via JS); focus ✗ (no explicit ring); rest n/a | **Done** |
| **AutomationSystems** (`AutomationSystems.tsx`) | Home | Flagship glass card w/ animated SVG corner + **collapsible accordions** (Business Context / Capabilities / Architecture / Outcome) + tech badges + Watch Demo/Get in Touch; below, 2-col supporting system cards. | default ✓; hover ✓ (lift, badge scale); focus ✗ (accordion `<button>` has no focus ring); active ✓ (expanded border lightens); disabled n/a | **Done** |
| **CapabilityCard** (`CapabilityCard.tsx`) | `/what-i-do` (2-col) | Glass + spotlight card: emoji icon chip, category title, description, staggered monospace skill badges. | default ✓; hover ✓ (icon glow, spotlight follows cursor); focus n/a (no interactive child); rest n/a | **Done** |
| **Certifications** (`Certifications.tsx`) | Home (dynamic, `ssr:false`) | 2 cert cards: emoji, "✓ Certified" / "⏳ In Progress" status chip, badge code (CCP/SAA-C03), name, issuer·year; in-progress shows shimmering `~60%` progress bar. | default ✓; hover ✓ (icon rotate/scale, spotlight); rest n/a | **Done** (the `~60%` / "April/May 2026" is hardcoded placeholder-ish) |
| **Testimonial** (`Testimonial.tsx`) | Home (dynamic, `ssr:false`) | Centered glass card; breathing serif quote mark; 5 sparkling ★; italic quote; attribution (Bongani Wilson, Director); Download Reference button. | default ✓; hover ✓ (download btn border/glow); rest n/a | **Done** (single real testimonial) |
| **ExperienceTimeline** (`ExperienceTimeline.tsx`) | `/experience` | Vertical gradient line (draws in on scroll); white square glow dots; per-role glass card: position, company, duration, "Key Impact" badge, achievement bullets (staggered), tech badges. | default ✓; hover ✓ (card lift, spotlight); rest n/a | **Done** (only **1** role in data) |
| **ContactForm** (`ContactForm.tsx`) | `/contact` (dynamic, `ssr:false`) | Name/Email/Message fields w/ focus glow ring; white "Send via WhatsApp" button with shimmer + spinner. **Submitting opens `wa.me` deep link** (not a real backend send), though markup also has `data-netlify="true"`. | default ✓; hover ✓; focus ✓ (white border + glow ring — **best focus impl in app**); active ✓; **disabled ✓** (grayed, spinner) | **Partial** — dual submission story (Netlify Forms attrs **+** WhatsApp redirect) is contradictory; "Message sent" toast is shown even though nothing was sent server-side |
| **ContactInfo** (`ContactInfo.tsx`) | `/contact` | Intro, availability chip, CV/Reference download buttons, 5 social link rows (email/WhatsApp/LinkedIn/GitHub/YouTube) with icon chips. | default ✓; hover ✓ (border/glow via JS); focus ✗ (links rely on global only); rest n/a | **Done** |
| **FloatingCard** (`FloatingCard.tsx`) | `/projects` | Wrapper: 3D mouse-tilt (spring rotateX/Y ±5°), `translateZ(30px)` content, cursor spotlight, hover scale 1.015. | hover ✓ (tilt/scale); other states n/a | **Done** |
| **SpotlightCard** (`SpotlightCard.tsx`) | What-I-Do, Certs, Experience, AutomationSystems | Wrapper: sets CSS vars so `.spotlight-card::before` radial highlight follows cursor. | hover ✓; rest n/a | **Done** |
| **AnimatedBackground** (`AnimatedBackground.tsx`) | `/projects` (dynamic, `ssr:false`) | Fixed dot grid + 2 ambient glow orbs behind content. | static | **Done** |
| **ProjectGrid** (`ProjectGrid.tsx`) | **Nowhere (not rendered)** | Search box + AWS/API/AI/Serverless filter tabs with counts + sort select + responsive 2-col grid + empty state. Inputs are **sharp-cornered** (`borderRadius 0px`) — different language from rest of site. | default/hover/focus/active all present in code | **Placeholder / dead code** — fully built, never mounted |
| **ProjectCard** (`ProjectCard.tsx`) | **Nowhere** (only used by ProjectGrid) | Solid `#111111` card: title, desc, Problem/Architecture/Value/Outcome labels, tech badges, highlight bullets (+N more), View Code / Live Demo links. | default ✓; hover ✓; rest partial | **Dead code** |
| **AnimatedShaderHero** (`ui/animated-shader-hero.tsx`) | **`/shader-demo` only** (orphaned) | WebGL2 fragment-shader animated gradient hero with trust badge, two-line headline, subtitle, two CTAs. Placeholder copy ("Launch Your Workflow Into Orbit"). | buttons `console.log` only | **Placeholder / orphaned** |
| **Navigation.orig.tsx** | unused | Stale backup of Navigation. | — | **Tear-out candidate** |
| Infra: `ClientShell`, `ErrorBoundary`, `PerformanceMonitor`, `ClientPerformanceInit`, `SEO`, `StructuredData`, `OptimizedImage` | Global / layout | Non-visual or wrappers. | n/a | **Done** |

---

## 4. Content & Information Architecture

Single content source: `src/data/portfolio.ts`. Navigation order: **Home → What I Do → Projects → Experience → Contact**.

### Home (`/`) — narrative order
1. **Hero** — name "Tafara Rugara", typewriter of 5 titles, summary, stats (`60%` downtime, `3+` AI systems, `5+` cloud projects), tech badges, CTAs (View Projects, Download CV, Download Reference, GitHub, LinkedIn).
2. **Tech Stack marquee** — infinite-scrolling emoji+name strip (AWS, K8s, Docker, Terraform, n8n, GitHub Actions, Linux, AI/LLMs).
3. **Certifications** — AWS CCP (Certified 2024), AWS SAA-C03 (In Progress, "~60%", target "April/May 2026").
4. **AutomationSystems** — flagship Crebos.online delivery-health system + 2 supporting (Voice-to-Vector, Telegram tax bot).
5. **Testimonial** — one quote (Bongani Wilson, Director, Excellessence).
6. **Footer**.

### What I Do (`/what-i-do`)
"Specialist Capabilities" badge + intro; 2×2 grid of 4 capability cards (Cloud Architecture, DevOps & CI/CD, Automation Engineering, Monitoring & Reliability), each with description + skill badges.

### Projects (`/projects`)
Two sections: **Workflows & Automation Systems** (flagship + 2 supporting, reusing automation data) and **Platform Case Studies** (4 projects: Acquisitions API, Voice-to-Vector API, Legacy Migration, Serverless Pattern) shown as `FloatingCard`s with Overview / Key Capabilities / Architecture / Value + repo/live/“Request Case Details” links. Closing "Two Disciplines. One Engineer." CTA.

### Experience (`/experience`)
"Professional Journey" badge + intro; timeline with **a single role** (Excellessence / Your EKA Services, DevOps & Automation Engineer, May–Nov 2025, "60% pipeline downtime reduction") with 8 achievements + tech badges.

### Contact (`/contact`)
"Let's Work Together"; 2-col ContactInfo + ContactForm; WhatsApp CTA banner with animated rotating border; email fallback.

### Real vs. placeholder content
- **Real:** name, location, social links, summary, the 4 capabilities, the 4 platform projects (with real GitHub URLs / a CloudFront demo / a Docker image tag), 3 YouTube demo URLs, the testimonial, the single experience entry, 2 certs, downloadable CV + reference PDFs.
- **Placeholder / soft:** cert progress "~60%" and "Target: April/May 2026"; stat numbers (`3+`, `5+`) are self-reported and round; `legacy-migration` and `serverless-platform-pattern` have **empty `githubUrl`** so their "View Repository" link is conditionally hidden; the entire **`/shader-demo`** page is template copy ("Launch Your Workflow Into Orbit", `console.log` buttons); create-next-app starter SVGs still in `public/`.

### What a strong portfolio usually has that's missing here
- **No dedicated About / bio page** with a photo + story (only the Hero blurb).
- **Only one experience entry and one testimonial** — thin social proof.
- **No blog / writing / "now" section** despite an active YouTube channel (`@techwithtaf`) that isn't surfaced as content.
- **Projects aren't individually deep-linkable** (no `/projects/[slug]` detail routes; "Request Case Details" punts to contact).
- **No visible metrics/credibility artifacts** beyond the reference letter (no architecture diagrams, no screenshots/video embeds inline — demos are external YouTube links).
- **No light theme / theme toggle** (hard-committed dark).
- The well-built **ProjectGrid search/filter UX is built but unused** — the live projects page has no search/filter at all.

---

## 5. Honest "AI-generated" Critique

### What reads as templated / generic, and why
- **Buzzword-dense copy.** Phrases like *"turn operational chaos into intelligent, self-managing systems,"* *"real teams, real decisions, real operational pressure,"* and *"Two Disciplines. One Engineer."* are the rhetorical cadence of generated landing-page copy. The same tagline *"Automation built for real teams…"* is **duplicated verbatim** on Home and Projects.
- **Every section is a glass card with the same treatment** — pill badge → gradient H1 (`-0.03em`) → muted subtitle → glassy cards with cursor spotlight + ambient glow. It's polished but homogeneous; nothing distinguishes one section's visual identity from another.
- **Effect maximalism.** Typewriter, magnetic tilt, 3D card tilt, cursor spotlight, shimmer, marquee, sparkles, breathing quote mark, conic animated borders, drifting glow orbs, noise overlay — the *presence* of many trendy effects at once is itself a tell. They signal "impressive" more than they serve content.
- **Emoji as iconography** (☁️⚙️🤖📡🐳🔷💬📲) alongside Heroicons is a generated-portfolio signature; inconsistent icon language.
- **Filler precision:** "~60%" exam prep, round "3+/5+" stats, and a shader-demo page of pure template text.

### Accessibility issues
- **Focus states removed without replacement.** `focus:outline-none` on nav links, the Hire-Me button, logo, and hamburger; only a global `:focus-visible { outline: 1px solid rgba(255,255,255,0.5) }` partially covers it. The ContactForm is the only place with a strong, intentional focus style. Keyboard users will lose track of position in the nav.
- **Contrast risks.** Muted text `#71717A` on `#0A0A0A` ≈ **3.9:1** — fails WCAG AA (4.5:1) for the small body/caption text it's used for (subtitles, mono-labels, footer). `#52525B` (footer copyright) on black is **~2.8:1** — clearly failing. Many secondary lines use `#71717A`.
- **Hover-only affordances done via JS inline handlers** (`onMouseEnter`/`Leave` mutating `style`) don't fire for keyboard/touch and aren't in `:hover`/`:focus` CSS — so focus doesn't get the same emphasis.
- **No `prefers-reduced-motion`** anywhere — continuous infinite animations (marquee, ambient drift, glow pulse, shimmer, sparkle, border rotate) run regardless, a vestibular concern.
- **Semantics:** multiple **`<h1>`s on `/projects`** (two section `<h1>`s + the flagship `<h2>`), heading hierarchy is inconsistent across pages. Accordion buttons in AutomationSystems lack `aria-expanded`. The marquee/decorative layers are mostly `aria-hidden`, which is good.
- **Form honesty:** ContactForm shows "✓ Message sent!" after merely opening WhatsApp; if the user blocks the popup, they get a false success.

### Performance concerns
- **`output: 'export'` is gated on `NODE_ENV==='production'`** only — fine for Netlify, but `images.unoptimized:true` means no responsive image pipeline; `tafara-rugara.jpg` is **~504 KB** served as-is.
- **Whole site is client-rendered** (`'use client'` everywhere, several components `ssr:false`), forfeiting App Router server-rendering benefits; Certifications/Testimonial/ContactForm/AnimatedBackground are all client-only dynamic imports.
- **framer-motion on nearly every element** plus many always-running CSS animations (8 infinite keyframe loops) = continuous main-thread/compositor work, notably the `backdrop-filter: blur()` on the fixed nav + many cards.
- **Two font stacks loaded** (Syne via next/font **and** Inter via CSS `@import`) — the Inter import is wasted bytes and a render-blocking external CSS request.
- **Dead code shipped's risk:** ProjectGrid/ProjectCard/shader-demo add to the bundle/route map without delivering value (shader-demo also compiles a WebGL shader on a route nobody reaches).

### Spacing / type / color inconsistencies
- **Font mismatch:** config/CSS say Inter; app renders Syne (var misnamed `--font-space-grotesk`). Three different sources of truth for typography.
- **Section vertical rhythm** varies `py-10/14/16/20`, `mb-16/20/24` with no rule.
- **Corner radius language** is incoherent: 16px cards, 12px glass, 6px buttons, 4px badges, 20px pills, 2px dots, and **0px sharp inputs** in ProjectGrid.
- **Shadow policy contradiction:** Tailwind declares `card: none` / "depth via borders only," yet glow box-shadows are applied inline throughout.
- **Token bypass:** defined CSS vars and Tailwind colors exist but components hardcode the same hex literals, so any redesign requires find/replace across files rather than editing tokens.
- **Magic colors** with no token: `#52525B`, `#EF4444`/`rgba(239,68,68)`, cert `#FF9900`/`#00D4FF` (defined-but-unused).

---

## 6. Salvage vs. Rebuild

| Keep | Why | Tear out | Why |
|---|---|---|---|
| `data/portfolio.ts` content model + `types/` | Clean, typed, single source of truth; redesign can reskin without touching content. | The **triple, conflicting token system** (CSS vars vs Tailwind vs inline hex) | Pick one source of truth (recommend Tailwind theme or CSS vars) and drive everything from it. |
| Next.js 15 App Router + Netlify static-export pipeline + `netlify.toml` (security headers, CSP, caching, Forms) | Solid, working deploy/security baseline worth preserving. | All **inline `style={{}}` hardcoded hex/rgba** | Biggest redesign blocker; migrate to tokens/Tailwind utilities. |
| SEO/StructuredData/sitemap/robots, ErrorBoundary, error/not-found routes | Real infra you don't want to rebuild. | **`ProjectGrid.tsx` + `ProjectCard.tsx`** (dead) | Never rendered; either wire them into `/projects` or delete — don't carry dead UX. |
| Test + Lighthouse + Playwright harness | Lets you redesign with a safety net. | **`/shader-demo` + `ui/animated-shader-hero.tsx`** | Orphaned template page with placeholder copy; decide in or out, currently neither. |
| Component **structure/decomposition** (Hero, Timeline, Cards, ContactForm logic) | Good separation; rebuild can keep the component boundaries and re-style. | **`Navigation.orig.tsx`** and create-next-app SVGs in `public/` | Stale/leftover; pure noise. |
| ContactForm's **focus styling + validation** | The one genuinely accessible, well-built interaction; use it as the a11y baseline. | The **dual submit story** (Netlify Forms attrs + WhatsApp redirect + fake "sent" toast) | Decide one real channel; current behavior misleads users. |
| The monochrome-zinc *direction* (intent is coherent) | A defensible aesthetic to refine. | **Effect overload + duplicated taglines + generic copy** | Cut effects to a deliberate few; rewrite copy in a specific human voice; add reduced-motion + real focus rings; fix `#71717A`/`#52525B` contrast. |

### Top redesign priorities (derived from the above)
1. **Consolidate design tokens** to one system; eliminate inline hex. (Unblocks everything else.)
2. **Fix the font contradiction** (Inter vs Syne) and define a real type scale.
3. **Restore visible focus states** + add `prefers-reduced-motion`; raise muted-text contrast to ≥4.5:1.
4. **Resolve dead/orphaned code** (ProjectGrid/ProjectCard, shader-demo, Navigation.orig) — adopt or delete.
5. **Make the contact flow honest**; pick one submission path.
6. **Deepen thin content** (more experience/testimonials, an About, per-project detail routes) and **rewrite generic copy**.
7. Trim effect maximalism to a deliberate, content-serving set.
