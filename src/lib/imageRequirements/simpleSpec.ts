import type { ImageRequirement } from '@/types/imageRequirements';

export type SimpleSpecBlock = {
  title: string;
  subtitle?: string;
  lines: string[];
  status: ImageRequirement['status'];
  count: number;
  /** When set, this block maps to one deliverable file (hero slides are never merged). */
  assetId?: string;
};

function px(w: number, h: number): string {
  if (w <= 0 || h <= 0) return '—';
  return `${w.toLocaleString()} × ${h.toLocaleString()} px`;
}

function baseImageName(imageName: string): string {
  return imageName.replace(/\s*\((desktop|mobile)\)\s*$/i, '').trim();
}

function displayTitle(req: ImageRequirement): string {
  const base = baseImageName(req.imageName);

  if (req.purpose === 'Hero Banner') {
    const variant = /mobile/i.test(req.imageName) ? 'Mobile' : 'Desktop';
    return `${variant} hero — ${base}`;
  }
  if (req.purpose === 'Logo') return 'Site logo';
  if (req.purpose === 'Form Supporting Photo') return `Form side image — ${base}`;
  if (req.purpose === 'Gallery Tile') return 'Gallery image';
  if (req.purpose === 'Category Thumbnail') return `Category image — ${base}`;
  if (req.purpose === 'Product Image') return `Product image — ${base}`;

  return base;
}

/** Always list Desktop, Tablet, Mobile explicitly so freelancers see every breakpoint. */
function specLines(req: ImageRequirement): string[] {
  const { technical: t } = req;
  const lines: string[] = [];

  const isMobileHero = req.purpose === 'Hero Banner' && /mobile/i.test(req.imageName);
  const isDesktopHero = req.purpose === 'Hero Banner' && !isMobileHero;

  if (isDesktopHero) {
    lines.push(`Desktop: ${px(t.desktop.width, t.desktop.height)} (required)`);
    if (t.tablet.width > 0 && t.tablet.height > 0) {
      lines.push(`Tablet: ${px(t.tablet.width, t.tablet.height)}`);
    }
    if (t.retinaExport.exportWidth > t.desktop.width) {
      lines.push(`Export @2x: ${px(t.retinaExport.exportWidth, t.retinaExport.exportHeight)}`);
    }
  } else if (isMobileHero) {
    lines.push(`Mobile: ${px(t.mobile.width, t.mobile.height)} (required)`);
    const altH = Math.round(t.mobile.width * (16 / 9));
    if (altH > 0 && altH !== t.mobile.height) {
      lines.push(`Mobile full-screen alt: ${px(t.mobile.width, altH)} (9:16)`);
    }
  } else {
    lines.push(`Desktop: ${px(t.desktop.width, t.desktop.height)} (required)`);
    if (t.tablet.width > 0 && t.tablet.height > 0 &&
        (t.tablet.width !== t.desktop.width || t.tablet.height !== t.desktop.height)) {
      lines.push(`Tablet: ${px(t.tablet.width, t.tablet.height)}`);
    }
    if (t.mobile.width > 0 && t.mobile.height > 0 &&
        (t.mobile.width !== t.desktop.width || t.mobile.height !== t.desktop.height)) {
      lines.push(`Mobile: ${px(t.mobile.width, t.mobile.height)}`);
    }
  }

  lines.push(`Aspect ratio: ${t.aspectRatio}`);
  lines.push(`Format: ${t.format}`);
  if (t.maxFileSizeKb > 0) {
    lines.push(`Max file size: ${t.maxFileSizeKb} KB`);
  }

  if (req.currentSource) {
    lines.push(`Current file: ${req.currentSource}`);
  }

  return lines;
}

function worstStatus(statuses: ImageRequirement['status'][]): ImageRequirement['status'] {
  if (statuses.includes('missing')) return 'missing';
  if (statuses.includes('placeholder')) return 'placeholder';
  return 'production';
}

function groupKey(req: ImageRequirement): string {
  // Hero banners are separate deliverables — never merge desktop/mobile or slides.
  if (req.purpose === 'Hero Banner') {
    return req.id;
  }
  return [displayTitle(req), ...specLines(req)].join('|');
}

/** Build spec cards for a section. Hero slides stay separate; identical category thumbs merge. */
export function toSimpleSpecBlocks(requirements: ImageRequirement[]): SimpleSpecBlock[] {
  const groups = new Map<string, { reqs: ImageRequirement[]; lines: string[]; title: string }>();

  for (const req of requirements) {
    const title = displayTitle(req);
    const lines = specLines(req);
    const key = groupKey(req);
    const existing = groups.get(key);
    if (existing) {
      existing.reqs.push(req);
    } else {
      groups.set(key, { reqs: [req], lines, title });
    }
  }

  return [...groups.values()].map(({ reqs, lines, title }) => {
    const isSingleHero = reqs.length === 1 && reqs[0].purpose === 'Hero Banner';
    const names = reqs.map((r) => baseImageName(r.imageName));
    const uniqueNames = [...new Set(names)];
    const count = reqs.length;

    let subtitle: string | undefined;
    if (isSingleHero) {
      subtitle = /mobile/i.test(reqs[0].imageName)
        ? 'Deliver as mobile-only artwork (max-width 767px)'
        : 'Deliver as desktop/tablet artwork (768px and above)';
    } else if (count === 1) {
      subtitle = uniqueNames[0] !== title ? uniqueNames[0] : undefined;
    } else if (count <= 4) {
      subtitle = uniqueNames.join(', ');
    } else {
      subtitle = `${uniqueNames.slice(0, 3).join(', ')} + ${count - 3} more`;
    }

    return {
      title: count > 1 && reqs[0].purpose !== 'Hero Banner' ? `${title} (×${count})` : title,
      subtitle,
      lines,
      status: worstStatus(reqs.map((r) => r.status)),
      count,
      assetId: isSingleHero ? reqs[0].id : undefined,
    };
  });
}

export function formatSpecAsText(block: SimpleSpecBlock): string {
  return [block.title, block.subtitle, ...block.lines.map((l) => `  ${l}`)].filter(Boolean).join('\n');
}
