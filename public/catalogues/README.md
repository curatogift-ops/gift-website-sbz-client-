# Catalogue PDFs for Download Catalogue Library

Files here are served at `/catalogues/<filename>`.

## Local development
```bash
# Sync from the source Drive export folder
./scripts/sync-catalogues.sh

# Or extract committed zip bundles
npm run extract-catalogues
```

## Production (Vercel)
`npm run build` extracts `catalogue-bundles/catalogues-part-*.zip` into this
folder so real PDFs ship with the site (instead of the SPA `index.html` fallback).
