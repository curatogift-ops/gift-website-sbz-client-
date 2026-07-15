# Catalogue PDF bundles

ZIP parts under 60MB so GitHub can store them. Vercel runs
`python3 scripts/extract-catalogues.py` during `npm run build`, which unpacks
these into `public/catalogues/` before Vite copies them to `dist/`.

Individual PDFs stay gitignored (too large as loose files in Day-to-day work).
Rebuild packs locally with the sync + pack flow if source files change.
