import type { ImageMetadata } from 'astro';
// Optional images. Drop an image in src/assets/team and reference its filename in team.ts / founder.ts.
const images = import.meta.glob<ImageMetadata>('/src/assets/team/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' });
export function teamImage(file?: string): ImageMetadata | undefined {
  if (!file || file.includes('/') || file.includes('\\') || file.includes('..')) return undefined;
  return images[`/src/assets/team/${file}`];
}
