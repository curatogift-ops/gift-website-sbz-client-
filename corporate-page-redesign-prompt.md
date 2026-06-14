# Corporate Gifting Page — Full Redesign Prompt for Claude Opus 4.6

---

## CONTEXT

You are rebuilding the **corporate gifting landing page** for **Giftz Gallerei**, a premium B2B corporate gifting brand based in Bangalore, India.

The current page has critical design problems that make it look generic and low-quality:

### CURRENT PROBLEMS TO FIX
1. **Visual monotony** — Every section uses the same card layout, same padding, same font weights. Nothing feels distinct.
2. **Inconsistent color usage** — The brand's dark maroon/red (`#8B1A2E`) is applied randomly without logic. Accent colors fight each other.
3. **Typography is flat** — There is no meaningful size or weight hierarchy. H2s, H3s, and body text are too visually close.
4. **Section identity is zero** — Eco Gifting, Events, Trophy/Awards, How It Works, Why Choose Us, Testimonials — all look like they belong to different random templates.
5. **Hero is weak** — The banner doesn't communicate premium or corporate scale. It reads as a generic e-commerce site.
6. **Product grid is repetitive** — Cards in the Eco Friendly section, Events section, and Awards section all look identical — same white box, same proportions, no visual storytelling.
7. **The masonry photo grid (mid-page)** — Has potential but is unintentional and random.
8. **Contact forms appear twice** — The "Get In Touch" section is duplicated (once in the middle and again near the bottom), causing confusion.
9. **"Why Choose Us" section** — Tiny icon boxes in a grid that feel like a 2015 Bootstrap website.
10. **Footer** — Dense, unorganized, hierarchically confusing.
11. **Overall spacing** — Section top/bottom padding is inconsistent, causing a cramped vs. airy feel that flips randomly.

---

## YOUR TASK

Rebuild this entire corporate gifting page from scratch as a **single-file HTML page** (HTML + CSS + minimal vanilla JS). No external CSS frameworks. No Bootstrap. No Tailwind.

---

## BRAND IDENTITY

**Brand:** Giftz Gallerei
**Tagline:** "We create meaningful gifting experiences together."
**Audience:** Corporate procurement managers, HR teams, event planners at mid-to-large companies in India
**Tone:** Premium but warm. Sophisticated but not cold. Indian sensibility with global polish.
**Core value proposition:** One-stop gifting partner for corporate bulk orders — eco-friendly products, custom trophies, event gifting, hampers, branded merchandise.

---

## DESIGN DIRECTION

### Color System (use EXACTLY these tokens as CSS variables)
```css
:root {
  --brand-deep:     #1A0A0F;   /* near-black with warmth — backgrounds */
  --brand-maroon:   #8B1A2E;   /* primary brand accent */
  --brand-gold:     #C9A84C;   /* premium accent — CTAs, borders, highlights */
  --brand-cream:    #F7F2EC;   /* light section backgrounds */
  --brand-ivory:    #FDFAF6;   /* card backgrounds, form areas */
  --brand-muted:    #6B5E5E;   /* secondary body text */
  --brand-border:   #E8DDD0;   /* subtle dividers */

  /* Section-level background alternation */
  --section-dark:   #0F0507;
  --section-warm:   #F7F2EC;
  --section-mid:    #1E0E13;
}
```

### Typography
```css
/* Import these from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400&display=swap');

:root {
  --font-display: 'Playfair Display', serif;   /* Hero headlines, section titles */
  --font-body:    'DM Sans', sans-serif;        /* All body copy, nav, cards */
  --font-mono:    'DM+Mono', monospace;         /* Labels, stats, tags */
}
```

### Type Scale
- **Display (hero H1):** 72–96px, Playfair Display 900, letter-spacing -1px
- **Section Title (H2):** 48–56px, Playfair Display 700
- **Card Title (H3):** 20–24px, DM Sans 500
- **Body:** 16–18px, DM Sans 300, line-height 1.7
- **Label/Tag:** 11–12px, DM Mono 400, uppercase, letter-spacing 2px
- **CTA Text:** 14px, DM Sans 500, uppercase, letter-spacing 1.5px

---

## SECTION-BY-SECTION REDESIGN SPEC

### 1. NAVIGATION
- Sticky, height 64px
- Left: Logo (Giftz Gallerei wordmark — use styled text if no image)
- Center: Nav links — Corporate Gifting | Eco Products | Trophies & Awards | Events | Blog | Contact
- Right: "Get a Quote" button — gold border, transparent fill, gold text. On hover: fills with gold.
- Background: `var(--brand-deep)` with a very subtle bottom border in gold at 15% opacity
- On scroll > 80px: add backdrop-blur, slight dark overlay

### 2. HERO SECTION
**DO NOT use a generic image slideshow. Use a bold typographic hero with a product visual offset.**

