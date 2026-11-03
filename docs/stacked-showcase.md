# Stacked showcase preview

The designer package is implemented within the existing Next.js application; the working content and integrations remain authoritative.

- A compact, manually inspectable AI/application/cloud sequence replaces the orbiting core. Actual Munda, Trevis and Litho interfaces form the hero fan; the sequence is explicitly illustrative.
- Six project panels use the seven approved screenshots, including ProAir’s alternate contact image. Direct project anchors and a skip link avoid forced sequential browsing.
- Native sticky positioning is limited to wide, sufficiently tall screens. Phone, short-screen, paused and reduced-motion layouts use normal flow. No scroll interception or rendering library was added.
- Warm cream/copper light mode and warm charcoal dark mode extend to all six routes. Inner-page cards, forms, buttons and typography share the revised treatment.
- Availability is static and explicitly includes Harare, Zimbabwe and South Africa. The brand marker is also static.
- Existing PDF files, contact draft handoffs, project data and Cal.com booking integration are retained.

## Verification

- Production build and type validation passed.
- 18 focused interaction tests passed (4 suites).
- Export verification: 6 routes, 139 internal links, 19 PDF download links; current PDF hashes and a real 404.
- Browser QA: desktop light/dark; all six routes at phone/tablet widths without horizontal overflow; short-screen normal-flow fallback; mobile menu Escape; screenshot viewer loading, Escape and focus restoration; revised hero footprint and tablet headline.
- Full legacy suite, full E2E and Lighthouse were not run. Existing Browserslist/ESLint configuration warnings remain.
- Publish to the existing draft PR preview only. Production is unchanged.
