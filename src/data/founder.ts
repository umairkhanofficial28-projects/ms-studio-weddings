import { socials } from './socials';

export const founder = {
  name: 'Umair Khan',
  title: 'Founder & Creative Director',
  // Add a real portrait to src/assets/team/founder.webp when ready.
  photo: 'founder.webp' as string,
  bio: [
    'Behind every meaningful frame is a vision, and behind MS Studio is Umair Khan, a photographer, filmmaker, and creative professional with a decade of experience across photography, filmmaking, and visual content production.',
    'With a background in creative direction, visual storytelling, and multimedia production, Umair brings both artistic vision and technical expertise to his work. His approach is rooted in the belief that exceptional photography is not simply about capturing what a moment looks like, but about preserving how it feels.',
    'Throughout his creative journey, he has developed a distinctive appreciation for cinematic composition, natural emotions, thoughtful lighting, and storytelling that feels both authentic and timeless.',
    'As the Founder and Creative Director of MS Studio, Umair leads the creative vision behind each project, focusing on thoughtful execution, attention to detail, and imagery that reflects the individuality of every couple.',
    'For him, photography is more than a profession. It is the art of transforming fleeting moments into memories that remain meaningful long after the celebration ends.'
  ],
  philosophy: 'Umair believes the most memorable photographs do more than show what happened — they bring back how it felt. His creative approach centers on honesty, emotion, thoughtful composition, and preserving the unique story of every couple.',
  signatureMessage: 'Your story is unique, and it deserves to be told with perfection.',
  skills: [] as string[],
  experience: '' as string,
  links: socials.filter((s) => ['behance', 'linkedin', 'instagram'].includes(s.id)),
};
