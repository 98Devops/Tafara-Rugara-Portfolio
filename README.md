# Tafara Rugara Portfolio — Automation Engineer

**AI workflows · CRM automation · API integrations**

[Live portfolio](https://tafara.netlify.app) · [PDF CV](https://tafara.netlify.app/documents/tafara-rugara-automation-engineer-cv.pdf) · [Word CV](https://tafara.netlify.app/documents/tafara-rugara-automation-engineer-cv.docx) · [GitHub](https://github.com/98Devops) · [Contact](mailto:tfrsuperfx@gmail.com)

Portfolio and CV for remote Automation Engineer contracts with teams in Zimbabwe, South Africa and internationally. Based in **Harare, Zimbabwe (UTC+2)**.

The site connects business outcomes to implementation evidence: CRM workflow repair, AI orchestration, reliable data processing and production software delivery.

## Features and selected work

| Work | Operational outcome | Stack and evidence |
| :--- | :--- | :--- |
| **Clear Elevation CRM automation** | Repaired 7 triggers and delivered 3 patient lifecycle workflows across an existing retention system. | GoHighLevel, Zapier, Practice Better. Commercial work summarized in the CV and experience page. |
| **Trevis property operations** | Consolidated 4 spreadsheets for 130+ tenants across 4 properties; automated integrity checks and owner reporting. | React, Supabase, PostgreSQL, Vitest. [Source](https://github.com/98Devops/trevis-app) |
| **Delivery health intelligence** | A 27-node pilot for task normalization, AI validation, ClickUp updates, alert aggregation and manual review. | n8n, JavaScript, Gemini, ClickUp. [Workflow and documentation](https://github.com/98Devops/AI-Powered-Delivery-Health-Operations-Intelligence-System) |
| **Voice-to-Vector** | Structured voice-note storage and semantic retrieval through API endpoints. | Python, Flask, Qdrant, SentenceTransformers. [Source](https://github.com/98Devops/Voice-to-vector) |

## Technology Stack

- **Automation:** n8n, GoHighLevel, Zapier, CRM workflows, lifecycle routing and reporting.
- **Engineering:** JavaScript, TypeScript, Python, Node.js, Flask, REST APIs, JSON and SQL.
- **AI systems:** LLM integration, prompt engineering, structured output validation and vector search.
- **Delivery:** Docker, Linux, AWS, DigitalOcean, GitHub Actions, workflow QA and documentation.

## CV downloads

The CV uses a single-column layout, standard section headings and selectable text. Both formats contain the same experience and automation-focused keywords; no format can guarantee a result in every applicant tracking system.

| File | Purpose |
| :--- | :--- |
| `public/documents/tafara-rugara-automation-engineer-cv.pdf` | Primary one-page CV linked from the homepage, footer and contact page. |
| `public/documents/tafara-rugara-automation-engineer-cv.docx` | Editable version for applications that request Word. |
| `public/documents/tafara-rugara-cv.pdf` | Compatibility copy for existing incoming links. |

Document responses require revalidation so future CV changes are not held behind a year-long browser cache. When updating the CV, replace both PDF copies and the DOCX together.

## Getting Started

This portfolio website uses **Next.js 15, React 18, TypeScript, Tailwind CSS and Framer Motion**, with a static export hosted on Netlify.

### Prerequisites

Use Node.js 22.19 or newer and npm for compatibility with the installed Lighthouse tooling.

### Installation

```bash
npm ci --legacy-peer-deps
```

### Development

Run the development server with \`npm run dev\` and open http://localhost:3000.

```bash
npm run type-check
npm run build
```

## Deployment

The production export is written to `out/`. The checked-in GitHub Actions workflow includes a deployment job on pushes to `main`; deployment requires the repository's existing Netlify configuration and credentials.

## Project Structure

| Location | Responsibility |
| :--- | :--- |
| `src/app/` | Next.js App Router pages and route metadata |\n| `src/components/` | Reusable components for presentation and interaction |\n| `public/` | Static assets and documents |\n| `e2e/` | Playwright browser scenarios |\n| `src/data/portfolio.ts` | Profile, experience, capability lists, project evidence and headline metrics |
| `src/components/Hero.tsx` | Homepage positioning and CV download actions |
| `src/components/SEO.tsx` | Page metadata and structured data |
| `public/documents/` | CV formats, reference letter and project documentation |
| `netlify.toml` | Hosting, security and cache headers |

Recruiter-facing claims should stay consistent across the CV, profile README and site. Employment dates follow the supplied CV; commercial work, live products and pilots are identified separately.

**Contact:** [tfrsuperfx@gmail.com](mailto:tfrsuperfx@gmail.com) · [LinkedIn](https://www.linkedin.com/in/tafara-rugara-0627b819b/) · [Tech With Tafara](https://www.youtube.com/@techwithtaf)

## Testing and quality

The project uses Jest, React Testing Library and Playwright. Type checking and a production build validate the source and static export. Check performance with Lighthouse; do not report a score unless it has been measured.

```bash
npm test -- --runInBand --watchAll=false
npm run test:e2e
npm run lighthouse
```

## Maintenance and feedback

Keep CV versions, download links, employment dates and profile claims synchronized. Report issues or propose a pull request in this repository. Contact the author for feedback or license and reuse questions.

The deployment environment requires a valid `NETLIFY_AUTH_TOKEN` and the correct `NETLIFY_SITE_ID` in GitHub Actions secrets. If Netlify returns Unauthorized, renew the account token and confirm access to the existing site, then rerun the deployment job. See [DEPLOYMENT.md](DEPLOYMENT.md) and [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for supporting guidance.
