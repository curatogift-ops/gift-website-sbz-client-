export type ImagePurpose =
  | 'Hero Banner'
  | 'Category Thumbnail'
  | 'Product Image'
  | 'Gift Hamper Image'
  | 'Testimonial Photo'
  | 'Team Member Image'
  | 'Blog Featured Image'
  | 'Background Illustration'
  | 'CTA Banner'
  | 'Trust Badge'
  | 'Logo'
  | 'Partner Logo'
  | 'Gallery Tile'
  | 'Form Supporting Photo'
  | 'Icon Set'
  | 'Decorative Graphic'
  | 'Favicon';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export type ImageFormat = 'WebP' | 'WebP + JPG fallback' | 'PNG' | 'SVG' | 'AVIF + PNG fallback';

export interface DimensionSpec {
  width: number;
  height: number;
  exportWidth: number;
  exportHeight: number;
}

export interface ImageContentGuidance {
  subject: string;
  composition: string;
  style: string;
  cameraAngle?: string;
  lighting?: string;
  brandColors: string;
  mood: string;
  textSafeArea?: string;
  ctaSafeArea?: string;
  mobileCropNotes?: string;
  backgroundStyle?: string;
  productPlacement?: string;
  shadowStyle?: string;
  luxuryLevel?: string;
  additionalNotes?: string;
}

export interface ImageTechnicalSpec {
  desktop: DimensionSpec;
  tablet: DimensionSpec;
  mobile: DimensionSpec;
  aspectRatio: string;
  format: ImageFormat;
  compressionQuality: number;
  retinaExport: DimensionSpec;
  maxFileSizeKb: number;
  minFileSizeKb?: number;
  cropRules: string;
  safeArea: string;
  focalPoint: string;
  transparency: boolean;
}

/** Single visual asset slot with full designer handoff metadata */
export interface ImageRequirement {
  id: string;
  pageName: string;
  pageRoute: string;
  sectionName: string;
  componentName: string;
  imageName: string;
  purpose: ImagePurpose;
  priority: PriorityLevel;
  currentSource?: string;
  status: 'missing' | 'placeholder' | 'production';
  technical: ImageTechnicalSpec;
  content: ImageContentGuidance;
  designerBrief: string;
}

/** Register new slots by pushing to this array — picked up automatically by buildImageRequirements() */
export const customImageSlots: Partial<ImageRequirement>[] = [];
