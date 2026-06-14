import type {
  DimensionSpec,
  ImageContentGuidance,
  ImagePurpose,
  ImageRequirement,
  ImageTechnicalSpec,
  PriorityLevel,
} from '@/types/imageRequirements';

const BRAND = {
  burgundy: '#6B1E30',
  darkWine: '#4A1020',
  gold: '#C9A96E',
  cream: '#F2EDE8',
  nearBlack: '#1A1010',
};

export function dim(
  width: number,
  height: number,
  retinaMultiplier = 2
): DimensionSpec {
  return {
    width,
    height,
    exportWidth: width * retinaMultiplier,
    exportHeight: height * retinaMultiplier,
  };
}

export function formatSize(d: DimensionSpec): string {
  return `${d.width}×${d.height}px (export ${d.exportWidth}×${d.exportHeight}px @2x)`;
}

function inferStatus(source?: string): ImageRequirement['status'] {
  if (!source) return 'missing';
  if (source.includes('unsplash.com') || source.includes('placeholder')) return 'placeholder';
  return 'production';
}

function buildDesignerBrief(
  imageName: string,
  sectionName: string,
  pageName: string,
  purpose: ImagePurpose,
  content: ImageContentGuidance,
  technical: ImageTechnicalSpec
): string {
  return [
    `Asset: ${imageName}`,
    `Location: ${pageName} → ${sectionName}`,
    `Purpose: ${purpose}`,
    '',
    'Creative direction:',
    `• Subject: ${content.subject}`,
    `• Composition: ${content.composition}`,
    `• Style: ${content.style}`,
    content.cameraAngle ? `• Camera: ${content.cameraAngle}` : '',
    content.lighting ? `• Lighting: ${content.lighting}` : '',
    `• Brand colors: ${content.brandColors}`,
    `• Mood: ${content.mood}`,
    content.textSafeArea ? `• Text safe area: ${content.textSafeArea}` : '',
    content.ctaSafeArea ? `• CTA safe area: ${content.ctaSafeArea}` : '',
    content.mobileCropNotes ? `• Mobile crop: ${content.mobileCropNotes}` : '',
    '',
    'Technical delivery:',
    `• Desktop: ${formatSize(technical.desktop)}`,
    `• Tablet: ${formatSize(technical.tablet)}`,
    `• Mobile: ${formatSize(technical.mobile)}`,
    `• Aspect ratio: ${technical.aspectRatio}`,
    `• Format: ${technical.format} at ${technical.compressionQuality}% quality`,
    `• Max file size: ${technical.maxFileSizeKb}KB`,
    `• Crop: ${technical.cropRules}`,
    `• Focal point: ${technical.focalPoint}`,
    technical.transparency ? '• Deliver with transparent background (PNG/WebP alpha)' : '• Full-bleed photo background (no transparency)',
  ]
    .filter(Boolean)
    .join('\n');
}

export interface BuildSlotOptions {
  id: string;
  pageName: string;
  pageRoute: string;
  sectionName: string;
  componentName: string;
  imageName: string;
  purpose: ImagePurpose;
  priority?: PriorityLevel;
  currentSource?: string;
  technical: ImageTechnicalSpec;
  content: ImageContentGuidance;
}

export function buildImageSlot(options: BuildSlotOptions): ImageRequirement {
  const designerBrief = buildDesignerBrief(
    options.imageName,
    options.sectionName,
    options.pageName,
    options.purpose,
    options.content,
    options.technical
  );
  return {
    ...options,
    status: inferStatus(options.currentSource),
    designerBrief,
  };
}

