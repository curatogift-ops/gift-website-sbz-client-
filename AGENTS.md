# Gift website client (React + Vite)

This project is a **React SPA** built with Vite, React Router, and Tailwind CSS v4.

## Conventions

- Pages live in `src/pages/`; routes are defined in `src/App.tsx`.
- Use `react-router-dom` (`Link`, `useLocation`) for in-app navigation — not Next.js.
- Use `AppImage` from `src/components/ui/AppImage.tsx` instead of `next/image`.
- API base URL: `import.meta.env.VITE_API_URL` (see `.env.example`).
- Run `npm run dev` for local development; `npm run build` outputs to `dist/`.
