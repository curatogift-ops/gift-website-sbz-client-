import type { ImageRequirement } from '@/types/imageRequirements';

export type SimpleSpecBlock = {
  title: string;
  subtitle?: string;
  lines: string[];
  status: ImageRequirement['status'];
  count: number;
};

function px(w: number, h: number): string {
  if (w <= 0 || h <= 0) return '—';
  return `${w.toLocaleString()} × ${h.toLocaleString()} px`;
}

function displayTitle(req: ImageRequirement): string {
  const base = req.imageName.replace(/\s*\((desktop|mobile)\)\s*$/i, '').trim();

  if (req.purpose === 'Hero Banner') {
    if (/mobile/i.test(req.imageName)) return 'Mobile Hero Image';
    return 'Desktop Hero Image';
  }
  if (req.purpose === 'Logo') return 'Site Logo';
  if (req.purpose === 'Form Supporting Photo') return 'Form Side Image';
  if (req.purpose === 'Gallery Tile') return 'Gallery Image';
  if (req.purpose === 'Category Thumbnail') return 'Category Image';
  if (req.purpose === 'Product Image') return 'Product Image';

  return base;
}

function specLines(req: ImageRequirement): string[] {
  const { technical: t } = req;
  const isMobileHero = req.purpose === 'Hero Banner' && /mobile/i.test(req.imageName);
  const isDesktopHero = req.purpose === 'Hero Banner' && !isMobileHero;

  const primary = isMobileHero ? t.mobile : t.desktop;
  const lines: string[] = [];

  if (isDesktopHero) {
    lines.push(`Recommended: ${px(primary.width, primary.height)} (wide hero/banner)`);
    if (t.tablet.width !== primary.width || t.tablet.height !== primary.height) {
      lines.push(`Tablet: ${px(t.tablet.width, t.tablet.height)}`);
    }
    if (t.retinaExport.exportWidth > primary.width) {
      lines.push(`Ultra HD @2x (optional): ${px(t.retinaExport.exportWidth, t.retinaExport.exportHeight)}`);
    }
    lines.push(`Aspect Ratio: ${t.aspectRatio}`);
  } else if (isMobileHero) {
    lines.push(`Recommended: ${px(primary.width, primary.height)}`);
    const altH = Math.round(primary.width * (16 / 9));
    if (altH !== primary.height) {
      lines.push(`Full-screen alternative: ${px(primary.width, altH)} (9:16)`);
    }
    lines.push(`Aspect Ratio: ${t.aspectRatio}`);
  } else {
    lines.push(`Recommended: ${px(t.desktop.width, t.desktop.height)}`);
    if (t.mobile.width > 0 && (t.mobile.width !== t.desktop.width || t.mobile.height !== t.desktop.height)) {
      lines.push(`Mobile: ${px(t.mobile.width, t.mobile.height)}`);
    }
    lines.push(`Aspect Ratio: ${t.aspectRatio}`);
  }

  lines.push(`Format: ${t.format}`);
  if (t.maxFileSizeKb > 0) {
    lines.push(`Max file size: ${t.maxFileSizeKb} KB`);
  }

  return lines;
}

function specKey(req: ImageRequirement): string {
  return [displayTitle(req), ...specLines(req)].join('|');
}

function worstStatus(statuses: ImageRequirement['status'][]): ImageRequirement['status'] {
  if (statuses.includes('missing')) return 'missing';
  if (statuses.includes('placeholder')) return 'placeholder';
  return 'production';
}

/** Collapse identical specs within a section (e.g. 8 category thumbs → one block) */
export function toSimpleSpecBlocks(requirements: ImageRequirement[]): SimpleSpecBlock[] {
  const groups = new Map<string, { reqs: ImageRequirement[]; lines: string[]; title: string }>();

  for (const req of requirements) {
    const title = displayTitle(req);
    const lines = specLines(req);
    const key = specKey(req);
    const existing = groups.get(key);
    if (existing) {
      existing.reqs.push(req);
    } else {
      groups.set(key, { reqs: [req], lines, title });
    }
  }

  return [...groups.values()].map(({ reqs, lines, title }) => {
    const names = reqs.map((r) => r.imageName.replace(/\s*\((desktop|mobile)\)\s*$/i, '').trim());
    const uniqueNames = [...new Set(names)];
    const count = reqs.length;

    let subtitle: string | undefined;
    if (count === 1) {
      subtitle = uniqueNames[0] !== title ? uniqueNames[0] : undefined;
    } else if (count <= 4) {
      subtitle = uniqueNames.join(', ');
    } else {
      subtitle = `${uniqueNames.slice(0, 3).join(', ')} + ${count - 3} more`;
    }

    return {
      title: count > 1 ? `${title} (×${count})` : title,
      subtitle,
      lines,
      status: worstStatus(reqs.map((r) => r.status)),
      count,
    };
  });
}

export function formatSpecAsText(block: SimpleSpecBlock): string {
  return [block.title, block.subtitle, ...block.lines.map((l) => `  ${l}`)].filter(Boolean).join('\n');
}
