# MR Delights — Storefront Prototype

Browse-only premium dry-fruit storefront (React 19, Vite, Tailwind v4, Zustand,
React Router, Framer Motion). Runs entirely on **mock data** — no backend.
Orders are composed into a WhatsApp message.

## Run locally

    npm install
    npm run dev

## Where things live

- `src/Data/mockProducts.js` — the demo catalogue (edit names, prices, stock)
- `src/Assets/products/<seed-slug>/` — product photos, matched to a product by
  name (`Pumpkin Seed` -> `pumpkin-seed/`). Any file names, 1 or more photos.
  Products without a folder fall back to their category image.
- `src/Assets/{hero,dates,nuts,figs,seeds}.jpg` — hero / category tiles
- `src/Api/root.js` — mock "API"; swap back to axios calls to use a real backend

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Vercel > Add New > Project > import the repo. Framework: **Vite**
   (build `npm run build`, output `dist` — auto-detected).
3. Deploy. `vercel.json` already handles deep links like `/product/almond`.

Optional environment variables are listed in `.env.example`.
