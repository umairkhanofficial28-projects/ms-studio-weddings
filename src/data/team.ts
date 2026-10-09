// Add a team member = copy one block below, fill it in, set visible: true.
// Photos: put the image in src/assets/team/ and write its file name in `image`.
export interface Member { name: string; position: string; image?: string; bio?: string; specialization?: string; experience?: string; socialUrl?: string; portfolioUrl?: string; visible: boolean }
export const team: Member[] = [
  { name: 'Umair Khan', position: 'Founder & Creative Director', image: 'founder.webp', bio: '[Add biography]', socialUrl: 'https://www.linkedin.com/in/umair-khan-b36278270', portfolioUrl: 'https://www.behance.net/artbyumairkhan', visible: true },
];