Layout: Full-width, min-height 90vh, dark background (`var(--section-dark)`).

Structure:
- Left 60%: 
  - Small tag label in gold mono font: `INDIA'S PREMIUM CORPORATE GIFTING PARTNER`
  - H1 headline across 3 lines, Playfair Display italic + weight mix:
    ```
    Gifts That Make
    Your Brand
    Unforgettable.
    ```
  - Subline (DM Sans 300, 18px, cream, 60% opacity): "From eco-friendly hampers to boardroom trophies — curated gifting solutions for 50+ companies across India."
  - Two CTAs side-by-side:
    - Primary: "Explore Collections" — filled maroon button with gold text
    - Secondary: "Request a Quote" — outlined gold button
  - Below CTAs: 3 stat pills in a row — `500+ Clients` | `10,000+ Orders` | `0% Commission`
    - Each pill: gold dot + stat number in Playfair bold + label in DM Mono

- Right 40%:
  - Tall asymmetric image collage: 3 overlapping product images at different z-levels
  - Images slightly rotated (-3deg, 0deg, +4deg)
  - Background element: soft radial gradient glow in maroon

### 3. TRUST BAR (client logo strip)
- Background: `var(--brand-cream)`
- Single line, horizontally scrolling (CSS animation) logos of client brands
- Label above: `TRUSTED BY LEADING BRANDS` in DM Mono uppercase gold
- Logos in greyscale, 50% opacity — on hover: full color

### 4. ECO FRIENDLY CORPORATE GIFTING
**Visual identity: organic, warm, earthy — feel like a premium sustainability catalog**

Layout: Alternating light/dark pattern. Section bg: `var(--brand-cream)`

- Section eyebrow: `🌿 ECO GIFTING` in DM Mono
- H2: "Thoughtfully Crafted. Consciously Gifted."
- Subtext: short paragraph on the brand's eco commitment

Product cards — BREAK THE GRID:
- Use a **magazine-style asymmetric masonry layout** — NOT a regular 4-column grid
- Flagship card: spans 2 columns, tall portrait image, price + name overlay at bottom on dark gradient
- Smaller cards: square format, image dominant, minimal text below
- Hover effect: image scales 1.05, a gold border appears, price fades in
- "View All Eco Products" CTA link at bottom right — arrow styled with gold

### 5. PRODUCT PHOTO GALLERY (currently a random masonry grid)
**Repurpose as a brand mood section**

- Title: "A Glimpse Into Our Gifting World"
- Tighten into a clean 3×3 + 1 wide masonry — intentional, editorial
- Light gap (4px), no borders
- Hover: darkens image + shows category label in white DM Mono
- CTA below: "Browse Full Catalog →"

### 6. EVENTS & CONFERENCES
**Visual identity: dynamic, professional, event energy**

Background: `var(--section-mid)` — dark maroon-tinted

- Eyebrow: `🏆 EVENTS & CONFERENCES` in gold mono
- H2 in Playfair cream: "Make Every Event Memorable"
- Layout: **horizontal scroll cards** on mobile, **3-column with a featured wide card** on desktop
- Featured card (spans 2 cols): Large image, dark gradient overlay, white headline, gold CTA
- Smaller cards: portrait format, category tag, product name, starting price
- Card interaction: border glows gold on hover, slight translateY(-4px) lift

### 7. TROPHY & AWARDS
**Visual identity: celebratory, prestigious, formal**

Background: `var(--brand-ivory)` — clean white with warmth

- Eyebrow: `🥇 RECOGNITION & APPRECIATION` in maroon mono
- H2: "Honor Excellence. Leave a Legacy."
- Layout: 3-column grid — Crystal Awards | Trophies | Metal Plaques
- Each card: large product image (transparent bg if possible, or white card), name, customization note
- Below card: "Custom Engraving Available" note in gold italic
- Section footer: "Need bulk orders? [Get a Custom Quote →]" — gold link

### 8. HOW IT WORKS
**Current problem: looks like a generic step card grid. Fix: make it feel like a real process journey.**

Background: dark — `var(--section-dark)`

- H2 in Playfair cream: "How It Works"
- Layout: **horizontal timeline** on desktop, vertical on mobile
- 5 steps connected by a gold dashed line:
  1. Share Your Brief → 2. We Curate Options → 3. You Approve Samples → 4. We Handle Bulk → 5. Delivered On Time
- Each step:
  - Step number in large Playfair 900 gold (faded, background-like)
  - Icon in circle
  - Step title DM Sans 500 cream
  - 1-line description DM Sans 300 muted

### 9. WHY CHOOSE US
**Current problem: looks like 2015 Bootstrap icon boxes. Fix: bold statement layout.**

Background: `var(--brand-cream)`

