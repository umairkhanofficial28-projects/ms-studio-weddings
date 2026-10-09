import { policy } from './site';
// Source: PDF FAQ. Payment & delivery answers read from site.ts so they can never contradict the Terms page.
export const faq = [
  { q: 'Can I customise my package?', a: 'Absolutely. You can fully customise your package using our add-ons based on your event needs.' },
  { q: 'Do we need a meeting before booking?', a: 'Yes. We highly recommend a detailed call or in-person meeting to align expectations and build comfort.' },
  { q: 'When will I receive my pictures?', a: `Raw high-resolution pictures are shared ${policy.delivery.rawFiles}. (Timelines are pending final owner approval.)` },
  { q: 'How many edited photos & album selections?', a: 'Packages list 150 selected edited pictures for Essential Love and 250 for Signature/Royal. Album photo selections are separate; the original PDF FAQ mentions 70–75 album selections, pending clarification.' },
  { q: 'How long does final delivery take?', a: `Edited photographs: ${policy.delivery.editedPhotos}. Albums: ${policy.delivery.albumProduction}. Video: ${policy.delivery.fullFilm}.` },
  { q: 'What if I want changes?', a: `${policy.revisionsIncluded === 1 ? 'One round' : policy.revisionsIncluded + ' rounds'} of revisions is included free of cost (albums/videos). Further revisions are charged separately.` },
  { q: 'Do you cover events outside Lahore?', a: 'Yes — nationwide and international coverage is available. Accommodation and daily expenses are client-borne; travel is managed by us. Outstation costs are quoted separately.' },
  { q: 'How do we book?', a: 'A date is reserved only after the studio confirms availability and receives the payment specified in the approved booking agreement.' },
];
