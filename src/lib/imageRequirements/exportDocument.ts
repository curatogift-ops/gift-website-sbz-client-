import type { ImageRequirement } from '@/types/imageRequirements';
import { formatSize } from '@/lib/imageRequirements/specBuilders';

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportToCsv(requirements: ImageRequirement[]): string {
  const headers = [
    'Page',
    'Section',
    'Image Name',
    'Purpose',
    'Status',
    'Desktop Size',
    'Tablet Size',
    'Mobile Size',
    'Aspect Ratio',
    'Format',
    'Max File Size (KB)',
    'Current Source',
    'Designer Brief',
  ];

  const rows = requirements.map((r) =>
    [
      r.pageName,
      r.sectionName,
      r.imageName,
      r.purpose,
      r.status,
      formatSize(r.technical.desktop),
      formatSize(r.technical.tablet),
      formatSize(r.technical.mobile),
      r.technical.aspectRatio,
      r.technical.format,
      String(r.technical.maxFileSizeKb),
      r.currentSource ?? '',
      r.designerBrief,
    ]
      .map(escapeCsv)
      .join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export function exportToMarkdown(requirements: ImageRequirement[]): string {
  const lines: string[] = [
    '# Giftz Gallerei — Image Specification Document',
    '',
    `Generated: ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}`,
    `Total assets: **${requirements.length}**`,
    '',
    '---',
    '',
    '## Summary Table',
    '',
    '| Page | Section | Image Name | Purpose | Desktop | Tablet | Mobile | Aspect Ratio | Format | Max KB |',
    '| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ];

  for (const r of requirements) {
    lines.push(
      `| ${r.pageName} | ${r.sectionName} | ${r.imageName} | ${r.purpose} | ${r.technical.desktop.width}×${r.technical.desktop.height} | ${r.technical.tablet.width}×${r.technical.tablet.height} | ${r.technical.mobile.width}×${r.technical.mobile.height} | ${r.technical.aspectRatio} | ${r.technical.format} | ${r.technical.maxFileSizeKb} |`
    );
  }

  lines.push('', '---', '');

  let currentPage = '';
  for (const r of requirements) {
    if (r.pageName !== currentPage) {
      currentPage = r.pageName;
      lines.push(`## ${currentPage}`, '');
    }

    lines.push(
      `### ${r.imageName}`,
      '',
      `**Section:** ${r.sectionName}  `,
      `**Component:** \`${r.componentName}\`  `,
      `**Route:** \`${r.pageRoute}\`  `,
      `**Purpose:** ${r.purpose}  `,
      `**Status:** ${r.status}  `,
      r.currentSource ? `**Current source:** \`${r.currentSource}\`` : '**Current source:** _missing_',
      '',
      '#### Technical Specifications',
      '',
      '| Breakpoint | Rendered | Export (@2x) |',
      '| --- | --- | --- |',
      `| Desktop | ${r.technical.desktop.width}×${r.technical.desktop.height}px | ${r.technical.desktop.exportWidth}×${r.technical.desktop.exportHeight}px |`,
      `| Tablet | ${r.technical.tablet.width}×${r.technical.tablet.height}px | ${r.technical.tablet.exportWidth}×${r.technical.tablet.exportHeight}px |`,
      `| Mobile | ${r.technical.mobile.width}×${r.technical.mobile.height}px | ${r.technical.mobile.exportWidth}×${r.technical.mobile.exportHeight}px |`,
      '',
      `- **Aspect ratio:** ${r.technical.aspectRatio}`,
      `- **Format:** ${r.technical.format} (${r.technical.compressionQuality}% quality)`,
      `- **Max file size:** ${r.technical.maxFileSizeKb}KB`,
      r.technical.minFileSizeKb ? `- **Min file size:** ${r.technical.minFileSizeKb}KB` : '',
      `- **Retina export:** ${r.technical.retinaExport.exportWidth}×${r.technical.retinaExport.exportHeight}px`,
      `- **Crop rules:** ${r.technical.cropRules}`,
      `- **Safe area:** ${r.technical.safeArea}`,
      `- **Focal point:** ${r.technical.focalPoint}`,
      `- **Transparency:** ${r.technical.transparency ? 'Yes' : 'No'}`,
      '',
      '#### Content Requirements',
      '',
      `- **Subject:** ${r.content.subject}`,
      `- **Composition:** ${r.content.composition}`,
      `- **Style:** ${r.content.style}`,
      r.content.cameraAngle ? `- **Camera angle:** ${r.content.cameraAngle}` : '',
      r.content.lighting ? `- **Lighting:** ${r.content.lighting}` : '',
      `- **Brand colors:** ${r.content.brandColors}`,
      `- **Mood:** ${r.content.mood}`,
      r.content.textSafeArea ? `- **Text safe area:** ${r.content.textSafeArea}` : '',
      r.content.ctaSafeArea ? `- **CTA safe area:** ${r.content.ctaSafeArea}` : '',
      r.content.mobileCropNotes ? `- **Mobile crop:** ${r.content.mobileCropNotes}` : '',
      r.content.additionalNotes ? `- **Notes:** ${r.content.additionalNotes}` : '',
      '',
      '#### Designer Brief',
      '',
      '```',
      r.designerBrief,
      '```',
      '',
      '---',
      ''
    );
  }

  return lines.filter((l) => l !== undefined).join('\n');
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