export function heroBannerSlot(opts: {
  id: string;
  pageName: string;
  pageRoute: string;
  sectionName: string;
  componentName: string;
  imageName: string;
  variant: 'desktop' | 'mobile';
  currentSource?: string;
  subject: string;
  textSafeArea: string;
  ctaSafeArea?: string;
  focalPoint: string;
  mobileCropNotes?: string;
}): ImageRequirement {
  const isMobile = opts.variant === 'mobile';
  const desktop = dim(1920, 820);
  const tablet = dim(1280, 560);
  const mobile = dim(750, 1200);

  return buildImageSlot({
    id: opts.id,
    pageName: opts.pageName,
    pageRoute: opts.pageRoute,
    sectionName: opts.sectionName,
    componentName: opts.componentName,
    imageName: `${opts.imageName} (${opts.variant})`,
    purpose: 'Hero Banner',
    priority: 'Critical',
    currentSource: opts.currentSource,
    technical: {
      desktop: isMobile ? mobile : desktop,
      tablet: isMobile ? mobile : tablet,
      mobile: isMobile ? mobile : mobile,
      aspectRatio: isMobile ? '5:8' : '21:9',
      format: 'WebP + JPG fallback',
      compressionQuality: 82,
      retinaExport: isMobile ? dim(750, 1200, 3) : dim(1920, 820, 2),
      maxFileSizeKb: isMobile ? 350 : 450,
      minFileSizeKb: 120,
      cropRules: isMobile
        ? 'object-cover, object-position center 30%. Keep gift boxes in lower two-thirds; headline overlays top third.'
        : 'object-cover. Primary subject right-of-center (65% horizontal). Left 40% reserved for headline overlay.',
      safeArea: opts.textSafeArea,
      focalPoint: opts.focalPoint,
      transparency: false,
    },
    content: {
      subject: opts.subject,
      composition: isMobile
        ? 'Vertical hero with premium gift boxes stacked in lower frame, soft cream negative space above for headline.'
        : 'Wide cinematic banner — curated hampers and keepsakes arranged on the right, generous negative space on left.',
      style: 'Luxury editorial product photography, warm natural tones, subtle film grain',
      cameraAngle: isMobile ? 'Slightly elevated 15° angle' : 'Eye-level wide shot, 35mm lens equivalent',
      lighting: 'Soft diffused window light with warm gold rim highlights',
      brandColors: `Burgundy ${BRAND.burgundy}, gold ${BRAND.gold}, cream ${BRAND.cream}`,
      mood: 'Refined, celebratory, trustworthy premium gifting',
      textSafeArea: opts.textSafeArea,
      ctaSafeArea: opts.ctaSafeArea,
      mobileCropNotes: opts.mobileCropNotes,
    },
  });
}

export function categoryThumbnailSlot(opts: {
  id: string;
  pageName: string;
  pageRoute: string;
  sectionName: string;
  componentName: string;
  imageName: string;
  label: string;
  currentSource?: string;
  priority?: PriorityLevel;
  renderedDesktop?: number;
}): ImageRequirement {
  const size = opts.renderedDesktop ?? 280;
  const square = dim(size, size);

  return buildImageSlot({
    id: opts.id,
    pageName: opts.pageName,
    pageRoute: opts.pageRoute,
    sectionName: opts.sectionName,
    componentName: opts.componentName,
    imageName: opts.imageName,
    purpose: 'Category Thumbnail',
    priority: opts.priority ?? 'High',
    currentSource: opts.currentSource,
    technical: {
      desktop: square,
      tablet: dim(220, 220),
      mobile: dim(120, 120),
      aspectRatio: '1:1',
      format: 'WebP + JPG fallback',
      compressionQuality: 80,
      retinaExport: dim(size, size, 2),
      maxFileSizeKb: 120,
      minFileSizeKb: 40,
      cropRules: 'Center-weighted square crop. Subject fills 80% of frame with 10% padding.',
      safeArea: 'Full frame — no text overlay on image',
      focalPoint: 'Center',
      transparency: false,
    },
    content: {
      subject: `Curated ${opts.label} gift presentation — hero product or hamper representing the category`,
      composition: 'Single focal product or styled flat-lay, clean background, minimal props',
      style: 'Premium product photography, shallow depth of field, neutral warm backdrop',
      cameraAngle: '45° three-quarter product angle or top-down flat lay',
      lighting: 'Soft studio lighting, subtle shadow beneath product',
      brandColors: `Accents of burgundy ${BRAND.burgundy} and gold ${BRAND.gold} in ribbon/props`,
      mood: 'Aspirational, gift-ready, polished',
      mobileCropNotes: 'Tighter crop acceptable — ensure product remains recognizable at 120px',
    },
  });
}

