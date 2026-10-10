/**
 * One folder = one couple / one wedding-story catalog.
 * Place cover.webp and any number of 01.webp, 02.webp... images in
 * src/assets/couples/couple-01/, couple-02/, etc.
 * Files are discovered automatically at build time by Astro.
 */
import type { ImageMetadata } from 'astro';

export interface CoupleImage { src: ImageMetadata; name: string; isCover: boolean }
export interface CoupleAlbum {
  slug: string;
  cover: ImageMetadata;
  photos: CoupleImage[];
  count: number;
}

const files = import.meta.glob<ImageMetadata>(
  '/src/assets/couples/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' }
);

const grouped = new Map<string, CoupleImage[]>();
for (const [path, src] of Object.entries(files)) {
  const pieces = path.split('/');
  const filename = pieces.pop() ?? '';
  const slug = pieces.pop() ?? '';
  if (!/^couple-[0-9]{2,}$/.test(slug)) continue;
  const images = grouped.get(slug) ?? [];
  images.push({ src, name: filename, isCover: /^cover\.(jpe?g|png|webp)$/i.test(filename) });
  grouped.set(slug, images);
}

export const albums: CoupleAlbum[] = [...grouped.entries()]
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([slug, images]) => {
    const sorted = images.sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric:true}));
    const cover = sorted.find(p => p.isCover) ?? sorted[0];
    // The cover image is shown outside. Remaining images appear inside the catalog.
    const photos = sorted.filter(p => p !== cover);
    return { slug, cover: cover.src, photos, count: photos.length };
  })
  .slice(0, 6);
