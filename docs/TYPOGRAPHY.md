# Giftz Gallerei — Typography System

Premium luxury gifting typography inspired by modern brands (e.g. BoxUp), tuned for corporate + ecommerce.

## Font pairing (final)

| Role | Font | Tailwind class | Usage |
|------|------|----------------|--------|
| UI & body | **Inter** | `font-sans` | Nav, body, buttons, product UI, corporate labels |
| Headings & hero | **Playfair Display** | `font-serif` | H1–H4, hero headlines, product titles, section titles |
| Luxury accent | **DM Serif Display** | `font-accent` | Subheads, quotes, emotional / wedding-style copy |

### Fallback stacks

```css
--font-sans: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
--font-serif: "Playfair Display", ui-serif, Georgia, "Times New Roman", serif;
--font-accent: "DM Serif Display", ui-serif, Georgia, serif;
```

## Google Fonts (performance)

Loaded in `index.html` with `display=swap` and preload:

```
Inter: 400, 500, 600, 700
Playfair Display: 500, 600, 700 + italic 500
DM Serif Display: 400
```

## Type scale (CSS variables)

| Token | Mobile → Desktop | Use |
|-------|------------------|-----|
| `--font-size-display` | 2.25rem → 4rem | Hero H1 |
| `--font-size-h1` | 2rem → 3.5rem | Page titles |
| `--font-size-h2` | 1.75rem → 2.75rem | Section headings |
| `--font-size-h3` | 1.375rem → 2rem | Cards, subsections |
| `--font-size-h4` | 1.125rem → 1.5rem | Small headings |
| `--font-size-body` | 0.9375rem → 1.0625rem | Default body |
| `--font-size-body-lg` | 1rem → 1.25rem | Lede paragraphs |
| `--font-size-caption` | 0.6875rem | Nav, eyebrows |
| `--font-size-micro` | 0.625rem | Labels |

## Letter spacing

| Token | Value | Use |
|-------|-------|-----|
| `--letter-spacing-display` | -0.02em | Hero headlines |
| `--letter-spacing-eyebrow` | 0.28em | Overlines |
| `--letter-spacing-nav` | 0.1em | Navigation |
| `--letter-spacing-btn` | 0.18em | Buttons |
| `--letter-spacing-brand` | 0.14em | Logo wordmark |

## Utility classes

| Class | Description |
|-------|-------------|
| `hero-heading` | Playfair hero scale |
| `section-heading` | Playfair section title |
| `section-heading-corporate` | Inter uppercase B2B |
| `section-heading-gifting` | DM Serif emotional sections |
| `eyebrow` | Inter gold overline |
| `section-lede` | Inter body intro |
| `card-title` | Playfair product/card title |
| `btn-pill` | Inter CTA buttons |
| `nav-label` | Inter nav links |
| `text-luxury-accent` | DM Serif pull quotes |

## Section rules

- **Corporate pages:** sans eyebrows + labels; Playfair heroes; DM Serif quotes.
- **Shop / products:** Playfair titles; sans prices and UI.
- **Home hero:** Playfair H1 + DM Serif italic subline.
- **Buttons:** always `font-sans`, semibold, uppercase tracking.

## Tailwind v4

Fonts are registered in `src/index.css` under `@theme inline` as `--font-sans`, `--font-serif`, `--font-accent`, `--font-brand`.