export function portraitCardSlot(opts: {
  id: string;
  pageName: string;
  pageRoute: string;
  sectionName: string;
  componentName: string;
  imageName: string;
  label: string;
  currentSource?: string;
  cardWidth?: number;
  cardHeight?: number;
  footerPercent?: number;
}): ImageRequirement {
  const w = opts.cardWidth ?? 300;
  const h = opts.cardHeight ?? 460;
  const imageH = Math.round(h * (1 - (opts.footerPercent ?? 15) / 100));

  return buildImageSlot({
    id: opts.id,
    pageName: opts.pageName,
    pageRoute: opts.pageRoute,
    sectionName: opts.sectionName,
    componentName: opts.componentName,
    imageName: opts.imageName,
    purpose: 'Category Thumbnail',
    priority: 'High',
    currentSource: opts.currentSource,
    technical: {
      desktop: dim(w, imageH),
      tablet: dim(w, imageH),
      mobile: dim(320, Math.round(420 * 0.85)),
      aspectRatio: `${w}:${imageH}`,
      format: 'WebP + JPG fallback',
      compressionQuality: 80,
      retinaExport: dim(w, imageH, 2),
      maxFileSizeKb: 180,
      cropRules: `Portrait cover crop. Bottom ${opts.footerPercent ?? 15}% is solid dark footer — keep key subject above that line.`,
      safeArea: 'Top-left 48px reserved for icon badge overlay',
      focalPoint: 'Center-top (subject in upper 85%)',
      transparency: false,
    },
    content: {
      subject: `${opts.label} celebration scene or styled hamper representing the occasion`,
      composition: 'Vertical portrait — celebratory moment or premium hamper as hero',
      style: 'Editorial lifestyle or product, rich but not oversaturated',
      cameraAngle: 'Eye-level or slightly above',
      lighting: 'Warm ambient with soft highlights',
      brandColors: `Deep tones with gold ${BRAND.gold} accents`,
      mood: 'Joyful, premium, occasion-specific',
      mobileCropNotes: 'Card scales to 88vw — ensure subject reads clearly at narrow widths',
    },
  });
}

export function festiveSpotlightSlot(opts: {
  id: string;
  pageName: string;
  pageRoute: string;
  sectionName: string;
  componentName: string;
  imageName: string;
  festival: string;
  currentSource?: string;
}): ImageRequirement {
  return buildImageSlot({
    id: opts.id,
    pageName: opts.pageName,
    pageRoute: opts.pageRoute,
    sectionName: opts.sectionName,
    componentName: opts.componentName,
    imageName: opts.imageName,
    purpose: 'Category Thumbnail',
    priority: 'High',
    currentSource: opts.currentSource,
    technical: {
      desktop: dim(960, 600),
      tablet: dim(768, 480),
      mobile: dim(390, 488),
      aspectRatio: '16:10 (desktop) / 4:5 (mobile)',
      format: 'WebP + JPG fallback',
      compressionQuality: 82,
      retinaExport: dim(1920, 1200, 1),
      maxFileSizeKb: 280,
      cropRules: 'object-cover. Desktop 16:10; mobile switches to 4:5 — keep focal subject centered.',
      safeArea: 'Bottom 25% may have gradient overlay for festival name — avoid critical detail there on mobile',
      focalPoint: 'Center',
      transparency: false,
    },
    content: {
      subject: `${opts.festival} celebration atmosphere with premium gift hampers and festive decor`,
      composition: 'Cinematic wide scene transitioning to vertical crop on mobile',
      style: 'Festival-specific color story while staying on-brand luxury',
      cameraAngle: 'Wide environmental shot',
      lighting: 'Festival-appropriate warm glow (diyas, fairy lights, etc. as appropriate)',
      brandColors: `Festival palette harmonized with burgundy ${BRAND.burgundy} and gold ${BRAND.gold}`,
      mood: `Authentic ${opts.festival} celebration, premium gifting`,
      mobileCropNotes: '4:5 panel — center the hero hamper and primary festive element',
    },
  });
}

