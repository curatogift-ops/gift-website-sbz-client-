# Giftz Gallerei — React client

Premium corporate and personalized gifting website built with **React**, **Vite**, **React Router**, and **Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and production build to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Environment

Copy `.env.example` to `.env` and set:

```
VITE_API_URL=http://localhost:8001/api/v1
```

## Project structure

```
src/
  pages/          # Route-level pages
  components/     # UI components
  lib/            # API client
  App.tsx         # React Router routes
  main.tsx        # App entry
```

Static assets live in `public/` (e.g. `hero-new.png`, `images/`).