- H2: "Why Giftz Gallerei?"
- Layout: **2-column — left side large bold reasons as numbered statements; right side an image or product visual**
- Each reason: Large Playfair number (01, 02...) in maroon, bold DM Sans 500 headline, 1-line body
- Right side: tall editorial image of a curated gift hamper or trophy display

### 10. TESTIMONIALS
**Current problem: generic star-rating cards in a row.**

Background: `var(--section-mid)` — dark

- Eyebrow: `WHAT OUR CLIENTS SAY` in gold mono
- H2 in Playfair italic cream: "Stories From Our Partners"
- Layout: **Large featured quote** center-aligned, Playfair italic 32px, cream — no card border
- Below: avatar + name + company + 5 stars in gold
- Navigation: left/right arrows to cycle quotes (fade transition)
- Below quote section: horizontal strip of brand logos (same as trust bar)

### 11. GET IN TOUCH (ONE instance only — remove the duplicate)
**Combine both contact sections into one, placed near the bottom before footer.**

Layout: Split 50/50
- Left: Dark bg (`var(--section-dark)`)
  - H2: "Let's Build Something Memorable"
  - 3 contact info rows: 📞 Phone | ✉️ Email | 📍 Location
  - Subtle product image or texture in background
- Right: Light bg (`var(--brand-ivory)`)
  - Clean form:
    - Name
    - Company Name
    - Email
    - Phone
    - Type of Gifting (dropdown: Corporate Hampers / Trophies / Event Gifting / Eco Products / Other)
    - No. of Units (input)
    - Message
  - Submit button: full-width maroon with gold text
  - Label above: `NO COMMISSION. JUST GREAT GIFTS.` in gold mono

### 12. FAQ
Background: `var(--brand-cream)`
- H2: "Frequently Asked Questions"
- Accordion style — smooth max-height transition on open
- Gold arrow rotates 90° on open
- Max 6 questions

### 13. FOOTER
Clean, structured, premium.

Background: `var(--brand-deep)`, golden top border (2px)

Grid: 4 columns
- Col 1: Logo + brand tagline + social icons (Instagram, LinkedIn, WhatsApp)
- Col 2: Products — Eco Gifting, Hampers, Trophies, Custom Merchandise
- Col 3: Company — About, Blog, Our Clients, Careers
- Col 4: Contact — email, phone, address

Bottom bar: Copyright + "Designed with ♥ in Bangalore" in DM Mono 11px gold

---

## ANIMATIONS

Use subtle, purposeful CSS animations only:

```css
/* Fade up on scroll — use IntersectionObserver */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Apply `.reveal` to: section headings, product cards (staggered 100ms delay per card), stat pills, timeline steps.

Hero H1: Each word animates in with a 150ms stagger on page load.

No heavy JS libraries. No GSAP. Pure CSS + vanilla IntersectionObserver.

---

## MOBILE RESPONSIVENESS

**Breakpoints:**
- Mobile: `max-width: 640px`
- Tablet: `max-width: 1024px`
- Desktop: `min-width: 1025px`

**Mobile rules:**
- Hero: Stack vertically. Hide product collage. Headline drops to 44px.
- Nav: Hamburger menu. Slide-in drawer.
- All multi-column layouts collapse to single column.
- Timeline becomes vertical.
- Contact section: Stack, form below info.
- Trust bar scroll continues on mobile (touch-scroll).

---

## CODE REQUIREMENTS

1. Single HTML file with `<style>` and `<script>` inline
2. No Bootstrap, no Tailwind, no jQuery
3. Google Fonts loaded via `@import`
4. All CSS as custom properties from the token system above
5. IntersectionObserver for scroll reveals
6. Smooth scrolling on anchor links
7. No broken overflow at any screen width
8. All form inputs must have proper focus states (gold outline)
9. Accessible: `aria-label` on icon-only buttons, `alt` on all images
10. Placeholder images from `https://placehold.co/` — sized appropriately
11. Use real placeholder content matching the brand (not Lorem Ipsum)

---

## QUALITY CHECKLIST (verify before output)

- [ ] No section looks like any other section
- [ ] Color alternation is used intentionally across sections (dark → light → dark → light)
- [ ] Typography hierarchy is visually obvious without reading the text
- [ ] No duplicate contact form
- [ ] Hero has genuine visual impact
- [ ] All cards have hover states
- [ ] Scroll reveal animations are applied
- [ ] Mobile nav collapses correctly
- [ ] FAQ accordion works
- [ ] Testimonial slider cycles
- [ ] Footer is clean and legible on dark background
- [ ] No Lorem Ipsum text
- [ ] No generic AI-sounding copy

---

## OUTPUT FORMAT

Output the complete single HTML file. No explanations before or after. Just the code, starting with `<!DOCTYPE html>`.
