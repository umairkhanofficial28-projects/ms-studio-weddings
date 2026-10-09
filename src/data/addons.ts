// Add-on price database — source: PDF "ADD ONS" page. Edit prices here only.
export interface Addon {
  id: string; group: string; label: string; price: number;
  quantity?: boolean;        // true = client can choose a whole-number quantity
  exclusive?: string;        // add-ons sharing this key: only one can be selected
  note?: string; flag?: string; // flag = needs owner review (see OWNER_APPROVAL_CHECKLIST.md)
}
export const addonGroups: Record<string, string> = {
  coverage: 'Coverage Enhancements', crew: 'Additional Team', testimonials: 'Testimonials',
  pre: 'Pre-Event Coverage (Sehra Bandi, Family Portraits, etc.)', post: 'Post-Event Coverage (Welcome, Rasams, etc.)',
  booth: 'Photo Booths & Experiences', albums: 'Albums',
};
export const addons: Addon[] = [
  { id: 'drone', group: 'coverage', label: 'Drone Coverage', price: 20000, note: 'Subject to venue permission, regulations and safety assessment.' },
  { id: 'fpv', group: 'coverage', label: 'FPV Drone Coverage', price: 80000, note: 'Subject to venue permission, regulations and safety assessment.' },
  { id: 'steadicam', group: 'coverage', label: 'Steady Cam Operator', price: 20000 },
  { id: 'jib', group: 'coverage', label: 'JIB Camera', price: 55000 },
  { id: 'extra-photographer', group: 'crew', label: 'Additional Photographer', price: 20000, quantity: true },
  { id: 'extra-videographer', group: 'crew', label: 'Additional Videographer', price: 20000, quantity: true },
  { id: 'testimonial-event', group: 'testimonials', label: 'On-Event Testimonials', price: 10000 },
  { id: 'testimonial-day', group: 'testimonials', label: 'Separate Day Testimonials', price: 25000 },
  { id: 'pre-photo', group: 'pre', label: 'Pre-Event Photography', price: 15000, exclusive: 'pre' },
  { id: 'pre-video', group: 'pre', label: 'Pre-Event Videography', price: 15000, exclusive: 'pre' },
  { id: 'pre-both', group: 'pre', label: 'Pre-Event Photography + Videography', price: 20000, exclusive: 'pre' },
  { id: 'post-photo', group: 'post', label: 'Post-Event Photography', price: 15000, exclusive: 'post' },
  { id: 'post-video', group: 'post', label: 'Post-Event Videography', price: 15000, exclusive: 'post' },
  { id: 'post-both', group: 'post', label: 'Post-Event Photography + Videography', price: 20000, exclusive: 'post' },
  { id: 'booth-unlimited', group: 'booth', label: 'Photo Booth — Unlimited Instant Prints', price: 100000, exclusive: 'photobooth' },
  { id: 'booth-300', group: 'booth', label: 'Photo Booth — 300 Instant Prints', price: 80000, exclusive: 'photobooth' },
  { id: 'booth-200', group: 'booth', label: 'Photo Booth — 200 Instant Prints', price: 60000, exclusive: 'photobooth', flag: 'Source PDF lists 200 and 100 prints at the same price (PKR 60,000). Owner to confirm.' },
  { id: 'booth-100', group: 'booth', label: 'Photo Booth — 100 Instant Prints', price: 60000, exclusive: 'photobooth', flag: 'Source PDF lists 200 and 100 prints at the same price (PKR 60,000). Owner to confirm.' },
  { id: 'glam360', group: 'booth', label: 'Glam 360 Video Booth', price: 80000, note: 'Slow-motion, boomerang, templates and song included.' },
  { id: 'album-story', group: 'albums', label: 'Story Book Album (70–80 photographs)', price: 22000, quantity: true, note: 'Extra album — separate from any album included in your package.' },
  { id: 'album-coffee', group: 'albums', label: 'Coffee Table Album (30–40 photographs)', price: 18000, quantity: true },
  { id: 'album-signature', group: 'albums', label: 'Signature Album (30–40 photographs)', price: 25000, quantity: true, note: 'Extra album — separate from any album included in your package.' },
  { id: 'album-sheet', group: 'albums', label: 'Extra Album Sheet (per sheet)', price: 3000, quantity: true },
];