export function productImageSlot(opts: {
  id: string;
  pageName: string;
  pageRoute: string;
  sectionName: string;
  componentName: string;
  imageName: string;
  productName: string;
  currentSource?: string;
  priority?: PriorityLevel;
}): ImageRequirement {
  const square = dim(600, 600);

  return buildImageSlot({
    id: opts.id,
    pageName: opts.pageName,
    pageRoute: opts.pageRoute,
    sectionName: opts.sectionName,
    componentName: opts.componentName,
    imageName: opts.imageName,
    purpose: 'Product Image',
    priority: opts.priority ?? 'Medium',
    currentSource: opts.currentSource,
    technical: {
      desktop: square,
      tablet: dim(480, 480),
      mobile: dim(360, 360),
      aspectRatio: '1:1',
      format: 'WebP + JPG fallback',
      compressionQuality: 82,
      retinaExport: dim(1200, 1200, 1),
      maxFileSizeKb: 150,
      cropRules: 'Square product shot, object-cover in grid cells',
      safeArea: '10% padding — product centered',
      focalPoint: 'Center',
      transparency: false,
    },
    content: {
      subject: opts.productName,
      composition: 'Isolated product on clean cream or soft neutral background',
      style: 'E-commerce premium product photography',
      backgroundStyle: 'Warm off-white #FBF5EE or soft grey',
      productPlacement: 'Centered, occupying 70–80% of frame',
      shadowStyle: 'Soft drop shadow beneath product',
      luxuryLevel: 'Premium corporate gifting standard',
      brandColors: `Neutral base with optional burgundy ${BRAND.burgundy} accent prop`,
      mood: 'Clean, trustworthy, gift-ready',
    },
  });
}

export function galleryTileSlot(opts: {
  id: string;
  pageName: string;
  pageRoute: string;
  sectionName: string;
  componentName: string;
  imageName: string;
  theme: string;
  currentSource?: string;
  index: number;
}): ImageRequirement {
  return buildImageSlot({
    id: opts.id,
    pageName: opts.pageName,
    pageRoute: opts.pageRoute,
    sectionName: opts.sectionName,
    componentName: opts.componentName,
    imageName: opts.imageName,
    purpose: 'Gallery Tile',
    priority: 'Medium',
    currentSource: opts.currentSource,
    technical: {
      desktop: dim(228, 320),
      tablet: dim(168, 240),
      mobile: dim(140, 200),
      aspectRatio: '19:27 (~3:4 portrait)',
      format: 'WebP + JPG fallback',
      compressionQuality: 78,
      retinaExport: dim(456, 640, 1),
      maxFileSizeKb: 100,
      cropRules: 'Portrait cover — rounded-2xl mask. No text on image.',
      safeArea: 'Full bleed within rounded rect',
      focalPoint: 'Center',
      transparency: false,
    },
    content: {
      subject: opts.theme,
      composition: 'Vertical lifestyle moment — gifting, unboxing, corporate event, or product detail',
      style: 'Consistent warm color grade across all 16 tiles, editorial not stock',
      brandColors: `Harmonized with dark gallery bg ${BRAND.nearBlack} and gold accents`,
      mood: 'Aspirational corporate gifting lifestyle',
      additionalNotes: `Tile ${opts.index + 1} of dual-row marquee — maintain visual rhythm with adjacent tiles`,
    },
  });
}

export function logoSlot(opts: {
  id: string;
  imageName: string;
  variant: string;
  currentSource?: string;
  width: number;
  height: number;
  transparency: boolean;
  priority?: PriorityLevel;
}): ImageRequirement {
  return buildImageSlot({
    id: opts.id,
    pageName: 'Global',
    pageRoute: '/*',
    sectionName: 'Navigation & Footer',
    componentName: 'BrandLogo.tsx',
    imageName: `${opts.imageName} — ${opts.variant}`,
    purpose: 'Logo',
    priority: opts.priority ?? 'Critical',
    currentSource: opts.currentSource,
    technical: {
      desktop: dim(opts.width, opts.height),
      tablet: dim(opts.width, opts.height),
      mobile: dim(Math.round(opts.width * 0.85), Math.round(opts.height * 0.85)),
      aspectRatio: `${opts.width}:${opts.height}`,
      format: opts.transparency ? 'PNG' : 'WebP + JPG fallback',
      compressionQuality: 95,
      retinaExport: dim(opts.width * 2, opts.height * 2, 1),
      maxFileSizeKb: 80,
      cropRules: 'Exact logo bounds — no extra padding in file',
      safeArea: 'Minimum clear space = height of letter "G" on all sides',
      focalPoint: 'N/A',
      transparency: opts.transparency,
    },
    content: {
      subject: 'Giftz Gallerei wordmark and icon lockup',
      composition: 'Horizontal lockup for header; stacked or horizontal for footer',
      style: 'Refined serif wordmark, near-black #1A1010 on light backgrounds',
      brandColors: `Primary ${BRAND.nearBlack}, accent gold ${BRAND.gold} if applicable`,
      mood: 'Established luxury gifting house',
      additionalNotes: 'Deliver: horizontal, vertical, icon-only, dark-bg (cream/white), light-bg, transparent PNG, favicon 32×32 and 180×180',
    },
  });
}

