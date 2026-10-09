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
