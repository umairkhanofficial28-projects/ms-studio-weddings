// Placeholders only — replace with your real biography. Nothing here is invented.
import { socials } from './socials';
export const founder = {
  name: 'Umair Khan', title: 'Founder & Creative Director',
  photo: 'founder.webp' as string, // e.g. put image in src/assets/team/ and set in team.ts; empty = placeholder shown
  bio: ['[Your biography goes here — edit src/data/founder.ts]'],
  philosophy: '[Your creative philosophy — edit src/data/founder.ts]',
  signatureMessage: 'Your story is unique, and it deserves to be told with perfection.', // from the official PDF
  skills: [] as string[], experience: '' as string,
  links: socials.filter((s) => ['behance', 'linkedin', 'instagram'].includes(s.id)),
};
