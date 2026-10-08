# ARCVRAX Studio Website

Premium architectural visualization studio website built with React, Vite, Three.js / React Three Fiber and GSAP.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Replace the demo content

- Replace the Unsplash project URLs in `src/main.jsx` with your ARCVRAX renders.
- Replace the procedural Three.js model in `ArchitectureModel()` with your GLB/GLTF architectural model.
- Add your real showreel/video in the Showreel section.
- Change `hello@arcvrax.com` to your actual business email if different.
- The site currently uses the ARCVRAX cream / black / warm-gold direction:
  - #F8F5EF
  - #111111
  - #B7790A

## Suggested next production step

Use a real optimized `.glb` model for the hero and a compressed WebM/MP4 showreel. For a client-facing launch, self-host the media or use a CDN rather than remote demo images.
