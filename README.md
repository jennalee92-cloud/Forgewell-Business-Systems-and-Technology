# Forgewell

Forgewell's website is the first demonstration of its business-systems approach: identify operational friction, then show how technology and process can make work clearer.

## Run locally

```sh
npm install
npm run dev
```

The production checks are:

```sh
npm run build
npm run lint
```

## Experience

- The Business Forge is an interactive, multi-select diagnostic that connects common business friction to practical starting points; it is not a lead score or quote.
- Forgewell Lab contains illustrative workflow and website-system demonstrations. They are examples, not client results.
- Services are organized around Build, Automate, and Optimize, with audience, problem, and deliverable descriptions.
- The project inquiry validates required fields and prepares a `mailto:` draft to Forgewell. The visitor must send it from their email app; the website has no server-side email delivery, spam protection, or CRM integration.
- Scheduling and payment are not connected. The site does not claim that an email draft was sent.

## Technology choices

- React, TypeScript, and Vite provide the application foundation.
- GSAP and `@gsap/react` choreograph a single scoped hero entrance. The animation is reverted through the React hook lifecycle and omitted for reduced-motion preferences.
- The diagnostic uses semantic HTML with CSS and SVG system diagrams. Three.js / React Three Fiber are not loaded because this experience is better served by a fast, legible 2D system map.
- Scrolling stays native; Lenis is not included so browser and assistive-technology behavior remain predictable.

The assessment and consultation flow should connect to a CRM or scheduling provider only after those services and privacy requirements are selected.

The static sitemap and robots file use the current Vercel production URL. Update those URLs and the canonical metadata when a custom domain is established.

## Service architecture

- `/services` is the service discovery overview. Each of its seven categories has a dedicated `/services/<slug>` detail route, with relevant internal links and route-specific title, description, Open Graph, and canonical metadata.
- `/assessment` is a client-only questionnaire. Answers stay in the current browser until the visitor explicitly opens a `mailto:` draft; the website does not store or submit assessment answers.
- `vercel.json` rewrites the service and assessment paths to the Vite entry document so direct navigation and refresh work on Vercel. The app selects the page from the pathname; no routing dependency is required.
- `public/sitemap.xml` lists the homepage, Services overview, assessment, and seven service details.
- The portfolio slot is intentionally empty until verified client work is available. Forgewell Lab remains a set of illustrative demonstrations, not case studies.

## Inquiry and consultation limits

- Project inquiries continue to use the existing homepage form, which prepares a prefilled email draft. The visitor reviews and sends that draft from their email app; there is no server-side form delivery.
- The assessment can also prepare an email draft containing its preliminary summary after an explicit visitor action. It does not produce a professional audit or definitive diagnosis.
- Consultation links open an inquiry email only. No online booking provider, consultation price, duration, availability, or payment flow is configured; scope and any fee must be agreed before scheduling.
- Do not present the assessment, email drafts, or consultation inquiry as an automated submission or confirmed booking.