export function partnerLogoSlot(opts: {
  id: string;
  brandName: string;
  currentSource: string;
}): ImageRequirement {
  return buildImageSlot({
    id: opts.id,
    pageName: 'Brands',
    pageRoute: '/brands',
    sectionName: 'Brand Logo Grid',
    componentName: 'BrandsPage.tsx',
    imageName: `${opts.brandName} logo`,
    purpose: 'Partner Logo',
    priority: 'Medium',
    currentSource: opts.currentSource,
    technical: {
      desktop: dim(180, 100),
      tablet: dim(160, 90),
      mobile: dim(110, 110),
      aspectRatio: 'Variable (object-contain within 1.8:1 cell)',
      format: 'PNG',
      compressionQuality: 90,
      retinaExport: dim(360, 200, 1),
      maxFileSizeKb: 60,
      cropRules: 'Logo only — transparent background, object-contain in aspect 1.8 container',
      safeArea: '15% padding within cell',
      focalPoint: 'Center',
      transparency: true,
    },
    content: {
      subject: `${opts.brandName} official brand logo`,
      composition: 'Centered logo mark on transparent background',
      style: 'Official brand guidelines — vector-sharp edges',
      brandColors: 'Brand-original colors',
      mood: 'Professional partner showcase',
      additionalNotes: 'Source from brand kit; normalize height visually across grid',
    },
  });
}

export function giftTagSlot(opts: {
  id: string;
  label: string;
  currentSource?: string;
}): ImageRequirement {
  return buildImageSlot({
    id: opts.id,
    pageName: 'Personalized Shop',
    pageRoute: '/shop',
    sectionName: 'Most Loved Gift Hampers',
    componentName: 'RelationshipPicksSection.tsx',
    imageName: `${opts.label} gift tag image`,
    purpose: 'Category Thumbnail',
    priority: 'High',
    currentSource: opts.currentSource,
    technical: {
      desktop: dim(200, 200),
      tablet: dim(184, 184),
      mobile: dim(168, 168),
      aspectRatio: '1:1',
      format: 'WebP + JPG fallback',
      compressionQuality: 80,
      retinaExport: dim(400, 400, 1),
      maxFileSizeKb: 100,
      cropRules: 'Square inside gift tag frame — slight rotation applied in UI',
      safeArea: 'Center square only',
      focalPoint: 'Center',
      transparency: false,
    },
    content: {
      subject: `Curated gift flat-lay representing "${opts.label}" recipient`,
      composition: 'Square product/lifestyle shot suitable for hanging tag format',
      style: 'Warm, personal, premium',
      brandColors: `Burgundy ${BRAND.burgundy} and cream ${BRAND.cream}`,
      mood: opts.label.includes('Kids') ? 'Playful premium' : 'Thoughtful and elegant',
    },
  });
}

