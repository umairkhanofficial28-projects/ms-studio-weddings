// Build-time discovery: any image dropped in src/assets/gallery/<folder>/ appears automatically.
import type { ImageMetadata } from 'astro';
import meta from '../data/gallery-meta.json';

export const folderLabels: Record<string, string> = {
  'wedding-stories': 'Wedding Stories', 'bride-groom': 'Bride & Groom', nikkah: 'Nikkah', mehndi: 'Mehndi', baraat: 'Baraat',
  walima: 'Walima', daylight: 'Daylight Couple Shoots', details: 'Wedding Details', family: 'Family Portraits', candids: 'Candid Moments',
};
export interface Photo { src: ImageMetadata; category: string; categoryLabel: string; title: string; caption: string; alt: string; featured: boolean; order: number }

const files = import.meta.glob<ImageMetadata>('/src/assets/gallery/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, import: 'default' });
const m = meta as Record<string, Partial<Photo> & { title?: string; caption?: string; alt?: string; featured?: boolean; order?: number }>;

export const photos: Photo[] = Object.entries(files).map(([path, src]) => {
  const parts = path.split('/'); const file = parts.pop()!; const category = parts.pop()!;
  const base = file.replace(/\.[^.]+$/, ''); const o = m[`${category}/${file}`] ?? {};
  const nice = base.replace(/[-_]+/g, ' ').replace(/^\d+\s*/, '').trim();
  return { src, category, categoryLabel: folderLabels[category] ?? category, title: o.title ?? nice, caption: o.caption ?? '',
    alt: o.alt ?? `${o.title ?? nice} — wedding photography by MS Studio, Lahore`, featured: !!o.featured, order: o.order ?? 999 };
}).sort((a, b) => a.order - b.order || a.src.src.localeCompare(b.src.src));
export const usedCategories = [...new Set(photos.map((p) => p.category))];
