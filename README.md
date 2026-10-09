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

- The Business Forge is an interactive, multi-select diagnostic that connects common business friction to practical starting points.
- Forgewell Lab contains illustrative workflow and website-system demonstrations. They are examples, not client results.
- The assessment builds a working brief in the browser and can copy it to the clipboard. It does not transmit or persist answers.
- Consultation preferences include Zoom and FaceTime. Scheduling, payment, and CRM submission are not connected yet.

## Technology choices

- React, TypeScript, and Vite provide the application foundation.
- GSAP and `@gsap/react` choreograph a single scoped hero entrance. The animation is reverted through the React hook lifecycle and omitted for reduced-motion preferences.
- The diagnostic uses semantic HTML with CSS and SVG system diagrams. Three.js / React Three Fiber are not loaded because this experience is better served by a fast, legible 2D system map.
- Scrolling stays native; Lenis is not included so browser and assistive-technology behavior remain predictable.

The assessment and consultation flow should connect to a CRM or scheduling provider only after those services and privacy requirements are selected.