export function premiumHoverPreviewSlot(opts: {
  id: string;
  label: string;
  currentSource?: string;
}): ImageRequirement {
  return buildImageSlot({
    id: opts.id,
    pageName: 'Personalized Shop',
    pageRoute: '/shop',
    sectionName: 'Premium Collection',
    componentName: 'PremiumCollectionSection.tsx',
    imageName: `${opts.label} hover preview`,
    purpose: 'Category Thumbnail',
    priority: 'High',
    currentSource: opts.currentSource,
    technical: {
      desktop: dim(960, 540),
      tablet: dim(768, 432),
      mobile: dim(0, 0),
      aspectRatio: '16:9',
      format: 'WebP + JPG fallback',
      compressionQuality: 85,
      retinaExport: dim(1920, 1080, 1),
      maxFileSizeKb: 320,
      cropRules: 'Desktop-only hover overlay at 50vw × 50vh — cinematic wide crop',
      safeArea: 'Center-weighted — overlay is pointer-events none',
      focalPoint: 'Center',
      transparency: false,
    },
    content: {
      subject: `Luxury ${opts.label} collection hero scene — multiple premium hampers and keepsakes`,
      composition: 'Wide cinematic flat-lay or styled scene',
      style: 'High-end editorial, rich textures, gold and burgundy accents',
      luxuryLevel: 'Ultra-premium',
      brandColors: `Deep burgundy ${BRAND.burgundy}, antique gold ${BRAND.gold}`,
      mood: 'Opulent, executive gifting',
      additionalNotes: 'Only shown on desktop hover — mobile uses card thumbnail only',
    },
  });
}

export function browseProductTemplateSlot(): ImageRequirement {
  return buildImageSlot({
    id: 'browse-product-template',
    pageName: 'Shop Browse & Placeholder Pages',
    pageRoute: '/shop/browse, /promotional-gifts/*, /corporate-gifting/*',
    sectionName: 'Product Grid',
    componentName: 'PlaceholderPage.tsx',
    imageName: 'Product thumbnail (template)',
    purpose: 'Product Image',
    priority: 'Medium',
    currentSource: 'Unsplash pool (dynamic per category)',
    technical: {
      desktop: dim(400, 400),
      tablet: dim(360, 360),
      mobile: dim(360, 360),
      aspectRatio: '1:1',
      format: 'WebP + JPG fallback',
      compressionQuality: 80,
      retinaExport: dim(800, 800, 1),
      maxFileSizeKb: 120,
      cropRules: 'Square aspect in 1–3 column grid',
      safeArea: 'Product centered with 8% padding',
      focalPoint: 'Center',
      transparency: false,
    },
    content: {
      subject: 'Individual SKU product shot — category-specific (desk essentials, drinkware, hampers, etc.)',
      composition: 'Clean e-commerce square on neutral background',
      style: 'Consistent studio lighting across catalog',
      brandColors: 'Neutral with brand-consistent styling',
      mood: 'Professional catalog',
      additionalNotes: '3–9 products per browse page depending on category; replace Unsplash with Cloudinary URLs when API connected',
    },
  });
}

export function formSupportingPhotoSlot(opts: {
  id: string;
  pageName: string;
  pageRoute: string;
  sectionName: string;
  imageName: string;
  currentSource?: string;
}): ImageRequirement {
  return buildImageSlot({
    id: opts.id,
    pageName: opts.pageName,
    pageRoute: opts.pageRoute,
    sectionName: opts.sectionName,
    componentName: 'BulkEnquiryFormSection.tsx',
    imageName: opts.imageName,
    purpose: 'Form Supporting Photo',
    priority: 'Medium',
    currentSource: opts.currentSource,
    technical: {
      desktop: dim(640, 720),
      tablet: dim(560, 640),
      mobile: dim(390, 280),
      aspectRatio: '4:5 (desktop) / 16:9 (mobile banner)',
      format: 'WebP + JPG fallback',
      compressionQuality: 80,
      retinaExport: dim(1280, 1440, 1),
      maxFileSizeKb: 200,
      cropRules: 'object-cover filling 50% grid column on desktop; full-width banner on mobile min-h 280px',
      safeArea: 'No text on image — form is separate column',
      focalPoint: 'Center',
      transparency: false,
    },
    content: {
      subject: 'Corporate team receiving premium gift hampers or branded merchandise',
      composition: 'Professional B2B gifting moment — handshake, unboxing, or team celebration',
      style: 'Corporate editorial photography, bright and trustworthy',
      brandColors: `Neutral office setting with burgundy ${BRAND.burgundy} gift accents`,
      mood: 'Professional, partnership, reliability',
    },
  });
}
